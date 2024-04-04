import React, { useState, useContext } from "react";
import { KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,Platform } from "react-native";
import PatientContext from "../Context/PatientContext";

function RegisterPatientScreen({ navigation }) {
  const [abhaId, setAbhaId] = useState("");
  const { setAabhaId } = useContext(PatientContext);

  const handleRegister = () => {
    if (abhaId.trim() === "") {
      Alert.alert("Error", "Please enter ABHA ID");
      return;
    }
    setAabhaId(abhaId);
    console.log("ABHA ID registered:", abhaId);
    navigation.navigate("PatientDetailsScreen");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Offset to adjust for navigation bar height
    >

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter ABHA ID:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            // Check if the entered value contains only numeric characters
            if (/^\d+$/.test(value)) {
              // If it contains only numeric characters, update the state
              setAbhaId(value);
            }
          }}          
          value={abhaId}
          placeholder="ABHA ID"
          placeholderTextColor="#666"
          autoFocus // Automatically focus on input when the screen mounts
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
    width: "75%",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterPatientScreen;
