package com.team9.manosarthi_backend.Entities;

import jakarta.persistence.*;
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
public class SubDistrict {

    @Id
    @Column(name = "subdistrictcode")
    private int code;

    @Column(name = "subdistrictname")
    private String name;

    @ManyToOne
    @JoinColumn(name = "districtcode")
    private District district;


}
