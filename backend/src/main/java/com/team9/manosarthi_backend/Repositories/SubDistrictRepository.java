package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.SubDistrict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.team9.manosarthi_backend.Entities.District;

import java.util.List;
import java.util.Optional;

public interface SubDistrictRepository extends JpaRepository<SubDistrict,Integer> {
    @Query("select s from SubDistrict s where s.district =:district")
    List<SubDistrict> findSubDistrictof(@Param("district") Optional<District> district);

}
