package com.team9.manosarthi_backend.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "disease_subcategory")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class DiseaseSubCategory {

    @Id
    @Column(name = "code")
    private String code;

    @ManyToOne
    @JoinColumn(name = "category_code")
    private DiseaseCategory diseaseCategory;

    @Column(name = "disease_name")
    @NotBlank(message = "Disease name can not be blank")
    private String diseaseName;
}
