import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { DataTable, Card, Title } from "react-native-paper";
import SelectService from "../Services/DatabaseServices/SelectService";

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
          <Card style={styles.card}>
            <Card.Content>
              {/* <Title style={styles.title}>Follow-up Schedule</Title> */}

              <DataTable>
                <DataTable.Header style={styles.head}>
                  <DataTable.Title>Patient Id</DataTable.Title>
                  <DataTable.Title>First Name</DataTable.Title>
                  <DataTable.Title>Last Name</DataTable.Title>
                  <DataTable.Title>Adress</DataTable.Title>
                  <DataTable.Title>Follow-Up Date</DataTable.Title>
                  <DataTable.Title>Age</DataTable.Title>
                  <DataTable.Title>Follow-Up Type</DataTable.Title>
                  <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>
                {folloupSch
                  .filter((item) => item.type === ftype)
                  .map((item, patientID) => (
                    <DataTable.Row key={patientID} style={styles.row}>
                      <DataTable.Cell>{item.patientId}</DataTable.Cell>
                      <DataTable.Cell>{item.patient_fname}</DataTable.Cell>
                      <DataTable.Cell>{item.patient_lname}</DataTable.Cell>
                      <DataTable.Cell>{item.patient_adress}</DataTable.Cell>
                      <DataTable.Cell>{item.followUpDate}</DataTable.Cell>
                      <DataTable.Cell>{item.age}</DataTable.Cell>

                      <DataTable.Cell>{item.type}</DataTable.Cell>
                      <DataTable.Cell>
                        <Button
                          title="Proceed"
                          onPress={() =>
                            handleCompleteFollowUp(item.age, item.patientId)
                          }
                        />
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
              </DataTable>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export default MissedFollowUpsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10, paddingHorizontal: 30 },
  card: {
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
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  head: { height: 44, backgroundColor: "lightblue" },
  row: { height: 50 },
});
