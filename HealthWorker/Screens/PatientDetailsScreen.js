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
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import NetInfo from "@react-native-community/netinfo";
import RegisterPatientService from "../Services/RegisterPatientService";
import InsertService from "../Services/DatabaseServices/InsertService";
import SelectService from "../Services/DatabaseServices/SelectService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import PatientContext from "../Context/PatientContext"; // Import PatientContext here

const PatientDetailsScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [patients, setPatients] = useState([]);
  const { aabhaId } = useContext(PatientContext);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      const data = await SelectService.getAllPatients();
      const aabhaIdInfoData = await SelectService.getAllAabhaIdInfo();
      console.log("AabhaId Fetched From Data: ", aabhaIdInfoData);
      setPatients(data);
      console.log("Patients Fetched from Database: ", patients);
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  // const handleDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || dob;
  //   setShowDatePicker(Platform.OS === "ios");
  //   setDob(currentDate);
  // };

  const handleSubmit = async () => {
    
    if (!firstName || !lastName || !email || !gender || !age || !address) {
      setFormError("Please fill in all fields");
      return;
    }

    if (isConnected) {
      console.log(firstName+" "+lastName+" "+email+" "+age+" "+address+" "+gender);
      await storeDataLocally();

    } else {
      await storeDataLocally();
    }
    navigation.navigate("QuestionnaireScreen");
  };

  const storeDataLocally = async () => {
    try {
      const patientDetails = {
        aabhaId,
        firstName,
        lastName,
        email,
        gender,
        age,
        address,
      };

      const result = await InsertService.insertPatientDetails(patientDetails);
      console.log(result);
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
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              gender === "male" && styles.selectedGender,
            ]}
            onPress={() => setGender("male")}
          >
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderOption,
              gender === "female" && styles.selectedGender,
            ]}
            onPress={() => setGender("female")}
          >
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderOption,
              gender === "other" && styles.selectedGender,
            ]}
            onPress={() => setGender("other")}
          >
            <Text style={styles.genderText}>Other</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Age</Text>
        {/* <View style={{alignItems:"center",justifyContent:"center"}}>
          {true && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dob}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View> */}
        <View  style={{alignItems:"center",justifyContent:"center"}}>
        {/* <Text style={styles.label}>Enter AGE:</Text> */}
        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            // Check if the entered value contains only numeric characters
            if (/^\d+$/.test(value)) {
              // If it contains only numeric characters, update the state
              setAge(value);
            }
          }}          
          value={age}
          placeholder="AGE"
          placeholderTextColor="#666"
          autoFocus // Automatically focus on input when the screen mounts
          keyboardType="numeric"
        />
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
            !firstName || !lastName || !email || !gender || !age || !address
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: "#000",
    width: "100%",
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderOption: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  selectedGender: {
    backgroundColor: "#3498db",
  },
  genderText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 16,
  },
});

export default PatientDetailsScreen;
