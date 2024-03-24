package com.team9.manosarthi_backend.Filters;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.http.converter.json.MappingJacksonValue;

import java.util.Set;

public class SupervisorFilter<T> {
        T supervisor;

    public SupervisorFilter(T supervisor) {
        this.supervisor = supervisor;
    }

    public MappingJacksonValue getSupervisorrFilter(Set<String> supervisorFilterProperties, Set<String> subDistrictFilterProperties)
    {
        SimpleBeanPropertyFilter filter= SimpleBeanPropertyFilter.filterOutAllExcept(supervisorFilterProperties);
        SimpleBeanPropertyFilter SubDistrictFilter = SimpleBeanPropertyFilter.filterOutAllExcept(subDistrictFilterProperties);
        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("SupervisorJSONFilter",filter)
                .addFilter("SubDistrictJSONFilter",SubDistrictFilter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(supervisor);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }

    public MappingJacksonValue getSupervisorFilter(Set<String>  supervisorFilterProperties, Set<String> subDistrictFilterProperties,Set<String> userFilterProperties)
    {
        SimpleBeanPropertyFilter filter= SimpleBeanPropertyFilter.filterOutAllExcept(supervisorFilterProperties);
        SimpleBeanPropertyFilter SubDistrictFilter = SimpleBeanPropertyFilter.filterOutAllExcept(subDistrictFilterProperties);
        SimpleBeanPropertyFilter userFilter = SimpleBeanPropertyFilter.filterOutAllExcept(userFilterProperties);

        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("SupervisorJSONFilter",filter)
                .addFilter("SubDistrictJSONFilter",SubDistrictFilter)
                .addFilter("UserJSONFilter",userFilter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(supervisor);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }
}
