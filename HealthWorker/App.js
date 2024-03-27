import "react-native-gesture-handler";
import React, { useEffect, useState, forwardRef } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
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
import InsertService from "./Services/DatabaseServices/InsertService";
import SurveyQuestionsService from "./Services/SurveyQuestionsService";
import db from "./Services/DatabaseServices/DatabaseServiceInit";
import DropService from "./Services/DatabaseServices/DropService";
import MedicalQuestionarrieService from "./Services/MedicalQuestionarrieService";




const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ForwardedToast = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

const checkNetworkConnectivity = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Profile Screen</Text>
  </View>
);

const DashboardScreen = () => (
  <View style={styles.screen}>
    <Text>Dashboard Screen</Text>
  </View>
);

const AlertScreen = () => (
  <View style={styles.screen}>
    <Text>Alert Screen</Text>
  </View>
);

const PrescriptionScreen = () => (
  <View style={styles.screen}>
    <Text>Prescription Screen</Text>
  </View>
);

// Define a function to render the home stack
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen
      name="RegisterPatientScreen"
      component={RegisterPatientScreen}
    />
    <Stack.Screen
      name="PatientDetailsScreen"
      component={PatientDetailsScreen}
    />
    <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireScreen} />
    <Stack.Screen name="ReferNotRefer" component={ReferNotRefer}/>
    <Stack.Screen name="MedicalDetails" component={MedicalDetails} />
    <Stack.Screen name="Preview" component={Preview} />

  </Stack.Navigator>
);

// Define the main drawer navigator
const MainDrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="HomeScreen">
    <Drawer.Screen name="Home" component={HomeStack} />
    <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    <Drawer.Screen name="DashboardScreen" component={DashboardScreen} />
    <Drawer.Screen name="AlertScreen" component={AlertScreen} />
    <Drawer.Screen name="PrescriptionScreen" component={PrescriptionScreen} />
  </Drawer.Navigator>
);
export default function App() {
  const [isConnected, setIsConnected] = useState(true);

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

  useEffect(() => {
    const initializeDatabase = async () => {
      // const dropResponse = DropService.dropSurveyQuestionTable();
      // console.log("Drop status", dropResponse);
      let databaseInitialized = false;
      try {
        // Initialize database and create tables
        await CreateService.createTables();
        console.log("Database and tables initialized successfully.");
        databaseInitialized = true;
      } catch (error) {
        console.error("Error initializing database:", error);
        // Handle the error here, such as showing a message to the user
        // Set a flag to indicate that the database initialization failed
        databaseInitialized = false;
      }

      if (databaseInitialized) {
        try {
          // Fetch questions from the service
          const questionsResponse = await SurveyQuestionsService.getQuestions();
          const medicalQuestionsResponse = await MedicalQuestionarrieService.getMedicalQuestionarrie();
      
          if (questionsResponse && medicalQuestionsResponse) {
            const questions = questionsResponse.data;
            const medicalQuestions = medicalQuestionsResponse.data;
            
            console.log("Fetched Questions:", questions);
            console.log("Fetched Medical Questions:", medicalQuestions);
      
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
      } else {
        // Database initialization failed, handle accordingly
        console.log("Database initialization failed.");
        // You can show an error message to the user or take other actions
      };      
    };

    initializeDatabase();

    return () => {
      db.closeSync(); // Close the database connection
    };
  }, []);

  return (
    <NavigationContainer>
      <MainDrawerNavigator />
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