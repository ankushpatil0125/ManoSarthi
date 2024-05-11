
export const BASE_URL = "http://192.168.213.199:9090/";
export const getToken = () => {
  // console.log("getToken",localStorage.getItem("JWT"));
  return localStorage.getItem("JWT");
};

export const getUserId = () => {
  return localStorage.getItem("User_Id");
};
