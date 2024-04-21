import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PASS_URL } from "../../utils/images";
import "../../css/LoginComponent.css";
import ChangePasswordService from "../../Services/ChangePasswordService";
import LoadingComponent from "../Loading/LoadingComponent";

const ChangePasswordComponent = () => {
  const [requestData, setRequestData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "newPassword") {
      setIsValid(validatePassword(value));
    }
  };

  //Validate the password
  const validatePassword = (newPassword) => {
    // Regular expression to check if the password contains at least one uppercase letter,
    // one lowercase letter, one number, and is at least 8 characters long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(newPassword);
  };

  const handleSubmit = async () => {
    try {
      // console.log(requestData.oldPassword);
      // console.log(requestData.newPassword);
      setLoading(true);
      if (isValid === true) {
        const response = await ChangePasswordService.ChangePassword(
          requestData
        );
        console.log("Response of ChangePassword API: ", response);
        console.log("Response Data of ChangePassword API: ", response.data);

        if (response) {
          alert(response.data);
          setLoading(false);
          localStorage.removeItem("JWT");
          localStorage.removeItem("ROLE");
          localStorage.removeItem("User_Id");
          navigate("/");
        }
      } else {
        alert("Enter both the Password");
        setLoading(false);
      }
    } catch (error) {
      alert(error.response.data);
      setLoading(false);
    }
  };
  if (loading) return <LoadingComponent />;
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
            Password must contain at least one uppercase letter, one lowercase
            letter, one number, and be at least 8 characters long.
          </p>
        </div>
      )}
      {isValid && (
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Change Password
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordComponent;







// <div class="font-[sans-serif] text-[#333]">
//       <div className="absolute top-0 right-0 mt-4 mr-4">
//         <LanguageButton />
//       </div>
//       <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
//         <div class="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
//           <div class="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
//             <form class="space-y-6" onSubmit={handleSubmit}>
//               <div class="mb-10">
//                 <h3 class="text-3xl font-extrabold text-[#6467c0]">
//                   {t("login.Sign in to your Account")}
//                 </h3>
//               </div>
//               <div>
//                 <label class="text-sm mb-2 block text-[#6467c0]">
//                   {t("login.User name")}
//                 </label>
//                 <div class="relative flex items-center">
//                   <input
//                     name="username"
//                     type="text"
//                     required
//                     class="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
//                     placeholder={t("login.Enter user name")}
//                     value={requestData.username}
//                     onChange={handleChange}
//                   />
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="#bbb"
//                     stroke="#bbb"
//                     class="w-[18px] h-[18px] absolute right-4"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       cx="10"
//                       cy="7"
//                       r="6"
//                       data-original="#000000"
//                     ></circle>
//                     <path
//                       d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
//                       data-original="#000000"
//                     ></path>
//                   </svg>
//                 </div>
//               </div>
//               <div>
//                 <label class="text-sm mb-2 block text-[#6467c0]">
//                   {t("login.Password")}
//                 </label>
//                 <div class="relative flex items-center">
//                   <input
//                     name="password"
//                     type={passwordVisible ? 'text' : 'password'}
//                     required
//                     class="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
//                     placeholder={t("login.Enter password")}
//                     value={requestData.password}
//                     onChange={handleChange}
                    
//                   />
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="#bbb"
//                     stroke="#bbb"
//                     class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
//                     viewBox="0 0 128 128"
//                     onClick={togglePasswordVisibility}
//                   >
//                     <path
//                       d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
//                       data-original="#000000"
//                     ></path>
//                   </svg>
//                 </div>
//               </div>
//               <div class="flex items-center justify-between gap-2">
//                 <div class="text-sm">
//                   {t("login.Forgot-password")}?
//                   <Link
//                     to="/forgot-password"
//                     class="text-blue-600 hover:underline items-center"
//                   >
//                     {t("login.Click_Here")}!
//                   </Link>
//                 </div>
//               </div>
//               <div class="!mt-10">
//                 <button
//                   type="submit"
//                   class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#6467c0] hover:bg-[#696bab] focus:outline-none"
//                 >
//                   {t("login.LOGIN")}
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div class="lg:h-[400px] md:h-[300px] max-md:mt-10">
//             <img
//               src="https://readymadeui.com/login-image.webp"
//               class="w-full h-full object-cover"
//               alt="Dining Experience"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
