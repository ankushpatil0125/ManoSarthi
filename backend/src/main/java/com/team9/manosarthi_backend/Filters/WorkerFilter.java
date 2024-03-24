package com.team9.manosarthi_backend.Filters;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.http.converter.json.MappingJacksonValue;

import java.util.Set;

public class WorkerFilter<T> {
    T worker;

    public WorkerFilter(T worker) {
        this.worker = worker;
    }

    public MappingJacksonValue getWorkerFilter(Set<String> workerFilterProperties, Set<String> subDistrictFilterProperties)
    {
        SimpleBeanPropertyFilter filter= SimpleBeanPropertyFilter.filterOutAllExcept(workerFilterProperties);
        SimpleBeanPropertyFilter SubDistrictFilter = SimpleBeanPropertyFilter.filterOutAllExcept(subDistrictFilterProperties);
        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("WorkerJSONFilter",filter)
                .addFilter("SubDistrictJSONFilter",SubDistrictFilter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(worker);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }

    public MappingJacksonValue getWorkerFilter(Set<String>  workerFilterProperties, Set<String> subDistrictFilterProperties,Set<String> userFilterProperties)
    {
        SimpleBeanPropertyFilter filter= SimpleBeanPropertyFilter.filterOutAllExcept(workerFilterProperties);
        SimpleBeanPropertyFilter SubDistrictFilter = SimpleBeanPropertyFilter.filterOutAllExcept(subDistrictFilterProperties);
        SimpleBeanPropertyFilter userFilter = SimpleBeanPropertyFilter.filterOutAllExcept(userFilterProperties);

        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("WorkerJSONFilter",filter)
                .addFilter("SubDistrictJSONFilter",SubDistrictFilter)
                .addFilter("UserJSONFilter",userFilter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(worker);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }
}
