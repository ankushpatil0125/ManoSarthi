// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { PASS_URL } from "../../utils/images";
// import "../../css/LoginComponent.css"
// import LoadingComponent from "../Loading/LoadingComponent";
// const CONST_LOGIN_CHECK = "http://localhost:9090/auth/login";

// const ForgotPasswordComponent = () => {
//   const [email, setEmail] = useState("");
//   const [loading,setLoading] = useState(false);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log(email);
//       setLoading(true);
//       const response = await fetch(CONST_LOGIN_CHECK, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         // Handle successful login, e.g., redirect to another page
//         setLoading(false);
//         alert("Password Successfully Changed");
//       } else {
//         // Handle login failure
//         alert("Failed");
//       }
//     } catch (error) {
//       alert(error.response.data.message);
//         setLoading(false);
//     }
//   };
//   if(loading)return <LoadingComponent/>
//   return (
//     <div className="login-container">
//       <div className="header">
//         <div className="text">Forgot Password</div>
//         <div className="underline"></div>
//       </div>
//       <div className="inputs">
//         <div className="input">
//           <img className="img" src={PASS_URL} alt="" />
//           <input
//             type="email"
//             placeholder="Enter Email-Id"
//             value={email}
//             onChange={handleEmailChange}
//           />
//         </div>

//         <div className="submit-container">
//           <div className="submit" onClick={handleSubmit}>
//             <Link to="/otp" className="submit">
//               Send OTP
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordComponent;


import React, { useContext, useEffect, useState } from "react";
import { EMAIL_URL, PASS_URL } from "../../utils/images";
import { Link, useNavigate } from "react-router-dom";
import LoginService from "../../Services/LoginService";
import "../../css/LoginComponent.css";
import { useTranslation } from "react-i18next";
import LanguageButton from "../Header/LanguageButton";
import IsPasswordChangeService from "../../Services/IsPasswordChangeService";
import AuthContext from "../Context/AuthContext";
import LoadingComponent from "../Loading/LoadingComponent";
//const ForgotPasswordComponent = ({setIsEmailVerified}) => {

const ForgotPasswordComponent = ({setIsEmailVerified}) => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    email: "",
  });
  // const { setJWT } = useContext(AuthContext);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsEmailVerified(true);
    // navigate("/otp-verify",{state :{email :requestData.email}}); 
    try {
      setLoading(true);
      console.log("request data containing email",requestData);
      const response = await LoginService.verifyEmail(requestData);
      console.log("Verify Email for forgot paswor API Response: ", response);
      if (response?.data) {
        setLoading(false);
        setIsEmailVerified(true);
        navigate("/otp-verify",{state :{email :requestData?.email}}); 
      } 
      }
     catch (error) {
      console.log("Error Verify Email for forgot paswor API Response: ",error)
      setLoading(false);
      alert(`Login Failed : ${error?.response?.data}`);
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
                  {t("login.Forgot Password")}
                </h3>
              </div>
              <div>
                <label className="text-sm mb-2 block text-[#6467c0]">
                  {t("login.Email Address")}
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    placeholder={t("login.Enter Email Address")}
                    value={requestData?.email}
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="!mt-10">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#6467c0] hover:bg-[#696bab] focus:outline-none"
                >
                  {t("login.Verify Email Address")}
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-10">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};



export default ForgotPasswordComponent