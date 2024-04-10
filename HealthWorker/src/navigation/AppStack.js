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
import ProfileStackScreen from "./ProfileStackScreen";
const Drawer = createDrawerNavigator();
const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor:'#87CEEB',
        drawerActiveTintColor:'#fff',
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
      <Drawer.Screen name="Profile" component={ProfileStackScreen} options={{
          drawerIcon: () => <AntDesign name="user" size={24} color="black" />,
        }}/>
      <Drawer.Screen name="Message" component={MessageScreen} options={{
          drawerIcon: () => <Entypo name="message" size={24} color="black" />,
        }}/>
    </Drawer.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
