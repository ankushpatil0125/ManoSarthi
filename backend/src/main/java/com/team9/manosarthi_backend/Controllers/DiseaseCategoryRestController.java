package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.DiseaseCategory;
import com.team9.manosarthi_backend.Repositories.DiseaseCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/disease-category")
@CrossOrigin(origins = "*")
public class DiseaseCategoryRestController {

    private DiseaseCategoryRepository diseaseCategoryRepository;

    @Autowired
    public DiseaseCategoryRestController(DiseaseCategoryRepository diseaseCategoryRepository) {
        this.diseaseCategoryRepository = diseaseCategoryRepository;
    }

    @GetMapping("/")
    public List<DiseaseCategory> getDiseaseCategory(){
        return diseaseCategoryRepository.findAll();
    }

}
