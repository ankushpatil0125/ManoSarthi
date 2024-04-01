package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.DTO.RegisterPatientDTO;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
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


        if (worker.isPresent())
        {
            Worker worker1 = worker.get();

            //get sub district doctors from  worker village code with minimum patient count
            Doctor doctor = doctorRepository.findDoctorWithMinimumPatient(worker1.getVillagecode().getSubDistrict().getCode()).get(0);
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

            doctorRepository.save(doctor);

            FollowUpDetails followUpDetails = new FollowUpDetails();
            followUpDetails.setPatient(patient);
            followUpDetails.setFollowupDate(Date.valueOf(java.time.LocalDate.now()));
            followUpDetails.setFollowUpNo(patient.getFollowUpNumber());
            followUpDetails.setWorker(worker1);
            followUpDetails.setDoctor(doctor);

            FollowUpDetails newFollowUpDetails = followUpDetailsRepository.save(followUpDetails);

//            Questionarrie_ans questionarrieAns = new Questionarrie_ans();

            for (Questionarrie_ans questionarrieAns : registerPatientDTO.getQuestionarrieAnsList())
            {
                questionarrieAns.setFollowUpDetails(newFollowUpDetails);
                questionarrieAnsRepo.save(questionarrieAns);
            }
            for (MedicalQueAns medicalQueAns : registerPatientDTO.getMedicalQueAnsList())
            {
                medicalQueAns.setPatient(patient);
                medicalQueAnsRepo.save(medicalQueAns);
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



}
