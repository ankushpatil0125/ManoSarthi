import "react-native-gesture-handler";
import React, { useEffect, useState, forwardRef } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import CreateService from "./Services/DatabaseServices/CreateService";
import HomeScreen from "./Screens/HomeScreen";
import RegisterPatientScreen from "./Screens/RegisterPatientScreen";
import PatientDetailsScreen from "./Screens/PatientDetailsScreen";
import QuestionnaireScreen from "./Screens/QuestionnaireScreen";
import ReferNotRefer from "./Screens/ReferNotRefer";
import MedicalDetails from "./Screens/MedicalDetails";
import Preview from "./Screens/Preview";
import db from "./Services/DatabaseServices/DatabaseServiceInit";
import DropService from "./Services/DatabaseServices/DropService";
import PatientContext, { PatientProvider } from "./Context/PatientContext";
import ProfileScreen from "./Screens/ProfileScreen";
import LoginScreen from "./Screens/LoginScreen";
import MissedFollowUpsScreen from "./Screens/MissedFollowUpsScreen";
import { AntDesign } from "@expo/vector-icons";
import CustomDrawer from "./components/CustomDrawer";
import { Entypo } from "@expo/vector-icons";
import MainDrawerNavigator from "./navigation/MainDrawerNavigator";
import FetchDataService from "./Services/FetchDataService";
import RegisterPatientService from "./Services/RegisterPatientService";


const Stack = createStackNavigator();

const ForwardedToast = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

const checkNetworkConnectivity = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

// Define a function to render the home stack
export const HomeStack = () => (
  <PatientProvider>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterPatientScreen"
        component={RegisterPatientScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PatientDetailsScreen"
        component={PatientDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MissedFollowupScreen"
        component={MissedFollowUpsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionnaireScreen"
        component={QuestionnaireScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReferNotRefer"
        component={ReferNotRefer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MedicalDetails"
        component={MedicalDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </PatientProvider>
);

// Define the main drawer navigator
// Define the main drawer navigator

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [syncButton,setsyncButton] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      const connected = await checkNetworkConnectivity();
      setIsConnected(connected);

      if (connected) {
        Toast.show({
          type: "success",
          text1: "Back online",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "You are offline now",
        });
      }
    });
  }, []);
  useEffect(()=>{
    const syncData = async () => {
      // try {
        console.log("Hello")
      const patients = await SelectService.getAllPatients();
    
      for (const patient of patients) {
        const SurveyQuestionAnswerData =
          await SelectService.getAllSurveyQuestionAnswersByAabhaId(patient.aabhaId);
        const MedicalHistoryAnswersData =
          await SelectService.getAllMedicalQuestionAnswersByAabhaId(
            patient.aabhaId
          );
        const sendSurvevyQuestion = [];
    
        for (const temp of SurveyQuestionAnswerData) {
          const ques = {
            question_ans: temp.answer,
            questionarrie: {
              question_id: temp.question_id,
            },
          };
          sendSurvevyQuestion.push(ques);
        }
    
        const sendMedicalHistoryAnswers = [];
    
        for (const temp of MedicalHistoryAnswersData) {
          const ques = {
            question_ans: temp.question_ans,
            medicalquest: {
              question_id: temp.question_id,
            },
          };
          console.log("ques", ques);
          sendMedicalHistoryAnswers.push(ques);
        }
        console.log("sendMedicalHistoryAnswers", sendMedicalHistoryAnswers);
        // console.log("SurveyQuestionAnswerData: ", SurveyQuestionAnswerData);
        // console.log("MedicalHistoryAnswersData: ", MedicalHistoryAnswersData);
    
        const patientData = {
          patient: {
            aabhaId: patient.aabhaId,
            firstname: patient.firstName,
            lastname: patient.lastName,
            email: patient.email,
            gender: patient.gender,
            dob: patient.dob,
            address: patient.address,
          },
          questionarrieAnsList: sendSurvevyQuestion,
          medicalQueAnsList: sendMedicalHistoryAnswers,
        };
        console.log("patient data", patientData);
        try {
          const response = await RegisterPatientService.addPatient(patientData);
          console.log("Response : ", response.data);
          if (response) {
            console.log(
              `Patient with name ${patientData.patient.firstname} added successfully`
            );
    
            const status1 = await DeleteService.deletePatientByAabhaId(
              response.data.aabhaId
            );
            console.log("deletePatientByAabhaId Status ", status1);
    
            const status2 =
              await DeleteService.deleteSurveyQuestionAnswersByAabhaId(
                response.data.aabhaId
              );
            console.log("deleteSurveyQuestionAnswersByAabhaId Status ", status2);
    
            const status3 =
              await DeleteService.deleteMedicalHistoryAnswersByAabhaId(
                response.data.aabhaId
              );
            console.log("deleteMedicalHistoryAnswersByAabhaId Status ", status3);
          }
          // const status = await DeleteService.deletePatientByAabhaId(
          //   response.data.aabhaId
          // );
          // console.log("status ", status);
          else {
            console.error("Failed to add patient");
          }
        } catch (error) {
          console.error("Error during adding patient:", error);
        }
      }
    };
  }, [syncButton])
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    FetchDataService.fetchQuestions();
    NavigationContainer.navigate("HomeScreen");
  };

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Drop All Tables
        // await DropService.dropTables();
        // Initialize database and create tables
        await CreateService.createTables();
        console.log("Database and tables initialized successfully.");
      } catch (error) {
        console.error("Error initializing database:", error);
        // Handle the error here, such as showing a message to the user
        // You can also perform additional actions, such as reattempting initialization or showing an error message
      }
    };

    initializeDatabase();
    // Clean up function to close the database connection
    return () => {
      db.closeSync(); // Close the database connection
    };
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator>
          {!isLoggedIn ? (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => (
                <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      ) : (
        <MainDrawerNavigator />
      )}
      <ForwardedToast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
