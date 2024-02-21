package com.team9.manosarthi_backend.Services;



import java.util.List;
import com.team9.manosarthi_backend.Entities.Doctor;
public interface AdminService {

    Doctor adddoctor(Doctor doctor);
    List<Doctor> viewDocrtor();
}
