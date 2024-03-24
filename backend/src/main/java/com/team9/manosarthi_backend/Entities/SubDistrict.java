package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "subdistrict")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonFilter("SubDistrictJSONFilter")
public class SubDistrict {

    @NotBlank(message = "subdistrict code cannot be blank")
    @Id
    @Column(name = "subdistrictcode")
    private int code;

    @NotBlank(message = "subdistrict name cannot be blank")
    @Column(name = "subdistrictname")
    private String name;

    @ManyToOne
    @JoinColumn(name = "districtcode")
    private District district;

    @Column(name = "doctor_count")
    private int doctor_count=0;

    @Column(name = "supervisor_count")
    private int supervisor_count=0;
}
