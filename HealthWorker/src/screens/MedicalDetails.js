import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import SelectService from "../Services/DatabaseServices/SelectService";
import MedicalQuestionarrieService from "../Services/MedicalQuestionarrieService";
import InsertService from "../Services/DatabaseServices/InsertService";
import PatientContext from "../context/PatientContext"; // Import PatientContext here
import * as ImagePicker from "expo-image-picker";
import UpdateService from "../Services/DatabaseServices/UpdateService";

const MedicalDetails = ({ route }) => {
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
  const { age, type } = route.params;
  const [selectedImage, setSelectedImage] = useState(null); // Changed initial value to null

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
      console.log(
        "[MedicalDetailsScreen]Suvery QNA Fetched From Database",
        data2
      );
      const data = await SelectService.getAllMedicalQuestions();
      // setMedicalQuestions(data);
      console.log(
        "[MedicalDetailsScreen]Medical Questions Need To Render: ",
        data
      );
      // Find the index of the question with the "comment" value
      const commentIndex = data.findIndex(
        (medical_question) => medical_question.question === "comment"
      );
      const updatedMedicalQuestions = [
        ...data.slice(0, commentIndex),
        ...data.slice(commentIndex + 1),
      ];
      // commentID = data[commentIndex].question_id;
      setCommentID(data[commentIndex].question_id);
      // console.log("CommentID: ", commentID);
      setMedicalQuestions(updatedMedicalQuestions);
      console.log(
        "[MedicalDetailsScreen]Updated Medical Questions: ",
        medicalQuestions
      );
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
      navigation.navigate("Preview", {
        commentID,
        comment,
        age,
        type,
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
  const takePicture = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // Check if image was not cancelled
        setSelectedImage(result?.assets[0]?.base64); // Update selected image state
        const resUpdate = await UpdateService.updatePatientImage(
          result?.assets[0]?.base64,
          aabhaId
        );
        console.log("resUpdate", resUpdate);
      }
    } catch (error) {
      console.log("Error taking picture:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {medicalQuestions.map((item, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[index] === "yes" && styles.radioButtonSelected,
                ]}
                onPress={() => handleAnswerChange(index, "yes")}
              >
                <Text style={styles.radioButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[index] === "no" && styles.radioButtonSelected,
                ]}
                onPress={() => handleAnswerChange(index, "no")}
              >
                <Text style={styles.radioButtonText}>No</Text>
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
        <View>
          <Button title="Click Picture" onPress={takePicture} />
        </View>
        <View style={styles.imageContainer}>
          {selectedImage && (
            <Image
              source={{ uri: `data:image/png;base64,${selectedImage}` }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} onPress={handleFormSubmit}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: "#3498db",
  },
  radioButtonText: {
    fontSize: 16,
    color: "#000",
  },
  nextButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default MedicalDetails;
