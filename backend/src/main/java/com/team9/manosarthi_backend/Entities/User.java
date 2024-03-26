package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
@JsonFilter("UserJSONFilter")
public class User {
    @Id
    @NotBlank (message = "Username cannot be blank")
    private String username;

    @NotBlank (message = "Password cannot be blank")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$", message = "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit")
    private String password;

    @NotBlank (message = "Role cannot be blank")
    private String role;

    private boolean changepass=false;
}
