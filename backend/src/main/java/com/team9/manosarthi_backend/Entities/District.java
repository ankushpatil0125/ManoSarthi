package com.team9.manosarthi_backend.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "district")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class District {

    @Id
    @Column(name = "districtcode")
    private int code;

    @Column(name = "districtname")
    private String name;
}
