import React, { useState, useContext } from "react";
import PatientContext from "../Context/PatientContext";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

function RegisterPatientScreen({ navigation }) {
  const [abhaId, setAbhaId] = useState("");
  const { setAabhaId } = useContext(PatientContext); // Accessing setAabhaId from context


  const handleRegister = () => {
    if (abhaId.trim() === "") {
      Alert.alert("Error", "Please enter ABHA ID");
      return;
    }
    setAabhaId(abhaId); // Setting the value of aabhaId in context
    // Perform registration logic here...
    console.log("ABHA ID registered:", abhaId);
    navigation.navigate("PatientDetailsScreen");
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Register Patient</Text> */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter ABHA ID:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setAbhaId(value)}
          value={abhaId}
          placeholder="ABHA ID"
          placeholderTextColor="#666"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
