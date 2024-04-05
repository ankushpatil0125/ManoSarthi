package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.District;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
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
        Set<District> districts=null;
        try {
        if(Objects.equals(role, "DOCTOR") && assigned)
            {
                districts =  subDistrictRepository.getAssignedDoctorDistinct();
            }
            else if ( Objects.equals(role, "DOCTOR") && !assigned )
            {
                districts = subDistrictRepository.getNotAssignedDoctorDistinct();
            }

            else if(Objects.equals(role, "SUPERVISOR") && assigned)
            {
                districts = subDistrictRepository.getAssignedSupervisorDistinct();
            }
            else if(Objects.equals(role, "SUPERVISOR") &&  !assigned)
            {
                districts = subDistrictRepository.getNotAssignedSupervisorDistinct();
            }
            else {
            throw new APIRequestException("Error while getting districts");
        }

        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting districts",ex.getMessage());
        }

        return districts;
    }


}
