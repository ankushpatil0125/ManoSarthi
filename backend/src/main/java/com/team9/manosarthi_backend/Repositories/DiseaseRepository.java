package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Disease;
import com.team9.manosarthi_backend.Entities.DiseaseSubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiseaseRepository extends JpaRepository<Disease,String> {

    @Query("select d from  Disease d where d.diseaseSubCategory.code=:code")
    List<Disease> getDiseaseBySubCategory(@Param("code") String code);
}
