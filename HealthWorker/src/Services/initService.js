import React from "react";
import SurveyQuestionsService from "../Services/SurveyQuestionsService";
import MedicalQuestionarrieService from "../Services/MedicalQuestionarrieService";
import InsertService from "./DatabaseServices/InsertService";
import DeleteService from "./DatabaseServices/DeleteService";
import RegisterPatientService from "./RegisterPatientService";
import CreateService from "./DatabaseServices/CreateService";
import FetchFollowUp from "./FetchFollowUp";
import PrescriptionService from "./PrescriptionService";
import SelectService from "./DatabaseServices/SelectService";

export const createDatabase = () =>
  new Promise(async (resolve, reject) => {
    try {
      await CreateService.createTables();
      resolve("All tables created successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
      reject("Failed to create database");
    }
  });

export const fetchData = () =>
  new Promise(async (resolve, reject) => {
    try {
      // Fetch questions from the service
      const questionsResponse = await SurveyQuestionsService.getQuestions();
      const medicalQuestionsResponse =
        await MedicalQuestionarrieService.getMedicalQuestionarrie();
      const AabhaResponse = await RegisterPatientService.getAabhaIdTable();
      const followUpRes = await FetchFollowUp.getFollowUpSchedule();
      const prescriptionsRes = await PrescriptionService.getAllPrescriptions();
      if (
        questionsResponse &&
        medicalQuestionsResponse &&
        AabhaResponse &&
        followUpRes &&
        prescriptionsRes
      ) {
        const questions = questionsResponse.data;
        const medicalQuestions = medicalQuestionsResponse.data;
        const abhaIDTable = AabhaResponse.data;
        const followupTable = followUpRes.data;
    //    const prescriptionsTable = [{
    //       "aabhaId" : 2,
    //       "prescription_id": 2,
    //       "patient_fname": "Ankush",
    //       "patient_lname": "Patil",
    //       "patient_age": 25,
    //       "patient_adress": "rabver",
    //       "patient_village_name": "Sadalaga (Rural)",
    //       "disease_code": [
    //           {
    //               "code": "F10121",
    //               "diseaseSubCategory": {
    //                   "code": "F10",
    //                   "diseaseCategory": {
    //                       "code": "F10-F19",
    //                       "name": "Mental and behavioral disorders due to psychoactive substance use"
    //                   },
    //                   "diseaseName": "Alcohol related disorders"
    //               },
    //               "shortDescription": "Alcohol abuse with intoxication delirium",
    //               "longDescription": "Alcohol abuse with intoxication delirium"
    //           },
    //           {
    //               "code": "F6812",
    //               "diseaseSubCategory": {
    //                   "code": "F68",
    //                   "diseaseCategory": {
    //                       "code": "F60-F69",
    //                       "name": "Disorders of adult personality and behavior"
    //                   },
    //                   "diseaseName": "Other disorders of adult personality and behavior"
    //               },
    //               "shortDescription": "Factit disord impsd on self, with predom physcl signs/symp",
    //               "longDescription": "Factitious disorder imposed on self, with predominantly physical signs and symptoms"
    //           },
    //           {
    //               "code": "F1011",
    //               "diseaseSubCategory": {
    //                   "code": "F10",
    //                   "diseaseCategory": {
    //                       "code": "F10-F19",
    //                       "name": "Mental and behavioral disorders due to psychoactive substance use"
    //                   },
    //                   "diseaseName": "Alcohol related disorders"
    //               },
    //               "shortDescription": "Alcohol abuse, in remission",
    //               "longDescription": "Alcohol abuse, in remission"
    //           }
    //       ],
    //       "treatment": "given medicines",
    //       "medicine": [
    //           {
    //               "id": 1,
    //               "name": "asdf",
    //               "dosage": "asdf",
    //               "timing": "asdf"
    //           },
    //           {
    //               "id": 2,
    //               "name": "asdf",
    //               "dosage": "asdf",
    //               "timing": "asdf"
    //           }
    //       ],
    //       "date": "20-Apr-2024"
    //   }, 
    //   {
    //     "aabhaId" : 1,
    //     "prescription_id": 1,
    //     "patient_fname": "Ankush",
    //     "patient_lname": "Patil",
    //     "patient_adress": "rabver",
    //     "patient_age": 25,
    //     "patient_village_name": "Sadalaga (Rural)",
    //     "disease_code": [
    //         {
    //             "code": "F10121",
    //             "diseaseSubCategory": {
    //                 "code": "F10",
    //                 "diseaseCategory": {
    //                     "code": "F10-F19",
    //                     "name": "Mental and behavioral disorders due to psychoactive substance use"
    //                 },
    //                 "diseaseName": "Alcohol related disorders"
    //             },
    //             "shortDescription": "Alcohol abuse with intoxication delirium",
    //             "longDescription": "Alcohol abuse with intoxication delirium"
    //         },
    //         {
    //             "code": "F6812",
    //             "diseaseSubCategory": {
    //                 "code": "F68",
    //                 "diseaseCategory": {
    //                     "code": "F60-F69",
    //                     "name": "Disorders of adult personality and behavior"
    //                 },
    //                 "diseaseName": "Other disorders of adult personality and behavior"
    //             },
    //             "shortDescription": "Factit disord impsd on self, with predom physcl signs/symp",
    //             "longDescription": "Factitious disorder imposed on self, with predominantly physical signs and symptoms"
    //         },
    //         {
    //             "code": "F1011",
    //             "diseaseSubCategory": {
    //                 "code": "F10",
    //                 "diseaseCategory": {
    //                     "code": "F10-F19",
    //                     "name": "Mental and behavioral disorders due to psychoactive substance use"
    //                 },
    //                 "diseaseName": "Alcohol related disorders"
    //             },
    //             "shortDescription": "Alcohol abuse, in remission",
    //             "longDescription": "Alcohol abuse, in remission"
    //         }
    //     ],
    //     "treatment": "given medicines",
    //     "medicine": [
    //         {
    //             "id": 1,
    //             "name": "asdf",
    //             "dosage": "asdf",
    //             "timing": "asdf"
    //         },
    //         {
    //             "id": 2,
    //             "name": "asdf",
    //             "dosage": "asdf",
    //             "timing": "asdf"
    //         }
    //     ],
    //     "date": "20-Apr-2024"
    // }];
          const prescriptionsTable = prescriptionsRes.data;
          prescriptionsTable.map((pres) => {
          pres.medicine =  JSON.stringify(pres.medicine)
          pres.disease_code =  JSON.stringify(pres.disease_code)  
        })
        console.log("Fetched Survey Questions From Server:", questions);
        console.log("Fetched AbhaId Table From Server: ", abhaIDTable);
        console.log("Fetched prescriptions Table From Server: ", prescriptionsTable);
        console.log(
          "Fetched Medical Questions From Server: ",
          medicalQuestions
        );
        console.log("Fetched FollowUp Schedule From Server: ", followupTable);

        // Delete old entries from the tables
        try {
          const deleteResults = await Promise.all([
            DeleteService.deleteAllSurveyQuestions(),
            DeleteService.deleteAllMedicalQuestions(),
            DeleteService.deleteAllAabhaIdInfo(),
            DeleteService.deleteFollowUpTable(),
          ]);
          deleteResults.forEach((result, index) => {
            console.log(result);
          });
        } catch (deleteError) {
          console.error("Error deleting old entries:", deleteError);
          reject("Failed to delete old entries");
          return;
        }

        // Insert fetched data into the tables
        try {
          const insertResults = await Promise.all([
            InsertService.insertSurveyQuestion(questions),
            InsertService.insertMedicalQuestions(medicalQuestions),
            InsertService.insertAabhaIdInfo(abhaIDTable, "old"),
            InsertService.insertFollowUpTable(followupTable),
            InsertService.insertPrescriptions(prescriptionsTable),
          ]);
          insertResults.forEach((result, index) => {
            console.log(result);
          });
        } catch (insertError) {
          console.error("Error inserting new data:", insertError);
          reject("Failed to insert new data");
          return;
        }

        resolve("Data fetched and inserted successfully");
        const insertedPres = await SelectService.getAllPrescriptions();
        console.log("Inserted Prescriptions in a table: ", insertedPres);
        console.log("Inserted Parsed Prescriptions in a table: ", JSON.parse(insertedPres[0].disease_code));
      } else {
        console.log("Failed to fetch required data");
        reject("Failed to fetch required data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      reject("Error fetching data");
    }
  });
