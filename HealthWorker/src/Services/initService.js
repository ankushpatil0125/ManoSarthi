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
      console.log("Inside FetchData");

      // Fetch questions from the service
      const questionsResponse = await SurveyQuestionsService.getQuestions();
      const medicalQuestionsResponse =
        await MedicalQuestionarrieService.getMedicalQuestionarrie();
      const AabhaResponse = await RegisterPatientService.getAabhaIdTable();
      const followUpRes = await FetchFollowUp.getFollowUpSchedule();
      const PrescriptionResponse =
        await PrescriptionService.getAllPrescriptions();
      if (
        questionsResponse &&
        medicalQuestionsResponse &&
        AabhaResponse &&
        followUpRes &&
        PrescriptionResponse
      ) {
        const questions = questionsResponse.data;
        const medicalQuestions = medicalQuestionsResponse.data;
        const abhaIDTable = AabhaResponse.data;
        const followupTable = followUpRes.data;
        const prescriptionTable = PrescriptionResponse.data;

        prescriptionTable.map((pres) => {
          pres.medicine = JSON.stringify(pres.medicine);
          pres.disease_code = JSON.stringify(pres.disease_code);
        });

        console.log("Fetched Survey Questions From Server:", questions);
        console.log("Fetched AbhaId Table From Server: ", abhaIDTable);
        console.log(
          "Fetched Medical Questions From Server: ",
          medicalQuestions
        );
        console.log("Fetched FollowUp Schedule From Server: ", followupTable);
        console.log("Fetched Prescriptions From Server: ", prescriptionTable);

        // Delete old entries from the tables
        try {
          console.log("Before Deleting");
          const deleteResults = await Promise.all([
            DeleteService.deleteAllSurveyQuestions(),
            DeleteService.deleteAllMedicalQuestions(),
            DeleteService.deleteAllAabhaIdInfo(),
            DeleteService.deleteFollowUpTable(),
            DeleteService.deleteAllPrescriptions(),
          ]);
          deleteResults.forEach((result, index) => {
            console.log(result);
          });
        } catch (deleteError) {
          console.error("Error deleting old entries:", deleteError);
          reject("Failed to delete old entries");
          return;
        }
        console.log("Before inserting tables data");
        // Insert fetched data into the tables
        try {
          const insertResults = await Promise.all([
            InsertService.insertSurveyQuestion(questions),
            InsertService.insertMedicalQuestions(medicalQuestions),
            InsertService.insertAabhaIdInfo(abhaIDTable, "old"),
            InsertService.insertFollowUpTable(followupTable),
            InsertService.insertPrescriptionTable(prescriptionTable),
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
        // console.log("Inserted Parsed Prescriptions in a table: ", JSON.parse(insertedPres[0]?.disease_code));
      } else {
        console.log("Failed to fetch required data");
        reject("Failed to fetch required data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      reject("Error fetching data");
    }
  });
