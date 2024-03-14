package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Supervisor;
import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Services.AdminService;
import com.team9.manosarthi_backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
//@PreAuthorize("hasRole('USER')")
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
    @PostMapping("/doctor")
    public Doctor addDoctor(@RequestBody Doctor doctor){
        System.out.println("doctor detauils"+doctor.toString());
        Doctor doc =  adminService.adddoctor(doctor);
        return doc;
    }

    @GetMapping("/doctor")
    public List<Doctor> viewAllDoctors(@RequestParam("pagenumber") int pagenumber){  //(@PathVariable("districtcode") int districtcode,@PathVariable("subdistrictcode") int subdistrictcode)

        int pagesize = 5;
        return adminService.viewAllDoctor(pagenumber,pagesize);

    }

    @GetMapping("/doctor/district")
    public List<Doctor> viewDoctorByDistrict(@RequestParam("districtcode") int districtcode,@RequestParam("pagenumber") int pagenumber){
        int pagesize=5;
//        System.out.println("/admin/doctor/dist District code "+districtcode);
        return adminService.viewDoctorByDistrict(districtcode, pagenumber, pagesize);
    }

//    @GetMapping("/doctor/subdistrict/{subdistrictcode}")
//    public List<Doctor> viewDoctorBySubDistrict(@PathVariable("subdistrictcode") int subdistrictcode){
//        return adminService.viewDoctorBySubDistrict(subdistrictcode);
//    }
@GetMapping("/doctor/subdistrict/")
public List<Doctor> viewDoctorBySubDistrict(@RequestParam("subdistrictcode") int subdistrictcode){
    return adminService.viewDoctorBySubDistrict(subdistrictcode);
}




    @PostMapping("/supervisor")
    public Supervisor addSupervisor(@RequestBody Supervisor supervisor){
        Supervisor sup =  adminService.addSupervisor(supervisor);
        return sup;
    }

//    public String addDoctor(@RequestBody Doctor doctor){
//        String userId =  adminService.adddoctor(doctor);
//        return " Doctor userId :  " + userId;
//    }

//    If want to view all doctors
//    @GetMapping("/viewdoctor/{pageNumber}")
//    public MappingJacksonValue viewDoctor(@PathVariable ("pageNumber") int pageNumber){
////        System.out.println("hello");
//        int pageSize=5;
////        System.out.println(adminService.viewDocrtor());
//        List<Doctor> doctors=adminService.viewAllDoctor();
//
//        SimpleBeanPropertyFilter filter= SimpleBeanPropertyFilter.filterOutAllExcept("firstname");
//        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("Doctor",filter);
//        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(doctors);
//
//        System.out.println("doctor maping filter"+mappingJacksonValue.getFilters());
//        System.out.println("filter"+ filterProvider.toString());
////        mappingJacksonValue.setValue(filterProvider);
//        mappingJacksonValue.setFilters(filterProvider);
//        return mappingJacksonValue;
//
////        return adminService.viewDoctor(pageNumber,pageSize);
//    }


}
