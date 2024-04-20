import React, { useEffect, useState } from "react";
import DoctorService from "../../Services/DoctorService";
import LoadingComponent from "../Loading/LoadingComponent";

const FollowUpQueResponse = ({ followUpDetails,setFollowUpDetails,patient_id}) => {
//   const [data,setData] =useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
//   setData(followUpDetails);
  const fetchNextFollowUp = async () =>{
    setLoading(true);
    try{
        const response = await DoctorService.getNextFollowUp(currentPage,patient_id);
        console.log("Follow up que ans response",response);
        if(response){
            setFollowUpDetails(response.data);
        }
        setLoading(false);
    }
    catch(error){
      alert(error?.response?.data?.message);
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchNextFollowUp();
  },[currentPage]);

  const handlePrevPage = () => {
    console.log("currentpage", currentPage)
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
};
if(loading) return <LoadingComponent/>
  return (
    <div className="flex flex-row min-h-screen mt-20">
  <section className="flex-grow mx-auto">
    <div className="bg-[#e0e0eb] rounded-lg shadow-lg p-6">
      <div className="items-center justify-center flex">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Survey Questionnaire Responses
        </h2>
      </div>
      {followUpDetails.map((followup, follow_index) => (
        <div key={follow_index}>
          <div className="flex justify-center items-center font-semibold">
            <p>Follow Up Number : {followup?.followUpNo}</p>
          </div>
          <div className="bg-[#bfbfdf]rounded-lg p-4 my-2">
            {followup.questionarrieAnsList.map((quest, quest_index) => (
              <p className="" key={quest_index}>
                {quest_index + 1}. {quest?.questionarrie?.question}? -{" "}
                {quest?.question_ans}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="flex flex-row justify-center mt-4">
      <button
        className="bg-[#6467c0] hover:bg-[#9fa1d5] text-white font-bold py-2 px-4 rounded mr-2"
        onClick={handlePrevPage}
        disabled={currentPage === 0}
      >
        Previous
      </button>

      <button
        className="bg-[#6467c0] hover:bg-[#9fa1d5] text-white font-bold py-2 px-4 rounded"
        onClick={handleNextPage}
        disabled={followUpDetails.length < 1} // Disable next button when data length is less than 5
      >
        Next
      </button>
    </div>
  </section>
</div>
  );
};

export default FollowUpQueResponse;
