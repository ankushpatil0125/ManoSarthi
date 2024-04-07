package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "disease")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("DiseaseDetails")
public class Disease {
    @Id
    @Column(name = "Disease_code")
    private String Disease_code;

    @Column(name = "Disease_name")
    private String Disease_name;


}
