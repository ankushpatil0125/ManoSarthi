import React, { useState } from "react";
import { PASS_URL } from "../utils/images";
import "../css/LoginComponent.css";
const CONST_LOGIN_CHECK = "http://localhost:9090/auth/login";


const ChangePasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = async () => {
    if (password === pass) {
      try {
        console.log(password);
        const response = await fetch(CONST_LOGIN_CHECK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
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
    } else {
      alert("Pasword did not match");
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
            placeholder="Enter New Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="input">
          <img className="img" src={PASS_URL} alt="" />
          <input
            type="pass"
            placeholder="Confirm Password"
            value={pass}
            onChange={handlePassChange}
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