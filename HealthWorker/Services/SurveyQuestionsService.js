import axios from "axios";
import { BASE_URL, getToken } from "../utils/Constants";

const SurveyQuestionsService = {
  getQuestions: async () => {
    try {
      const token = await getToken(); // Get token asynchronously

      const response = await axios.get(BASE_URL + "worker/getquestionarrie", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      console.error("Error fetching survey questions options:", error);
      throw error;
    }
  },
};

export default SurveyQuestionsService;
