package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Table(name = "medicalques")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
//@JsonFilter("MedicalQueJSONFilter")
public class MedicalQue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int question_id;

    @NotBlank(message = "question cannot be blank")
    @Pattern(regexp="[a-zA-Z0-9,?\\s]+", message="Only characters are allowed")
    private String question;

    private boolean active=true;
}
