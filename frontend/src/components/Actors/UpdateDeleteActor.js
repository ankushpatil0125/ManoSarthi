import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AdminService from "../../Services/AdminService";
import Header from "../Header/Header";
import ViewDoctors from "../Doctor/ViewDoctors";
import ViewSupervisor from "../Supervisor/ViewSupervisor";
import LoadingComponent from "../Loading/LoadingComponent";

const UpdateDeleteActor = ({ action }) => {
  const [district, setDistrict] = useState("");
  const [subdistrictcode, setSubDistrictcode] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [actor, setActor] = useState("");
  const { t } = useTranslation("global");
  const [loading, setLoading] = useState(false);

  // Determine the value based on the action prop
  const valueToPass = action === "Delete" ? "Delete" : "Reassign";

  useEffect(() => {
    if (actor) { // Check if actor is selected
      setLoading(true);
      AdminService.getDistrict(actor, true)
        .then((response) => {
          setDistrictOptions(response.data);
          setLoading(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
          setLoading(false);
        });
    }
  }, [actor]);

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
        alert(error.response.data.message);
        setLoading(false);
      });
  };

  const handleSubDistrictChange = (e) => {
    const selectedSubDistrict = e.target.value;
    setSubDistrictcode(selectedSubDistrict);
  };

  if (loading) return <LoadingComponent />;
  return (
    <div className="flex flex-col h-full">
      <Header />

      <div className="flex flex-col items-center justify-center mt-28">
        <h4 className="mb-4 text-xl font-bold">
          {valueToPass === "Delete"
            ? t("UpdateDeleteActor.Delete")
            : t("UpdateDeleteActor.Reassign")}
        </h4>
        <div className="max-w-5xl mx-auto flex justify-center items-center mb-4 space-x-4">
          <div className="w-1/3">
            <label htmlFor="actor" className="mb-2">
              {t("UpdateDeleteActor.Actor")}:
            </label>
            <select
              id="actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="border border-gray-400 px-2 py-1 rounded-md w-full"
              // onClick={handleActor}
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
              {t("UpdateDeleteActor.District")}:
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
              {t("UpdateDeleteActor.Subdistrict")}:
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
        console.log("select", actor);
        if (actor !== "") {
          if (actor === "DOCTOR")
            return (
              <ViewDoctors
                district={district}
                subdistrictcode={subdistrictcode}
                action={valueToPass}
              />
            );
          else {
            return (
              <ViewSupervisor
                district={district}
                subdistrictcode={subdistrictcode}
                action={valueToPass}
                actor="SUPERVISOR"
              />
            );
          }
        }
      })()}
    </div>
  );
};

export default UpdateDeleteActor;
