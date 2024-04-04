package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Exceptions.GlobalExceptionhandler;
import com.team9.manosarthi_backend.Filters.DoctorFilter;
import com.team9.manosarthi_backend.Filters.SupervisorFilter;
import com.team9.manosarthi_backend.Services.AdminService;
import com.team9.manosarthi_backend.Services.EmailService;
import com.team9.manosarthi_backend.Services.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Validated
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @RequestMapping("/index")
    public String dashboard()
    {
        System.out.println("step1");
        return "admin_dashboard";
    }


    @PostMapping("/add")
    public String addUser(@RequestBody User user) {
        userService.addUser(user);
        return "user_success";
    }


    //Add doctor
    private AdminService adminService;
    private GlobalExceptionhandler globalExceptionHandler;

    @Autowired
    public AdminController(AdminService adminService,GlobalExceptionhandler globalExceptionHandler) {
        this.adminService = adminService;
        this.globalExceptionHandler = globalExceptionHandler;
    }




    //Doctor
    @Validated
    @PostMapping("/doctor")
    public ResponseEntity<MappingJacksonValue> addDoctor(@Valid @RequestBody Doctor doctor){
       try {
            Doctor doc = adminService.adddoctor(doctor);
            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");
            doctorFilterProperties.add("lastname");
            doctorFilterProperties.add("email");
            doctorFilterProperties.add("subdistrictcode");

            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");
            String password = doc.getUser().getPassword();
            DoctorFilter<Doctor> doctorFilter = new DoctorFilter<Doctor>(doc);

           //for sending email
           String subject = "Login Credentials for Manosarthi";
           String msg = "Hello " + doc.getFirstname() + " " + doc.getLastname() + "\nYou are assigned as Doctor for Manosarthi Scheme for " + doc.getSubdistrictcode().getName() + "\nPlease login in Manosarthi app with following credentials. " + "\nUsername = " + doc.getUser().getUsername() + "\nPassword = " + password + "\nPlease change password after login.";
           String to = doc.getEmail();
           if (emailService.sendEmail(subject, msg, to)) {
               System.out.println("mail success");
           } else {
               System.out.println("mail failed");
               throw new APIRequestException("Sending mail failed");
           }
           return ResponseEntity.ok(doctorFilter.getDoctorFilter(doctorFilterProperties,subDistrictFilterProperties));

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
       } catch (Exception ex) {
           if(ex instanceof APIRequestException)
           {
               throw new APIRequestException(ex.getMessage());
           }
           else
                throw new APIRequestException("Error while adding the doctor.", ex.getMessage());
       }
    }

    @GetMapping("/doctor")
    public MappingJacksonValue viewAllDoctors(@RequestParam("pagenumber") int pagenumber){
        int pagesize = 5;
        try {
            List<Doctor> doctors = adminService.viewAllDoctor(pagenumber, pagesize);

            if (doctors == null) {
                throw new APIRequestException("No doctors found");
            }
            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");
            doctorFilterProperties.add("lastname");
            doctorFilterProperties.add("email");
            doctorFilterProperties.add("subdistrictcode");

            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            DoctorFilter<List<Doctor>> doctorFilter = new DoctorFilter<List<Doctor>>(doctors);

            return doctorFilter.getDoctorFilter(doctorFilterProperties, subDistrictFilterProperties);
        }

        catch (RuntimeException ex){
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while getting doctors",ex.getMessage());
        }
    }



    @GetMapping("/doctor/district")
    public MappingJacksonValue viewDoctorByDistrict(@RequestParam("districtcode") int districtcode,@RequestParam("pagenumber") int pagenumber){
        int pagesize=5;
        try {
            List<Doctor> doctors = adminService.viewDoctorByDistrict(districtcode, pagenumber, pagesize);
            if (doctors == null) {
                throw new APIRequestException("No doctors found");
            }
            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");
            doctorFilterProperties.add("lastname");
            doctorFilterProperties.add("email");
            doctorFilterProperties.add("subdistrictcode");

            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            DoctorFilter<List<Doctor>> doctorFilter = new DoctorFilter<List<Doctor>>(doctors);
            return doctorFilter.getDoctorFilter(doctorFilterProperties, subDistrictFilterProperties);
        }
        catch (Exception ex)
        {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while getting doctors of district",ex.getMessage());
        }
    }

    @GetMapping("/doctor/subdistrict/")
    public MappingJacksonValue viewDoctorBySubDistrict(@RequestParam("subdistrictcode") int subdistrictcode){
        try {
            List<Doctor> doctors = adminService.viewDoctorBySubDistrict(subdistrictcode);
            if (doctors.isEmpty()) {
                throw new APIRequestException("No doctors found");
            }
            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");
            doctorFilterProperties.add("lastname");
            doctorFilterProperties.add("email");
            doctorFilterProperties.add("subdistrictcode");

            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            DoctorFilter<List<Doctor>> doctorFilter = new DoctorFilter<List<Doctor>>(doctors);
            return doctorFilter.getDoctorFilter(doctorFilterProperties, subDistrictFilterProperties);
        }
        catch (Exception ex)
        {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while getting doctors of subdistrict",ex.getMessage());
        }
        }

    @Validated
    @PostMapping("/supervisor")
    public MappingJacksonValue addSupervisor(@Valid @RequestBody Supervisor supervisor){
        try {
            Supervisor sup = adminService.addSupervisor(supervisor);

            Set<String> supervisorFilterProperties = new HashSet<>();
            supervisorFilterProperties.add("firstname");
            supervisorFilterProperties.add("lastname");
            supervisorFilterProperties.add("email");
            supervisorFilterProperties.add("subdistrictcode");


            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            String password = sup.getUser().getPassword();

            SupervisorFilter<Supervisor> supervisorFilter = new SupervisorFilter<>(sup);

            //for sending email
            String subject = "Login Credentials for Manosarthi";
            String msg = "Hello " + sup.getFirstname() + " " + sup.getLastname() + "\nYou are assigned as Supervisor for Manosarthi Scheme for " + sup.getSubdistrictcode().getName() + "\nPlease login in Manosarthi app with following credentials. " + "\nUsername = " + sup.getUser().getUsername() + "\nPassword = " + password + "\nPlease change password after login.";
            String to = sup.getEmail();
            if (emailService.sendEmail(subject, msg, to)) {
                System.out.println("mail success");
            } else {
                System.out.println("mail failed");
                throw new APIRequestException("Sending mail failed");
            }
            return supervisorFilter.getSupervisorFilter(supervisorFilterProperties, subDistrictFilterProperties);
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
        } catch (Exception ex) {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while adding the Supervisor.", ex.getMessage());
        }

    }

    //For reassigning supervisor to another subdistrict

    @PutMapping("/reassign-supervisor")
    public ResponseEntity<MappingJacksonValue> ReassignSupervisor(@RequestBody Supervisor updatedSupervisor) {
        try {
            Supervisor updatedsupervisor = adminService.ReassignSupervisor(updatedSupervisor);
            if (updatedsupervisor != null) {
                SimpleBeanPropertyFilter supervisorfilter = SimpleBeanPropertyFilter.filterOutAllExcept("firstname", "lastname", "email", "subdistrictcode");
                SimpleBeanPropertyFilter subdistrictfilter = SimpleBeanPropertyFilter.filterOutAllExcept("code", "name", "supervisor_count");
                FilterProvider filterProvider = new SimpleFilterProvider().addFilter("SupervisorJSONFilter", supervisorfilter).addFilter("SubDistrictJSONFilter", subdistrictfilter);
                MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(updatedsupervisor);
                mappingJacksonValue.setFilters(filterProvider);

                //for sending email
                String subject = "You are reassigned for Manosarthi scheme";
                String msg = "Hello " + updatedsupervisor.getFirstname() + " " + updatedsupervisor.getLastname() + "\nYou are reassigned as Supervisor for Manosarthi Scheme for " + updatedsupervisor.getSubdistrictcode().getName();
                String to = updatedsupervisor.getEmail();
                if (emailService.sendEmail(subject, msg, to)) {
                    System.out.println("mail success");
                } else {
                    System.out.println("mail failed");
                    throw new APIRequestException("Sending mail failed");
                }

                return ResponseEntity.ok(mappingJacksonValue);
            } else {
                throw new APIRequestException("Supervisor with given ID not found");
            }
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while updating the supervisor.",ex.getMessage());
        }
    }

    @GetMapping("/supervisor")
    public MappingJacksonValue viewAllSupervisor(@RequestParam("pagenumber") int pagenumber){
        int pagesize = 5;

//        List<Doctor> doctors = adminService.viewAllDoctor(pagenumber,pagesize);
        List<Supervisor> supervisorList=adminService.viewAllSupervisor(pagenumber,pagesize);

        if(supervisorList== null)
        {
            throw new APIRequestException("No Supervisor found");
        }
        Set<String> supervisorFilterProperties = new HashSet<>();
        supervisorFilterProperties.add("firstname");
        supervisorFilterProperties.add("lastname");
        supervisorFilterProperties.add("email");
        supervisorFilterProperties.add("subdistrictcode");

        Set<String> subDistrictFilterProperties = new HashSet<>();
        subDistrictFilterProperties.add("code");
        subDistrictFilterProperties.add("name");
        subDistrictFilterProperties.add("district");

        SupervisorFilter<List<Supervisor>> supervisorFilter = new SupervisorFilter<>(supervisorList);

        return supervisorFilter.getSupervisorFilter(supervisorFilterProperties,subDistrictFilterProperties);
    }



    @GetMapping("/supervisor/district")
    public MappingJacksonValue viewSupervisorByDistrict(@RequestParam("districtcode") int districtcode,@RequestParam("pagenumber") int pagenumber){
        int pagesize=5;
//        List<Doctor> doctors= adminService.viewDoctorByDistrict(districtcode, pagenumber, pagesize);
        List<Supervisor> supervisorList=adminService.viewSupervisorByDistrict(districtcode,pagenumber,pagesize);
        if(supervisorList== null)
        {
            throw new APIRequestException("No Supervisor found");
        }
        Set<String> supervisorFilterProperties = new HashSet<>();
        supervisorFilterProperties.add("firstname");
        supervisorFilterProperties.add("lastname");
        supervisorFilterProperties.add("email");
        supervisorFilterProperties.add("subdistrictcode");

        Set<String> subDistrictFilterProperties = new HashSet<>();
        subDistrictFilterProperties.add("code");
        subDistrictFilterProperties.add("name");
        subDistrictFilterProperties.add("district");

        SupervisorFilter<List<Supervisor>> supervisorFilter = new SupervisorFilter<>(supervisorList);
        return supervisorFilter.getSupervisorFilter(supervisorFilterProperties,subDistrictFilterProperties);

    }

    @GetMapping("/supervisor/subdistrict/")
    public MappingJacksonValue viewSupervisorBySubDistrict(@RequestParam("subdistrictcode") int subdistrictcode){

        List<Supervisor> supervisorList=adminService.viewSupervisorBySubDistrict(subdistrictcode);
        if(supervisorList.isEmpty())
        {
            throw new APIRequestException("No Supervisor found");
        }
        Set<String> supervisorFilterProperties = new HashSet<>();
        supervisorFilterProperties.add("firstname");
        supervisorFilterProperties.add("lastname");
        supervisorFilterProperties.add("email");
        supervisorFilterProperties.add("subdistrictcode");

        Set<String> subDistrictFilterProperties = new HashSet<>();
        subDistrictFilterProperties.add("code");
        subDistrictFilterProperties.add("name");
        subDistrictFilterProperties.add("district");

        SupervisorFilter<List<Supervisor>> supervisorFilter = new SupervisorFilter<List<Supervisor>>(supervisorList);
        return supervisorFilter.getSupervisorFilter(supervisorFilterProperties,subDistrictFilterProperties);
    }

    @DeleteMapping("/supervisor")
    public MappingJacksonValue deleteSupervisor(@RequestBody Supervisor supervisor)
    {
        Supervisor deletedSupervisor = adminService.deleteSupervisor(supervisor);

        if (deletedSupervisor!=null)
        {
            Set<String> supervisorFilterProperties = new HashSet<>();
            supervisorFilterProperties.add("firstname");
            supervisorFilterProperties.add("lastname");
            supervisorFilterProperties.add("email");
            supervisorFilterProperties.add("subdistrictcode");

            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            SupervisorFilter<Supervisor> supervisorFilter = new SupervisorFilter<Supervisor>(deletedSupervisor);
            return supervisorFilter.getSupervisorFilter(supervisorFilterProperties,subDistrictFilterProperties);
        }
        else
        {
            throw new APIRequestException("Supervisor not found");
        }

    }

    

    @Validated
    @PostMapping("/questionarrie")
    public MappingJacksonValue addQuestionarrie(@Valid @RequestBody Questionarrie questionarrie) throws Exception
    {
        try {
            Questionarrie que = adminService.addQuestionarrie(questionarrie);
            SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "question", "default_ans", "type");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionJSONFilter", questionfilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(que);
            mappingJacksonValue.setFilters(filterProvider);
            return mappingJacksonValue;
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while adding the questionarrie",ex.getMessage());
        }
    }

    @Validated
    @PostMapping("/med-questionarrie")
    public MappingJacksonValue addMedQuestionarrie(@Valid @RequestBody MedicalQue medquest) throws Exception
    {
        try {
            MedicalQue que = adminService.addMedicalQuestionarrie(medquest);
            SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "question");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("MedicalQueJSONFilter", questionfilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(que);
            mappingJacksonValue.setFilters(filterProvider);
            return mappingJacksonValue;
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while adding the medical questionarrie",ex.getMessage());
        }
    }

}
