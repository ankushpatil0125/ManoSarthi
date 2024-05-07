import db from "../DatabaseServices/DatabaseServiceInit";

const DropService = {
  dropTables: async () => {
    const dr1 = await DropService.dropMedicalQuestionsTable();
    console.log("dr1: ", dr1);

    const dr2 = await DropService.dropMedicalHistoryAnswersTable();
    console.log("dr2: ", dr2);

    const dr3 = await DropService.dropSurveyQuestionTable();
    console.log("dr3: ", dr3);

    const dr4 = await DropService.dropPatientDetailsTable();
    console.log("dr4: ", dr4);

    const dr5 = await DropService.dropSurveyQuestionAnswerTable();
    console.log("dr5: ", dr5);

    const dr6 = await DropService.dropAabhaIdInfoTable();
    console.log("dr6: ", dr6);

    const dr7 = await DropService.dropFollowUpTable();
    console.log("dr7: ", dr7);

    const dr8 = await DropService.dropFollowupReferNotReferTable();
    console.log("dr8: ", dr8);

    const d9 = await DropService.dropFollowupQuestionAnswerTable();
    console.log("dr9: ", d9);

    // Add more table drop functions here if needed
  },

  dropAabhaIdInfoTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS AabhaIdInfo`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("AabhaIdInfo table dropped successfully");
            } else {
              resolve("AabhaIdInfo table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping AabhaIdInfo table: " + error);
          }
        );
      });
    });
  },

  dropFollowUpTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS FollowUpSchedule`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("FollowUpSchedule table dropped successfully");
            } else {
              resolve("FollowUpSchedule table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping FollowUpSchedule table: " + error);
          }
        );
      });
    });
  },

  dropFollowupReferNotReferTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS followupReferNotRefer`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("followupReferNotRefer table dropped successfully");
            } else {
              resolve("followupReferNotRefer table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping followupReferNotRefer table: " + error);
          }
        );
      });
    });
  },

  dropPatientDetailsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS PatientDetails`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("PatientDetails table dropped successfully");
            } else {
              resolve("PatientDetails table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping PatientDetails table: " + error);
          }
        );
      });
    });
  },

  dropSurveyQuestionTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS SurveyQuestion`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("SurveyQuestion table dropped successfully");
            } else {
              resolve("SurveyQuestion table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping SurveyQuestion table: " + error);
          }
        );
      });
    });
  },

  dropMedicalQuestionsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS medical_questionarrie`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("medical_questionarrie table dropped successfully");
            } else {
              resolve("medical_questionarrie table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping medical_questionarrie table: " + error);
          }
        );
      });
    });
  },
  dropPrescriptionsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS prescriptions`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("prescriptions table dropped successfully");
            } else {
              resolve("prescriptions table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping prescriptions table: " + error);
          }
        );
      });
    });
  },

  dropMedicalHistoryAnswersTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS medical_history_answers`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("medical_history_answers table dropped successfully");
            } else {
              resolve("medical_history_answers table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping medical_history_answers table: " + error);
          }
        );
      });
    });
  },
  dropSurveyQuestionAnswerTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS SurveyQuestionAnswer`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("SurveyQuestionAnswer table dropped successfully");
            } else {
              resolve("SurveyQuestionAnswer table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping SurveyQuestionAnswer table: " + error);
          }
        );
      });
    });
  },
  dropFollowupQuestionAnswerTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS FollowUpQuestionAnswer`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("FollowUpQuestionAnswer table dropped successfully");
            } else {
              resolve("FollowUpQuestionAnswer table does not exist");
            }
          },
          (_, error) => {
            reject("Error dropping FollowUpQuestionAnswer table: " + error);
          }
        );
      });
    });
  },
};

export default DropService;
