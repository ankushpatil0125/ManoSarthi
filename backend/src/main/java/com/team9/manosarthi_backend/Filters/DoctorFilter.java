package com.team9.manosarthi_backend.Filters;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.http.converter.json.MappingJacksonValue;

import java.util.Set;

public class DoctorFilter<T> {
    private T doctor;

    public DoctorFilter(T doctor) {
        this.doctor = doctor;
    }

    public MappingJacksonValue getDoctorFilter(Set<String>  doctorFilterProperties, Set<String> subDistrictFilterProperties)
    {
        SimpleBeanPropertyFilter filter= SimpleBeanPropertyFilter.filterOutAllExcept(doctorFilterProperties);
        SimpleBeanPropertyFilter SubDistrictFilter = SimpleBeanPropertyFilter.filterOutAllExcept(subDistrictFilterProperties);
        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("DoctorJSONFilter",filter)
                .addFilter("SubDistrictJSONFilter",SubDistrictFilter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(doctor);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }

    public MappingJacksonValue getDoctorFilter(Set<String>  doctorFilterProperties, Set<String> subDistrictFilterProperties,Set<String> userFilterProperties)
    {
        SimpleBeanPropertyFilter filter= SimpleBeanPropertyFilter.filterOutAllExcept(doctorFilterProperties);
        SimpleBeanPropertyFilter SubDistrictFilter = SimpleBeanPropertyFilter.filterOutAllExcept(subDistrictFilterProperties);
        SimpleBeanPropertyFilter userFilter = SimpleBeanPropertyFilter.filterOutAllExcept(userFilterProperties);

        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("DoctorJSONFilter",filter)
                .addFilter("SubDistrictJSONFilter",SubDistrictFilter)
                .addFilter("UserJSONFilter",userFilter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(doctor);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }



}
