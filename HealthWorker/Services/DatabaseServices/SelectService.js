// SelectService.js
import db from "../DatabaseServices/DatabaseServiceInit";


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
  },
  getAllQuestions: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM SurveyQuestion",
          [],
          (_, { rows }) => {
            const patients = rows._array;
            resolve(patients);
          },
          (_, error) => {
            reject("Error fetching Questions: " + error);
          }
        );
      });
    });
  },

  getAllMedicalQuestions: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM medical_questionarrie',
          [],
          (_, { rows }) => {
            const medical_questions = rows._array;
            resolve(medical_questions);
          },
          (_, error) => {
            reject("Error fetching medical_questionarrie: " + error);
          }
        );
      });
    });
  },

  getAllMedicalHistoryAnswers: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM medical_history_answers',
          [],
          (_, { rows }) => {
            const medical_history = rows._array;
            resolve(medical_history);
          },
          (_, error) => {
            reject("Error fetching medical_history_answers: " + error);
          }
        );
      });
    });
  }

};

export default SelectService;