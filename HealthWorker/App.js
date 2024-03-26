import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
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
import QuestionnaireScreen from "./Screens/QuestionnaireScreen"

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
    <Stack.Screen name="RegisterPatientScreen" component={RegisterPatientScreen} />
    <Stack.Screen name="PatientDetailsScreen" component={PatientDetailsScreen} />
    <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireScreen} />
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

    // Initialize database and create tables
    CreateService.createTables().then(() => {
      console.log("Database and tables initialized successfully.");
    }).catch((error) => {
      console.error("Error initializing database:", error);
    });

    // return () => unsubscribe();
    // Cleanup function to close the database connection
    return () => {
      db.close(); // Close the database connection
    };
  }, []);

  return (
    <NavigationContainer>
      <MainDrawerNavigator />
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
