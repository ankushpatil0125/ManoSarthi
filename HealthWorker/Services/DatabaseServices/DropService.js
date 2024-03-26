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
};

export default DropService;
