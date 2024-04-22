package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Patient;
import org.springframework.stereotype.Service;

import java.util.List;


public interface PatientService {
    Patient findPatientByEncryptedAbhaId(String abhaId);
}
