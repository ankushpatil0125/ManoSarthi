import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import SelectService from "../Services/DatabaseServices/SelectService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import Table from "../components/Table";
import { ScrollView } from "react-native";
import i18n from "../../i18n";

const HomeScreen = ({ navigation }) => {
  const fetchDataFromDatabase = async () => {
    try {
      const patient_data = await SelectService.getAllPatients();
      const survey_qna = await SelectService.getAllSurveyQuestionAnswers();
      const medical_qna = await SelectService.getMedicalHistoryAnswers();
      const aabhaIdInfoData = await SelectService.getAllAabhaIdInfo();
      const survey_ques = await SelectService.getAllSurveyQuestions();
      const medical_ques = await SelectService.getAllMedicalQuestions();
      console.log("[Homescreen]Patients Fetched From Database: ", patient_data);
      console.log("[Homescreen]Survey QNA Fetched From Database: ", survey_qna);
      console.log(
        "[Homescreen]Medical QNA Fetched From Database: ",
        medical_qna
      );
    } catch (error) {
      console.error("Error fetching data from database(HomeScreen):", error);
    }
  };

  const deleteDataFromDatabase = async () => {
    try {
      await DeleteService.deleteAllSurveyQuestionAnswers();
      console.log("All survey Question answer response deleted");
    } catch (error) {
      console.error("Error deleting data from database:", error);
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

  useEffect(() => {
    const fetchDataWithDelay = () => {
      setTimeout(() => {
        fetchDataFromDatabase();
      }, 3000); // 3 seconds delay
    };

    fetchDataWithDelay();
    // fetchSurveyQuestionAnswerFromDatabase();
    // deleteAllMedicalHistoryAnswers();
  }, []);

  const handleRegisterPatient = () => {
    // Navigate or perform action for registering patient
    navigation.navigate("RegisterPatientScreen");
  };

  const handleMissedFollowup = async() => {
    // Navigate or perform action for missed followup
    const insertedPres = await SelectService.getAllPrescriptions();
        console.log("Press: ", JSON.parse(insertedPres));
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
};

export default HomeScreen;

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
