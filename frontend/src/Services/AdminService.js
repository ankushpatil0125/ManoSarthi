import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";

const AdminService = {
  addDoctor: async (doctorData) => {
    // const token = getToken();
    try {
      const response = await axios.post(BASE_URL + "admin/doctor", doctorData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log("Service: Before returning response: ", response);
      return response;
    } catch (error) {
      console.error("Service: Error Adding Doctor: ", error.response.data);
      throw error.response.data.message;
    }
  },
  addSupervisor: async (supervisorData) => {
    try {
      const response = await axios.post(
        BASE_URL + "admin/supervisor",
        supervisorData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Service: Error Adding Supervisor: ", error);
      // throw error;
      throw error.response.data.message;
    }
  },
  getDistrict: async (role, assigned) => {
    try {
      const response = await axios.get(
        BASE_URL + "district/?role=" + role + "&assigned=" + assigned,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Service: Error Fetching District Options: ", error);
      throw error.response.data.message;
    }
  },

  getSubDistrict: async (districtcode,role,assigned) => {
    try {
      const response = await axios.get(
        BASE_URL + "subdistrict/?districtcode=" + districtcode+"&role="+role+"&assigned="+assigned,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Service: Error Fetching Subdistrict Options:", error);
      throw error.response.data.message;
    }
  },

  getAllDoctors: async (pagenumber) => {
    try {
      console.log("before calling getAll");
      const response = await axios.get(
        BASE_URL + "admin/doctor?pagenumber=" + pagenumber,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );
      console.log("Service: All Doctors In All Districts", response);
      return response;
    } catch (error) {
      console.error(
        "Service: Error Fetching All Doctors In All Districts: ",
        error
      );
      throw error.response.data.message;
    }
  },
  getAllDistrictDoctors: async (code, pagenumber) => {
    try {
      const response = await axios.get(
        BASE_URL +
          "admin/doctor/district?districtcode=" +
          code +
          "&pagenumber=" +
          pagenumber,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );
      console.log("Service: All Doctors In Selected District", response);
      return response;
    } catch (error) {
      console.error(
        "Service: Error Fetching All Doctors In Selected District: ",
        error
      );
      throw error.response.data.message;
    }
  },
  getAllSubDistrictDoctors: async (code) => {
    try {
      const response = await axios.get(
        BASE_URL + "admin/doctor/subdistrict/?subdistrictcode=" + code,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );
      console.log("Service: All Doctors In Selected Subdistricts: ", response);
      return response;
    } catch (error) {
      console.error(
        "Service: Error Fetching All Doctors In Selected Subdistricts: ",
        error
      );
      throw error.response.data.message;
    }
  },

  getAllSupervisors: async (pagenumber) => {
    try {
      console.log("before calling getAll");
      const response = await axios.get(
        BASE_URL + "admin/supervisor?pagenumber=" + pagenumber,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );
      console.log("Service: All Supervisors In All Districts: ", response);
      return response;
    } catch (error) {
      console.error(
        "Service: Error Fetching All Supervisors In All Districts: ",
        error
      );
      throw error.response.data.message;
    }
  },
  getAllDistrictSupervisors: async (code, pagenumber) => {
    try {
      const response = await axios.get(
        BASE_URL +
          "admin/supervisor/district?districtcode=" +
          code +
          "&pagenumber=" +
          pagenumber,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );
      console.log("Service: All Supervisors In Selected District", response);
      return response;
    } catch (error) {
      console.error(
        "Service: Error Fetching All Supervisors In Selected District: ",
        error
      );
      throw error.response.data.message;
    }
  },
  getAllSubDistrictSupervisors: async (code) => {
    try {
      const response = await axios.get(
        BASE_URL + "admin/supervisor/subdistrict/?subdistrictcode=" + code,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            // withCredentials:false
          },
        }
      );
      console.log("Service: All Supervisors In Selected Subdistrict", response);
      return response;
    } catch (error) {
      console.error(
        "Service: Error Fetching All Supervisors In Selected Subdistrict: ",
        error
      );
      throw error.response.data.message;
    }
  },
};
export default AdminService;
