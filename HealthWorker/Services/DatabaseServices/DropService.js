import db from "../DatabaseServices/DatabaseServiceInit";

const DropService = {
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
  }
};

export default DropService;