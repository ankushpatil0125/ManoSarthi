import React, { useState, useEffect } from "react";
import "../../css/AddActorComponent.css";
import Header from "../Header/Header";
import AdminService from "../../Services/AdminService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AddDoctorComponent = () => {
  const [district, setDistrict] = useState("");
  const [subdistrictcode, setSubDistrictcode] = useState({ code: "" });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [actor, setActor] = useState("");
  const {t}=useTranslation("global");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch district options
    AdminService.getDistrict()
      .then((response) => {
        setDistrictOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching district options:", error);
      });
  }, []);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    // Fetch subdistrict options based on selected district
    AdminService.getSubDistrict(selectedDistrict)
      .then((response) => {
        setSubDistrictOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subdistrict options:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hii");
    // Create doctor object
    const actorData = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      subdistrictcode: {
        code: subdistrictcode
      },
      gender: gender
    };
    try {
      // Using axios for the POST request
      console.log("doctor data", actorData);
      if(actor === "Doctor") {
          const response = AdminService.addDoctor(actorData);
          if (response) {
            // Handle successful password change, e.g., display a success message
            alert(`Doctor with name ${actorData.firstname} Added Successfully`);
            navigate("/doctor-supervisor");
          } else {
            // Handle password change failure"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwbWFudSIsImlhdCI6MTcwODUwMDgxMywiZXhwIjoxNzA4NTQwMTQwfQ.bp6DuaqPBGrJUeLgBJcNGwfNdYKDvFMR2DRtRm8GSaw"
            alert("Failed to Add Doctor");
          }
      }
      else{
        const response = AdminService.addSupervisor(actorData);
          if (response) {
            // Handle successful password change, e.g., display a success message
            alert(`Supervisor with name ${actorData.firstname} Added Successfully`);
          } else {
            // Handle password change failure"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwbWFudSIsImlhdCI6MTcwODUwMDgxMywiZXhwIjoxNzA4NTQwMTQwfQ.bp6DuaqPBGrJUeLgBJcNGwfNdYKDvFMR2DRtRm8GSaw"
            alert("Failed to Add Supervisor");
          }
      }

    } catch (error) {
      console.error(`Error during adding Actor:", ${error}`);
    }
  };


  return (
    <div>
      <Header />

      <div className="doctor-container">
        <h4>{t("addDoctorSupervisor.Fill The Doctor Information")} :</h4>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="actor">{t("addDoctorSupervisor.Select Actor to Add")}:</label>
              <select
                id="actor"
                value={actor}
                onChange={(e) =>setActor(e.target.value)}
              >
                <option value="">{t("addDoctorSupervisor.Select")}</option>
                <option value="Doctor">{t("addDoctorSupervisor.Doctor")}</option>
                <option value="Supervisor">{t("addDoctorSupervisor.Supervisor")}</option>
              </select>
            </div>
            <div>
              <label htmlFor="district">{t("addDoctorSupervisor.District")}:</label>
              <select
                id="district"
                value={district}
                onChange={handleDistrictChange}
              >
                <option value="">{t("addDoctorSupervisor.Select")}</option>
                {districtOptions.map((district, index) => (
                  <option key={index} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="subdistrictcode">{t("addDoctorSupervisor.Subdistrict")}:</label>
              <select
                id="subdistrictcode"
                value={subdistrictcode}
                onChange={(e) => setSubDistrictcode(e.target.value)}
              >
                <option value="">{t("addDoctorSupervisor.Select")}</option>
                {subDistrictOptions.map((subdistrict, index) => (
                  <option key={index} value={subdistrict.code}>
                    {subdistrict.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="firstname">{t("addDoctorSupervisor.First Name")}:</label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastname">{t("addDoctorSupervisor.Last Name")}:</label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            {/* <div>
              <label htmlFor="mobileNo">Mobile No:</label>
              <input
                type="text"
                id="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div> */}
            <div>
              <label htmlFor="email">{t("addDoctorSupervisor.Email")}:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Gender:</label>
              <br />
              <div className="ic">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male">Male</label>

                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            {/* <div>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              /> 
             </div> */}
            <button type="submit">{t("addDoctorSupervisor.ADD")}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorComponent;
