import React, { useState, useEffect } from "react";
import "../css/AddDoctorComponent.css";
import Header from "./Header";
// import DoctorService from "../Services/DoctorService";
import AdminService from "../Services/AdminService";
import axios from "axios";

const AddDoctorComponent = () => {
  const [district, setDistrict] = useState("");
  const [subdistrictcode, setSubDistrictcode] = useState({ code: "" });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);

  // const doctorData = {
  //   email: email,
  //   firstname: firstname,
  //   lastname: lastname,
  //   subdistrictcode: {
  //     code: subdistrictcode
  //   }
  // };

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5hc2kiLCJpYXQiOjE3MDg1Mjc4NjUsImV4cCI6MTcwODU0MDE0MH0.oHBoQ05t5z9D0STWxeVTH85F3mLFIdoMEFGGhndyFa8";

  useEffect(() => {
    // Fetch district options
    AdminService.getDistrict()
      .then((response) => {
        setDistrictOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching district options:", error);
      });
  }, []);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    // Fetch subdistrict options based on selected district
    AdminService.getSubDistrict(selectedDistrict)
      .then((response) => {
        setSubDistrictOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subdistrict options:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hii");
    // Create doctor object
    const doctorData = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      subdistrictcode: {
        code: subdistrictcode
      }
    };

    try {
      // Using axios for the POST request
      console.log("doctor data", doctorData);
      const response = await axios.post(
        "http://192.168.73.199:9090/admin/doctor",
        doctorData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // withCredentials:false
          },
        }
      );

      console.log("response of changePassword", response);

      if (response) {
        // Handle successful password change, e.g., display a success message
        alert("Doctor Added Successfully");
      } else {
        // Handle password change failure"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwbWFudSIsImlhdCI6MTcwODUwMDgxMywiZXhwIjoxNzA4NTQwMTQwfQ.bp6DuaqPBGrJUeLgBJcNGwfNdYKDvFMR2DRtRm8GSaw"
        alert("Failed");
      }
    } catch (error) {
      console.error(`Error during adding doctor:", ${error}`);
    }
  };

  return (
    <div>
      <Header />

      <div className="doctor-container">
        <h4>Fill The Doctor Information :</h4>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="district">District:</label>
              <select
                id="district"
                value={district}
                onChange={handleDistrictChange}
              >
                <option value="">Select</option>
                {districtOptions.map((district, index) => (
                  <option key={index} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="subdistrictcode">Subdistrict:</label>
              <select
                id="subdistrictcode"
                value={subdistrictcode}
                onChange={(e) => setSubDistrictcode(e.target.value)}
              >
                <option value="">Select</option>
                {subDistrictOptions.map((subdistrict, index) => (
                  <option key={index} value={subdistrict.code}>
                    {subdistrict.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            {/* <div>
              <label htmlFor="mobileNo">Mobile No:</label>
              <input
                type="text"
                id="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div> */}
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <div>
              <label>Gender:</label>
              <br />
              <div className="ic">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male">Male</label>

                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female">Female</label>

                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>

            <div>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              /> 
             </div> */}
            <button type="submit">ADD DOCTOR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorComponent;
