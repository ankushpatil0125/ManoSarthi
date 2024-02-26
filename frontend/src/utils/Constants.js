export const BASE_URL = "http://192.168.0.118:9090/";
// export const token = localStorage.getItem("JWT");
// console.log("Constant run");

export const getToken = () => {
    return localStorage.getItem("JWT");
}