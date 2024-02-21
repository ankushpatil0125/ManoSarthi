import axios from "axios";

const DOCTOR_API_BASE_URL = "";

const DoctorService = {
  addDoctor : (doctordata) => {
    return axios.post({DOCTOR_API_BASE_URL},doctordata);
  }
};

export default DoctorService;
