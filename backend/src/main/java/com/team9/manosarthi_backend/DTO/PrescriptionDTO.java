package com.team9.manosarthi_backend.DTO;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.team9.manosarthi_backend.Entities.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
public class PrescriptionDTO {

    private int prescription_id;

    private String patient_fname;

    private String patient_lname;

    private Integer patient_age;

    private String patient_village_name;

    private Set<Disease> disease_code;

    private String treatement;

    private List<Medicine> medicine;

    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date date;

    public void PrescriptionToDTO(Prescription prescription)
    {
        this.prescription_id=prescription.getPrescription_id();
        this.patient_fname=prescription.getPatient().getFirstname();
        this.patient_lname=prescription.getPatient().getLastname();
        this.patient_age=prescription.getPatient().getAge();
        this.patient_village_name=prescription.getPatient().getVillage().getName();
        this.disease_code=prescription.getDisease_code();
        this.treatement=prescription.getTreatement();
        this.medicine=prescription.getMedicine();
        this.date=prescription.getDate();

    }
}
