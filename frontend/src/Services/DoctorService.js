import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const DoctorService = {
  


  getAllPatients: async (pagenumber) => {
    try {
      console.log('before calling getAll')
      const response = await axios.get(BASE_URL + "doctor/new-patient?pagenumber="+pagenumber, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,

        },
      });
      console.log("New Patient list :",response);
      return response;
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      throw error;
    }
  },
 
  



};
export default DoctorService;

