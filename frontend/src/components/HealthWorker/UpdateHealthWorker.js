import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../css/UpdateDoctor.css";
import Header from "../Header/Header";
import ViewHealthWorker from "./viewHealthWorker";
import SupervisorService from "../../Services/SupervisorService";

const UpdateHealthWorker = () => {
  const [village, setVillage] = useState("");
//   const [subdistrictcode, setSubDistrictcode] = useState("");
  const [villageOptions, setVillageOptions] = useState([]);
//   const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [allHealWorker, setAllHealthWorker] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("global");

  useEffect(() => {
    // Fetch district options
    SupervisorService.getVillage()
      .then((response) => {
        setVillageOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching villages options:", error);
      });
  }, []);

  const handleVillageChange = (e) => {
    const selectedVillage = e.target.value;
    setVillage(selectedVillage);
  };


  return (
    <div>
      <Header />

      <div className="udcon">
        <h4> Choose Village:</h4>
        <div className="form-container">
          <div>
            <label htmlFor="village">
              {t("UpdateHealthworker.Village")}:
            </label>
            <select
              id="village"
              value={village}
              onChange={handleVillageChange}
            >
              <option value="">Select</option>
              {villageOptions.map((village, index) => (
                <option key={index} value={village.code}>
                  {village.name}
                </option>
              ))}
            </select>
          </div>
          
        </div>
      </div>
      <ViewHealthWorker allHealWorker={allHealWorker} village={village}/>
    </div>
  );
};

export default UpdateHealthWorker;