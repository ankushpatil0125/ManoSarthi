
  import React, { useEffect, useState } from "react";
  import Header from "../Header/Header";
  import { Link } from "react-router-dom";
  import {
    PlusIcon,
    TrashIcon,
    PencilIcon,
    ChartBarIcon,
    EyeIcon,
  } from "@heroicons/react/outline";
  import NewPatientList from "../Doctor/NewPatientList";
  import UpdateDeleteActor from "../Actors/UpdateDeleteActor";
import { useTranslation } from "react-i18next";
import OngoingPatientList from "../Doctor/OngoingPatientList";
import ReferredDuringFollowUpList from "../Doctor/ReferredDuringFollowUpList";
import axios from "axios";
  const DoctorHomePage = () => {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [t] = useTranslation('global')
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  //   const [base64Image, setBase64Image] = useState('');

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     try {
  //       const response = await axios.get('http://192.168.213.253:9090/worker/view-image');
  //       const { data } = response;
  //       console.log("response",response);
  //       setBase64Image(data); // Assuming the response contains the base64 image as a string
  //     } catch (error) {
  //       console.error('Error fetching image:', error);
  //     }
  //   };

  //   fetchImage();
  // }, []);
    const renderPage = () => {
      switch (currentPage) {
        case "dashboard":
          return (
    //         <div>
    //   {base64Image && (
    //     <img
    //       src={`data:image/png;base64,${base64Image}`} // Assuming the image format is PNG
    //       alt="Fetched Image"
    //       style={{ width: '100%', maxWidth: '500px', maxHeight: '500px' }}
    //     />
    //   )}
    // </div>
            <div className="p-4 bg-blue-100 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          );
        case "new-patient":
          return <NewPatientList/>;
          case "ongoing-patient":
          return <OngoingPatientList/>;
          case "referred-during-followup":
          return <ReferredDuringFollowUpList/>;
          case "treated-patient":
          return <></>;
        default:
          return null;
      }
    };
    return (
      <div className="font-[sans-serif]">
        <Header />
        <div className="">
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
                  clipRule="evenodd"
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
                    <Link
                      onClick={() => setCurrentPage("dashboard")}
                      to="#"
                      className={`flex items-center p-2 rounded-lg group no-underline ${
                        currentPage === "dashboard"
                          ? "text-white bg-[#6467c0]"
                          : "text-gray-900 "
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                        <ChartBarIcon className="text-black" />
                      </span>
                      <span className="ms-3">{t("doctor.Dashboard")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setCurrentPage("new-patient")}
                      to="#"
                      className={`flex items-center p-2 rounded-lg group no-underline ${
                        currentPage === "new-patient"
                          ? "text-white bg-[#6467c0]"
                          : "text-gray-900"
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                        <EyeIcon className="text-black" />
                        
                      </span>
                      <span className="flex-1 ms-3 whitespace-nowrap">{t('doctor.New Patient')}</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      onClick={() => setCurrentPage("ongoing-patient")}
                      to="#"
                      className={`flex items-center p-2 rounded-lg group no-underline ${
                        currentPage === "ongoing-patient"
                          ? "text-white bg-[#6467c0]"
                          : "text-gray-900"
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                        <EyeIcon className="text-black" />
                        
                      </span>
                      <span className="flex-1 ms-3 whitespace-nowrap">{t('doctor.Ongoing Patient')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setCurrentPage("referred-during-followup")}
                      to="#"
                      className={`flex items-center p-2 rounded-lg group no-underline ${
                        currentPage === "referred-during-followup"
                          ? "text-white bg-[#6467c0]"
                          : "text-gray-900"
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                        <EyeIcon className="text-black" />
                        
                      </span>
                      <span className="flex-1 ms-3 whitespace-nowrap">{t('doctor.Referred During FollowUp')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setCurrentPage("treated-patient")}
                      to="#"
                      className={`flex items-center p-2 rounded-lg group no-underline ${
                        currentPage === "treated-patient"
                          ? "text-white bg-[#6467c0]"
                          : "text-gray-900"
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                        <EyeIcon className="text-black" />
                        
                      </span>
                      <span className="flex-1 ms-3 whitespace-nowrap">{t("doctor.Treated Patient")}</span>
                    </Link>
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
  
  export default DoctorHomePage;
  
