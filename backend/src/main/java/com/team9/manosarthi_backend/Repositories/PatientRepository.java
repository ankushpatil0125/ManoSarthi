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
    List<Object[]> patientCountForDistrict();

    @Query("select p from Patient p where p.doctor.id=:doctorID and p.referred=true")
    Page<Patient> getReferredPatientsDuringFollowup(@Param("doctorID") int doctorID, Pageable pageable);
    
    @Query(value = "SELECT * FROM patient WHERE AES_DECRYPT(FROM_BASE64(aabha_id), ?1, ?2) = ?3", nativeQuery = true)
    Patient findByEncryptedAbhaId(String secretKey, String salt, String encryptedAbhaId);
//    @Query("SELECT p FROM Patient p WHERE decrypt(p.aabhaId, :secretKey, :salt) = :abhaId")
//    Patient findByEncryptedAbhaId(@Param("abhaId") String abhaId, @Param("secretKey") String secretKey, @Param("salt") String salt);

    @Query(value="SELECT count(p) from Patient p")
    Integer getTotalPatientCount();

    @Query("select p from Patient p where p.doctor.id=:doctorID")
    List<Patient> findByDoctorID(@Param("doctorID") int doctorID);

    @Query("select p from Patient p")
    List<Patient> allPatient();

    @Query("select p.aabhaId from Patient p")

    List<String> getAllAabhaId();
    List<String> getAllAabhaId(String aabhaid);

    @Query("SELECT COUNT(p) FROM Patient p WHERE p.age BETWEEN :startAge AND :endAge")
    Integer countPatientsInAgeRange(@Param("startAge") int startAge, @Param("endAge") int endAge);

}
