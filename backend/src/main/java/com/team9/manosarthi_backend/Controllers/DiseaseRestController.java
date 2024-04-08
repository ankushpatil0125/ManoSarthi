package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.Disease;
import com.team9.manosarthi_backend.Repositories.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disease")
@CrossOrigin(origins = "*")
public class DiseaseRestController {

    private DiseaseRepository diseaseRepository;

    @Autowired
    public DiseaseRestController(DiseaseRepository diseaseRepository) {
        this.diseaseRepository = diseaseRepository;
    }

    @GetMapping("/")
    public List<Disease> getDisease(@RequestParam("subcategory") String subcategory){

        return diseaseRepository.getDiseaseBySubCategory(subcategory);
    }

}
