package com.team9.manosarthi_backend.ServicesImpl;

import com.team9.manosarthi_backend.DTO.WorkerDetailsDTO;
import com.team9.manosarthi_backend.Entities.*;

import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.*;
import com.team9.manosarthi_backend.Services.SupervisorService;
import lombok.AllArgsConstructor;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.apache.commons.lang3.tuple.Pair;


@Service
@AllArgsConstructor
public class SupervisorServiceImpl implements SupervisorService {
    private WorkerRepository workerRepository;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private VillageRepository villageRepository;
    private SupervisorRepository supervisorRepository;
    private FollowUpScheduleRepository followUpScheduleRepository;
    private MissedFollowUpRepository missedFollowUpRepository;

    @Override
    public Supervisor viewProfile(int id) {
        Optional<Supervisor> supervisor = supervisorRepository.findById(id);
        if (supervisor.isPresent()) {
            return supervisor.get();
        }
        else throw new APIRequestException("Supervisor not found for id " + id);
    }

    @Override
    public Worker addworker(Worker worker) {


        Optional<Village> villageOptional = villageRepository.findById(worker.getVillagecode().getCode());




        Village village = villageOptional.orElseThrow(() -> new APIRequestException("Cannot add worker: Village not found."));


        if (village.getSubDistrict().getDoctor_count() > 0) {
            Worker newWorker = workerRepository.save(worker);
            //Add user to user database
            User user = new User();

            user.setUsername("WORKER" + newWorker.getId());
//        user.setPassword(passwordEncoder.encode("changeme"));


            String password= PasswordGeneratorService.generatePassword();
            System.out.println(password);
            user.setPassword(passwordEncoder.encode(password));

            user.setRole("ROLE_WORKER");
            user.setEmail(newWorker.getEmail());
            User newuser = userRepository.save(user);


            //Increase count of worker in village
            village.setWorker_count(village.getWorker_count() + 1);
            villageRepository.save(village);
            newWorker.setVillagecode(village);
            newWorker.setUser(newuser);

            workerRepository.save(newWorker);

            //to get password in decoded form
            newuser.setPassword(password);
            newWorker.setUser(newuser);
            return newWorker;

        }
        else {
            throw new APIRequestException("Cannot add worker: Doctor count in the subdistrict is not greater than zero.");
        }



    }

    //find villages under subdistrict where worker not assigned
    @Override
    public List<Village> findSubVillage(int userid,boolean assigned)
    {
        Optional<Supervisor> supervisor=supervisorRepository.findById(userid);
        if (supervisor.isPresent()) {
            int subdid = supervisor.get().getSubdistrictcode().getCode();
            if(!assigned)
                return villageRepository.findnoworkerVillBySubdistrict(subdid);
            return villageRepository.findassworkerVillBySubdistrict(subdid);
        } else {
            return Collections.emptyList(); // Return an empty list if supervisor is not found
        }
    }

    //find all villages under subdistrict
//    @Override
//    public List<Village> findSubAllVillage(int userid)
//    {
//        Optional<Supervisor> supervisor=supervisorRepository.findById(userid);
//        if (supervisor.isPresent()) {
//            int subdid = supervisor.get().getSubdistrictcode().getCode();
//            return villageRepository.findVillBySubdistrict(subdid);
//        } else {
//            return Collections.emptyList(); // Return an empty list if supervisor is not found
//        }
//    }
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
    public List<Worker> getVillWorker(int vilcode)
    {
        List<Worker> Workers=workerRepository.findWorkerByVillage(vilcode);
        return Workers;
    }

    @Override
    public Pair<Worker,Boolean> ReassignWorker(Worker updatedWorker) {
        Boolean NeedtoAssign=false;
        // Retrieve the existing worker from the database
        Worker existingWorker = workerRepository.findById(updatedWorker.getId()).orElse(null);
        System.out.println("updated details"+updatedWorker.getFirstname());
        if(existingWorker!=null)
        {
        //you can update village code only in reassignment
            if(updatedWorker.getVillagecode()!=null && updatedWorker.getVillagecode().getCode() != existingWorker.getVillagecode().getCode())
            {

                int oldvillagecode=existingWorker.getVillagecode().getCode();
                Optional<Village> oldvillage=villageRepository.findById(oldvillagecode);
                if(oldvillage.isPresent())
                {
                        Village villagetemp=oldvillage.get();
                        if(!followUpScheduleRepository.findbyDateAndVill(Date.valueOf(LocalDate.now()), oldvillagecode).isEmpty())
                            NeedtoAssign=true;
                        villagetemp.setWorker_count(villagetemp.getWorker_count()-1);
                        villageRepository.save(villagetemp);
                }
                else {
                    throw new APIRequestException("Existing village not found");
                }
                int newvillagecode=updatedWorker.getVillagecode().getCode();
                Optional<Village> newvillage=villageRepository.findById(newvillagecode);
                newvillage.ifPresent( villagetemp ->{
                    villagetemp.setWorker_count(villagetemp.getWorker_count()+1);
                    villageRepository.save(villagetemp);
                    existingWorker.setVillagecode(villagetemp);
                } );
                // Save the updated worker to the database
                Worker updatedSavedWorker= workerRepository.save(existingWorker);
                return Pair.of(updatedSavedWorker,NeedtoAssign);
            }
            else {
                throw new APIRequestException("Either new village code is empty or existing and updated are same");
            }

        } else {
            throw new APIRequestException("Worker not found with ID: " + updatedWorker.getId());
        }
    }

    @Override
    public List<List<FollowUpSchedule>> subdistMissedFollowup(int userid)
    {
        Optional<Supervisor> supervisor=supervisorRepository.findById(userid);
        if (supervisor.isPresent()) {
            int subdid = supervisor.get().getSubdistrictcode().getCode();
            List<Worker> allworkers= workerRepository.findAllWorkerOfSubistrict(subdid);
            List<List<FollowUpSchedule>> allmissedFollowups=new ArrayList<>();
            for(Worker worker:allworkers)
            {
                //worker has 3 days time period of syncing.
                // after that period also date is not changed to next followup date show that as missed followup to supervisor
                Date requiredDate = Date.valueOf(LocalDate.now().minusDays(3));
                //List contain list of all missed of particular village
                allmissedFollowups.add(followUpScheduleRepository.findbyDateAndVill(requiredDate,worker.getVillagecode().getCode()));
            }
            return allmissedFollowups;
        } else {
            throw new APIRequestException("Supervisor not found");
        }
    }

    @Override
    public WorkerDetailsDTO workerdetails(int workerid,int userid)
    {

        Optional<Supervisor> supervisor = supervisorRepository.findById(userid);
        Optional<Worker> worker=workerRepository.findById(workerid);
        if(worker.get().getVillagecode().getSubDistrict().getCode()==supervisor.get().getSubdistrictcode().getCode()) {
            //worker has 3 days time period of syncing.
            // after that period also date is not changed to next followup date show that as missed followup to supervisor
            Date requiredDate = Date.valueOf(LocalDate.now().minusDays(3));
            //finding current missed followups
            List<FollowUpSchedule> currfollowupsmissed = followUpScheduleRepository.findMissedByWorker(requiredDate, userid);
            int currentmissedcount = currfollowupsmissed.size();

            WorkerDetailsDTO workerDetailsDTO = new WorkerDetailsDTO();
            workerDetailsDTO.setWorkerId(workerid);
            workerDetailsDTO.setWorkerName(worker.get().getFirstname() + " " + worker.get().getLastname());
            workerDetailsDTO.setWorkerEmail(worker.get().getEmail());
            String currvill = worker.get().getVillagecode().getName();
            workerDetailsDTO.setCurrentMissedFollowupsCounts(Pair.of(currvill, currentmissedcount));
            //finding prev missed followups count
            List<Object[]> prevfollowupsmissed = missedFollowUpRepository.findByWorker(workerid);
            List<Pair<String, Integer>> prevFollMissCount = new ArrayList<>();
            int prevmissedcount=0;
            for (Object[] missFoll : prevfollowupsmissed) {

                String villageCode = (String) missFoll[0]; // village code is at index 0
                Integer count = (Integer) missFoll[1]; // count is at index 1
                prevFollMissCount.add(Pair.of(villageCode, count)); // Construct pair and add to list
                prevmissedcount+=count;
            }
            workerDetailsDTO.setPrevMissedFollowupsCounts(prevFollMissCount);
            //Total missed followup count
            int totalmissedcount=prevmissedcount+currentmissedcount;
            workerDetailsDTO.setTotalmissedcount(totalmissedcount);
            //current missed followups
            workerDetailsDTO.setCurrentMissedFollowups(currfollowupsmissed);
            //previous missed followup
            
            return workerDetailsDTO;
        }
        else {
            throw new APIRequestException("worker and supervisor subdistrict not matches");
        }
    }

    @Override
    public Pair<Boolean,Boolean> DeleteWorker(Integer workerid)
    {
        Boolean NeedtoAssign=false;
//        Worker worker=workerRepository.findById(workerid);
        return Pair.of(false,false);
    }
}
