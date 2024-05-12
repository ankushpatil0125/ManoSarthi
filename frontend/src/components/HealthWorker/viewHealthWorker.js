import React, { useEffect, useState } from "react";
import SupervisorService from "../../Services/SupervisorService";
import "../../css/modal.css";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../Loading/LoadingComponent";
import { FaSyncAlt, FaTimes, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const ViewHealthWorker = ({action,  allHealWorker, village }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageHealthWorker, setCurrentPageHealthWorker] = useState(0);
  const [villageOptions, setVillageOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedHealthWorkerId, setSelectedHealthWorkerId] = useState(null);
  const [loading,setLoading] = useState(false);


  const [data, setData] = useState([]);
  const { t } = useTranslation("global");
  // const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [currentPage, village]); // Refetch data when currentPage or district changes

  useEffect(() => {
    setLoading (true);
    if (showModal) {
      // Fetch village options
      SupervisorService.getVillageWorker(false)
        .then((response) => {
          setVillageOptions(response.data);
          setLoading(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
        setLoading(false);
        });
    }
    setLoading(false)   
  }, [showModal]);

  const fetchData = async () => {
    try {
      console.log("inside fetchdata function");
      setLoading(true);
      if (village) {
        // console.log("Village: ", village);
        // setCurrentPage(0)
        SupervisorService.getAllVillageHealthWorker(village)
          .then((response) => {
            // console.log("VillageVVV: ", response.data);
            data.push( response.data)

            setData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            alert(error.response.data.message);
        setLoading(false);
          });
      } else {
        setCurrentPageHealthWorker(0);
        SupervisorService.getAllHealthWorkers(currentPage).then((response) => {
          setData(response.data);
          // console.log("data", response.data);
          setLoading(false);
        });
      }
    } catch (error) {
      alert(error.response.data.message);
        setLoading(false);
    }
  };

  // const handleUpdate = () =>{
  //   navigate("/update")
  // }

  const handleUpdate = (healthWorkerId) => {
    console.log("healthWorkerId", healthWorkerId);
    setShowModal(true);
    setSelectedHealthWorkerId(healthWorkerId);
  };

  const handleDelete = (healthWorkerId) => {
    setSelectedHealthWorkerId(healthWorkerId);
    alert(`Do you want to delete the health worker with id:${healthWorkerId}`)
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateWorker = () => {
    // Call update worker API with selected village code
    console.log("Selected Village:", selectedVillage);
    console.log("HealthWorker ID:", selectedHealthWorkerId);

    const reasignHealthWorker = {
      id: selectedHealthWorkerId,
      villagecode: {
        code: selectedVillage,
      },
    };
    setLoading(true)
    try{
    const response = SupervisorService.updateHealthWorker(reasignHealthWorker);
    console.log("response of update healthworker",response);
    setLoading(false);
    }
    catch(error){
      console.log("Error while Updating healthworker");
      setLoading(false)
    }
    // Your update worker API call here
    setLoading(false);
    setShowModal(false); // Close modal after updating
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    setCurrentPageHealthWorker((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setCurrentPageHealthWorker((prevPage) => prevPage + 1);
  };
  if(loading)return <LoadingComponent/>
  return (
    <div>
      <div className="data">
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateHealthworker.HealthWorker Firstname")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateHealthworker.HealthWorker Lastname")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateHealthworker.Email")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateHealthworker.Village")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateHealthworker.Action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((healthworker) => (
              <tr key={healthworker.id}>
                <td className="border border-gray-400 px-4 py-2">
                  {healthworker.firstname}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {healthworker.lastname || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {healthworker.email || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {healthworker.villagename || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {/* <button
                    onClick={() => handleUpdate(healthworker.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <FaSyncAlt className="mr-2"/>
                    Update
                  </button> */}
                  <button
                    onClick={() => {
                      if (action === "Update") {
                        handleUpdate(healthworker.id);
                      } else if (action === "Delete") {
                        handleDelete(healthworker.id);
                      }
                    }}
                    className={`${action === 'Update' ? 'bg-[#6467c0] hover:bg-[#a3a5cf]' : 'bg-[#6467c0] hover:bg-[#a3a5cf]'} text-white font-bold py-2 px-4 rounded inline-flex items-center`}
                    >
                    {action === 'Update'?<FaSyncAlt className="mr-2"/>: <FaTrash className="mr-2" />}
                    {action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 justify-center">
        <button
          className="bg-[#6467c0] hover:bg-[#8788ac] text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        <button
          className="bg-[#6467c0] hover:bg-[#8788ac] text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={data.length < 5} // Disable next button when data length is less than 5
        >
          Next
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="bg-white p-8 rounded shadow-md max-w-lg w-full z-50" style={{ height: "350px" }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Select Village for Reassignment:</h2>
            <button onClick={handleCloseModal} className="text-gray-600 hover:text-gray-800">
              <FaTimes className="text-lg" />
            </button>
          </div>
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Village</option>
            {villageOptions.map((village) => (
              <option key={village.code} value={village.code}>
                {village.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
            <button
              onClick={handleUpdateWorker}
              className="mt-32 bg-[#6467c0] hover:bg-[#9698ba] text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaSyncAlt className="mr-2" />
              Update
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ViewHealthWorker;
