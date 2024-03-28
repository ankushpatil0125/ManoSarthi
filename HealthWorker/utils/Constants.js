import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://192.168.73.188:9090/";
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("JWT");

    
  } catch (e) {
    
  }
};

// export const getUserId = () => {
//     return localStorage.getItem("User_Id");
// }
