import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../css/UpdateDoctor.css";
import AdminService from "../../Services/AdminService";
import Header from "../Header/Header";
import ViewDoctors from "../Doctor/ViewDoctors";

const UpdateDoctor = () => {
  const [district, setDistrict] = useState("");
  const [subdistrictcode, setSubDistrictcode] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [allDoctor, setAllDoctor] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("global");

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

  // const fetchDoctorData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await AdminService.getAllDoctors();
  //     setAllDoctor(response.data);
  //   } catch (error) {
  //     console.error("Error fetching Doctor details:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDoctorData();
  // }, []);

  // useEffect(() => {
  //   if (district) {
  //     AdminService.getAllDistrictDoctors(district,currentPage)
  //       .then((response) => {
  //         setAllDoctor(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching district doctors:", error);
  //       });
  //   }
  // }, [district]);

  // useEffect(() => {
  //   if (subdistrictcode) {
  //     AdminService.getAllSubDistrictDoctors(subdistrictcode)
  //       .then((response) => {
  //         setAllDoctor(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching subdistrict doctors:", error);
  //       });
  //   }
  // }, [subdistrictcode]);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    AdminService.getSubDistrict(selectedDistrict)
      .then((response) => {
        setSubDistrictOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subdistrict options:", error);
      });
  };

  const handleSubDistrictChange = (e) => {
    const selectedSubDistrict = e.target.value;
    setSubDistrictcode(selectedSubDistrict);
  };

  const handleSubmit = async (e) => {
    // Your form submission logic goes here
  };

  return (
    <div>
      <Header />

      <div className="udcon">
        <h4> Choose District and Subdistrict :</h4>
        <div className="form-container">
          <div>
            <label htmlFor="district">
              {t("addDoctorSupervisor.District")}:
            </label>
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
            <label htmlFor="subdistrictcode">
              {t("addDoctorSupervisor.Subdistrict")}:
            </label>
            <select
              id="subdistrictcode"
              value={subdistrictcode}
              onChange={handleSubDistrictChange}
            >
              <option value="">{t("addDoctorSupervisor.Select")}</option>
              {subDistrictOptions.map((subdistrict, index) => (
                <option key={index} value={subdistrict.code}>
                  {subdistrict.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <ViewDoctors allDoctor={allDoctor} district={district} subdistrictcode={subdistrictcode}/>
      {/* <div className="data">
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Doctor Name</th>
              <th className="border border-gray-400 px-4 py-2">District</th>
              <th className="border border-gray-400 px-4 py-2">Subdistrict</th>
              <th className="border border-gray-400 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allDoctor.map((doctor) => (
              <tr key={doctor.id}>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor.firstname}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor.subdistrictcode.district.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor.subdistrictcode.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default UpdateDoctor;