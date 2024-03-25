package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient,Integer> {
}
