import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PASS_URL } from "../../utils/images";
import "../../css/LoginComponent.css"
const CONST_LOGIN_CHECK = "http://localhost:9090/auth/login";

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log(email);
      const response = await fetch(CONST_LOGIN_CHECK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="text">Forgot Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img className="img" src={PASS_URL} alt="" />
          <input
            type="email"
            placeholder="Enter Email-Id"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            <Link to="/otp" className="submit">
              Send OTP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;