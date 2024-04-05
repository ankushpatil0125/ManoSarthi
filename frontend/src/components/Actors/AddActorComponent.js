import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import AdminService from "../../Services/AdminService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../Loading/LoadingComponent";

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
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   //Fetch district options
  //   AdminService.getDistrict(actor, false)
  //     .then((response) => {
  //       setDistrictOptions(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching district options:", error);
  //     });
  // }, [actor]);
  const handleActor = () => {
    setLoading(true);
    AdminService.getDistrict(actor, false)
      .then((response) => {
        setDistrictOptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
        setLoading(false);
      });
  };
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    // Fetch subdistrict options based on selected district
    setLoading(true);
    AdminService.getSubDistrict(selectedDistrict, actor, false)
      .then((response) => {
        setSubDistrictOptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.message);        
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hii");
    // Create doctor object
    const actorData = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      subdistrictcode: {
        code: subdistrictcode,
      },
      gender: gender,
      dob: dob,
    };
    try {
      // Using axios for the POST request
      // console.log("doctor data", actorData);
      setLoading(true);
      if (actor === "DOCTOR") {
        const response = await AdminService.addDoctor(actorData);
        // console.log("ADD RESP: ", response);
        if (response) {
          // Handle successful password change, e.g., display a success message
          alert(`Doctor with name ${actorData.firstname} Added Successfully`);
          navigate("/doctor-supervisor");
          setLoading(false);
        } else {
          // Handle password change failure
          alert("Failed to Add Doctor");
        }
      } else {
        const response = AdminService.addSupervisor(actorData);
        if (response) {
          // Handle successful password change, e.g., display a success message
          alert(
            `Supervisor with name ${actorData.firstname} Added Successfully`
          );
          navigate("/doctor-supervisor");
          setLoading(false);
        } else {
          // Handle password change failure
          alert("Failed to Add Supervisor");
        }
      }
    } catch (error) {
      // console.error(`Error during adding Actor:", ${error}`);
      alert(error.response.data.message);      
      setLoading(false);
    }
  };
  if (loading) return <LoadingComponent />;
  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 mt-28 ">
        <h4 className="text-lg font-semibold mb-4">
          {t("addDoctorSupervisor.Fill The Actor Information")} :
        </h4>
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
    </div>
  );
};

export default AddDoctorComponent;
