import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, getToken } from "../../utils/Constants";
import AdminService from "../../Services/AdminService";

const ViewDoctors = ({ allDoctor, district,subdistrictcode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageDoctor, setCurrentPageDoctor] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage, district]); // Refetch data when currentPage or district changes

  const fetchData = async () => {
    try {
      console.log("inside fetchdata function");
      if (district) {
        // setCurrentPage(0)
        AdminService.getAllDistrictDoctors(district, currentPageDoctor)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching district doctors:", error);
          });
      } else {
        setCurrentPageDoctor(0);
        AdminService.getAllDoctors(currentPage).then((response) => {
          setData(response.data);
          console.log("data", response.data);
        });
      }
    } catch (error) {
      console.error("Error fetching doctor details:", error.message);
    }
  };
  useEffect(() => {
    if (subdistrictcode) {
      AdminService.getAllSubDistrictDoctors(subdistrictcode)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching subdistrict doctors:", error);
        });
    }
  }, [subdistrictcode]);
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    setCurrentPageDoctor((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setCurrentPageDoctor((prevPage) => prevPage + 1);
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

export default ViewDoctors;
