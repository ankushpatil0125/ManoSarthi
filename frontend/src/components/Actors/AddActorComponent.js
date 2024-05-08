import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import AdminService from "../../Services/AdminService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../Loading/LoadingComponent";
import { Axios } from "axios";
import { Image } from "react-bootstrap";

const AddDoctorComponent = () => {
  const [district, setDistrict] = useState("");
  const [subdistrictcode, setSubDistrictcode] = useState({ code: "" });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [actor, setActor] = useState("");
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const validateEmail = (email) => {
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");
    if (atIndex === -1) {
      setEmailError("Email must contain '@'");
      return false;
    }

    if (dotIndex === -1 || dotIndex < atIndex) {
      setEmailError("Invalid email format");
      return false;
    }

    setEmailError(""); // Clear error if email format is correct
    return true;
  };
  useEffect(() => {
    const handleActorChange = () => {
      // console.log("Selected actor changed to:", actor);
      //Fetch district options
      AdminService.getDistrict(actor, false)
        .then((response) => {
          setDistrictOptions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching district options:", error);
        });
    };
    // Only run the effect if actor has been set
    if (actor !== "") {
      handleActorChange();
    }
  }, [actor]);

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
  const handleFirstNameChange = (text) => {
    // Filter out space characters from the input
    const filteredText = text.replace(/\s/g, "");
    setFirstname(filteredText);
  };

  const handleLastNameChange = (text) => {
    // Filter out space characters from the input
    const filteredText = text.replace(/\s/g, "");
    setLastname(filteredText);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !gender.trim() ||
      !dob.trim() ||
      !actor.trim()
    ) {
      alert("Please fill all the fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Create actor object
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
      // Perform the appropriate action based on the selected actor
      setLoading(true);
      // let response;
      if (actor === "DOCTOR") {
        const response = await AdminService.addDoctor(actorData);
        // console.log("ADD RESP: ", response);
        if (response) {
          // Handle successful password change, e.g., display a success message
          console.log("Add doctor response: ", response)
          alert(`Doctor with name ${response?.data?.firstname} Added Successfully`);
          window.location.reload();
          // navigate("/admin-home");
          setLoading(false);
        } else {
          // Handle password change failure
          alert("Failed to Add Doctor");
        }
      } else {
        const response = await AdminService.addSupervisor(actorData);
        if (response) {
          // Handle successful password change, e.g., display a success message
          console.log("Add Supervisor response: ", response)
          alert(
            `Supervisor with name ${response?.data?.firstname} Added Successfully`
          );
          // window.location.reload();
          navigate("/admin-home");
          setLoading(false);
        } else {
          // Handle password change failure
          alert("Failed to Add Supervisor");
        }
      }
    } catch (error) {
      alert(error.response.data.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent />;
  return (
    <div className="flex flex-col md:flex-row">
      {/* <Header /> */}

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2">
        <h4 className="text-lg font-semibold mb-4">
          {t("addDoctorSupervisor.Fill The Actor Information")} :
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="flex item-center">
              <label htmlFor="actor" className="block font-semibold">
                {t("addDoctorSupervisor.Select Actor to Add")}:
              </label>
              <label className="text-red-500"> *</label>
            </div>
            <select
              id="actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            >
              <option value="">{t("addDoctorSupervisor.Select")}</option>
              <option value="DOCTOR">{t("addDoctorSupervisor.Doctor")}</option>
              <option value="SUPERVISOR">
                {t("addDoctorSupervisor.Supervisor")}
              </option>
            </select>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <label htmlFor="district" className="block font-semibold">
                {t("addDoctorSupervisor.District")}:
              </label>
              <label className="text-red-500"> *</label>
            </div>

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
            <div className="flex items-center">
              <label htmlFor="subdistrictcode" className="block font-semibold">
                {t("addDoctorSupervisor.Subdistrict")}:
              </label>
              <label className="text-red-500"> *</label>
            </div>
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
            <div className="flex items-center">
              <label htmlFor="firstname" className="block font-semibold">
                {t("addDoctorSupervisor.First Name")}:
              </label>
              <label className="text-red-500"> *</label>
            </div>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => handleFirstNameChange(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <div className="flex items-center">
              <label htmlFor="lastname" className="block font-semibold">
                {t("addDoctorSupervisor.Last Name")}:
              </label>
              <label className="text-red-500"> *</label>
            </div>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => handleLastNameChange(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <div className="flex items-center">
              <label htmlFor="email" className="block font-semibold">
                {t("addDoctorSupervisor.Email")}:
              </label>
              <label className="text-red-500"> *</label>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                const text = e.target.value;
                setEmail(text);
                validateEmail(text);
              }}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          {emailError ? <div className="text-red-500">{emailError}</div> : null}
          <div className="form-group">
            <div className="flex items-center">
              <label className="block font-semibold">
                {t("addDoctorSupervisor.Gender")}:
              </label>
              <label className="text-red-500"> *</label>
            </div>
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
            <div className="flex items-center">
              <label htmlFor="dob" className="block font-semibold">
                {t("addDoctorSupervisor.Date of Birth")}:
              </label>
              <label className="text-red-500"> *</label>
            </div>
            <input
              type="date"
              id="dob"
              value={dob}
              max={today}
              onChange={(e) => setDob(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          {/* {formError ? <div>{formError}</div> : null} */}

          <button
            type="submit"
            className="bg-violet-500 w-full text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {t("addDoctorSupervisor.ADD")}
          </button>
        </form>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
            alt="Designer Life"
            className="m-12 xl:m-16 w-full"
          />
        </div>
      </div>
      
      
    </div>
  );
};

export default AddDoctorComponent;
