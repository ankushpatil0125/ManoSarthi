import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import SelectService from '../Services/DatabaseServices/SelectService';

const Preview = () => {
  const [consentChecked, setConsentChecked] = useState(false);

  const handleCheckboxChange = () => {
    setConsentChecked(!consentChecked);
  };

  const showAlert = () => {
    if (consentChecked) {
      const res = SelectService.getAllMedicalHistoryAnswers();
      console.log("All data entries in medical_history_answers table: ", res);
    } else {
      Alert.alert('Please provide consent!', 'You need to provide consent before submitting.', [{ text: 'OK' }]);
    }
  };

  // Sample patient details
  const patientDetails = {
    name: 'Sanket Patil',
    age: 23,
    mobileNo: '123394949499',
    questionnaireAnswers: [
      { question: 'Past illnesses and surgeries', answer: 'Answer 1' },
      { question: 'Chronic conditions', answer: 'Answer 2' },
      { question: 'Allergies (medications, food, environmental)', answer: 'Answer 3' },
      // Add more medical details questions and answers as needed
    ],
    medicalDetails: [
      { question: 'Past illnesses and surgeries', answer: 'Answer 1' },
      { question: 'Chronic conditions', answer: 'Answer 2' },
      { question: 'Allergies (medications, food, environmental)', answer: 'Answer 3' },
      // Add more medical details questions and answers as needed
    ],
    additionalDetails: {
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
      email: 'example@example.com',
      // Add more personal details as needed
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Preview and Submit</Text>

        <View style={styles.detailsContainer}>
          <Text>Name: {patientDetails.name}</Text>
          <Text>Age: {patientDetails.age}</Text>
          <Text>Mobile No.: {patientDetails.mobileNo}</Text>

          <Text>Questinarrie answers:</Text>
          {patientDetails.questionnaireAnswers.map((detail, index) => (
            <Text key={index}>{detail.question}: {detail.answer}</Text>
          ))}

          <Text>Medical Details:</Text>
          {patientDetails.medicalDetails.map((detail, index) => (
            <Text key={index}>{detail.question}: {detail.answer}</Text>
          ))}

          <Text>Additional Details:</Text>
          {Object.entries(patientDetails.additionalDetails).map(([key, value]) => (
            <Text key={key}>{key}: {value}</Text>
          ))}
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={consentChecked}
            onPress={handleCheckboxChange}
            checkedColor="blue"
            containerStyle={styles.checkbox}
          />
          <Text style={styles.consentText}>Consent of patient</Text>
        </View>

        <TouchableOpacity onPress={showAlert} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  consentText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Preview;