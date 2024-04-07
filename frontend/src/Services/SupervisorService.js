import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const SupervisorService = {
  addHealthWorker: async (healthWorkerData) => {
    // const token = getToken();
    console.log("data afsd", healthWorkerData);
    try {
      const response = await axios.post(
        BASE_URL + "supervisor/addworker",
        healthWorkerData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error Adding Doctor:", error);
      throw error;
    }
  },
  getVillageWorker: async (assigned) => {
    try {
      const response = await axios.get(
        BASE_URL + "supervisor/get-subd-village?assigned="+assigned,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
         
        }
      );

      return response;
    } catch (error) {
      console.error("Error fetching Village options:", error);
      throw error;
    }
  },
 
  getAllHealthWorkers: async (pagenumber) => {
    try {
      console.log("before calling getAll");
      const response = await axios.get(
        BASE_URL +
          "supervisor/get-subdistrict-workers?pagenumber=" +
          pagenumber,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );
      console.log("Healthworker list", response);
      return response;
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      throw error;
    }
  },
  getAllVillageHealthWorker: async (code) => {
    try {
      const response = await axios.get(
        BASE_URL + "supervisor/get-village-worker?villagecode=" + code,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
          // params: {
          //   villagecode: {
          //     code:code,
          //   },
          // },
        }
      );
      console.log("all village healthworker", response);
      return response;
    } catch (error) {
      console.error("Error fetching healthworker details:", error);
      throw error;
    }
  },
  updateHealthWorker: async (reasignHealthWorker) => {
    // const token = getToken();
    // console.log("data afsd",healthWorkerData)
    try {
      const response = await axios.put(
        BASE_URL + "supervisor/reassign-worker",
        reasignHealthWorker,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error Adding Doctor:", error);
      throw error;
    }
  },
};
export default SupervisorService;
