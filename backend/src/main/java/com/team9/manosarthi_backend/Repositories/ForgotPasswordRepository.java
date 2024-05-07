package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.ForgotPassword;
import com.team9.manosarthi_backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword,Integer> {



    @Query("select fp from ForgotPassword fp where fp.user.email = :email and fp.otp = :otp")
    Optional<ForgotPassword> findByUserAndOtp(@Param("otp") String otp, @Param("email") String email);

}
