package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Supervisor;
import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Filters.DoctorFilter;
import com.team9.manosarthi_backend.Filters.SupervisorFilter;
import com.team9.manosarthi_backend.Services.AdminService;
import com.team9.manosarthi_backend.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Validated
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    private UserService userService;

//    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/index")
    public String dashboard()
    {
        System.out.println("step1");
        return "admin_dashboard";
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public String addUser(@RequestBody User user) {
        userService.addUser(user);
        return "user_success";
    }


    //Add doctor
    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    //Doctor
    @Validated
    @PostMapping("/doctor")
    public ResponseEntity<MappingJacksonValue> addDoctor(@Valid @RequestBody Doctor doctor){

        System.out.println("doctor detauils"+doctor.toString());
        Doctor doc =  adminService.adddoctor(doctor);

        Set<String> doctorFilterProperties = new HashSet<>();
        doctorFilterProperties.add("firstname");
        doctorFilterProperties.add("lastname");
        doctorFilterProperties.add("email");
        doctorFilterProperties.add("subdistrictcode");

        Set<String> subDistrictFilterProperties = new HashSet<>();
        subDistrictFilterProperties.add("code");
        subDistrictFilterProperties.add("name");
        subDistrictFilterProperties.add("district");

        DoctorFilter<Doctor> doctorFilter = new DoctorFilter<Doctor>(doc);




        // Proceed with valid data
        return ResponseEntity.ok(doctorFilter.getDoctorFilter(doctorFilterProperties,subDistrictFilterProperties));
    }

    @GetMapping("/doctor")
    public MappingJacksonValue viewAllDoctors(@RequestParam("pagenumber") int pagenumber){
        int pagesize = 5;

        List<Doctor> doctors = adminService.viewAllDoctor(pagenumber,pagesize);

        Set<String> doctorFilterProperties = new HashSet<>();
        doctorFilterProperties.add("firstname");
        doctorFilterProperties.add("lastname");
        doctorFilterProperties.add("email");
        doctorFilterProperties.add("subdistrictcode");

        Set<String> subDistrictFilterProperties = new HashSet<>();
        subDistrictFilterProperties.add("code");
        subDistrictFilterProperties.add("name");
        subDistrictFilterProperties.add("district");

        DoctorFilter<List<Doctor>> doctorFilter = new DoctorFilter<List<Doctor>>(doctors);

        return doctorFilter.getDoctorFilter(doctorFilterProperties,subDistrictFilterProperties);
    }



    @GetMapping("/doctor/district")
    public MappingJacksonValue viewDoctorByDistrict(@RequestParam("districtcode") int districtcode,@RequestParam("pagenumber") int pagenumber){
        int pagesize=5;
        List<Doctor> doctors= adminService.viewDoctorByDistrict(districtcode, pagenumber, pagesize);

        Set<String> doctorFilterProperties = new HashSet<>();
        doctorFilterProperties.add("firstname");
        doctorFilterProperties.add("lastname");
        doctorFilterProperties.add("email");
        doctorFilterProperties.add("subdistrictcode");

        Set<String> subDistrictFilterProperties = new HashSet<>();
        subDistrictFilterProperties.add("code");
        subDistrictFilterProperties.add("name");
        subDistrictFilterProperties.add("district");

        DoctorFilter<List<Doctor>> doctorFilter = new DoctorFilter<List<Doctor>>(doctors);
        return doctorFilter.getDoctorFilter(doctorFilterProperties,subDistrictFilterProperties);

    }

    @GetMapping("/doctor/subdistrict/")
    public MappingJacksonValue viewDoctorBySubDistrict(@RequestParam("subdistrictcode") int subdistrictcode){
        List<Doctor> doctors = adminService.viewDoctorBySubDistrict(subdistrictcode);

        Set<String> doctorFilterProperties = new HashSet<>();
        doctorFilterProperties.add("firstname");
        doctorFilterProperties.add("lastname");
        doctorFilterProperties.add("email");
        doctorFilterProperties.add("subdistrictcode");

        Set<String> subDistrictFilterProperties = new HashSet<>();
        subDistrictFilterProperties.add("code");
        subDistrictFilterProperties.add("name");
        subDistrictFilterProperties.add("district");

        DoctorFilter<List<Doctor>> doctorFilter = new DoctorFilter<List<Doctor>>(doctors);
        return doctorFilter.getDoctorFilter(doctorFilterProperties,subDistrictFilterProperties);
    }

    @PostMapping("/supervisor")
    public MappingJacksonValue addSupervisor(@RequestBody Supervisor supervisor){
        Supervisor sup =  adminService.addSupervisor(supervisor);

        Set<String> supervisorFilterProperties = new HashSet<>();
        supervisorFilterProperties.add("firstname");
        supervisorFilterProperties.add("lastname");
        supervisorFilterProperties.add("email");
        supervisorFilterProperties.add("subdistrictcode");



        Set<String> subDistrictFilterProperties = new HashSet<>();
        subDistrictFilterProperties.add("code");
        subDistrictFilterProperties.add("name");
        subDistrictFilterProperties.add("district");

        SupervisorFilter<Supervisor> supervisorFilter = new SupervisorFilter<>(sup);

        return supervisorFilter.getSupervisorrFilter(supervisorFilterProperties,subDistrictFilterProperties);
    }


}
