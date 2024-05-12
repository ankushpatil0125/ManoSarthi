package com.team9.manosarthi_backend.ServicesImpl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.team9.manosarthi_backend.Config.AesEncryptor;
import com.team9.manosarthi_backend.DTO.RegisterFollowUpDetailsDTO;
import com.team9.manosarthi_backend.DTO.RegisterPatientDTO;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.*;
import com.team9.manosarthi_backend.Services.WorkerService;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
@AllArgsConstructor
public class WorkerServiceImpl implements WorkerService {


    private final MissedFollowUpRepository missedFollowUpRepository;
    private WorkerRepository workerRepository;

    private PatientRepository patientRepository;

    private Questionarrie_ansRepo questionarrieAnsRepo;

    private MedicalQueAnsRepo medicalQueAnsRepo;

    private DoctorRepository doctorRepository;

    private FollowUpDetailsRepository followUpDetailsRepository;

    private NotRefAbhaIdRepository abhaIdRepository;

    private AesEncryptor aesEncryptor;

    private FollowUpScheduleRepository followUpScheduleRepository;

    private PrescriptionRepository prescriptionRepository;

    private MissedFollowUpRepository MissedFollowUpRepository;

    private NotRefAbhaIdRepository notRefAbhaIdRepository;

    private AmazonS3 amazonS3;

    @Override
    public Worker viewProfile(int id) {

        Optional<Worker> worker = workerRepository.findById(id);
        if(worker.isPresent()) return worker.get();
        else throw new APIRequestException("Worker not found with id="+id);

    }

    @Override
    public Worker UpdateWorkerProfile(Worker updatedWorker) {
        // Retrieve the existing worker from the database
        Worker existingWorker = workerRepository.findById(updatedWorker.getId()).orElse(null);
        if(existingWorker!=null) {
            if (updatedWorker.getFirstname() != null) {
                existingWorker.setFirstname(updatedWorker.getFirstname());
            }
            if (updatedWorker.getLastname() != null) {
                existingWorker.setLastname(updatedWorker.getLastname());
            }
            if (updatedWorker.getEmail() != null) {
                existingWorker.setEmail(updatedWorker.getEmail());
            }

        // Save the updated worker to the database
        return workerRepository.save(existingWorker);

        }
        else {
        System.out.println("Worker not found with ID: " + updatedWorker.getId());
        return null;
         }
    }



    @Override
    @Transactional
    public Patient registerPatient(RegisterPatientDTO registerPatientDTO,int workerId) {

        Optional<Worker> worker =workerRepository.findById(workerId);
        System.out.println("RegisterPatient ");


        if (worker.isPresent())
        {
            Worker worker1 = worker.get();

            //get sub district doctors from  worker village code with minimum patient count
            Doctor doctor = doctorRepository.findDoctorWithMinimumPatient(worker1.getVillagecode().getSubDistrict().getCode()).get(0);
            System.out.println("Fetched doctor"+doctor.toString());
            //AddDoctor
            registerPatientDTO.getPatient().setDoctor(doctor);
            doctor.setPatient_count(doctor.getPatient_count()+1);

            //Add registered worker
            registerPatientDTO.getPatient().setRegister_worker(worker1);
            //set patient village to worker village
            registerPatientDTO.getPatient().setVillage(worker1.getVillagecode());

            registerPatientDTO.getPatient().setFollowUpNumber(0);
            registerPatientDTO.getPatient().setStatus("NEW");

            Patient registeredpatient = patientRepository.save(registerPatientDTO.getPatient());
            registeredpatient.setRegisteredDate(Date.valueOf(LocalDate.now()));
            Patient patient=patientRepository.save(registeredpatient);
            System.out.println("Patient after save"+ patient);

            doctorRepository.save(doctor);
            System.out.println("Doctor after save "+doctor);

            FollowUpDetails followUpDetails = new FollowUpDetails();
            followUpDetails.setPatient(patient);
            followUpDetails.setFollowupDate(Date.valueOf(java.time.LocalDate.now()));
            followUpDetails.setFollowUpNo(patient.getFollowUpNumber());
            followUpDetails.setWorker(worker1);
            followUpDetails.setDoctor(doctor);

            FollowUpDetails newFollowUpDetails = followUpDetailsRepository.save(followUpDetails);
            System.out.println("follow Up after save"+newFollowUpDetails);


//            Questionarrie_ans questionarrieAns = new Questionarrie_ans();

            for (Questionarrie_ans questionarrieAns : registerPatientDTO.getQuestionarrieAnsList())
            {
                questionarrieAns.setFollowUpDetails(newFollowUpDetails);
                System.out.println("questionarrieAnsRepo"+questionarrieAnsRepo.save(questionarrieAns));
            }
            for (MedicalQueAns medicalQueAns : registerPatientDTO.getMedicalQueAnsList())
            {
                medicalQueAns.setPatient(patient);
                System.out.println("medicalQueAnsRepo"+medicalQueAnsRepo.save(medicalQueAns));
            }
            //consent image save
            if (!registerPatientDTO.getConsentImage().isEmpty() && !registerPatientDTO.getConsentImage().equals("-1"))
            {
                try {
                    System.out.println("in consent image");
                    PutObjectResult putObjectResult = amazonS3.putObject("manosarthi",String.valueOf(patient.getPatient_id()),registerPatientDTO.getConsentImage());
                    System.out.println(" after image upload");
                    System.out.println("putObjectResult register patient "+putObjectResult);     //patient info image

                }
                catch (Exception e) {
                    System.out.println(e.getMessage());
                    throw new RuntimeException(e);
                }
            }
            else throw new APIRequestException("Consent image not sent");

            //patient info image
            if(!registerPatientDTO.getImage().equals("-1") && !registerPatientDTO.getImage().isEmpty())
            {
                System.out.println("follow up upload image");
                PutObjectResult putObjectResult1 = amazonS3.putObject("manosarthi", patient.getPatient_id() +"_"+ newFollowUpDetails.getId(),registerPatientDTO.getImage());
                newFollowUpDetails.setImage(patient.getPatient_id() +"_"+ newFollowUpDetails.getId());
                followUpDetailsRepository.save(newFollowUpDetails);
                System.out.println("putObjectResult register patient "+putObjectResult1);
            }
            else {
                newFollowUpDetails.setImage("-1");
                followUpDetailsRepository.save(newFollowUpDetails);
            }



            return patientRepository.findById(patient.getPatient_id()).get();

        }

        return null;
    }

    @Override
    @Transactional
    public List<String> addNotReferredPatientAabhaId(int workerId, List<String> aabhaIds) {
        Optional<Worker> worker =workerRepository.findById(workerId);
        if(worker.isPresent()){
            Worker worker1 = worker.get();

            List<String> addedAabhaIds = new ArrayList<>();
            for (String aabhaId : aabhaIds) {
                NotRefAbhaId notRefAbhaId = new NotRefAbhaId();
                notRefAbhaId.setAabha_id(aabhaId);
                notRefAbhaId.setVillagecode(worker1.getVillagecode());
                notRefAbhaId.setWorkerid(worker1);
                notRefAbhaId.setRegisteredDate(Date.valueOf(LocalDate.now()));
                NotRefAbhaId id = notRefAbhaIdRepository.save(notRefAbhaId);
                addedAabhaIds.add(id.getAabha_id());
            }

            return addedAabhaIds;

        }
        else throw new APIRequestException("Worker not found with ID: " + workerId);

    }

//    @Override
//    public Patient registerPatient(Patient patient) {
//        Patient newPatient= patientRepository.save(patient);
//        return patient;
//    }

    @Override
    public List<String> getAabhaid(int workerid)
    {
        Optional<Worker> worker=workerRepository.findById(workerid);
        if(worker.isPresent()) {
            Worker worker1 = worker.get();
            Village village = worker1.getVillagecode();
            if(village==null)
            {
                throw new APIRequestException("village of worker not found");
            }
            List<String> nonrefabha = abhaIdRepository.findAllByVillage(village.getCode());
            List<String> refabha = patientRepository.findAllByVillage(village.getCode());
            List<String> combinedAbha = new ArrayList<>(nonrefabha);
            combinedAbha.addAll(refabha);
//            for (String encryptedValue : combinedAbha) {
////                // Decrypt the encrypted value
////                String decryptedValue = AesEncryptor.convertToEntityAttribute;
////                System.out.println("enc "+encryptedValue+"\n");
//                String decryptedValue=null;
//                try {
//                    decryptedValue = aesEncryptor.convertToEntityAttribute(encryptedValue);
//                } catch (Exception e) {
//                    throw new RuntimeException(e);
//                }
////
//////                encryptedValue.
////
////                // Use the decrypted value as needed
//                System.out.println("Decrypted value: " + decryptedValue);
//            }
//
////            combinedAbha.forEach( (encryptedValue) -> {
////                encryptedValue.
////            } );
            return combinedAbha;
        }
        else
            throw new APIRequestException("worker with given id not found");
    }

    public List<FollowUpSchedule> get_followup_schedule(int workerid)
    {
        Optional<Worker> worker=workerRepository.findById(workerid);
        if(worker.isPresent())
        {


//            Date startDate = Date.valueOf(LocalDate.now().plusDays(-7));
//            Date endDate = Date.valueOf(LocalDate.now().plusDays(7));

            Date requiredDate = Date.valueOf(LocalDate.now().plusDays(7));

            int villagecode=worker.get().getVillagecode().getCode();
            //followup schedule is from village code hence after reassigning of worker no problem
            return followUpScheduleRepository.findbyDateAndVill(requiredDate,villagecode);

        }
        else {
            throw new APIRequestException("Worker not found");
        }

    }

    public List<Prescription> getprescriptions(int workerid)
    {
        Optional<Worker> worker=workerRepository.findById(workerid);
        if(worker.isPresent())
        {
            int villagecode=worker.get().getVillagecode().getCode();
            return prescriptionRepository.getActivePrescriptionsOfVillage(villagecode);
        }
        else {
            throw new APIRequestException("Worker not found");
        }

    }


    @Autowired
    private WebClient webClientBuilder;

    @Override
    @Transactional
    public int addFollowUpDetails(RegisterFollowUpDetailsDTO registerFollowUpDetailsDTO, int workerid) {

        //return -1 for location error
        //return -2 if follow up is taken before date
        //return patientId if everyhing is ok

        Optional<Worker> worker = workerRepository.findById(workerid);
        Optional<Patient> patient = patientRepository.findById(registerFollowUpDetailsDTO.getPatientID());
        if(worker.isPresent() && patient.isPresent()) {

            System.out.println("in add followup details");
            String result= webClientBuilder
                    .get()
//                    .uri("https://kgis.ksrsac.in:9000/genericwebservices/ws/getlocationdetails?coordinates=12.844988,77.663201&type=dd")
                    .uri("https://kgis.ksrsac.in:9000/genericwebservices/ws/getlocationdetails?coordinates="+registerFollowUpDetailsDTO.getLatitude()+","+registerFollowUpDetailsDTO.getLongitude()+"&type=dd")
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
//            if(!result.equals("")) throw new APIRequestException("unable to check location"+ result);
            System.out.println("locatio fetch result"+ result);


            JSONArray jsonArray = new JSONArray(result);
            JSONObject jsonObject = jsonArray.getJSONObject(0);

            //check if message status is 200 or nor
            if(!jsonObject.get("message").equals("200")) throw new APIRequestException("ERROR in location checking "+jsonObject.get("message").toString());
            int locationVillage = Integer.parseInt(jsonObject.get("LGD_VillageCode").toString());
            if(locationVillage != worker.get().getVillagecode().getCode() )
            {
                System.out.println("jsonObject.get(\"LGD_VillageCode\").equals(worker.get().getVillagecode().getCode()  "+jsonObject.get("LGD_VillageCode").equals(worker.get().getVillagecode().getCode()));
                System.out.println("village code does not matched api res "+ jsonObject.get("LGD_VillageCode")+"worker village code"+worker.get().getVillagecode().getCode());
                return -1;   //return -1 if village code does not match
            }
            System.out.println("village code matched "+ jsonObject.get("LGD_VillageCode"));

            Optional<FollowUpSchedule> getfollowUpSchedule = followUpScheduleRepository.findByPatientID(registerFollowUpDetailsDTO.getPatientID());
            if(getfollowUpSchedule.isPresent()) {
                if (getfollowUpSchedule.get().getNextFollowUpDate().after(java.sql.Date.valueOf(LocalDate.now())) )
                {
                    System.out.println("follow up before date");
                    return -2;
                }
            }
            else throw new APIRequestException("FollowUpSchedule not found");

            System.out.println("add follow up");


            // check for the location of followup
            FollowUpDetails followUpDetails=new FollowUpDetails();
            followUpDetails.setPatient(patient.get());
            followUpDetails.setDoctor(patient.get().getDoctor());
            followUpDetails.setWorker(worker.get());
            followUpDetails.setFollowupDate(Date.valueOf(LocalDate.now()));
            followUpDetails.setFollowUpNo(patient.get().getFollowUpNumber()+1);

            FollowUpDetails newFollowUpDetails= followUpDetailsRepository.save(followUpDetails);

            for(Questionarrie_ans questionarrieAns : registerFollowUpDetailsDTO.getQuestionarrieAnsList())
            {
                questionarrieAns.setFollowUpDetails(newFollowUpDetails);
                questionarrieAnsRepo.save(questionarrieAns);
            }

            patient.get().setFollowUpNumber(patient.get().getFollowUpNumber()+1);
            patient.get().setReferred(registerFollowUpDetailsDTO.isReferredDuringFollowUp());
            patientRepository.save(patient.get());



            if(getfollowUpSchedule.isPresent() ) {
                FollowUpSchedule followUpSchedule = getfollowUpSchedule.get();

                //for missed follow up
                LocalDate followUpSyncBefore = followUpSchedule.getNextFollowUpDate().toLocalDate().plusDays(3);
                System.out.println("followUpSyncBefore" + followUpSyncBefore);
                System.out.println("LocalDate.now()  "+LocalDate.now());
                if (followUpSyncBefore.isBefore(LocalDate.now())) {      //missed
                    System.out.println(" in missed follow up");
                    MissedFollowUp missedFollowUp = new MissedFollowUp();
                    missedFollowUp.setPatient(patient.get());
                    missedFollowUp.setFollowUpDate(followUpSchedule.getNextFollowUpDate());
                    missedFollowUp.setCompletedDate(Date.valueOf(LocalDate.now()));
                    //add worker id of worker assigned to that followup
                    missedFollowUp.setWorker(followUpSchedule.getWorker());
                    missedFollowUpRepository.save(missedFollowUp);
                }
                //add current worker id to updated followup schedule(this is useful when worker get reassigned)
                followUpSchedule.setWorker(worker.get());
                followUpSchedule.setFollowUpRemaining(followUpSchedule.getFollowUpRemaining() - 1);
                if (followUpSchedule.getFollowUpRemaining() > 0) {
                    if (Objects.equals(followUpSchedule.getType(), "WEEKLY")) {
                        System.out.println("nextDate WEEKLY");
                        followUpSchedule.setNextFollowUpDate(Date.valueOf(followUpSchedule.getNextFollowUpDate().toLocalDate().plusWeeks(1)));
                    } else if (Objects.equals(followUpSchedule.getType(), "BIWEEKLY")) {
                        System.out.println("nextDate BIWEEKLY");
                        followUpSchedule.setNextFollowUpDate(Date.valueOf(followUpSchedule.getNextFollowUpDate().toLocalDate().plusWeeks(2)));
                    } else if (Objects.equals(followUpSchedule.getType(), "MONTHLY")) {
                        System.out.println("nextDate MONTHLY");
                        followUpSchedule.setNextFollowUpDate(Date.valueOf(followUpSchedule.getNextFollowUpDate().toLocalDate().plusMonths(1)));
                    } else throw new APIRequestException("Follow Up Type not specified correctly");
                }

                followUpScheduleRepository.save(followUpSchedule);
            }
            else throw new APIRequestException("No followup schedule found");


            // save image
            if(!registerFollowUpDetailsDTO.getImage().equals("-1") && !registerFollowUpDetailsDTO.getImage().isEmpty())
            {
                System.out.println("follow up upload image");
                PutObjectResult putObjectResult1 = amazonS3.putObject("manosarthi", patient.get().getPatient_id() +"_"+ newFollowUpDetails.getId(),registerFollowUpDetailsDTO.getImage());
                newFollowUpDetails.setImage(patient.get().getPatient_id() +"_"+ newFollowUpDetails.getId());
                followUpDetailsRepository.save(newFollowUpDetails);
                System.out.println("putObjectResult register patient "+putObjectResult1);
            }
            else {
                newFollowUpDetails.setImage("-1");
                followUpDetailsRepository.save(newFollowUpDetails);
            }



            return patient.get().getPatient_id();
        }
        else throw new APIRequestException("Worker or patient not found with id ");

//        return 0;
    }

}
