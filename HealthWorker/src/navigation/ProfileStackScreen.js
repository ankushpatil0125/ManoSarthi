import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditDetailsScreen from "../screens/EditDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
        },
        headerBackTitleVisible: false,
      }}
    >
      <ProfileStack.Screen
        name="Profile2"
        component={ProfileScreen}
        options={{ title: "" }}
      />
      <ProfileStack.Screen
        name="EditDetailsScreen"
        component={EditDetailsScreen}
        options={{ title: "" }}
      />
      <ProfileStack.Screen
        name="ChangePassword1"
        component={ChangePasswordScreen}
        options={{ title: "" }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;

const styles = StyleSheet.create({});
