import React, { useState } from "react";
import { EMAIL_URL, PASS_URL } from "../utils/images";
import { Link, useNavigate } from "react-router-dom";
import LoginService from "../Services/LoginService";
import "../css/LoginComponent.css";
import { useTranslation } from "react-i18next";
import LanguageButton from "./LanguageButton";


const LoginComponent = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(requestData.username);
      console.log(requestData.password);
      // const response = await axios.post(http://192.168.73.199:9090/auth/login,requestData);

      const response = await LoginService.AddUser(requestData);
      
      console.log("response", response);
      if ( response) {
        // Handle successful login, e.g., redirect to another page
        alert("Login successful");
        if(response.data.role === "[ROLE_ADMIN]")
          navigate("/add-doctor");
        else  
          navigate("/change-password")
      } 
    } catch (error) {
      console.log(error.response);
      if(error.response.data.includes("timeout"))
        alert("Access restricted. Please log in during operating hours");
      else
        alert(`Login Failed : ${error.response.data}`);
    }
  };

  return (
    <div>
      <LanguageButton/>
    <div className="login-container">
      <div className="header">
        <div className="text">{t("login.LOGIN")}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img className="img" src={EMAIL_URL} alt="" />
          <input
            type="email"
            placeholder={t("login.username")}
            name="username"
            value={requestData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img className="img" src={PASS_URL} alt="" />
          <input
            type="password"
            placeholder={t("login.Password")}
            name="password"
            value={requestData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="forgot-password">
      {t("login.forgot-password")}?<Link to="/forgot-password">{t("login.Click_Here")}!</Link>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
        {t("login.LOGIN")}
        </div>
      </div>
      {/* <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          <Link to="/add-doctor" className="submit">
            Login
          </Link>
        </div>
      </div> */}
    </div>
          
    </div>
  );
};

export default LoginComponent;