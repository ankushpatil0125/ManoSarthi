// DeleteService.js
import db from "../DatabaseServices/DatabaseServiceInit";

const DeleteService = {
  deleteAllPatients: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM PatientDetails",
          [],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from PatientDetails");
          },
          (_, error) => {
            reject("Error deleting patients: " + error);
          }
        );
      });
    });
  },
  deletePatientByAabhaId: (aabhaId) => {
    console.log("delete, id", aabhaId);
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM PatientDetails WHERE aabhaId=?",
          [aabhaId],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from PatientDetails");
          },
          (_, error) => {
            reject("Error deleting patients: " + error);
          }
        );
      });
    });
  },
  deleteAllQuestions: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM SurveyQuestion",
          [],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from PatientDetails");
          },
          (_, error) => {
            reject("Error deleting patients: " + error);
          }
        );
      });
    });
  },
};

export default DeleteService;
