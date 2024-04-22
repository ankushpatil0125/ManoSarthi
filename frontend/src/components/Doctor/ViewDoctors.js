// import React, { useEffect, useState, useCallback } from "react";
// import AdminService from "../../Services/AdminService";
// import { useTranslation } from "react-i18next";
// import LoadingComponent from "../Loading/LoadingComponent";

// const ViewDoctors = ({ district, subdistrictcode, action }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [data, setData] = useState([]);
//   const { t } = useTranslation("global");
//   const [loading, setLoading] = useState(false);
//   const [fetchingData, setFetchingData] = useState(false); // New state for data fetching

//   const fetchData = useCallback(async () => {
//     try {
//       setFetchingData(true);
//       setLoading(true);

//       let response;
//       if (!district && !subdistrictcode) {
//         response = await AdminService.getAllDoctors(currentPage);
//       } else if (district) {
//         response = await AdminService.getAllDistrictDoctors(
//           district,
//           currentPage
//         );
//       } else if (subdistrictcode) {
//         response = await AdminService.getAllSubDistrictDoctors(subdistrictcode);
//       }

//       setData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       alert(error);
//       setLoading(false);
//     } finally {
//       setFetchingData(false);
//     }
//   }, [currentPage, district, subdistrictcode]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handlePrevPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   if (loading || fetchingData) return <LoadingComponent />; // Show loading indicator while fetching data

//   return (
//     <div>
//       <div className="data">
//         <table className="table-auto border border-collapse border-gray-400">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border border-gray-400 px-4 py-2">
//                 {t("UpdateDeleteActor.Doctor Name")}
//               </th>
//               <th className="border border-gray-400 px-4 py-2">
//                 {t("UpdateDeleteActor.District")}
//               </th>
//               <th className="border border-gray-400 px-4 py-2">
//                 {t("UpdateDeleteActor.Subdistrict")}
//               </th>
//               <th className="border border-gray-400 px-4 py-2">
//                 {t("UpdateDeleteActor.Action")}
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((doctor) => (
//               <tr key={doctor.id}>
//                 <td className="border border-gray-400 px-4 py-2">
//                   {doctor.firstname}
//                 </td>
//                 <td className="border border-gray-400 px-4 py-2">
//                   {doctor.subdistrictcode?.district?.name || "N/A"}
//                 </td>
//                 <td className="border border-gray-400 px-4 py-2">
//                   {doctor.subdistrictcode?.name || "N/A"}
//                 </td>
//                 <td className="border border-gray-400 px-4 py-2">
//                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     {action}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex gap-2 justify-center">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handlePrevPage}
//           disabled={currentPage === 0}
//         >
//           {t("UpdateDeleteActor.Previous")}
//         </button>

//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleNextPage}
//           disabled={data.length < 5} // Disable next button when data length is less than 5
//         >
//           {t("UpdateDeleteActor.Next")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewDoctors;

import React, { useEffect, useState, useCallback } from "react";
import AdminService from "../../Services/AdminService";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../Loading/LoadingComponent";

const ViewDoctors = ({ district, subdistrictcode, action }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const { t } = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false); // New state for data fetching

  const fetchData = useCallback(async () => {
    try {
      setFetchingData(true);
      setLoading(true);

      let response;
      if (!district && !subdistrictcode) {
        response = await AdminService.getAllDoctors(currentPage);
      } else if (district) {
        response = await AdminService.getAllDistrictDoctors(
          district,
          currentPage
        );
      } else if (subdistrictcode) {
        response = await AdminService.getAllSubDistrictDoctors(subdistrictcode);
      }

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    } finally {
      setFetchingData(false);
    }
  }, [currentPage, district, subdistrictcode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    console.log("currentpage", currentPage)
    setCurrentPage((prevPage) => prevPage + 1);
};

  if (loading || fetchingData) return <LoadingComponent />; // Show loading indicator while fetching data

  return (
    <div>
      <div className="data">
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.Doctor Name")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.District")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.Subdistrict")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.Email")}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {t("UpdateDeleteActor.Action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((doctor, index) => (
              <tr key={index}>
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
                  {doctor.email || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button className="bg-[#6467c0] hover:bg-[#9fa1d5] text-white font-bold py-2 px-4 rounded">
                    {action}
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
          {t("UpdateDeleteActor.Previous")}
        </button>

        <button
          className="bg-[#6467c0] hover:bg-[#9fa1d5] text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={data.length < 5} // Disable next button when data length is less than 5
        >
          {t("UpdateDeleteActor.Next")}
        </button>
      </div>
    </div>
  );
};

export default ViewDoctors;
