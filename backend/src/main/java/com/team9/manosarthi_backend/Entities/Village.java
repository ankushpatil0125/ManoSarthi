package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "village")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonFilter("VillageJSONFilter")
public class Village {

    @Id
    @Column(name = "villagecode")
    private int code;

    @Column(name = "villagename")
    private String name;

    @ManyToOne()
    @JoinColumn(name = "subdistrictcode")
    private SubDistrict subDistrict;

    @Column(name = "worker_count")
    private int worker_count=0;
}
