package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.District;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.SubDistrict;
import com.team9.manosarthi_backend.Entities.Supervisor;
import jakarta.validation.constraints.NotNull;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DoctorRepository extends JpaRepository<Doctor,Integer> {

    @Query("select d.id from Doctor d where d.user.username =:username and d.active=true ")
    int findDoctorByUsername(@Param("username") String username);
    
    @Query("SELECT d from Doctor d where d.active=true")
    Page<Doctor> findAll(Pageable p);

    @Query("SELECT d from Doctor d where d.id=:id and  d.active=true")
    Optional<Doctor> findById(int id);

    @Query("SELECT d from Doctor d where d.subdistrictcode.district.code =:districtcode and d.active=true")
    Page<Doctor> findDoctorByDistrict(@Param("districtcode") int districtcode, Pageable pageable);

    @Query("SELECT d from Doctor d where d.subdistrictcode.code =:subdistrictcode and d.active=true ")
    List<Doctor> findDoctorBySubDistrict(@Param("subdistrictcode") int subdistrictcode);

    @Query("SELECT d from Doctor d where d.subdistrictcode.code =:subdistrictcode and d.active=true and d.patient_count=(select MIN(d2.patient_count) from Doctor d2 WHERE d2.subdistrictcode.code = :subdistrictcode)")
    List<Doctor> findDoctorWithMinimumPatient(@Param("subdistrictcode") int subdistrictcode);



}


