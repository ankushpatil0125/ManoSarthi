import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import SelectService from '../Services/DatabaseServices/SelectService';
import MedicalQuestionarrieService from '../Services/MedicalQuestionarrieService';
import InsertService from '../Services/DatabaseServices/InsertService';


const MedicalDetails = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [comment, setComment] = useState('');
  const [clickedButtons, setClickedButtons] = useState(Array(questions.length).fill(false));
  const navigation = useNavigation();
  const [medicalQuestions, setMedicalQuestions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    fetchQuestionsFromDatabase();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchQuestionsFromDatabase = async() => {
    try{
      const data = await SelectService.getAllMedicalQuestions();
      setMedicalQuestions(data);
      console.log("Medical Questions", data);
    }
    catch(error){
      console.error("Error fetching from DB: ", error);
    }
  };

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);

    const newClickedButtons = [...clickedButtons];
    newClickedButtons[index] = true;
    setClickedButtons(newClickedButtons);
  };

  // const checkInternetConnectivity = async () => {
  //   try {
  //     const connectionInfo = await NetInfo.fetch();
  //     return connectionInfo.isConnected;
  //   } catch (error) {
  //     console.error('Error checking internet connectivity:', error);
  //     return false;
  //   }
  // };

  const handleFormSubmit = async () => {
    const allQuestionsAnswered = answers.every(answer => answer !== null);
    const commentNotEmpty = comment.trim() !== '';

    if (allQuestionsAnswered && commentNotEmpty) {
      if (isConnected) {
        try {
          // saveDataToDatabase(answers, comment);
          await sendDataToServer(answers, comment);
          console.log('Data submitted to server successfully');
        } catch (error) {
          console.error('Error submitting data to server:', error);
        }
      } else {
          await saveDataToDatabase(answers, comment);
      }
      navigation.navigate('Preview');

    } else {
      Alert.alert(
        'Missing Information',
        'Please answer all questions and provide comments before submitting.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  const sendDataToServer = async (answers, comment) => {
    // const data = [];
    try{
      console.log("Data to be send: ",data);
      // Need to define sendMedicalQuestionarrieAnswers in MedicalQuestionarrieService
      const response = await MedicalQuestionarrieService.sendMedicalQuestionarrieAnswers();
      if(response){
        alert(
          `Medical que, ans sent successfully`
        );
      }else{
        alert(`Failed to send medical que, ans data`);
      }
    }
    catch(error){
      console.error(`Error during sending medical que, ans, ${error}`);
    }
  };

  const saveDataToDatabase = async (answers, comment) => {
   try{
    const res = await InsertService.insertMedicalHistoryAnswers(answers, comment);
    console.log(res);
   }
   catch(error){
    console.error("Error while storing data locally", error);
   }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', paddingTop: 15 }}>
        <Image
          source={require('../assets/saarthi.png')}
          style={{ borderRadius: 8, width: 85, height: 85, borderColor: 'black', borderWidth: 0.8 }}
        />
      </View>
      <View style={{ marginTop: 30, paddingLeft: 10 }}>
        {medicalQuestions.map((question, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text>{question.question}:</Text>
            <View style={{ paddingTop: 5, flexDirection: 'row' }}>
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: clickedButtons[index] && answers[index] === 'Yes' ? 'darkblue' : 'lightblue',
                    padding: 10,
                    borderRadius: 5
                  }}
                  onPress={() => handleAnswerChange(index, 'Yes')}
                >
                  <Text style={{ fontSize: 16 }}>Yes</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: clickedButtons[index] && answers[index] === 'No' ? 'darkblue' : 'lightblue',
                  padding: 10,
                  borderRadius: 5
                }}
                onPress={() => handleAnswerChange(index, 'No')}
              >
                <Text style={{ fontSize: 16 }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text>Comments:</Text>
        <TextInput
          placeholder="Enter your comments here"
          value={comment}
          onChangeText={setComment}
          multiline
          style={{marginTop:5, marginBottom: 10, borderWidth: 1, padding: 10, height: 100, width: '50%' }}
        />
        <View style={{width:200, marginBottom:20}}>
          <TouchableOpacity
            style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 5 }}
            onPress={handleFormSubmit}
          >
            <Text style={{ fontSize: 16 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MedicalDetails;