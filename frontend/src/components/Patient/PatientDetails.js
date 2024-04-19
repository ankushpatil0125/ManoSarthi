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
  const [currentQuestinarriePage, setCurrentQuestionarriePage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentQuestinarriePage]);

  const fetchData = async () => {
    // try {
      console.log("inside fetchdata function");
      // followUpDetails[0].questionarrieAnsList = []
      // DoctorService.getAllPatients(currentPage)
        // .then((response) => {
        //   setData(response.data);
        //   setLoading(false);
        // })
        // .catch((error) => {
        //   alert(error.response.data.message);
        // setLoading(false);
        // });
    // } catch (error) {
    //   alert(error.response.data.message);
    //     setLoading(false);
    // }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    console.log("date:", date)
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
    return `${day}/${month}/${year}`;
  };
  
  const handleNextQuestionarrie = () => {
    setCurrentQuestionarriePage((prevPage) => prevPage + 1);
  }

  const handlePreviousQuestionarrie = () => {
    setCurrentQuestionarriePage((prevPage) => Math.max(prevPage - 1, 0));
  }

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
    <Header />
      <div className="flex flex-col min-h-screen mt-16">
        <section className="flex-grow py-8 bg-gray-100">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Patient Details and Medical History */}
              <div className="space-y-8">
                {/* Patient Details */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">
                    {t("ViewPatientDetails.Patient Details")}
                  </h2>
                  <div className="bg-blue-50 rounded-lg p-4 my-2">
                    <p className="text-gray-950">Name: {firstname} {lastname}</p>
                    <p className="text-gray-950">Gender: {gender}</p>
                    <p className="text-gray-950">Village: {village}</p>
                  </div>
                </div>
                {/* Medical History */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">
                    Medical History
                  </h2>
                  <div className="bg-blue-50 rounded-lg p-4 my-2">
                    {medicalQuesAns.map((medical, index) => (
                      <p key={index} className="text-gray-950">
                        {index + 1}. {medical?.medicalquest?.question} - {medical?.question_ans}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
    
              {/* Survey Questionnaire */}
              <div className="bg-white rounded-lg shadow-lg p-6 col-span-2 md:col-auto">
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Survey Questionnaire Responses
                </h2>
                {followUpDetails.map((followup, follow_index) => (
                  <div key={follow_index}>
                    {follow_index === 0 ? (
                      <p className="text-gray-950 font-semibold">Survey Details</p>
                    ) : (
                      <p className="text-gray-950 font-semibold">Follow Up: {follow_index}</p>
                    )}
                    <p className="text-gray-950">Date: {formatDate(followup.followupDate)}</p>
                    <p className="text-gray-950">Assigned Health Worker: {followup.worker.firstname} {followup.worker.lastname}</p>
                    <div className="bg-blue-50 rounded-lg p-4 my-2">
                      {followup.questionarrieAnsList.map((quest, quest_index) => (
                        <p key={quest_index} className="text-gray-950">
                          {quest_index + 1}. {quest?.questionarrie?.question} - {quest?.question_ans}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 justify-end">
                  {currentQuestinarriePage !== 0 ? (
                    <button
                      className="bg-[#6467c0] hover:bg-[#8182a8] text-white font-bold py-2 px-4 rounded"
                      onClick={handlePreviousQuestionarrie}
                    >
                      Previous
                    </button>
                  ) : null}
                  <button
                    className="bg-[#6467c0] hover:bg-[#8182a8] text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextQuestionarrie}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <Link to={`/add-prescription/${patientId}`}>
                <button className="bg-[#6467c0] hover:bg-[#8182a8] text-white font-bold py-2 px-4 rounded">
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