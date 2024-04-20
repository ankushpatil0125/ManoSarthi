// InsertService.js
import db from "../DatabaseServices/DatabaseServiceInit";

const InsertService = {
  insertAabhaIdInfo: (AabhaIdInfo, status) => {
    // console.log("length",AabhaIdInfo.length);
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        AabhaIdInfo.forEach((aabha) => {
          tx.executeSql(
            "INSERT INTO AabhaIdInfo (aabhaId,status) VALUES (?, ?)",
            [aabha, status],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve(
                  rowsAffected + " Data inserted into AabhaIdInfo successfully"
                );
              } else {
                reject("Failed to insert data into AabhaIdInfo");
              }
            },
            (_, error) => {
              reject("Error inserting data into AabhaIdInfo: " + error);
            }
          );
        });
      });
    });
  },

  insertFollowUpTable: (followUpScheduleList) => {
    // console.log("before inside insertPatientD");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        followUpScheduleList.forEach((followUpSchedule) => {
          tx.executeSql(
            "INSERT OR REPLACE INTO FollowUpSchedule (followup_id, patient_fname, patient_lname, patient_adress,followUpDate,type) VALUES (?, ?, ?, ?, ?, ?)",
            [
              followUpSchedule.followup_id,
              followUpSchedule.patient_fname,
              followUpSchedule.patient_lname,
              followUpSchedule.patient_address,
              followUpSchedule.followUpDate,
              followUpSchedule.type,
            ],
            (_, { rowsAffected }) => {
              // console.log("insertFollowUpTable" + rowsAffected);
              if (rowsAffected > 0) {
                resolve(
                  rowsAffected +
                    " Data Inserted Into FollowUpSchedule Table Successfully"
                );
              } else {
                reject("Failed To Insert Data Into FollowUpSchedule Table");
              }
            },
            (_, error) => {
              reject("Error inserting data into FollowUpSchedule: " + error);
            }
          );
        });
      });
    });
  },
  insertAabhaId: (AabhaId, status) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO AabhaIdInfo (aabhaId,status) VALUES (?, ?)",
          [AabhaId, status],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve("Data inserted into AabhaIdInfo successfully");
            } else {
              reject("Failed to insert data into AabhaIdInfo");
            }
          },
          (_, error) => {
            reject("Error inserting data into AabhaIdInfo: " + error);
          }
        );
      });
    });
  },

  insertPatientDetails: (patientDetails) => {
    // console.log("before inside insertPatientD");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO PatientDetails (aabhaId, firstName, lastName, email, gender, age, address) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            patientDetails.aabhaId,
            patientDetails.firstName,
            patientDetails.lastName,
            patientDetails.email,
            patientDetails.gender,
            patientDetails.age,
            patientDetails.address,
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve("Data Inserted Into PatientDetails Table Successfully");
            } else {
              reject("Failed To Insert Data Into PatientDetails Table");
            }
          },
          (_, error) => {
            reject("Error inserting data into PatientDetails: " + error);
          }
        );
      });
    });
  },

  insertSurveyQuestion: (SurveyQuestions) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        SurveyQuestions.forEach((question) => {
          tx.executeSql(
            "INSERT INTO SurveyQuestion (question_id, minage, maxage, question, default_ans, type) VALUES (?, ?, ?, ?, ?, ?)",
            [
              question.question_id,
              question.minage,
              question.maxage,
              question.question,
              question.default_ans,
              question.type,
            ],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve(
                  rowsAffected +
                    " Data Inserted Into SurveyQuestion Successfully"
                );
              } else {
                reject("Failed To Insert Data Into SurveyQuestion");
              }
            },
            (_, error) => {
              reject("Error Inserting Data Into SurveyQuestion: " + error);
            }
          );
        });
      });
    });
  },

  insertMedicalQuestions: (MedicalQuestions) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        MedicalQuestions.forEach((question) => {
          tx.executeSql(
            "INSERT INTO medical_questionarrie (question_id, question) VALUES (?, ?)",
            [question.question_id, question.question],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve(
                  rowsAffected +
                    " Data Inserted Into Medical Questions Successfully"
                );
              } else {
                reject("Failed To Insert Data Into Medical Questions");
              }
            },
            (_, error) => {
              reject("Error Inserting Data Into Medical Questions: " + error);
            }
          );
        });
      });
    });
  },

  // insertSurveyQuestionAnswer: (aabhaId, questionId, answer) => {
  //   return new Promise((resolve, reject) => {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         `INSERT OR REPLACE INTO SurveyQuestionAnswer (aabhaId, question_id, answer) VALUES (?, ?, ?);`,
  //         [aabhaId, questionId, answer],
  //         (_, result) => {
  //           if (result.rowsAffected > 0) {
  //             resolve("Survey question answer inserted successfully");
  //           } else {
  //             reject("Failed to insert survey question answer");
  //           }
  //         },
  //         (_, error) => {
  //           reject("Error inserting survey question answer: " + error);
  //         }
  //       );
  //     });
  //   });
  // },

  insertSurveyQuestionAnswer: (aabhaId, questionId, answer) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM SurveyQuestionAnswer WHERE aabhaId = ? AND question_id = ?`,
          [aabhaId, questionId],
          (_, result) => {
            if (result.rows.length > 0) {
              // console.log("Inside condition");
              // Record with the same primary key already exists, perform an update
              tx.executeSql(
                `UPDATE SurveyQuestionAnswer SET answer = ? WHERE aabhaId = ? AND question_id = ?`,
                [answer, aabhaId, questionId],
                (_, { rowsAffected }) => {
                  if (rowsAffected > 0) {
                    // console.log("resolved update query");
                    resolve("SurveyQuestionAnswer updated successfully");
                  } else {
                    console.log("reject update query");
                    reject("Failed to update SurveyQuestionAnswer");
                  }
                },
                (_, error) => {
                  reject("Error updating SurveyQuestionAnswer: " + error);
                }
              );
            } else {
              // Record does not exist, perform an insert
              tx.executeSql(
                `INSERT INTO SurveyQuestionAnswer (aabhaId, question_id, answer) VALUES (?, ?, ?)`,
                [aabhaId, questionId, answer],
                (_, { rowsAffected }) => {
                  if (rowsAffected > 0) {
                    resolve(
                      "Data inserted into SurveyQuestionAnswer successfully"
                    );
                  } else {
                    reject("Failed to insert data into SurveyQuestionAnswer");
                  }
                },
                (_, error) => {
                  reject(
                    "Error inserting data into SurveyQuestionAnswer: " + error
                  );
                }
              );
            }
          },
          (_, error) => {
            reject(
              "Error checking existing record in SurveyQuestionAnswer: " + error
            );
          }
        );
      });
    });
  },

  // insertMedicalHistoryAnswers: (
  //   medicalQuestions,
  //   answers,
  //   comment,
  //   commentID,
  //   aabha_id
  // ) => {
  //   return new Promise((resolve, reject) => {
  //     db.transaction((tx) => {
  //       for (let index = 0; index < answers.length; index++) {
  //         tx.executeSql(
  //           `SELECT * FROM medical_history_answers WHERE aabhaId = ? AND question_id = ?`,
  //           [aabha_id,medicalQuestions[index].question_id],
  //           (_,result)=>{
  //             if(result.rows.length > 0){
  //               tx.executeSql(
  //                 `UPDATE medical_history_answers SET question_ans=? WHERE question_id = ? AND aabhaId = ?`,[answers[index],medicalQuestions[index].question_id,aabha_id],
  //                 (_,{rows_affected}) => {
  //                   if(rows_affected > 0){
  //                     resolve("Medical QnA updated successfully");
  //                   }
  //                   else{
  //                     reject("Failed to update Medical QnA");
  //                   }
  //                 },
  //                 (_,error) =>{
  //                   reject("Error updating Medical QnA: " , error);
  //                 }
  //               );
  //             }
  //             else{
  //               tx.executeSql(
  //                 "INSERT OR REPLACE INTO medical_history_answers (aabha_id, question_id, question_ans) VALUES (?, ?, ?)",[aabha_id, medicalQuestions[index].question_id, answers[index]],
  //                 (_, result) => {
  //                   console.log(`Data for question ${index + 1} saved successfully`);
  //                 },
  //                 (_, error) => {
  //                   console.error(
  //                     `Error saving data for question ${index + 1}`,
  //                     error
  //                   );
  //                 }
  //                 );
  //             }
  //           }

  //         );
  //       }
  //       tx.executeSql(
  //         "INSERT INTO medical_history_answers (aabha_id, question_id, question_ans) VALUES (?, ?, ?)",
  //         [aabha_id, commentID, comment],
  //         (_, result) => {
  //           console.log("Comment saved successfully");
  //           resolve(); // Resolve the promise after successful execution
  //         },
  //         (_, error) => {
  //           console.error("Error saving comment", error);
  //           reject(error); // Reject the promise if there's an error
  //         }
  //       );

  //     });
  //   });
  // },
  insertMedicalHistoryAnswers: (
    medicalQuestions,
    answers,
    comment,
    commentID,
    aabha_id
  ) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        // Loop through the answers array to insert or update individual records
        for (let index = 0; index < answers.length; index++) {
          // Check if a record with the same aabha_id and question_id exists
          tx.executeSql(
            `SELECT * FROM medical_history_answers WHERE aabha_id = ? AND question_id = ?`,
            [aabha_id, medicalQuestions[index].question_id],
            (_, result) => {
              if (result.rows.length > 0) {
                // Record with the same aabha_id and question_id already exists, perform an update
                tx.executeSql(
                  `UPDATE medical_history_answers SET question_ans = ? WHERE aabha_id = ? AND question_id = ?`,
                  [
                    answers[index],
                    aabha_id,
                    medicalQuestions[index].question_id,
                  ],
                  (_, { rowsAffected }) => {
                    console.log(
                      `Data for question ${index + 1} updated successfully`
                    );
                  },
                  (_, error) => {
                    console.error(
                      `Error updating data for question ${index + 1}`,
                      error
                    );
                  }
                );
              } else {
                // Record does not exist, perform an insert
                tx.executeSql(
                  `INSERT INTO medical_history_answers (aabha_id, question_id, question_ans) VALUES (?, ?, ?)`,
                  [
                    aabha_id,
                    medicalQuestions[index].question_id,
                    answers[index],
                  ],
                  (_, result) => {
                    console.log(
                      `Data for question ${index + 1} saved successfully`
                    );
                  },
                  (_, error) => {
                    console.error(
                      `Error saving data for question ${index + 1}`,
                      error
                    );
                  }
                );
              }
            },
            (_, error) => {
              console.error("Error checking existing record", error);
            }
          );
        }

        // Insert or update the comment
        tx.executeSql(
          `SELECT * FROM medical_history_answers WHERE aabha_id = ? AND question_id = ?`,
          [aabha_id, commentID],
          (_, result) => {
            if (result.rows.length > 0) {
              // Record with the same aabha_id and commentID already exists, perform an update
              tx.executeSql(
                `UPDATE medical_history_answers SET question_ans = ? WHERE aabha_id = ? AND question_id = ?`,
                [comment, aabha_id, commentID],
                (_, { rowsAffected }) => {
                  console.log("Comment updated successfully");
                  resolve(); // Resolve the promise after successful execution
                },
                (_, error) => {
                  console.error("Error updating comment", error);
                  reject(error); // Reject the promise if there's an error
                }
              );
            } else {
              // Record does not exist, perform an insert
              tx.executeSql(
                `INSERT INTO medical_history_answers (aabha_id, question_id, question_ans) VALUES (?, ?, ?)`,
                [aabha_id, commentID, comment],
                (_, result) => {
                  console.log("Comment saved successfully");
                  resolve(); // Resolve the promise after successful execution
                },
                (_, error) => {
                  console.error("Error saving comment", error);
                  reject(error); // Reject the promise if there's an error
                }
              );
            }
          },
          (_, error) => {
            console.error("Error checking existing comment", error);
          }
        );
      });
    });
  },

  updateWorkerDetails: (workerDetails) => {
    console.log("before inside insertPatientD");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        console.log("in trans inside insertPatientD");
        tx.executeSql(
          "UPDATE profile_details_table SET firstname = ?, lastname=?,gender=? where email = ?",
          [
            workerDetails.firstName,
            workerDetails.lastName,
            workerDetails.gender,
            workerDetails.email,
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve("Data updated into profile_details_table successfully");
            } else {
              reject("Failed to update data into profile_details_table");
            }
          },
          (_, error) => {
            reject("Error updating data into profile_details_table: " + error);
          }
        );
      });
    });
  },
};

export default InsertService;
