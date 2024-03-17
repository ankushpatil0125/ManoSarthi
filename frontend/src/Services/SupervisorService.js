import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const SupervisorService = {
  addHealthWorker: async (healthWorkerData) => {
    // const token = getToken();
    console.log("data afsd",healthWorkerData)
    try{
      const response = await axios.post(BASE_URL + "supervisor/addworker",
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
      const response = await axios.get(BASE_URL + "supervisor/get-subdistrict-village", {
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

  getAllHealthWorkers: async (pagenumber) => {
    try {
      console.log('before calling getAll')
      const response = await axios.get(BASE_URL + "admin/healthworker?pagenumber="+pagenumber, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          // withCredentials:false
        },
      });
      console.log("Healthworker list",response);
      return response;
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      throw error;
    }
  },
  getAllVillageHealthWorker: async (code,pagenumber) => {
    try {
      
      const response = await axios.get(BASE_URL + "admin/health/district?districtcode="+code+"&pagenumber="+pagenumber, {
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${getToken()}`,
          // withCredentials:false
        },
      });
      console.log("all village healthworker",response);
      return response;
    } catch (error) {
      console.error("Error fetching healthworker details:", error);
      throw error;
    }
  },
};
export default SupervisorService;