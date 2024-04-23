package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

public class Village {

    @NotNull(message = "village code cannot be null")
    @Id
    @Column(name = "villagecode")
    private int code;

    @NotBlank(message = "village name cannot be blank")
    @Column(name = "villagename")
    private String name;

    @ManyToOne()
    @JoinColumn(name = "subdistrictcode")
    private SubDistrict subDistrict;

    @Column(name = "worker_count")
    private int worker_count=0;
}
