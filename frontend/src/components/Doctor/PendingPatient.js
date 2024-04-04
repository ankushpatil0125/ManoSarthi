import "../../css/PendingPatient.css";
import DoctorService from "../../Services/DoctorService";
import Header from "../Header/Header";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const PendingPatient = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      console.log("inside fetchdata function");

      // setCurrentPage(0)
      DoctorService.getAllPatients(currentPage)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching patients:", error);
        });
    } catch (error) {
      console.error("Error fetching patients details:", error.message);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Header />
      <div className="pending">
        <div
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4>New Patients : </h4>
        </div>
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">FirstNamme</th>
              <th className="border border-gray-400 px-4 py-2">LastName</th>
              <th className="border border-gray-400 px-4 py-2">Gender</th>

              <th className="border border-gray-400 px-4 py-2">Village</th>
              {/* <th className="border border-gray-400 px-4 py-2">Age</th> */}
            </tr>
          </thead>

          <tbody>
            {data.map((patient) => (
              <tr key={patient.id}>
                <td className="border border-gray-400 px-4 py-2">
                  {patient.firstname}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {patient.lastname}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {patient.village.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {patient.gender}
                </td>
                {/* <td className="border border-gray-400 px-4 py-2">
                  {patient.firstname}
                </td> */}
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

export default PendingPatient;
