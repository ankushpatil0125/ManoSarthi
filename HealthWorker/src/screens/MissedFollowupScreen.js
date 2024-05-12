import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DataTable, Card, Title } from "react-native-paper";
import SelectService from "../Services/DatabaseServices/SelectService";
import Icon from "react-native-vector-icons/FontAwesome"; // Example: using FontAwesome icons

const MissedFollowUpsScreen = ({ route, navigation }) => {
  const [folloupSch, setFolloupSch] = useState([]);

  const { ftype } = route.params;

  const handleCompleteFollowUp = (age, pid) => {
    navigation.navigate("QuestionnaireScreen", { type: "followup", age, pid });
  };

  const fetchFollowUpScedule = async () => {
    try {
      const data = await SelectService.getFollowUpSchedule();
      setFolloupSch(data);
      console.log("[HomeScreen]Follow-Up Schedule Need To Render: ", data);
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };
  useEffect(() => {
    const fetchDataWithDelay = () => {
      setTimeout(() => {
        // fetchDataFromDatabase();
        fetchFollowUpScedule();
      }, 1000); // 3 seconds delay
    };

    fetchDataWithDelay();
    // fetchSurveyQuestionAnswerFromDatabase();
    // deleteAllMedicalHistoryAnswers();
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: 10 }}>
          Missed FollowUps
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <View style={styles.container}>
          {folloupSch
            .filter((item) => item.type === ftype)
            .map((item, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <View style={styles.row}>
                    <Text style={styles.label}>First Name:</Text>
                    <Text>{item.patient_fname}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Last Name:</Text>
                    <Text>{item.patient_lname}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Address:</Text>
                    <Text>{item.patient_adress}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Follow-Up Date:</Text>
                    <Text>{item.followUpDate}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.label, { fontSize: 16 }]}>
                      Status:
                    </Text>
                    {item.status === "Pending" && (
                      <Icon name="exclamation" size={30} color="orange" />
                    )}
                    {item.status === "Completed" && (
                      <Icon name="check" size={30} color="green" />
                    )}
                    {!(
                      item.status === "Pending" || item.status === "Completed"
                    ) && (
                      <>
                        <Icon name="times" size={30} color="red" />
                        <Text
                          style={{ fontSize: 18, color: "red", marginLeft: 10 }}
                        >
                          {item.status}
                        </Text>
                      </>
                    )}
                  </View>
                  <Button
                    title="Proceed"
                    onPress={() =>
                      handleCompleteFollowUp(item.age, item.patientId)
                    }
                  />
                </Card.Content>
              </Card>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MissedFollowUpsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10, paddingHorizontal: 30 },
  card: {
    marginBottom: 20,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
});
