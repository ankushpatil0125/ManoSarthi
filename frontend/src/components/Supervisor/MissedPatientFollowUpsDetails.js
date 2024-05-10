import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header/Header';

const MissedPatientDetails = () => {
    const location = useLocation();
    // const [missedPatientsDetailsPerVillage,setmissedPatientsDetailsPerVillage] = useState([]);
    const { data } = location.state || {}; // Adding null check
    console.log("data",data);
    // setmissedPatientsDetailsPerVillage(data?.missedFollowupsSupDTOList);
  return (
    <div>
        <Header/>
        <div className="mt-10 p-5">
        <div
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <table className="table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">
                FollowUp Date
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Patient FirstName
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Patient LastName
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Worker Name
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Worker Email
              </th>
            </tr>
          </thead>
          <tbody>
            {data[0]?.missedFollowupsSupDTOList?.map((patient,index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {patient?.followup_date}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {patient?.patient_fname || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {patient?.patient_lname || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {patient?.workerName || "N/A"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {patient?.workerEmail || "N/A"}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default MissedPatientDetails