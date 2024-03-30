import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { Card, CheckBox } from "react-native-elements";
import SelectService from "../Services/DatabaseServices/SelectService";
import PatientContext from "../Context/PatientContext"; // Import PatientContext here 
import { useNavigation } from "@react-navigation/native";

const Preview = () => {
  const [consentChecked, setConsentChecked] = useState(false);
  const [medicalDetails, setMedicalDetails] = useState([]);
  const [medicalQuestions, setMedicalQuestions] = useState([]);
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [surveyQuestionsAnswers, setSurveyQuestionsAnswers] = useState([]);
  const [patientPersonalDetails, setPatientPersonalDeatils] = useState([]);
  

  const navigation = useNavigation();

  const handleCheckboxChange = () => {
    setConsentChecked(!consentChecked);
  };

  const showAlert = async () => {
    if (consentChecked) {
      try {
        const res = await SelectService.getAllQuestions();
        Alert.alert("Data saved in local DB successfully!", "OK", [
          {
            text: "OK",
            onPress: () => {
              console.log("All data entries in table: ", res);
              navigation.navigate("HomeScreen");
            },
          },
        ]);
        console.log("All data entries in table: ", res);
        navigation.navigate("HomeScreen");
      } catch (error) {
        Alert.alert("Error!", "Failed to fetch data from local DB.", [
          { text: "OK" },
        ]);
        console.error(error);
      }
    } else {
      Alert.alert(
        "Please provide consent!",
        "You need to provide consent before submitting.",
        [{ text: "OK" }]
      );
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  

  const { aabhaId } = useContext(PatientContext); 

  useEffect(() => {
    async function fetchData() {
      try {
        const medicalDetailsRes = await SelectService.getMedicalHistoryAnswers(
          aabhaId
        );
        setMedicalDetails(medicalDetailsRes);

        const medicalQuestionsRes =
          await SelectService.getAllMedicalQuestions();
        setMedicalQuestions(medicalQuestionsRes);

        const surveyQuestionsRes =
          await SelectService.getAllQuestions();
        setSurveyQuestions(surveyQuestionsRes);

        const surveyQuestionsAnswers =
          await SelectService.getAllSurveyQuestionAnswersByAabhaId(aabhaId);
        setSurveyQuestionsAnswers(surveyQuestionsAnswers);

        const patient_details =
          await SelectService.getPatientDetailsByID(aabhaId);
        setPatientPersonalDeatils(patient_details);
        console.log("Patient details array: ",patientPersonalDetails);

      } catch (error) {
        console.error("Error fetching data for preview:", error);
      }
    }
    fetchData();
  }, [aabhaId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <Text style={styles.header}>Preview and Submit</Text>
        <View style={styles.detailsContainer}>
     
          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Patient Details:</Text>
            {patientPersonalDetails.map((detail, index) => (
              <View key={index}>
                {Object.keys(detail).map((key) => (
                  <Text key={key}>
                    {key}: {key === 'dob' ? formatDate(detail[key]) : detail[key]}
                  </Text>
                  ))}
              </View>
            ))}
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Survey Questionarrie:</Text>
            {surveyQuestionsAnswers.map((detail, index) => (
              <Text key={index}>
                {surveyQuestions[index]?.question}: {detail.answer}
              </Text>
            ))}
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Medical Details:</Text>
            {medicalDetails.map((detail, index) => (
              <Text key={index}>
                {medicalQuestions[index]?.question}: {detail.question_ans}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={consentChecked}
            onPress={handleCheckboxChange}
            checkedColor="blue"
            containerStyle={styles.checkbox}
          />
          <Text style={styles.consentText}>Consent of patient</Text> 
        </View>

        <TouchableOpacity onPress={showAlert} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingLeft: "8%",
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  checkbox: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  consentText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Preview;
