import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SupervisorService from "../../Services/SupervisorService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AddHealthWorkerComponent = () => {
  const [village, setVillage] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [villagecode, setVillageCode] = useState("");
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch district options
    SupervisorService.getVillageWorker(false)
      .then((response) => {
        setVillage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching village options:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hii");
    // Create health worker object
    const healthWorkerData = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      villagecode: {
        code: villagecode,
      },
    };
    try {
      console.log("healthWorker data", healthWorkerData);
      const response = SupervisorService.addHealthWorker(healthWorkerData);
      if (response) {
        alert(
          `Health worker with name ${healthWorkerData.firstname} added successfully`
        );
        navigate("/healthworker-home");
      } else {
        alert("Failed to add health worker");
      }
    } catch (error) {
      console.error(`Error during adding health worker:", ${error}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto mt-10 p-4">
        <h4 className="text-lg font-semibold mb-4">
          {t("addHealthWorker.Fill The HealthWorker Information")} :
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="village" className="block font-semibold mb-2">
              {t("addHealthWorker.Village")}:
            </label>
            <select
              id="village"
              value={villagecode}
              onChange={(e) => setVillageCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">{t("addHealthWorker.Select")}</option>
              {village.map((village, index) => (
                <option key={index} value={village.code}>
                  {village.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="firstname" className="block font-semibold mb-2">
              {t("addHealthWorker.First Name")}:
            </label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block font-semibold mb-2">
              {t("addHealthWorker.Last Name")}:
            </label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobileNo" className="block font-semibold mb-2">
              Mobile No:
            </label>
            <input
              type="text"
              id="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">
              {t("addHealthWorker.Email")}:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              {t("addHealthWorker.Gender")}:
            </label>
            <div className="flex items-center">
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
                {t("addHealthWorker.Male")}
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
              <label htmlFor="female">{t("addHealthWorker.Female")}</label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block font-semibold mb-2">
              {t("addHealthWorker.Date of Birth")}:
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            {t("addHealthWorker.ADD")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHealthWorkerComponent;
