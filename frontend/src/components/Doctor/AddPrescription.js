import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Select from 'react-select';
import LoadingComponent from "../Loading/LoadingComponent";
import DoctorService from "../../Services/DoctorService"
import { timers } from 'jquery';
import { FaTimes } from 'react-icons/fa'; 
import { useParams } from 'react-router-dom';

const AddPrescription = () => {
  const [medicines, setMedicines] = useState([]);
  const [medicineFields, setMedicineFields] = useState({ name: '', dosage: '', timing: '' });
  const [diseases, setDiseases] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [followUp, setFollowUp] = useState('WEEKLY');
  const [followUpsCount, setFollowUpsCount] = useState(0);

  let { patient_id } = useParams();
  

  useEffect(() => {
    //Fetch district options
    DoctorService.getCategories()
      .then((response) => {
        setCategoryOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching district options:", error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Fetch category options
    setLoading(true);
    DoctorService.getSubCategories(selectedCategory)
      .then((response) => {
        setSubCategoryOptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.message);        
        setLoading(false);
      });
  };

  const handleDiseases = (selectedOptions) => {
    setDiseases(selectedOptions);
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setSubCategory(selectedSubCategory);

     // Fetch subcategory options based on selected category
     setLoading(true);
     DoctorService.getDiseases(selectedSubCategory)
       .then((response) => {
         setDiseaseOptions(response.data);
         setLoading(false);
       })
       .catch((error) => {
         alert(error.response.data.message);        
         setLoading(false);
       });
  }

  const handleFollowupChange = (e) => {
    const selectedOption = e.target.value;
    setFollowUp(selectedOption);
  }

  const handleAddMedicineFields = () => {
    if(medicineFields.name !== "" && medicineFields.dosage !== "" && medicineFields.timing !== ""){
      if(diseases.length > 0){
        setMedicines([...medicines, medicineFields]);
        setMedicineFields({ name: '', dosage: '', timing: '' });
      }
      else{
        alert("Please add the disease before adding medicine");
      }
    }
    else{
      alert("Please fill all the fields to add medicine");
    }
  };

  const handleMedicineChange = (field, value) => {
    setMedicineFields(prevState => ({
      ...prevState,
      [field]: value
    }));
  };


  const handleDelete = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1); // Remove the medicine at the specified index
    setMedicines(updatedMedicines); // Update the medicines state
  };

  const handleSubmit = () => {
    // if(medicineFields.name !== "" && medicineFields.dosage !== "" && medicineFields.timing !== ""){
    //   medicines.push(medicineFields);
    // }
    if(medicines.length === 0){
      alert("Please Add Medicines!")
    }
    else if (followUpsCount <= 0){
      alert("Please Add FollowUp details!")
    }
    else{
        const diseasesCodes = diseases.map(disease => disease.value);
        console.log('Form Submitted:', {patient_id, medicines, diseasesCodes, diseases, followUp, followUpsCount});
          const prescription_data = {
            "patient" : {
              "patient_id" : patient_id
            },
            "followupDetails" : {
              // "follow_up_id" : follow_up_id,
              "followup_type" : followUp,
              "followups_count" : followUpsCount
            },
            "Disease" : {
              "disease_code" : diseasesCodes
            },
            "Medicines":{
              "medicines" : medicines
            }
          }
       alert("Prescription Submitted Successfully!")
      } 
  };

  if(loading) return <LoadingComponent/>
  return (
        <div>
          <Header />
          <div className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className='flex justify-between'>
              <h1 className="text-2xl font-bold mb-3">Prescription Form</h1>
              <h1 className="text-lg font-semibold mb-3">Patient ID: {patient_id}</h1>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <label htmlFor="category" className="block font-semibold">
                  Category:
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select</option>
                  {categoryOptions.map((category, index) => (
                    <option key={index} value={category.code}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="subcategory" className="block font-semibold">
                  Sub-Category:
                </label>
                <select
                  id="subcategory"
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select</option>
                  {subCategoryOptions.map((subcategory, index) => (
                    <option key={index} value={subcategory.code}>
                      {subcategory.diseaseName}
                    </option>
                  ))}
                </select>

                <label htmlFor="disease" className="block font-semibold">
                  Disease:
                </label>
                <Select
                  isMulti
                  placeholder={"Select"}
                  value={diseases}
                  onChange={handleDiseases}
                  options={diseaseOptions.map(option => ({ value: option.code, label: option.longDescription }))}
                />
                <div className="mt-4 mb-4">
                  <label className="block mb-1 font-semibold">Medicine:</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="border rounded px-2 py-1 w-full mb-2"
                    value={medicineFields.name}
                    onChange={(e) => handleMedicineChange('name', e.target.value)}
                  />
                  <div className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Dosage"
                      className="border rounded px-2 py-1 w-1/2 mr-2"
                      value={medicineFields.dosage}
                      onChange={(e) => handleMedicineChange('dosage', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Timing"
                      className="border rounded px-2 py-1 w-1/2"
                      value={medicineFields.timing}
                      onChange={(e) => handleMedicineChange('timing', e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                  onClick={handleAddMedicineFields}
                >
                  Add Medicine
                </button>

                <div className="data">
                  <table className="table-auto border border-collapse border-gray-400">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border border-gray-400 px-4 py-2">Sr. No</th>
                        <th className="border border-gray-400 px-4 py-2">Medicine</th>
                        <th className="border border-gray-400 px-4 py-2">Dosage</th>
                        <th className="border border-gray-400 px-4 py-2">Timing</th>
                        <th className="border border-gray-400 px-4 py-2">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicines.map((med, index) => (
                        <tr key={index}>
                          <td className="border border-gray-400 px-4 py-2">
                            {index+1}
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
                          <td className="border border-gray-400 px-4 py-2">
                              {/* Using the trash icon for deletion */}
                              <button onClick={() => handleDelete(index)} className="flex items-center text-red-500">
                                  <FaTimes className="mr-2" /> {/* Using the trash icon */}
                              </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <label htmlFor="followup" className="block font-semibold">
                      Follow Ups:
                  </label>
                  <div className='flex'>
                    <select
                      id="followup"
                      value={followUp}
                      onChange={handleFollowupChange}
                      className="block w-40 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    >
                      <option value="WEEKLY">Weekly</option>
                      <option value="BI_WEEKLY">Bi-Weekly</option>
                      <option value="MONTHLY">Monthly</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Follow Ups Count"
                        className="border ml-3 mt-1 p-2 rounded-md px-2 py-1 w-22"
                        value={followUpsCount}
                        onChange={(e) => setFollowUpsCount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
  );
};

export default AddPrescription;
