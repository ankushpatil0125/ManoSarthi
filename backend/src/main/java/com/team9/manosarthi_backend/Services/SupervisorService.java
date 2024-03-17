package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Village;
import com.team9.manosarthi_backend.Entities.Worker;

import java.util.List;

public interface SupervisorService {
    Worker addworker(Worker worker);
    List<Village> findVillage(int userid);

    List<Worker> getSubWorkers(int userid);

    Worker getVillWorker(int vilcode);
}
