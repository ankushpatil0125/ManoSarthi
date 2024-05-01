package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.DTO.DoctorResponseDTO;
import com.team9.manosarthi_backend.DTO.SupervisorResponseDTO;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Exceptions.GlobalExceptionhandler;
import com.team9.manosarthi_backend.Services.AdminService;
import com.team9.manosarthi_backend.ServicesImpl.EmailService;
import com.team9.manosarthi_backend.ServicesImpl.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

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
    public ResponseEntity<DoctorResponseDTO> addDoctor(@Valid @RequestBody Doctor doctor){
       try {
            Doctor doc = adminService.adddoctor(doctor);
            DoctorResponseDTO dto = new DoctorResponseDTO();
            dto.forAdminDoctorToDoctorResponseDTO(doc);

           //for sending email
           String subject = "Login Credentials for Manosarthi";
           String msg = "Hello " + doc.getFirstname() + " " + doc.getLastname() + "\nYou are assigned as Doctor for Manosarthi Scheme for " + doc.getSubdistrictcode().getName() + "\nPlease login in Manosarthi app with following credentials. " + "\nUsername = " + doc.getUser().getUsername() + "\nPassword = " + doc.getUser().getPassword() + "\nPlease change password after login.";
           String to = doc.getEmail();
           if (emailService.sendEmail(subject, msg, to)) {
               System.out.println("mail success");
           } else {
               System.out.println("mail failed");
               throw new APIRequestException("Sending mail failed");
           }
           return ResponseEntity.ok(dto);

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
    public List<DoctorResponseDTO> viewAllDoctors(@RequestParam("pagenumber") int pagenumber){
        int pagesize = 3;
        try {
            List<Doctor> doctors = adminService.viewAllDoctor(pagenumber, pagesize);
            List<DoctorResponseDTO> doctorResponseDTOs = new ArrayList<>();

            for (Doctor doc : doctors)
            {
                DoctorResponseDTO dto = new DoctorResponseDTO();
                dto.forAdminDoctorToDoctorResponseDTO(doc);
                doctorResponseDTOs.add(dto);
            }

            if (doctors == null) {
                throw new APIRequestException("No doctors found");
            }
            return doctorResponseDTOs;
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
    public List<DoctorResponseDTO> viewDoctorByDistrict(@RequestParam("districtcode") int districtcode,@RequestParam("pagenumber") int pagenumber){
        int pagesize=3;
        try {
            List<Doctor> doctors = adminService.viewDoctorByDistrict(districtcode, pagenumber, pagesize);
            if (doctors == null) {
                throw new APIRequestException("No doctors found");
            }

            List<DoctorResponseDTO> doctorResponseDTOs = new ArrayList<>();

            for (Doctor doc : doctors)
            {
                DoctorResponseDTO dto = new DoctorResponseDTO();
                dto.forAdminDoctorToDoctorResponseDTO(doc);
                doctorResponseDTOs.add(dto);
            }

            return doctorResponseDTOs;
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
    public List<DoctorResponseDTO> viewDoctorBySubDistrict(@RequestParam("subdistrictcode") int subdistrictcode){
        try {
            List<Doctor> doctors = adminService.viewDoctorBySubDistrict(subdistrictcode);
            if (doctors.isEmpty()) {
                throw new APIRequestException("No doctors found");
            }

            List<DoctorResponseDTO> doctorResponseDTOs = new ArrayList<>();

            for (Doctor doc : doctors)
            {
                DoctorResponseDTO dto = new DoctorResponseDTO();
                dto.forAdminDoctorToDoctorResponseDTO(doc);
                doctorResponseDTOs.add(dto);
            }

            return doctorResponseDTOs;
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
    public SupervisorResponseDTO addSupervisor(@Valid @RequestBody Supervisor supervisor){
        try {
            Supervisor sup = adminService.addSupervisor(supervisor);

            SupervisorResponseDTO dto = new SupervisorResponseDTO();
            dto.forAdminSupervisorToSupervisorResponseDTO(sup);

            //for sending email
            String subject = "Login Credentials for Manosarthi";
            String msg = "Hello " + sup.getFirstname() + " " + sup.getLastname() + "\nYou are assigned as Supervisor for Manosarthi Scheme for " + sup.getSubdistrictcode().getName() + "\nPlease login in Manosarthi app with following credentials. " + "\nUsername = " + sup.getUser().getUsername() + "\nPassword = " + sup.getUser().getPassword() + "\nPlease change password after login.";
            String to = sup.getEmail();
            if (emailService.sendEmail(subject, msg, to)) {
                System.out.println("mail success");
            } else {
                System.out.println("mail failed");
                throw new APIRequestException("Sending mail failed");
            }
            return dto;
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
    public ResponseEntity<SupervisorResponseDTO> ReassignSupervisor(@RequestBody Supervisor updatedSupervisor) {
        try {
            System.out.println("updatedSupervisor    "+updatedSupervisor);
            Supervisor updatedsupervisor = adminService.ReassignSupervisor(updatedSupervisor);
            if (updatedsupervisor != null) {

                SupervisorResponseDTO dto = new SupervisorResponseDTO();
                dto.forAdminSupervisorToSupervisorResponseDTO(updatedsupervisor);

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

                return ResponseEntity.ok(dto);
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
    public List<SupervisorResponseDTO> viewAllSupervisor(@RequestParam("pagenumber") int pagenumber){
        int pagesize = 3;

//        List<Doctor> doctors = adminService.viewAllDoctor(pagenumber,pagesize);
        List<Supervisor> supervisorList=adminService.viewAllSupervisor(pagenumber,pagesize);

        if(supervisorList== null)
        {
            throw new APIRequestException("No Supervisor found");
        }

        List<SupervisorResponseDTO> supervisorResponseDTOS = new ArrayList<>();
        for (Supervisor sup : supervisorList)
        {
            SupervisorResponseDTO dto = new SupervisorResponseDTO();
            dto.forAdminSupervisorToSupervisorResponseDTO(sup);
            supervisorResponseDTOS.add(dto);
        }



        return supervisorResponseDTOS;
    }



    @GetMapping("/supervisor/district")
    public List<SupervisorResponseDTO> viewSupervisorByDistrict(@RequestParam("districtcode") int districtcode,@RequestParam("pagenumber") int pagenumber){
        int pagesize=3;
//        List<Doctor> doctors= adminService.viewDoctorByDistrict(districtcode, pagenumber, pagesize);
        List<Supervisor> supervisorList=adminService.viewSupervisorByDistrict(districtcode,pagenumber,pagesize);
        if(supervisorList== null)
        {
            throw new APIRequestException("No Supervisor found");
        }

        List<SupervisorResponseDTO> supervisorResponseDTOS = new ArrayList<>();
        for (Supervisor sup : supervisorList)
        {
            SupervisorResponseDTO dto = new SupervisorResponseDTO();
            dto.forAdminSupervisorToSupervisorResponseDTO(sup);
            supervisorResponseDTOS.add(dto);
        }

        return supervisorResponseDTOS;

    }

    @GetMapping("/supervisor/subdistrict/")
    public  List<SupervisorResponseDTO> viewSupervisorBySubDistrict(@RequestParam("subdistrictcode") int subdistrictcode){

        List<Supervisor> supervisorList=adminService.viewSupervisorBySubDistrict(subdistrictcode);
        if(supervisorList.isEmpty())
        {
            throw new APIRequestException("No Supervisor found");
        }
        List<SupervisorResponseDTO> supervisorResponseDTOS = new ArrayList<>();
        for (Supervisor sup : supervisorList)
        {
            SupervisorResponseDTO dto = new SupervisorResponseDTO();
            dto.forAdminSupervisorToSupervisorResponseDTO(sup);
            supervisorResponseDTOS.add(dto);
        }
        return supervisorResponseDTOS;
    }

    @DeleteMapping("/supervisor")
    public SupervisorResponseDTO deleteSupervisor(@RequestBody Supervisor supervisor)
    {
        Supervisor deletedSupervisor = adminService.deleteSupervisor(supervisor);

        if (deletedSupervisor!=null)
        {
            System.out.println("Supervisor with ID " + deletedSupervisor.getId() + " was deleted successfully"+deletedSupervisor);
            SupervisorResponseDTO dto = new SupervisorResponseDTO();
            dto.forAdminSupervisorToSupervisorResponseDTO(deletedSupervisor);
            return dto;
        }
        else
        {
            throw new APIRequestException("Supervisor not found");
        }

    }

    

    @Validated
    @PostMapping("/questionarrie")
    public Questionarrie addQuestionarrie(@Valid @RequestBody Questionarrie questionarrie) throws Exception
    {
        try {
            Questionarrie que = adminService.addQuestionarrie(questionarrie);

            return que;
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while adding the questionarrie",ex.getMessage());
        }
    }

    @Validated
    @PostMapping("/med-questionarrie")
    public MedicalQue addMedQuestionarrie(@Valid @RequestBody MedicalQue medquest) throws Exception
    {
        try {
            MedicalQue que = adminService.addMedicalQuestionarrie(medquest);

            return que;
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while adding the medical questionarrie",ex.getMessage());
        }
    }

}
