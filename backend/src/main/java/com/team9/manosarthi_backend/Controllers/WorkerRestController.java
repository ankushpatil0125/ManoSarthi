package com.team9.manosarthi_backend.Controllers;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.team9.manosarthi_backend.DTO.*;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.DTO.*;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Filters.PatientFilter;
import com.team9.manosarthi_backend.Filters.SupervisorFilter;
import com.team9.manosarthi_backend.Filters.WorkerFilter;
import com.team9.manosarthi_backend.Repositories.PatientRepository;
import com.team9.manosarthi_backend.Repositories.SupervisorRepository;
import com.team9.manosarthi_backend.Services.PatientService;
import com.team9.manosarthi_backend.Services.QuestionarrieService;
import com.team9.manosarthi_backend.Services.WorkerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

import com.team9.manosarthi_backend.security.JwtHelper;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@Validated
//@PreAuthorize("hasRole('WORKER')")
@RequestMapping("/worker")
@CrossOrigin(origins = "*")
@EnableTransactionManagement
public class WorkerRestController {
    private WorkerService workerService;
    private QuestionarrieService questionarrieService;

    private PatientService patientService;
    private JwtHelper helper;

    @Autowired
    public WorkerRestController(WorkerService workerService, QuestionarrieService questionarrieService, JwtHelper helper,PatientService patientService) {
        this.workerService = workerService;
        this.questionarrieService = questionarrieService;
        this.helper = helper;
        this.patientService= patientService;
    }

    @GetMapping("/view-profile")
    public WorkerResponseDTO getDetails(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                // Extract the token part after "Bearer "
                String token = authorizationHeader.substring(7);
                String userid = helper.getIDFromToken(token);
//                Optional<Supervisor> supervisor = supervisorRepository.findById(Integer.parseInt(userid));
                Worker worker = workerService.viewProfile(Integer.parseInt(userid));

                WorkerResponseDTO workerResponseDTO = new WorkerResponseDTO();
                workerResponseDTO.WorkerResponse(worker);
                return workerResponseDTO;
            } else {
                throw new APIRequestException("Error in authorizing");
            }
        } catch (Exception ex) {
            if (ex instanceof APIRequestException) throw new APIRequestException(ex.getMessage());
            else throw new APIRequestException("Error while getting worker details", ex.getMessage());
        }
    }


    @PutMapping("/updateworker")
    public WorkerResponseDTO UpdateWorkerProfile(@RequestBody Worker updatedWorker) {
        try {
            Worker updatedworker = workerService.UpdateWorkerProfile(updatedWorker);
            if (updatedworker != null) {
                WorkerResponseDTO workerResponseDTO = new WorkerResponseDTO();
                workerResponseDTO.WorkerResponse(updatedworker);
                return workerResponseDTO;
            } else {
                throw new APIRequestException("Worker with given ID not found");
            }
        } catch (Exception ex) {
            if (ex instanceof APIRequestException) {
                throw new APIRequestException(ex.getMessage());
            } else
                throw new APIRequestException("Error while updating worker profile", ex.getMessage());
        }
    }

    @GetMapping("/getquestionarrie")
    public List<Questionarrie> getquestionarrie() {
        try {
            List<Questionarrie> questions = questionarrieService.getquestions();
            System.out.println("questions"+questions);

            return questions;
        }
        catch (Exception ex) {
            if (ex instanceof APIRequestException) {
                throw new APIRequestException(ex.getMessage());
            } else
                throw new APIRequestException("Error while getting questionarrie", ex.getMessage());
        }

    }

    @GetMapping("/get-medical-questionarrie")
    public List<MedicalQue> getmedquestionarrie() {
        try {
            List<MedicalQue> questions = questionarrieService.getmedicalquestions();

            return questions;
        }
        catch (Exception ex) {
            if (ex instanceof APIRequestException) {
                throw new APIRequestException(ex.getMessage());
            } else
                throw new APIRequestException("Error while getting medical questionarrie", ex.getMessage());
        }

    }

    @Validated
    @PostMapping("/register-patient")
    public String registerpatient(@Valid @RequestBody RegisterPatientDTO registerPatientDTO, @RequestHeader("Authorization") String authorizationHeader) {

//        System.out.println("patient"+registerPatientDTO.toString());
        System.out.println("RegisterPatientDTO sent " + registerPatientDTO);
        System.out.println("RegisterPatientDTO sent " + registerPatientDTO.toString());
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);

                return workerService.registerPatient(registerPatientDTO, Integer.parseInt(workerId));
//                return newPatient.getAabhaId();
            } else {
                throw new APIRequestException("Error in authorizing");
            }
        } catch (DataIntegrityViolationException ex) {
            String errorMessage = ex.getCause().getMessage();
            String duplicateEntryMessage = null;

            if (errorMessage.contains("Duplicate entry")) {
                // Extract the part of the message that contains the duplicate entry information
                duplicateEntryMessage = errorMessage.substring(errorMessage.indexOf("Duplicate entry"), errorMessage.indexOf("for key"));
            }

            if (duplicateEntryMessage != null) {
                throw new APIRequestException(duplicateEntryMessage, ex.getMessage());
            } else {
                // If the message doesn't contain the expected format, throw a generic exception
                throw new APIRequestException("Duplicate entry constraint violation occurred", ex.getMessage());
            }
        } catch (Exception ex) {
            if (ex instanceof APIRequestException) {
                throw new APIRequestException(ex.getMessage());
            } else
                throw new APIRequestException("Error while registering patient", ex.getMessage());
        }

    }

    @PostMapping("/not-referred-patient")
    public List<String> notReferredPatient(@RequestBody List<String> aabhaIDs, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                System.out.println("aabhaIDs" + aabhaIDs);

                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);
                List<String> addedAabhaIDs = workerService.addNotReferredPatientAabhaId(Integer.parseInt(workerId), aabhaIDs);
                return addedAabhaIDs;
            } else {
                throw new APIRequestException("Error in authorizing");
            }
        }catch (Exception ex) {
            if (ex instanceof APIRequestException) {
                throw new APIRequestException(ex.getMessage());
            } else
                throw new APIRequestException("Error while registering patient", ex.getMessage());
        }
    }


    /*
        @Autowired
        PatientRepository patientRepository;
        @GetMapping("/get-patient")
        public MappingJacksonValue getPatient()
        {

            List<Patient> patientList = patientRepository.findAll();

            Set<String> patientFilterProperties = new HashSet<>();
            patientFilterProperties.add("aabhaId");
            patientFilterProperties.add("followUpDetailsList");
            patientFilterProperties.add("medicalQueAnsList");

            Set<String> followUpFilterProperties = new HashSet<>();
            followUpFilterProperties.add("followupDate");
            followUpFilterProperties.add("followUpNo");
            followUpFilterProperties.add("worker");
            followUpFilterProperties.add("doctor");
            followUpFilterProperties.add("questionarrieAnsList");

            Set<String> workerFilterProperties = new HashSet<>();
            workerFilterProperties.add("firstname");

            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");


            PatientFilter<List<Patient>> patientFilter=new PatientFilter<>(patientList);

            return patientFilter.getPatientFilter(patientFilterProperties,followUpFilterProperties,workerFilterProperties,doctorFilterProperties);

        }
    */
    @GetMapping("/getAbhaid")
    public List<String> getAbhaid(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);
                System.out.println("workerid" +workerId);
                List<String> Abhaid = workerService.getAabhaid(Integer.parseInt(workerId));
                return Abhaid;
            } else {
                throw new APIRequestException("Error in authorizing");
            }
        } catch (Exception ex) {
            if (ex instanceof APIRequestException) {
                throw new APIRequestException(ex.getMessage());
            } else
                throw new APIRequestException("Error while getting registered Aabha Ids", ex.getMessage());
        }
    }

    @GetMapping("/getFollowupSchedule")
    public List<FollowupScheduleDTO> getFollowupSchedule(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);
                List<FollowUpSchedule> schedules = workerService.get_followup_schedule(Integer.parseInt(workerId));

                List<FollowupScheduleDTO> followupScheduleDTOList = new ArrayList<>();
                for (FollowUpSchedule schedule : schedules) {
                    FollowupScheduleDTO followupScheduleDTO = new FollowupScheduleDTO();
                    Date today = java.sql.Date.valueOf(LocalDate.now());

//                Date today = Calendar.getInstance().getTime();
//                Date nextFollowUpDate = schedule.getNextFollowUpDate();


                    if (schedule.getNextFollowUpDate().equals(today)) {
                        followupScheduleDTO.FollowupScheduleToDTO(schedule, "Normal");
                    } else if (schedule.getNextFollowUpDate().before(today)) {
                        followupScheduleDTO.FollowupScheduleToDTO(schedule, "Missed");
                    } else if (schedule.getNextFollowUpDate().after(today)) {
                        followupScheduleDTO.FollowupScheduleToDTO(schedule, "Normal");
                    }

//                if(nextFollowUpDate.compareTo(today) < 0) {
//                    followupScheduleDTO.FollowupScheduleToDTO(schedule,"Missed");
//                }
//                else {
//                    followupScheduleDTO.FollowupScheduleToDTO(schedule,"Normal");
//                }
                    System.out.println("date " + followupScheduleDTO.getFollowUpDate() + "  type  " + followupScheduleDTO.getType());

                    followupScheduleDTOList.add(followupScheduleDTO);

                }
                for (FollowupScheduleDTO followupScheduleDTO : followupScheduleDTOList)
                    System.out.println("followupScheduleDTO   " + followupScheduleDTO.getFollowUpDate());
                return followupScheduleDTOList;
            } else {
                throw new APIRequestException("Error in authorizing");
            }
        }catch (Exception ex) {
            if (ex instanceof APIRequestException) {
                throw new APIRequestException(ex.getMessage());
            } else
                throw new APIRequestException("Error while getting followup schedule", ex.getMessage());
        }
    }

    @GetMapping("/getprescriptions")
    public List<PrescriptionDTO> getPrescriptions(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);
                List<Prescription> prescriptions = workerService.getprescriptions(Integer.parseInt(workerId));
                List<PrescriptionDTO> prescriptionDTOList = new ArrayList<>();
                Date sevendaysback = java.sql.Date.valueOf(LocalDate.now().minusDays(7));
                for (Prescription prescription : prescriptions) {
                    PrescriptionDTO prescriptionDTO = new PrescriptionDTO();

                    if (prescription.getDate().after(sevendaysback))
                        prescriptionDTO.PrescriptionToDTO(prescription, true);
                    else
                        prescriptionDTO.PrescriptionToDTO(prescription, false);

                    prescriptionDTOList.add(prescriptionDTO);

                }
                return prescriptionDTOList;
            } else {
                throw new APIRequestException("Error in authorizing");
            }
        }catch (Exception ex) {
            if (ex instanceof APIRequestException) {
                throw new APIRequestException(ex.getMessage());
            } else
                throw new APIRequestException("Error while getting prescription", ex.getMessage());
        }
    }


    @PostMapping("/register-followup")
    public int registerFollowUP(@RequestBody RegisterFollowUpDetailsDTO registerFollowUpDetailsDTO, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String token = authorizationHeader.substring(7);
                String workerId = helper.getIDFromToken(token);

                int pattientId = workerService.addFollowUpDetails(registerFollowUpDetailsDTO, Integer.parseInt(workerId));
                return pattientId;

            } else {
                throw new APIRequestException("Error in authorizing");
            }
        }
        catch (Exception ex) {
            if (ex instanceof APIRequestException) {
                throw new APIRequestException(ex.getMessage());
            } else
                throw new APIRequestException("Error while registering followup", ex.getMessage());
        }
    }

//    @GetMapping("/getrecentpresc")
//    public List<PrescriptionDTO> getRecentPresc(@RequestHeader("Authorization") String authorizationHeader) {
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//
//            String token = authorizationHeader.substring(7);
//            String workerId = helper.getIDFromToken(token);
//            List<Prescription> prescriptions = workerService.get_recent_presc(Integer.parseInt(workerId));
//
//            List<PrescriptionDTO> prescriptionDTOList = new ArrayList<>();
//            for (Prescription prescription : prescriptions) {
//                PrescriptionDTO prescriptionDTO=new PrescriptionDTO();
//                prescriptionDTO.PrescriptionToDTO(prescription);
//
//                prescriptionDTOList.add(prescriptionDTO);
//
//            }
//            return prescriptionDTOList;
//        } else {
//            throw new APIRequestException("Error in authorizing");
//        }
//    }
    //trial for decryption
    @GetMapping("/getpatient")
    public Patient getPatient(@RequestParam("abhaid") String abhaid) {
        System.out.println(patientService.findPatientByEncryptedAbhaId(abhaid));
        return patientService.findPatientByEncryptedAbhaId(abhaid);
    }



//    @Autowired private AmazonS3 amazonS3;
//    @Value("${aws.s3.bucket}")
//    private String bucketName;



//    @PostMapping("/upload-image")
//    public PutObjectResult uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
//        File convFile = new File(file.getOriginalFilename());
//        FileOutputStream fos = new FileOutputStream(convFile);
//        fos.write(file.getBytes());
//        fos.close();
////        return convFile;
//        return amazonS3.putObject(bucketName,"t1",convFile);
//
////        return amazonS3.putObject(bucketName,"t1", (InputStream) file,null);
////        return  amazonS3.putObject(bucketName,"test", (File) file);
//    }

//    @PostMapping("/upload-image")   //working
//    public PutObjectResult uploadImage(@RequestBody String file) throws IOException {
//
//        return amazonS3.putObject(bucketName,"team",file);
//
////        return amazonS3.putObject(bucketName,"t1", (InputStream) file,null);
////        return  amazonS3.putObject(bucketName,"test", (File) file);
//    }
//
//    @GetMapping("/view-image")    //working
//    public ResponseEntity<InputStreamResource> viewImage() throws Exception {
////        try {
////            S3Object   s3Object= amazonS3.getObject(bucketName,"test1");
////
////
////            byte[] content = IOUtils.toByteArray(s3Object.getObjectContent());
////            ByteArrayResource resource = new ByteArrayResource(content);
////            return  resource;
////
////        }catch (Exception e){
////            throw new Exception(e.getMessage()) ;
////        }
////        return new InputStreamResource(s3Object.getObjectContent());
//
//        S3Object   s3Object= amazonS3.getObject(bucketName,"team9");
//        S3ObjectInputStream content = s3Object.getObjectContent();
////            ByteArrayResource resource = new ByteArrayResource(content);
//        return ResponseEntity.ok()
//                .contentType(MediaType.IMAGE_PNG) // This content type can change by your file :)
////                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\""+fileName+"\"")
//                .body(new InputStreamResource(content));
//    }




////     check of location access
//    @GetMapping("/location")
//    public String getLocation() {
//
////        RestClient restClient = RestClient.create();
////        String result = restClient.get()
////                .uri("https://kgis.ksrsac.in:9000/genericwebservices/ws/getlocationdetails?coordinates=12.844988,77.663201&type=dd")
////                .retrieve()
////                .body(String.class);
//
//        RestClient restClient = RestClient.create();
////
//        String result = restClient.get()
//                .uri("https://kgis.ksrsac.in:9000/genericwebservices/ws/getlocationdetails?coordinates=12.844988,77.663201&type=dd")
//                .retrieve()
//                .body(String.class);
//        System.out.println(result);
//
////        RestClient restClient = RestClient.create();
//
////        String result = restClient.get()
////                .uri("https://jsonplaceholder.typicode.com/comments?postId=1")
////                .retrieve()
////                .body(String.class);
////        System.out.println(result);
//
//        System.out.println(result);
//
//
//        return "result";
//    }

    @Autowired
    private WebClient webClientBuilder;
    @GetMapping("/location")
    public String getLocation() {
       String result= webClientBuilder
                .get()
                .uri("https://kgis.ksrsac.in:9000/genericwebservices/ws/getlocationdetails?coordinates=12.844988,77.663201&type=dd")
                .retrieve()
                .bodyToMono(String.class)
                .block();
        System.out.println("result "+result);
       return result;
    }

    @Autowired
    PatientRepository patientRepository;
    @GetMapping("/aabhaid-test")
    public List<Patient> getAabhaidTest(@RequestParam("abhaid") String abhaid) {

//        System.out.println("Patient List"+ patientRepository.allPatient());
        System.out.println();
        System.out.println("patientRepository.findByAabhaId(abhaid)" + patientRepository.getAllAabhaId());

        return  patientRepository.allPatient();
//        return  patientRepository.findByAabhaId(abhaid);
    }

}

