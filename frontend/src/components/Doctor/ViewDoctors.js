// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { BASE_URL, getToken } from "../../utils/Constants";

// const ViewDoctors = ({ allDoctor }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const noOfPages = Math.ceil(allDoctor.length / 5);

//   useEffect(() => {
//     fetchData();
//     console.log("data",data)
//   }, [currentPage]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}viewdoctor/${currentPage}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//       });

//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching doctor details:", error.message);
//     }
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, noOfPages));
//   };

//   return (
//     <div>
//       <div className="data">
//         <table className="table-auto border border-collapse border-gray-400">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border border-gray-400 px-4 py-2">Doctor Name</th>
//               <th className="border border-gray-400 px-4 py-2">District</th>
//               <th className="border border-gray-400 px-4 py-2">Subdistrict</th>
//               <th className="border border-gray-400 px-4 py-2">Action</th>
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
//                     Update
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
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleNextPage}
//           disabled={currentPage === noOfPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewDoctors;
