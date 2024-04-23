package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token,Integer> {

    @Query("Select t from Token t where t.user.user_id=:userid and t.expired=false")
    List<Token> findAllValidTokensByUser(Integer userid);
}
