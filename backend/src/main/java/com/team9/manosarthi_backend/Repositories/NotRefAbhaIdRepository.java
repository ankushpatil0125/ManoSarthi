package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.NotRefAbhaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotRefAbhaIdRepository extends JpaRepository<NotRefAbhaId,String> {

    @Query("SELECT a.aabha_id from NotRefAbhaId a where a.villagecode.code=:villagecode")
    List<String> findAllByVillage(@Param("villagecode") int villagecode);

    @Query("SELECT count(a) from NotRefAbhaId a")
    Integer getTotalNonRefCount();
}
