package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Doctor;
import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Repositories.PatientRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DoctorServiceImpl implements DoctorService{

    PatientRepository patientRepository;
    DoctorRepository doctorRepository;

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
    public Patient getPatient(int doctorId,int patientId) {
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
}
