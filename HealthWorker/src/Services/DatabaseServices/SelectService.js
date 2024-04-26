// SelectService.js
import db from "../DatabaseServices/DatabaseServiceInit";

const SelectService = {
  getAllAabhaIdInfo: async () => {
    // console.log("Inside getAllAabhaIdInfo");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM AabhaIdInfo",
          [],
          (_, { rows }) => {
            const entries = rows._array; // Renamed from patients to entries
            resolve(entries);
          },
          (_, error) => {
            reject("Error fetching AabhaIdInfo: " + error.message); // Improved error message
          }
        );
      });
    });
  },

  getFollowUpSchedule: async () => {
    // console.log("Inside getAllAabhaIdInfo");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM FollowUpSchedule",
          [],
          (_, { rows }) => {
            const entries = rows._array; // Renamed from patients to entries
            resolve(entries);
          },
          (_, error) => {
            reject("Error fetching FollowUpSchedule: " + error.message); // Improved error message
          }
        );
      });
    });
  },

  getAllPatients: async () => {
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

  getPatientDetailsByID: (aabhaId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM PatientDetails WHERE aabhaId=?`,
          [aabhaId],
          (_, result) => {
            const len = result.rows.length;
            const surveyQuestionAnswers = [];
            // console.log("result.rows._array ", result.rows._array);

            resolve(result.rows._array);
          },
          (_, error) => {
            reject("Error fetching PatientDetails: " + error);
          }
        );
      });
    });
  },
  getAllSurveyQuestions: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM SurveyQuestion`,
          [],
          (_, { rows }) => {
            const questions = rows._array;
            resolve(questions);
          },
          (_, error) => {
            reject("Error fetching Questions: " + error);
          }
        );
      });
    });
  },
  getAllQuestions: (age, type) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        if (age >= 20 && age <= 40) {
          tx.executeSql(
            `SELECT * FROM SurveyQuestion where type=? AND minage=? AND maxage=?`,
            [type, 20, 40],
            (_, { rows }) => {
              const patients = rows._array;
              resolve(patients);
            },
            (_, error) => {
              reject("Error fetching Questions: " + error);
            }
          );
        } else if (age >= 41 && age <= 60) {
          tx.executeSql(
            `SELECT * FROM SurveyQuestion where type=? AND minage=? AND maxage=?`,
            [type, 41, 60],
            (_, { rows }) => {
              const patients = rows._array;
              resolve(patients);
            },
            (_, error) => {
              reject("Error fetching Questions: " + error);
            }
          );
        } else {
          tx.executeSql(
            `SELECT * FROM SurveyQuestion where type=? AND minage = ? AND maxage=?`,
            [type, 61, 110],
            (_, { rows }) => {
              const patients = rows._array;
              resolve(patients);
            },
            (_, error) => {
              reject("Error fetching Questions: " + error);
            }
          );
        }
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
            // console.log("result.rows._array ", result.rows._array);

            resolve(result.rows._array);
          },
          (_, error) => {
            reject("Error fetching survey question answers: " + error);
          }
        );
      });
    });
  },

  getFollowupDetailsByID: (patientId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM FollowUpSchedule WHERE patientId=?`,
          [patientId],
          (_, result) => {
            resolve(result.rows._array);
          },
          (_, error) => {
            reject("Error fetching FollowUpSchedule details: " + error);
          }
        );
      });
    });
  },

  getAllFollowUpQuestionAnswersByPID: (pid) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT question_id ,answer FROM FollowUpQuestionAnswer WHERE patientId=?`,
          [pid],
          (_, result) => {
            const len = result.rows.length;
            const surveyQuestionAnswers = [];
            // console.log("result.rows._array ", result.rows._array);

            resolve(result.rows._array);
          },
          (_, error) => {
            reject("Error fetching survey FollowUpQuestionAnswer: " + error);
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
  getWorkerDetail: async () => {
    // console.log("Inside getAllAabhaIdInfo");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM profile_details_table",
          [],
          (_, { rows }) => {
            const entries = rows._array; // Renamed from patients to entries
            resolve(entries);
          },
          (_, error) => {
            reject("Error fetching profile_details_table: " + error.message); // Improved error message
          }
        );
      });
    });
  },
};

export default SelectService;
