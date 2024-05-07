package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token,Integer> {

    @Query("Select t from Token t where t.user.username=:username and t.expired=false")
    List<Token> findAllValidTokensByUser(String username);


    Optional<Token> findByToken(String token);
}
