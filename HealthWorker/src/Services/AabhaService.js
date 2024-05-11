import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const AabhaService = {
  sendNotReferedAabhaData: async (dataToSend) => {
    const token = await getToken(); // Get token asynchronously

    try {
      console.log("Inside sendNotReferedAabhaData", dataToSend);
      const response = await axios.post(
        BASE_URL + "worker/not-referred-patient",
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
      console.error("Error Sending AabhaData:", error);
      throw error;
    }
  },
};
export default AabhaService;
