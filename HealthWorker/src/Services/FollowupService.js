import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const FollowupService = {
  addPatientFollowup: async (dataToSend) => {
    const token = await getToken(); // Get token asynchronously

    try {
      console.log("HIiII", dataToSend);
      const response = await axios.post(
        BASE_URL + "worker/register-followup",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error Adding followup:", error);
      throw error;
    }
  },
};
export default FollowupService;
