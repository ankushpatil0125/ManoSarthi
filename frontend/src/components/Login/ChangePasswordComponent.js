import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { PASS_URL } from "../../utils/images";
import "../../css/LoginComponent.css";
import ChangePasswordService from "../../Services/ChangePasswordService";
// const CONST_LOGIN_CHECK = "http://localhost:9090/auth/login";


const ChangePasswordComponent = () => {

  const [requestData, setRequestData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [isValid,setIsValid] = useState(true);
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(name === "newPassword"){
        setIsValid(validatePassword(value))
    }
  };

  //Validate the password
  const validatePassword =(newPassword) =>{
    // Regular expression to check if the password contains at least one uppercase letter,
    // one lowercase letter, one number, and is at least 8 characters long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(newPassword); 
  }

  const handleSubmit = async () => {
    try {
      console.log(requestData.oldPassword);
      console.log(requestData.newPassword);
      if(isValid===true){
        const response = await ChangePasswordService.ChangePassword(requestData);
        console.log("response of changePassword",response);

        if (response) {
          alert("Password Successfully Changed");


          navigate("/");
          
        } else {
          alert("Failed");
        }
      }
      else{
        alert("Please enter a valid password");

      }
    } catch (error) {
      console.error(`Error during password change:", ${error}`);
    }
  };

  useEffect(() => {

  }, []);

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
      {!isValid && (
            <div className="password-validation-msg text-center">
              <p className="text-red-600 ">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and be at least 8 characters long.
              </p>
            </div>
          )}
      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          Change Password
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;