package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.DiseaseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiseaseCategoryRepository extends JpaRepository<DiseaseCategory,String> {
}
