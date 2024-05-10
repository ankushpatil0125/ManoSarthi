import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SupervisorService from "../../Services/SupervisorService";
import LoadingComponent from "../Loading/LoadingComponent";
import { useNavigate } from "react-router-dom";
const MissedFollowups = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const { t } = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      console.log("Missed followups")
      setLoading(true);
      try {
        const response = await SupervisorService.getMissedFollowupsofWorker();
        console.log("missed followupsof worker", response?.data);
        setData(response?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDetails = () => {
    navigate('/missed-patient-details', {state: {data: data}});
  };
  // const handlePrevPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  // };

  // const handleNextPage = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };
  if (loading) return <LoadingComponent />;
  return (
    <div>
      <div className="data flex flex-col">
        <p className="font-semibold text-2xl">Missed Followups Per Village</p>
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Village Name</th>
              {/* <th className="border border-gray-400 px-4 py-2">
                Health Worker Name
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Health Worker Email
              </th> */}
              <th className="border border-gray-400 px-4 py-2">
                MissedFollowUp Count
              </th>
              <th className="border border-gray-400 px-4 py-2">View Details</th>
            </tr>
          </thead>
          {<tbody>
            {data.map((village,index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {village?.villageName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {village?.missedFollowupsCount || "N/A"}
                </td>
                
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    onClick={() => handleDetails(village)}
                    className="bg-[#6467c0] hover:bg-violet-300 text-white font-bold py-2 px-4 rounded"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
      {/* <div className="flex gap-2 justify-center">
        <button
          className="bg-[#6467c0] hover:bg-[#9fa1d5] text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          {t("UpdateDeleteActor.Previous")}
        </button>

        <button
          className="bg-[#6467c0] hover:bg-[#9fa1d5] text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={data.length < 3} // Disable next button when data length is less than 5
        >
          {t("UpdateDeleteActor.Next")}
        </button>
      </div> */}
    </div>
  );
};
export default MissedFollowups;
