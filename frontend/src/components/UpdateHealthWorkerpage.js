import React, { useEffect, useState } from 'react'
import SupervisorService from '../Services/SupervisorService';

const UpdateHealthWorkerpage = () => {
  const [village,setVillage ] = useState("");
  const [villageOptions,setVillageOptions] = useState([]);
  useEffect(() => {
    // Fetch district options
    SupervisorService.getVillage()
      .then((response) => {
        setVillageOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching villages options:", error);
      });
  }, []);
  const handleSubmit=() => {
    // SupervisorService.updateHealthWorker(userId,villagecode)
    //   .then((response) => {
    //     setVillageOptions(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching villages options:", error);
    //   });
  }
  
  return (
    <div>
      <select
              id="village"
              value={village}
              // onChange={handleVillageChange}
            >
              <option value="">Select</option>
              {villageOptions.map((village, index) => (
                <option key={index} value={village.code}>
                  {village.name}
                </option>
              ))}
        </select>
        <button className="border border-black-500" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default UpdateHealthWorkerpage