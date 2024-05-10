import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SupervisorService from "../../Services/SupervisorService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../Loading/LoadingComponent";

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
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mobileNoError,setMobileNoError] = useState("");
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
  const validateMobileNo = (mobileNumber) => {
    const mobileRegex = /^[0-9]{10}$/; // Regular expression to match 10-digit numbers
    if (!mobileRegex.test(mobileNumber)) {
        setMobileNoError("Mobile number must be 10 digits long and contain only numbers");
        return false;
    }

    setMobileNoError(""); // Clear error if mobile number format is correct
    return true;
};
  useEffect(() => {
    // Fetch district options
    SupervisorService.getVillageWorker(false)
      .then((response) => {
        setVillage(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hii");

    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !gender.trim() ||
      !dob.trim() ||
      !mobileNo.trim()
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
    const mobileRegex = /^[0-9]{10}$/; // Regular expression to match 10-digit numbers
    if (!mobileRegex.test(mobileNo)) {
        alert("Please enter a valid 10-digit mobile number");
        return false;
    }

    // Create health worker object
    const healthWorkerData = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      dob: dob,
      villagecode: {
        code: villagecode,
      },
    };
    try {
      // console.log("healthWorker data", healthWorkerData);
      setLoading(true);
      const response = await SupervisorService.addHealthWorker(
        healthWorkerData
      );
      console.log("response", response);
      if (response) {
        alert(
          `Health worker with name ${response?.data?.firstname} added successfully`
        );
        setLoading(false);
        window.location.reload();
        navigate("/supervisor-home");
      } else {
        alert("Failed to add health worker");
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      setLoading(false);
    }
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
  if (loading) return <LoadingComponent />;
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
          <div className="flex items-center">
            <label htmlFor="firstname" className="block font-semibold mb-2">
              {t("addHealthWorker.First Name")}:
            </label>
            <label className="text-red-500"> *</label>
            </div>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => handleFirstNameChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="lastname" className="block font-semibold mb-2">
              {t("addHealthWorker.Last Name")}:
            </label>
            <label className="text-red-500"> *</label>
            </div>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => handleLastNameChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="mobileNo" className="block font-semibold mb-2">
              Mobile No:
            </label>
            <label className="text-red-500"> *</label>
              </div>
            <input
              type="text"
              id="mobileNo"
              value={mobileNo}
              onChange={(e) => {
                const text = e.target.value;
                setMobileNo(text);
                validateMobileNo(text);
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {mobileNoError ? <div className="text-red-500">{mobileNoError}</div> : null}

          <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="email" className="block font-semibold mb-2">
              {t("addHealthWorker.Email")}:
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
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {emailError ? <div className="text-red-500">{emailError}</div> : null}
          <div className="mb-4">
          <div className="flex items-center">
            <label className="block font-semibold mb-2">
              {t("addHealthWorker.Gender")}:
            </label>
            <label className="text-red-500"> *</label>
            </div>
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
