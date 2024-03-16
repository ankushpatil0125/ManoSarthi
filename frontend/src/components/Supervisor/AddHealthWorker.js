import React, { useState, useEffect } from "react";
import "../../css/AddActorComponent.css";
import Header from "../Header/Header";
import AdminService from "../../Services/AdminService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SupervisorService from "../../Services/SupervisorService";

const AddHealthWorkerComponent = () => {
  const [village, setVillage] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [villageCode,setVillageCode]=useState("");
  const [subdistrictCode,setSubdistrictCode]=useState("");
  const {t}=useTranslation("global");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch district options
    SupervisorService.getVillage()
      .then((response) => {
        setVillage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching district options:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hii");
    // Create doctor object
    const healthWorkerData = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      villageCode:villageCode
    };
    try {
      // Using axios for the POST request
      console.log("doctor data", healthWorkerData);
          const response = SupervisorService.addHealthWorker(healthWorkerData);
          if (response) {
            // Handle successful password change, e.g., display a success message
            alert(`Healthworker with name ${healthWorkerData.firstname} Added Successfully`);
            navigate("/healthworker-home");
          } else {
            // Handle password change failure"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwbWFudSIsImlhdCI6MTcwODUwMDgxMywiZXhwIjoxNzA4NTQwMTQwfQ.bp6DuaqPBGrJUeLgBJcNGwfNdYKDvFMR2DRtRm8GSaw"
            alert("Failed to Add Doctor");
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
              <label htmlFor="district">{t("addHealthWorker.Village")}:</label>
              <select
                id="village"
                value={village}
                onChange={(e) => setVillageCode(e.target.value)}
              >
                <option value="">{t("addHealthWorker.Select")}</option>
                {village.map((village, index) => (
                  <option key={index} value={village.code}>
                    {village.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="firstname">{t("addHealthWorker.First Name")}:</label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastname">{t("addHealthWorker.Last Name")}:</label>
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
              <label htmlFor="email">{t("addHealthWorker.Email")}:</label>
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
            <button type="submit">{t("addHealthWorker.ADD")}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHealthWorkerComponent;
