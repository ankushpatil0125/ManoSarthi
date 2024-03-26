package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
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
@JsonFilter("MedicalQueAnsJSONFilter")
public class MedicalQueAns {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int answer_id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "question_id")
    private MedicalQue medicalquest;

    @NotBlank(message = "ans cannot be blank")
    @Pattern(regexp="[a-zA-Z0-9]+", message="Only characters are allowed")
    private String question_ans;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="patient_id")
    private Patient patient;

}
