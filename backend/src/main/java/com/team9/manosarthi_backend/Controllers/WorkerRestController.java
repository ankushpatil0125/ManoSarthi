package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.DTO.RegisterPatientDTO;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Filters.PatientFilter;
import com.team9.manosarthi_backend.Repositories.PatientRepository;
import com.team9.manosarthi_backend.Repositories.SupervisorRepository;
import com.team9.manosarthi_backend.Services.QuestionarrieService;
import com.team9.manosarthi_backend.Services.WorkerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
        try {
            Worker updatedworker = workerService.UpdateWorkerProfile(updatedWorker);
            if (updatedworker != null) {
                SimpleBeanPropertyFilter workerfilter = SimpleBeanPropertyFilter.filterOutAllExcept("firstname", "lastname", "email", "villagecode");
                SimpleBeanPropertyFilter villagefilter = SimpleBeanPropertyFilter.filterOutAllExcept("code", "name", "worker_count");
                FilterProvider filterProvider = new SimpleFilterProvider().addFilter("WorkerJSONFilter", workerfilter).addFilter("VillageJSONFilter", villagefilter);
                MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(updatedworker);
                mappingJacksonValue.setFilters(filterProvider);
                return ResponseEntity.ok(mappingJacksonValue);
            } else {
                throw new APIRequestException("Worker with given ID not found");
            }
        } catch (Exception ex)
        {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while updating worker profile",ex.getMessage());
        }
    }

    @GetMapping("/getquestionarrie")
    public MappingJacksonValue getquestionarrie() {
        try {
            List<Questionarrie> questions = questionarrieService.getquestions();
            SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "minage", "maxage", "question", "default_ans", "type");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionJSONFilter", questionfilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(questions);
            mappingJacksonValue.setFilters(filterProvider);
            return mappingJacksonValue;
        }catch (Exception ex)
        {
            throw new APIRequestException("Error while getting questionarrie",ex.getMessage());
        }
    }

//    @PostMapping("/questionans")
//    public MappingJacksonValue postquestans(@Valid @RequestBody Questionarrie_ans questionarrie_ans)
//    {
//        Questionarrie_ans queans= questionarrieService.postqueans(questionarrie_ans);
//        SimpleBeanPropertyFilter questionansfilter = SimpleBeanPropertyFilter.filterOutAllExcept("answer_id");
////        SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "minage", "maxage", "question", "default_ans", "type");
////        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionAnsJSONFilter", questionansfilter).addFilter("QuestionJSONFilter",questionfilter);
//        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionAnsJSONFilter", questionansfilter);
//        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(queans);
//        mappingJacksonValue.setFilters(filterProvider);
//        return mappingJacksonValue;
//    }

    @GetMapping("/get-medical-questionarrie")
    public MappingJacksonValue getmedquestionarrie() {
        try {
            List<MedicalQue> questions = questionarrieService.getmedicalquestions();
            SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "question");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("MedicalQueJSONFilter", questionfilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(questions);
            mappingJacksonValue.setFilters(filterProvider);
            return mappingJacksonValue;
         }catch (Exception ex)
        {
            throw new APIRequestException("Error while getting medical questionarrie",ex.getMessage());
        }
    }
//    @PostMapping("/medical-questionans")
//    public MappingJacksonValue postmedicalquestans(@Valid @RequestBody MedicalQueAns medquestionarrie_ans)
//    {
//        MedicalQueAns queans= questionarrieService.postmedicalqueans(medquestionarrie_ans);
//        SimpleBeanPropertyFilter questionansfilter = SimpleBeanPropertyFilter.filterOutAllExcept("answer_id","medicalquest","question_ans","patient");
//        SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "question");
//        SimpleBeanPropertyFilter patientfilter = SimpleBeanPropertyFilter.filterOutAllExcept("aabhaId", "firstname", "lastname", "email");
//        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("MedicalQueAnsJSONFilter", questionansfilter).addFilter("MedicalQueJSONFilter",questionfilter).addFilter("PatientJSONFilter",patientfilter);
////        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionAnsJSONFilter", questionansfilter);
//        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(queans);
//        mappingJacksonValue.setFilters(filterProvider);
//        return mappingJacksonValue;
//    }
//    @PostMapping("/register-patient")
//    public MappingJacksonValue registerpatient(@RequestBody Patient patient){
//        System.out.println("/register-patient");
//
//        System.out.println("patient"+patient.toString());
//
//        Patient newPatient = workerService.registerPatient(patient);
//        Set<String> patientFilterProperties = new HashSet<>();
//        patientFilterProperties.add("aabhaId");
//
//        PatientFilter<Patient> patientFilter=new PatientFilter<>(newPatient);
//
//        return patientFilter.getPatientFilter(patientFilterProperties);
//    }

    @Validated
    @PostMapping("/register-patient")
    public MappingJacksonValue registerpatient(@Valid @RequestBody RegisterPatientDTO registerPatientDTO,@RequestHeader("Authorization") String authorizationHeader){

//        System.out.println("patient"+registerPatientDTO.toString());
        System.out.println("RegisterPatientDTO sent "+registerPatientDTO);
        System.out.println("RegisterPatientDTO sent "+registerPatientDTO.toString());
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);

                Patient newPatient = workerService.registerPatient(registerPatientDTO, Integer.parseInt(workerId));
                System.out.println("New register patient  "+newPatient.toString());
                Set<String> patientFilterProperties = new HashSet<>();
                patientFilterProperties.add("aabhaId");

                PatientFilter<Patient> patientFilter = new PatientFilter<>(newPatient);

                return patientFilter.getPatientFilter(patientFilterProperties);
            } else {
                throw new APIRequestException("Error in authorizing");
            }
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
        catch (Exception ex)
        {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while registering patient",ex.getMessage());
        }

    }



    @Autowired
    PatientRepository patientRepository;
    @GetMapping("/get-patient")
    public MappingJacksonValue getPatient()
    {

        List<Patient> patientList = patientRepository.findAll();

        Set<String> patientFilterProperties = new HashSet<>();
        patientFilterProperties.add("aabhaId");
        patientFilterProperties.add("followUpDetailsList");
        patientFilterProperties.add("medicalQueAnsList");

        Set<String> followUpFilterProperties = new HashSet<>();
        followUpFilterProperties.add("followupDate");
        followUpFilterProperties.add("followUpNo");
        followUpFilterProperties.add("worker");
        followUpFilterProperties.add("doctor");
        followUpFilterProperties.add("questionarrieAnsList");

        Set<String> workerFilterProperties = new HashSet<>();
        workerFilterProperties.add("firstname");

        Set<String> doctorFilterProperties = new HashSet<>();
        doctorFilterProperties.add("firstname");


        PatientFilter<List<Patient>> patientFilter=new PatientFilter<>(patientList);

        return patientFilter.getPatientFilter(patientFilterProperties,followUpFilterProperties,workerFilterProperties,doctorFilterProperties);

    }

    @GetMapping("/getAbhaid")
    public List<String> getAbhaid(@RequestHeader("Authorization") String authorizationHeader)
    {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);
                List<String> Abhaid = workerService.getAabhaid(Integer.parseInt(workerId));
//                if (Abhaid.isEmpty())
//                {
//                    throw new APIRequestException("No Aabha Id found");
//                }
                return Abhaid;
            } else {
                throw new APIRequestException("Error in authorizing");
            }
        }
        catch (Exception ex)
        {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while getting registered Aabha Ids",ex.getMessage());
        }
    }
}
