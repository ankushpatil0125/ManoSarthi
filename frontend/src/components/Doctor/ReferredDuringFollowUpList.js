import DoctorService from "../../Services/DoctorService";
import Header from "../Header/Header";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import LoadingComponent from "../Loading/LoadingComponent";
import { useTranslation } from "react-i18next";

const ReferredDuringFollowUpList = () => {
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
      DoctorService.getReferredDuringFollowUpPatientList(currentPage)
        .then((response) => {
          console.log("List of patients",response?.data)
          setData(response?.data);
          setLoading(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
        setLoading(false);
        });
    } catch (error) {
      alert(error.response.data.message);
        setLoading(false);
    }
  };
  const handlePatient = (patient) =>{
    console.log('patientId', patient);
    // history.push('/patient-details', { patientId });
    // return <PatientDetails/>
    navigate('/referred-during-followup-patient', {state: {data: patient}});
  }
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  if(loading){
    return <LoadingComponent/>
  }
  else {

  return (
    <div>
      <Header />
      <div className="mt-10 p-5">
        <div
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4 className="flex justify-center items-center text-[#6467c0]">{t('doctor.Referred During FollowUp')}</h4>
        </div>
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2 text-[#6467c0]">{t('doctor.FirstName')}</th>
              <th className="border border-gray-400 px-4 py-2 text-[#6467c0] ">{t('doctor.LastName')}</th>

              <th className="border border-gray-400 px-4 py-2 text-[#6467c0]">{t("doctor.Village")}</th>
              <th className="border border-gray-400 px-4 py-2 text-[#6467c0]">{t("doctor.Gender")}</th>
              <th className="border border-gray-400 px-4 py-2 text-[#6467c0]">{t("doctor.View Details")}</th>
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
                    onClick={()=>handlePatient(patient)}
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

export default ReferredDuringFollowUpList;
