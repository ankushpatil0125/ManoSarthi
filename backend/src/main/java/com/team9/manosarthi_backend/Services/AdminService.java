package com.team9.manosarthi_backend.Services;



import java.util.List;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Supervisor;

public interface AdminService {

    Doctor adddoctor(Doctor doctor);

    Supervisor addSupervisor(Supervisor supervisor);

    List<Doctor> viewAllDoctor(int pagenumber,int pagesize);
    List<Doctor> viewDoctorByDistrict(int districtcode, int pagenumber, int pagesize);

    List<Doctor> viewDoctorBySubDistrict(int subdistrictcode);

}
