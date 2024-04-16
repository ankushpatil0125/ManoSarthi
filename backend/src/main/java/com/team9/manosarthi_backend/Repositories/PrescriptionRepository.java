package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PrescriptionRepository extends JpaRepository<Prescription,Integer> {

    @Query("select p from Prescription p where p.patient.patient_id=:patientId and p.active=true ")
    Prescription getActivePrescription(@Param("patientId") int patientId);
}
