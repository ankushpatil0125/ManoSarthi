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
              reject(`No rows were affected. Check if pid exists: ${pid}`);
            }
          },
          (_, error) => {
            reject("Error updating status: " + error);
          }
        );
      });
    });
  },
  updateFollowUpScheduleStatus: (patientId, newStatus) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE FollowUpSchedule SET status = ? WHERE patientId = ?",
          [newStatus, patientId],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve("Status Updated Successfully");
            } else {
              reject("No rows updated, patientId not found");
            }
          },
          (_, error) => {
            reject("Error updating status in FollowUpSchedule: " + error);
          }
        );
      });
    });
  },

  updateFollowUpReferNotRefer: (patientId, status, latitude, longitude) => {
    console.log("Inside Update");
    // console.log("Lat::Log:: ", latitude,longitude,patientId);
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        let query = "";
        let params = [];

        if (
          status !== undefined &&
          latitude === undefined &&
          longitude === undefined
        ) {
          query =
            "UPDATE followupReferNotRefer SET status = ? WHERE patientId = ?";
          params = [status, patientId];
        } else if (
          status === undefined &&
          (latitude !== undefined || longitude !== undefined)
        ) {
          query =
            "UPDATE followupReferNotRefer SET latitude = ?, longitude = ? WHERE patientId = ?";
          params = [latitude, longitude, patientId];
        } else {
          reject("Invalid parameters provided for update");
          return;
        }

        tx.executeSql(
          query,
          params,
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("Follow-up record updated successfully");
            } else {
              resolve("No records updated");
            }
          },
          (_, error) => {
            reject("Error updating follow-up record: " + error);
          }
        );
      });
    });
  },
  updatePatientImage: (imageResult, aabhaId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE PatientDetails SET image=? WHERE aabhaId = ?;`,
          [imageResult, aabhaId],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(`Image updated successfully for aabhaId: ${aabhaId}`);
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
  updatePatientConsentImage: (imageResult, aabhaId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE PatientDetails SET imageData=? WHERE aabhaId = ?;`,
          [imageResult, aabhaId],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(`Image updated successfully for aabhaId: ${aabhaId}`);
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

  updatePatientFollowupImage: (imageResult, pid) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE followupReferNotRefer SET img=? WHERE patientId = ?;`,
          [imageResult, pid],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(`Image updated successfully for aabhaId: ${pid}`);
            } else {
              reject(`No rows were affected. Check if aabhaId exists: ${pid}`);
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
