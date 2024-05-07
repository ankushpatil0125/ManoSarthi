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
    // Clear district and subdistrictcode immediately when actor is set
    setDistrict("");
    setSubDistrictcode("");

    // Fetch district options only when actor is set
    const fetchDistrictOptions = async () => {
      try {
        // Fetch district options
        const response = await AdminService.getDistrict(actor, true);
        setDistrictOptions(response.data);
      } catch (error) {
        console.error("Error fetching district options:", error);
      }
    };

    // Only run the effect if actor has been set
    if (actor !== "") {
      fetchDistrictOptions();
    }
  }, [actor]);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setLoading(true);

    // Fetch subdistrict options only if both actor and district are selected
    if (actor !== "" && selectedDistrict !== "") {
      AdminService.getSubDistrict(selectedDistrict, actor, true)
        .then((response) => {
          setSubDistrictOptions(response.data);
          setLoading(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
          setLoading(false);
        });
    } else {
      alert("Select Actor and District First");
      setLoading(false);
    }
  };

  const handleSubDistrictChange = (e) => {
    const selectedSubDistrict = e.target.value;
    setSubDistrictcode(selectedSubDistrict);
  };

  if (loading) return <LoadingComponent />;
  return (
    <div className="flex flex-col">
      {/* <Header /> */}
      <div className="flex flex-col items-center justify-center">
        <h4 className="mb-4 text-xl font-bold text-[#6467c0]">
          {t("UpdateDeleteActor.Reassign")}
        </h4>
        <div className="max-w-5xl mx-auto flex justify-center items-center mb-4 space-x-4">
          <div className="w-full md:w-1/3">
            <label htmlFor="actor" className="mb-2 text-[#6467c0]">
              {t("UpdateDeleteActor.Actor")}:
            </label>
            <select
              id="actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="border border-gray-400 px-2 py-1 rounded-md w-full "
            >
              <option value="">{t("addDoctorSupervisor.Select")}</option>
              <option value="DOCTOR">{t("addDoctorSupervisor.Doctor")}</option>
              <option value="SUPERVISOR">
                {t("addDoctorSupervisor.Supervisor")}
              </option>
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="district" className="mb-2 text-[#6467c0]">
              {t("UpdateDeleteActor.District")}:
            </label>
            <select
              id="district"
              value={district}
              onChange={handleDistrictChange}
              disabled={!actor} // Disable if actor is not selected
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
          <div className="w-full md:w-1/3">
            <label htmlFor="subdistrictcode" className="mb-2 text-[#6467c0]">
              {t("UpdateDeleteActor.Subdistrict")}:
            </label>
            <select
              id="subdistrictcode"
              value={subdistrictcode}
              onChange={handleSubDistrictChange}
              disabled={!actor || !district} // Disable if actor or district is not selected
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
        if (actor !== "") {
          if (actor === "DOCTOR")
            return (
              <ViewDoctors
                district={district}
                subdistrictcode={subdistrictcode}
                action={valueToPass}
                actor="DOCTOR"
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
