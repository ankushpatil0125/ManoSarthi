import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";
// import { useState } from "react";

const SurveyQuestionsService = {
  getQuestions: async () => {
    try {
      const response = await axios.get(
        BASE_URL + "worker/getquestionarrie"
        //   {
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${getToken()}`,
        //   // withCredentials:false
        // },
        //   }
      );
      console.log("response question fetch", response.data);

      return response;
    } catch (error) {
      console.error("Error fetching Questions options:", error);
      throw error;
    }
  },
};

export default SurveyQuestionsService;
