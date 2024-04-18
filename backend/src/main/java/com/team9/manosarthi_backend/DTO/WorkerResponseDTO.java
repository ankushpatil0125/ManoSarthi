package com.team9.manosarthi_backend.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Entities.Village;
import com.team9.manosarthi_backend.Entities.Worker;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class WorkerResponseDTO {


    private int id;

    private String firstname;

    private String lastname;

    private String email;

    private String username;

    private int villagecode;

    private String villagename;

    private String gender;

    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date dob;

    public void SupResponse(Worker worker)
    {
        this.firstname=worker.getFirstname();
        this.lastname=worker.getLastname();
        this.email=worker.getEmail();
        this.villagecode=worker.getVillagecode().getCode();
        this.villagename=worker.getVillagecode().getName();
        this.id=worker.getId();
    }
    public void WorkerResponse(Worker worker)
    {
        this.firstname=worker.getFirstname();
        this.lastname=worker.getLastname();
        this.email= worker.getEmail();
        this.villagecode=worker.getVillagecode().getCode();
        this.villagename=worker.getVillagecode().getName();
        this.gender= worker.getGender();
        this.username=worker.getUser().getUsername();
        this.dob=worker.getDob();
    }
}
