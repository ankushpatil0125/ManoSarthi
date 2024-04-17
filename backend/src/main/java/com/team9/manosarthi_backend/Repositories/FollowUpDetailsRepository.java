package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.FollowUpDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FollowUpDetailsRepository extends JpaRepository<FollowUpDetails,Integer> {

    @Query("select f from FollowUpDetails f where f.patient.patient_id=:patientId and f.followUpNo=:followUpNo")
    Optional<FollowUpDetails> findFollowUpDetailsByFollowUpNo(@Param("patientId") int patientId ,@Param("followUpNo") int followUpNo);
}
