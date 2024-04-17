// import React, { useContext, useEffect, useState } from "react";
// import { EMAIL_URL, PASS_URL } from "../../utils/images";
// import { Link, useNavigate } from "react-router-dom";
// import LoginService from "../../Services/LoginService";
// import "../../css/LoginComponent.css";
// import { useTranslation } from "react-i18next";
// import LanguageButton from "../Header/LanguageButton";
// import DoctorHomePage from "../HomePage/DoctorHomePage";
// import AdminHomePage from "../HomePage/AdminHomePage";
// import IsPasswordChangeService from "../../Services/IsPasswordChangeService";
// import AuthContext from "../Context/AuthContext";
// import LoadingComponent from "../Loading/LoadingComponent"
// const LoginComponent = () => {
//   const [t] = useTranslation("global");
//   const navigate = useNavigate();
//   const [loading,setLoading] = useState(false);
//   const [requestData, setRequestData] = useState({
//     username: "",
//     password: "",
//   });
//   const { setJWT } = useContext(AuthContext);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRequestData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     try {
//       setLoading(true);
//       const response = await LoginService.AddUser(requestData);

//       console.log("response jwt", response);
//       if (response) {
//         // Handle successful login, e.g., redirect to another page
//         alert("Login successful");
//         localStorage.setItem("JWT", response.data.jwtToken);
//         setJWT(response.data.jwtToken);
//         localStorage.setItem("ROLE", response.data.role);
//         localStorage.setItem("User_Id", response.data.user_id);

//         console.log("user response.data ", response.data);

//         const changepass_response = await IsPasswordChangeService.isPasswordChanged(response);

//         console.log("Change pas", changepass_response);

//         if (changepass_response === false) navigate("/change-password");
//         else {
//           if (response.data.role === "[ROLE_ADMIN]") navigate("/admin-home");
//           else if (response.data.role === "[ROLE_DOCTOR]") {
//             navigate("/doctor-home", { replace: true });
//           } else {
//             navigate("/supervisor-home", { replace: true });
//           }
//         }
//         setLoading(false);
//       }
//     } catch (error) {
//       alert(error.response.data.message);
//         setLoading(false);
//       if(error.response.data === "CREDENTIALS INVALID ! ")alert("CREDENTIALS INVALID !!! Please Enter valid CREDENTIALS")
//       else if (error.response.data)
//         alert("Access restricted. Please log in during operating hours");
//       else alert(`Login Failed : ${error.response.data}`);
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("JWT") !== null && localStorage.getItem("ROLE") === "[ROLE_ADMIN]") navigate("/admin-home", { replace: true });
//     if (localStorage.getItem("JWT") !== null && localStorage.getItem("ROLE") === "[ROLE_DOCTOR]") navigate("/doctor-home", { replace: true });
//     if (localStorage.getItem("JWT") !== null && localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]") navigate("/supervisor-home", { replace: true });
//   }, []);
//   if(loading)return <LoadingComponent/>
//   return (
//     <div className="mb-20">
//       <form onSubmit={handleSubmit}>
//         <div className="absolute top-0 right-0 mt-4 mr-4">
//           <LanguageButton />
//         </div>
//         <div className="login-container ">
//           <div className="header">
//             <div className="text">{t("login.LOGIN")}</div>
//             <div className="underline"></div>
//           </div>
//           <div className="inputs">
//             <div className="input">
//               <img className="img" src={EMAIL_URL} alt="" />
//               <input

//                 placeholder={t("login.username")}
//                 name="username"
//                 value={requestData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="input">
//               <img className="img" src={PASS_URL} alt="" />
//               <input
//                 type="password"
//                 placeholder={t("login.Password")}
//                 name="password"
//                 value={requestData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="forgot-password">
//             {t("login.forgot-password")}?
//             <Link to="/forgot-password">{t("login.Click_Here")}!</Link>
//           </div>
//           <div className="submit-container">
//             <button type="submit" className="submit">
//               {t("login.LOGIN")}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginComponent;
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
      alert(error.response.data.message);
      setLoading(false);
      if (error.response.data === "CREDENTIALS INVALID ! ")
        alert("CREDENTIALS INVALID !!! Please Enter valid CREDENTIALS");
      else if (error.response.data)
        alert("Access restricted. Please log in during operating hours");
      else alert(`Login Failed : ${error.response.data}`);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("JWT") !== null &&
      localStorage.getItem("ROLE") === "[ROLE_ADMIN]"
    )
      navigate("/admin-home", { replace: true });
    if (
      localStorage.getItem("JWT") !== null &&
      localStorage.getItem("ROLE") === "[ROLE_DOCTOR]"
    )
      navigate("/doctor-home", { replace: true });
    if (
      localStorage.getItem("JWT") !== null &&
      localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]"
    )
      navigate("/supervisor-home", { replace: true });
  }, []);
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
                  {t("login.Sign in to your Account")}
                </h3>
              </div>
              <div>
                <label class="text-sm mb-2 block text-[#6467c0]">
                  {t("login.User name")}
                </label>
                <div class="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    class="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    placeholder={t("login.Enter user name")}
                    value={requestData.username}
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
              <div>
                <label class="text-sm mb-2 block text-[#6467c0]">
                  {t("login.Password")}
                </label>
                <div class="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    class="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    placeholder={t("login.Enter password")}
                    value={requestData.password}
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex items-center justify-between gap-2">
                <div class="text-sm">
                  {t("login.Forgot-password")}?
                  <Link
                    to="/forgot-password"
                    class="text-blue-600 hover:underline items-center"
                  >
                    {t("login.Click_Here")}!
                  </Link>
                </div>
              </div>
              <div class="!mt-10">
                <button
                  type="submit"
                  class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#6467c0] hover:bg-[#696bab] focus:outline-none"
                >
                  {t("login.LOGIN")}
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

export default LoginComponent;





/*



  return (
    <div class="font-[sans-serif] text-[#333]">
      <Header/>
      <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div class="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div class="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="actor" className="block font-semibold">
              {t("addDoctorSupervisor.Select Actor to Add")}:
            </label>
            <select
              id="actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onClick={handleActor}
            >
              <option value="">{t("addDoctorSupervisor.Select")}</option>
              <option value="DOCTOR">{t("addDoctorSupervisor.Doctor")}</option>
              <option value="SUPERVISOR">
                {t("addDoctorSupervisor.Supervisor")}
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="district" className="block font-semibold">
              {t("addDoctorSupervisor.District")}:
            </label>
            <select
              id="district"
              value={district}
              onChange={handleDistrictChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            >
              <option value="">{t("addDoctorSupervisor.Select")}</option>
              {districtOptions.map((district, index) => (
                <option key={index} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subdistrictcode" className="block font-semibold">
              {t("addDoctorSupervisor.Subdistrict")}:
            </label>
            <select
              id="subdistrictcode"
              value={subdistrictcode}
              onChange={(e) => setSubDistrictcode(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            >
              <option value="">{t("addDoctorSupervisor.Select")}</option>
              {subDistrictOptions.map((subdistrict, index) => (
                <option key={index} value={subdistrict.code}>
                  {subdistrict.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="firstname" className="block font-semibold">
              {t("addDoctorSupervisor.First Name")}:
            </label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname" className="block font-semibold">
              {t("addDoctorSupervisor.Last Name")}:
            </label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block font-semibold">
              {t("addDoctorSupervisor.Email")}:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label className="block font-semibold">
              {t("addDoctorSupervisor.Gender")}:
            </label>
            <div className="mt-1">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="male" className="mr-4">
                {t("addDoctorSupervisor.Male")}
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="female">{t("addDoctorSupervisor.Female")}</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="block font-semibold">
              {t("addDoctorSupervisor.Date of Birth")}:
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="bg-violet-500 w-full text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {t("addDoctorSupervisor.ADD")}
          </button>
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
    */
