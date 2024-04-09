export const BASE_URL = "http://localhost:9090/";
export const getToken = () => {
  return localStorage.getItem("JWT");
};

export const getUserId = () => {
  return localStorage.getItem("User_Id");
};
