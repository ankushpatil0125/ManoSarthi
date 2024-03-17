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
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = {
        email:email,
        password:password
    };
    Alert.alert("Email " + email + "Password " + password);
    navigation.replace("Main")
    // axios.post("http://localhost:8080/login",user).then((response) => {
    //     console.log(response);
    //     const token = response.data.token;
    //     AsyncStorage.setItem("JWT", token);
    //     navigation.replace("Main");
    // }).catch((error) => {
    //     Alert.alert("Login Failure");
    //     console.log("Login Failure",error);
    // });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../assets/logo.png")}
        />
      </View>
      <KeyboardAvoidingView>
      {/* Login to Your Account */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "#007FFF" }}>
            Login to Your Account
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
            <MaterialIcons
              style={{ marginLeft: 10 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 280,
                fontSize: 16,
              }}
              placeholder="Enter your Email"
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
              placeholder="Enter your Password"
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
            Forgot Password?
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
              Login
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have an Account? <Text style={{color:"#007FFF",fontWeight:500}}>Sign Up</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
