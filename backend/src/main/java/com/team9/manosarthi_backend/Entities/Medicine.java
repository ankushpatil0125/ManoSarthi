package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "medicine")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("MedicineDetails")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "medicine name cannot be blank")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "dosage cannot be blank")
    @Column(name = "dosage")
    private String dosage;

    @NotBlank(message = "timing cannot be blank")
    @Column(name = "timing")
    private String timing;


}
