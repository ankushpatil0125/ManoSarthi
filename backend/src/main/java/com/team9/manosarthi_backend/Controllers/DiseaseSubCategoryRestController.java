package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.DiseaseSubCategory;
import com.team9.manosarthi_backend.Repositories.DiseaseSubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disease-subcategory")
@CrossOrigin(origins = "*")
public class DiseaseSubCategoryRestController {

    private DiseaseSubCategoryRepository diseaseSubCategoryRepository;

    @Autowired
    public DiseaseSubCategoryRestController(DiseaseSubCategoryRepository diseaseSubCategoryRepository) {
        this.diseaseSubCategoryRepository = diseaseSubCategoryRepository;
    }

    @GetMapping("/")
    public List<DiseaseSubCategory> getDiseaseSubCategory(@RequestParam("category") String category)
    {
        return diseaseSubCategoryRepository.getDiseaseSubCategoryByCategoryCode(category);
    }
}
