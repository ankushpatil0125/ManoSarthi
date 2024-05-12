import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Select from "react-select";
import LoadingComponent from "../Loading/LoadingComponent";
// import { timers } from 'jquery';
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import AdminService from "../../Services/AdminService";

const AddQuestionarrie = ({ patient_id, type }) => {
    const [questions, setQuestions] = useState([]);
    const [questionarrieType, setQuestionarrieType] = useState('survey')
    const [ageRange, setAgeRange] = useState('');
    const [questionarrieFields, setQuestionarrieFields] = useState({
      question: "",
      default_ans: "",
      minage:0,
      maxage:0,
      type: "",
    });
    const [loading, setLoading] = useState(false);
    const handleQuestionChange = (field, value) => {
        if(field === 'age'){
            setAgeRange(value); // Update ageRange state
            if (value === 'Below20') {
                setQuestionarrieFields(prevState => ({
                  ...prevState,
                  minage: 1,
                  maxage: 20,
                }));
              } else if (value === "20-40") {
                setQuestionarrieFields(prevState => ({
                  ...prevState,
                  minage: 20,
                  maxage: 40,
                }));
              } else if (value === "40-60") {
                setQuestionarrieFields(prevState => ({
                  ...prevState,
                  minage: 40,
                  maxage: 60,
                }));
              } else {
                setQuestionarrieFields(prevState => ({
                  ...prevState,
                  minage: 60,
                  maxage: 100,
                }));
              }
        }else{
        setQuestionarrieFields((prevState) => ({
            ...prevState,
            [field]: value,
        }));
      }
    };

    const handleDelete = (index) => {
        const updatedQuestion = [...questions];
        updatedQuestion.splice(index, 1); // Remove at the specified index
        setQuestions(updatedQuestion); // Update the state
    }

    const handleAddquestionarrieFields = () => {
    if ((questionarrieType === "medical" &&
        questionarrieFields.question !== "") || (
        questionarrieType === "survey" &&
        questionarrieFields.default_ans !== "" &&
        questionarrieFields.minage !== 0 &&
        questionarrieFields.maxage !== 0 &&
        questionarrieFields.type !== "" )
    ){
        setQuestions([...questions, questionarrieFields]);
        setQuestionarrieFields({ question: "", default_ans: "", minage: 0, maxage:0, type: "" });
    } else {
        alert("Please fill all the fields to add Question");
    }
    };
    const handleSubmit = async () => {
        console.log("Added Questions- ", questions)
        if(questionarrieType === 'survey'){
          try {
            const response = await AdminService.addQuestionarrie(questions);
            console.log("res", response);
            if (response) {
              alert("Survey Questionarrie added successfully");
              setQuestions([]); // Update the medicines state
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setLoading(false);
          }
        }else{
          const medicalQues = [];
          questions.map((obj) => medicalQues.push({"question": obj.question}))
          console.log("MedicalQues", medicalQues)
          try {
            const response = await AdminService.addMedicalQuestionarrie(medicalQues);
            console.log("res", response);
            if (response) {
              alert("Medical Questionarrie added successfully");
              setQuestions([]); // Update the  state
              setLoading(false); 
            }
          } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setLoading(false);
          }
        }
    }
    if (loading) return <LoadingComponent />;
    return (
    <div>
      <Header/>
        <div className="flex justify-center items-center h-screen">
            <div className="bg-[#fdfdff] rounded-lg shadow-lg p-8 w-full max-w-100">
                <div className="flex flex justify-items-start">
                    <label htmlFor="type" className="block font-semibold pr-2">
                    <h1 className="text-2xl font-bold mb-3 pt-2">Select Questionarrie Form Type</h1>                   
                    </label>
                    <select
                        id="type"
                        value={questionarrieType}
                        onChange={(e) => setQuestionarrieType(e.target.value)}
                        className="bg-[#e0e0eb] block w-1/6 h-10 mt-1 p-2 border border-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        >
                        <option value="survey">Survey</option>
                        <option value="medical">Medical</option>
                    </select>
                </div>
                {(questionarrieType===("survey"))?
                <div className="mt-4 mb-4">
                <div className="max-h-96 overflow-y-auto">
                  <label htmlFor="type" className="block font-semibold">
                    Survey Type:
                  </label>
                <select
                    id="type"
                    value={questionarrieFields.type}
                    onChange={(e) => handleQuestionChange("type", e.target.value)}
                    className="bg-[#e0e0eb] block w-1/6 mt-1 p-2 border border-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    >
                    <option value="">Select</option>
                    <option value="normal">Normal</option>
                    <option value="followup">Followup</option>
                </select>
              <label className="block mb-1 font-semibold">Question:</label>
              <input
                type="text"
                placeholder="Question"
                className="h-14 bg-[#e0e0eb] border border-black rounded px-2 py-1 w-full mb-2 placeholder-[#646465]"
                value={questionarrieFields.question}
                onChange={(e) => handleQuestionChange("question", e.target.value)}
              />
              <label htmlFor="default_ans" className="block font-semibold">
                    Answer:
                    </label>
              <div className="flex mb-2">
                    <select
                        id="default_ans"
                        value={questionarrieFields.default_ans}
                        onChange={(e) => handleQuestionChange("default_ans", e.target.value)}
                        className="bg-[#e0e0eb] block w-1/6 mt-1 p-2 border border-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <label htmlFor="age" className="block font-semibold">
                    Age:
                    </label>
                <div className="flex mb-2">
                    <select
                        id="age"
                        value={ageRange}
                        onChange={(e) => handleQuestionChange("age", e.target.value)}
                        className="bg-[#e0e0eb] block w-1/6 mt-1 p-2 border border-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        >
                        <option value="">Select</option>
                        <option value="Below20">Below 20</option>
                        <option value="20-40">20-40</option>
                        <option value="40-60">40-60</option>
                        <option value="Above60">Above 60</option>
                    </select>
                </div>
                </div>
                <div className="flex items-center justify-center">
              <button
                className="bg-[#6467c0] hover:bg-[#bfbfdf] text-white font-bold py-1 px-4 rounded"
                onClick={handleAddquestionarrieFields}
              >
                Add Question
              </button>
            </div>

            <div className="data">
              <table className="table-auto border border-collapse border-gray-400">
                <thead className="bg-[#bfbfdf]">
                  <tr>
                    <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">
                      Sr. No
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Question
                    </th>
                    <th className="border border-gray-400 px-4 py-2">Answer</th>
                    <th className="border border-gray-400 px-4 py-2">Type</th>
                    <th className="border border-gray-400 px-4 py-2">Age</th>
                    <th className="border border-gray-400 px-4 py-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((med, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {med.question}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {med.default_ans || "N/A"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {med.type || "N/A"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {med.minage} - {med.maxage}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {/* Using the trash icon for deletion */}
                        <button
                          onClick={() => handleDelete(index)}
                          className="flex items-center text-red-500"
                        >
                          <FaTimes className="mr-2" />{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                className="bg-[#6467c0] hover:bg-[#bfbfdf] text-white font-bold py-2 px-6 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            </div>:
            <div className="mt-4 mb-4">
            <div className="max-h-96 overflow-y-auto">
            <label className="block mb-1 font-semibold">Medical Question:</label>
            <input
              type="text"
              placeholder="Question"
              className="h-14 bg-[#e0e0eb] border border-black rounded px-2 py-1 w-full mb-2 placeholder-[#646465]"
              value={questionarrieFields.question}
              onChange={(e) => handleQuestionChange("question", e.target.value)}
            />
            </div>
              <div className="flex items-center justify-center">
            <button
              className="bg-[#6467c0] hover:bg-[#bfbfdf] text-white font-bold py-1 px-4 rounded"
              onClick={handleAddquestionarrieFields}
            >
              Add Question
            </button>
          </div>

          <div className="data">
            <table className="table-auto border border-collapse border-gray-400">
              <thead className="bg-[#bfbfdf]">
                <tr>
                  <th className="bg-[#bfbfdf] border border-gray-400 px-4 py-2">
                    Sr. No
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Question
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((med, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {med.question}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {/* Using the trash icon for deletion */}
                      <button
                        onClick={() => handleDelete(index)}
                        className="flex items-center text-red-500"
                      >
                        <FaTimes className="mr-2" />{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-[#6467c0] hover:bg-[#bfbfdf] text-white font-bold py-2 px-6 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          </div>}
          </div>
      </div>
      </div>
    )
};

export default AddQuestionarrie;
