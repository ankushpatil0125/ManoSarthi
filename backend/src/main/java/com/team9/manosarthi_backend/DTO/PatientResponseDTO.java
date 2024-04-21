package com.team9.manosarthi_backend.DTO;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.team9.manosarthi_backend.Config.AesEncryptor;
import com.team9.manosarthi_backend.Entities.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
public class PatientResponseDTO {
    private int patient_id;

    private String firstname;

    private String lastname;

    private String gender;

    private int age;

    private String villageName;

    private List<MedicalQueAns> medicalQueAnsList;

    private PrescriptionDTO prescriptionDTO;

    public void doctor_PatientToPatientResponseDTO(Patient patient)
    {
        this.patient_id=patient.getPatient_id();
        this.firstname=patient.getFirstname();
        this.lastname=patient.getLastname();
        this.gender=patient.getGender();
        this.age=patient.getAge();
        this.villageName=patient.getVillage().getName();
        this.medicalQueAnsList=patient.getMedicalQueAnsList();
        this.prescriptionDTO=new PrescriptionDTO()  ;
        if(Objects.equals(patient.getStatus(), "ONGOING")){
            for(Prescription pre: patient.getPrescription()){
                System.out.println("pre id "+pre.getPrescription_id()+" is active "+ pre.isActive());
                if(pre.isActive()) {
                    prescriptionDTO.prescriptionToDTO(pre);
                    break;
                }
            }
        }
    }
}
