package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Token;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token,Integer> {

    @Query("Select t from Token t where t.user.username=:username and t.expired=false")
    List<Token> findAllValidTokensByUser(String username);

    @Transactional
    @Modifying
    @Query("DELETE FROM Token t WHERE t.user.username = :username")
    void deleteTokensByUsername(@Param("username") String username);
    Optional<Token> findByToken(String token);
}
