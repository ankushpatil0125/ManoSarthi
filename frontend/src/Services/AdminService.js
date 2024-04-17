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
      // console.error("Service: Error Adding Doctor: ", error.response.data);
      throw error;
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
      // console.error("Service: Error Adding Supervisor: ", error);
      // throw error;
      throw error;
    }
  },

  reassignSupervisor: async (reasignSupervisor) => {
    try {
      console.log("inside reassignSupervisor")
      const response = await axios.put(
        BASE_URL + "admin/reassign-supervisor",
        reasignSupervisor,
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
      // console.error("Service: Error Reassigning Supervisor: ", error);
      console.log("AEERORRRR: ", error);
      // throw error;
      throw error;
    }
  },
  deleteSupervisor: async (Id) => {
    try {
      const response = await axios.delete(BASE_URL + "admin/supervisor", {
        data: Id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    } catch (error) {
      // console.error("Service: Error Reassigning Supervisor: ", error);
      // throw error;
      throw error;
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
      // console.error("Service: Error Fetching District Options: ", error);
      throw error;
    }
  },

  getSubDistrict: async (districtcode, role, assigned) => {
    try {
      const response = await axios.get(
        BASE_URL +
          "subdistrict/?districtcode=" +
          districtcode +
          "&role=" +
          role +
          "&assigned=" +
          assigned,
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
      // console.error("Service: Error Fetching Subdistrict Options:", error);
      throw error;
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
      // console.error(
      //   "Service: Error Fetching All Doctors In All Districts: ",
      //   error
      // );
      throw error;
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
      // console.error(
      //   "Service: Error Fetching All Doctors In Selected District: ",
      //   error
      // );
      throw error;
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
      throw error;
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
      // console.error(
      //   "Service: Error Fetching All Supervisors In All Districts: ",
      //   error
      // );
      throw error;
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
      // console.error(
      //   "Service: Error Fetching All Supervisors In Selected District: ",
      //   error
      // );
      throw error;
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
      // console.error(
      //   "Service: Error Fetching All Supervisors In Selected Subdistrict: ",
      //   error
      // );
      throw error;
    }
  },
};
export default AdminService;
