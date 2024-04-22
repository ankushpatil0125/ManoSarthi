import axios from "axios";
import { BASE_URL, getToken } from "../utils/Constants";

const FetchFollowUp = {
  getFollowUpSchedule: async () => {
    try {
      const token = await getToken(); // Get token asynchronously

      const response = await axios.get(
        BASE_URL + "worker/getFollowupSchedule",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Error fetching FollowupSchedule:", error);
      throw error;
    }
  },
};

export default FetchFollowUp;
