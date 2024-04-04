import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL, token } from "../utils/Constants";
import i18n from "../i18n";
import LanguageToggleButton from "../Multilingual/LanguageButton";
import { useLanguageContext } from "../Context/LanguageProvider";


const LoginScreen = ({ onLoginSuccess }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { selectedLanguage, handleLanguageToggle } = useLanguageContext(); // Accessing selectedLanguage and handleLanguageToggle from LanguageProvider

  const navigation = useNavigation();

  // const handleLanguageToggle = () => {
  //   const newLanguage = selectedLanguage === "en" ? "hi" : "en";
  //   setSelectedLanguage(newLanguage);
  //   i18n.locale = newLanguage;
  // };

  const handleLogin = async () => {
    const user = {
      username: username,
      password: password,
    };
    console.log(user);
    onLoginSuccess();
    // try {
    //   const response = await axios.post(BASE_URL + "auth/login", user, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   if (response) {
    //     console.log(response.data);
    //     Alert.alert("Login Successful");
    //     onLoginSuccess();
    //   } else {
    //     Alert.alert("Login Failure");
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   Alert.alert("Login Failure", "An error occurred during login.");
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center",flex:1,justifyContent:"center"}}>
      <KeyboardAvoidingView>
        {/* Language Toggle Button */}
        <View style={{ marginTop: 10 }}>
          <LanguageToggleButton
            onPress={handleLanguageToggle}
            selectedLanguage={selectedLanguage}
          />
        </View>

        {/* Login to Your Account */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "#007FFF" }}>
            {i18n.t("Login")}
          </Text>
        </View>

        {/* Email */}
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 10 }}
              name="user"
              size={24}
              color="gray"
            />
            <TextInput
              value={username}
              onChangeText={(text) => setUserName(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 280,
                fontSize: 16,
              }}
              placeholder={i18n.t("Enter Your Username")}
            />
          </View>
        </View>

        {/* Password */}
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 10 }}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 280,
                fontSize: 16,
              }}
              placeholder={i18n.t("Enter Your Password")}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            {i18n.t("Forgot Password?")}
          </Text>
        </View>

        <View style={{ marginTop: 80 }}>
          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#007FFF",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
               {i18n.t("Login")}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
