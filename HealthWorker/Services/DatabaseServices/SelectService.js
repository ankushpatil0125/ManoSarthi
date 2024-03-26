// SelectService.js
import db from "../DatabaseServices/DatabaseServiceInit"


const SelectService = {
  getAllPatients: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM PatientDetails",
          [],
          (_, { rows }) => {
            const patients = rows._array;
            resolve(patients);
          },
          (_, error) => {
            reject("Error fetching patients: " + error);
          }
        );
      });
    });
  }
};

export default SelectService;
