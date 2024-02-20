import React, { useState } from "react";
import { PASS_URL } from "../utils/images";
import { Link } from 'react-router-dom';

import "../css/LoginComponent.css"
const CONST_LOGIN_CHECK = "http://localhost:9090/auth/login";


const OTPComponent = () => {
  const [otp, setOtp] = useState("");


  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  

  const handleSubmit = async () => {

      try {
        console.log(otp);
        const response = await fetch(CONST_LOGIN_CHECK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        });

        if (response.ok) {
          // Handle successful login, e.g., redirect to another page
          alert("Password Successfully Changed");
        } else {
          // Handle login failure
          alert("Failed");
        }
      } catch (error) {
        console.error("Error during password change:", error);
      }
    }
  

  return (
    <div className="login-container">
      <div className="header">
        <div className="text">OTP Verification</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img className="img" src={PASS_URL} alt="" />
          <input
            type="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOTPChange}
          />
        </div>

        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
          <Link to="/change-password" className="submit">Verify OTP</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPComponent;