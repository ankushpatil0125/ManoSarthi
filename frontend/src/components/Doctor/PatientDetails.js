import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import AddActorComponent from "../Actors/AddActorComponent";
import UpdateDeleteActor from "../Actors/UpdateDeleteActor";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL, getToken } from "../../utils/Constants";
import LoadingComponent from "../Loading/LoadingComponent";
import { Nav, Navbar } from "react-bootstrap";
import profile from "../../utils/profile.svg";
import AddPrescription from "./AddPrescription";
const PatientDetails = () => {
  const [currentPage, setCurrentPage] = useState("Medical-History");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [t] = useTranslation("global");
  const [firstname, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [lastname, setLastname] = useState("");
  const [village, setVillage] = useState("");
  const [followUpDetails, setFollowUpDetails] = useState([]);
  const [medicalQuesAns, setMedicalQuesAns] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { patientId } = location.state;

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
        console.log("Patient: ", response?.data);
        setFirstname(response?.data?.firstname);
        setLastname(response?.data?.lastname);
        setGender(response?.data?.gender);
        setVillage(response?.data?.village?.name);
        setFollowUpDetails(response?.data?.followUpDetailsList);
        setMedicalQuesAns(response?.data?.medicalQueAnsList);
        setLoading(false);
      } catch (error) {
        alert(error?.response?.data?.message);
        setLoading(false);
      }
    };
    handlePatientDetails();
  }, [patientId]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const renderPage = () => {
    switch (currentPage) {
      case "Medical-History":
        if (loading) return <LoadingComponent />;
        return (
          <div>
            <div className="flex justify-between">

              {/* Profile */}
              <Profile
                firstname={firstname}
                lastname={lastname}
                village={village}
              />
              {/* Follow up details  */}
              <FollowUp followUpDetails={followUpDetails} />
            </div>

            {/* follow upd details */}
            <div className="flex flex-row min-h-screen mt-20">
              <section className="flex-grow ">
                <div className="mx-auto">
                  <div className="bg-[#bfbfdf] rounded-lg shadow-lg p-6 ">
                    <div className="flex justify-center items-center ">
                    <h2 className="text-gray-900 mb-4 font-semibold text-2xl">
                      Medical History
                    </h2>
                    </div>
                    <div className="bg-[#bfbfdf] rounded-lg p-4 my-2">
                      {medicalQuesAns.map((medical, index) => (
                        <p key={index} className="">
                          {index + 1}. {medical?.medicalquest?.question} -{" "}
                          {medical?.question_ans}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
     
      case "Survey-Questionnaire":
        if (loading) return <LoadingComponent />;
        return (
          <div>
            <div className="flex justify-between">
              {/* Profile */}

              <Profile
                firstname={firstname}
                lastname={lastname}
                village={village}
              />

              {/* Follow up details  */}
              <FollowUp followUpDetails={followUpDetails} />
            </div>
            <div className="flex flex-row min-h-screen mt-20">
              <section className="flex-grow ">
                <div className="mx-auto">
                  <div className="bg-[#bfbfdf] rounded-lg shadow-lg p-6">
                    <div className="items-center justify-center flex ">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Survey Questionnaire Responses
                    </h2>
                    </div>
                    {followUpDetails.map((followup, follow_index) => (
                      <div key={follow_index}>
                        {follow_index === 0 ? (
                          <p className="font-semibold">Survey Details</p>
                        ) : (
                          <p className="font-semibold">
                            Follow Up: {follow_index}
                          </p>
                        )}
                        {console.log("followup: ", followup)}
                        <div className="bg-[#bfbfdf]rounded-lg p-4 my-2">
                          {followup.questionarrieAnsList.map(
                            (quest, quest_index) => (
                              <p className="" key={quest_index}>
                                {quest_index + 1}.{" "}
                                {quest?.questionarrie?.question}? -{" "}
                                {quest?.question_ans}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
      case "AddPrescriptions":
        if (loading) return <LoadingComponent />;
        return <AddPrescription />;
      default:
        return null;
    }
  };
  return (
    <div className="font-[sans-serif]">
      <Header />
      <div className="mt-15">
        {isSidebarOpen ? (
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        ) : (
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        )}

        {isSidebarOpen && (
          <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-[#f5f5f9] dark:bg-gray-800 mt-[73px]">
              <ul className="space-y-2 font-medium ">
                <li>
                  <button
                    onClick={() => setCurrentPage("Medical-History")}
                    className={`flex items-center p-2 rounded-lg group no-underline ${
                      currentPage === "Medical-History"
                        ? "text-white bg-[#6467c0]"
                        : "text-gray-900 "
                    }`}
                  >
                    <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                      <ChartBarIcon className="text-black" />
                    </span>
                    <span className="ms-3">{t("Medical History")}</span>
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={() => setCurrentPage("Follow-Up-Details")}
                    className={`flex items-center p-2 rounded-lg group no-underline ${
                      currentPage === "Follow-Up-Details"
                        ? "text-white bg-[#6467c0]"
                        : "text-gray-900"
                    }`}
                  >
                    <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                      <PlusIcon className="text-black" />
                    </span>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {t("Follow Up Details")}
                    </span>
                  </button>
                </li> */}
                <li>
                  <button
                    onClick={() => setCurrentPage("Survey-Questionnaire")}
                    className={`flex items-center p-2 rounded-lg group no-underline ${
                      currentPage === "Survey-Questionnaire"
                        ? "text-white bg-[#6467c0]"
                        : "text-gray-900 "
                    }`}
                  >
                    <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                      <PencilIcon className="text-black" />
                    </span>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {t("Survey Questionnaire")}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("AddPrescriptions")}
                    className={`flex items-center p-2 rounded-lg group no-underline ${
                      currentPage === "AddPrescriptions"
                        ? "text-white bg-[#6467c0]"
                        : "text-gray-900 "
                    }`}
                  >
                    <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                      <PencilIcon className="text-black" />
                    </span>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {t("Add Prescriptions")}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        )}

        <div className={`p-4 ${isSidebarOpen ? "sm:ml-64" : ""}`}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

const Profile = ({ firstname, lastname, village }) => {
  return (
    <div className=" container mx-2 rounded-lg shadow-lg p-6 flex-1 bg-[#bfbfdf] ">
      <div class="max-w-md p-8 sm:flex sm:space-x-6 dark:bg-gray-50 dark:text-gray-800">
        <div class="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0 ">
          <img
            src={profile}
            alt=""
            class="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div class="space-y-4 ">
          <div className="flex flex-col">
            <h2 class="text-2xl font-semibold">
              {firstname} {lastname}
            </h2>
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <span class="text-sm dark:text-gray-600">{village}</span>
            </div>
          </div>
          {/* <div class="space-y-1">
                  <span class="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      aria-label="Email address"
                      class="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                      ></path>
                    </svg>
                    <span class="dark:text-gray-600">
                      // leroy.jenkins@company.com 
                    </span>
                  </span>
                  <span class="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      aria-label="Phonenumber"
                      class="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                      ></path>
                    </svg>
                    <span class="dark:text-gray-600">
                      //+25 381 77 983 
                      </span>
                  </span>
                </div>  */}
        </div>
      </div>
    </div>
  );
};
const FollowUp = ({ followUpDetails }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    console.log("date:", date);
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with leading zero if needed
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if needed
    return `${day}/${month}/${year}`;
  };
  return (
    <div className=" container mx-auto rounded-lg shadow-lg p-6 flex-1 bg-[#bfbfdf]">
      <div className="flex flex-col gap-1 items-center justify-center">
        <h4 className="text-2xl font-semibold ">Follow Up Details</h4>
        <h4 className="text-1xl font-semibold">Survey Registration</h4>
      </div>
      {followUpDetails.map((followup, follow_index) => (
  <div className="bg-[#bfbfdf] rounded-lg p-4 my-3 flex flex-col items-center" key={follow_index}>
    
    {follow_index === 0 ? (
      <>{/* <p className="font-semibold">Survey Registration</p> */}</>
    ) : (
      <>
        <p className="font-semibold">Follow Up No: {follow_index}</p>
      </>
    )}
    <p className="font-semibold">
      FollowUp Date: {formatDate(followup?.followupDate)}
    </p>
    <p className="font-semibold">
      Assigned Health Worker: {followup?.worker?.firstname}{" "}
      {followup?.worker?.lastname}
    </p>
  </div>
))}
    </div>
  );
};




// case of followUpDetails

 // case "Follow-Up-Details":
      //   if (loading) return <LoadingComponent />;
      //   return (
      //     // <></>
      // <div className="flex flex-col min-h-screen mt-20 justify-center items-center">
      //   <div class="max-w-md p-8 sm:flex sm:space-x-6 dark:bg-gray-50 dark:text-gray-800">
      //     <div class="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0 ">
      //       <img
      //         src={profile}
      //         alt=""
      //         class="object-cover object-center w-full h-full rounded dark:bg-gray-500"
      //       />
      //     </div>
      //     <div class="space-y-4 ">
      //       <div className="flex flex-col">
      //         <h2 class="text-2xl font-semibold">
      //           {firstname} {lastname}
      //         </h2>
      //         <div className="flex flex-row">
      //         <svg
      //           xmlns="http://www.w3.org/2000/svg"
      //           fill="none"
      //           viewBox="0 0 24 24"
      //           strokeWidth={1.5}
      //           stroke="currentColor"
      //           className="w-6 h-6"
      //         >
      //           <path
      //             strokeLinecap="round"
      //             strokeLinejoin="round"
      //             d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      //           />
      //         </svg>

      //         <span class="text-sm dark:text-gray-600">{village}</span>
      //           </div>
      //       </div>
      //       {/* <div class="space-y-1">
      //         <span class="flex items-center space-x-2">
      //           <svg
      //             xmlns="http://www.w3.org/2000/svg"
      //             viewBox="0 0 512 512"
      //             aria-label="Email address"
      //             class="w-4 h-4"
      //           >
      //             <path
      //               fill="currentColor"
      //               d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
      //             ></path>
      //           </svg>
      //           <span class="dark:text-gray-600">
      //             // leroy.jenkins@company.com
      //           </span>
      //         </span>
      //         <span class="flex items-center space-x-2">
      //           <svg
      //             xmlns="http://www.w3.org/2000/svg"
      //             viewBox="0 0 512 512"
      //             aria-label="Phonenumber"
      //             class="w-4 h-4"
      //           >
      //             <path
      //               fill="currentColor"
      //               d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
      //             ></path>
      //           </svg>
      //           <span class="dark:text-gray-600">
      //             //+25 381 77 983
      //             </span>
      //         </span>
      //       </div>  */}
      //     </div>
      //   </div>
      //   <section className="flex-grow py-8">
      //     <div className="container mx-auto">
      //       <div className="bg-white rounded-lg shadow-lg p-6">
      //         <h2 className="text-2xl font-medium text-gray-900 mb-4">
      //           Follow Up Details
      //         </h2>
      //         {followUpDetails.map((followup, follow_index) => (
      //           <div
      //             className="bg-blue-50 rounded-lg p-4 my-2"
      //             key={follow_index}
      //           >
      //             {follow_index === 0 ? (
      //               <>
      //                 <p className="font-semibold">Survey Registration</p>
      //               </>
      //             ) : (
      //               <>
      //                 <p className="font-semibold">
      //                   Follow Up No: {follow_index}
      //                 </p>
      //               </>
      //             )}
      //             <p className="font-semibold">
      //               FollowUp Date: {formatDate(followup?.followupDate)}
      //             </p>
      //             <p className="font-semibold">
      //               Assigned Health Worker: {followup?.worker?.firstname}{" "}
      //               {followup?.worker?.lastname}
      //             </p>
      //           </div>
      //         ))}
      //       </div>
      //     </div>
      //   </section>
      // </div>
      //   );