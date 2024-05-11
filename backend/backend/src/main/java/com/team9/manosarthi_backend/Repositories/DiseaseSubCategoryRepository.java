package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.DiseaseSubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiseaseSubCategoryRepository extends JpaRepository<DiseaseSubCategory,String > {

    @Query("select d from  DiseaseSubCategory d where d.diseaseCategory.code=:code")
    List<DiseaseSubCategory> getDiseaseSubCategoryByCategoryCode(@Param("code") String code);
}
