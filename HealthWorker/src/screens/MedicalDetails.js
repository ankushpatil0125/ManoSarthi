import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import SelectService from "../Services/DatabaseServices/SelectService";
import MedicalQuestionarrieService from "../Services/MedicalQuestionarrieService";
import InsertService from "../Services/DatabaseServices/InsertService";
import PatientContext from "../context/PatientContext"; // Import PatientContext here

const MedicalDetails = ({route}) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [comment, setComment] = useState("");
  const [clickedButtons, setClickedButtons] = useState(
    Array(questions.length).fill(false)
  );
  const navigation = useNavigation();
  const [medicalQuestions, setMedicalQuestions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const { aabhaId } = useContext(PatientContext); // Access aabhaId from the context
  // var commentID;
  const [commentID, setCommentID] = useState(0);
  const {age} = route.params;

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

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
      const data2 = await SelectService.getAllSurveyQuestionAnswers();
      console.log("[MedicalDetailsScreen]Suvery QNA Fetched From Database",data2);
      const data = await SelectService.getAllMedicalQuestions();
      // setMedicalQuestions(data);
      console.log("[MedicalDetailsScreen]Medical Questions Need To Render: ", data);
      // Find the index of the question with the "comment" value
      const commentIndex = data.findIndex(medical_question => medical_question.question === "comment");
      const updatedMedicalQuestions = [...data.slice(0, commentIndex), ...data.slice(commentIndex + 1)];
      // commentID = data[commentIndex].question_id;
      setCommentID(data[commentIndex].question_id);
      // console.log("CommentID: ", commentID);
      setMedicalQuestions(updatedMedicalQuestions);
      console.log("[MedicalDetailsScreen]Updated Medical Questions: ", medicalQuestions);
    } catch (error) {
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
    const allQuestionsAnswered = answers.every((answer) => answer !== null);
    const commentNotEmpty = comment.trim() !== "";

    if (allQuestionsAnswered && commentNotEmpty) {
      if (isConnected) {
        try {
          await saveDataToDatabase(answers, comment);
          // await sendDataToServer(answers, comment);
          console.log("Medical QNA Stored Successfully");
        } catch (error) {
          console.error("Error submitting data to server:", error);
        }
      } else {
        await saveDataToDatabase(answers, comment);
      }
      navigation.navigate('Preview', {
        commentID,
        comment,
        age
      });

    } else {
      Alert.alert(
        "Missing Information",
        "Please answer all questions and provide comments before submitting.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };


  const saveDataToDatabase = async (answers, comment) => {
    try {
      const res = await InsertService.insertMedicalHistoryAnswers(
        medicalQuestions,
        answers,
        comment,
        commentID,
        aabhaId
      );
      // console.log("[MedicalDetailsScreen]",res);
    } catch (error) {
      console.error("Error While Storing Data Locally", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1}}>
      <View style={{ flex:1,marginTop: 30, paddingLeft: 10,}}>
        {medicalQuestions.map((question, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text>{question.question}</Text>
            <View style={{ paddingTop: 5,flexDirection:'row',}}>
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity
                  style={{
                    
                    backgroundColor:
                      clickedButtons[index] && answers[index] === "Yes"
                        ? "#3498db"
                        : "lightblue",
                    padding: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => handleAnswerChange(index, "Yes")}
                >
                  <Text style={{ fontSize: 16 }}>Yes</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    clickedButtons[index] && answers[index] === "No"
                      ? "#3498db"
                      : "lightblue",
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => handleAnswerChange(index, "No")}
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
          style={{
            marginTop: 5,
            marginBottom: 10,
            borderWidth: 1,
            padding: 10,
            height: 100,
            width: "50%",
          }}
        />
        <View style={{ width: 200, marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
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
