import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, getToken } from "../../utils/Constants";

const ViewDoctors = ({ allDoctor,district }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const noOfPages = Math.ceil(allDoctor.length / 5);
  console.log(noOfPages);
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      console.log("inside fetchdata funtion");
      const response = await axios.get(
        BASE_URL + "admin/viewdoctor/" + currentPage,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setData(response.data);
      console.log("data", response.data); // Move the log inside the try block
    } catch (error) {
      console.error("Error fetching doctor details:", error.message);
    }
  };

//   useEffect(() => {
//     fetchDistrictDoctor();
//   }, [district]);

//   const fetchDistrictDoctor = async ()=>{
//     try {
//       const response = await axios.get(
//         BASE_URL + "admin/doctor/district/?districtcode="+district,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );
//       console.log("district doctor",response);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching doctor details:", error.message);
//     }
//   }
  const handlePrevPage = () => {
    console.log("current page", currentPage);
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    console.log("current page", currentPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, noOfPages));
  };

  return (
    <div>
      <div className="data">
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Doctor Name</th>
              <th className="border border-gray-400 px-4 py-2">District</th>
              <th className="border border-gray-400 px-4 py-2">Subdistrict</th>
              <th className="border border-gray-400 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((doctor) => (
              <tr key={doctor.id}>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor.firstname}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor.subdistrictcode?.district?.name || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {doctor.subdistrictcode?.name || "N/A"}
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
        {currentPage === 0 ? (
          <div></div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePrevPage}
            // disabled={currentPage === 0}
          >
            Previous
          </button>
        )}
        {currentPage === noOfPages - 1 ? (
          <div></div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextPage}
            // disabled={currentPage === noOfPages}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewDoctors;
