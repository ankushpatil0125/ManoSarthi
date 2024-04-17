import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL, getToken } from "../../utils/Constants";
import LoadingComponent from "../Loading/LoadingComponent";
import Header from "../Header/Header";
import { useTranslation } from "react-i18next";

const PatientDetails = () => {
  const [firstname, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [lastname, setLastname] = useState("");
  const [village, setVillage] = useState("");
  const [followUpDetails, setFollowUpDetails] = useState([]);
  const [medicalQuesAns, setMedicalQuesAns] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { patientId } = location.state;
  const [t] = useTranslation("global");


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    console.log("date:", date)
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
    return `${day}/${month}/${year}`;
  };
  

  useEffect(() => {
    const handlePatientDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}doctor/patient?patientId=${patientId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        console.log("Patient: ", response.data)
        setFirstname(response?.data?.firstname);
        setLastname(response?.data?.lastname);
        setGender(response?.data?.gender);
        setVillage(response?.data?.village?.name);
        setFollowUpDetails(response?.data?.followUpDetailsList);
        setMedicalQuesAns(response?.data?.medicalQueAnsList);
        setLoading(false);
      } catch (error) {
        alert(error.response.data.message);
        setLoading(false);
      }
    };
    handlePatientDetails();
  }, [patientId]);

  if (loading) return <LoadingComponent />;

  return (
    <div>
      {console.log("FollowUpDetails: ", followUpDetails)}
      <Header />
      <div className="flex flex-col min-h-screen mt-20">
      <section className="flex-grow py-8 bg-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                {t("ViewPatientDetails.Patient Details")}
              </h2>
              <div
                  className="bg-blue-50 rounded-lg p-4 my-2"
                >
              <p className="font-semibold">Name: {firstname}  {lastname}</p>
              <p className="font-semibold">Gender: {gender}</p>
              <p className="font-semibold">Village: {village}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                Medical History
              </h2>
              <div className="bg-blue-50 rounded-lg p-4 my-2">
                {medicalQuesAns.map((medical, index) => (
                        <p className="font-semibold"> {index+1}.  {medical?.medicalquest?.question}  -  {medical?.question_ans}</p>                  
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                Follow Up Details
              </h2>
              {followUpDetails.map((followup, follow_index) => (
                <div
                  className="bg-blue-50 rounded-lg p-4 my-2"
                  key={follow_index}
                >
                  {follow_index === 0 ? (
                    <>
                      <p className="font-semibold">Survey Registration</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Follow Up No: {follow_index}</p>
                     </>
                  )}
                  <p className="font-semibold">FollowUp Date: {formatDate(followup.followupDate)}</p>
                  <p className="font-semibold">Assigned Health Worker: {followup.worker.firstname} {followup.worker.lastname}</p>   
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                Survey Questionnaire Responses
              </h2>
              {followUpDetails.map((followup, follow_index) => (
              <div key={follow_index}>
                {follow_index === 0 ? (
                  <p className="font-semibold">Survey Details</p>
                ) : (
                  <p className="font-semibold">Follow Up: {follow_index}</p>
                )}
                {console.log("followup: ", followup)}
                <div className="bg-blue-50 rounded-lg p-4 my-2">
                  {followup.questionarrieAnsList.map((quest, quest_index) => (
                    <p className="font-semibold" key={quest_index}>
                    {quest_index+1}.  {quest?.questionarrie?.question} - {quest?.question_ans}
                    </p>
                ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <Link to={`/add-prescription/${patientId}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Prescription
              </button>
            </Link>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
};

export default PatientDetails;

