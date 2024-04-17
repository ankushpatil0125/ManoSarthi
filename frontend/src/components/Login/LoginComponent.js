import React, { useContext, useState } from "react";
import { EMAIL_URL, PASS_URL } from "../../utils/images";
import { Link, useNavigate } from "react-router-dom";
import LoginService from "../../Services/LoginService";
import "../../css/LoginComponent.css";
import { useTranslation } from "react-i18next";
import LanguageButton from "../Header/LanguageButton";
import IsPasswordChangeService from "../../Services/IsPasswordChangeService";
import AuthContext from "../Context/AuthContext";
import LoadingComponent from "../Loading/LoadingComponent";

const LoginComponent = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    username: "",
    password: "",
  });
  const { setJWT } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      setLoading(true);
      const response = await LoginService.userLogin(requestData);

      console.log("Login API Response: ", response);
      if (response) {
        // Handle successful login, e.g., redirect to another page
        alert("Login Successful...");
        localStorage.setItem("JWT", response.data.jwtToken);
        setJWT(response.data.jwtToken);
        localStorage.setItem("ROLE", response.data.role);
        // localStorage.setItem("User_Id", response.data.user_id);

        // console.log("User Response Data ", response.data);

        const changepass_response =
          await IsPasswordChangeService.isPasswordChanged(response);

        console.log(
          "Is ChangePassword Field API Response: ",
          changepass_response
        );

        if (changepass_response === false) {
          navigate("/change-password");
        } else {
          if (response.data.role === "[ROLE_ADMIN]") navigate("/admin-home");
          else if (response.data.role === "[ROLE_DOCTOR]") {
            console.log("role", response.data.role);

            navigate("/doctor-home", { replace: true });
          } else {
            navigate("/supervisor-home", { replace: true });
          }
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      alert(error.response.data);
    }
  };

  // useEffect(() => {
  //   if (
  //     localStorage.getItem("JWT") !== null &&
  //     localStorage.getItem("ROLE") === "[ROLE_ADMIN]"
  //   )
  //     navigate("/admin-home", { replace: true });
  //   if (
  //     localStorage.getItem("JWT") !== null &&
  //     localStorage.getItem("ROLE") === "[ROLE_DOCTOR]"
  //   )
  //     navigate("/doctor-home", { replace: true });
  //   if (
  //     localStorage.getItem("JWT") !== null &&
  //     localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]"
  //   )
  //     navigate("/supervisor-home", { replace: true });
  // }, []);

  if (loading) return <LoadingComponent />;
  return (
    <div className="mb-20">
      <form onSubmit={handleSubmit}>
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <LanguageButton />
        </div>
        <div className="login-container ">
          <div className="header">
            <div className="text">{t("login.LOGIN")}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img className="img" src={EMAIL_URL} alt="" />
              <input
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
            {t("login.forgot-password")}?
            <Link to="/forgot-password">{t("login.Click_Here")}!</Link>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">
              {t("login.LOGIN")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
