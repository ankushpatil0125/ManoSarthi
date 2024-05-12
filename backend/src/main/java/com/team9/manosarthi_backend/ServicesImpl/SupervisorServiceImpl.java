package com.team9.manosarthi_backend.ServicesImpl;

import com.team9.manosarthi_backend.DTO.MissedFollowupsSupDTO;
import com.team9.manosarthi_backend.DTO.SupDashboardDTO;
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
import java.util.*;

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
    private TokenRepository tokenRepository;
    private PatientRepository patientRepository;
    private NotRefAbhaIdRepository notRefAbhaIdRepository;

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
                    if(villagetemp.getWorker_count()==1)throw new APIRequestException("Worker already assigned to new village");
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
            System.out.println("worker id"+workerid);
            //finding current missed followups
            List<FollowUpSchedule> currfollowupsmissed = followUpScheduleRepository.findMissedByWorker(requiredDate, workerid);
            int currentmissedcount = currfollowupsmissed.size();
            System.out.println("currmiss count"+currentmissedcount);

            WorkerDetailsDTO workerDetailsDTO = new WorkerDetailsDTO();
            workerDetailsDTO.setWorkerId(workerid);
            workerDetailsDTO.setWorkerName(worker.get().getFirstname() + " " + worker.get().getLastname());
            workerDetailsDTO.setWorkerEmail(worker.get().getEmail());
            String currvill = worker.get().getVillagecode().getName();
            workerDetailsDTO.setCurrentMissedFollowupsCounts(Pair.of(currvill, currentmissedcount));
            System.out.println("current missed followup count "+ workerDetailsDTO.getCurrentMissedFollowupsCounts());

            //finding prev missed followups count for each village
            List<Object[]> prevfollowupsmissed = missedFollowUpRepository.findByWorkerAndVill(workerid);
//            List<Map<String,Integer>> prevfollowupsmissed = missedFollowUpRepository.findByWorkerAndVill(workerid);

            System.out.println("prevmissfoll list"+prevfollowupsmissed);
//            List<Pair<String, Integer>> prevFollMissCount = new ArrayList<>();
            List<Pair<String,Integer>> prevFollMissCount = new ArrayList<>();
            int prevmissedcount=0;
            for (Object[] missFoll : prevfollowupsmissed) {
                System.out.println("inside loop of prev missed");

                for (Object obj : missFoll) {
                    System.out.println("obj  "+obj + " "); // Print each element followed by a space
                }
                System.out.println("misss 0  "+ missFoll[0]);
                System.out.println("misss  1 "+ missFoll[1]);
                System.out.println(missFoll.length);

                String villageCode = (String) missFoll[0]; // village code is at index 0
                System.out.println("villagecode"+villageCode);

                int count = Integer.parseInt(missFoll[1].toString()); // count is at index 1
                System.out.println("count"+count);
//                String villageCode=missFoll.get(patient.village.name)
//                System.out.println("Pair.of(villageCode, count)"+Pair.of(villageCode, count));
                prevFollMissCount.add(Pair.of(villageCode, count)); // Construct pair and add to list
//                prevFollMissCount.add(missFoll); // Construct pair and add to list

                prevmissedcount+=count;
            }
            System.out.println("prevmissedcount"+prevmissedcount);
            workerDetailsDTO.setPrevMissedFollowupsCounts(prevFollMissCount);
            System.out.println("Prev missed followup count "+ workerDetailsDTO.getPrevMissedFollowupsCounts());

            //Total missed followup count
            int totalmissedcount=prevmissedcount+currentmissedcount;
            workerDetailsDTO.setTotalmissedcount(totalmissedcount);
            System.out.println("Total missed followup count "+ workerDetailsDTO.getTotalmissedcount());

            //current missed followups
            List<MissedFollowupsSupDTO> missedFollowupsSupDTOList=new ArrayList<>();

            for(FollowUpSchedule followupsch: currfollowupsmissed)
            {
                MissedFollowupsSupDTO missedFollowupsSupDTO=new MissedFollowupsSupDTO();
                missedFollowupsSupDTO.setPatientName(followupsch.getPatient().getFirstname()+" "+followupsch.getPatient().getLastname());
                missedFollowupsSupDTO.setFollowup_date(followupsch.getNextFollowUpDate());
                missedFollowupsSupDTO.setVillageName(followupsch.getVillage().getName());
                missedFollowupsSupDTO.setWorkerName(followupsch.getWorker().getFirstname()+" "+followupsch.getWorker().getLastname());
                missedFollowupsSupDTOList.add(missedFollowupsSupDTO);
            }
            workerDetailsDTO.setCurrentMissedFollowups(missedFollowupsSupDTOList);
            System.out.println("Current missed followups "+ workerDetailsDTO.getCurrentMissedFollowups());

            //previous missed followup
            List<MissedFollowupsSupDTO> prevmissedFollowupsSupDTOList=new ArrayList<>();
            List<MissedFollowUp> prevmissedfoll=missedFollowUpRepository.findByWorker(workerid);
            for(MissedFollowUp prevfoll:prevmissedfoll)
            {
                MissedFollowupsSupDTO missedFollowupsSupDTO=new MissedFollowupsSupDTO();
                missedFollowupsSupDTO.setWorkerName(prevfoll.getWorker().getFirstname()+" "+prevfoll.getWorker().getLastname());
                missedFollowupsSupDTO.setFollowup_date(prevfoll.getFollowUpDate());
                missedFollowupsSupDTO.setCompleted_date(prevfoll.getCompletedDate());
                missedFollowupsSupDTO.setPatientName(prevfoll.getPatient().getFirstname()+" "+prevfoll.getPatient().getLastname());
                missedFollowupsSupDTO.setVillageName(prevfoll.getPatient().getVillage().getName());
                prevmissedFollowupsSupDTOList.add(missedFollowupsSupDTO);
            }
            workerDetailsDTO.setPrevMissedFollowups(prevmissedFollowupsSupDTOList);
            System.out.println("Prev missed followups "+ workerDetailsDTO.getPrevMissedFollowups());
            System.out.println("worker details dto"+workerDetailsDTO);
            return workerDetailsDTO;
        }
        else {
            throw new APIRequestException("worker and supervisor subdistrict not matches");
        }
    }

    @Override
    public Pair<Boolean,Boolean> DeleteWorker(Worker worker) {
        Boolean NeedtoAssign = false;
//        Worker worker=workerRepository.findById(workerid);
        Optional<Worker> deleteWorker = workerRepository.findById(worker.getId());

        if (deleteWorker.isPresent()) {
            Optional<Village> village = villageRepository.findById(deleteWorker.get().getVillagecode().getCode());
            if(village.isPresent()) {
                    village.get().setWorker_count(village.get().getWorker_count() - 1);
                    //check folllowups are remaining in village or not
                    if (!followUpScheduleRepository.findbyDateAndVill(Date.valueOf(LocalDate.now()),village.get().getCode()).isEmpty())
                        NeedtoAssign = true;
                    villageRepository.save(village.get());
            }
            String userName = deleteWorker.get().getUser().getUsername();
            tokenRepository.deleteTokensByUsername(userName);
            deleteWorker.get().setUser(null);
            userRepository.deleteById(userName);
            deleteWorker.get().setActive(false);
            deleteWorker.get().setVillagecode(null);
            workerRepository.save(deleteWorker.get());
            return Pair.of(true, NeedtoAssign);
        }
        throw new APIRequestException("Worker not found");
    }

    @Override
    public SupDashboardDTO dashboard(int supid)
    {
        Optional<Supervisor> supervisor=supervisorRepository.findById(supid);
        SupDashboardDTO supDashboardDTO=new SupDashboardDTO();
        List<Village> villages=villageRepository.findVillBySubdistrict(supervisor.get().getSubdistrictcode().getCode());
        supDashboardDTO.setVillagesCount(villages.size());
        List<Pair<String,Integer>> villagewithpatient=new ArrayList<>();
        int surveyedvillc=0;
        for(Village village:villages)
        {
            String villagename=village.getName();
            int patientc=patientRepository.countVillPatients(village.getCode());
            if(patientc!=0)
                villagewithpatient.add(Pair.of(villagename,patientc));
            int nonref=notRefAbhaIdRepository.findAllByVillage(village.getCode()).size();
            if(patientc!=0 || nonref!=0)
                surveyedvillc++;
        }
        supDashboardDTO.setVillSurveyedCount(surveyedvillc);
        Comparator<Pair<String, Integer>> comparator = (pair1, pair2) -> pair2.getValue().compareTo(pair1.getValue());
        Collections.sort(villagewithpatient, comparator);
        supDashboardDTO.setVillagewithpatient(villagewithpatient);
        List<Pair<String,Integer>> villwithmissedc=new ArrayList<>();
        for(Village village:villages)
        {
            int villageid=village.getCode();
            //worker has 3 days time period of syncing.
            // after that period also date is not changed to next followup date show that as missed followup to supervisor
            Date requiredDate = Date.valueOf(LocalDate.now().minusDays(3));
            List<FollowUpSchedule> currfollowupsmissed = followUpScheduleRepository.findbyDateAndVill(requiredDate, villageid);
            int currentmissedcount = currfollowupsmissed.size();
            if (currentmissedcount!=0)
                villwithmissedc.add(Pair.of(village.getName(),currentmissedcount));
        }
        Collections.sort(villwithmissedc, comparator);
        supDashboardDTO.setVillwithmissedc(villwithmissedc);
        return supDashboardDTO;
    }
}
