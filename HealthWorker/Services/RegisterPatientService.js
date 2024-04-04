import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const RegisterPatientService = {
  addPatient: async (patientData) => {
    const token = await getToken(); // Get token asynchronously

    try {
      console.log("HIiII", patientData);
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
