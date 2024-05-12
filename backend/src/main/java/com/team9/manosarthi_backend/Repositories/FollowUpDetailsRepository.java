package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.FollowUpDetails;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface FollowUpDetailsRepository extends JpaRepository<FollowUpDetails,Integer> {

    @Query("select f from FollowUpDetails f where f.patient.patient_id=:patientId and f.followUpNo=:followUpNo")
    Optional<FollowUpDetails> findFollowUpDetailsByFollowUpNo(@Param("patientId") int patientId ,@Param("followUpNo") int followUpNo);

    @Query("select f from FollowUpDetails f where f.patient.patient_id=:patientId and f.doctor.id=:doctorId ORDER BY f.followUpNo DESC ")
    Page<FollowUpDetails> findFollowUpDetailsByDoctorAndPatient(@Param("patientId") int patientId , @Param("doctorId") int doctorId, Pageable p);

    @Query("SELECT f.image from FollowUpDetails f where  f.patient.patient_id=:patientId and f.followUpNo=0")
    String getImageNameForNewRegisterPatient(@Param("patientId") int patientId );
}
