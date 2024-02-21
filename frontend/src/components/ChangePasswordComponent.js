import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { PASS_URL } from "../utils/images";
import "../css/LoginComponent.css";
import ChangePasswordService from "../Services/ChangePasswordService";
// const CONST_LOGIN_CHECK = "http://localhost:9090/auth/login";


const ChangePasswordComponent = () => {
  const [requestData, setRequestData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(requestData.oldPassword);
      console.log(requestData.newPassword);
      const response = await ChangePasswordService.ChangePassword(requestData);
      // Using axios for the POST request
      // const response = await axios.post(
      //   "http://192.168.141.199:9090/user/change-password",
      //   requestData,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //       // withCredentials:false
      //     },
      //   }
      // );

      console.log("response of changePassword",response);

      if (response) {
        // Handle successful password change, e.g., display a success message
        alert("Password Successfully Changed");


        // navigate("/");
        
      } else {
        // Handle password change failure"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwbWFudSIsImlhdCI6MTcwODUwMDgxMywiZXhwIjoxNzA4NTQwMTQwfQ.bp6DuaqPBGrJUeLgBJcNGwfNdYKDvFMR2DRtRm8GSaw"
        alert("Failed");
      }
    } catch (error) {
      console.error(`Error during password change:", ${error}`);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="text">Change Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img className="img" src={PASS_URL} alt="" />
          <input
            type="password"
            placeholder="Enter Old Password"
            value={requestData.oldPassword}
            name="oldPassword"
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <img className="img" src={PASS_URL} alt="" />
          <input
            type="pass"
            placeholder="Enter New Password"
            name="newPassword"
            value={requestData.newPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          Change Password
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;