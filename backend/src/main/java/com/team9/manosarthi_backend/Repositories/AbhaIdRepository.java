package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.AbhaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AbhaIdRepository extends JpaRepository<AbhaId,Integer> {

    @Query("SELECT a.aabha_id from AbhaId a where a.villagecode.code=:villagecode")
    List<String> findAllByVillage(@Param("villagecode") int villagecode);
}
