import React, { useEffect, useState } from "react";
import AdminService from "../../Services/AdminService";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../Loading/LoadingComponent";

const ViewSupervisor = ({ district, subdistrictcode, action, actor }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageDoctor, setCurrentPageDoctor] = useState(0);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newDistrict, setNewDistrict] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [selectedSupervisorId, setSelectedSupervisorId] = useState(null);

  const [data, setData] = useState([]);
  const { t } = useTranslation("global");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      // console.log("Inside fetchdata function");

      setLoading(true);
      if (district) {
        // setCurrentPage(0)
        AdminService.getAllDistrictSupervisors(district, currentPageDoctor)
          .then((response) => {
            setData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            alert(error.response.data.message);
            setLoading(false);
          });
      } else {
        setCurrentPageDoctor(0);
        AdminService.getAllSupervisors(currentPage).then((response) => {
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

  useEffect(() => {
    setLoading(true);
    if (subdistrictcode) {
      AdminService.getAllSubDistrictSupervisors(subdistrictcode)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
          setLoading(false);
        });
    }
  }, [subdistrictcode]);

  useEffect(() => {
    fetchData();
  }, [currentPage, district]); // Refetch data when currentPage or district changes

  const handleDistrictChange = (e) => {
    const newSelDist = e.target.value;
    setNewDistrict(newSelDist);
    setLoading(true);
    AdminService.getSubDistrict(newSelDist, actor, false)
      .then((response) => {
        setSubDistrictOptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (showModal) {
      if (actor) {
        // Check if actor is selected
        setLoading(true);
        AdminService.getDistrict(actor, false)
          .then((response) => {
            setDistrictOptions(response.data);
            setLoading(false);
          })
          .catch((error) => {
            alert(error.response.data.message);
            setLoading(false);
          });
      }
    }
  }, [showModal, actor]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateButton = (supervisorId) => {
    console.log("supervisorId", supervisorId);
    setShowModal(true);
    setSelectedSupervisorId(supervisorId);
  };

  const handleDelete = (supervisorId) => {
    const confirmation = window.confirm("Are you sure you want to delete the actor?");
    if (confirmation) {
        console.log("Delete supervisorId", supervisorId);
        setSelectedSupervisorId(supervisorId);
        const Id = {
            id: supervisorId,
        };

        try {
            setLoading(true);
            const response = AdminService.deleteSupervisor(Id);
            if (response) {
                alert("Supervisor Deleted Successfully");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            alert(error.response.data.message);
        }
    } else {
        // Do nothing or provide feedback to the user.
        console.log("Deletion canceled");
    }
};

  const handleUpdateSupervisor = () => {
    // Call update worker API with selected village code
    console.log("Selected Subdistrict:", selectedSubDistrict);
    console.log("Supervisor ID:", selectedSupervisorId);

    const reasignSupervisor = {
      id: selectedSupervisorId,
      subdistrictcode: {
        code: selectedSubDistrict,
      },
    };
    try {
      setLoading(true);   
      const response = AdminService.reassignSupervisor(reasignSupervisor);
      if (response) {
        alert("Supervidor Reassigned Successfully");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }

    // Your update worker API call here
    setShowModal(false); // Close modal after updating
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    setCurrentPageDoctor((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setCurrentPageDoctor((prevPage) => prevPage + 1);
  };
  if (loading) return <LoadingComponent />;
  return (
    <div>
      <div className="data">
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.Supervisor Name")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.District")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.Subdistrict")}
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
                  {supervisor.firstname}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {supervisor.subdistrictcode?.district?.name || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {supervisor.subdistrictcode?.name || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    onClick={() => {
                      if (action === "Reassign") {
                        handleUpdateButton(supervisor.id);
                      } else if (action === "Delete") {
                        handleDelete(supervisor.id);
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          {t("UpdateDeleteActor.Previous")}
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={data.length < 5} // Disable next button when data length is less than 5
        >
          {t("UpdateDeleteActor.Next")}
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Select for Reassignment:</h2>
            <select
              value={newDistrict}
              onChange={handleDistrictChange}
              className="border border-gray-400 px-2 py-1 rounded-md w-full"
            >
              <option value="">Select District</option>
              {districtOptions.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
            <select
              value={selectedSubDistrict}
              onChange={(e) => setSelectedSubDistrict(e.target.value)}
            >
              <option value="">Select Subdistrict</option>
              {subDistrictOptions.map((subdistrict) => (
                <option key={subdistrict.code} value={subdistrict.code}>
                  {subdistrict.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleUpdateSupervisor}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSupervisor;
