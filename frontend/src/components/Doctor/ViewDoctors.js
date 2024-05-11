import React, { useEffect, useState, useCallback } from "react";
import AdminService from "../../Services/AdminService";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../Loading/LoadingComponent";

const ViewDoctor = ({ district, subdistrictcode, action, actor }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newDistrict, setNewDistrict] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [data, setData] = useState([]);
  const { t } = useTranslation("global");
  const [loading, setLoading] = useState(false);

  const [fetchingData, setFetchingData] = useState(false); // New state for data fetching

  const fetchData = useCallback(async () => {
    try {
      setFetchingData(true);
      setLoading(true);

      let response;
      if (!district && !subdistrictcode) {
        console.log("inside not distruct and not subdistrict");
        response = await AdminService.getAllDoctors(currentPage);
      } else if (district && !subdistrictcode) {
        console.log("inside  distruct");
        response = await AdminService.getAllDistrictDoctors(
          district,
          currentPage
        );
      } else if (subdistrictcode) {
        console.log("insise subdistrict change");
        response = await AdminService.getAllSubDistrictDoctors(
          subdistrictcode
        );
        console.log("response", response);
      }

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    } finally {
      setFetchingData(false);
      setLoading(false);
    }
  }, [currentPage, district, subdistrictcode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDistrictChange = (e) => {
    const newSelDist = e.target.value;
    setNewDistrict(newSelDist);
    setLoading(true);
    AdminService.getSubDistrict(newSelDist, actor, false)
      .then((response) => {
        console.log("subdistricts: ", response.data)
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

  const handleUpdateButton = (doctorId) => {
    console.log("doctorId", doctorId);
    setShowModal(true);
    setSelectedDoctorId(doctorId);
  };

  const handleDelete = (doctorId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete the actor?"
    );
    if (confirmation) {
      setLoading(true);
      // console.log("Delete doctorId", doctorId);
      setSelectedDoctorId(doctorId);
      const Id = {
        id: doctorId,
      };

      // try {
      //   const response = AdminService.deleteSupervisor(Id);
      //   if (response) {
      //     alert("Doctor Deleted Successfully");
      //     setLoading(false);
      //   }
      // } catch (error) {
      //   setLoading(false);
      //   alert(error.response.data.message);
      // }
    } else {
      // Do nothing or provide feedback to the user.
      console.log("Deletion canceled");
      setLoading(false);
    }
  };

  const handleUpdateDoctor = async () => {
     // Call update worker API with selected village code
  console.log("Selected Subdistrict:", selectedSubDistrict);
  console.log("Doctor ID:", selectedDoctorId);
  try {
    setLoading(true);
    const response = await AdminService.reassignDoctor(selectedSubDistrict, selectedDoctorId);
    console.log("res: ", response?.data);

    // Check if the response has an error message
    if(response){
      // Handle success scenario
      alert("Doctor Reassigned Sucessfully!");
    }
  } 
  catch (error) {
    setLoading(false);
    alert(error?.response?.data?.message);

  }
  // Close modal after updating
  setShowModal(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    // setCurrentPageSupervisor((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    // setCurrentPageSupervisor((prevPage) => prevPage + 1);
    console.log("page: ", currentPage);
    // console.log("S page: ", currentPageSupervisor);
  };
  if (loading || fetchingData) return <LoadingComponent />; // Show loading indicator while fetching data
  return (
    <div>
      <div className="data">
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.Doctor Name")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.District")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.Subdistrict")}
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
            {data.map((doctor) => (
              <tr key={doctor.id}>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor?.firstname}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor?.districtName || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor?.subDistrictName || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor?.email || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                <button
                    onClick={() => {
                      if (action === "Reassign") {
                        handleUpdateButton(doctor.id);
                      } else if (action === "Delete") {
                        handleDelete(doctor.id);
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
              onClick={handleUpdateDoctor}
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

export default ViewDoctor;




