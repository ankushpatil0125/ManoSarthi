import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { getToken } from "../utils/Constants";
import { useState } from "react";

const AdminService = {
  addDoctor: async (doctorData) => {
    // const token = getToken();
    try{
      const response = await axios.post(BASE_URL + "admin/doctor",
        doctorData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response;
    }
    catch(error){
      console.error("Error Adding Doctor:", error);
      throw error;
    }

  },
  addSupervisor: async (supervisorData) => {
    try{
      const response = await axios.post(BASE_URL + "admin/supervisor",
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
    }
    catch(error){
      console.error("Error Adding Supervisor:", error);
      throw error;
    }
    
  },
  getDistrict: async () => {
    try {
      const response = await axios.get(BASE_URL + "district/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          // withCredentials:false
        },
      });

      return response;
    } catch (error) {
      console.error("Error fetching district options:", error);
      throw error;
    }
  },

  getSubDistrict: async (districtcode) => {
    try {
      const response = await axios.get(
        BASE_URL + "subdistrict/?districtcode=" + districtcode,
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
      console.error("Error fetching district options:", error);
      throw error;
    }
  },

  getAllDoctors: async (pagenumber) => {
    try {
      console.log('before calling getAll')
      const response = await axios.get(BASE_URL + "admin/doctor?pagenumber="+pagenumber, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          // withCredentials:false
        },
      });
      console.log("Doctor list",response);
      return response;
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      throw error;
    }
  },
  getAllDistrictDoctors: async (code,pagenumber) => {
    try {
      
      const response = await axios.get(BASE_URL + "admin/doctor/district?districtcode="+code+"&pagenumber="+pagenumber, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          // withCredentials:false
        },
      });
      console.log("all district doctor",response);
      return response;
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      throw error;
    }
  },
  getAllSubDistrictDoctors: async (code) => {
    try {
      
      const response = await axios.get(BASE_URL + "admin/doctor/subdistrict/?subdistrictcode="+code, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          // withCredentials:false
        },
      });
      console.log("all district doctor",response);
      return response;
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      throw error;
    }
  },

};
export default AdminService;

