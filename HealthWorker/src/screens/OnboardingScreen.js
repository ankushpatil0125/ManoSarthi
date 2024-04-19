import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#20315F" }}>
          Hello
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../assets/image.png")}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          backgroundColor: "#AD40AF",
          padding: 20,
          width: "90%",
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#fff" }}>
          Lets Explore
        </Text>
        <Ionicons name="arrow-forward" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default OnboardingScreen;

const styles = StyleSheet.create({});
