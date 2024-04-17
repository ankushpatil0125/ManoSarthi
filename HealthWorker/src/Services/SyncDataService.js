import SelectService from "../Services/DatabaseServices/SelectService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import InsertService from "../Services/DatabaseServices/InsertService";
import RegisterPatientService from "./RegisterPatientService";
import { Alert } from "react-native";

let v = 0;
const SyncDataService = {
  registrationData: async () => {
    try {
      // console.log("Hello");
      const patients = await SelectService.getAllPatients();

      for (const patient of patients) {
        // console.log("Status: ",patient.status);
        if (patient.status === "1") {
          const SurveyQuestionAnswerData =
            await SelectService.getAllSurveyQuestionAnswersByAabhaId(
              patient.aabhaId
            );
          const MedicalHistoryAnswersData =
            await SelectService.getAllMedicalQuestionAnswersByAabhaId(
              patient.aabhaId
            );
          const sendSurvevyQuestion = [];

          for (const temp of SurveyQuestionAnswerData) {
            const ques = {
              question_ans: temp.answer,
              questionarrie: {
                question_id: temp.question_id,
              },
            };
            sendSurvevyQuestion.push(ques);
          }

          const sendMedicalHistoryAnswers = [];

          for (const temp of MedicalHistoryAnswersData) {
            const ques = {
              question_ans: temp.question_ans,
              medicalquest: {
                question_id: temp.question_id,
              },
            };
            // console.log("ques", ques);
            sendMedicalHistoryAnswers.push(ques);
          }
          // console.log("sendMedicalHistoryAnswers", sendMedicalHistoryAnswers);
          // console.log("SurveyQuestionAnswerData: ", SurveyQuestionAnswerData);
          // console.log("MedicalHistoryAnswersData: ", MedicalHistoryAnswersData);

          const patientData = {
            patient: {
              aabhaId: patient.aabhaId,
              firstname: patient.firstName,
              lastname: patient.lastName,
              email: patient.email,
              gender: patient.gender,
              age: patient.age,
              address: patient.address,
            },
            questionarrieAnsList: sendSurvevyQuestion,
            medicalQueAnsList: sendMedicalHistoryAnswers,
          };
          console.log("patient data", patientData);
          try {
            const response = await RegisterPatientService.addPatient(
              patientData
            );
            console.log("Response : ", response.data);
            if (response) {
              console.log(
                `Patient with name ${patientData.patient.firstname} added successfully`
              );

              const status1 = await DeleteService.deletePatientByAabhaId(
                response.data.aabhaId
              );
              console.log("deletePatientByAabhaId Status ", status1);

              const status2 =
                await DeleteService.deleteSurveyQuestionAnswersByAabhaId(
                  response.data.aabhaId
                );
              console.log(
                "deleteSurveyQuestionAnswersByAabhaId Status ",
                status2
              );

              const status3 =
                await DeleteService.deleteMedicalHistoryAnswersByAabhaId(
                  response.data.aabhaId
                );
              console.log(
                "deleteMedicalHistoryAnswersByAabhaId Status ",
                status3
              );
              v = 1;
            } else {
              console.error("Failed to add patient");
              Alert.alert("Failed to sync data");
            }
          } catch (error) {
            console.error("Error during adding patient:", error);
            Alert.alert("Failed to sync data");
          }
        }
      }
      if (v == 1) Alert.alert("Syncing Completed");
    } catch (error) {
      Alert.alert("Failed to sync data");
      console.error("Error Registering Patient:", error);
      throw error;
    }
  },
};
export default SyncDataService;
