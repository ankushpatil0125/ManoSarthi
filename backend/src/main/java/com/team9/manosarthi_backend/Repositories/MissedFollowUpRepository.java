package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.MissedFollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MissedFollowUpRepository extends JpaRepository<MissedFollowUp, Integer> {
    @Query("SELECT f.patient.village.name, count(f) from MissedFollowUp f where f.worker.id =:workerid GROUP BY f.patient.village.code")
    List<Object[]> findByWorker(@Param("workerid")Integer workerid);

}
