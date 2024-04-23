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

    @Query("SELECT d.diseaseSubCategory.diseaseName, COUNT(d) FROM Disease d WHERE d.patient_count > 0 GROUP BY d.diseaseSubCategory.code ORDER BY COUNT(d) DESC")
    List<Object[]> getDiseaseAndCount();


}
