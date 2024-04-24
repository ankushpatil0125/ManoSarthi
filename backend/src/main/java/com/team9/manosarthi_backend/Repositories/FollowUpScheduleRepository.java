package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.FollowUpSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface FollowUpScheduleRepository extends JpaRepository<FollowUpSchedule,Integer> {

    @Query("select f from FollowUpSchedule f where f.nextFollowUpDate=:TodaysDate and f.village.code=:villagecode")
    List<FollowUpSchedule> findbyDateAndVill(@Param("TodaysDate") Date TodaysDate,@Param("villagecode") int villagecode );

//    @Query("select f from FollowUpSchedule f where  f.village.code=:villagecode")
//    List<FollowUpSchedule> findbyDateAndVill(@Param("illagecode") int villagecode );
}
