package com.team9.manosarthi_backend.Services;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Optional;


@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private DoctorRepository doctorRepository;
    private SupervisorRepository supervisorRepository;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    private SubDistrictRepository subDistrictRepository;

    private QuestionarrieRepo questionarrieRepo;

    private MedicalQueRepo medicalQueRepo;

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

        Optional<SubDistrict> subDistrict = subDistrictRepository.findById(supervisor.getSubdistrictcode().getCode());

        subDistrict.ifPresent(temp -> {
            temp.setSupervisor_count(temp.getSupervisor_count()+1);
            subDistrictRepository.save(temp);
        });
        supervisor.setUser(newuser);

        return supervisorRepository.save(newSupervisor);

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


    @Override
    public List<Supervisor> viewSupervisorByDistrict(int districtcode, int pagenumber, int pagesize) {
        Pageable p= PageRequest.of(pagenumber,pagesize);
        Page <Supervisor> pageSupervisor=supervisorRepository.findSupervisorByDistrict(districtcode,p);
        List<Supervisor> allSupervisor=pageSupervisor.getContent();
        return allSupervisor;
    }

    @Override
    public List<Supervisor> viewSupervisorBySubDistrict(int subdistrictcode) {
        List<Supervisor> allSupervisor = supervisorRepository.findSupervisorBySubDistrict(subdistrictcode);

        return allSupervisor;
    }

    @Override
    public List<Supervisor> viewAllSupervisor(int pagenumber, int pagesize) {
        Pageable p= PageRequest.of(pagenumber,pagesize);
        Page <Supervisor> pageSupervisor=supervisorRepository.findAll(p);
        List<Supervisor> allSupervisor=pageSupervisor.getContent();
        return allSupervisor;
    }

    @Override
    public Supervisor deleteSupervisor(Supervisor supervisor) {
        Optional<Supervisor> newSupervisor= supervisorRepository.findById(supervisor.getId());

        if(newSupervisor.isPresent())
        {
            newSupervisor.get().setActive(false);
            Optional<SubDistrict> subDistrict = subDistrictRepository.findById(newSupervisor.get().getSubdistrictcode().getCode());
            subDistrict.ifPresent(temp ->{
                temp.setSupervisor_count(temp.getSupervisor_count()-1);
                subDistrictRepository.save(temp);
            });
            return supervisorRepository.save(newSupervisor.get());
        }
        return null;
    }


    @Override
        public Questionarrie addQuestionarrie(Questionarrie que)
        {
            return questionarrieRepo.save(que);
        }

        @Override
        public MedicalQue addMedicalQuestionarrie(MedicalQue medicalque)
        {
            return medicalQueRepo.save(medicalque);
        }




}
