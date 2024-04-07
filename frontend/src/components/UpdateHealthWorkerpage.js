import React, { useEffect, useState } from 'react'
import SupervisorService from '../Services/SupervisorService';
import LoadingComponent from './Loading/LoadingComponent';

const UpdateHealthWorkerpage = () => {
  const [village,setVillage ] = useState("");
  const [villageOptions,setVillageOptions] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading (true);
    // Fetch district options
    SupervisorService.getVillageWithNoWorker()
      .then((response) => {
        setVillageOptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
        setLoading(false);

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
  if(loading) return <LoadingComponent/>
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