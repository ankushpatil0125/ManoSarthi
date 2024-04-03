import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import ProfileScreen from "../Screens/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import CustomDrawer from "../components/CustomDrawer";
import { Entypo } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStack } from "../App";
const Drawer = createDrawerNavigator();
const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{
      drawerActiveBackgroundColor:'#87CEEB',
      drawerActiveTintColor:'#fff',
      drawerLabelStyle: { marginLeft: -25 },
    }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeStack}
      options={{
        drawerIcon: () => <Entypo name="home" size={20} color="black" />,
      }}
    />
    <Drawer.Screen name="Profile" component={ProfileScreen} options={{
        drawerIcon: () => <AntDesign name="user" size={24} color="black" />,
      }}/>
  </Drawer.Navigator>
  )
}

export default MainDrawerNavigator

const styles = StyleSheet.create({})
