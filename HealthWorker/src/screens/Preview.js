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
  Image,
  Button,
} from "react-native";
import { CheckBox } from "react-native-elements";
import SelectService from "../Services/DatabaseServices/SelectService";
import PatientContext from "../context/PatientContext"; // Import PatientContext here
import UpdateService from "../Services/DatabaseServices/UpdateService";
import InsertService from "../Services/DatabaseServices/InsertService";
import NetInfo from "@react-native-community/netinfo";
import SyncDataService from "../Services/SyncDataService";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
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
  const { type, pid, age } = route.params;
  const { aabhaId } = useContext(PatientContext);
  const [selectedImage, setSelectedImage] = useState(null); // Changed initial value to null

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

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      // Permission granted, you can now access location
      console.log("Permission Status: ", status);

      return true;
    } else {
      // Permission denied
      console.log("Permission Status: ", status);

      return false;
    }
  };

  const handleSubmit = async () => {
    if (type === "normal") {
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
    } else if (type === "followup") {
      console.log("Internet Status: ", isConnected);
      const permissionGranted = await getLocationPermission();
      if (permissionGranted) {
        try {
          const location = await Location.getCurrentPositionAsync({});
          console.log("Location:", location);
          // await storeLocationInStorage(location);
          // setNewLatitude(location.coords.latitude);
          // setNewLongitude(location.coords.longitude);
          const newLatitude = location.coords.latitude;
          const newLongitude = location.coords.longitude;
          console.log("NL:: NL:::", newLongitude, newLatitude);
          const res = await UpdateService.updateFollowUpReferNotRefer(
            pid,
            undefined,
            newLatitude,
            newLongitude
          );
          console.log(
            "[PreviewScreen]Longitude Lattitude status storing Response: ",
            res
          );
          const res2 = await UpdateService.updateFollowUpScheduleStatus(
            pid,
            "Completed"
          );
          console.log(
            "[PreviewScreen]Update FollowUpScheduleStatus Response: ",
            res2
          );
        } catch (error) {
          console.error("Error getting location:", error);
        }
        try {
          if (isConnected) {
            console.log("Inside FollowUp Isconected");

            await SyncDataService.followUpData();
          }
        } catch (error) {
          console.error("Error Syncing FollowUp:", error);
        }
      } else {
        console.log("Location permission not granted.");
      }

      Alert.alert("Data saved in local DB successfully!", "OK", [
        {
          text: "OK",
          onPress: () => {
            console.log(
              "Patient data has been successfully saved to the local database"
            );
            navigation.navigate("HomeScreen", { nav: "Refresh" });
          },
        },
      ]);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    // console.log("date:", date);
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with leading zero if needed
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if needed
    return `${day}/${month}/${year}`;
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
    patient_fname: "First Name",
    patient_lname: "Last Name",
    patient_adress: "Address",
    followUpDate: "Follow up Date",
  };

  useEffect(() => {
    async function fetchData() {
      if (type === "normal") {
        try {
          const medicalDetailsRes =
            await SelectService.getMedicalHistoryAnswers(aabhaId);
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
      } else {
        try {
          const patient_details =
            await SelectService.getFollowupPatientDetailsByID(pid);
          setPatientPersonalDeatils(patient_details);

          const followupQuestionsRes = await SelectService.getAllQuestions(
            age,
            "followup"
          );
          setFollowupQuestions(followupQuestionsRes);

          const followupQuestionsAnswers =
            await SelectService.getAllFollowUpQuestionAnswersByPID(pid);
          setFollowupQuestionsAnswers(followupQuestionsAnswers);
        } catch (error) {
          console.error("Error fetching followup data for preview:", error);
        }
      }
    }
    fetchData();
  }, [aabhaId, type]);
  useEffect(() => {
    const fun = async () => {
      if (type === "normal") {
        const data = await SelectService.getMedicalHistoryAnswers();
        console.log("[PreviewScreen]Medical QNA Fetched From Database", data);
      } else {
        const followupQuestionsAnswers =
          await SelectService.getAllFollowUpQuestionAnswers();
        console.log(
          "[PreviewScreen]FollowUp QNA Fetched From Database",
          followupQuestionsAnswers
        );

        const frnr = await SelectService.selectFollowUpReferNotRefer();
        console.log(
          "[PreviewScreen]FollowUp status Fetched From Database",
          frnr
        );
      }
    };
    fun();
  }, []);

  const takeConsent = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // Check if image was not cancelled
        setSelectedImage(result?.assets[0]?.base64); // Update selected image state
        const resUpdate = await UpdateService.updatePatientConsentImage(
          result?.assets[0]?.base64,
          aabhaId
        );
        console.log("resUpdate", resUpdate);
      }
    } catch (error) {
      console.log("Error taking picture:", error);
    }
  };

  const takeFollowupPic = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // Check if image was not cancelled
        setSelectedImage(result?.assets[0]?.base64); // Update selected image state
        const resUpdate = await UpdateService.updatePatientFollowupImage(
          result?.assets[0]?.base64,
          pid
        );
        console.log("resUpdate", resUpdate);
      }
    } catch (error) {
      console.log("Error taking picture:", error);
    }
  };

  // useEffect(() => {
  //   console.log("Selecded", selectedImage);
  // }, [selectedImage]);

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
                {Object.keys(detail).map(
                  (key) =>
                    fieldNames.hasOwnProperty(key) && (
                      <Text key={key}>
                        {fieldNames[key]}:{" "}
                        {key === "followUpDate"
                          ? formatDate(detail[key])
                          : detail[key]}
                      </Text>
                    )
                )}
              </View>
            ))}
          </View>

          {type === "normal" ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Survey Questionnaire:</Text>
              {surveyQuestionsAnswers.map((detail, index) => (
                <Text key={index}>
                  {surveyQuestions[index]?.question} - {detail.answer}
                </Text>
              ))}
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Followup Questionnaire:</Text>
              {followupQuestionsAnswers.map((detail, index) => (
                <Text key={index}>
                  {followupQuestions[index]?.question} - {detail.answer}
                </Text>
              ))}
            </View>
          )}

          {/* Medical Details */}
          {type === "normal" ? (
            <View style={styles.card}>
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
            </View>
          ) : null}
        </View>
        {type === "normal" ? (
          <View>
            <View>
              <Button title="Take Consent" onPress={takeConsent} />
            </View>
            <View style={styles.imageContainer}>
              {selectedImage && (
                <Image
                  source={{ uri: `data:image/png;base64,${selectedImage}` }}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Button title="Take Followup Pic" onPress={takeFollowupPic} />
            </View>
            <View style={styles.imageContainer}>
              {selectedImage && (
                <Image
                  source={{ uri: `data:image/png;base64,${selectedImage}` }}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        )}

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
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default Preview;
