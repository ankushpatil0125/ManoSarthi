package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.District;
import com.team9.manosarthi_backend.Repositories.DistrictRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/district")
public class DistrictRestController {

    private DistrictRepository districtRepository;

    @Autowired
    public DistrictRestController(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    @GetMapping("/")
    public List<District> getDistricts(){
        return districtRepository.findAll();
    }


}
