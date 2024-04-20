package com.team9.manosarthi_backend.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Supervisor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class SupervisorResponseDTO {

    private int id;
    private String firstname;
    private String lastname;
    private String email;
    private String username;
    private int subDistrictCode;
    private String subDistrictName;
    private int districtCode;
    private String districtName;
    private String gender;
    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date dob;

    public void forAdminSupervisorToSupervisorResponseDTO(Supervisor supervisor) {
        this.id = supervisor.getId();
        this.firstname = supervisor.getFirstname();
        this.lastname = supervisor.getLastname();
        this.email = supervisor.getEmail();
        this.username=null;
        if(supervisor.getSubdistrictcode()!=null)//if supervisor is deleted
        {
            this.subDistrictCode=supervisor.getSubdistrictcode().getCode();
            this.subDistrictName=supervisor.getSubdistrictcode().getName();
            this.districtCode=supervisor.getSubdistrictcode().getDistrict().getCode();
            this.districtName=supervisor.getSubdistrictcode().getDistrict().getName();
        }
        this.gender=supervisor.getGender();
        this.dob=supervisor.getDob();
    }

    public void forSupervisor_SupervisorToSupervisorResponseDTO(Supervisor supervisor) {
        this.id = supervisor.getId();
        this.firstname = supervisor.getFirstname();
        this.lastname = supervisor.getLastname();
        this.email = supervisor.getEmail();
        this.username=supervisor.getUser().getUsername();
        this.subDistrictCode=supervisor.getSubdistrictcode().getCode();
        this.subDistrictName=supervisor.getSubdistrictcode().getName();
        this.districtCode=supervisor.getSubdistrictcode().getDistrict().getCode();
        this.districtName=supervisor.getSubdistrictcode().getDistrict().getName();
        this.gender=supervisor.getGender();
        this.dob=supervisor.getDob();
    }
}
