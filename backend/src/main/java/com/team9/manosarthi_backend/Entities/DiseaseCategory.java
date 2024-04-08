package com.team9.manosarthi_backend.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "disease_category")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class DiseaseCategory {

    @Id
    @Column(name = "code")
    private String code;

    @NotBlank(message = "Disease Category name can not be blank")
    @Column(name = "name")
    private String name;
}
