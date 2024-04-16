import axios from "axios";
import { BASE_URL, getToken } from "../../utils/Constants";
// import { getUserId } from "../utils/Constants";
const ProfileService = {
    getHealthWorkerData : async () => {
        try {
          const response = await axios.get(BASE_URL + "worker/view-profile", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getToken()}`,
            },
          });
    
          return response.data;
        } catch (error) {
          console.error("Error fetching Dcotor Information:", error);
          throw error;
        }
      },
}

export default ProfileService;