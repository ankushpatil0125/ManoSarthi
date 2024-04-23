package com.team9.manosarthi_backend.ServicesImpl;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Repositories.*;
import com.team9.manosarthi_backend.Services.AdminService;
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

    private PatientRepository patientRepository;

    private PrescriptionRepository prescriptionRepository;

    private DiseaseRepository diseaseRepository;

    @Override
    public Doctor adddoctor(Doctor doctor) {

        Doctor newDoctor =  doctorRepository.save(doctor);

        //Add user to user database
        User user = new User();
        user.setUsername("DOC" + newDoctor.getId());
//        user.setPassword(passwordEncoder.encode("changeme"));

        String password= PasswordGeneratorService.generatePassword();
        user.setPassword(passwordEncoder.encode(password));

        user.setRole("ROLE_DOCTOR");
        User newuser = userRepository.save(user);

        //Increase count of doctor in subdistrict
        Optional<SubDistrict> subDistrict = subDistrictRepository.findById(newDoctor.getSubdistrictcode().getCode());

        subDistrict.ifPresent( subDistricttemp ->{
            subDistricttemp.setDoctor_count(subDistricttemp.getDoctor_count()+1);
            subDistrictRepository.save(subDistricttemp);
            newDoctor.setSubdistrictcode(subDistricttemp);
        } );

        newDoctor.setUser(newuser);
//        System.out.println(newDoctor.getSubdistrictcode().getDistrict());
        doctorRepository.save(newDoctor);
        //to get password in decoded form
        newuser.setPassword(password);
        newDoctor.setUser(newuser);
        return newDoctor;
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

        //Increase count of supervisor in subdistrict
        Optional<SubDistrict> subDistrict = subDistrictRepository.findById(newSupervisor.getSubdistrictcode().getCode());

        subDistrict.ifPresent( subDistricttemp ->{
            subDistricttemp.setSupervisor_count(subDistricttemp.getSupervisor_count()+1);
            subDistrictRepository.save(subDistricttemp);
            newSupervisor.setSubdistrictcode(subDistricttemp);
        } );

        newSupervisor.setUser(newuser);

        supervisorRepository.save(newSupervisor);

        //to get password in decoded form
        newuser.setPassword(password);
        newSupervisor.setUser(newuser);
        return newSupervisor;
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

            Optional<SubDistrict> subDistrict = subDistrictRepository.findById(deleteSupervisor.get().getSubdistrictcode().getCode());
            subDistrict.ifPresent(temp ->{
                temp.setSupervisor_count(temp.getSupervisor_count()-1);
                subDistrictRepository.save(temp);
            });
            String userName = deleteSupervisor.get().getUser().getUsername();

            deleteSupervisor.get().setUser(null);
            userRepository.deleteById(userName);

            deleteSupervisor.get().setActive(false);
            deleteSupervisor.get().setSubdistrictcode(null);
            return supervisorRepository.save(deleteSupervisor.get());
        }
        return null;
    }

    @Override
    public Supervisor ReassignSupervisor(Supervisor updatedSupervisor) {
        // Retrieve the existing worker from the database
        System.out.println("updatedSupervisor.getId() "+updatedSupervisor.getId());
        Supervisor existingSupervisor = supervisorRepository.findById(updatedSupervisor.getId()).orElse(null);
        System.out.println("existingSupervisor"+existingSupervisor);
        System.out.println("updated details"+updatedSupervisor.getFirstname());
        if(existingSupervisor!=null) {
            //you can update subdistrict code only in reassignment
            System.out.println("updatedSupervisor.getSubdistrictcode() "+updatedSupervisor.getSubdistrictcode());
            System.out.println("updatedSupervisor.getSubdistrictcode().getcode "+updatedSupervisor.getSubdistrictcode().getCode());
            System.out.println(" existingSupervisor.getSubdistrictcode().getCode() "+ existingSupervisor.getSubdistrictcode().getCode());
            if (updatedSupervisor.getSubdistrictcode() != null && updatedSupervisor.getSubdistrictcode().getCode() != existingSupervisor.getSubdistrictcode().getCode()) {
                int oldsubdistcode = existingSupervisor.getSubdistrictcode().getCode();
                Optional<SubDistrict> oldsubdist = subDistrictRepository.findById(oldsubdistcode);
                oldsubdist.ifPresent(subdisttemp -> {
                    subdisttemp.setSupervisor_count(subdisttemp.getSupervisor_count() - 1);
                    subDistrictRepository.save(subdisttemp);
                });
                int newsubdistcode = updatedSupervisor.getSubdistrictcode().getCode();
                Optional<SubDistrict> newsubdist = subDistrictRepository.findById(newsubdistcode);
                newsubdist.ifPresent(subdisttemp -> {
                    subdisttemp.setSupervisor_count(subdisttemp.getSupervisor_count() + 1);
                    subDistrictRepository.save(subdisttemp);
                    existingSupervisor.setSubdistrictcode(subdisttemp);
                });
                // Save the updated worker to the database
                System.out.println("existingSupervisor.get() before save"+existingSupervisor);
                return supervisorRepository.save(existingSupervisor);
            }
            System.out.println("supervisor updated subdirstrict is same ");
            return null;
        }
            else {
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

        @Override
        public List<Object[]> getdistrictstat()
        {
            return patientRepository.patientCountForDistrict();
        }

        @Override
        public List<Object[]> getdiseasecount(){
           return diseaseRepository.getDiseaseAndCount();
        }

}
