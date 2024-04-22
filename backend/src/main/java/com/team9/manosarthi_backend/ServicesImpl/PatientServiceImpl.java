package com.team9.manosarthi_backend.ServicesImpl;

import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Repositories.PatientRepository;
import com.team9.manosarthi_backend.Services.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.team9.manosarthi_backend.Config.AesEncryptor.encrypt;

@Service
@AllArgsConstructor
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;
    @Override
    public Patient findPatientByEncryptedAbhaId(String abhaId) {
        String secretKey = "${aes.encryption.key}";
        String salt = "salt";

        // Encrypt the abhaId
        String encryptedAbhaId = encrypt(abhaId, secretKey, salt);

        System.out.println("abha"+abhaId);
//        System.out.println("encrypted abha "+encryptedAbhaId);
        // Search for the patient with the encrypted Abha ID
        return patientRepository.findByEncryptedAbhaId(abhaId ,secretKey, salt);
    }

}
