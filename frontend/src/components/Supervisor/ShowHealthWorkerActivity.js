import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import SupervisorService from "../../Services/SupervisorService";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../Loading/LoadingComponent";
import { Line } from "react-chartjs-2";

const ShowHealthWorkerActivity = () => {
  const [chartData, setChartData] = useState(null);
  const [village, setVillage] = useState([]);
  const [villageCode, setVillageCode] = useState(0);
  const [healthWorker, setHealthWorker] = useState();
  const [healthWorkerDetails, setHealthWorkerDetails] = useState();
  const { t } = useTranslation("global");
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const chartRef = useRef(null);

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
          const response = await SupervisorService.getAllVillageHealthWorker(villageCode);
          setHealthWorker(response.data[0]);
          setLoading(false); // Set loading to false after data is fetched
        }
      } catch (error) {
        alert(error.response.data.message);
        setLoading(false); // Set loading to false in case of error
      }
    };
    const fetchData2 = async () => {
      setLoading(true); // Set loading to true when fetching health worker data
      try {
        if (villageCode) {
          // Fetch Health workers assigned to selected village code
          const response = await SupervisorService.getWorkerDetails(villageCode);
          console.log("resp",response);
          setHealthWorkerDetails(response.data)
          setLoading(false); // Set loading to false after data is fetched
        }
      } catch (error) {
        alert(error.response.data.message);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
    fetchData2();
  }, [villageCode]);


  useEffect(() => {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Survey Dataset",
          data: [23, 6, 7, 12, 8, 30, 3],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    setChartData(data);
  }, []);


  if (loading) return <LoadingComponent />; // Render loading component if loading is true
  return (
    <div>
  <Header />
  <div className="">
    <h4 className="text-2xl font-semibold mb-4">
      Health Worker Follow Ups Activity:
    </h4>

    <div className="flex flex-wrap items-center mb-4">
      {/* Select Village */}
      <div className="w-full md:w-1/2 mb-2 md:mb-0">
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

      {/* Health Worker Details */}
      {healthWorker ? (
        <div className="pl-4 w-full md:w-1/2 mt-15">
          <div className="bg-white p-6 rounded shadow-md">
            <div className="grid grid-cols-2 ">
            <div>
                <p className="font-semibold mb-1">HealthWorker ID:</p>
                <p className="mb-2">{healthWorkerDetails?.workerId}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Name:</p>
                <p className="mb-2">{healthWorker?.firstname} {healthWorker?.lastname}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Village:</p>
                <p className="mb-2">{healthWorker?.villagename}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Email:</p>
                <p className="mb-2">{healthWorker?.email}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>

    <div className="flex flex-wrap">
  <div className="pl-2 w-full md:w-1/2 mt-15 overflow-x-auto">
  <div className="pl-4 w-full md:w-1/2 mt-15">
          <div className="bg-white p-6 rounded shadow-md">
            <div className="grid grid-cols-1 ">
            <div>
                <p className="font-semibold mb-1">Total Followup Missed: {healthWorkerDetails?.totalmissedcount}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Current Missed Count: {healthWorkerDetails?.currentMissedFollowupsCounts ?
                  Object.values(healthWorkerDetails.currentMissedFollowupsCounts)[0] :
                  "N/A"
                } 
                </p>             
            </div>
            </div>
          </div>
        </div>
    <label htmlFor="village" className="block font-semibold mt-4 mb-2">
    Previously Missed Followups Details:
    </label>
    <table className="table-auto border border-collapse border-gray-400">
      <thead className="bg-[#bfbfdf]">
        <tr>
          <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">Sr. No</th>
          <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">Village Name</th>
          <th className="border border-gray-400 px-4 py-2">Missed Count</th>
        </tr>
      </thead>
      <tbody>
        {healthWorkerDetails?.prevMissedFollowupsCounts?.map((villageData, index) => {
          const villageName = Object.keys(villageData)[0]; // Extracting village name
          const villageCount = villageData[villageName]; // Extracting count
          return (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{villageName}</td>
              <td className="border border-gray-400 px-4 py-2">{villageCount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

   <div className="pl-2 w-full mt-4 overflow-x-auto">
    <label htmlFor="village" className="block font-semibold mb-2">
      Current Missed Followups Details:
    </label>
    <table className="table-auto border border-collapse border-gray-400">
      <thead className="bg-[#bfbfdf]">
        <tr>
          <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">Sr. No</th>
          <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">Village Name</th>
          <th className="border border-gray-400 px-4 py-2">Patient Name</th>
          <th className="border border-gray-400 px-4 py-2">Missed Followup Date</th>
        </tr>
      </thead>
      <tbody>
        {healthWorkerDetails?.currentMissedFollowups?.map((followup, index) => {
          return (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{followup.villageName}</td>
              <td className="border border-gray-400 px-4 py-2">{followup.patientName}</td>
              <td className="border border-gray-400 px-4 py-2">{followup.followup_date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  <div className="pl-2 w-full mt-4 overflow-x-auto">
    <label htmlFor="village" className="block font-semibold mb-2">
      Previously Missed Followups Details:
    </label>
    <table className="table-auto border border-collapse border-gray-400">
      <thead className="bg-[#bfbfdf]">
        <tr>
          <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">Sr. No</th>
          <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">Village Name</th>
          <th className="border border-gray-400 px-4 py-2">Patient Name</th>
          <th className="border border-gray-400 px-4 py-2">Missed Followup Date</th>
          <th className="border border-gray-400 px-4 py-2">Completed Date</th>
        </tr>
      </thead>
      <tbody>
        {healthWorkerDetails?.prevMissedFollowups?.map((followup, index) => {
          return (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{followup.villageName}</td>
              <td className="border border-gray-400 px-4 py-2">{followup.patientName}</td>
              <td className="border border-gray-400 px-4 py-2">{followup.followup_date}</td>
              <td className="border border-gray-400 px-4 py-2">{followup.completed_date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
  </div>
</div>

  );
};

export default ShowHealthWorkerActivity;
