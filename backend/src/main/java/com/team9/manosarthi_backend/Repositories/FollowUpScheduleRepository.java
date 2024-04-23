package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.FollowUpSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface FollowUpScheduleRepository extends JpaRepository<FollowUpSchedule,Integer> {

//    @Query("select f from FollowUpSchedule f where f.nextFollowUpDate=:TodaysDate and f.village.code=:villagecode")
    @Query("SELECT f FROM FollowUpSchedule f WHERE f.nextFollowUpDate BETWEEN :startDate AND :endDate AND f.village.code = :villagecode")
    List<FollowUpSchedule> findbyDateAndVill(@Param("startDate") Date startDate, @Param("endDate") Date endDate,@Param("villagecode") int villagecode );

//    @Query("select f from FollowUpSchedule f where  f.village.code=:villagecode")
//    List<FollowUpSchedule> findbyDateAndVill(@Param("illagecode") int villagecode );

    @Query("SELECT f from FollowUpSchedule f WHERE f.patient.patient_id=:patientID")
    Optional<FollowUpSchedule> findByPatientID(@Param("patientID") int patientID);
}
