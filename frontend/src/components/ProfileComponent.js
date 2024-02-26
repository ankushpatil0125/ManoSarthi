import axios from "axios";
import React, { useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import "../css/ProfileComponent.css";
import Header from "./Header";
import {getToken} from "../utils/Constants"
import { useTranslation } from "react-i18next";
import ProfileService from "../Services/ProfileService";
// import { IoPersonCircleOutline } from "react-icons/io5";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);
  const {user_id} = useParams();
  const [t] = useTranslation("global");
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const data = await ProfileService.getDoctorData();
        setUser(data);
      } catch (error) {
        console.log("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, []);

  return (
    <div>
      <Header />
      <div className="profile">
        <div className="body">
          <p>
            <span className="key">{t("Profile.ID")} :</span>
            <span className="gap"></span>
            <span className="value">{user?.id}</span>
          </p>
          <p>
            <span className="key">{t("Profile.First Name")} :</span>
            <span className="gap"></span>
            <span className="value">{user?.firstname}</span>
          </p>
          <p>
            <span className="key">{t("Profile.Last Name")} :</span>
            <span className="gap"></span>
            <span className="value">{user?.lastname}</span>
          </p>
          <p>
            <span className="key">{t("Profile.Email")} :</span>
            <span className="gap"></span>
            <span className="value">{user?.email}</span>
          </p>
          <p>
            <span className="key">{t("Profile.District")} :</span>
            <span className="gap"></span>
            <span className="value">
              {user?.subdistrictcode?.district?.name}
            </span>
          </p>
          <p>
            <span className="key">{t("Profile.Subdistrict")} :</span>
            <span className="gap"></span>
            <span className="value">{user?.subdistrictcode?.name}</span>
          </p>
          <p>
            <span className="key">Gender</span>
            <span className="gap"></span>
            <span className="value">{user?.gender}</span>
          </p>
          {/* <p>
            <span className="key">Mobile</span>
            <span className="gap"></span>
            <span className="value">D101</span>
          </p>

          <p>
            <span className="key">Patient Count</span>
            <span className="gap"></span>
            <span className="value">D101</span>
          </p>

          <p>
            <span className="key">DOB</span>
            <span className="gap"></span>
            <span className="value">KULDIP</span>
          </p> */}


          <Link to = "/change-password">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">
              Change Password
            </button> 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
