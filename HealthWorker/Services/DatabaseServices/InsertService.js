// InsertService.js
import db from "../DatabaseServices/DatabaseServiceInit"


const InsertService = {
  insertPatientDetails: (patientDetails) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO PatientDetails (aabhaId, firstName, lastName, email, gender, dob, village, register_worker, doctor, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            patientDetails.aabhaId,
            patientDetails.firstName,
            patientDetails.lastName,
            patientDetails.email,
            patientDetails.gender,
            patientDetails.dob,
            patientDetails.village,
            patientDetails.register_worker,
            patientDetails.doctor,
            patientDetails.address,
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve("Data inserted into PatientDetails successfully");
            } else {
              reject("Failed to insert data into PatientDetails");
            }
          },
          (_, error) => {
            reject("Error inserting data into PatientDetails: " + error);
          }
        );
      });
    });
  }
};

export default InsertService;
