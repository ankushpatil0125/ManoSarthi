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
import db from "./Services/DatabaseServices/DatabaseServiceInit";
import DropService from "./Services/DatabaseServices/DropService";
import PatientContext, { PatientProvider } from "./Context/PatientContext";
import ProfileScreen from "./Screens/ProfileScreen";
import LoginScreen from "./Screens/LoginScreen";
import MissedFollowUpsScreen from "./Screens/MissedFollowUpsScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { LanguageProvider } from "./Context/LanguageProvider";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ForwardedToast = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

const checkNetworkConnectivity = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

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
  <PatientProvider>
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
      <Stack.Screen
        name="MissedFollowupScreen"
        component={MissedFollowUpsScreen}
      />
      <Stack.Screen
        name="QuestionnaireScreen"
        component={QuestionnaireScreen}
      />
      <Stack.Screen name="ReferNotRefer" component={ReferNotRefer} />
      <Stack.Screen name="MedicalDetails" component={MedicalDetails} />
      <Stack.Screen name="Preview" component={Preview} />
    </Stack.Navigator>
  </PatientProvider>
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
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
    <LanguageProvider>
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
  </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
