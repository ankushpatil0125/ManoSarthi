import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import SelectService from '../Services/DatabaseServices/SelectService';
import PatientContext from "../Context/PatientContext"; // Import PatientContext here


const Preview = () => {
  const [consentChecked, setConsentChecked] = useState(false);

  const handleCheckboxChange = () => {
    setConsentChecked(!consentChecked);
  };

  const showAlert = async () => {
    if (consentChecked) {
      const res = await SelectService.getAllMedicalHistoryAnswers();
      Alert.alert('Data saved in local DB sucessesfully!', [{ text: 'OK' }]);
      console.log("All data entries in  table: ", res);
    } else {
      Alert.alert('Please provide consent!', 'You need to provide consent before submitting.', [{ text: 'OK' }]);
    }
  };

  const { aabha_id } = useContext(PatientContext); // Access aabhaId from the context

  const patientDetails = {
    name: 'Sanket Patil',
    age: 23,
    mobileNo: '123394949499',

    questionnaireAnswers: [
      { question: 'Past illnesses and surgeries', answer: 'Answer 1' },
      { question: 'Chronic conditions', answer: 'Answer 2' },
      { question: 'Allergies (medications, food, environmental)', answer: 'Answer 3' },
    ],

    medicalDetails: SelectService.getMedicalHistoryAnswers(aabha_id),
    medicalQuestions: SelectService.getAllMedicalQuestions(),

    additionalDetails: {
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
      email: 'example@example.com'
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Preview and Submit</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Patient Details:</Text>
            <Text>Name: {patientDetails.name}</Text>
            <Text>Age: {patientDetails.age}</Text>
            <Text>Mobile No.: {patientDetails.mobileNo}</Text>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Questionnaire Answers:</Text>
            {patientDetails.questionnaireAnswers.map((detail, index) => (
              <Text key={index}>{detail.question}: {detail.answer}</Text>
            ))}
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Medical Details:</Text>
            {patientDetails.medicalDetails.map((detail, index) => (
              <Text key={index}>{patientDetails.medicalQuestions[index].question}: {detail.question_ans}</Text>
            ))}
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Additional Details:</Text>
            {Object.entries(patientDetails.additionalDetails).map(([key, value]) => (
              <Text key={key}>{key}: {value}</Text>
            ))}
          </View>
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
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingLeft:"8%",
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
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