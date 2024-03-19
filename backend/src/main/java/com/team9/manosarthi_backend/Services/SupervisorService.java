package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Village;
import com.team9.manosarthi_backend.Entities.Worker;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SupervisorService {
    Worker addworker(Worker worker);
    List<Village> findNoWorkerSubVillage(int userid);

    List<Worker> getSubWorkers(int userid,int pagenumber, int pagesize);

    Worker getVillWorker(int vilcode);

    ResponseEntity<Worker> updateWorker(Worker updatedWorker);

    List<Village> findSubVillage(int userid);

}
