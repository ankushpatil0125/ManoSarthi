package com.team9.manosarthi_backend.Repositories;

import com.team9.manosarthi_backend.Entities.Worker;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkerRepository extends JpaRepository<Worker,Integer>{
    @Query("select w.id from Worker w where w.user.username =:username")
    int findWorkerByUsername(@Param("username") String username);

    @Query("SELECT w from Worker w where w.villagecode.subDistrict.code =:subdistrictcode")
    List<Worker> findWorkerBySubistrict(@Param("subdistrictcode") int subdistrictcode);


}
