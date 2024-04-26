import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SupervisorService from "../../Services/SupervisorService";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../Loading/LoadingComponent";
import { FaTrash } from "react-icons/fa";

const DeleteHealthWorker = () => {
  const [village, setVillage] = useState([]);
  const [villageCode, setVillageCode] = useState(0);
  const [healthWorker, setHealthWorker] = useState(null);
  const { t } = useTranslation("global");
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    // Fetch village options
    SupervisorService.getVillageWorker(true)
      .then((response) => {
        setVillage(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        alert(error.response.data.message);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching health worker data
      try {
        if (villageCode) {
          // Fetch Health workers assigned to selected village code
          const response = await SupervisorService.getAllVillageHealthWorker(
            villageCode
          );
          setHealthWorker(response.data[0]);
          setLoading(false); // Set loading to false after data is fetched
        }
      } catch (error) {
        alert(error.response.data.message);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, [villageCode]);

  const handleDelete = () => {
    // Handle delete action here
    console.log("Delete action triggered");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="w-full md:w-1/2 mb-4">
        <label htmlFor="village" className="block font-semibold mb-2">
          Select Village:
        </label>
        <select
          id="village"
          value={villageCode || 0}
          onChange={(e) => setVillageCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value={0}>{t("addHealthWorker.Select")}</option>
          {village.map((village, index) => (
            <option key={index} value={village.code}>
              {village.name}
            </option>
          ))}
        </select>
      </div>

      {/* Health Worker Details Card */}
      {healthWorker && (
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded shadow-md">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-semibold">Worker ID:</p>
                <p >{healthWorker?.id}</p>
              </div>
              <div>
                <p className="font-semibold">Name:</p>
                <p>{healthWorker?.firstname} {healthWorker?.lastname}</p>
              </div>
              <div>
                <p className="font-semibold">Village:</p>
                <p>{healthWorker?.villagename}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{healthWorker?.email}</p>
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteHealthWorker;
