import React, { useEffect, useState } from "react";
import AdminService from "../../Services/AdminService";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../Loading/LoadingComponent";

const ViewDoctors = ({ allDoctor, district,subdistrictcode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageDoctor, setCurrentPageDoctor] = useState(0);
  const [data, setData] = useState([]);
  const {t} = useTranslation("global");
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage, district]); // Refetch data when currentPage or district changes

  const fetchData = async () => {
    try {
      // console.log("inside fetchdata function");
      setLoading(true);
      if (district) {
        // setCurrentPage(0)
        AdminService.getAllDistrictDoctors(district, currentPageDoctor)
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
        AdminService.getAllDoctors(currentPage).then((response) => {
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
    setLoading (true);
    if (subdistrictcode) {
      AdminService.getAllSubDistrictDoctors(subdistrictcode)
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
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    setCurrentPageDoctor((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setCurrentPageDoctor((prevPage) => prevPage + 1);
  };
  if(loading) return <LoadingComponent/>
  return (
    <div>
      <div className="data">
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">{t('UpdateDoctorSupervisor.Doctor Name')}</th>
              <th className="border border-gray-400 px-4 py-2">{t('UpdateDoctorSupervisor.District')}</th>
              <th className="border border-gray-400 px-4 py-2">{t('UpdateDoctorSupervisor.Subdistrict')}</th>
              <th className="border border-gray-400 px-4 py-2">{t('UpdateDoctorSupervisor.Action')}</th>
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
                  <button className="bg-[#6467c0] hover:bg-[#9fa1d5] text-white font-bold py-2 px-4 rounded">
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
          className="bg-[#6467c0] hover:bg-[#9fa1d5] text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          {t('UpdateDoctorSupervisor.Previous')}
        </button>

        <button
          className="bg-[#6467c0] hover:bg-[#9fa1d5] text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={data.length < 5} // Disable next button when data length is less than 5
        >
          {t('UpdateDoctorSupervisor.Next')}
        </button>
      </div>
    </div>
  );
};

export default ViewDoctors;
