package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.MedicalQue;
import com.team9.manosarthi_backend.Entities.MedicalQueAns;
import com.team9.manosarthi_backend.Entities.Questionarrie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedicalQueRepo extends JpaRepository<MedicalQue,Integer> {
    @Query("SELECT q from MedicalQue q where q.active=true")
    List<MedicalQue> getques();

}
