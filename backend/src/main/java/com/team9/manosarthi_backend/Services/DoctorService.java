package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.DTO.FollowUpDetailsDTO;
import com.team9.manosarthi_backend.DTO.PatientFollowUpPrescriptionDTO;
import com.team9.manosarthi_backend.DTO.PatientResponseDTO;
import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.FollowUpDetails;
import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Entities.Prescription;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DoctorService {

    Doctor viewProfile(int id);

    List<PatientResponseDTO> getPatientList(String type, int doctorId, int pagenumber, int pagesize);

    Patient getPatient(int doctorId,int patientId);

    Prescription givePrescription(PatientFollowUpPrescriptionDTO patientFollowUpPrescriptionDTO);

    List<FollowUpDetailsDTO> getFollowups(int pagenumber, int pagesize, int doctorId, int patientId);

    //to get the Referred patient during followup
    List<Patient> getReferredPatient(int doctorId,int pagenumber, int pagesize);
}
