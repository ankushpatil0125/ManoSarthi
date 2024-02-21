import axios from "axios";
import React, { useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import "../css/ProfileComponent.css";
import Header from "./Header";
// import { IoPersonCircleOutline } from "react-icons/io5";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);
  const {user_id} = useParams();
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJET0MxIiwiaWF0IjoxNzA4NTMxNTk1LCJleHAiOjE3MDg1NDAxNDB9.ZpXpjvw3JL3Bho4lcc4kJ_HIkO_t4t45E_l8Y1VQyvA";
  // const getProfileData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://192.168.73.199:9090/doctor/viewdetails?doctorid=1`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log("response data", response.data);
  //     setUser(response.data);
  //     // setisUserUpdated(false);
  //     console.log("user", user);
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };
  // useEffect(() => {
  // const getProfileData = async () => {
  //   try {
  //     const { data } = await axios.get(`http://192.168.73.199:9090/doctor/viewdetails?doctorid=1`, {
  //       headers: {
  //         Authorization: `bearer ${token}`,
  //       },
  //     });
  //     setUser(data);
  //     // setisUserUpdated(false);
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };
  //   getProfileData();
  // }, []);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.73.199:9090/doctor/viewdetails?doctorid=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response data", response.data);
        setUser(response.data);
      } catch (error) {
        console.log({ error });
      }
    };

    getProfileData();
  }, []);

  return (
    <div>
      <Header />
      <div className="profile">
        <div className="body">
          <p>
            <span className="key">ID</span>
            <span className="gap"></span>
            <span className="value">{user?.id}</span>
          </p>
          <p>
            <span className="key">First Name</span>
            <span className="gap"></span>
            <span className="value">{user?.firstname}</span>
          </p>
          <p>
            <span className="key">Last Name</span>
            <span className="gap"></span>
            <span className="value">{user?.lastname}</span>
          </p>
          <p>
            <span className="key">Email</span>
            <span className="gap"></span>
            <span className="value">{user?.email}</span>
          </p>
          <p>
            <span className="key">District</span>
            <span className="gap"></span>
            <span className="value">
              {user?.subdistrictcode?.district?.name}
            </span>
          </p>
          <p>
            <span className="key">Subdistrict</span>
            <span className="gap"></span>
            <span className="value">{user?.subdistrictcode?.name}</span>
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

          {/* <p>ID: D101</p>

          <p>Name: KULDIP</p>
          <p>Email: {user.email}</p>

          <p>Mobile: {user.email}</p>
          <p>DOB: {user.username}</p>
          <p>Gender: {user.username}</p>
          <p>Patient Count: {user.email}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
