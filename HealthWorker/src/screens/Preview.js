import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Card,
} from "react-native";
import { CheckBox } from "react-native-elements";
import SelectService from "../Services/DatabaseServices/SelectService";
import PatientContext from "../context/PatientContext"; // Import PatientContext here
import UpdateService from "../Services/DatabaseServices/UpdateService";
import InsertService from "../Services/DatabaseServices/InsertService";
import NetInfo from "@react-native-community/netinfo";
import SyncDataService from "../Services/SyncDataService";

// import { useNavigation } from "@react-navigation/native";

const Preview = ({ navigation, route }) => {
  const { comment, commentID } = route.params; // Destructure comment and commentID from route.params
  const [consentChecked, setConsentChecked] = useState(false);
  const [medicalDetails, setMedicalDetails] = useState([]);
  const [medicalQuestions, setMedicalQuestions] = useState([]);
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [followupQuestions, setFollowupQuestions] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  const [surveyQuestionsAnswers, setSurveyQuestionsAnswers] = useState([]);
  const [followupQuestionsAnswers, setFollowupQuestionsAnswers] = useState([]);
  const [patientPersonalDetails, setPatientPersonalDeatils] = useState([]);
  const { age } = route.params;
  const { type = 'normal' } = route.params;
  const { aabhaId } = useContext(PatientContext);
  const { patientId = -1} = route.params;


  // const checkNetworkConnectivity = async () => {
  //   const state = await NetInfo.fetch();
  //   return state.isConnected;
  // };

  const checkNetworkConnectivity = async () => {
    const state = await NetInfo.fetch();
    console.log("State Response: ", state);
    return state.isConnected;
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      const connected = await checkNetworkConnectivity();
      setIsConnected(connected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCheckboxChange = () => {
    setConsentChecked(!consentChecked);
  };

  const handleSubmit = async () => {
    if (consentChecked) {
      const res3 = await UpdateService.updatePatientStatus(aabhaId);
      console.log(res3);
      if (isConnected) {
        console.log("Inside Isconected");

        await SyncDataService.registrationData();
      }
      await InsertService.insertAabhaId(aabhaId, "old");
      try {
        // const res = await SelectService.getMedicalHistoryAnswers();
        Alert.alert("Data saved in local DB successfully!", "OK", [
          {
            text: "OK",
            onPress: () => {
              console.log(
                "Patient data has been successfully saved to the local database"
              );
              navigation.navigate("HomeScreen");
            },
          },
        ]);
        // console.log("All data entries in table: ", res);
        // navigation.navigate("HomeScreen");
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

  // const { aabhaId } = useContext(PatientContext);
  const fieldNames = {
    aabhaId: "Aabha ID",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    gender: "Gender",
    age: "Age",
    address: "Address",
    status: "Status",
    patient_fname : "First Name",
    patient_lname: "Last Name",
    patient_adress: "Address",
  };

  useEffect(() => {
    async function fetchData() {
      if (type === "normal"){
        try {
          const medicalDetailsRes = await SelectService.getMedicalHistoryAnswers(
            aabhaId
          );
          setMedicalDetails(medicalDetailsRes);
  
          const medicalQuestionsRes =
            await SelectService.getAllMedicalQuestions();
          setMedicalQuestions(medicalQuestionsRes);
  
          const surveyQuestionsRes = await SelectService.getAllQuestions(
            age,
            "normal"
          );
          // console.log("quesiton surveyQuestionsRes",surveyQuestionsRes);
          setSurveyQuestions(surveyQuestionsRes);
          // console.log("quesiton surveyQuestions",surveyQuestions);
          const surveyQuestionsAnswers =
            await SelectService.getAllSurveyQuestionAnswersByAabhaId(aabhaId);
          setSurveyQuestionsAnswers(surveyQuestionsAnswers);
  
          const patient_details = await SelectService.getPatientDetailsByID(
            aabhaId
          );
          setPatientPersonalDeatils(patient_details);
  
          // const followupQues = await SelectService.get
          // console.log("Patient details array: ",patientPersonalDetails);
        } catch (error) {
          console.error("Error fetching data for preview:", error);
        }
      }else{
        try {
          if(patientId !== -1){
            const patient_details = await SelectService.getFollowupDetailsByID(
              patientId
            );
            setPatientPersonalDeatils(patient_details);
          }
          else{
            console.log("Error Receiving patientID for followp details")
          }

          const followupQuestionsRes = await SelectService.getAllQuestions(
            age,
            "followup"
          );
          setFollowupQuestions(followupQuestionsRes);

        } catch (error) {
          console.error("Error fetching followup data for preview:", error);
        }
      }
    }
    fetchData();
  }, [aabhaId]);
  useEffect(() => {
    const fun = async () => {
      const data = await SelectService.getMedicalHistoryAnswers();
      console.log("[PreviewScreen]Medical QNA Fetched From Database", data);
    };
    fun();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Preview and Submit</Text>
        <View style={styles.detailsContainer}>
          {/* Patient Details */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Patient Details:</Text>
            {patientPersonalDetails.map((detail, index) => (
              <View key={index}>
                {Object.keys(detail).map((key) => (
                  <Text key={key}>
                    {fieldNames[key]}:{" "}
                    {key === "dob" ? formatDate(detail[key]) : detail[key]}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          {(type==="normal") ?
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Survey Questionnaire:</Text>
            {surveyQuestionsAnswers.map((detail, index) => (
              <Text key={index}>
                {surveyQuestions[index]?.question} - {detail.answer}
              </Text>
            ))}
          </View>
          :
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Followup Questionnaire:</Text>
            {followupQuestionsAnswers.map((detail, index) => (
              <Text key={index}>
                {followupQuestions[index]?.question} - {detail.answer}
              </Text>
            ))}
          </View>
          }

          {/* Medical Details */}
          {(type === 'normal')?<View style={styles.card}>
            <Text style={styles.cardTitle}>Medical Details:</Text>
            {medicalQuestions.map((question, index) => {
              // Find the corresponding detail in medicalDetails based on question_id
              const detail = medicalDetails.find(
                (detail) => detail.question_id === question.question_id
              );
              // If detail exists, display the question and answer
              if (detail && question.question_id !== commentID) {
                return (
                  <Text key={index}>
                    {question.question}- {detail.question_ans}
                  </Text>
                );
              } else {
                return null; // If detail doesn't exist, return null
              }
            })}
            <Text>Comment: {comment}</Text>
          </View>:null}
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

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2, // for Android
    shadowColor: "#000", // for iOS
    shadowOpacity: 0.1, // for iOS
    shadowRadius: 2, // for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    // paddingLeft: "8%",
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
  button: {
    width: "40%",
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#3498db",
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
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
