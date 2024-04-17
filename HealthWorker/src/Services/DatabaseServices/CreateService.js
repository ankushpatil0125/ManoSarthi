// CreateService.js
import { Alert } from "react-native";
import db from "../DatabaseServices/DatabaseServiceInit";

const CreateService = {
  createTables: async () => {
    await CreateService.createPatientDetailsTable();
    await CreateService.createSurveyQuestionTable();
    await CreateService.createMedicalQuestionTable();
    await CreateService.createMedicalHistoryAnswersTable();
    await CreateService.createSurveyQuestionAnswerTable();
    await CreateService.createAabhaIdInfoTable();
    // Add more table creation functions here if needed
    
  },
  createAabhaIdInfoTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS AabhaIdInfo (
            aabhaId TEXT PRIMARY KEY,
            status TEXT
          );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("AabhaIdInfo table created successfully");
            } else {
              resolve("AabhaIdInfo table already exists");
            }
          },
          (_, error) => {
            reject("Error creating AabhaIdInfo table: " + error);
          }
        );
      });
    });
  },

  createPatientDetailsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS PatientDetails (
            aabhaId TEXT PRIMARY KEY,
            firstName TEXT,
            lastName TEXT,
            email TEXT,
            gender TEXT,
            age INTEGER,
            address TEXT,
            status TEXT DEFAULT "0" NOT NULL
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
            question_id INTEGER PRIMARY KEY,
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

  createSurveyQuestionAnswerTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS SurveyQuestionAnswer (
            aabhaId TEXT,
            question_id INTEGER,
            answer TEXT,
            PRIMARY KEY (aabhaId, question_id)
          );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("SurveyQuestionAnswer table created successfully");
            } else {
              resolve("SurveyQuestionAnswer table already exists");
            }
          },
          (_, error) => {
            reject("Error creating SurveyQuestionAnswer table: " + error);
          }
        );
      });
    });
  },
   
  createMedicalQuestionTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS medical_questionarrie (
            question_id INTEGER PRIMARY KEY, question TEXT);`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("medical_questionarrie table created successfully");
            } else {
              resolve("medical_questionarrie table already exists");
            }
          },
          (_, error) => {
            reject("Error creating medical_questionarrie table: " + error);
          }
        );
      });
    });
  },

  createMedicalHistoryAnswersTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS medical_history_answers (
            question_id INTEGER,
            question_ans TEXT,
            aabha_id INTEGER,
            PRIMARY KEY (aabha_id, question_id)
          )`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("medical_history_answers table created successfully");
            } else {
              resolve("medical_history_answers table already exists");
            }
          },
          (_, error) => {
            reject("Error creating medical_history_answers table: " + error);
          }
        );
      });
    });
  },

  createProfileDetailsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS profile_details_table (
            firstname TEXT, lastname TEXT,
            gender TEXT,
          )`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("profile_details_table table created successfully");
            } else {
              resolve("profile_details_table table already exists");
            }
          },
          (_, error) => {
            reject("Error creating profile_details_table table: " + error);
          }
        );
      });
    });
  },
};

export default CreateService;
