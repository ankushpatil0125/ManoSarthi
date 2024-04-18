import axios from "axios";
import { BASE_URL } from "../../utils/Constants";
import { getToken } from "../../utils/Constants";

const ChangePasswordService = {
  ChangePassword: async (requestData) => {
    console.log("Request Data inside service: " , requestData)
    const temp = axios.post(BASE_URL + "user/change-password", requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,

      },
    });
    // console.log("temp",temp.data);
    console.log("token",await getToken());
    console.log("temp",temp);
    return temp;
  },
};

export default ChangePasswordService;
