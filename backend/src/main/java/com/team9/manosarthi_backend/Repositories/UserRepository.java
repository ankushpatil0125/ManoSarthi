package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User,String> {
    //public User getUsersByUsername(String username);
     User findByUsername(String username);

     User findByEmail(String email);

    @Transactional
    @Modifying
    @Query("Update User u set u.password=:password where u.email=:email")
    void UpdatePassword(@Param("password") String password, @Param("email") String email);
}
