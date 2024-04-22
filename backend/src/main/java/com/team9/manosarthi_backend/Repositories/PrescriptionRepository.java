package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.FollowUpSchedule;
import com.team9.manosarthi_backend.Entities.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription,Integer> {

    @Query("select p from Prescription p where p.patient.patient_id=:patientId and p.active=true ")
    Prescription getActivePrescription(@Param("patientId") int patientId);

    @Query("select p from Prescription p where p.patient.village.code=:villagecode and p.active=true ")
    List<Prescription> getActivePrescriptionsOfVillage(@Param("villagecode") int villagecode);

//    @Query("SELECT p FROM Prescription p WHERE p.date BETWEEN :startDate AND :endDate AND p.patient.village.code =:villagecode")
//    List<Prescription> findbyDateAndVill(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("villagecode") int villagecode );


}
