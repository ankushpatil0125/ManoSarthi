import db from "../DatabaseServices/DatabaseServiceInit";

const UpdateService = {
  updatePatientStatus: (aabhaId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE PatientDetails SET status = "1" WHERE aabhaId = ?;`,
          [aabhaId],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(`Status updated successfully for aabhaId: ${aabhaId}`);
            } else {
              reject(
                `No rows were affected. Check if aabhaId exists: ${aabhaId}`
              );
            }
          },
          (_, error) => {
            reject("Error updating status: " + error);
          }
        );
      });
    });
  },
};

export default UpdateService;