package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Village;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface VillageRepository extends JpaRepository<Village,Integer> {
    @Query("SELECT v from Village v where v.subDistrict.code =:subdistrictcode")
    List<Village> findVillageBySubdistrict(@Param("subdistrictcode") int subdistrictcode);
}
