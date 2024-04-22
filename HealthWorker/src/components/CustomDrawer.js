import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import LanguageToggleButton from "../MultiLingual/LanguageButton";
import { useLanguageContext } from "../context/LanguageProvider";
import SyncDataService from "../Services/SyncDataService";
const CustomDrawer = (props) => {
  const { logout, userName } = useContext(AuthContext);
  const { selectedLanguage, handleLanguageToggle } = useLanguageContext(); // Accessing selectedLanguage and handleLanguageToggle from LanguageProvider
  // console.log("USername: " , userName)
  handleSync = async () => {
    console.log("Before Syncing :");
    // SyncDataService.registrationData();
    SyncDataService.followUpData();
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#87CEEB" }}
      >
        <Image
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            marginBottom: 10,
            marginHorizontal: 10,
          }}
          source={require("../assets/profile.png")}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            marginBottom: 10,
            marginHorizontal: 10,
          }}
        >
          {userName}
        </Text>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <Pressable
          onPress={() => {
            handleSync();
          }}
          style={{ paddingVertical: 15, borderColor: "#87CEEB" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="sync" size={24} color="black" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Sync</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <LanguageToggleButton
          onPress={handleLanguageToggle}
          selectedLanguage={selectedLanguage}
        />
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Signout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
