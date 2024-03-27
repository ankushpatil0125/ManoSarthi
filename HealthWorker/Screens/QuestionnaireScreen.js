import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import "../Services/SurveyQuestionsService";
// import SurveyQuestionsService from "../Services/SurveyQuestionsService";

const QuestionnaireScreen = ({ navigation }) => {
  const [surveyquestions, setsurveyquestions] = useState([]);
  // Sample questions
  const questions = [
    "Are you feeling well today?",
    "Did you sleep well last night?",
    "Have you experienced any pain in the last 24 hours?",
    "Did you consume alcohol in the last 24 hours?",
    "Have you taken any medication today?",
    "Did you exercise today?",
    "Have you been following a healthy diet?",
    "Did you experience any stress today?",
    "Have you been smoking recently?",
    "Did you drink enough water today?",
  ];

  // useEffect(() => {
  //   // Fetch district options
  //   SurveyQuestionsService.getQuestions()
  //     .then((response) => {
  //       setsurveyquestions(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching Survey Questions:", error);
  //     });
  // }, []);

  // State to hold the answers for each question
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  // Function to handle radio button selection
  const handleAnswerSelect = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Function to handle navigation to next screen
  const handleNext = () => {
    // Perform any necessary validation before proceeding
    // For example, you can check if all questions are answered
    console.log("Answers: ", answers);
    // Navigate to the next screen
    navigation.navigate("ReferNotRefer");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question}</Text>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[index] === "Yes" && styles.radioButtonSelected,
                ]}
                onPress={() => handleAnswerSelect(index, "Yes")}
              >
                <Text style={styles.radioButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[index] === "No" && styles.radioButtonSelected,
                ]}
                onPress={() => handleAnswerSelect(index, "No")}
              >
                <Text style={styles.radioButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
});

export default QuestionnaireScreen;
