import React from "react";
import SurveyQuestionsService from "../Services/SurveyQuestionsService";
import MedicalQuestionarrieService from "../Services/MedicalQuestionarrieService";
import InsertService from "./DatabaseServices/InsertService";
import DeleteService from "./DatabaseServices/DeleteService";
import RegisterPatientService from "./RegisterPatientService";
import CreateService from "./DatabaseServices/CreateService";
export const createDatabase = () =>
  new Promise(async (resolve, reject) => {
    try {
      await CreateService.createTables();
      //   console.log("Database and tables initialized successfully.");
      resolve("All tables created successfully");
    } catch (error) {
      //   console.error("Error initializing database:", error);
      // Handle the error here, such as showing a message to the user
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
      // console.log("Abahid Info", aabhaIdInfo);

      if (questionsResponse && medicalQuestionsResponse && AabhaResponse) {
        const questions = questionsResponse.data;
        const medicalQuestions = medicalQuestionsResponse.data;
        const abhaIDTable = AabhaResponse.data;
        console.log("Fetched Survey Questions From Server:", questions);
        console.log("Fetched AbhaId Table From Server: ", abhaIDTable);
        console.log(
          "Fetched Medical Questions From Server: ",
          medicalQuestions
        );

        // Delete old questions from the SurveyQuestion table
        const res1 = await DeleteService.deleteAllSurveyQuestions();
        console.log("Res1- Delete Old Survey Questions: ", res1);

        // Delete old medical questions from the MedicalQuestions table
        const res2 = await DeleteService.deleteAllMedicalQuestions();
        console.log("Res2- Delete Old Medical Questions: ", res2);

        // Delete old medical questions from the MedicalQuestions table
        const res3 = await DeleteService.deleteAllAabhaIdInfo();
        console.log("Res3- Delete Old AabhaId Table: ", res3);

        // Insert fetched questions into the database
        const res4 = await InsertService.insertSurveyQuestion(questions);
        console.log("Res4- New Survey Questions: ", res4);

        // Insert fetched medical questions into the database
        const res5 = await InsertService.insertMedicalQuestions(
          medicalQuestions
        );
        console.log("Res5- New Medical Questions: ", res5);

        // Insert fetched AabhaId Table into the database
        if (abhaIDTable.length > 0) {
          const res6 = await InsertService.insertAabhaIdInfo(
            abhaIDTable,
            "old"
          );
          console.log("Res6- New AabhaIdInfo: ", res6);
        } else {
          console.log("Abha Id table Received from server is Empty");
        }

        // console.log("Abha Id table", abhaIDTable);
        resolve("Login Successfully");
      } else {
        // Handle failure to fetch questions
        console.log("Failed to fetch questions");
        reject("Failed to fetch questions");
      }
    } catch (error) {
      console.error("Error during question insertion:", error);
      // Handle the error here, such as showing a message to the user
      reject("Error during question insertion");
    }
  });
