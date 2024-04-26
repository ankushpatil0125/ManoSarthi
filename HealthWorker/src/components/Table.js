import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Button } from "react-native";
import { DataTable, Card, Title } from "react-native-paper";
import { useLanguageContext } from "../context/LanguageProvider";
import i18n from "../../i18n";
import SelectService from "../Services/DatabaseServices/SelectService";

const Table = ({ navigation }) => {
  const [folloupSch, setFolloupSch] = useState([]);

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
        fetchFollowUpScedule();
      }, 5000); // 3 seconds delay
    };

    fetchDataWithDelay();
    // fetchSurveyQuestionAnswerFromDatabase();
    // deleteAllMedicalHistoryAnswers();
  }, []);
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{i18n.t("Follow-up Schedule")}</Title>

          <DataTable>
            <DataTable.Header style={styles.head}>
              <DataTable.Title>Follow-Up Id</DataTable.Title>
              <DataTable.Title>First Name</DataTable.Title>
              <DataTable.Title>Last Name</DataTable.Title>
              <DataTable.Title>Adress</DataTable.Title>
              <DataTable.Title>Follow-Up Date</DataTable.Title>
              <DataTable.Title>Age</DataTable.Title>
             <DataTable.Title>Follow-Up Type</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            {folloupSch.map((item, followup_id) => (
              <DataTable.Row key={followup_id} style={styles.row}>
                <DataTable.Cell>{item.followup_id}</DataTable.Cell>
                <DataTable.Cell>{item.patient_fname}</DataTable.Cell>
                <DataTable.Cell>{item.patient_lname}</DataTable.Cell>
                <DataTable.Cell>{item.patient_adress}</DataTable.Cell>
                <DataTable.Cell>{item.followUpDate}</DataTable.Cell>
                <DataTable.Cell>{item.age}</DataTable.Cell>

                <DataTable.Cell>{item.type}</DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    title="Proceed"
                    onPress={() => handleCompleteFollowUp(item.followup_id)}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
    </View>
  );
};
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
export default Table;
