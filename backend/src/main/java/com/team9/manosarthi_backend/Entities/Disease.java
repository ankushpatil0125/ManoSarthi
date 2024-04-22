package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "disease")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Disease {
    @Id
    @Column(name = "Disease_code")
    private String code;

    @ManyToOne
    @JoinColumn(name = "sub_category_code")
    private DiseaseSubCategory diseaseSubCategory;

    @NotBlank(message = "Short description can not be blank")
    @Column(name = "short_description")
    private String shortDescription;

    @NotBlank(message = "Long description can not be blank")
    @Column(name = "long_description")
    private String longDescription;

    @Column(name = "patient_count")
    private int patient_count=0;

}
