package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Entities.Worker;
import com.team9.manosarthi_backend.Filters.PatientFilter;
import com.team9.manosarthi_backend.Repositories.SupervisorRepository;
import com.team9.manosarthi_backend.Services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
//@PreAuthorize("hasRole('WORKER')")
@RequestMapping("/worker")
@CrossOrigin(origins = "*")
public class WorkerRestController {
    @Autowired
    private WorkerService workerService;

    @PutMapping("/updateworker")
    public ResponseEntity<MappingJacksonValue> UpdateWorkerProfile(@RequestBody Worker updatedWorker) {
        ResponseEntity<Worker>  responseEntity = workerService.UpdateWorkerProfile(updatedWorker);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            Worker updatedworker = responseEntity.getBody();
            SimpleBeanPropertyFilter workerfilter = SimpleBeanPropertyFilter.filterOutAllExcept("firstname", "lastname", "email", "villagecode");
            SimpleBeanPropertyFilter villagefilter = SimpleBeanPropertyFilter.filterOutAllExcept("code", "name", "worker_count");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("WorkerJSONFilter", workerfilter).addFilter("VillageJSONFilter", villagefilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(updatedworker);
            mappingJacksonValue.setFilters(filterProvider);
            return ResponseEntity.ok(mappingJacksonValue);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/register-patient")
    public MappingJacksonValue registerpatient(@RequestBody List<Patient> patient){
        System.out.println("/register-patient");

        System.out.println("patient list"+patient.toString());

        List<Patient> patientList = workerService.registerPatient(patient);
        Set<String> patientFilterProperties = new HashSet<>();
        patientFilterProperties.add("aabhaId");

        PatientFilter<List<Patient>> patientFilter=new PatientFilter<>(patientList);

        return patientFilter.getPatientFilter(patientFilterProperties);
    }
}
