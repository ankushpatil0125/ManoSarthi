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

    public MappingJacksonValue getPatientFilter(Set<String> patientFilterProperties, Set<String> followUpDetailsFilterProperties,Set<String> workerFilterProperties,Set<String> doctorFilterProperties)
    {
        SimpleBeanPropertyFilter patientFilter= SimpleBeanPropertyFilter.filterOutAllExcept(patientFilterProperties);
        SimpleBeanPropertyFilter followUpFilter= SimpleBeanPropertyFilter.filterOutAllExcept(followUpDetailsFilterProperties);
        SimpleBeanPropertyFilter workerFilter= SimpleBeanPropertyFilter.filterOutAllExcept(workerFilterProperties);
        SimpleBeanPropertyFilter doctorFilter= SimpleBeanPropertyFilter.filterOutAllExcept(doctorFilterProperties);

        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("PatientJSONFilter",patientFilter)
                .addFilter("FollowUpDetailsJSONFilter",followUpFilter)
                .addFilter("WorkerJSONFilter",workerFilter)
                .addFilter("DoctorJSONFilter",doctorFilter);

        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(patient);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }

    public MappingJacksonValue getPatientFilter(Set<String> patientFilterProperties,Set<String> villageFilterProperties,Set<String> workerFilterProperties,Set<String> doctorFilterProperties,Set<String> followUpDetailsFilterProperties,Set<String> questionarrieAnsFilterProperties,Set<String> questionarrieFilterProperties,Set<String> medicalQueAnsFilterProperties,Set<String> medicalQueFilterProperties)
    {
        SimpleBeanPropertyFilter patientFilter= SimpleBeanPropertyFilter.filterOutAllExcept(patientFilterProperties);
        SimpleBeanPropertyFilter followUpFilter= SimpleBeanPropertyFilter.filterOutAllExcept(followUpDetailsFilterProperties);
        SimpleBeanPropertyFilter workerFilter= SimpleBeanPropertyFilter.filterOutAllExcept(workerFilterProperties);
        SimpleBeanPropertyFilter doctorFilter= SimpleBeanPropertyFilter.filterOutAllExcept(doctorFilterProperties);
        SimpleBeanPropertyFilter questionarrieAnsFilter= SimpleBeanPropertyFilter.filterOutAllExcept(questionarrieAnsFilterProperties);
        SimpleBeanPropertyFilter questionarrieFilter= SimpleBeanPropertyFilter.filterOutAllExcept(questionarrieFilterProperties);
        SimpleBeanPropertyFilter medicalQueAnsFilter= SimpleBeanPropertyFilter.filterOutAllExcept(medicalQueAnsFilterProperties);
        SimpleBeanPropertyFilter medicalQueFilter= SimpleBeanPropertyFilter.filterOutAllExcept(medicalQueFilterProperties);
        SimpleBeanPropertyFilter villageFilter= SimpleBeanPropertyFilter.filterOutAllExcept(villageFilterProperties);

        FilterProvider filterProvider=new SimpleFilterProvider().addFilter("PatientJSONFilter",patientFilter)
                .addFilter("FollowUpDetailsJSONFilter",followUpFilter)
                .addFilter("WorkerJSONFilter",workerFilter)
                .addFilter("DoctorJSONFilter",doctorFilter)
                .addFilter("QuestionAnsJSONFilter",questionarrieAnsFilter)
                .addFilter("QuestionJSONFilter",questionarrieFilter)
                .addFilter("MedicalQueAnsJSONFilter",medicalQueAnsFilter)
                .addFilter("MedicalQueJSONFilter",medicalQueFilter)
                .addFilter("VillageJSONFilter",villageFilter)
                ;


        MappingJacksonValue mappingJacksonValue= new MappingJacksonValue(patient);
        mappingJacksonValue.setFilters(filterProvider);
        return mappingJacksonValue;
    }

}
