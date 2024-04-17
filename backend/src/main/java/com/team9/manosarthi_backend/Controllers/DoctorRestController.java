package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.DTO.PatientFollowUpPrescriptionDTO;
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
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@PreAuthorize("hasRole('DOCTOR')")
@RequestMapping("/doctor")
@CrossOrigin(origins = "*")
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
    public MappingJacksonValue getDetails(@RequestHeader("Authorization") String authorizationHeader){
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                // Extract the token part after "Bearer "
                String token = authorizationHeader.substring(7);
                String userid = helper.getIDFromToken(token);

                Optional<Doctor> doc = doctorRepository.findById(Integer.parseInt(userid));


                Set<String> doctorFilterProperties = new HashSet<>();
                doctorFilterProperties.add("firstname");
                doctorFilterProperties.add("lastname");
                doctorFilterProperties.add("email");
                doctorFilterProperties.add("subdistrictcode");
                doctorFilterProperties.add("user");
                doctorFilterProperties.add("gender");

                Set<String> subDistrictFilterProperties = new HashSet<>();
                subDistrictFilterProperties.add("code");
                subDistrictFilterProperties.add("name");
                subDistrictFilterProperties.add("district");

                Set<String> userFilterProperties = new HashSet<>();
                userFilterProperties.add("username");

                DoctorFilter<Optional<Doctor>> doctorFilter = new DoctorFilter<>(doc);


                return doctorFilter.getDoctorFilter(doctorFilterProperties, subDistrictFilterProperties, userFilterProperties);
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
    @GetMapping("/new-patient")
    public MappingJacksonValue getNewPatientDetails(@RequestParam("pagenumber") int pagenumber,@RequestHeader("Authorization") String authorizationHeader){

        int pagesize = 5;
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String doctorId = helper.getIDFromToken(token);
                List<Patient> patientList = doctorService.getNewPatientDetails(Integer.parseInt(doctorId), pagenumber, pagesize);
                Set<String> patientFilterProperties = new HashSet<>();
                patientFilterProperties.add("patient_id");
                patientFilterProperties.add("firstname");
                patientFilterProperties.add("lastname");
                patientFilterProperties.add("gender");
                patientFilterProperties.add("village");

                Set<String> villageFilterProperties = new HashSet<>();
                villageFilterProperties.add("name");

                PatientFilter<List<Patient>> patientFilter = new PatientFilter<>(patientList);
                return patientFilter.getPatientFilter(patientFilterProperties, villageFilterProperties);
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


    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @GetMapping("/temp")
    public Prescription temp(@RequestParam("patientId") int patientId,@RequestHeader("Authorization") String authorizationHeader)
    {
    /*
        System.out.println("Patient "+patientId);
        return prescriptionRepository.findById(patientId).get();
        */
     return null;
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer "))
//        {
//            String token = authorizationHeader.substring(7);
//            String doctorId = helper.getIDFromToken(token);
//
////            Patient patient = doctorService.getPatient(Integer.parseInt(doctorId),patientId);
//
//            Patient patient = patientRepository.findById(patientId).get();
//            System.out.println("temp patientRepository.findById(patientId).get();" + patient.getFollowUpDetailsList().get(0).getId());
//
//
//            Set<String> patientFilterProperties = new HashSet<>();
//            patientFilterProperties.add("firstname");
//            patientFilterProperties.add("lastname");
//            patientFilterProperties.add("gender");
//            patientFilterProperties.add("village");
//            patientFilterProperties.add("followUpDetailsList");
//            patientFilterProperties.add("medicalQueAnsList");
//
//            Set<String> villageFilterProperties = new HashSet<>();
//            villageFilterProperties.add("name");
//
//            Set<String> followUpFilterProperties = new HashSet<>();
//            followUpFilterProperties.add("followupDate");
//            followUpFilterProperties.add("followUpNo");
//            followUpFilterProperties.add("worker");
//            followUpFilterProperties.add("doctor");
//            followUpFilterProperties.add("questionarrieAnsList");
//
//            Set<String> questionarrieAnsFilterProperties = new HashSet<>();
//            questionarrieAnsFilterProperties.add("question_ans");
//            questionarrieAnsFilterProperties.add("questionarrie");
//
//            Set<String> questionarrieFilterProperties = new HashSet<>();
//            questionarrieFilterProperties.add("question");
//            questionarrieFilterProperties.add("default_ans");
//
//            Set<String> workerFilterProperties = new HashSet<>();
//            workerFilterProperties.add("firstname");
//            workerFilterProperties.add("lastname");
//
//            Set<String> doctorFilterProperties = new HashSet<>();
//            doctorFilterProperties.add("firstname");
//            doctorFilterProperties.add("lastname");
//
//            Set<String> medicalQueAnsFilterProperties = new HashSet<>();
//            medicalQueAnsFilterProperties.add("medicalquest");
//            medicalQueAnsFilterProperties.add("question_ans");
//
//            Set<String> medicalQueFilterProperties = new HashSet<>();
//            medicalQueFilterProperties.add("question");
//
//
////            patientFilterProperties.add("prescription");
////            patientFilterProperties.add("")
//            followUpFilterProperties.add("prescription");
//
//            PatientFilter<Patient> patientFilter = new PatientFilter<>(patient);
//
//            return patientFilter.getPatientFilter(patientFilterProperties, villageFilterProperties, workerFilterProperties, doctorFilterProperties, followUpFilterProperties, questionarrieAnsFilterProperties, questionarrieFilterProperties, medicalQueAnsFilterProperties, medicalQueFilterProperties);
//
//        }
//        return null;
    }

    @GetMapping("/patient")
    public MappingJacksonValue getPatient(@RequestParam("patientId") int patientId,@RequestHeader("Authorization") String authorizationHeader)
    {
        System.out.println("Patient "+patientId);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer "))
        {
            String token = authorizationHeader.substring(7);
            String doctorId = helper.getIDFromToken(token);

            Patient patient = doctorService.getPatient(Integer.parseInt(doctorId),patientId);


            Set<String> patientFilterProperties = new HashSet<>();
            patientFilterProperties.add("firstname");
            patientFilterProperties.add("lastname");
            patientFilterProperties.add("gender");
            patientFilterProperties.add("village");
            patientFilterProperties.add("followUpDetailsList");
            patientFilterProperties.add("medicalQueAnsList");

            Set<String> villageFilterProperties = new HashSet<>();
            villageFilterProperties.add("name");

            Set<String> followUpFilterProperties = new HashSet<>();
            followUpFilterProperties.add("followupDate");
            followUpFilterProperties.add("followUpNo");
            followUpFilterProperties.add("worker");
            followUpFilterProperties.add("doctor");
            followUpFilterProperties.add("questionarrieAnsList");

            Set<String> questionarrieAnsFilterProperties = new HashSet<>();
            questionarrieAnsFilterProperties.add("question_ans");
            questionarrieAnsFilterProperties.add("questionarrie");

            Set<String> questionarrieFilterProperties = new HashSet<>();
            questionarrieFilterProperties.add("question");
            questionarrieFilterProperties.add("default_ans");

            Set<String> workerFilterProperties = new HashSet<>();
            workerFilterProperties.add("firstname");
            workerFilterProperties.add("lastname");

            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");
            doctorFilterProperties.add("lastname");

            Set<String> medicalQueAnsFilterProperties = new HashSet<>();
            medicalQueAnsFilterProperties.add("medicalquest");
            medicalQueAnsFilterProperties.add("question_ans");

            Set<String> medicalQueFilterProperties = new HashSet<>();
            medicalQueFilterProperties.add("question");

            PatientFilter<Patient> patientFilter = new PatientFilter<>(patient);

            return patientFilter.getPatientFilter(patientFilterProperties, villageFilterProperties, workerFilterProperties, doctorFilterProperties, followUpFilterProperties, questionarrieAnsFilterProperties, questionarrieFilterProperties, medicalQueAnsFilterProperties, medicalQueFilterProperties);

        }
        return null;
    }

    @PostMapping("/prescription-followup")
    public boolean giveprescription(@RequestBody PatientFollowUpPrescriptionDTO patientFollowUpPrescriptionDTO) {
//        System.out.println("patientFollowUpPrescriptionDTO "+patientFollowUpPrescriptionDTO.toString());
        System.out.println("/doctor/prescription-followup");
        /*
        try {
            System.out.println("GOT TILL THIS");
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
                throw new APIRequestException("Error while updating worker profile",ex.getMessage());
        }



         */
        return false;
    }

}
