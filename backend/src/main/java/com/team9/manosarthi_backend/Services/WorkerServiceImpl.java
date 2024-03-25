package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Entities.Worker;
import com.team9.manosarthi_backend.Repositories.PatientRepository;
import com.team9.manosarthi_backend.Repositories.WorkerRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class WorkerServiceImpl implements WorkerService{


    private WorkerRepository workerRepository;

    private PatientRepository patientRepository;
    @Override
    public ResponseEntity<Worker> UpdateWorkerProfile(Worker updatedWorker) {
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
        Worker updatedworker= workerRepository.save(existingWorker);
        return ResponseEntity.ok(updatedworker);
        }
        else {
        System.out.println("Worker not found with ID: " + updatedWorker.getId());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
         }
    }

    @Override
    public List<Patient> registerPatient(List<Patient> patients) {
        List<Patient> patientList= patientRepository.saveAll(patients);

        return patientList;
    }


}
