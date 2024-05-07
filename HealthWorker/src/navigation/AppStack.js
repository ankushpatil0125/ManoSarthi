import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import MessageScreen from "../screens/MessageScreen";
import CustomDrawer from "../components/CustomDrawer";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import TabNavigation from "./TabNavigation";
import StackNavigator from "./StackNavigator";
import PrescriptionScreen from "../screens/PrescriptionScreen";
import ProfileStackScreen from "./ProfileStackScreen";
import { LanguageProvider } from "../context/LanguageProvider";
const Drawer = createDrawerNavigator();
const AppStack = () => {
  return (
    <LanguageProvider>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: "#87CEEB",
          drawerActiveTintColor: "#fff",
          drawerLabelStyle: { marginLeft: -25 },
          // headerStyle:{backgroundColor:'#87CEEB'},
        }}
      >
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{
            drawerIcon: () => <Entypo name="home" size={20} color="black" />,
          }}
        />
        <Drawer.Screen
          name="Prescription"
          component={PrescriptionScreen}
          options={{
            drawerIcon: () => <Entypo name="message" size={24} color="black" />,
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: () => <AntDesign name="user" size={24} color="black" />,
          }}
        />
        <Drawer.Screen
          name="Message"
          component={MessageScreen}
          options={{
            drawerIcon: () => <Entypo name="message" size={24} color="black" />,
          }}
        />
      </Drawer.Navigator>
    </LanguageProvider>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
