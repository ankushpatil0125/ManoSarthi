package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Village;
import com.team9.manosarthi_backend.Entities.Worker;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface SupervisorService {
    Worker addworker(Worker worker);
    List<Village> findSubVillage(int userid,boolean assigned);

    List<Worker> getSubWorkers(int userid,int pagenumber, int pagesize);

    List<Worker> getVillWorker(int vilcode);

    ResponseEntity<Worker> ReassignWorker(Worker updatedWorker);

//    List<Village> findSubAllVillage(int userid);

}
