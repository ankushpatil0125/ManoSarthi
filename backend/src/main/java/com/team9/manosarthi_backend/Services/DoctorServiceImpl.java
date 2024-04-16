package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.DTO.PatientFollowUpPrescriptionDTO;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DoctorServiceImpl implements DoctorService{

    private PatientRepository patientRepository;
    private DoctorRepository doctorRepository;
    private PrescriptionRepository prescriptionRepository;
    private MedicineRepository medicineRepository;
    private FollowUpDetailsRepository followUpDetailsRepository;


    @Override
    public List<Patient> getNewPatientDetails(int doctorId, int pagenumber, int pagesize) {

        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        int subDistrictCode;
        if(doctor.isPresent()) {
            subDistrictCode= doctor.get().getSubdistrictcode().getCode();
            Pageable pageable = PageRequest.of(pagenumber,pagesize);
            Page<Patient> patientList=patientRepository.getNewPatientBySubdistrict(subDistrictCode,pageable);
            return patientList.getContent();
        }
        else return null;
    }

    @Override
    public Patient  getPatient(int doctorId,int patientId) {
       Optional<Patient> patient= patientRepository.findById(patientId);
       Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        if(patient.isPresent() && doctor.isPresent())
        {
            if( doctor.get().getSubdistrictcode().getCode() != patient.get().getVillage().getSubDistrict().getCode() )
                return null;
            return patient.get();
        }


       return null;
    }

    @Override
    public Prescription givePrescription(PatientFollowUpPrescriptionDTO patientFollowUpPrescriptionDTO) {


        Optional<Patient> gotpatient = patientRepository.findById(patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id());

        if(gotpatient.isPresent())
        {
            patientFollowUpPrescriptionDTO.getPrescription().setDate(Date.valueOf(java.time.LocalDate.now()));

            Patient patient=gotpatient.get();
            int followupno=patient.getFollowUpNumber();
            Optional<FollowUpDetails> followUpDetails = followUpDetailsRepository.findById(followupno);
            if( followUpDetails.isPresent())
            {
//                patientFollowUpPrescriptionDTO.setFollowUpDetails(followUpDetails.get());
                if(followUpDetails.get().getFollowUpNo()!=0)    //set previous active prescription to false
                {
                    Prescription oldActivePrescription = prescriptionRepository.getActivePrescription(patient.getPatient_id());
                    oldActivePrescription.setActive(false);
                    prescriptionRepository.save(oldActivePrescription);
                }
                patientFollowUpPrescriptionDTO.getPrescription().setActive(true);
            }
            else
            {
                throw new APIRequestException("No followUpDetails with id : "+patientFollowUpPrescriptionDTO.getPrescription().getFollowUpDetails().getId());
            }
            Prescription newPrescription = prescriptionRepository.save(patientFollowUpPrescriptionDTO.getPrescription());

            for (Medicine medicine : patientFollowUpPrescriptionDTO.getMedicineList())
            {
                medicine.setPrescription(newPrescription);
                medicineRepository.save(medicine);
            }


            return prescriptionRepository.findById(newPrescription.getPrescription_id()).orElse(null) ;
        }
        else {
            throw new APIRequestException("Patient not found with id "+ patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id());
        }


    }
}
