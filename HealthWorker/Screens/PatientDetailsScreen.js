import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import NetInfo from "@react-native-community/netinfo";
import RegisterPatientService from "../Services/RegisterPatientService";
import InsertService from "../Services/DatabaseServices/InsertService";
import SelectService from "../Services/DatabaseServices/SelectService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import PatientContext from "../Context/PatientContext"; // Import PatientContext here

const PatientDetailsScreen = ({ navigation }) => {
  // const [aabhaId, setAabhaId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date()); // Initialize dob with current date
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [patients, setPatients] = useState([]);
  const { aabhaId } = useContext(PatientContext); // Access aabhaId from the context

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Define a function to fetch data from the database
  const fetchDataFromDatabase = async () => {
    try {
      const data = await SelectService.getAllPatients();
      setPatients(data);
      console.log("Patients Fetched from Database: ", patients);
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
    // fetchQuestionsFromDatabase();
    // DeleteService.deleteAllQuestions();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === "ios");
    setDob(currentDate);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !gender || !dob || !address) {
      setFormError("Please fill in all fields");
      return;
    }

    if (isConnected) {
      // Send data to server using POST request
      await sendDataToServer();
      // await storeDataLocally();
    } else {
      // Store data locally in SQLite database
      await storeDataLocally();
    }

    navigation.navigate("QuestionnaireScreen");
  };

  const sendDataToServer = async () => {
    const patientData = {
      aabhaId: aabhaId,
      firstname: firstName,
      lastname: lastName,
      email: email,
      gender: gender,
      dob: dob,
      address: address,
    };
    try {
      // Using axios for the POST request
      console.log("Patient Data", patientData);
      const response = await RegisterPatientService.addPatient(patientData);
      if (response) {
        // Handle successful password change, e.g., display a success message
        alert(`Patient with name ${patientData.firstname} Added Successfully`);
      } else {
        // Handle password change failure
        alert("Failed to Add Patient");
      }
    } catch (error) {
      console.error(`Error during adding Patient:", ${error}`);
    }
  };
  const storeDataLocally = async () => {
    try {
      const patientDetails = {
        aabhaId,
        firstName,
        lastName,
        email,
        gender,
        dob: dob.toISOString(), // Convert date to ISO string
        address,
      };

      const result = await InsertService.insertPatientDetails(patientDetails);
      console.log(result); // Log the result

      // Handle success or error accordingly
    } catch (error) {
      console.error("Error storing data locally:", error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter first name"
        />
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter last name"
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          placeholder="Enter gender"
        />
        <Text style={styles.label}>Date Of Birth:</Text>
        <View>
          <Button
            onPress={() => setShowDatePicker(true)}
            title={dob.toLocaleDateString()} // Display selected date
          />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dob}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={[styles.input]}
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={2}
          placeholder="Enter address"
        />

        {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={
            !firstName || !lastName || !email || !gender || !dob || !address
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: "#000",
  },
  multilineInput: {
    height: 100,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default PatientDetailsScreen;
