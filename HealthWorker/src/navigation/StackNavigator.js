import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterPatientScreen from "../screens/RegisterPatientScreen";
import MissedFollowupScreen from "../screens/MissedFollowupScreen";
import HomeScreen from "../screens/HomeScreen";
import PatientDetailsScreen from "../screens/PatientDetailsScreen";
import QuestionnaireScreen from "../screens/QuestionnaireScreen";
import MedicalDetails from "../screens/MedicalDetails";
import Preview from "../screens/Preview";
import { PatientProvider } from "../context/PatientContext";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <PatientProvider>
      <Stack.Navigator
        screenOptions={{ title: "",
        // headerStyle: {
        //   backgroundColor:"#87CEEB"
        // },
        headerTintColor: '#87CEEB',
        headerTitleStyle: {
          fontWeight: 'bold',
        }, }}
      >
        {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="RegisterPatientScreen"
          component={RegisterPatientScreen}
        />
        <Stack.Screen
          name="MissedFollowupScreen"
          component={MissedFollowupScreen}
        />
        <Stack.Screen
          name="PatientDetailsScreen"
          component={PatientDetailsScreen}
        />
        <Stack.Screen
          name="QuestionnaireScreen"
          component={QuestionnaireScreen}
        />
        <Stack.Screen name="MedicalDetails" component={MedicalDetails} />
        <Stack.Screen name="Preview" component={Preview} />
      </Stack.Navigator>
    </PatientProvider>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
