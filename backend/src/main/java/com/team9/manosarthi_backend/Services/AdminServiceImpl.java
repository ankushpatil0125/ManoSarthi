package com.team9.manosarthi_backend.Services;
import com.team9.manosarthi_backend.models.DoctorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.team9.manosarthi_backend.Entities.SubDistrict;
import com.team9.manosarthi_backend.Entities.Supervisor;
import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Repositories.SubDistrictRepository;
import com.team9.manosarthi_backend.Repositories.SupervisorRepository;
import com.team9.manosarthi_backend.Repositories.UserRepository;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.User;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.team9.manosarthi_backend.Services.AdminService;
import org.modelmapper.ModelMapper;

import java.util.List;

import java.util.stream.Collectors;

import java.util.Optional;


@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private DoctorRepository doctorRepository;
    private SupervisorRepository supervisorRepository;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper = new ModelMapper();


    private SubDistrictRepository subDistrictRepository;

    @Override
    public Doctor adddoctor(Doctor doctor) {

        Doctor newDoctor =  doctorRepository.save(doctor);


        //Add user to user database
        User user = new User();

        user.setUsername("DOC" + newDoctor.getId());
        user.setPassword(passwordEncoder.encode("changeme"));

        user.setRole("ROLE_DOCTOR");
        User newuser = userRepository.save(user);

        //Increase count of doctor in subdistrict
        Optional<SubDistrict> subDistrict = subDistrictRepository.findById(newDoctor.getSubdistrictcode().getCode());


        subDistrict.ifPresent( subDistricttemp ->{
            subDistricttemp.setDoctor_count(subDistricttemp.getDoctor_count()+1);
            subDistrictRepository.save(subDistricttemp);
        } );

        newDoctor.setUser(newuser);
        System.out.println(newDoctor.getSubdistrictcode().getDistrict());
        return doctorRepository.save(newDoctor);
    }

    @Override
    public Supervisor addSupervisor(Supervisor supervisor) {

        Supervisor newSupervisor = supervisorRepository.save(supervisor);

        User user = new User();

        user.setUsername("SUP" + newSupervisor.getId());
        user.setPassword(passwordEncoder.encode("changeme"));
        user.setRole("ROLE_SUPERVISOR");

        User newuser = userRepository.save(user);


        supervisor.setUser(newuser);

        return supervisorRepository.save(newSupervisor);

    }

    @Override
    public List<DoctorDto> viewDoctor(int pageNumber, int pageSize) {

        Pageable p= PageRequest.of(pageNumber,pageSize);
        Page <Doctor> pageDoctor=this.doctorRepository.findAll(p);
        List<Doctor> allDoctors=pageDoctor.getContent();
        List<DoctorDto> doctorDtos = allDoctors.stream()
                .map(doctor -> {
                    // Create a new DoctorDto object
                    DoctorDto doctorDto = new DoctorDto();
                    // Apply mappings from Doctor to DoctorDto
                    modelMapper.map(doctor, doctorDto);
                    // Additional mappings specific to DoctorDto can be applied here if needed
                    doctorDto.setSubDistrictName(doctor.getSubdistrictcode().getName());
                    doctorDto.setDistrictName(doctor.getSubdistrictcode().getDistrict().getName());
                    doctorDto.setName(doctor.getFirstname()+" "+doctor.getLastname());
                    return doctorDto;
                })
                .collect(Collectors.toList());


        return doctorDtos;

    }


    public List<Doctor> viewAllDoctor(int pagenumber,int pagesize) {
        Pageable p= PageRequest.of(pagenumber,pagesize);
        Page <Doctor> pageDoctor=this.doctorRepository.findAll(p);
        List<Doctor> allDoctors=pageDoctor.getContent();
        return allDoctors;
    }

    @Override
    public List<Doctor> viewDoctorByDistrict(int districtcode,int pagenumber,int pagesize) {
        Pageable p= PageRequest.of(pagenumber,pagesize);
        Page <Doctor> pageDoctor=doctorRepository.findDoctorByDistrict(districtcode,p);
        List<Doctor> allDoctors=pageDoctor.getContent();
        return allDoctors;
    }

    @Override
    public List<Doctor> viewDoctorBySubDistrict(int subdistrictcode) {
        return doctorRepository.findDoctorBySubDistrict(subdistrictcode);
    }



}
