import axios from "axios";
import { BASE_URL, getToken } from "../utils/Constants";

const ProfileService = {
    getDoctorData : async () => {
        try {
          const response = await axios.get(BASE_URL + "doctor/viewdetails?doctorid=4", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          });
    
          return response.data;
        } catch (error) {
          console.error("Error fetching district options:", error);
          throw error;
        }
      }
}

export default ProfileService;