package com.team9.manosarthi_backend.Services;



import java.util.List;

import com.team9.manosarthi_backend.DTO.AdminDashboardDTO;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.MedicalQue;
import com.team9.manosarthi_backend.Entities.Questionarrie;
import com.team9.manosarthi_backend.Entities.Supervisor;
import org.springframework.http.ResponseEntity;

public interface AdminService  {

    Doctor adddoctor(Doctor doctor);

    Supervisor addSupervisor(Supervisor supervisor);

    List<Doctor> viewAllDoctor(int pagenumber,int pagesize);
    List<Doctor> viewDoctorByDistrict(int districtcode, int pagenumber, int pagesize);
    List<Doctor> viewDoctorBySubDistrict(int subdistrictcode);
    Doctor reassignDoctor(int doctorID,int oldSubDistrict,int newSubDistrict);

    Supervisor ReassignSupervisor(Supervisor updatedSupervisor);
    List<Questionarrie> addQuestionarrie(List<Questionarrie> questionarrie);

    List<MedicalQue> addMedicalQuestionarrie(List<MedicalQue> medicalques);

    List<Supervisor> viewSupervisorByDistrict(int districtcode, int pagenumber, int pagesize);
    List<Supervisor> viewSupervisorBySubDistrict(int subdistrictcode);

    List<Supervisor> viewAllSupervisor(int pagenumber,int pagesize);

    Supervisor deleteSupervisor(Supervisor supervisor);

    /*
     List<Object[]> getdistrictstat();

     List<Object[]> getdiseasecount();

     */

    AdminDashboardDTO dashboard();
}
