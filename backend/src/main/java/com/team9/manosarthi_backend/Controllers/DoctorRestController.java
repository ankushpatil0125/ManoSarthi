package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.security.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@PreAuthorize("hasRole('DOCTOR')")
@RequestMapping("/doctor")
@CrossOrigin(origins = "*")
public class DoctorRestController {

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    private JwtHelper helper;
    @GetMapping("/viewdetails")
//    public Optional<Doctor> getDetails(@RequestParam("doctorid") int doctorid){
    public Optional<Doctor> getDetails(@RequestHeader("Authorization") String authorizationHeader){
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            String token = authorizationHeader.substring(7);
            String userid = helper.getIDFromToken(token);
//        return doctorRepository.findById(doctorid);
            return doctorRepository.findById(Integer.parseInt(userid));
        }

        return doctorRepository.findById(-1);
    }

}
