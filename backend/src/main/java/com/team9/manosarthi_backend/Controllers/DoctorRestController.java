package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Entities.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "*")
public class DoctorRestController {

    @Autowired
    DoctorRepository doctorRepository;

    @GetMapping("/viewdetails")
    public Optional<Doctor> getDetails(@RequestParam("doctorid") int doctorid){
        return doctorRepository.findById(doctorid);
    }

}
