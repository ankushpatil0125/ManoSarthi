import axios from "axios";
import { BASE_URL } from "../utils/Constants";

const LoginService = {
  userLogin: async (requestData) => {
    try {
      const resp = axios.post(BASE_URL + "auth/login", requestData);

      return resp;
    } catch (error) {
      throw error;
    }
  },
  verifyEmail :async (requestData) => {
    try{
      const resp = axios.post(BASE_URL + "user/verify-email/"+ requestData?.email);
      return resp;
    }
    catch(error){
      throw error;
    }
  },
  verifyOTP :async (requestData) => {
    try{
      const resp = axios.post(BASE_URL + "user/verify-otp", requestData);
      return resp;
    }
    catch(error){
      throw error;
    }
  }
};

export default LoginService;
