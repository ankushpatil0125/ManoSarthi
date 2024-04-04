package com.team9.manosarthi_backend.Services;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
//        user.setPassword(passwordEncoder.encode("changeme"));

        String password=PasswordGeneratorService.generatePassword();
        user.setPassword(passwordEncoder.encode(password));

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
//        user.setPassword(passwordEncoder.encode("changeme"));
        String password=PasswordGeneratorService.generatePassword();
        user.setPassword(passwordEncoder.encode(password));
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
        Optional<Supervisor> deleteSupervisor= supervisorRepository.findById(supervisor.getId());

        if(deleteSupervisor.isPresent())
        {
            deleteSupervisor.get().setActive(false);
            Optional<SubDistrict> subDistrict = subDistrictRepository.findById(deleteSupervisor.get().getSubdistrictcode().getCode());
            subDistrict.ifPresent(temp ->{
                temp.setSupervisor_count(temp.getSupervisor_count()-1);
                subDistrictRepository.save(temp);
            });
            String userName = deleteSupervisor.get().getUser().getUsername();
            deleteSupervisor.get().setUser(null);
            userRepository.deleteById(userName);
            return supervisorRepository.save(deleteSupervisor.get());
        }
        return null;
    }

    @Override
    public Supervisor ReassignSupervisor(Supervisor updatedSupervisor) {
        // Retrieve the existing worker from the database
        Supervisor existingSupervisor = supervisorRepository.findById(updatedSupervisor.getId()).orElse(null);
        System.out.println("updated details"+updatedSupervisor.getFirstname());
        if(existingSupervisor!=null)
        {
            //you can update subdistrict code only in reassignment
            if(updatedSupervisor.getSubdistrictcode()!=null && updatedSupervisor.getSubdistrictcode().getCode() != existingSupervisor.getSubdistrictcode().getCode())
            {
                int oldsubdistcode=existingSupervisor.getSubdistrictcode().getCode();
                Optional<SubDistrict> oldsubdist=subDistrictRepository.findById(oldsubdistcode);
                oldsubdist.ifPresent( subdisttemp ->{
                    subdisttemp.setSupervisor_count(subdisttemp.getSupervisor_count()-1);
                    subDistrictRepository.save(subdisttemp);
                } );
                int newsubdistcode=updatedSupervisor.getSubdistrictcode().getCode();
                Optional<SubDistrict> newsubdist=subDistrictRepository.findById(newsubdistcode);
                newsubdist.ifPresent( subdisttemp ->{
                    subdisttemp.setSupervisor_count(subdisttemp.getSupervisor_count()+1);
                    subDistrictRepository.save(subdisttemp);
                    existingSupervisor.setSubdistrictcode(subdisttemp);
                } );
            }

            // Save the updated worker to the database
            return supervisorRepository.save(existingSupervisor);



        } else {
            System.out.println("Supervisor not found with ID: " + updatedSupervisor.getId());
            return null;
        }
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
