package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Repositories.VillageRepository;
import com.team9.manosarthi_backend.Entities.Village;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin
public class VillageRestController {

    VillageRepository villageRepository;

    @Autowired
    public VillageRestController(VillageRepository villageRepository) {
        this.villageRepository = villageRepository;
    }

    @GetMapping("/get-village/")
    public Optional<Village> getVillage(@RequestParam("code") int code){

        return villageRepository.findById(code);
    }

}
