package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.Entities.Village;
import com.team9.manosarthi_backend.Repositories.VillageRepository;
import com.team9.manosarthi_backend.Services.EmailService;
import com.team9.manosarthi_backend.Services.SupervisorService;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Supervisor;
import com.team9.manosarthi_backend.Entities.Worker;
import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Repositories.SupervisorRepository;
import com.team9.manosarthi_backend.security.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@PreAuthorize("hasRole('SUPERVISOR')")
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

//    @GetMapping("/viewdetails")
//    public Optional<Supervisor> getDetails(@RequestHeader("Authorization") String authorizationHeader){
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            // Extract the token part after "Bearer "
//            String token = authorizationHeader.substring(7);
//            String userid = helper.getIDFromToken(token);
//            return supervisorRepository.findById(Integer.parseInt(userid));
//        }
//        return supervisorRepository.findById(-1);
//    }

    //get village from subdistrict code of supervisor where worker not assigned
    //use this while assigning worker
    @GetMapping("/get-no-worker-subd-village")
    public MappingJacksonValue getNoWorkerVillage(@RequestHeader("Authorization") String authorizationHeader){
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            String token = authorizationHeader.substring(7);
            String userid = helper.getIDFromToken(token);

            List<Village> villages=supervisorService.findNoWorkerSubVillage(Integer.parseInt(userid));
            SimpleBeanPropertyFilter SubDistrictFilter = SimpleBeanPropertyFilter.filterOutAllExcept("code","name","district");
            SimpleBeanPropertyFilter VillageFilter = SimpleBeanPropertyFilter.filterOutAllExcept("code","name","subDistrict","worker_count");
            FilterProvider filterProvider=new SimpleFilterProvider().addFilter("SubDistrictJSONFilter",SubDistrictFilter).addFilter("VillageJSONFilter",VillageFilter);

            MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(villages);
            mappingJacksonValue.setFilters(filterProvider);
            return mappingJacksonValue;
        }
        else {
            return new MappingJacksonValue(Collections.emptyList()); // Return an empty list if supervisor is not found
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
//            List<Village> villages=supervisorService.findSubVillage(Integer.parseInt(userid));
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
    @PostMapping("/addworker")
    public MappingJacksonValue addWorker(@RequestBody Worker worker){
        System.out.println("worker details"+worker.toString());
        Worker gotworker =  supervisorService.addworker(worker);
//        return gotworker;
        // Replace the actual password with a fixed string "changeme"
//        gotworker.getUser().setPassword("changeme");
        String password=gotworker.getUser().getPassword();
        SimpleBeanPropertyFilter workerfilter= SimpleBeanPropertyFilter.filterOutAllExcept("firstname","lastname","email","id");
//        SimpleBeanPropertyFilter userfilter= SimpleBeanPropertyFilter.filterOutAllExcept("username","password");
//        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("WorkerJSONFilter",workerfilter).addFilter("UserJSONFilter",userfilter);
        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("WorkerJSONFilter",workerfilter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(gotworker);


//        mappingJacksonValue.setValue(filterProvider);
        mappingJacksonValue.setFilters(filterProvider);
        System.out.println(mappingJacksonValue.getValue());
        String subject="Login Credentials for Manosarthi";
        String msg="Hello "+gotworker.getFirstname() + " " +gotworker.getLastname()+"\nYou are assigned as Health Worker for Manosarthi Scheme for " +gotworker.getVillagecode().getName()+ "   Please login in Manosarthi app with following credentials. "+"\nUsername = "+gotworker.getUser().getUsername()+"\nPassword = "+password+"\nPlease change password after login.";
        String to=gotworker.getEmail();
        if(emailService.sendEmail(subject,msg,to)) {
            System.out.println("mail success");
        }
        else
        {
            System.out.println("mail failed");
        }
        return mappingJacksonValue;
    }

    @GetMapping("/get-subdistrict-workers")
    public MappingJacksonValue getSubWorkers(@RequestHeader("Authorization") String authorizationHeader,@RequestParam("pagenumber") int pagenumber){

        int pagesize=5;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            String token = authorizationHeader.substring(7);
            String userid = helper.getIDFromToken(token);

            List<Worker> workers = supervisorService.getSubWorkers(Integer.parseInt(userid),pagenumber,pagesize);

            SimpleBeanPropertyFilter workerfilter = SimpleBeanPropertyFilter.filterOutAllExcept("firstname", "lastname", "email","villagecode");
            SimpleBeanPropertyFilter VillageFilter = SimpleBeanPropertyFilter.filterOutAllExcept("name");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("WorkerJSONFilter", workerfilter).addFilter("VillageJSONFilter",VillageFilter);;
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(workers);
            mappingJacksonValue.setFilters(filterProvider);
            return mappingJacksonValue;
        }
        else {
            return new MappingJacksonValue(Collections.emptyList());
        }
    }

    @GetMapping("/get-village-worker")
    public MappingJacksonValue getVillageWorker(@RequestParam ("villagecode") Integer villagecode){

        Worker worker = supervisorService.getVillWorker(villagecode);
        if (worker != null) {
            SimpleBeanPropertyFilter workerfilter = SimpleBeanPropertyFilter.filterOutAllExcept("firstname", "lastname", "email");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("WorkerJSONFilter", workerfilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(worker);
            mappingJacksonValue.setFilters(filterProvider);
            return mappingJacksonValue;
        } else {
            return new MappingJacksonValue(Collections.emptyList());
        }
    }

    @PostMapping("/updateworker")
//    public ResponseEntity<String> updateWorker(@RequestBody Worker updatedWorker) {
    public ResponseEntity<MappingJacksonValue> updateWorker(@RequestBody Worker updatedWorker) {

        ResponseEntity<Worker>  responseEntity = supervisorService.updateWorker(updatedWorker);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            Worker updatedworker = responseEntity.getBody();
            SimpleBeanPropertyFilter workerfilter = SimpleBeanPropertyFilter.filterOutAllExcept("firstname", "lastname", "email","villagecode");
            SimpleBeanPropertyFilter villagefilter = SimpleBeanPropertyFilter.filterOutAllExcept("code","name","worker_count");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("WorkerJSONFilter", workerfilter).addFilter("VillageJSONFilter",villagefilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(updatedworker);
            mappingJacksonValue.setFilters(filterProvider);
            return ResponseEntity.ok(mappingJacksonValue);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
