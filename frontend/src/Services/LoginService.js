import axios from "axios";
import { BASE_URL } from "../utils/Constants";

const LoginService = {
  AddUser: async (requestData) => {
    const temp = axios.post( BASE_URL+"auth/login" , requestData);

    return temp;
  },
};

export default LoginService;