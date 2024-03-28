package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Table(name = "medicalques_ans")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
//@JsonFilter("MedicalQueAnsJSONFilter")
public class MedicalQueAns {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int answer_id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private MedicalQue medicalquest;

    @NotBlank(message = "ans cannot be blank")
    @Pattern(regexp="[a-zA-Z0-9]+", message="Only characters are allowed")
    private String question_ans;

    @ManyToOne
    @JoinColumn(name="patient_id")
    @JsonBackReference
    private Patient patient;

}
