package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Entities.Worker;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface WorkerService {
    ResponseEntity<Worker> UpdateWorkerProfile(Worker updatedWorker);

    List<Patient> registerPatient(List<Patient> patients);
}
