import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const SupervisorService = {
  addHealthWorker: async (healthWorkerData) => {
    // const token = getToken();
    try{
      const response = await axios.post(BASE_URL + "admin/doctor",
      healthWorkerData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response;
    }
    catch(error){
      console.error("Error Adding Doctor:", error);
      throw error;
    }

  },
  getVillage: async () => {
    try {
      const response = await axios.get(BASE_URL + "village/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          // withCredentials:false
        },
      });

      return response;
    } catch (error) {
      console.error("Error fetching district options:", error);
      throw error;
    }
  },
};
export default SupervisorService;