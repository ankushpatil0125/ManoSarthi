// import axios from "axios";
// import React, { useState, useEffect} from "react";
// import {Link, useParams} from "react-router-dom";
// import "../../css/ProfileComponent.css";
// import Header from "../Header/Header";
// import {getToken} from "../../utils/Constants"
// import { useTranslation } from "react-i18next";
// import ProfileService from "../../Services/ProfileService";
// import LoadingComponent from "../Loading/LoadingComponent";

// const Profile = () => {
//   const [user, setUser] = useState({});
//   // const [isUserUpdated, setisUserUpdated] = useState(false);
//   // const {user_id} = useParams();
//   const [t] = useTranslation("global");
//   const [loading,setLoading] = useState(false);

//   useEffect(() => {

//     const fetchDoctorData = async () => {
//       try {
//         setLoading(true);
//         if(localStorage.getItem("ROLE") === "[ROLE_DOCTOR]") {
//           const data = await ProfileService.getDoctorData();
//           console.log("data",data);
//           setUser(data);

//         }
//         else{
//           const data = await ProfileService.getSupervisorData();
//           setUser(data);
//         }
//         setLoading(false);
//       } catch (error) {
//         alert(error.response.data.message);
//         setLoading(false);
//       }
//     };

//     fetchDoctorData();
//   }, []);
//   if(loading)return<LoadingComponent/>
//   return (
//     <div>
//       <Header />
//       <div className="profile">
//         <div className="body">
//         <div className="key-title" >
//           <p style={{textAlign: "center", fontWeight: "bold", fontSize: "24px"}}>
//             {localStorage.getItem("ROLE")==="[ROLE_DOCTOR]"?t("Profile.Doctor Profile"):t("Profile.Supervisor Profile")}
//           </p>
//           </div>
//           <p>
//             <span className="key">{t("Profile.Username")} :</span>
//             <span className="gap"></span>
//             <span className="value">{user?.username}</span>
//           </p>
//           <p>
//             <span className="key">{t("Profile.First Name")} :</span>
//             <span className="gap"></span>
//             <span className="value">{user?.firstname}</span>
//           </p>
//           <p>
//             <span className="key">{t("Profile.Last Name")} :</span>
//             <span className="gap"></span>
//             <span className="value">{user?.lastname}</span>
//           </p>
//           <p>
//             <span className="key">{t("Profile.Email")} :</span>
//             <span className="gap"></span>
//             <span className="value">{user?.email}</span>
//           </p>
//           <p>
//             <span className="key">{t("Profile.District")} :</span>
//             <span className="gap"></span>
//             <span className="value">
//               {user?.districtName}
//             </span>
//           </p>
//           <p>
//             <span className="key">{t("Profile.Subdistrict")} :</span>
//             <span className="gap"></span>
//             <span className="value">{user?.subDistrictName}</span>
//           </p>
//           <p>
//             <span className="key">{t("Profile.Gender")}</span>
//             <span className="gap"></span>
//             <span className="value">{user?.gender}</span>
//           </p>
//           {/* <p>
//             <span className="key">Mobile</span>
//             <span className="gap"></span>
//             <span className="value">D101</span>
//           </p>

//           <p>
//             <span className="key">Patient Count</span>
//             <span className="gap"></span>
//             <span className="value">D101</span>
//           </p>

//           <p>
//             <span className="key">DOB</span>
//             <span className="gap"></span>
//             <span className="value">KULDIP</span>
//           </p> */}
//           <Link to = "/change-password">
//             <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">
//               {t("Profile.Change Password")}
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../css/ProfileComponent.css";
import Header from "../Header/Header";
import { getToken } from "../../utils/Constants";
import { useTranslation } from "react-i18next";
import ProfileService from "../../Services/ProfileService";
import LoadingComponent from "../Loading/LoadingComponent";

const Profile = () => {
  const [user, setUser] = useState({});
  // const [isUserUpdated, setisUserUpdated] = useState(false);
  // const {user_id} = useParams();
  const [t] = useTranslation("global");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        if (localStorage.getItem("ROLE") === "[ROLE_DOCTOR]") {
          const data = await ProfileService.getDoctorData();
          console.log("data", data);
          setUser(data);
        } else {
          const data = await ProfileService.getSupervisorData();
          setUser(data);
        }
        setLoading(false);
      } catch (error) {
        alert(error.response.data.message);
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);
  if (loading) return <LoadingComponent />;

  return (
    <div>
      <Header />
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg  shadow-xl p-5">
        <p
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}
        >
          {localStorage.getItem("ROLE") === "[ROLE_DOCTOR]"
            ? t("Profile.Doctor Profile")
            : t("Profile.Supervisor Profile")}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="125"
          height="125"
          viewBox="0 0 6.615 6.615"
          className="mx-auto mt-2"
        >
          <path
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth=".265"
            d="M3.308 1.862c.36 0 .65.294.65.66 0 .364-.29.658-.65.658a.653.653 0 0 1-.65-.659c0-.365.29-.66.65-.66z"
            paintOrder="markers stroke fill"
          ></path>
          <path
            fill="#81bcf3"
            d="M29.766.672c-1.44 0-2.602 1.178-2.602 2.635 0 1.457 1.162 2.636 2.602 2.636s2.601-1.18 2.601-2.636c0-1.457-1.162-2.635-2.601-2.635z"
            transform="translate(-26.458)"
          ></path>
          <path
            fill="#ecebf1"
            d="M29.766 1.73a.788.788 0 0 0-.784.791c0 .436.351.791.784.791a.789.789 0 0 0 .783-.79.788.788 0 0 0-.783-.791zm.004 1.984c-.331 0-.629.09-.89.226a2.79 2.79 0 0 0-.667.497c-.271.269-.38.433-.455.553.477.58 1.203.953 2.008.953.805 0 1.548-.366 2.004-.954a2.709 2.709 0 0 0-.448-.552 2.766 2.766 0 0 0-.664-.497 1.91 1.91 0 0 0-.888-.226Z"
            transform="translate(-26.458)"
          ></path>
          <path
            fill="#6ea9e3"
            d="M112.5 2.54c-5.442 0-9.832 4.451-9.832 9.958a9.98 9.98 0 0 0 4.004 8.018 10.002 10.002 0 0 1-2.004-6.018c0-5.507 4.39-9.959 9.832-9.959a9.7 9.7 0 0 1 5.83 1.947c-1.793-2.395-4.624-3.947-7.83-3.947Z"
            transform="translate(-26.458) scale(.26458)"
          ></path>
          <path
            fill="#d9d7e4"
            d="M112.5 6.541c-1.633 0-2.96 1.343-2.96 2.988 0 1.356.906 2.494 2.138 2.858a2.976 2.976 0 0 1-.139-.858c0-1.645 1.328-2.988 2.961-2.988.287 0 .56.055.822.133-.367-1.228-1.486-2.133-2.822-2.133Zm.016 7.496c-1.25 0-2.376.341-3.362.854-.986.512-1.832 1.196-2.521 1.879-1.025 1.015-1.438 1.637-1.719 2.091a9.932 9.932 0 0 0 2.08 1.883c.281-.445.685-1.03 1.639-1.974.69-.683 1.535-1.367 2.521-1.88.986-.512 2.112-.853 3.362-.853s2.374.341 3.357.854c.56.292 1.07.642 1.535 1.013-.252-.316-.57-.68-1.025-1.134-.686-.683-1.527-1.367-2.51-1.88a8.023 8.023 0 0 0-.957-.413c-.137.02-.273.043-.416.043-.57 0-1.097-.17-1.549-.454-.145-.009-.286-.029-.435-.029z"
            transform="translate(-26.458) scale(.26458)"
          ></path>
          <path
            d="M112.5 2.54c-5.442 0-9.832 4.451-9.832 9.958 0 5.507 4.39 9.965 9.832 9.965 5.442 0 9.832-4.458 9.832-9.965s-4.39-9.959-9.832-9.959zm0 .995c4.898 0 8.828 3.985 8.828 8.963a9.05 9.05 0 0 1-1.537 5.074c-.36-.636-2.482-4.033-7.275-4.033-4.796 0-6.942 3.402-7.305 4.035a9.05 9.05 0 0 1-1.54-5.076c0-4.978 3.931-8.963 8.829-8.963zm0 3.006c-1.633 0-2.96 1.343-2.96 2.988s1.327 2.99 2.96 2.99 2.96-1.345 2.96-2.99c0-1.645-1.327-2.988-2.96-2.988zm0 .996c1.09 0 1.957.877 1.957 1.992 0 1.116-.868 1.994-1.957 1.994-1.09 0-1.957-.878-1.957-1.994 0-1.115.868-1.992 1.957-1.992zm.016 6.998c4.733 0 6.525 3.72 6.525 3.72a.502.502 0 0 0 .11.147 8.736 8.736 0 0 1-6.651 3.065 8.736 8.736 0 0 1-6.652-3.067.5.5 0 0 0 .105-.138s1.83-3.727 6.563-3.727z"
            transform="translate(-26.458) scale(.26458)"
          ></path>
        </svg>
        <h2 className="text-center text-2xl font-semibold mt-3">
          {user?.firstname} {user?.lastname}
        </h2>
        <p className="justify-center text-gray-600 mt-1 flex flex-row">
          {t("Profile.Username")} :{" "}
          <p className="font-semibold">{user?.username}</p>
        </p>

        {/* Other Profile Fields */}
        <div className="mt-5 flex justify-center items-center">
          <h3 className="text-xl font-semibold ">
            {t("Profile.Other Details")}
          </h3>
        </div>
        <div className="mt-3">
          <p>
            <span className="key">{t("Profile.Email")} :</span>{" "}
            <span className="value">{user?.email}</span>
          </p>
          <p>
            <span className="key">{t("Profile.District")} :</span>{" "}
            <span className="value">{user?.districtName}</span>
          </p>
          <p>
            <span className="key">{t("Profile.Subdistrict")} :</span>{" "}
            <span className="value">{user?.subDistrictName}</span>
          </p>
          <p>
            <span className="key">{t("Profile.Gender")} :</span>{" "}
            <span className="value">{user?.gender}</span>
          </p>
          {/* Add more fields as needed */}
        </div>

        {/* Change Password Button */}
        <Link
          to={{
            pathname: "/change-password",
            state: { type: "change-password" }, // Pass the type as a prop
          }}
          className="flex justify-center items-center mt-5"
        >
          <button className="bg-[#6467c0] hover:bg-[#b4b5d1] text-white font-bold py-1 px-2 rounded">
            {t("Profile.Change Password")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
