import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RegisterPatientService from "../Services/RegisterPatientService";
import SelectService from "../Services/DatabaseServices/SelectService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import InsertService from "../Services/DatabaseServices/InsertService";
import SurveyQuestionsService from "../Services/SurveyQuestionsService";
import MedicalQuestionarrieService from "../Services/MedicalQuestionarrieService";

// const [sendPatient, setSendPatient] = useState([]);

const syncData = async () => {
  try {
    const patients = await SelectService.getAllPatients();

    for (const patient of patients) {
      const patientData = {
        aabhaId: patient.aabhaId,
        firstname: patient.firstName,
        lastname: patient.lastName,
        email: patient.email,
        gender: patient.gender,
        dob: patient.dob,
        village: {
          code: patient.village,
        },
        register_worker: {
          id: patient.register_worker,
        },
        doctor: {
          id: patient.doctor,
        },
        address: patient.address,
      };
      try {
        const response = await RegisterPatientService.addPatient(patientData);
        console.log("Response : ", response.data);
        if (response) {
          console.log(
            `Patient with name ${patientData.firstname} added successfully`
          );
          const status = await DeleteService.deletePatientByAabhaId(
            response.data.aabhaId
          );
          console.log("status ", status);
        } else {
          console.error("Failed to add patient");
        }
      } catch (error) {
        console.error("Error during adding patient:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching patient data:", error);
  }
};

const fetchData = async () => {
  try {
    // Fetch questions from the service
    const questionsResponse = await SurveyQuestionsService.getQuestions();
    const medicalQuestionsResponse =
      await MedicalQuestionarrieService.getMedicalQuestionarrie();

    if (questionsResponse && medicalQuestionsResponse) {
      const questions = questionsResponse.data;
      const medicalQuestions = medicalQuestionsResponse.data;

      console.log("Fetched Questions:", questions);
      console.log("Fetched Medical Questions:", medicalQuestions);

      // Delete old questions from the SurveyQuestion table
      await DeleteService.deleteAllSurveyQuestions();
      console.log("SurveyQuestions deleted successfully.");

       // Delete old medical questions from the MedicalQuestions table
       await DeleteService.deleteAllMedicalQuestions();
       console.log("MedicalQuestions deleted successfully.");
 

      // Insert fetched questions into the database
      await InsertService.insertSurveyQuestion(questions);
      console.log("SurveyQuestions inserted successfully.");

      // Insert fetched medical questions into the database
      await InsertService.insertMedicalQuestions(medicalQuestions);
      console.log("MedicalQuestions inserted successfully.");
    } else {
      // Handle failure to fetch questions
      console.log("Failed to fetch questions");
    }
  } catch (error) {
    console.error("Error during question insertion:", error);
    // Handle the error here, such as showing a message to the user
  } 
};

function HomeScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [medical_history_ans, setMedical_history_ans] = useState([]);

  const fetchDataFromDatabase = async () => {
    try {
      const patient_data = await SelectService.getAllPatients();
      const medical_history = await SelectService.getMedicalHistoryAnswers();

      setPatients(patient_data);
      setMedical_history_ans(medical_history);

      console.log("Homescreen Patients: ", patient_data);
      console.log("Homescreen medical_history_ans: ", medical_history);

    } catch (error) {
      console.error("Error fetching data from database(HomeScreen):", error);
    }
  };


  const deleteAllMedicalHistoryAnswers = async () => {
    try {
      await DeleteService.deleteAllMedicalHistoryAnswers();
      console.log("AllMedicalHistoryAnswers deleted successfully.");

    } catch (error) {
      console.error("Error deleting AllMedicalHistoryAnswers:", error);
    }
  };

  // const fetchDataFromDatabase = async () => {
  //   try {
  //     const data = await SelectService.getAllPatients();
  //     setPatients(data);
  //     console.log("Homescreen Patients: ", data);
  //   } catch (error) {
  //     console.error("Error fetching data from database:", error);
  //   }
  // };

  useEffect(() => {
    fetchDataFromDatabase();
    // deleteAllMedicalHistoryAnswers();
  }, []);

  const handleRegisterPatient = () => {
    // Navigate or perform action for registering patient
    navigation.navigate("RegisterPatientScreen");
  };

  const handleMissedFollowup = () => {
    // Navigate or perform action for missed followup
  };

  const handleSync = () => {
    syncData();
  };

  const handleFetch = () => {
    fetchData();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegisterPatient}>
          <Text style={styles.buttonText}>Register Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMissedFollowup}>
          <Text style={styles.buttonText}>Missed Followup</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.syncButton} onPress={handleSync}>
          <Text style={styles.syncButtonText}>Sync Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.syncButton} onPress={handleFetch}>
          <Text style={styles.syncButtonText}>Fetch Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  topButtonsContainer: {
    width: "70%",
    justifyContent: "space-between",

    marginTop: "5%",
    flexDirection: "row",

    // borderWidth: 1, // Add border to visualize container size
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  syncButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  syncButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
