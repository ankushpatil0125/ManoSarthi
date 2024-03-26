package com.team9.manosarthi_backend.Filters;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.http.converter.json.MappingJacksonValue;

import java.util.Set;

public class PatientFilter<T> {

    private T patient;

    public PatientFilter(T patient) {
        this.patient = patient;
    }

    public MappingJacksonValue getPatientFilter(Set<String> patientFilterProperties)
    {
        SimpleBeanPropertyFilter filter= SimpleBeanPropertyFilter.filterOutAllExcept(patientFilterProperties);


        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("PatientJSONFilter",filter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(patient);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }

    public MappingJacksonValue getPatientFilter(Set<String> patientFilterProperties, Set<String> villageFilterProperties)
    {
        SimpleBeanPropertyFilter patientFilter= SimpleBeanPropertyFilter.filterOutAllExcept(patientFilterProperties);
        SimpleBeanPropertyFilter villageFilter= SimpleBeanPropertyFilter.filterOutAllExcept(villageFilterProperties);


        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("PatientJSONFilter",patientFilter)
                .addFilter("VillageJSONFilter",villageFilter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(patient);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }
}
