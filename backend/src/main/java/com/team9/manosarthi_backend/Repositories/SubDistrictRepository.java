package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.SubDistrict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.team9.manosarthi_backend.Entities.District;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface SubDistrictRepository extends JpaRepository<SubDistrict,Integer> {

    @Query("select s.district from SubDistrict s where s.doctor_count>0")
    Set<District> getAssignedDoctorDistinct();

    @Query("select s.district from SubDistrict s where s.doctor_count=0 or s.doctor_count=1")
    Set<District> getNotAssignedDoctorDistinct();

    @Query("select s.district from SubDistrict s where s.supervisor_count>0")
    Set<District> getAssignedSupervisorDistinct();

    @Query("select s.district from SubDistrict s where s.supervisor_count=0")
    Set<District> getNotAssignedSupervisorDistinct();

//    @Query("select s from SubDistrict s where s.district =:district")
//    List<SubDistrict> findSubDistrictof(@Param("district") Optional<District> district);

    @Query("select s from SubDistrict s where s.doctor_count>0 and s.district.code=:district")
    Set<SubDistrict> getAssignedDoctorSubDistinct(@Param("district") int district);

    @Query("select s from SubDistrict s where s.doctor_count=0 and s.district.code=:district")
    Set<SubDistrict> getNotAssignedDoctorSubDistinct(@Param("district") int district);



    @Query("select s from SubDistrict s where s.supervisor_count>0 and s.district.code=:district")
    Set<SubDistrict> getAssignedSupervisorSubDistinct(@Param("district") int district);

    @Query("select s from SubDistrict s where s.supervisor_count=0 and s.district.code=:district")
    Set<SubDistrict> getNotAssignedSupervisorSubDistinct(@Param("district") int district);

}
