// CreateService.js
import db from "../DatabaseServices/DatabaseServiceInit"

const CreateService = {
  createTables: async () => {
    await CreateService.createPatientDetailsTable();
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
  }
  ,
  createSurveyQuestionTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS SurveyQuestion (
            aabhaId TEXT,
                       
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
  }
};

export default CreateService;
