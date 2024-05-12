package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.DTO.*;
import com.team9.manosarthi_backend.Entities.FollowUpSchedule;
import com.team9.manosarthi_backend.Entities.Village;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.WorkerRepository;
import com.team9.manosarthi_backend.ServicesImpl.EmailService;
import com.team9.manosarthi_backend.Services.SupervisorService;
import com.team9.manosarthi_backend.Entities.Supervisor;
import com.team9.manosarthi_backend.Entities.Worker;
import com.team9.manosarthi_backend.Repositories.SupervisorRepository;
import com.team9.manosarthi_backend.security.JwtHelper;
import jakarta.validation.Valid;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
//@PreAuthorize("hasRole('SUPERVISOR')")
@RequestMapping("/supervisor")
@CrossOrigin(origins = "*")
public class SupervisorRestController {
    @Autowired
    SupervisorRepository supervisorRepository;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private SupervisorService supervisorService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private WorkerRepository workerRepository;
    @GetMapping("/viewdetails")
    public SupervisorResponseDTO getDetails(@RequestHeader("Authorization") String authorizationHeader){
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                // Extract the token part after "Bearer "
                String token = authorizationHeader.substring(7);
                String userid = helper.getIDFromToken(token);
                Supervisor supervisor = supervisorService.viewProfile(Integer.parseInt(userid));

                SupervisorResponseDTO supervisorResponseDTO = new SupervisorResponseDTO();
                supervisorResponseDTO.forSupervisor_SupervisorToSupervisorResponseDTO(supervisor);
                return supervisorResponseDTO;

            } else {
                throw new APIRequestException("Error in authorizing");
            }
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting supervisor details",ex.getMessage());
        }
    }

    //get village from subdistrict code of supervisor where worker not assigned if assigned=false and worker assigned if assigned=true

    @GetMapping("/get-subd-village")
    public List<Village> getSubdVillage(@RequestHeader("Authorization") String authorizationHeader, @RequestParam ("assigned")boolean assigned){
       try
       {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            String token = authorizationHeader.substring(7);
            String userid = helper.getIDFromToken(token);

            List<Village> villages=null;
            if(!assigned) {
                 villages = supervisorService.findSubVillage(Integer.parseInt(userid),assigned);
            }
            else if(assigned)
            {
                 villages = supervisorService.findSubVillage(Integer.parseInt(userid),assigned);
            }

            return villages;
        }
        else {
            throw new APIRequestException("Error in authorizing");
        }
       }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting villages of supervisor district",ex.getMessage());
        }
    }



    //get all villages under subdistrict of supervisor
    //use this while updating worker (show village and worker count)
//    @GetMapping("/get-subdistrict-village")
//    public MappingJacksonValue getSubVillage(@RequestHeader("Authorization") String authorizationHeader){
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            // Extract the token part after "Bearer "
//            String token = authorizationHeader.substring(7);
//            String userid = helper.getIDFromToken(token);
//
//            List<Village> villages=supervisorService.findSubAllVillage(Integer.parseInt(userid));
//            SimpleBeanPropertyFilter SubDistrictFilter = SimpleBeanPropertyFilter.filterOutAllExcept("code","name","district");
//            SimpleBeanPropertyFilter VillageFilter = SimpleBeanPropertyFilter.filterOutAllExcept("code","name","subDistrict","worker_count");
//            FilterProvider filterProvider=new SimpleFilterProvider().addFilter("SubDistrictJSONFilter",SubDistrictFilter).addFilter("VillageJSONFilter",VillageFilter);
//
//            MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(villages);
//            mappingJacksonValue.setFilters(filterProvider);
//            return mappingJacksonValue;
//        }
//        else {
//            return new MappingJacksonValue(Collections.emptyList()); // Return an empty list if supervisor is not found
//        }
//    }
    @Validated
    @PostMapping("/addworker")
    public WorkerResponseDTO addWorker(@Valid @RequestBody Worker worker) {

        try {
            Worker gotworker = supervisorService.addworker(worker);
            String password = gotworker.getUser().getPassword();
            //for sending email
            String subject = "Login Credentials for Manosarthi";
            String msg = "Hello " + gotworker.getFirstname() + " " + gotworker.getLastname() + "\nYou are assigned as Health Worker for Manosarthi Scheme for " + gotworker.getVillagecode().getName() + "\nPlease login in Manosarthi app with following credentials. " + "\nUsername = " + gotworker.getUser().getUsername() + "\nPassword = " + password + "\nPlease change password after login.";
            String to = gotworker.getEmail();
            if (emailService.sendEmail(subject, msg, to)) {
                System.out.println("mail success");
            } else {
                System.out.println("mail failed");
                throw new APIRequestException("Sending mail failed");
            }
            WorkerResponseDTO workerResponseDTO=new WorkerResponseDTO();
            workerResponseDTO.SupResponse(worker);
            return workerResponseDTO;
        }
        catch (DataIntegrityViolationException ex) {
            String errorMessage = ex.getCause().getMessage();
            String duplicateEntryMessage = null;


            if (errorMessage.contains("Duplicate entry")) {
                // Extract the part of the message that contains the duplicate entry information
                duplicateEntryMessage = errorMessage.substring(errorMessage.indexOf("Duplicate entry"), errorMessage.indexOf("for key"));
            }

            if (duplicateEntryMessage != null) {
                throw new APIRequestException(duplicateEntryMessage, ex.getMessage());
            } else {
                // If the message doesn't contain the expected format, throw a generic exception
                throw new APIRequestException("Duplicate entry constraint violation occurred", ex.getMessage());
            }
        }
        catch (Exception ex) {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else {
                throw new APIRequestException("Error while adding the Worker.", ex.getMessage());
            }
        }
    }

    @GetMapping("/get-subdistrict-workers")
    public List<WorkerResponseDTO> getSubWorkers(@RequestHeader("Authorization") String authorizationHeader,@RequestParam("pagenumber") int pagenumber){

        int pagesize=5;
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                // Extract the token part after "Bearer "
                String token = authorizationHeader.substring(7);
                String userid = helper.getIDFromToken(token);

                List<Worker> workers = supervisorService.getSubWorkers(Integer.parseInt(userid), pagenumber, pagesize);

                ArrayList<WorkerResponseDTO> workerResponseDTOs=new ArrayList<>();
                for(Worker worker : workers) {
                    WorkerResponseDTO workerResponseDTO=new WorkerResponseDTO();
                    workerResponseDTO.SupResponse(worker);
                    workerResponseDTOs.add(workerResponseDTO);
                }
                return workerResponseDTOs;
            }
            else {
                throw new APIRequestException("Error in authorizing");
            }
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while adding the worker.",ex.getMessage());
        }
    }

    @GetMapping("/get-village-worker")
    public List<WorkerResponseDTO>  getVillageWorker(@RequestParam ("villagecode") Integer villagecode){
        try {
            List<Worker> workers = supervisorService.getVillWorker(villagecode);
            if (workers != null) {
                ArrayList<WorkerResponseDTO> workerResponseDTOs=new ArrayList<>();
                for(Worker worker : workers) {
                    WorkerResponseDTO workerResponseDTO=new WorkerResponseDTO();
                    workerResponseDTO.SupResponse(worker);
                    workerResponseDTOs.add(workerResponseDTO);
                }
                return workerResponseDTOs;

            } else {
                throw new APIRequestException("No workers found");
            }
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting the village worker.",ex.getMessage());
        }
    }

    //For reassigning worker to another village
    @PutMapping("/reassign-worker")
    public Pair<WorkerResponseDTO,Boolean> ReassignWorker(@RequestBody Worker updateWorker) {
        System.out.println("updateWorker "+updateWorker);
        try {
            Pair<Worker,Boolean> result = supervisorService.ReassignWorker(updateWorker);
            Worker updatedworker=result.getKey();
            Boolean needToAssign=result.getValue();
            System.out.println("updatedWorker "+updatedworker);
            if (updatedworker != null) {

                //for sending email

                String subject = "You are reassigned for Manosarthi scheme";
                String msg = "Hello " + updatedworker.getFirstname() + " " + updatedworker.getLastname() + "\nYou are reassigned as Health Worker for Manosarthi Scheme for " + updatedworker.getVillagecode().getName();
                String to = updatedworker.getEmail();
                if (emailService.sendEmail(subject, msg, to)) {
                    System.out.println("mail success");
                } else {
                    System.out.println("mail failed");
                }

                WorkerResponseDTO workerResponseDTO=new WorkerResponseDTO();
                workerResponseDTO.SupResponse(updatedworker);
                return Pair.of(workerResponseDTO,needToAssign);
            } else {
                throw new APIRequestException("Worker with given ID not found");
            }
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while reassigning worker.",ex.getMessage());
        }
    }

    @GetMapping("/all-missed-followups")
    public List<VillageDetailsDTO> getMissedFollowups(@RequestHeader("Authorization") String authorizationHeader){

        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                // Extract the token part after "Bearer "
                String token = authorizationHeader.substring(7);
                String userid = helper.getIDFromToken(token);

                List<List<FollowUpSchedule>> allmissedfoll = supervisorService.subdistMissedFollowup(Integer.parseInt(userid));

                List<VillageDetailsDTO> villageDetailsDTOList=new ArrayList<>();
                for(List<FollowUpSchedule> ListVillageFollo : allmissedfoll) {
                    VillageDetailsDTO villageDetailsDTO=new VillageDetailsDTO();
                    List<MissedFollowupsSupDTO> missedFollowupsSupDTOList=new ArrayList<>();
                    Integer count=0;
                    Boolean villageDetailsSet=false;
                    for(FollowUpSchedule followUpSchedule:ListVillageFollo)
                    {
                        List<Worker> worker=workerRepository.findWorkerByVillage(followUpSchedule.getVillage().getCode());
                        if(worker==null)
                            throw new APIRequestException("Worker Not found of village provided in followup schedule");
                        if(!villageDetailsSet) {
                            //set village details
                            villageDetailsDTO.setVillageCode(followUpSchedule.getVillage().getCode());
                            villageDetailsDTO.setVillageName(followUpSchedule.getVillage().getName());
                            villageDetailsDTO.setWorkerEmail(worker.get(0).getEmail());
                            villageDetailsDTO.setWorkerName(worker.get(0).getFirstname() + " " + worker.get(0).getLastname());
                            villageDetailsDTO.setWorkerId(worker.get(0).getId());
                        }
                        //set missedFollowups
                        MissedFollowupsSupDTO missedfollowup=new MissedFollowupsSupDTO();
                        missedfollowup.setVillageName(followUpSchedule.getVillage().getName());
                        missedfollowup.setWorkerName(worker.get(0).getFirstname()+" "+worker.get(0).getLastname());
                        missedfollowup.setPatientName(followUpSchedule.getPatient().getFirstname()+ " "+followUpSchedule.getPatient().getLastname());
                        missedfollowup.setFollowup_date(followUpSchedule.getNextFollowUpDate());
                        missedFollowupsSupDTOList.add(missedfollowup);
                        count++;
                    }
                    villageDetailsDTO.setMissedFollowupsCount(count);
                    villageDetailsDTO.setMissedFollowupsSupDTOList(missedFollowupsSupDTOList);
                    villageDetailsDTOList.add(villageDetailsDTO);
                }
                Collections.sort(villageDetailsDTOList, Comparator.comparingInt(VillageDetailsDTO::getMissedFollowupsCount).reversed());

                return villageDetailsDTOList;
            }
            else {
                throw new APIRequestException("Error in authorizing");
            }
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting missed followups.",ex.getMessage());
        }
    }


    @GetMapping("/get-worker-details/{village}")
    public WorkerDetailsDTO getWorkerDetails(@RequestHeader("Authorization") String authorizationHeader,@PathVariable Integer village){

        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                // Extract the token part after "Bearer "
                String token = authorizationHeader.substring(7);
                String userid = helper.getIDFromToken(token);
                List<Worker> worker=workerRepository.findWorkerByVillage(village);
                int workerid;
                if(!worker.isEmpty())
                    workerid=worker.get(0).getId();
                else
                    throw new APIRequestException("worker for given village not found");
                return supervisorService.workerdetails(workerid,Integer.parseInt(userid));

            }
            else {
                throw new APIRequestException("Error in authorizing");
            }
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting worker details.",ex.getMessage());
        }
    }
    @DeleteMapping("/worker")
    public Pair<Boolean,Boolean> deleteSupervisor(@RequestBody Worker worker)
    {
        //first boolean represent successfully deleted or not 2nd represent need to assign other worker or not
        Pair<Boolean,Boolean> result = supervisorService.DeleteWorker(worker);

        if (!result.getKey())
        {
            throw new APIRequestException("Supervisor not found with id"+worker.getId());
        }
        return result;
    }

    @GetMapping("/dashboard")
    public SupDashboardDTO dashboard(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            String token = authorizationHeader.substring(7);
            String userid = helper.getIDFromToken(token);
            int supid = Integer.parseInt(userid);
            SupDashboardDTO supDashboardDTO = supervisorService.dashboard(supid);
            return supDashboardDTO;
        } else {
            throw new APIRequestException("Error in authorizing");
        }
    }
}
