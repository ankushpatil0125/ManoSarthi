import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RegisterPatientService from "../Services/RegisterPatientService";
import SelectService from "../Services/DatabaseServices/SelectService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
// const [sendPatient, setSendPatient] = useState([]);

const syncData = async () => {
  try {
    const patients = await SelectService.getAllPatients();

    for (const patient of patients) {
      const patientData = 
        {
          aabhaId: patient.aabhaId,
          firstname: patient.firstName,
          lastname: patient.lastName,
          email: patient.email,
          gender: patient.gender,
          dob: patient.dob,
          village: {
            code: patient.village,
          },
          register_worker: {
            id: patient.register_worker,
          },
          doctor: {
            id: patient.doctor,
          },
          address: patient.address,
        }
      ;

      try {
        const response = await RegisterPatientService.addPatient(patientData);
        console.log("Response : ",
          response.data 
        );
        if (response) {

          console.log(
            `Patient with name ${patientData.firstname} added successfully`
          );
          const status = await DeleteService.deletePatientByAabhaId(response.data.aabhaId);
          console.log("status ",status);
        
        } else {
          console.error("Failed to add patient");
        }
      } catch (error) {
        console.error("Error during adding patient:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching patient data:", error);
  }
};

function HomeScreen({ navigation }) {
  const [patients, setPatients] = useState([]);

  const fetchDataFromDatabase = async () => {
    try {
      const data = await SelectService.getAllPatients();
      setPatients(data);
      console.log("Homescreen Patients: ", data);
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
    //  DeleteService.deleteAllPatients();
    
  }, []);

  const handleRegisterPatient = () => {
    // Navigate or perform action for registering patient
    navigation.navigate("RegisterPatientScreen");
  };

  const handleMissedFollowup = () => {
    // Navigate or perform action for missed followup
  };

  const handleSync = () => {
    syncData();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegisterPatient}>
          <Text style={styles.buttonText}>Register Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMissedFollowup}>
          <Text style={styles.buttonText}>Missed Followup</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.syncButton} onPress={handleSync}>
        <Text style={styles.syncButtonText}>Sync</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  topButtonsContainer: {
    width: "70%",
    justifyContent: "space-between",

    marginTop: "5%",
    flexDirection: "row",

    // borderWidth: 1, // Add border to visualize container size
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  syncButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  syncButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
