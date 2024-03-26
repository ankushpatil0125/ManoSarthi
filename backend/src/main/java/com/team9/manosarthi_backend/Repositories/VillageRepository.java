package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Village;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface VillageRepository extends JpaRepository<Village,Integer> {
    //get villages from subdistrict where worker is not assigned
    @Query("SELECT v from Village v where v.subDistrict.code =:subdistrictcode and v.worker_count=0")
    List<Village> findnoworkerVillBySubdistrict(@Param("subdistrictcode") int subdistrictcode);

    @Query("SELECT v from Village v where v.subDistrict.code =:subdistrictcode and v.worker_count=1")
    List<Village> findassworkerVillBySubdistrict(@Param("subdistrictcode") int subdistrictcode);

    @Query("SELECT v from Village v where v.subDistrict.code =:subdistrictcode")
    List<Village> findVillBySubdistrict(@Param("subdistrictcode") int subdistrictcode);
}
