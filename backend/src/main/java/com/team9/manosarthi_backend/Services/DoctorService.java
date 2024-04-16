package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.DTO.PatientFollowUpPrescriptionDTO;
import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Entities.Prescription;

import java.util.List;

public interface DoctorService {

    List<Patient> getNewPatientDetails(int doctorId,int pagenumber,int pagesize);

    Patient getPatient(int doctorId,int patientId);

    Prescription givePrescription(PatientFollowUpPrescriptionDTO patientFollowUpPrescriptionDTO);
}
