import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdminService from "../../Services/AdminService";
import Header from "../Header/Header";
import ViewDoctors from "../Doctor/ViewDoctors";
import ViewSupervisor from "../Supervisor/ViewSupervisor";
import LoadingComponent from "../Loading/LoadingComponent";

const UpdateActor = () => {
  const [district, setDistrict] = useState("");
  const [subdistrictcode, setSubDistrictcode] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [actor, setActor] = useState("");
  const { t } = useTranslation("global");
  const [loading,setLoading] = useState(false);


  const handleActor = () =>{
    console.log("Actor",actor);
    setLoading(true);
    AdminService.getDistrict(actor, true)
      .then((response) => {
        // console.log("jhghidfsifjijgi: ", response);
        setDistrictOptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching district options:", error);
      });
  }
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setLoading(true);
    AdminService.getSubDistrict(selectedDistrict, actor, true)
      .then((response) => {
        setSubDistrictOptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subdistrict options:", error);
      });
  };

  const handleSubDistrictChange = (e) => {
    const selectedSubDistrict = e.target.value;
    setSubDistrictcode(selectedSubDistrict);
  };

  // const handleSubmit = async (e) => {
  //   // Your form submission logic goes here
  // };
  if(loading) return <LoadingComponent/>
  return (
    <div className="flex flex-col h-full">
      <Header />

      <div className="flex flex-col items-center justify-center mt-28">
        <h4 className="mb-4 text-xl font-bold">
          {t("UpdateDoctorSupervisor.Reassign")}
        </h4>
        <div className="max-w-5xl mx-auto flex justify-center items-center mb-4 space-x-4">
          <div className="w-1/3">
            <label htmlFor="actor" className="mb-2">
              {t("UpdateDoctorSupervisor.Actor")}:
            </label>
            <select
              id="actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="border border-gray-400 px-2 py-1 rounded-md w-full"
              onClick={handleActor}
            >
              <option value="">{t("addDoctorSupervisor.Select")}</option>
              <option value="DOCTOR">{t("addDoctorSupervisor.Doctor")}</option>
              <option value="SUPERVISOR">
                {t("addDoctorSupervisor.Supervisor")}
              </option>
            </select>
          </div>
          <div className="w-1/3">
            <label htmlFor="district" className="mb-2">
              {t("UpdateDoctorSupervisor.District")}:
            </label>
            <select
              id="district"
              value={district}
              onChange={handleDistrictChange}
              className="border border-gray-400 px-2 py-1 rounded-md w-full"
            >
              <option value="">{t("addDoctorSupervisor.Select")}</option>
              {districtOptions.map((district, index) => (
                <option key={index} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/3">
            <label htmlFor="subdistrictcode" className="mb-2">
              {t("UpdateDoctorSupervisor.Subdistrict")}:
            </label>
            <select
              id="subdistrictcode"
              value={subdistrictcode}
              onChange={handleSubDistrictChange}
              className="border border-gray-400 px-2 py-1 rounded-md w-full"
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

      {(() => {
        console.log('select',actor);
        if (actor!=='' ) {
          if(actor ==='DOCTOR')
            return <ViewDoctors district={district} subdistrictcode={subdistrictcode} />
            else {
            return <ViewSupervisor district={district} subdistrictcode={subdistrictcode} />
          }
        }
      })()}
      {/* {actor === "DOCTOR" && actor!=='Select' ? (
        <ViewDoctors district={district} subdistrictcode={subdistrictcode} />
      ) : (
        <ViewSupervisor district={district} subdistrictcode={subdistrictcode} />
      )} */}
    </div>
  );
};

export default UpdateActor;
