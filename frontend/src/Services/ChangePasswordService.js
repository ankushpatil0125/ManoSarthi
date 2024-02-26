import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const ChangePasswordService = {
  ChangePassword: async (requestData) => {
    // const token = localStorage.getItem("JWT")
    // const token2 = localStorage.getItem("JWT")
    // console.log("token",token1);
    // console.log("token2",token2);
    console.log("token",getToken());
    const temp = axios.post(BASE_URL + "user/change-password", requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,

      },
    });
    // console.log("temp",temp.data);
    return temp;
  },
};

export default ChangePasswordService;
