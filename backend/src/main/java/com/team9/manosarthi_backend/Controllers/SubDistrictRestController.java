package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.Entities.District;
import com.team9.manosarthi_backend.Entities.SubDistrict;
import com.team9.manosarthi_backend.Repositories.DistrictRepository;
import com.team9.manosarthi_backend.Repositories.SubDistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.List;
import java.util.Set;

@RestController
@PreAuthorize("permitAll()")
@CrossOrigin(origins = "*")
@RequestMapping("/subdistrict")
public class SubDistrictRestController {
    SubDistrictRepository subDistrictRepository;
    DistrictRepository districtRepository;

    @Autowired
    public SubDistrictRestController(SubDistrictRepository subDistrictRepository, DistrictRepository districtRepository) {
        this.subDistrictRepository = subDistrictRepository;
        this.districtRepository = districtRepository;
    }

    @GetMapping("/")        // gives the list of subdistrict in a district
    public MappingJacksonValue getSubDistrict(@RequestParam("districtcode") int districtcode){

        Optional<District> district = districtRepository.findById(districtcode);

        List<SubDistrict>  subDistricts = subDistrictRepository.findSubDistrictof(district);

        Set<String> subDistrictFilterProperties = new HashSet<>();
        subDistrictFilterProperties.add("code");
        subDistrictFilterProperties.add("name");
        subDistrictFilterProperties.add("district");

        SimpleBeanPropertyFilter SubDistrictFilter = SimpleBeanPropertyFilter.filterOutAllExcept(subDistrictFilterProperties);
        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("SubDistrictJSONFilter",SubDistrictFilter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(subDistricts);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }
}