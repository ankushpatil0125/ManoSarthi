package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Filters.DoctorFilter;
import com.team9.manosarthi_backend.Filters.PatientFilter;
import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Entities.Doctor;
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

    @Autowired
    DoctorRepository doctorRepository;

    DoctorService doctorService;

    @Autowired
    public DoctorRestController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @Autowired
    private JwtHelper helper;
    @GetMapping("/viewdetails")
//    public Optional<Doctor> getDetails(@RequestParam("doctorid") int doctorid){
    public MappingJacksonValue getDetails(@RequestHeader("Authorization") String authorizationHeader){
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            String token = authorizationHeader.substring(7);
            String userid = helper.getIDFromToken(token);
//        return doctorRepository.findById(doctorid);
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


            return doctorFilter.getDoctorFilter(doctorFilterProperties,subDistrictFilterProperties,userFilterProperties);
        }

        return null;
    }


    @GetMapping("/new-patient-details")
    public MappingJacksonValue getNewPatientDetails(@RequestParam("pagenumber") int pagenumber,@RequestHeader("Authorization") String authorizationHeader){
        int pagesize=5;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){

            String token = authorizationHeader.substring(7);
            String doctorId = helper.getIDFromToken(token);

            List<Patient> patientList= doctorService.getNewPatientDetails(Integer.parseInt(doctorId), pagenumber,pagesize);

            Set<String> patientFilterProperties = new HashSet<>();
            patientFilterProperties.add("firstname");
            patientFilterProperties.add("lastname");
            patientFilterProperties.add("email");
            patientFilterProperties.add("village");

            Set<String> villageFilterProperties = new HashSet<>();
            villageFilterProperties.add("name");

            PatientFilter<List<Patient>> patientFilter= new PatientFilter<>(patientList);
            return patientFilter.getPatientFilter(patientFilterProperties,villageFilterProperties);
        }
        return null;
    }

}
