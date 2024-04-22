import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const RegisterPatientService = {
  getAabhaIdTable: async () => {
    const token = await getToken(); // Get token asynchronously

    try {
      const response = await axios.get(BASE_URL + "worker/getAbhaid", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      console.error("Error Fetching AbhaIdTable:", error);
      throw error;
    }
  },

  addPatient: async (patientData) => {
    const token = await getToken(); // Get token asynchronously

    try {
      // console.log("HIiII", patientData);
      const response = await axios.post(
        BASE_URL + "worker/register-patient",
        patientData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error Adding Patient:", error);
      throw error;
    }
  },
};
export default RegisterPatientService;
