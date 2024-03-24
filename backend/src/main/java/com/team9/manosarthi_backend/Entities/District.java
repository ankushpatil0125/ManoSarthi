package com.team9.manosarthi_backend.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "district code cannot be null")
    @Id
    @Column(name = "districtcode")
    private int code;

    @NotBlank(message = "district name cannot be blank")
    @Column(name = "districtname")
    private String name;
}
