// CreateService.js
import db from "../DatabaseServices/DatabaseServiceInit";

const CreateService = {
  createTables: async () => {
    await CreateService.createPatientDetailsTable();
    await CreateService.createSurveyQuestionTable();
    // Add more table creation functions here if needed
  },

  createPatientDetailsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS PatientDetails (
            aabhaId TEXT,
            firstName TEXT,
            lastName TEXT,
            email TEXT,
            gender TEXT,
            dob TEXT,
            village TEXT,
            register_worker TEXT,
            doctor TEXT,
            address TEXT
          );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("PatientDetails table created successfully");
            } else {
              resolve("PatientDetails table already exists");
            }
          },
          (_, error) => {
            reject("Error creating PatientDetails table: " + error);
          }
        );
      });
    });
  },
  createSurveyQuestionTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS SurveyQuestion (
            question_id INTEGER,
            minage INTEGER,
            maxage INTEGER,
            question TEXT,
            default_ans TEXT,
            type TEXT                       
          );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("SurveyQuestion table created successfully");
            } else {
              resolve("SurveyQuestion table already exists");
            }
          },
          (_, error) => {
            reject("Error creating SurveyQuestion table: " + error);
          }
        );
      });
    });
  },
};

export default CreateService;
