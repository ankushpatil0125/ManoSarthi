import React, { useState } from 'react';

const AddPrescription = () => {
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', timing: '' }]);
  const [diseases, setDiseases] = useState(['']);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', timing: '' }]);
  };

  const handleAddDisease = () => {
    setDiseases([...diseases, '']);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handleDiseaseChange = (index, value) => {
    const updatedDiseases = [...diseases];
    updatedDiseases[index] = value;
    setDiseases(updatedDiseases);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Prescription Form</h1>
        <div className="max-h-96 overflow-y-auto">
        {diseases.map((disease, index) => (
          <div key={index} className="mb-2">
            <label className="block mb-1">Disease:</label>
            <select
              value={disease}
              onChange={(e) => handleDiseaseChange(index, e.target.value)}
              className="border rounded px-2 py-1 w-full mb-2"
            >
              <option value="">Select Disease</option>
              <option value="diseaseA">Disease A</option>
              <option value="diseaseB">Disease B</option>
              <option value="diseaseC">Disease C</option>
              {/* Add more options if needed */}
            </select>
          </div>
        ))}
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mb-4"
          onClick={handleAddDisease}
        >
          + Add Disease
        </button>

        {medicines.map((medicine, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1">Medicine {index + 1}:</label>
            <input
              type="text"
              placeholder="Name"
              className="border rounded px-2 py-1 w-full mb-2"
              value={medicine.name}
              onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
            />
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Dosage"
                className="border rounded px-2 py-1 w-1/2 mr-2"
                value={medicine.dosage}
                onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
              />
              <input
                type="text"
                placeholder="Timing"
                className="border rounded px-2 py-1 w-1/2"
                value={medicine.timing}
                onChange={(e) => handleMedicineChange(index, 'timing', e.target.value)}
              />
            </div>
            {index === medicines.length - 1 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                onClick={handleAddMedicine}
              >
                + Add Medicine
              </button>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default AddPrescription;
