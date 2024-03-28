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
          "SELECT * FROM medical_questionarrie",
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
  getAllSurveyQuestionAnswers: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM SurveyQuestionAnswer;`,
          [],
          (_, result) => {
            const len = result.rows.length;
            const surveyQuestionAnswers = [];
            for (let i = 0; i < len; i++) {
              surveyQuestionAnswers.push(result.rows.item(i));
            }
            resolve(surveyQuestionAnswers);
          },
          (_, error) => {
            reject("Error fetching survey question answers: " + error);
          }
        );
      });
    });
  },

  getAllSurveyQuestionAnswersByAabhaId: (aabhaId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT question_id ,answer FROM SurveyQuestionAnswer WHERE aabhaId=?`,
          [aabhaId],
          (_, result) => {
            const len = result.rows.length;
            const surveyQuestionAnswers = [];
            console.log("result.rows._array ", result.rows._array);

            resolve(result.rows._array);
          },
          (_, error) => {
            reject("Error fetching survey question answers: " + error);
          }
        );
      });
    });
  },

  getAllMedicalQuestionAnswersByAabhaId: (aabhaId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT question_id,
          question_ans
           FROM medical_history_answers WHERE aabha_id=?`,
          [aabhaId],
          (_, result) => {
            const len = result.rows.length;
            const surveyQuestionAnswers = [];
            for (let i = 0; i < len; i++) {
              surveyQuestionAnswers.push(result.rows.item(i));
            }
            resolve(surveyQuestionAnswers);
          },
          (_, error) => {
            reject("Error fetching medical question answers: " + error);
          }
        );
      });
    });
  },

  getMedicalHistoryAnswers: (aabha_id = null) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        let query = "SELECT * FROM medical_history_answers";
        let params = [];

        if (aabha_id !== null) {
          query += " WHERE aabha_id = ?";
          params.push(aabha_id);
        }

        tx.executeSql(
          query,
          params,
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
  },
};

export default SelectService;
