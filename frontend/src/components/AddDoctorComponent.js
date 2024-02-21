import React, { useState } from "react";
import "../css/AddDoctorComponent.css";
import Header from "./Header";
import ChangePasswordComponent from "./ChangePasswordComponent";
// import Header from "./Header";
// import Footer from "./Footer";
// import { useTranslation } from "react-i18next";
// import DoctorService from "../Services/DoctorService";

const AddDoctorComponent = () => {
  // const {t}=useTranslation("gloabal");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    const doctordetails = {
      district,
      subDistrict,
      name,
      mobileNo,
      email,
      gender,
      dob,
    };

    console.log(doctordetails);

    // DoctorService.AddDoctor(doctordetails);


    e.preventDefault();
    // Handle form submission logic
  };

  // Array of district options
  const districtOptions = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];
  const subdistrictOptions = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];
  return (
    <div>
      <Header />
      <ChangePasswordComponent/>
      <div className="doctor-container">
        <h4>Fill The Doctor Information :</h4>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="district">District:</label>
              <select
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">Select</option>
                {districtOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                {/* Options for District Dropdown */}
              </select>
            </div>
            <div>
              <label htmlFor="subDistrict">Subdistrict:</label>
              <select
                id="subDistrict"
                value={subDistrict}
                onChange={(e) => setSubDistrict(e.target.value)}
              >
                <option value="">Select</option>
                {subdistrictOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                {/* Options for Subdistrict Dropdown */}
              </select>
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mobileNo">Mobile No:</label>
              <input
                type="text"
                id="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
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
            </div>
            <button type="submit">ADD DOCTOR</button>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AddDoctorComponent;