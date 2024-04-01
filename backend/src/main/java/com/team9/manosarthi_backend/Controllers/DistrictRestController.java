package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.District;
import com.team9.manosarthi_backend.Repositories.DistrictRepository;

import com.team9.manosarthi_backend.Repositories.SubDistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Set;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/district")
public class DistrictRestController {

    private DistrictRepository districtRepository;

    private SubDistrictRepository subDistrictRepository;

    @Autowired
    public DistrictRestController(DistrictRepository districtRepository, SubDistrictRepository subDistrictRepository) {
        this.districtRepository = districtRepository;
        this.subDistrictRepository = subDistrictRepository;
    }


    @GetMapping("/")
    public Set<District> getDistricts(@RequestParam("role") String role, @RequestParam("assigned") boolean assigned){
//        return districtRepository.findAll();
        if(Objects.equals(role, "DOCTOR") && assigned)
        {
            return subDistrictRepository.getAssignedDoctorDistinct();
        }
        else if ( Objects.equals(role, "DOCTOR") && !assigned )
        {
            return subDistrictRepository.getNotAssignedDoctorDistinct();
        }

        else if(Objects.equals(role, "SUPERVISOR") && assigned)
        {
            return subDistrictRepository.getAssignedSupervisorDistinct();
        }
        else
        {
            return subDistrictRepository.getNotAssignedSupervisorDistinct();
        }
    }


}
