// DeleteService.js
import db from "../DatabaseServices/DatabaseServiceInit";

const DeleteService = {
  deleteAllAabhaIdInfo: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM AabhaIdInfo WHERE status = 'old'",
          [],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " Rows Deleted From AabhaIdTable");
          },
          (_, error) => {
            reject("Error deleting records from AabhaIdInfo table: " + error);
          }
        );
      });
    });
  },

  deleteFollowUpTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM FollowUpSchedule",
          [],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " Rows Deleted From FollowUpSchedule");
          },
          (_, error) => {
            reject(
              "Error deleting records from FollowUpSchedule table: " + error
            );
          }
        );
      });
    });
  },
  deleteAllPrescriptions: () => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `DELETE FROM prescriptions`,
            [],
            (_, result) => {
              resolve("All prescriptions deleted successfully");
            },
            (_, error) => {
              reject("Error deleting prescriptions: " + error.message);
            }
          );
        },
        (error) => {
          reject("Transaction error: " + error.message);
        },
        () => {
          resolve("Transaction completed successfully.");
        }
      );
    });
  },

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
          [String(aabhaId)],
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

  deleteFollowupReferNotReferByPID: (pid) => {
    console.log("delete, id", pid);
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM followupReferNotRefer WHERE patientId=?",
          [pid],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from followupReferNotRefer");
          },
          (_, error) => {
            reject("Error deleting followupReferNotRefer: " + error);
          }
        );
      });
    });
  },

  deleteAllSurveyQuestions: () => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "DELETE FROM SurveyQuestion",
            [],
            (_, { rowsAffected }) => {
              resolve(rowsAffected + " Rows Deleted From SurveyQuestion");
            },
            (_, error) => {
              reject("Error Deleting SurveyQuestion: " + error);
            }
          );
        },
        () => {},
        () => {}
      );
    });
  },

  deleteAllSurveyQuestionAnswers: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM SurveyQuestionAnswer;`,
          [],
          (_, result) => {
            resolve("All entries deleted from SurveyQuestionAnswer table");
          },
          (_, error) => {
            reject(
              "Error deleting entries from SurveyQuestionAnswer table: " + error
            );
          }
        );
      });
    });
  },

  deleteSurveyQuestionAnswersByAabhaId: (aabhaId) => {
    console.log("delete, id", aabhaId);
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM SurveyQuestionAnswer WHERE aabhaId=?",
          [String(aabhaId)],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from SurveyQuestionAnswer");
          },
          (_, error) => {
            reject("Error deleting SurveyQuestionAnswer: " + error);
          }
        );
      });
    });
  },

  deleteFolloupQuestionAnswersByPID: (pid) => {
    console.log("delete, id", pid);
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM FollowUpQuestionAnswer WHERE patientId=?",
          [pid],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from FollowUpQuestionAnswer");
          },
          (_, error) => {
            reject("Error deleting FollowUpQuestionAnswer: " + error);
          }
        );
      });
    });
  },

  deleteFolloupScheduleByPID: (pid) => {
    console.log("delete, id", pid);
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM FollowUpSchedule WHERE patientId=?",
          [pid],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " rows deleted from FollowUpSchedule");
          },
          (_, error) => {
            reject("Error deleting FollowUpSchedule: " + error);
          }
        );
      });
    });
  },

  deleteAllMedicalQuestions: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM medical_questionarrie",
          [],
          (_, { rowsAffected }) => {
            resolve(rowsAffected + " Rows Deleted From Medical_questionarrie");
          },
          (_, error) => {
            reject("Error Deleting Medical_questionarrie: " + error);
          }
        );
      });
    });
  },

  deleteAllMedicalHistoryAnswers: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM medical_history_answers",
          [],
          (_, { rowsAffected }) => {
            resolve(
              rowsAffected + " rows deleted from medical_history_answers"
            );
          },
          (_, error) => {
            reject("Error deleting medical_history_answers: " + error);
          }
        );
      });
    });
  },
  deleteMedicalHistoryAnswersByAabhaId: (aabhaId) => {
    console.log("delete, id", aabhaId);
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM medical_history_answers WHERE aabha_id=?",
          [aabhaId],
          (_, { rowsAffected }) => {
            resolve(
              rowsAffected + " rows deleted from medical_history_answers"
            );
          },
          (_, error) => {
            reject("Error deleting medical_history_answers: " + error);
          }
        );
      });
    });
  },
};

export default DeleteService;
