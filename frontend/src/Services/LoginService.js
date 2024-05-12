import axios from "axios";
import { BASE_URL, getToken } from "../utils/Constants";

const LoginService = {
  userLogin: async (requestData) => {
    try {
      const resp = axios.post(BASE_URL + "auth/login", requestData);
      return resp;
    } catch (error) {
      throw error;
    }
  },
  verifyEmail: async (requestData) => {
    try {
      const resp = axios.post(
        BASE_URL + "user/verify-email/" + requestData?.email
      );
      return resp;
    } catch (error) {
      throw error;
    }
  },
  verifyOTP: async (requestData) => {
    try {
      const resp = axios.post(BASE_URL + "user/verify-otp", requestData);
      return resp;
    } catch (error) {
      throw error;
    }
  },

  resendOTP: async (email) => {
    try {
      const resp = axios.get(BASE_URL + "user/resend-otp/" + email);
      return resp;
    } catch (error) {
      throw error;
    }
  },
  logoutService: async (email) => {
    try {
      // console.log("Token",getToken());
      const resp = axios.post(BASE_URL + "/api/v1/logout", {
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

export default LoginService;
