import axios from "axios";
import { BASE_URL } from "../utils/Base_URL";
import { token } from "../utils/Base_URL";

// const PASSWORD_CHANGE_URL = "http://192.168.141.199:9090/user/change-password";

const ChangePasswordService = {
  ChangePassword: async (requestData) => {
    const temp = axios.post(BASE_URL + "user/change-password", requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // withCredentials:false
      },
    });
    // console.log("temp",temp.data);
    return temp;
  },
};

export default ChangePasswordService;
