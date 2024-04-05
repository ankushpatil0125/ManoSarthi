import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL, getToken } from "../../utils/Constants";
import LoadingComponent from "../Loading/LoadingComponent";
import CryptoJS from 'crypto-js'

const PatientDetails = () => {
  const [firstname, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [lastname, setLastname] = useState("");
  const [village, setVillage] = useState("");
  const [followUpDetails, setfollowUpDetails] = useState([]);
  const [medicalQuesAns, setMedicalQuesAns] = useState([]);
  const location = useLocation();
  const [loading,setLoading] = useState(false);
  const { patientId } = location.state;
  const [encrypt,setEncrypt] = useState('');
  console.log('patient',patientId)
  useEffect(() => {
    // const encryptData = (data, key) => {
    //   return CryptoJS.AES.encrypt(data, key).toString();
    // };
    // const key = 'this-is-test-key'; // Your encryption key
    
    // const ciphertext = encryptData(patientId, key);
    // // console.log('ciphertext', ciphertext);
    // console.log('ciphertext', ciphertext);
    // setEncrypt(ciphertext);
    const handlePatientDetails = async () => {
      console.log("Useeffect handlePatientDetails");
      try {
        setLoading(true);
        const response = await axios.get(
          BASE_URL + "doctor/patient?patientId=" + patientId,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setFirstname(response?.data?.firstname);
        setLastname(response?.data?.lastname);
        setGender(response?.data?.gender);
        setVillage(response?.data?.village?.name);
        setfollowUpDetails(response?.data?.followUpDetailsList);
        setMedicalQuesAns(response?.data?.medicalQueAnsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Dcotor Information:", error);
        throw error;
      }
    };
    handlePatientDetails();
    console.log("Folloe Up details:", followUpDetails);
  }, []);
  if(loading)return <LoadingComponent/>
  else
  return (
    <div className="flex justify-center items-center">
      <section className="text-gray-600 body-font overflow-hidden ">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            
            <div className="py-8 flex flex-wrap md:flex-nowrap border-2 border-black-200 ">
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  Patient Details
                </h2>
                <p className="leading-relaxed font-bold">
                  First Name : {firstname}
                </p>
                <p className="leading-relaxed font-bold">
                  Last Name : {lastname}
                </p>
                <p className="leading-relaxed font-bold">Gender : {gender}</p>
                <p className="leading-relaxed font-bold">Village : {village}</p>
              </div>
            </div>
            {/* <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  Follow Up Details
                </h2>

                {followUpDetails.map((followUpDetail, index) => (
                  <div className="flex flex-wrap" key={index}>
                    <p className="leading-relaxed font-bold">
                      Follow Up No : {followUpDetail?.followUpNo}
                    </p>
                    <p className="leading-relaxed font-bold">
                      Doctor First Name : {followUpDetail?.doctor?.firstname}
                    </p>
                    <p className="leading-relaxed font-bold">
                      Doctor Last Name : {followUpDetail?.doctor?.lastname}
                    </p>

                    {followUpDetail?.questionarrieAnsList.map(
                      (question, index) => (
                        <div className="flex flex-wrap" key={index}>
                          <p className="leading-relaxed font-bold">
                            Questionaire Question :
                            {question?.questionarrie?.question}
                          </p>
                          <p className="leading-relaxed font-bold">
                            Questionaire Answer :{question?.question_ans}
                          </p>
                          <p className="leading-relaxed font-bold">
                            Questionaire Default Answer :
                            {question?.questionarrie?.default_ans}
                          </p>
                        </div>
                      )
                    )}

                    <p className="leading-relaxed font-bold">
                      followupDate : {followUpDetails[0]?.followupDate}
                    </p>
                    <p className="leading-relaxed font-bold">
                      Worker FirstNamme :{" "}
                      {followUpDetails[0]?.worker?.firstname}
                    </p>
                    <p className="leading-relaxed font-bold">
                      Worker LastName : {followUpDetails[0]?.worker?.lastname}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}

            <h2 className="text-2xl my-15 font-medium text-gray-900 title-font mb-2">
                  Follow Up Details
                </h2>
            {followUpDetails.map((followUpDetail, index) => (
                  <div className="py-8 flex flex-wrap md:flex-nowrap border-4 border-black-200">
                  <div className="md:flex-grow">
                    
                  <div className="flex-wrap" key={index}>
                    <p className="leading-relaxed font-bold">
                      Follow Up No : {followUpDetail?.followUpNo}
                    </p>
                    <p className="leading-relaxed font-bold">
                      Doctor First Name : {followUpDetail?.doctor?.firstname}
                    </p>
                    <p className="leading-relaxed font-bold">
                      Doctor Last Name : {followUpDetail?.doctor?.lastname}
                    </p>

                    {followUpDetail?.questionarrieAnsList.map(
                      (question, index) => (
                        <div className="flex-wrap" key={index}>
                          <p className="leading-relaxed font-bold">
                            Questionaire Question {index} :
                            {question?.questionarrie?.question}
                          </p>
                          <p className="leading-relaxed font-bold">
                            Questionaire Answer {index}: {question?.question_ans}
                          </p>
                          <p className="leading-relaxed font-bold">
                            Questionaire Default Answer {index++} :
                            {question?.questionarrie?.default_ans}
                          </p>
                        </div>
                      )
                    )}

                    <p className="leading-relaxed font-bold">
                      followupDate : {followUpDetails[0]?.followupDate}
                    </p>
                    <p className="leading-relaxed font-bold">
                      Worker FirstNamme :{" "}
                      {followUpDetails[0]?.worker?.firstname}
                    </p>
                    <p className="leading-relaxed font-bold">
                      Worker LastName : {followUpDetails[0]?.worker?.lastname}
                    </p>
                  </div>
                  </div>
                </div>






                  
                ))}




            <h2 className="text-2xl my-20 font-medium text-gray-900 title-font mb-2">
              Medical Questionaire
            </h2>
            {medicalQuesAns.map((medical, index) => (
              <div key={index} className="py-8 flex flex-wrap md:flex-nowrap border-4 border-black-200" >
                <div className="md:flex-grow">
                  <p className="leading-relaxed">
                    Medical Questionaire Question :
                    {medical?.medicalquest?.question}
                  </p>
                  <p className="leading-relaxed">
                    Medical Questionaire Answer: {medical?.question_ans}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientDetails;
