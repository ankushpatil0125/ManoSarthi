package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Supervisor;
import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Repositories.SupervisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@PreAuthorize("hasRole('SUPERVISOR')")
@RequestMapping("/supervisor")
@CrossOrigin(origins = "*")
public class SupervisorRestController {
    @Autowired
    SupervisorRepository supervisorRepository;

    @GetMapping("/viewdetails")
    public Optional<Supervisor> getDetails(@RequestParam("supervisorid") int supervisorid){
        return supervisorRepository.findById(supervisorid);
    }
}
