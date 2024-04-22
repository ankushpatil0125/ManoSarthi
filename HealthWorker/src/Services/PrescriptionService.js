import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const PrescriptionService = {
  getAllPrescriptions: async () => {
    const token = await getToken(); // Get token asynchronously
    try {
      const response = await axios.get(BASE_URL + "worker/getprescriptions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error Fetching PrescriptionTable:", error);
      throw error;
    }
  },

}


export default PrescriptionService;