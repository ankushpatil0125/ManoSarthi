package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.DTO.*;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Filters.PatientFilter;
import com.team9.manosarthi_backend.Filters.SupervisorFilter;
import com.team9.manosarthi_backend.Filters.WorkerFilter;
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

import java.util.*;

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

    @GetMapping("/view-profile")
    public  WorkerResponseDTO getDetails(@RequestHeader("Authorization") String authorizationHeader){
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                // Extract the token part after "Bearer "
                String token = authorizationHeader.substring(7);
                String userid = helper.getIDFromToken(token);
//                Optional<Supervisor> supervisor = supervisorRepository.findById(Integer.parseInt(userid));
                Worker worker = workerService.viewProfile(Integer.parseInt(userid));

                    WorkerResponseDTO workerResponseDTO=new WorkerResponseDTO();
                    workerResponseDTO.WorkerResponse(worker);
                    return workerResponseDTO;
            } else {
                throw new APIRequestException("Error in authorizing");
            }
        }
        catch (Exception ex)
        {
            if( ex instanceof APIRequestException ) throw new APIRequestException(ex.getMessage());
            else throw new APIRequestException("Error while getting worker details",ex.getMessage());
        }
    }


    @PutMapping("/updateworker")
    public WorkerResponseDTO UpdateWorkerProfile(@RequestBody Worker updatedWorker) {
        try {
            Worker updatedworker = workerService.UpdateWorkerProfile(updatedWorker);
            if (updatedworker != null) {
                WorkerResponseDTO workerResponseDTO=new WorkerResponseDTO();
                workerResponseDTO.WorkerResponse(updatedworker);
                return workerResponseDTO;
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
    public List<Questionarrie> getquestionarrie() {
        try {
            List<Questionarrie> questions = questionarrieService.getquestions();
            return questions;
        }catch (Exception ex)
        {
            throw new APIRequestException("Error while getting questionarrie",ex.getMessage());
        }
    }

    @GetMapping("/get-medical-questionarrie")
    public List<MedicalQue> getmedquestionarrie() {
        try {
            List<MedicalQue> questions = questionarrieService.getmedicalquestions();

            return questions;
         }catch (Exception ex)
        {
            throw new APIRequestException("Error while getting medical questionarrie",ex.getMessage());
        }
    }

    @Validated
    @PostMapping("/register-patient")
    public String registerpatient(@Valid @RequestBody RegisterPatientDTO registerPatientDTO,@RequestHeader("Authorization") String authorizationHeader){

//        System.out.println("patient"+registerPatientDTO.toString());
        System.out.println("RegisterPatientDTO sent "+registerPatientDTO);
        System.out.println("RegisterPatientDTO sent "+registerPatientDTO.toString());
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);

                Patient newPatient = workerService.registerPatient(registerPatientDTO, Integer.parseInt(workerId));
                return newPatient.getAabhaId();
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


/*
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
*/
    @GetMapping("/getAbhaid")
    public List<String> getAbhaid(@RequestHeader("Authorization") String authorizationHeader)
    {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);
                List<String> Abhaid = workerService.getAabhaid(Integer.parseInt(workerId));
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

    @GetMapping("/getFollowupSchedule")
    public List<FollowupScheduleDTO> getFollowupSchedule(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            String token = authorizationHeader.substring(7);
            String workerId = helper.getIDFromToken(token);
            List<FollowUpSchedule> schedules = workerService.get_followup_schedule(Integer.parseInt(workerId));
            List<FollowupScheduleDTO> followupScheduleDTOList=new ArrayList<>();
            for(FollowUpSchedule schedule:schedules)
            {
                FollowupScheduleDTO followupScheduleDTO = new FollowupScheduleDTO();
                followupScheduleDTO.FollowupScheduleToDTO(schedule);
                followupScheduleDTOList.add(followupScheduleDTO);

            }
          return followupScheduleDTOList;
        }
        else {
            throw new APIRequestException("Error in authorizing");
        }
    }

    @GetMapping("/getprescriptions")
    public List<PrescriptionDTO> getPrescriptions(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            String token = authorizationHeader.substring(7);
            String workerId = helper.getIDFromToken(token);
            List<Prescription> prescriptions = workerService.getprescriptions(Integer.parseInt(workerId));
            List<PrescriptionDTO> prescriptionDTOList=new ArrayList<>();
            for(Prescription prescription:prescriptions)
            {
                PrescriptionDTO prescriptionDTO = new PrescriptionDTO();
                prescriptionDTO.PrescriptionToDTO(prescription);
                prescriptionDTOList.add(prescriptionDTO);

            }
            return prescriptionDTOList;
        }
        else {
            throw new APIRequestException("Error in authorizing");
        }
    }

}
