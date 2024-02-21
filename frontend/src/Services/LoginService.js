import axios from "axios";
import { BASE_URL } from "../utils/Base_URL";
// const LOGIN_BASE_URL = "http://192.168.141.199:9090/auth/login";

const LoginService = {
  AddUser: async (requestData) => {
    const temp = axios.post( BASE_URL+"auth/login" , requestData);
    // console.log("temp",temp.data);
    return temp;
  },
};

export default LoginService;