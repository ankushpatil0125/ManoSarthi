package com.team9.manosarthi_backend.Filters;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.http.converter.json.MappingJacksonValue;

import java.util.Set;

public class UserFilter<T> {

    private T user;

    public UserFilter(T user) {
        this.user = user;
    }

    public MappingJacksonValue getUserFilter(Set<String> userFilterProperties)
    {
        SimpleBeanPropertyFilter filter= SimpleBeanPropertyFilter.filterOutAllExcept(userFilterProperties);

        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("UserJSONFilter",filter);
        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(user);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }
}
