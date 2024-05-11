package com.team9.manosarthi_backend.ServicesImpl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.team9.manosarthi_backend.DTO.FollowUpDetailsDTO;
import com.team9.manosarthi_backend.DTO.PatientFollowUpPrescriptionDTO;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.*;
import com.team9.manosarthi_backend.Services.DoctorService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.EnableTransactionManagement;

import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
@AllArgsConstructor
@EnableTransactionManagement
public class DoctorServiceImpl implements DoctorService {

    private PatientRepository patientRepository;
    private DoctorRepository doctorRepository;
    private PrescriptionRepository prescriptionRepository;
    private MedicineRepository medicineRepository;
    private FollowUpDetailsRepository followUpDetailsRepository;
    private FollowUpScheduleRepository followUpScheduleRepository;
    private DiseaseRepository diseaseRepository;
    private WorkerRepository workerRepository;
    private AmazonS3 amazonS3;


    @Override
    public Doctor viewProfile(int id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        if (doctor.isPresent()) {
            return doctor.get();
        }
        else throw new APIRequestException("Doctor not found for id " + id);
    }

    @Override
    public List<Patient> getPatientList(String type,int doctorId, int pagenumber, int pagesize) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        int subDistrictCode;
        if(doctor.isPresent()) {
            subDistrictCode= doctor.get().getSubdistrictcode().getCode();
            Pageable pageable = PageRequest.of(pagenumber,pagesize);
            Page<Patient> patientList=patientRepository.getPatientListBySubdistrict(type,subDistrictCode,pageable);
            return patientList.getContent();
        }
        else return null;
    }

//    @Override
//    public List<Patient> getNewPatientDetails(int doctorId, int pagenumber, int pagesize) {
//
//        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
//        int subDistrictCode;
//        if(doctor.isPresent()) {
//            subDistrictCode= doctor.get().getSubdistrictcode().getCode();
//            Pageable pageable = PageRequest.of(pagenumber,pagesize);
//            Page<Patient> patientList=patientRepository.getNewPatientBySubdistrict(subDistrictCode,pageable);
//            return patientList.getContent();
//        }
//        else return null;
//    }

    @Override
    public Patient  getPatient(int doctorId,int patientId) {
       Optional<Patient> patient= patientRepository.findById(patientId);
       Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        if(patient.isPresent() && doctor.isPresent())
        {
            if( doctor.get().getSubdistrictcode().getCode() != patient.get().getVillage().getSubDistrict().getCode() )
                return null;
            return patient.get();
        }
       return null;
    }

    @Override
    @Transactional
    public Prescription givePrescription(PatientFollowUpPrescriptionDTO patientFollowUpPrescriptionDTO) {



        System.out.println("patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id()   "+patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id());
        Optional<Patient> patient = patientRepository.findById(patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id());
        System.out.println("patient "+patient.isPresent());

        if(patient.isPresent())
        {
            Patient newPatient = patient.get();
            System.out.println("newPatient"+newPatient.getPatient_id());

            patientFollowUpPrescriptionDTO.getPrescription().setDate(Date.valueOf(java.time.LocalDate.now()));
            // get latest follow up id
            System.out.println("patient.get().getFollowUpNumber() "+patient.get().getFollowUpNumber());
            int latestFollowUpId = patient.get().getFollowUpNumber();
            Optional<FollowUpDetails> latestFollowUp = followUpDetailsRepository.findFollowUpDetailsByFollowUpNo(patient.get().getPatient_id(),latestFollowUpId);
////            Optional<FollowUpDetails> followUpDetails = followUpDetailsRepository.findById(patientFollowUpPrescriptionDTO.getPrescription().getFollowUpDetails().getId());
            if( latestFollowUp.isPresent())
            {
                System.out.println("latestFollowUp "+latestFollowUp.get().getId());
                patientFollowUpPrescriptionDTO.getPrescription().setFollowUpDetails(latestFollowUp.get());
                if(latestFollowUp.get().getFollowUpNo()==0) // add a new entry to followup schedule
                {
                    // change patient from status=new to ongoing as followupno=0 for new registered patient
                    patient.get().setStatus("ONGOING");
                    patientRepository.save(patient.get());
                    // add follow up schedule
                    //For NEW Patient add new schedule
                    Date nextDate;
                    System.out.println("FollowupType"+patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType());
                    if(Objects.equals(patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType(), "WEEKLY")) {
                        System.out.println("nextDate WEEKLY");
                        nextDate = Date.valueOf(LocalDate.now().plusWeeks(1));
                    }
                    else if (patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType()=="BIWEEKLY")
                    {
                        System.out.println("nextDate BIWEEKLY");
                        nextDate = Date.valueOf(LocalDate.now().plusWeeks(2));
                    }
                    else if (patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType()=="MONTHLY")
                    {
                        System.out.println("nextDate MONTHLY");
                        nextDate = Date.valueOf(LocalDate.now().plusMonths(1));
                    }
                    else throw new APIRequestException("Follow Up Type not specified correctly");

                    if (patientFollowUpPrescriptionDTO.isUpdateFollowUpSchedule()){
                        patientFollowUpPrescriptionDTO.getFollowUpSchedule().setPatient(patient.get());
                        patientFollowUpPrescriptionDTO.getFollowUpSchedule().setVillage(patient.get().getVillage());
                        patientFollowUpPrescriptionDTO.getFollowUpSchedule().setNextFollowUpDate(nextDate);
//                        find current worker in patient village and assign followup to him
                        List<Worker> worker=workerRepository.findWorkerByVillage(patient.get().getVillage().getCode());
                        if(!worker.isEmpty())
                            patientFollowUpPrescriptionDTO.getFollowUpSchedule().setWorker(worker.get(0));
                        else
                            System.out.println("worker not found");
//                        //find current worker in patient village and assign followup to him
//                        List<Worker> worker=workerRepository.findWorkerByVillage(patient.get().getVillage().getCode());
//                        patientFollowUpPrescriptionDTO.getFollowUpSchedule().setWorker(worker.get(0));
                        FollowUpSchedule followUpSchedule= followUpScheduleRepository.save(patientFollowUpPrescriptionDTO.getFollowUpSchedule());
                        System.out.println("followUpSchedule  "+followUpSchedule.getId());
                    }
                    else throw new APIRequestException("Follow Up Schedule not specified correctly");

                }
                    //
                else {
                    //set reffered during followup to false
                    patient.get().setReferred(false);
                    patientRepository.save(patient.get());

                    //set previous active prescription to false and update follow-up schedule
                    Prescription oldActivePrescription = prescriptionRepository.getActivePrescription(patient.get().getPatient_id());
                    Set<Disease> olddiseases=oldActivePrescription.getDisease_code();
                    for(Disease disease:olddiseases)
                    {
                        Optional<Disease> diseasegot = diseaseRepository.findById(disease.getCode());
                        if(diseasegot.isPresent()) {
                            diseasegot.get().setPatient_count(diseasegot.get().getPatient_count() - 1);
                            diseaseRepository.save(diseasegot.get());
                        }
                        else
                        {
                            throw new APIRequestException("no disease found");
                        }
                    }
                    oldActivePrescription.setActive(false);
                    System.out.println("old diseases set");
                    prescriptionRepository.save(oldActivePrescription);

                    if(patientFollowUpPrescriptionDTO.isUpdateFollowUpSchedule())
     {
                        Optional<FollowUpSchedule> followUpSchedule = followUpScheduleRepository.findByPatientID(patient.get().getPatient_id());
                        if(followUpSchedule.isPresent())
                        {
                            Date nextDate;
                            System.out.println("FollowupType"+patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType());
                            if(Objects.equals(patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType(), "WEEKLY")) {
                                System.out.println("nextDate WEEKLY");
                                nextDate = Date.valueOf(LocalDate.now().plusWeeks(1));
                            }
                            else if (patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType()=="BIWEEKLY")
                            {
                                System.out.println("nextDate BIWEEKLY");
                                nextDate = Date.valueOf(LocalDate.now().plusWeeks(2));
                            }
                            else if (patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType()=="MONTHLY")
                            {
                                System.out.println("nextDate MONTHLY");
                                nextDate = Date.valueOf(LocalDate.now().plusMonths(1));
                            }
                            else throw new APIRequestException("Follow Up Type not specified correctly");

                            followUpSchedule.get().setNextFollowUpDate(nextDate);
                            followUpSchedule.get().setFollowUpRemaining(patientFollowUpPrescriptionDTO.getFollowUpSchedule().getFollowUpRemaining());
                            //assign current village worker to followup
                            List<Worker> worker=workerRepository.findWorkerByVillage(patient.get().getVillage().getCode());
                            if(!worker.isEmpty())
                                patientFollowUpPrescriptionDTO.getFollowUpSchedule().setWorker(worker.get(0));
                            else
                                System.out.println("worker not found");
                            FollowUpSchedule newfollowUpSchedule= followUpScheduleRepository.save(patientFollowUpPrescriptionDTO.getFollowUpSchedule());
                            System.out.println("newfollowUpSchedule  "+newfollowUpSchedule.getId());

                        }
                        else throw new APIRequestException("Follow Up Schedule not found");
                    }
                }
                Set<Disease> newdiseases = new HashSet<>(patientFollowUpPrescriptionDTO.getDiseaseList());
                System.out.println("new diseases"+newdiseases);
                for(Disease disease:newdiseases) {

                    Optional<Disease> diseasegot = diseaseRepository.findById(disease.getCode());
                    if(diseasegot.isPresent()) {
                        diseasegot.get().setPatient_count(diseasegot.get().getPatient_count() + 1);
                        diseaseRepository.save(diseasegot.get());
                    }
                    else
                    {
                        throw new APIRequestException("no disease found");
                    }
                }
                System.out.println("new diseases set");
                patientFollowUpPrescriptionDTO.getPrescription().setActive(true);
            }
            else
            {
                throw new APIRequestException("No followUpDetails with id : "+patientFollowUpPrescriptionDTO.getPrescription().getFollowUpDetails().getId());
            }

            Set<Disease> diseasetostore=new HashSet<>();
            for (Disease disease : patientFollowUpPrescriptionDTO.getDiseaseList()) {
                System.out.println("Disease"+disease);
                Optional<Disease> diseasegot=diseaseRepository.findById(disease.getCode());
                if(diseasegot.isPresent())
                {
                    System.out.println("got d"+diseasegot.get());
                    diseasetostore.add(diseasegot.get());
                }
            }
            System.out.println("diseasetostore"+diseasetostore);

            patientFollowUpPrescriptionDTO.getPrescription().setDisease_code(diseasetostore);
            System.out.println("Disease");

            Prescription newPrescription = prescriptionRepository.save(patientFollowUpPrescriptionDTO.getPrescription());
            System.out.println("newPrescription"+newPrescription.getPrescription_id());
            latestFollowUp.get().setPrescription(newPrescription);
            followUpDetailsRepository.save(latestFollowUp.get());
            System.out.println("newPrescription "+newPrescription.getPrescription_id());
            for (Medicine medicine : patientFollowUpPrescriptionDTO.getMedicineList())
            {
                medicine.setPrescription(newPrescription);
                medicineRepository.save(medicine);
            }

            System.out.println("service completed");
            Prescription prescr= prescriptionRepository.findById(newPrescription.getPrescription_id()).orElseThrow(()->  new APIRequestException("Failed to add Prescription"));
            return prescr;

        }
        else {
            throw new APIRequestException("Patient not found with id "+ patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id());
        }

    }

    @Override
    public List<FollowUpDetailsDTO> getFollowups(int pagenumber,int pagesize,int doctorId, int patientId) {
        Pageable pageable = PageRequest.of(pagenumber,pagesize);
        Page<FollowUpDetails> followups= followUpDetailsRepository.findFollowUpDetailsByDoctorAndPatient(patientId,doctorId,pageable);

        List<FollowUpDetailsDTO> followupDTOList=new ArrayList<>();
        for(FollowUpDetails followup:followups)
        {
            FollowUpDetailsDTO followUpDetailsDTO=new FollowUpDetailsDTO();

            if(!followup.getImage().isEmpty() && !followup.getImage().equals("-1"))
            {
                System.out.println("in follow up image "+followup.getImage());
                String res = amazonS3.getObjectAsString("manosarthi",followup.getImage());
//                S3Object s3Object= amazonS3.getObject("manosarthi",followup.getImage());
//                S3ObjectInputStream content = s3Object.getObjectContent();
//                System.out.println("content"+content.readAllBytes());
                System.out.println("image fetched");
//                System.out.println("res" + res);
                followUpDetailsDTO.setFollowUpImage(res);
//                try {
//
//                    followUpDetailsDTO.setFollowUpImage(new InputStreamResource(content));
//                }
//                catch (Exception e){
//                    System.out.println(e.getMessage());
//                    throw new RuntimeException(e);
//                }
            }

            followUpDetailsDTO.followup(followup);
            followupDTOList.add(followUpDetailsDTO);
        }
//        return followups.getContent();
        return followupDTOList;
    }

    @Override
    public List<Patient> getReferredPatient(int doctorId,int pagenumber, int pagesize) {
        Pageable pageable = PageRequest.of(pagenumber,pagesize);
        Page<Patient> patientList= patientRepository.getReferredPatientsDuringFollowup(doctorId,pageable);

        return patientList.getContent();
    }


}
