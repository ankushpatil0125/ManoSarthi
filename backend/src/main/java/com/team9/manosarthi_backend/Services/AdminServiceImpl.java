package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Repositories.UserRepository;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.team9.manosarthi_backend.Services.AdminService;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService{

    private DoctorRepository doctorRepository;
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Override
    public Doctor adddoctor(Doctor doctor) {


        Doctor newDoctor =  doctorRepository.save(doctor);

        User user = new User();

        user.setUsername("DOC"+newDoctor.getId());
        user.setPassword( passwordEncoder.encode( "changeme"));
        user.setRole("ROLE_DOCTOR");

         User newuser = userRepository.save(user);


        newDoctor.setUser(newuser);
        System.out.println(newDoctor.getSubdistrictcode().getDistrict());
        return doctorRepository.save(newDoctor);
    }

    @Override
    public List<Doctor> viewDocrtor() {
        return doctorRepository.findAll();
    }
}
