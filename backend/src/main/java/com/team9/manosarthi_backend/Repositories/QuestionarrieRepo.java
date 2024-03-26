package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Questionarrie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import com.team9.manosarthi_backend.Entities.Questionarrie;

public interface QuestionarrieRepo extends JpaRepository<Questionarrie,Integer> {
    @Query("SELECT q from Questionarrie q where q.active=true")
    List<Questionarrie> getques();



}
