package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient,Integer> {

    @Query("SELECT p from Patient p where p.village.subDistrict.code=:subdistrictcode and p.status=:type")
    Page<Patient> getPatientListBySubdistrict(@Param("type") String type,@Param("subdistrictcode") int subdistrictcode, Pageable pageable);


    @Query("SELECT p from Patient p where p.aabhaId=:aabhaid")
    Patient findByAabha(@Param("aabhaid") String aabhaid);

    @Query("SELECT p.aabhaId from Patient p where p.village.code=:villagecode")
    List<String> findAllByVillage(@Param("villagecode") Integer villagecode);

    @Query("SELECT p.village.subDistrict.district.name, COUNT(p) FROM Patient p GROUP BY p.village.subDistrict.district.code")
    List<Object[]> patientCountForDistrict(@Param("villagecode") Integer villagecode);
}
