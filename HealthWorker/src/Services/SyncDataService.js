import SelectService from "../Services/DatabaseServices/SelectService";
import DeleteService from "../Services/DatabaseServices/DeleteService";
import InsertService from "../Services/DatabaseServices/InsertService";
import RegisterPatientService from "./RegisterPatientService";
import { Alert } from "react-native";
import FollowupService from "./FollowupService";

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
                response.data
              );
              console.log("deletePatientByAabhaId Status ", status1);

              const status2 =
                await DeleteService.deleteSurveyQuestionAnswersByAabhaId(
                  response.data
                );
              console.log(
                "deleteSurveyQuestionAnswersByAabhaId Status ",
                status2
              );

              const status3 =
                await DeleteService.deleteMedicalHistoryAnswersByAabhaId(
                  response.data
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

  followUpData: async () => {
    // const [list, SetList] = useState([]);

    console.log("Inside Followup Sync:");
   
    const followpatients = await SelectService.selectFollowUpReferNotRefer();
    console.log("Sync Service:followpatients: ", followpatients);
    const lst = [];
    for (const followup of followpatients) {
      let status = followup.status === 1 ? "true" : "false";
      const followupQNA =
        await SelectService.getAllFollowUpQuestionAnswersByPID(
          followup.patientId
        );

      console.log("Followup QNA Recieved: ", followupQNA);

      const sendFollowupQNA = [];
      for (const temp of followupQNA) {
        const ques = {
          question_ans: temp.answer,
          questionarrie: {
            question_id: temp.question_id,
          },
        };
        sendFollowupQNA.push(ques);
      }

      console.log("FollowUPQNA to send: ", sendFollowupQNA);

      const dataToSend = {
        patientID: followup.patientId,
        questionarrieAnsList: sendFollowupQNA,
        referredDuringFollowUp: status,
        latitude: followup.latitude,
        longitude: followup.longitude,
      };

      console.log("Data Send To Server For Followup: ", dataToSend);


      try {
        const response = await FollowupService.addPatientFollowup(dataToSend);
        console.log("Response : ", response.data);

        if (response.data != -1) {
          console.log(`Followup with added successfully`);

          const status1 = await DeleteService.deleteFollowupReferNotReferByPID(
            response.data
          );
          console.log("followupReferNotRefer Status ", status1);

          const status2 = await DeleteService.deleteFolloupScheduleByPID(
            response.data
          );
          console.log("FollowUpSchedule Status ", status2);

          const status3 = await DeleteService.deleteFolloupQuestionAnswersByPID(
            response.data
          );
          console.log("FollowUpQuestionAnswer Status ", status3);
        } else {
          lst.push(followup.patientId);
          console.error("Failed to add patient");
          Alert.alert("Failed to sync data");
          console.log(lst[0]);
        }
      } catch (error) {
        console.error("Error during adding patient:", error.data);
        Alert.alert("Failed to sync data");
      }
    }
    // SetList(lst);

  },
};
export default SyncDataService;
