// CreateService.js
import db from "../DatabaseServices/DatabaseServiceInit";

const CreateService = {
  createTables: async () => {
    await CreateService.createPatientDetailsTable();
    await CreateService.createSurveyQuestionTable();
    await CreateService.createMedicalQuestionTable();
    await CreateService.createMedicalHistoryAnswersTable();
    await CreateService.createSurveyQuestionAnswerTable();
    // Add more table creation functions here if needed
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
            answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_id INTEGER,
            question_ans TEXT,
            aabha_id INTEGER
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
};

export default CreateService;
