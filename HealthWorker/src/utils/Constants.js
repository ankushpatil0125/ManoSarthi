// Constants.js

import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://192.168.239.54:9090/";

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("JWT");
    // console.log("value",value)
    return value;
  } catch (error) {
    console.error("Error getting token from AsyncStorage:", error);
    return null;
  }
};
