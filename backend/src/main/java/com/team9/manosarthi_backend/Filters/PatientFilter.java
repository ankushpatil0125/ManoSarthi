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
}
