// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Button,
// } from "react-native";
// import SelectService from "../Services/DatabaseServices/SelectService";
// import DeleteService from "../Services/DatabaseServices/DeleteService";
// import { DataTable, Card, Title } from "react-native-paper";
// import { ScrollView } from "react-native";
// import i18n from "../../i18n";
// import { useLanguageContext } from "../context/LanguageProvider";
// import Icon from "react-native-vector-icons/FontAwesome"; // Example: using FontAwesome icons

// const HomeScreen = ({ navigation, route }) => {
//   const [folloupSch, setFolloupSch] = useState([]);
//   const languageContext = useLanguageContext(); // Accessing the entire language context
//   const { nav } = route.params || {};
//   const fetchDataFromDatabase = async () => {
//     try {
//       const patient_data = await SelectService.getAllPatients();
//       // const survey_qna = await SelectService.getAllSurveyQuestionAnswers();
//       // const medical_qna = await SelectService.getMedicalHistoryAnswers();
//       // const aabhaIdInfoData = await SelectService.getAllAabhaIdInfo();
//       const survey_ques = await SelectService.getAllSurveyQuestions();
//       const medical_ques = await SelectService.getAllMedicalQuestions();
//       const prescRes = await SelectService.selectAllPrescriptions();
//       const data = await SelectService.getFollowUpSchedule();
//       setFolloupSch(data);
//       console.log("[HomeScreen]Follow-Up Schedule Need To Render: ", data);

//       console.log("[Homescreen]Patients Fetched From Database: ", patient_data);
//       // console.log("[Homescreen]Survey QNA Fetched From Database: ", survey_qna);
//       // console.log(
//       //   "[Homescreen]Medical QNA Fetched From Database: ",
//       //   medical_qna
//       // );
//       console.log(
//         "[Homescreen]Survey Questions Fetched From Database: ",
//         survey_ques
//       );
//       console.log(
//         "[Homescreen]Medical Questions Fetched From Database: ",
//         medical_ques
//       );
//       console.log(
//         "[Homescreen]Prescriptions Fetched From Database: ",
//         prescRes
//       );
//     } catch (error) {
//       console.error("Error fetching data from database(HomeScreen):", error);
//     }
//   };
//   const fetchFollowUpScedule = async () => {
//     try {
//       const data = await SelectService.getFollowUpSchedule();
//       setFolloupSch(data);
//       console.log("[HomeScreen]Follow-Up Schedule Need To Render: ", data);
//     } catch (error) {
//       console.error("Error fetching data from database:", error);
//     }
//   };
//   useEffect(() => {
//     fetchFollowUpScedule();
//   }, [nav]);
//   const deleteDataFromDatabase = async () => {
//     try {
//       await DeleteService.deleteAllSurveyQuestionAnswers();
//       console.log("All survey Question answer response deleted");
//     } catch (error) {
//       console.error("Error deleting data from database:", error);
//     }
//   };

//   const deleteAllMedicalHistoryAnswers = async () => {
//     try {
//       await DeleteService.deleteAllMedicalHistoryAnswers();
//       console.log("AllMedicalHistoryAnswers deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting AllMedicalHistoryAnswers:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchDataWithDelay = () => {
//       setTimeout(() => {
//         fetchDataFromDatabase();
//         fetchFollowUpScedule();
//       }, 10000); // 3 seconds delay
//     };

//     fetchDataWithDelay();
//     // fetchSurveyQuestionAnswerFromDatabase();
//     // deleteAllMedicalHistoryAnswers();
//   }, []);

//   const handleRegisterPatient = () => {
//     // Navigate or perform action for registering patient
//     navigation.navigate("RegisterPatientScreen");
//   };

//   const handleMissedFollowup = async () => {
//     // Navigate or perform action for missed followup
//     navigation.navigate("MissedFollowupScreen", { ftype: "Missed" });
//   };
//   const handleRefresh = async () => {
//     try {
//       const data = await SelectService.getFollowUpSchedule();
//       setFolloupSch(data);
//       console.log("[HomeScreen]Follow-Up Schedule Need To Render: ", data);
//     } catch (error) {
//       console.error("Error fetching data from database:", error);
//     }
//   };

//   const handleCompleteFollowUp = (age, pid) => {
//     navigation.navigate("QuestionnaireScreen", { type: "followup", age, pid });
//   };

//   return (
//     <ScrollView>
//       <View style={styles.screen}>
//         <View style={styles.topButtonsContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleRegisterPatient}
//           >
//             <Text style={styles.buttonText}>{i18n.t("Register Patient")}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleMissedFollowup}
//           >
//             <Text style={styles.buttonText}>{i18n.t("Missed Followup")}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={{ marginTop: 50 }}>
//         <View style={styles.container}>
//           <Card style={styles.card}>
//             <Card.Content>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: 10,
//                 }}
//               >
//                 <Title style={styles.title}>
//                   {i18n.t("Follow-up Schedule")}
//                 </Title>
//                 <Button title="Refresh" onPress={() => handleRefresh()} />
//               </View>

//               <DataTable>
//                 <DataTable.Header style={styles.head}>
//                   <DataTable.Title>Patient Id</DataTable.Title>
//                   <DataTable.Title>First Name</DataTable.Title>
//                   <DataTable.Title>Last Name</DataTable.Title>
//                   <DataTable.Title>{i18n.t("Address")}</DataTable.Title>
//                   <DataTable.Title>Follow-Up Date</DataTable.Title>
//                   <DataTable.Title>Age</DataTable.Title>
//                   <DataTable.Title>Follow-Up Type</DataTable.Title>
//                   <DataTable.Title>Status</DataTable.Title>
//                   <DataTable.Title>Action</DataTable.Title>
//                 </DataTable.Header>
//                 {folloupSch
//                   .filter((item) => item.type === "Normal")
//                   .map((item, patientID) => (
//                     <DataTable.Row key={patientID} style={styles.row}>
//                       <DataTable.Cell>{item.patientId}</DataTable.Cell>
//                       <DataTable.Cell>{item.patient_fname}</DataTable.Cell>
//                       <DataTable.Cell>{item.patient_lname}</DataTable.Cell>
//                       <DataTable.Cell>{item.patient_adress}</DataTable.Cell>
//                       <DataTable.Cell>{item.followUpDate}</DataTable.Cell>
//                       <DataTable.Cell>{item.age}</DataTable.Cell>
//                       <DataTable.Cell>{item.type}</DataTable.Cell>
//                       {/* <DataTable.Cell>{item.status}</DataTable.Cell> */}
//                       <DataTable.Cell>
//                         {item.status === "Pending" && (
//                           <Icon name="exclamation" size={20} color="orange" />
//                         )}
//                         {item.status === "Completed" && (
//                           <Icon name="check" size={20} color="green" />
//                         )}
//                         {!(
//                           item.status === "Pending" ||
//                           item.status === "Completed"
//                         ) && <Icon name="times" size={20} color="red" />}
//                       </DataTable.Cell>

//                       <DataTable.Cell>
//                         <Button
//                           title="Proceed"
//                           onPress={() =>
//                             handleCompleteFollowUp(item.age, item.patientId)
//                           }
//                         />
//                       </DataTable.Cell>
//                     </DataTable.Row>
//                   ))}
//               </DataTable>
//             </Card.Content>
//           </Card>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     alignItems: "center",
//   },
//   topButtonsContainer: {
//     width: "100%",
//     justifyContent: "space-between",
//     display: "flex",
//     marginTop: "5%",
//     flexDirection: "row",
//     gap: 5,
//     // borderWidth: 1, // Add border to visualize container size
//   },
//   button: {
//     backgroundColor: "#3498db",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     margin: 20,
//     paddingVertical: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   syncButton: {
//     backgroundColor: "#2ecc71",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   syncButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   container: { flex: 1, paddingTop: 10, paddingHorizontal: 30 },
//   card: {
//     elevation: 5,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   title: {
//     marginBottom: 10,
//     textAlign: "center",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   head: { height: 44, backgroundColor: "lightblue" },
//   row: { height: 50 },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import SelectService from "../Services/DatabaseServices/SelectService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import { Card, Title, List, Divider } from "react-native-paper";
import { ScrollView } from "react-native";
import i18n from "../../i18n";
import { useLanguageContext } from "../context/LanguageProvider";
import Icon from "react-native-vector-icons/FontAwesome"; // Example: using FontAwesome icons

const HomeScreen = ({ navigation, route }) => {
  const [followUpSch, setFollowUpSch] = useState([]);
  const languageContext = useLanguageContext(); // Accessing the entire language context
  const { nav } = route.params || {};

  const fetchDataFromDatabase = async () => {
    try {
      const patient_data = await SelectService.getAllPatients();
      // const survey_qna = await SelectService.getAllSurveyQuestionAnswers();
      // const medical_qna = await SelectService.getMedicalHistoryAnswers();
      // const aabhaIdInfoData = await SelectService.getAllAabhaIdInfo();
      const survey_ques = await SelectService.getAllSurveyQuestions();
      const medical_ques = await SelectService.getAllMedicalQuestions();
      const prescRes = await SelectService.selectAllPrescriptions();
      const data = await SelectService.getFollowUpSchedule();
      setFollowUpSch(data);
      console.log("[HomeScreen]Follow-Up Schedule Need To Render: ", data);

      console.log("[Homescreen]Patients Fetched From Database: ", patient_data);
      // console.log("[Homescreen]Survey QNA Fetched From Database: ", survey_qna);
      // console.log(
      //   "[Homescreen]Medical QNA Fetched From Database: ",
      //   medical_qna
      // );
      console.log(
        "[Homescreen]Survey Questions Fetched From Database: ",
        survey_ques
      );
      console.log(
        "[Homescreen]Medical Questions Fetched From Database: ",
        medical_ques
      );
      console.log(
        "[Homescreen]Prescriptions Fetched From Database: ",
        prescRes
      );
    } catch (error) {
      console.error("Error fetching data from database(HomeScreen):", error);
    }
  };

  const fetchFollowUpSchedule = async () => {
    try {
      const data = await SelectService.getFollowUpSchedule();
      setFollowUpSch(data);
      console.log("[HomeScreen]Follow-Up Schedule Need To Render: ", data);
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };
  useEffect(() => {
    const fetchDataWithDelay = () => {
      setTimeout(() => {
        fetchDataFromDatabase();
        fetchFollowUpSchedule();
      }, 8000); // 3 seconds delay
    };

    fetchDataWithDelay();
  }, []);
  useEffect(() => {
    if (nav) {
      fetchFollowUpSchedule();
    }
  }, [nav]);

  const handleRegisterPatient = () => {
    navigation.navigate("RegisterPatientScreen");
  };

  const handleMissedFollowup = () => {
    navigation.navigate("MissedFollowupScreen", { ftype: "Missed" });
  };

  const handleRefresh = async () => {
    fetchFollowUpSchedule();
  };

  const handleCompleteFollowUp = (age, pid) => {
    navigation.navigate("QuestionnaireScreen", { type: "followup", age, pid });
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegisterPatient}
          >
            <Text style={styles.buttonText}>{i18n.t("Register Patient")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleMissedFollowup}
          >
            <Text style={styles.buttonText}>{i18n.t("Missed Followup")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 50 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title style={[styles.title, { color: "black" }]}>
              {i18n.t("Follow-up Schedule")}
            </Title>
            <TouchableOpacity onPress={handleRefresh}>
              <Icon name="refresh" size={30} color="black" />
            </TouchableOpacity>
          </View>
          {followUpSch
            .filter((item) => item.type === "Normal")
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
                      // <Icon name="exclamation" size={30} color="orange" />
                      <>
                        <Icon name="exclamation" size={30} color="orange" />
                        <Text
                          style={{
                            fontSize: 18,
                            color: "orange",
                            marginLeft: 10,
                          }}
                        >
                          {item.status}
                        </Text>
                      </>
                    )}
                    {item.status === "Completed" && (
                      // <Icon name="check" size={30} color="green" />
                      <>
                        <Icon name="check" size={30} color="green" />
                        <Text
                          style={{
                            fontSize: 18,
                            color: "green",
                            marginLeft: 10,
                          }}
                        >
                          {item.status}
                        </Text>
                      </>
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
                    {/* <Text
                      style={{ fontSize: 18, color: "red", marginLeft: 10 }}
                    >
                      {item.status}
                    </Text> */}
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

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
    marginTop: 10,
    color: "red",

    marginBottom: 20,
  },
  topButtonsContainer: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    marginTop: "5%",
    flexDirection: "row",
    gap: 5,
  },
  button: {
    backgroundColor: "#3498db",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 20,
    paddingVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
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
