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


import React, {useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import LoginService from "../../Services/LoginService";
import "../../css/LoginComponent.css";
import { useTranslation } from "react-i18next";
import LanguageButton from "../Header/LanguageButton";
import LoadingComponent from "../Loading/LoadingComponent";
const ForgotPasswordComponent = ({setIsOTPVerified}) => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const location = useLocation();
  const {email} = location?.state;
  console.log("email on otp page pass from forgot pass email page",email)
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    email: email,
    otp: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.replace(/\D/g, ''); // \D matches any character that is not a digit
    setRequestData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // setIsOTPVerified(true)
    // navigate("/forgot-change-password",{ state: { type: "forgot-password" } });
    try {
      setLoading(true);
      console.log("request data containing email and otp",requestData);
      const response = await LoginService.verifyOTP(requestData);
      console.log("Verify OTP for forgot paswor API Response: ", response);
      if (response?.data) {
        setLoading(false);
        setIsOTPVerified(true);
        navigate("/forgot-change-password",{ state: { email: email } });
      } 
      }
     catch (error) {
      console.log("Error Verify OTP for forgot paswor API Response: ",error)
      setLoading(false);
      alert(`Login Failed : ${error?.response?.data}`);
    }
  };

  if (loading) return <LoadingComponent />;
  return (
    <div class="font-[sans-serif] text-[#333]">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <LanguageButton />
      </div>
      <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div class="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div class="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form class="space-y-6" onSubmit={handleSubmit}>
              <div class="mb-10">
                <h3 class="text-3xl font-extrabold text-[#6467c0]">
                  {t("login.Verify OTP")}
                </h3>
              </div>
              <div>
                <label class="text-sm mb-2 block text-[#6467c0]">
                  {t("login.OTP")}
                </label>
                <div class="relative flex items-center">
                  <input
                    name="otp"
                    type="text"
                    required
                    pattern="[0-9]{6}"
                    maxLength="6"
                    class="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    placeholder={t("login.Enter 6 Digit OTP")}
                    value={requestData.otp}
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    class="w-[18px] h-[18px] absolute right-4"
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

              <div class="!mt-10">
                <button
                  type="submit"
                  class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#6467c0] hover:bg-[#696bab] focus:outline-none"
                >
                  {t("login.Verify OTP")}
                </button>
              </div>
            </form>
          </div>
          <div class="lg:h-[400px] md:h-[300px] max-md:mt-10">
            <img
              src="https://readymadeui.com/login-image.webp"
              class="w-full h-full object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};



export default ForgotPasswordComponent