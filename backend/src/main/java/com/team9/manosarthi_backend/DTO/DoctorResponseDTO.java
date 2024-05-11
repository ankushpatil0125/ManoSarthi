package com.team9.manosarthi_backend.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team9.manosarthi_backend.Entities.District;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.SubDistrict;
import com.team9.manosarthi_backend.Entities.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

@Getter
@Setter
public class DoctorResponseDTO {

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

    public void forAdminDoctorToDoctorResponseDTO(Doctor doctor) {
        this.id = doctor.getId();
        this.firstname = doctor.getFirstname();
        this.lastname = doctor.getLastname();
        this.email = doctor.getEmail();
        this.username=null;
        if(doctor.getSubdistrictcode()!=null)//if doctor is deleted
        {
            this.subDistrictCode=doctor.getSubdistrictcode().getCode();
            this.subDistrictName=doctor.getSubdistrictcode().getName();
            this.districtCode=doctor.getSubdistrictcode().getDistrict().getCode();
            this.districtName=doctor.getSubdistrictcode().getDistrict().getName();
        }
        this.gender=doctor.getGender();
        this.dob=null;
    }

    public void forDoctor_DoctorToDoctorResponseDTO(Doctor doctor) {
        this.id = doctor.getId();
        this.firstname = doctor.getFirstname();
        this.lastname = doctor.getLastname();
        this.email = doctor.getEmail();
        this.username=doctor.getUser().getUsername();
        this.subDistrictCode=doctor.getSubdistrictcode().getCode();
        this.subDistrictName=doctor.getSubdistrictcode().getName();
        this.districtCode=doctor.getSubdistrictcode().getDistrict().getCode();
        this.districtName=doctor.getSubdistrictcode().getDistrict().getName();
        this.gender=doctor.getGender();
        this.dob=doctor.getDob();
    }

}
