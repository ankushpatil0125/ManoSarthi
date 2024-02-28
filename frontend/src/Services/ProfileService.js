import axios from "axios";
import { BASE_URL, getToken } from "../utils/Constants";
import { getUserId } from "../utils/Constants";
const ProfileService = {
    getDoctorData : async () => {
        try {
          const response = await axios.get(BASE_URL + "doctor/viewdetails?doctorid="+getUserId(), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          });
    
          return response.data;
        } catch (error) {
          console.error("Error fetching Dcotor Information:", error);
          throw error;
        }
      },

      getSupervisorData : async () => {
        try {
          const response = await axios.get(BASE_URL + "supervisor/viewdetails?supervisorid="+getUserId(), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          });
    
          return response.data;
        } catch (error) {
          console.error("Error fetching Supervisor Information:", error);
          throw error;
        }
      }
}

export default ProfileService;