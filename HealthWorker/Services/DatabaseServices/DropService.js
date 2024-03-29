import db from "../DatabaseServices/DatabaseServiceInit";

const DropService = {
  dropTables: async () => {
    await DropService.dropMedicalQuestionsTable();
    await DropService.dropMedicalHistoryAnswersTable();
    await DropService.dropSurveyQuestionTable();
    await DropService.dropPatientDetailsTable();
    await DropService.dropSurveyQuestionAnswerTable();
    // Add more table drop functions here if needed
  },

  dropPatientDetailsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS PatientDetails;`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("PatientDetails table dropped successfully");
            } else {
              resolve("PatientDetails table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping PatientDetails table: " + error);
          }
        );
      });
    });
  },

  dropSurveyQuestionTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS SurveyQuestion;`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("SurveyQuestion table dropped successfully");
            } else {
              resolve("SurveyQuestion table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping SurveyQuestion table: " + error);
          }
        );
      });
    });
  },

  dropMedicalQuestionsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS medical_questionarrie;`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("medical_questionarrie table dropped successfully");
            } else {
              resolve("medical_questionarrie table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping medical_questionarrie table: " + error);
          }
        );
      });
    });
  },

  dropMedicalHistoryAnswersTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS medical_history_answers;`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("medical_history_answers table dropped successfully");
            } else {
              resolve("medical_history_answers table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping medical_history_answers table: " + error);
          }
        );
      });
    });
  },
  dropSurveyQuestionAnswerTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS SurveyQuestionAnswer;`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("SurveyQuestionAnswer table dropped successfully");
            } else {
              resolve("SurveyQuestionAnswer table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping SurveyQuestionAnswer table: " + error);
          }
        );
      });
    });
  },
};

export default DropService;
