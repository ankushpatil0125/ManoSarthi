// CreateService.js
import { Alert } from "react-native";
import db from "../DatabaseServices/DatabaseServiceInit";

const CreateService = {
  createTables: async () => {
    const res1 = await CreateService.createPatientDetailsTable();
    console.log("Create Res1: ", res1);
    const res2 = await CreateService.createSurveyQuestionTable();
    console.log("Create Res2: ", res2);

    const res3 = await CreateService.createMedicalQuestionTable();
    console.log("Create Res3: ", res3);

    const res4 = await CreateService.createMedicalHistoryAnswersTable();
    console.log("Create Res4: ", res4);

    const res5 = await CreateService.createSurveyQuestionAnswerTable();
    console.log("Create Res5: ", res5);

    const res6 = await CreateService.createAabhaIdInfoTable();
    console.log("Create Res6: ", res6);

    const res7 = await CreateService.createFollowUpTable();
    console.log("Create Res7: ", res7);

    const res8 = await CreateService.createFollowUpQuestionAnswerTable();
    console.log("Create Res8: ", res8);

    const res9 = await CreateService.createFollowUpReferNotReferTable();
    console.log("Create Res9: ", res9);

    const res10 = await CreateService.createPrescriptionTable();
    console.log("Create Res10: ", res10);

    // Add more table creation functions here if needed
  },
  createAabhaIdInfoTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS AabhaIdInfo (
            aabhaId TEXT PRIMARY KEY,
            status TEXT
          );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("AabhaIdInfo table created successfully");
            } else {
              resolve("AabhaIdInfo table already exists");
            }
          },
          (_, error) => {
            reject("Error creating AabhaIdInfo table: " + error);
          }
        );
      });
    });
  },

  createFollowUpTable: () => {
    // console.log("Inside create followup");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS FollowUpSchedule (
            patientId INTEGER PRIMARY KEY,
            patient_fname TEXT,
            patient_lname TEXT,
            patient_adress TEXT,
            followUpDate TEXT,
            age INTEGER,
            type TEXT
            );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("FollowUpSchedule table created successfully");
            } else {
              resolve("FollowUpSchedule table already exists");
            }
          },
          (_, error) => {
            reject("Error creating FollowUpSchedule table: " + error);
          }
        );
      });
    });
  },
  createPrescriptionTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS prescriptions (
            aabhaId INTEGER,
            prescription_id INTEGER PRIMARY KEY,
            patient_fname TEXT,
            patient_lname TEXT,
            patient_age INTEGER,
            patient_village_name TEXT,
            disease_code TEXT,
            treatment TEXT,
            medicine TEXT,
            date TEXT
          )`,
            [],
            (_, result) => {
              if (result.rowsAffected > 0) {
                resolve("Prescription table created successfully");
              } else {
                resolve("Prescription table already exists");
              }
            },
            (_, error) => {
              reject("Error creating prescription table: " + error.message);
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

  createPatientDetailsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS PatientDetails (
            aabhaId TEXT PRIMARY KEY,
            firstName TEXT,
            lastName TEXT,
            email TEXT,
            gender TEXT,
            age INTEGER,
            address TEXT,
            status TEXT DEFAULT "0" NOT NULL
          );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("PatientDetails table created successfully");
            } else {
              resolve("PatientDetails table already exists");
            }
          },
          (_, error) => {
            reject("Error creating PatientDetails table: " + error);
          }
        );
      });
    });
  },

  createSurveyQuestionTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS SurveyQuestion (
            question_id INTEGER PRIMARY KEY,
            minage INTEGER,
            maxage INTEGER,
            question TEXT,
            default_ans TEXT,
            type TEXT                       
          );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("SurveyQuestion table created successfully");
            } else {
              resolve("SurveyQuestion table already exists");
            }
          },
          (_, error) => {
            reject("Error creating SurveyQuestion table: " + error);
          }
        );
      });
    });
  },

  createFollowUpReferNotReferTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS followupReferNotRefer (
            patientId INTEGER PRIMARY KEY,
            status BOOLEAN DEFAULT 0,
            latitude TEXT DEFAULT NULL,
            longitude TEXT DEFAULT NULL);`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("followupReferNotRefer table created successfully");
            } else {
              resolve("followupReferNotRefer table already exists");
            }
          },
          (_, error) => {
            reject("Error creating followupReferNotRefer table: " + error);
          }
        );
      });
    });
  },

  createSurveyQuestionAnswerTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS SurveyQuestionAnswer (
            aabhaId TEXT,
            question_id INTEGER,
            answer TEXT,
            PRIMARY KEY (aabhaId, question_id)
          );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("SurveyQuestionAnswer table created successfully");
            } else {
              resolve("SurveyQuestionAnswer table already exists");
            }
          },
          (_, error) => {
            reject("Error creating SurveyQuestionAnswer table: " + error);
          }
        );
      });
    });
  },

  createFollowUpQuestionAnswerTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS FollowUpQuestionAnswer (
            patientId INTEGER,
            question_id INTEGER,
            answer TEXT,
            PRIMARY KEY (patientId, question_id)
          );`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("FollowUpQuestionAnswer table created successfully");
            } else {
              resolve("FollowUpQuestionAnswer table already exists");
            }
          },
          (_, error) => {
            reject("Error creating FollowUpQuestionAnswer table: " + error);
          }
        );
      });
    });
  },
  createMedicalQuestionTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS medical_questionarrie (
            question_id INTEGER PRIMARY KEY, question TEXT);`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("medical_questionarrie table created successfully");
            } else {
              resolve("medical_questionarrie table already exists");
            }
          },
          (_, error) => {
            reject("Error creating medical_questionarrie table: " + error);
          }
        );
      });
    });
  },

  createMedicalHistoryAnswersTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS medical_history_answers (
            question_id INTEGER,
            question_ans TEXT,
            aabha_id INTEGER,
            PRIMARY KEY (aabha_id, question_id)
          )`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("medical_history_answers table created successfully");
            } else {
              resolve("medical_history_answers table already exists");
            }
          },
          (_, error) => {
            patient_fname;
            reject("Error creating medical_history_answers table: " + error);
          }
        );
      });
    });
  },

  createProfileDetailsTable: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS profile_details_table (
            firstname TEXT, lastname TEXT,
            gender TEXT,
          )`,
          [],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve("profile_details_table table created successfully");
            } else {
              resolve("profile_details_table table already exists");
            }
          },
          (_, error) => {
            reject("Error creating profile_details_table table: " + error);
          }
        );
      });
    });
  },
};

export default CreateService;
