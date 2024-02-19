package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
    //public User getUsersByUsername(String username);
    public User findByUsername(String username);
}
