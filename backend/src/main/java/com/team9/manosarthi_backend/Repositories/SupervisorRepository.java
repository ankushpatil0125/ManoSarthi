package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SupervisorRepository extends JpaRepository<Supervisor, Integer>{
        @Query("select s.id from Supervisor s where s.user.username =:username")
        int findSupervisorByUsername(@Param("username") String username);
    }