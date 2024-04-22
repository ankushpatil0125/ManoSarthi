import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const ChangePasswordService = {
  ChangePassword: async (requestData) => {
    console.log("inside change pass service");
    try {
      const resp = axios.post(BASE_URL + "user/change-password", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return resp;
    } catch (error) {
      throw error;
    }
  },
};

export default ChangePasswordService;
