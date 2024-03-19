package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Supervisor;
import com.team9.manosarthi_backend.Entities.Village;
import com.team9.manosarthi_backend.Entities.Worker;

import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Repositories.*;
import lombok.AllArgsConstructor;


import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.lang.reflect.InvocationTargetException;
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
//        user.setPassword(passwordEncoder.encode("changeme"));

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

        newWorker.setUser(newuser);

        workerRepository.save(newWorker);

        //to get password in decoded form
        newuser.setPassword(password);
        newWorker.setUser(newuser);
        return newWorker;
    }

    //find villages under subdistrict where worker not assigned
    @Override
    public List<Village> findNoWorkerSubVillage(int userid)
    {
        Optional<Supervisor> supervisor=supervisorRepository.findById(userid);
        if (supervisor.isPresent()) {
            int subdid = supervisor.get().getSubdistrictcode().getCode();
            return villageRepository.findnoworkerVillBySubdistrict(subdid);
        } else {
            return Collections.emptyList(); // Return an empty list if supervisor is not found
        }
    }

    //find all villages under subdistrict
    @Override
    public List<Village> findSubVillage(int userid)
    {
        Optional<Supervisor> supervisor=supervisorRepository.findById(userid);
        if (supervisor.isPresent()) {
            int subdid = supervisor.get().getSubdistrictcode().getCode();
            return villageRepository.findVillBySubdistrict(subdid);
        } else {
            return Collections.emptyList(); // Return an empty list if supervisor is not found
        }
    }
    @Override
    public List<Worker> getSubWorkers(int userid,int pagenumber,int pagesize)
    {

        Pageable p = PageRequest.of(pagenumber,pagesize);
        Optional<Supervisor> supervisor=supervisorRepository.findById(userid);
        if (supervisor.isPresent()) {
            int subdid = supervisor.get().getSubdistrictcode().getCode();
            Page<Worker> pageWorker= workerRepository.findWorkerBySubistrict(subdid,p);
            List<Worker> allWorkers=pageWorker.getContent();
            return allWorkers;
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

    @Override
    public ResponseEntity<Worker> updateWorker(Worker updatedWorker, Boolean reassign) {
        // Retrieve the existing worker from the database
        Worker existingWorker = workerRepository.findById(updatedWorker.getId()).orElse(null);
        System.out.println("updated details"+updatedWorker.getFirstname());
        if(existingWorker!=null)
        {
        //you can update village code only in reassignment
            if(reassign && updatedWorker.getVillagecode()!=null && updatedWorker.getVillagecode().getCode() != existingWorker.getVillagecode().getCode())
            {
                int oldvillagecode=existingWorker.getVillagecode().getCode();
                Optional<Village> oldvillage=villageRepository.findById(oldvillagecode);
                oldvillage.ifPresent( villagetemp ->{
                    villagetemp.setWorker_count(0);
                    villageRepository.save(villagetemp);
                } );
                int newvillagecode=updatedWorker.getVillagecode().getCode();
                Optional<Village> newvillage=villageRepository.findById(newvillagecode);
                newvillage.ifPresent( villagetemp ->{
                    villagetemp.setWorker_count(villagetemp.getWorker_count()+1);
                    villageRepository.save(villagetemp);
                    existingWorker.setVillagecode(villagetemp);
                } );

            }
            //you can update other fields in update profile
            else if(!reassign) {
            //update non null properties
            if (updatedWorker.getFirstname() != null) {
                existingWorker.setFirstname(updatedWorker.getFirstname());
            }
            if (updatedWorker.getLastname() != null) {
                existingWorker.setLastname(updatedWorker.getLastname());
            }
            if (updatedWorker.getEmail() != null) {
                existingWorker.setEmail(updatedWorker.getEmail());
            }
            }
            // Save the updated worker to the database
            Worker updatedworker= workerRepository.save(existingWorker);
            return ResponseEntity.ok(updatedworker);

        } else {
            System.out.println("Worker not found with ID: " + updatedWorker.getId());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
