import axios from "axios";
import { BASE_URL, getToken } from "../../utils/Constants";

const IsPasswordChangeService ={
    isPasswordChanged : async (response) => {
        try {
          const res = await axios.get(BASE_URL + "passwordstatus/?username="+ response.data.username, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getToken()}`,
            },
          });
          // console.log("res.data.changepass",res);
          return res.data;
        } catch (error) {
          console.error("Error in fetching password is changed or not:", error);
          throw error;
        }
      }
}


export default IsPasswordChangeService;