package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

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

    @Column(name = "long_description")
    private String longDescription;
}
