import axios from "axios";

const LOGIN_BASE_URL = "http://192.168.141.199:9090/auth/login";

const LoginService = {
  AddUser: async (requestData) => {
    const temp = axios.post( LOGIN_BASE_URL , requestData);
    // console.log("temp",temp.data);
    return temp;
  },
};

export default LoginService;