package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.DTO.RegisterPatientDTO;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Filters.PatientFilter;
import com.team9.manosarthi_backend.Repositories.PatientRepository;
import com.team9.manosarthi_backend.Repositories.SupervisorRepository;
import com.team9.manosarthi_backend.Services.QuestionarrieService;
import com.team9.manosarthi_backend.Services.WorkerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.team9.manosarthi_backend.security.JwtHelper;

@RestController
@Validated
//@PreAuthorize("hasRole('WORKER')")
@RequestMapping("/worker")
@CrossOrigin(origins = "*")
public class WorkerRestController {
    private WorkerService workerService;
    private QuestionarrieService questionarrieService;
    private JwtHelper helper;

    @Autowired
    public WorkerRestController(WorkerService workerService, QuestionarrieService questionarrieService, JwtHelper helper) {
        this.workerService = workerService;
        this.questionarrieService = questionarrieService;
        this.helper = helper;
    }

    @PutMapping("/updateworker")
    public ResponseEntity<MappingJacksonValue> UpdateWorkerProfile(@RequestBody Worker updatedWorker) {
        ResponseEntity<Worker> responseEntity = workerService.UpdateWorkerProfile(updatedWorker);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            Worker updatedworker = responseEntity.getBody();
            SimpleBeanPropertyFilter workerfilter = SimpleBeanPropertyFilter.filterOutAllExcept("firstname", "lastname", "email", "villagecode");
            SimpleBeanPropertyFilter villagefilter = SimpleBeanPropertyFilter.filterOutAllExcept("code", "name", "worker_count");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("WorkerJSONFilter", workerfilter).addFilter("VillageJSONFilter", villagefilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(updatedworker);
            mappingJacksonValue.setFilters(filterProvider);
            return ResponseEntity.ok(mappingJacksonValue);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/getquestionarrie")
    public MappingJacksonValue getquestionarrie() {
        List<Questionarrie> questions = questionarrieService.getquestions();
        SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "minage", "maxage", "question", "default_ans", "type");
        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionJSONFilter", questionfilter);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(questions);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }

    @PostMapping("/questionans")
    public MappingJacksonValue postquestans(@Valid @RequestBody Questionarrie_ans questionarrie_ans)
    {
        Questionarrie_ans queans= questionarrieService.postqueans(questionarrie_ans);
        SimpleBeanPropertyFilter questionansfilter = SimpleBeanPropertyFilter.filterOutAllExcept("answer_id");
//        SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "minage", "maxage", "question", "default_ans", "type");
//        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionAnsJSONFilter", questionansfilter).addFilter("QuestionJSONFilter",questionfilter);
        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionAnsJSONFilter", questionansfilter);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(queans);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }

    @GetMapping("/get-medical-questionarrie")
    public MappingJacksonValue getmedquestionarrie() {
        List<MedicalQue> questions = questionarrieService.getmedicalquestions();
        SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "question");
        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("MedicalQueJSONFilter", questionfilter);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(questions);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }
    @PostMapping("/medical-questionans")
    public MappingJacksonValue postmedicalquestans(@Valid @RequestBody MedicalQueAns medquestionarrie_ans)
    {
        MedicalQueAns queans= questionarrieService.postmedicalqueans(medquestionarrie_ans);
        SimpleBeanPropertyFilter questionansfilter = SimpleBeanPropertyFilter.filterOutAllExcept("answer_id","medicalquest","question_ans","patient");
        SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "question");
        SimpleBeanPropertyFilter patientfilter = SimpleBeanPropertyFilter.filterOutAllExcept("aabhaId", "firstname", "lastname", "email");
        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("MedicalQueAnsJSONFilter", questionansfilter).addFilter("MedicalQueJSONFilter",questionfilter).addFilter("PatientJSONFilter",patientfilter);
//        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionAnsJSONFilter", questionansfilter);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(queans);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }

    @PostMapping("/register-patient")
    public MappingJacksonValue registerpatient(@RequestBody RegisterPatientDTO registerPatientDTO,@RequestHeader("Authorization") String authorizationHeader){
        System.out.println("/register-patient");
        System.out.println("patient"+registerPatientDTO.toString());

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            String token = authorizationHeader.substring(7);
            String workerId = helper.getIDFromToken(token);

            Patient newPatient = workerService.registerPatient(registerPatientDTO,Integer.parseInt(workerId));
            Set<String> patientFilterProperties = new HashSet<>();
            patientFilterProperties.add("aabhaId");

            PatientFilter<Patient> patientFilter=new PatientFilter<>(newPatient);

            return patientFilter.getPatientFilter(patientFilterProperties);
        }

        return null;
    }

    @Autowired
    PatientRepository patientRepository;

}
