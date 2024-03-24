package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Worker;
import org.springframework.http.ResponseEntity;

public interface WorkerService {
    ResponseEntity<Worker> UpdateWorkerProfile(Worker updatedWorker);
}
