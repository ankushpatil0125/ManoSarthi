
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../../css/LoginComponent.css";
import ChangePasswordService from "../../Services/ChangePasswordService";
import LoadingComponent from "../Loading/LoadingComponent";
import LanguageButton from "../Header/LanguageButton";

const ForgotChangePassword = () => {
  const [requestData, setRequestData] = useState({
    newPassword: "",
    oldPassword:""
  });
  const [oldPassword, setoldPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const {email} = location?.state;
  console.log("Email from otp page",email);
  const [passwordVisiblefornewpassword, setPasswordVisiblefornewpassword] = useState(false);
  const [passwordVisibleforoldPassword, setPasswordVisibleforoldPassword] = useState(false);


  const togglePasswordVisibilityfornewpassword = () => {
    setPasswordVisiblefornewpassword(!passwordVisiblefornewpassword);
  };
  const togglePasswordVisibilityforoldPassword = () => {
    setPasswordVisibleforoldPassword(!passwordVisibleforoldPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "newPassword") {
      setIsValid(validatePassword(value) && value === oldPassword);
    }
    if (name === "oldPassword") {
      setIsValid(validatePassword(requestData.newPassword) && value === requestData.newPassword);
      setoldPassword(value);
    }
  };

  // Validate the password
  const validatePassword = (newPassword) => {
    // Regular expression to check if the password contains at least one uppercase letter,
    // one lowercase letter, one number, and is at least 8 characters long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(newPassword);
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);
    if (isValid && oldPassword === requestData.newPassword) {
      const isValidNewPassword = validatePassword(requestData.newPassword);
      if (!isValidNewPassword) {
        alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.");
        setLoading(false);
        return;
      }
      // requestData.oldPassword = oldPassword;
      console.log("reqestdata", requestData);
      const response = await ChangePasswordService.ChangePasswordForgotPassword(requestData,email);
      if (response) {
        // alert(response?.data);
        setLoading(false);
        alert("Password changed successfully");
        navigate("/");
      }
    } else {
      alert("Passwords do not match");
      setLoading(false);
    }
  } catch (error) {
    alert("Error is passsord changed",error?.response?.data);
    setLoading(false);
  }
};

  if (loading) return <LoadingComponent />;
  
  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <LanguageButton />
      </div>
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-10">
                <h3 className="text-3xl font-extrabold text-[#6467c0]">
                  Change the Password
                </h3>
              </div>


              <div>
                <label className="text-sm mb-2 block text-[#6467c0]">
                  Enter New password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={passwordVisiblefornewpassword ? 'text' : 'password'}
                    placeholder="Enter New Password"
                    name="newPassword"
                    required
                    value={requestData.newPassword}
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={togglePasswordVisibilityfornewpassword}
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block text-[#6467c0]">
                  Verify New password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={passwordVisibleforoldPassword ? 'text' : 'password'}
                    placeholder="Verify New Password"
                    name="oldPassword"
                    required
                    value={oldPassword}
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={togglePasswordVisibilityforoldPassword}
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
            </form>
            {!isValid && (
              <div className="password-validation-msg text-center">
                <p className="text-[#6467c0] ">
                  Password must contain at least one uppercase letter, one
                  lowercase letter, one number, and be at least 8 characters
                  long.
                </p>
              </div>
            )}
            {isValid && requestData.newPassword === oldPassword && (
              <div className="!mt-10">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#6467c0] hover:bg-[#696bab] focus:outline-none"
                  onClick={handleSubmit}
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-10">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#6467c0] hover:bg-[#696bab] focus:outline-none"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotChangePassword;
