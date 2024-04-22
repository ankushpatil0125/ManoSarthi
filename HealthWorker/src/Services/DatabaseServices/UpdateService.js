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

  updateFollowUpStatus: (pid) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE followupReferNotRefer SET status = 1 WHERE patientId = ?;`,
          [pid],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(`Status updated successfully for pid: ${pid}`);
            } else {
              reject(
                `No rows were affected. Check if pid exists: ${pid}`
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