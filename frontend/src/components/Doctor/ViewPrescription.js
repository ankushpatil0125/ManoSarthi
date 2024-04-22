import React from 'react'
import AddPrescription from './AddPrescription'

const ViewPrescription = ({prescriptionDTO,patient_id,type}) => {
  
  console.log("prescriptionDTO",prescriptionDTO)
  return (
    <div>
    <div className="flex justify-center items-center h-screen">
        <div className="bg-[#e0e0eb] rounded-lg shadow-lg p-8">
          {/* head line */}
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold mb-3">Prescription</h1>
          </div>
          <div className='flex flex-row justify-between'>
          <h1 className="text-lg  mb-3">
              Patient ID : {patient_id}
              {/* {patient_id} */}
            </h1>
            <h1 className="text-lg mb-3">
              Patient Name : {prescriptionDTO?.patient_fname} {prescriptionDTO?.patient_lname}
              {/* {patient_id} */}
            </h1>
            <h1 className="text-lg mb-3">
              Date : {prescriptionDTO?.date}
              {/* {patient_id} */}
            </h1>
          </div>

          <div className="max-h-96 overflow-y-auto">
            
            {/* Disease */}
            <label htmlFor="disease" className="block font-semibold">
              Disease:
            </label>
            <table className="table-auto border border-collapse border-gray-400">
                <thead className="bg-[#bfbfdf]">
                  <tr>
                    <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">
                      Sr. No
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Category
                    </th>
                    <th className="border border-gray-400 px-4 py-2">SubCategory</th>
                    <th className="border border-gray-400 px-4 py-2">Disease Name</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionDTO?.disease_code?.map((disease, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {disease?.diseaseSubCategory?.diseaseCategory?.name}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {disease?.longDescription || "N/A"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {disease?.diseaseSubCategory?.diseaseName || "N/A"}
                      </td>
        
                    </tr>
                  ))}
                </tbody>
              </table>
           

            {/* Medicine */}
            <div className="mt-4 mb-4">
              <label className="block mb-1 font-semibold">Medicine:</label>
              <div className="data">
              <table className="table-auto border border-collapse border-gray-400">
                <thead className="bg-[#bfbfdf]">
                  <tr>
                    <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">
                      Sr. No
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Medicine
                    </th>
                    <th className="border border-gray-400 px-4 py-2">Dosage</th>
                    <th className="border border-gray-400 px-4 py-2">Timing</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionDTO?.medicine?.map((med, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {med.name}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {med.dosage || "N/A"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {med.timing || "N/A"}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
            
          </div>
        </div>

    </div>
        {type==="update" && <AddPrescription patient_id={patient_id} type={"update"}/>}
    </div>
  )
}

export default ViewPrescription