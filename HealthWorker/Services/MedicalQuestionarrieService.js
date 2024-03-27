import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";
import { useState } from "react";

const MedicalQuestionarrieService = {
  getMedicalQuestionarrie: async () => {
    try {
      const response = await axios.get(BASE_URL + "worker/get-medical-questionarrie"
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${getToken()}`,
      //     // withCredentials:false
      //   },
      // }
      );

      return response;
    } catch (error) {
      console.error("Error fetching medical questions options:", error);
      throw error;
    }
  },



 };
export default MedicalQuestionarrieService;
