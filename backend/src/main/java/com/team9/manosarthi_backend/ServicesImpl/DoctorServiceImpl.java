package com.team9.manosarthi_backend.ServicesImpl;

import com.team9.manosarthi_backend.DTO.FollowUpDetailsDTO;
import com.team9.manosarthi_backend.DTO.PatientFollowUpPrescriptionDTO;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.*;
import com.team9.manosarthi_backend.Services.DoctorService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
@AllArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private PatientRepository patientRepository;
    private DoctorRepository doctorRepository;
    private PrescriptionRepository prescriptionRepository;
    private MedicineRepository medicineRepository;
    private FollowUpDetailsRepository followUpDetailsRepository;
    private FollowUpScheduleRepository followUpScheduleRepository;
    private DiseaseRepository diseaseRepository;


    @Override
    public Doctor viewProfile(int id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        if (doctor.isPresent()) {
            return doctor.get();
        }
        else throw new APIRequestException("Doctor not found for id " + id);
    }

    @Override
    public List<Patient> getPatientList(String type,int doctorId, int pagenumber, int pagesize) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        int subDistrictCode;
        if(doctor.isPresent()) {
            subDistrictCode= doctor.get().getSubdistrictcode().getCode();
            Pageable pageable = PageRequest.of(pagenumber,pagesize);
            Page<Patient> patientList=patientRepository.getPatientListBySubdistrict(type,subDistrictCode,pageable);
            return patientList.getContent();
        }
        else return null;
    }

//    @Override
//    public List<Patient> getNewPatientDetails(int doctorId, int pagenumber, int pagesize) {
//
//        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
//        int subDistrictCode;
//        if(doctor.isPresent()) {
//            subDistrictCode= doctor.get().getSubdistrictcode().getCode();
//            Pageable pageable = PageRequest.of(pagenumber,pagesize);
//            Page<Patient> patientList=patientRepository.getNewPatientBySubdistrict(subDistrictCode,pageable);
//            return patientList.getContent();
//        }
//        else return null;
//    }

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
//        System.out.println("patientFollowUpPrescriptionDTO"+patientFollowUpPrescriptionDTO);


        System.out.println("patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id()   "+patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id());
        Optional<Patient> patient = patientRepository.findById(patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id());
//        Optional<Patient> patient = patientRepository.findByAabha("7709");
        System.out.println("hello");
        System.out.println("patient "+patient.isPresent());
//        System.out.println("patient "+patient);
        if(patient.isPresent())
        {
            System.out.println("byee");
            Patient newPatient = patient.get();
            System.out.println("newPatient"+newPatient.getPatient_id());
//            System.out.println("Patient "+patient.get());
            System.out.println("in patient.isPresent() patient");
            patientFollowUpPrescriptionDTO.getPrescription().setDate(Date.valueOf(java.time.LocalDate.now()));
            // get latest follow up id
            System.out.println("patient.get().getFollowUpNumber() "+patient.get().getFollowUpNumber());
            int latestFollowUpId = patient.get().getFollowUpNumber();
            Optional<FollowUpDetails> latestFollowUp = followUpDetailsRepository.findFollowUpDetailsByFollowUpNo(patient.get().getPatient_id(),latestFollowUpId);
////            Optional<FollowUpDetails> followUpDetails = followUpDetailsRepository.findById(patientFollowUpPrescriptionDTO.getPrescription().getFollowUpDetails().getId());
            System.out.println("latestFollowUp "+latestFollowUp.get().getId());
            if( latestFollowUp.isPresent())
            {
                patientFollowUpPrescriptionDTO.getPrescription().setFollowUpDetails(latestFollowUp.get());
                if(latestFollowUp.get().getFollowUpNo()!=0)    //set previous active prescription to false

                {
                    Prescription oldActivePrescription = prescriptionRepository.getActivePrescription(patient.get().getPatient_id());
                    oldActivePrescription.setActive(false);
                    prescriptionRepository.save(oldActivePrescription);
                }
                else    // change patient from status=new to ongoing as followupno=0 for new registered patient
                {
                    patient.get().setStatus("ONGOING");
                    patientRepository.save(patient.get());
                }
                patientFollowUpPrescriptionDTO.getPrescription().setActive(true);
            }
            else
            {
                throw new APIRequestException("No followUpDetails with id : "+patientFollowUpPrescriptionDTO.getPrescription().getFollowUpDetails().getId());
            }


//            Set<Disease> diseaseSet= new HashSet<>(patientFollowUpPrescriptionDTO.getDiseaseList());
//            System.out.println("diseaseSet"+diseaseSet);
            Set<Disease> diseasetostore=new HashSet<>();
            for (Disease disease : patientFollowUpPrescriptionDTO.getDiseaseList()) {
                System.out.println("Disease"+disease);
                Optional<Disease> diseasegot=diseaseRepository.findById(disease.getCode());
                if(diseasegot.isPresent())
                {
                    System.out.println("got d"+diseasegot.get());
                    diseasetostore.add(diseasegot.get());
                }
            }
            System.out.println("diseasetostore"+diseasetostore);
//            for(Disease disease:patientFollowUpPrescriptionDTO.getDiseaseList())
//            {
//                Optional<Disease> temp = diseaseRepository.findById(disease.getCode());
//                if(temp.isPresent()) {
//                    patientFollowUpPrescriptionDTO.getPrescription().getDisease_code().add(temp.get());
//                }
//                else {
//                    System.out.println("Invalid disease");
//                }
//            }
            patientFollowUpPrescriptionDTO.getPrescription().setDisease_code(diseasetostore);
//            System.out.println("disease"+ diseaseRepository.findById(diseaseSet.get(0)));
//            System.out.println("prescription"+patientFollowUpPrescriptionDTO.getPrescription());
            System.out.println("Disease");
//            System.out.println("PRESCRIPTION"+patientFollowUpPrescriptionDTO.getPrescription().getDisease_code());
            Prescription newPrescription = prescriptionRepository.save(patientFollowUpPrescriptionDTO.getPrescription());
            latestFollowUp.get().setPrescription(newPrescription);
            followUpDetailsRepository.save(latestFollowUp.get());
            System.out.println("newPrescription "+newPrescription.getPrescription_id());
            for (Medicine medicine : patientFollowUpPrescriptionDTO.getMedicineList())
            {
                medicine.setPrescription(newPrescription);
                medicineRepository.save(medicine);
            }
            // add follow up schedule
            System.out.println("HELLO TYPE");
            Date nextDate=null;
            System.out.println("FollowupType"+patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType());
            if(Objects.equals(patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType(), "WEEKLY")) {
                System.out.println("nextDate WEEKLY");
                nextDate = Date.valueOf(LocalDate.now().plusWeeks(1));
            }
            else if (patientFollowUpPrescriptionDTO.getFollowUpSchedule().getType()=="MONTHLY")
            {
                System.out.println("nextDate MONTHLY");
                nextDate = Date.valueOf(LocalDate.now().plusMonths(1));

            }
            else throw new APIRequestException("Follow Up Type not specified correctly");

            patientFollowUpPrescriptionDTO.getFollowUpSchedule().setNextFollowUpDate(nextDate);
            FollowUpSchedule followUpSchedule= followUpScheduleRepository.save(patientFollowUpPrescriptionDTO.getFollowUpSchedule());
            System.out.println("followUpSchedule  "+followUpSchedule.getId());


            System.out.println("service completed");
            Prescription prescr= prescriptionRepository.findById(newPrescription.getPrescription_id()).orElseThrow(()->  new APIRequestException("Failed to add Prescription"));
            return prescr;

        }
        else {
            throw new APIRequestException("Patient not found with id "+ patientFollowUpPrescriptionDTO.getPrescription().getPatient().getPatient_id());
        }

    }
    @Override
    public List<FollowUpDetails> getFollowups(int pagenumber,int pagesize,int doctorId, int patientId) {
        Pageable pageable = PageRequest.of(pagenumber,pagesize);
        Page<FollowUpDetails> followups= followUpDetailsRepository.findFollowUpDetailsByDoctorAndPatient(patientId,doctorId,pageable);
        return followups.getContent();
    }
}
