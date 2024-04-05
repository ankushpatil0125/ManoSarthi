import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import RegisterPatientService from "../Services/RegisterPatientService";
import SelectService from "../Services/DatabaseServices/SelectService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import InsertService from "../Services/DatabaseServices/InsertService";
import Table from "../components/Table";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLanguageContext } from "../Context/LanguageProvider";
import LanguageToggleButton from "../Multilingual/LanguageButton";
import i18n from "../i18n";
import SurveyQuestionsService from "../Services/SurveyQuestionsService";
import MedicalQuestionarrieService from "../Services/MedicalQuestionarrieService";

export const fetchData = () =>
  new Promise(async (resolve, reject) => {
    try {
      // Fetch questions from the service
      const questionsResponse = await SurveyQuestionsService.getQuestions();
      const medicalQuestionsResponse =
        await MedicalQuestionarrieService.getMedicalQuestionarrie();
      const AabhaResponse = await RegisterPatientService.getAabhaIdTable();
      // console.log("Abahid Info", aabhaIdInfo);

      if (questionsResponse && medicalQuestionsResponse && AabhaResponse) {
        const questions = questionsResponse.data;
        const medicalQuestions = medicalQuestionsResponse.data;
        const abhaIDTable = AabhaResponse.data;
        console.log("Fetched Survey Questions:", questions);
        console.log("Fetched AbhaId table: ", abhaIDTable);
        console.log("Fetched Medical Questions:", medicalQuestions);

        // Delete old questions from the SurveyQuestion table
        const res1 = await DeleteService.deleteAllSurveyQuestions();
        console.log("Res1- Delete Old Survey Questions: ", res1);

        // Delete old medical questions from the MedicalQuestions table
        const res2 = await DeleteService.deleteAllMedicalQuestions();
        console.log("Res2- Delete Old Medical Questions: ", res2);

        // Delete old medical questions from the MedicalQuestions table
        const res3 = await DeleteService.deleteAllAabhaIdInfo();
        console.log("Res3- Delete Old AabhaId Table: ", res3);

        // Insert fetched questions into the database
        const res4 = await InsertService.insertSurveyQuestion(questions);
        console.log("Res4- New Survey Questions: ", res4);

        // Insert fetched medical questions into the database
        const res5 = await InsertService.insertMedicalQuestions(
          medicalQuestions
        );
        console.log("Res5- New Medical Questions: ", res5);

        // Insert fetched AabhaId Table into the database
        const res6 = await InsertService.insertAabhaIdInfo(abhaIDTable, "old");
        console.log("Res6- New AabhaIdInfo: ", res6);
        resolve("successfully");
      } else {
        // Handle failure to fetch questions
        console.log("Failed to fetch questions");
        reject("Failed to fetch questions");
      }
    } catch (error) {
      console.error("Error during question insertion:", error);
      // Handle the error here, such as showing a message to the user
      reject("Error during question insertion");
    }
  });

function HomeScreen() {
  const [patients, setPatients] = useState([]);
  const [medicalQNA, setMedicalQNA] = useState([]);
  const [surveyQNA, setSurveyQNA] = useState([]);
  const [aabhaIdInfo, setAabhaIdInfo] = useState([]);

  const navigation = useNavigation();
  const { selectedLanguage, handleLanguageToggle } = useLanguageContext(); // Accessing selectedLanguage and handleLanguageToggle from LanguageProvider

  const fetchPatientDataFromDatabase = async () => {
    console.log("Inside fetchPatientDataFromDatabase");
    try {
      console.log("In");

      const patient_data = await SelectService.getAllPatients();

      // const survey_que_ans = await SelectService.getAllSurveyQuestionAnswers();
      // const medical_history = await SelectService.getMedicalHistoryAnswers();
      // const aabhaIdInfoData = await SelectService.getAllAabhaIdInfo();

      const survey_qus = await SelectService.getAllQuestions();
      const medical_ques = await SelectService.getAllMedicalQuestions();
      // console.log("Inside", aabhaIdInfoData);

      // setPatients(patient_data);
      // setSurvey_que_ans(survey_que_ans);
      // setMedical_history_ans(medical_history_ans);
      // setAabhaIdInfo(aabhaIdInfoData);

      console.log("Homescreen Patients: ", patient_data);
      // console.log("Homescreen survey_que_ans: ",survey_que_ans);
      // console.log("Homescreen medical_history_ans: ", medical_history);
      console.log("Homescreen survey_qus: ", survey_qus);
      console.log("Homescreen medical_ques: ", medical_ques);
      // console.log("Homescreen AabhaIdInfo: ", aabhaIdInfoData);
    } catch (error) {
      console.error("Error fetching data from database(HomeScreen):", error);
    }
  };

  // const insertAabhaInfo = async () => {
  //   try {
  //     // Insert fetched questions into the database
  //     await InsertService.insertAabhaIdInfo("7", "old");
  //     console.log("AabhaInfo inserted successfully.");

  //     await InsertService.insertAabhaIdInfo("9", "new");
  //     console.log("AabhaInfo inserted successfully.");
  //   } catch (error) {
  //     console.error(
  //       "Error Inserting AabhaIdInfo in database(HomeScreen):",
  //       error
  //     );
  //   }
  // };

  const deleteDataFromDatabase = async () => {
    try {
      await DeleteService.deleteAllSurveyQuestionAnswers();
      console.log("All survey Question answer response deleted");
    } catch (error) {
      console.error("Error deleting data from database:", error);
    }
  };

  // deleteDataFromDatabase();

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
    // fetchPatientDataFromDatabase();
    // fetchSurveyQuestionAnswerFromDatabase();
    // deleteAllMedicalHistoryAnswers();
  }, []);

  const handleRegisterPatient = () => {
    // Navigate or perform action for registering patient
    navigation.navigate("RegisterPatientScreen");
  };

  const handleMissedFollowup = () => {
    // Navigate or perform action for missed followup
    navigation.navigate("MissedFollowupScreen");
  };

 
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegisterPatient}
          >
            <Text style={styles.buttonText}>{i18n.t("Register Patient")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleMissedFollowup}
          >
            <Text style={styles.buttonText}>{i18n.t("Missed Followup")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    
      <View style={{ marginTop: 50 }}>
        <Table />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  topButtonsContainer: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    marginTop: "5%",
    flexDirection: "row",
    gap: 5,
    // borderWidth: 1, // Add border to visualize container size
  },
  button: {
    backgroundColor: "#3498db",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 20,
    paddingVertical: 20,
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
