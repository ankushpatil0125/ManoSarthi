package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.MissedFollowUp;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface MissedFollowUpRepository extends JpaRepository<MissedFollowUp, Integer> {
    @Query("SELECT f.patient.village.name, count(f) from MissedFollowUp f where f.worker.id =:workerid GROUP BY f.patient.village.code")
    List<Object[]> findByWorkerAndVill(@Param("workerid")Integer workerid);
    @Query("SELECT f from MissedFollowUp f where f.worker.id =:workerid ")
    List<MissedFollowUp> findByWorker(@Param("workerid")Integer workerid);

}
