// import "../../css/PendingPatient.css";
import DoctorService from "../../Services/DoctorService";
import Header from "../Header/Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../Loading/LoadingComponent";
import { useTranslation } from "react-i18next";

const OngoingPatientList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation("global");
  // const history = useHistory();
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("inside fetchdata function");

      // setCurrentPage(0)
      DoctorService.getAllPatients(currentPage, "ONGOING")
        .then((response) => {
          console.log("List of patients", response?.data);
          setData(response?.data);
          setLoading(false);
        })
        .catch((error) => {
          alert(error?.response?.data?.message);
          setLoading(false);
        });
    } catch (error) {
      alert(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handlePatient = (patient) => {
    // console.log("patientId", patient);
    // history.push('/patient-details', { patientId });
    // return <PatientDetails/>
    navigate("/ongoing-patient-details", { state: { data: patient } });
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  if (loading) {
    return <LoadingComponent />;
  } else {
    return (
      <div>
        <Header />

        {/* <form className="flex items-center max-w-sm mx-auto">
          <label for="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Patient ID"
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-[#6467c0] rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form> */}

        <div className="p-10 mt-5">
          <div
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h4 className="flex justify-center items-center text-[#6467c0]">
              {t("doctor.Ongoing Patients")}:
            </h4>
          </div>
          <table className="table-auto border border-collapse border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 px-4 py-2 text-[#6467c0]">
                  {t("doctor.FirstName")}
                </th>
                <th className="border border-gray-400 px-4 py-2 text-[#6467c0] ">
                  {t("doctor.LastName")}
                </th>

                <th className="border border-gray-400 px-4 py-2 text-[#6467c0]">
                  {t("doctor.Village")}
                </th>
                <th className="border border-gray-400 px-4 py-2 text-[#6467c0]">
                  {t("doctor.Gender")}
                </th>
                <th className="border border-gray-400 px-4 py-2 text-[#6467c0]">
                  {t("doctor.View Details")}
                </th>
                {/* <th className="border border-gray-400 px-4 py-2">Age</th> */}
              </tr>
            </thead>

            <tbody>
              {data.map((patient,index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">
                    {patient.firstname}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {patient.lastname}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {patient.villageName}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {patient.gender}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 ">
                    <button
                      onClick={() => handlePatient(patient)}
                      className="bg-[#6467c0] hover:bg-[#8182a8] text-white font-bold py-2 px-4 rounded"
                    >
                      {t("doctor.View Details")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            className="bg-[#6467c0] hover:bg-[#8182a8] text-white font-bold py-2 px-4 rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            {t("doctor.Previous")}
          </button>

          <button
            className="bg-[#6467c0] hover:bg-[#8182a8] text-white font-bold py-2 px-4 rounded"
            onClick={handleNextPage}
            disabled={data.length < 5} // Disable next button when data length is less than 5
          >
            {t("doctor.Next")}
          </button>
        </div>
      </div>
    );
  }
};

export default OngoingPatientList;
