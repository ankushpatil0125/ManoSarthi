import axios from "axios";
import { BASE_URL } from "../utils/Base_URL";
// const LOGIN_BASE_URL = "http://192.168.141.199:9090/";
import { token } from "../utils/Base_URL";

const AdminService = {
  //   getDistrict: async () => {
  //     try {
  //       const response = await axios.get(LOGIN_BASE_URL + "district/");
  //       console.log("temp", response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching district options:", error);
  //       throw error;
  //     }
  //   },

  getDistrict: async () => {
    try {
      const response = await axios.get(BASE_URL + "district/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // withCredentials:false
        },
      });

      return response;
    } catch (error) {
      console.error("Error fetching district options:", error);
      throw error;
    }
  },

  //   getSubDistrict: async (selectedDistrict) => {
  //     try {
  //       const response = await axios.get(
  //         `${LOGIN_BASE_URL}?district=${selectedDistrict}`
  //       );
  //       console.log("temp", response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching subdistrict options:", error);
  //       throw error;
  //     }
  //   },
  // };

  getSubDistrict: async (districtcode) => {
    try {
      const response = await axios.get(
        BASE_URL + "subdistrict/?districtcode=" + districtcode,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // withCredentials:false
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Error fetching district options:", error);
      throw error;
    }
  },
};
export default AdminService;
