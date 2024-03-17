import React, { useEffect, useState } from "react";
import SupervisorService from "../../Services/SupervisorService";
import { useTranslation } from "react-i18next";

const ViewHealthWorker = ({ allHealWorker,village }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageHealthWorker, setCurrentPageHealthWorker] = useState(0);
  const [data, setData] = useState([]);
  const {t} = useTranslation("global");
  useEffect(() => {
    fetchData();
  }, [currentPage, village]); // Refetch data when currentPage or district changes

  const fetchData = async () => {
    try {
      console.log("inside fetchdata function");
      if (village) {
        // setCurrentPage(0)
        SupervisorService.getAllVillageHealthWorker(village, currentPageHealthWorker)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching district doctors:", error);
          });
      } else {
        setCurrentPageHealthWorker(0);
        SupervisorService.getAllHealthWorkers(currentPage).then((response) => {
          setData(response.data);
          console.log("data", response.data);
        });
      }
    } catch (error) {
      console.error("Error fetching doctor details:", error.message);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    setCurrentPageHealthWorker((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setCurrentPageHealthWorker((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className="data">
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">{t('UpdateHealthworker.HealthWorker Name')}</th>
              <th className="border border-gray-400 px-4 py-2">{t("UpdateHealthworker.Village")}</th>
              <th className="border border-gray-400 px-4 py-2">{t('UpdateHealthworker.Action')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((healthworker) => (
              <tr key={healthworker.id}>
                <td className="border border-gray-400 px-4 py-2">
                  {healthworker.firstname}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {healthworker.village?.name || "N/A"}
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
      </div>
      <div className="flex gap-2 justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={data.length < 5} // Disable next button when data length is less than 5
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewHealthWorker;
