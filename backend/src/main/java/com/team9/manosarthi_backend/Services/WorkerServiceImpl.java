package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Config.AesEncryptor;
import com.team9.manosarthi_backend.DTO.FollowupScheduleDTO;
import com.team9.manosarthi_backend.DTO.RegisterPatientDTO;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class WorkerServiceImpl implements WorkerService{


    private WorkerRepository workerRepository;

    private PatientRepository patientRepository;

    private Questionarrie_ansRepo questionarrieAnsRepo;

    private MedicalQueAnsRepo medicalQueAnsRepo;

    private DoctorRepository doctorRepository;

    private FollowUpDetailsRepository followUpDetailsRepository;

    private AbhaIdRepository abhaIdRepository;

    private AesEncryptor aesEncryptor;

    private FollowUpScheduleRepository followUpScheduleRepository;

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
    public Patient registerPatient(RegisterPatientDTO registerPatientDTO,int workerId) {

        Optional<Worker> worker =workerRepository.findById(workerId);
        System.out.println("RegisterPatient DTO"+ registerPatientDTO);


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

            Patient patient = patientRepository.save(registerPatientDTO.getPatient());
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



            return patientRepository.findById(patient.getPatient_id()).get();

        }

        return null;
    }

//    @Override
//    public Patient registerPatient(Patient patient) {
//        Patient newPatient= patientRepository.save(patient);
//        return patient;
//    }

    @Override
    public List<String> getAabhaid(Integer workerid)
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

    public List<FollowUpSchedule> get_followup_schedule(Integer workerid)
    {
        Optional<Worker> worker=workerRepository.findById(workerid);
        if(worker.isPresent())
        {
            Calendar calendar = Calendar.getInstance();
            Date startDate = new Date(calendar.getTimeInMillis());

            // Calculate the end date (today + 6 days)
            calendar.add(Calendar.DAY_OF_MONTH, 6);
            Date endDate = new Date(calendar.getTimeInMillis());
            int villagecode=worker.get().getVillagecode().getCode();
                return followUpScheduleRepository.findbyDateAndVill(startDate,endDate,villagecode);
        }
        else {
            throw new APIRequestException("Worker not found");
        }

    }
}
