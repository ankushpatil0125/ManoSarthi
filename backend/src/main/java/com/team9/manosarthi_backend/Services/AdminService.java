package com.team9.manosarthi_backend.Services;



import java.util.List;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Supervisor;
import com.team9.manosarthi_backend.models.DoctorDto;

public interface AdminService {

    Doctor adddoctor(Doctor doctor);

    Supervisor addSupervisor(Supervisor supervisor);

    List<DoctorDto> viewDoctor(int pageNumber, int pageSize);

    List<Doctor> viewAllDoctor();
    List<Doctor> viewDoctorByDistrict(int districtcode);

    List<Doctor> viewDoctorBySubDistrict(int subdistrictcode);

}
