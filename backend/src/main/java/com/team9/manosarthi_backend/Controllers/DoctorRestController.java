package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.DTO.DoctorResponseDTO;
import com.team9.manosarthi_backend.DTO.FollowUpDetailsDTO;
import com.team9.manosarthi_backend.DTO.PatientFollowUpPrescriptionDTO;
import com.team9.manosarthi_backend.DTO.PatientResponseDTO;
import com.team9.manosarthi_backend.Entities.FollowUpDetails;
import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Entities.Prescription;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Filters.DoctorFilter;
import com.team9.manosarthi_backend.Filters.PatientFilter;
import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Repositories.PatientRepository;
import com.team9.manosarthi_backend.Repositories.PrescriptionRepository;
import com.team9.manosarthi_backend.Services.DoctorService;
import com.team9.manosarthi_backend.security.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@PreAuthorize("hasRole('DOCTOR')")
@RequestMapping("/doctor")
@CrossOrigin(origins = "*")

@EnableTransactionManagement
public class DoctorRestController {
    DoctorRepository doctorRepository;
    DoctorService doctorService;
    private JwtHelper helper;

    @Autowired
    public DoctorRestController(DoctorRepository doctorRepository, DoctorService doctorService, JwtHelper helper) {
        this.doctorRepository = doctorRepository;
        this.doctorService = doctorService;
        this.helper = helper;
    }



    @GetMapping("/viewdetails")
    public DoctorResponseDTO getDetails(@RequestHeader("Authorization") String authorizationHeader){
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                // Extract the token part after "Bearer "
                String token = authorizationHeader.substring(7);
                String userid = helper.getIDFromToken(token);

               Doctor doctor = doctorService.viewProfile(Integer.parseInt(userid));
                DoctorResponseDTO doctorResponseDTO = new DoctorResponseDTO();
                doctorResponseDTO.forDoctor_DoctorToDoctorResponseDTO(doctor);

                return doctorResponseDTO;
            }
            else {
                throw new APIRequestException("Error in authorizing");
            }
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting doctors of district",ex.getMessage());
        }
    }
    @GetMapping("/patient")
    public List<PatientResponseDTO> getNewPatientDetails(@RequestParam("type") String type, @RequestParam("pagenumber") int pagenumber,@RequestHeader("Authorization") String authorizationHeader){

        int pagesize = 5;
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String doctorId = helper.getIDFromToken(token);
                List<Patient> patientList = doctorService.getPatientList(type,Integer.parseInt(doctorId), pagenumber, pagesize);

                List<PatientResponseDTO> patientResponseDTOList = new ArrayList<>();
                for (Patient pat : patientList)
                {
                    PatientResponseDTO patientResponseDTO = new PatientResponseDTO();
                    patientResponseDTO.doctor_PatientToPatientResponseDTO(pat);
                    patientResponseDTOList.add(patientResponseDTO);

                }
                return patientResponseDTOList;
            }
            else {
                throw new APIRequestException("Error in authorizing");
            }
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting new patients",ex.getMessage());
        }
    }

    @PostMapping("/prescription-followup")
    public boolean giveprescription(@RequestBody PatientFollowUpPrescriptionDTO patientFollowUpPrescriptionDTO) {
//        System.out.println("patientFollowUpPrescriptionDTO "+patientFollowUpPrescriptionDTO.toString());
        System.out.println("/doctor/prescription-followup");

        try {

            Prescription prescription = doctorService.givePrescription(patientFollowUpPrescriptionDTO);

            if(prescription!=null) return true;
            else return false;
        }
        catch (Exception ex)
        {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while adding prescription-followup",ex.getMessage());
        }
    }

    @GetMapping("/getfollowups")
    public List<FollowUpDetailsDTO> getFollowups(@RequestParam("pagenumber") int pagenumber,@RequestHeader("Authorization") String authorizationHeader,@RequestParam("patientId") int patientId){

        int pagesize = 1;
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String doctorId = helper.getIDFromToken(token);
                List<FollowUpDetails> followups = doctorService.getFollowups(pagenumber, pagesize,Integer.parseInt(doctorId),patientId);


                List<FollowUpDetailsDTO> followupDTOList=new ArrayList<>();
                for(FollowUpDetails followup:followups)
                {
                    FollowUpDetailsDTO followUpDetailsDTO=new FollowUpDetailsDTO();
                    followUpDetailsDTO.followup(followup);
                    followupDTOList.add(followUpDetailsDTO);
                }
                return followupDTOList;
            }
            else {
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
                throw new APIRequestException("Error while getting followup details",ex.getMessage());
        }
    }


    @GetMapping("/referred-during-followup")
    public List<PatientResponseDTO> refferedDuringFollowUp(@RequestParam("pagenumber") int pagenumber,@RequestHeader("Authorization") String authorizationHeader) {

        int pagesize = 5;
        try  {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String token = authorizationHeader.substring(7);
                String doctorId = helper.getIDFromToken(token);

                List<Patient> patientList = doctorService.getReferredPatient(Integer.parseInt(doctorId), pagenumber, pagesize);
                List<PatientResponseDTO> patientResponseDTOList = new ArrayList<>();
                for (Patient pat : patientList) {
                    PatientResponseDTO patientResponseDTO = new PatientResponseDTO();
                    patientResponseDTO.doctor_PatientToPatientResponseDTO(pat);
                    patientResponseDTOList.add(patientResponseDTO);
                }
                return patientResponseDTOList;
            }
            else
                throw new APIRequestException("Error while authorization of doctor");

        }
        catch (Exception ex)
        {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while getting followup details",ex.getMessage());
        }

    }
}
