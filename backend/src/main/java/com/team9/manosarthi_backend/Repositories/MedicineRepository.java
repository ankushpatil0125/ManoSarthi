package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine,Integer> {
}
