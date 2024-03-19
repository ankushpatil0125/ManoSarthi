package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Supervisor;
import com.team9.manosarthi_backend.Entities.Village;
import com.team9.manosarthi_backend.Entities.Worker;

import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SupervisorServiceImpl implements SupervisorService{
    private WorkerRepository workerRepository;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private VillageRepository villageRepository;
    private SupervisorRepository supervisorRepository;

    @Override
    public Worker addworker(Worker worker) {
        Worker newWorker =  workerRepository.save(worker);


        //Add user to user database
        User user = new User();

        user.setUsername("WORKER" + newWorker.getId());

        String password=PasswordGeneratorService.generatePassword();
        System.out.println(password);
        user.setPassword(passwordEncoder.encode(password));

        user.setRole("ROLE_WORKER");
        User newuser = userRepository.save(user);


        //Increase count of worker in village
        Optional<Village> village = villageRepository.findById(newWorker.getVillagecode().getCode());


        village.ifPresent( villagetemp ->{
            villagetemp.setWorker_count(villagetemp.getWorker_count()+1);
            villageRepository.save(villagetemp);
            newWorker.setVillagecode(villagetemp);
        } );


        newWorker.setUser(user);
        workerRepository.save(newWorker);

        //to get password in decoded form
        newuser.setPassword(password);
        newWorker.setUser(newuser);
        return newWorker;
    }

    @Override
    public List<Village> findVillage(int userid)
    {
        Optional<Supervisor> supervisor=supervisorRepository.findById(userid);
        if (supervisor.isPresent()) {
            int subdid = supervisor.get().getSubdistrictcode().getCode();
            return villageRepository.findVillageBySubdistrict(subdid);
        } else {
            return Collections.emptyList(); // Return an empty list if supervisor is not found
        }
    }

    @Override
    public List<Worker> getSubWorkers(int userid)
    {
        Optional<Supervisor> supervisor=supervisorRepository.findById(userid);
        if (supervisor.isPresent()) {
            int subdid = supervisor.get().getSubdistrictcode().getCode();
            return workerRepository.findWorkerBySubistrict(subdid);
        } else {
            return Collections.emptyList(); // Return an empty list if supervisor is not found
        }
    }

    @Override
    public Worker getVillWorker(int vilcode)
    {
        Optional<Worker> worker=workerRepository.findWorkerByVillage(vilcode);
        if (worker.isPresent()) {
            return worker.get();
        } else {
            return null;
        }
    }

}
