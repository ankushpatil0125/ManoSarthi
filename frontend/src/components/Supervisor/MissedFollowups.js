import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import SupervisorService from '../../Services/SupervisorService';
import LoadingComponent from '../Loading/LoadingComponent';
const MissedFollowups = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const { t } = useTranslation("global");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try{
                const response = await SupervisorService.getMissedFollowupsofWorker(currentPage);
                console.log("missed followupsof worker", response?.data)
                setData(response?.data);
            }catch(error) {
                console.log(error);
                alert(error?.response?.data?.message);
                setLoading(false);
            }
        };
      fetchData();
    }, []);

    const handleDetails = () =>{

    }
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
    if (loading) return <LoadingComponent />; 
    return (
      <div>
        <div className="data">
          <table className="table-auto border border-collapse border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 px-4 py-2">
                  {t("UpdateDeleteActor.HealthWorker Name")}
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  {t("UpdateDeleteActor.Village")}
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  {t("UpdateDeleteActor.Email")}
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  {t("UpdateDeleteActor.Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((supervisor) => (
                <tr key={supervisor.id}>
                  <td className="border border-gray-400 px-4 py-2">
                    {supervisor?.firstname}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {supervisor?.villageName || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {supervisor?.email || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                  <button
                      onClick={handleDetails}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2 justify-center">
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
        </div>

      </div>
    );
  };
export default MissedFollowups