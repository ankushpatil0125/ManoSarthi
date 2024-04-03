package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Supervisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupervisorRepository extends JpaRepository<Supervisor, Integer>{
        @Query("select s.id from Supervisor s where s.user.username =:username and s.active=true")
        int findSupervisorByUsername(@Param("username") String username);


    @Query("SELECT s from Supervisor s where s.subdistrictcode.district.code =:districtcode and s.active=true")
    Page<Supervisor> findSupervisorByDistrict(@Param("districtcode") int districtcode, Pageable pageable);
    @Query("SELECT s from Supervisor s WHERE s.subdistrictcode.code=:subdistrictcode and s.active=true")
    List<Supervisor> findSupervisorBySubDistrict(@Param("subdistrictcode") int subdistrictcode);

}