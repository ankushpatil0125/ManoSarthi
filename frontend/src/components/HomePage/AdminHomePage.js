import React from "react";
import Header from "../Header/Header";
import Chart from "chart.js/auto"; // Make sure to import Chart.js before using react-chartjs-2
import { Line, Pie } from "react-chartjs-2";
// import { useTranslation } from "react-i18next";

const AdminHomePage = () => {
  // Sample data for graphs and charts
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Patients Screened",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55],
      },
    ],
  };

  const pieChartData = {
    labels: ["Mental Health Conditions", "No Mental Health Conditions"],
    datasets: [
      {
        data: [20, 80],
        backgroundColor: ["#E38627", "#C13C37"],
      },
    ],
  };

  return (
    <div>
      <Header />

      <div className="container mx-auto p-4 mt-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 overflow-auto hover:scale-105 ">
            <h2 className="text-xl font-semibold mb-2">
              Patients Screened (Monthly)
            </h2>
            <Line data={barChartData} />
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 overflow-auto hover:scale-105 ">
            <h2 className="text-xl font-semibold mb-2">
              Mental Health Conditions Distribution
            </h2>
            <Pie data={pieChartData} />
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 overflow-auto hover:scale-105 ">
            <h2 className="text-xl font-semibold mb-2">
              Additional Information
            </h2>
            <p className="text-gray-700">
              The "Extending Care to the Home" scheme empowers field health
              workers to deliver comprehensive healthcare directly to
              households. Through systematic screenings, individuals with mental
              health conditions are identified and referred to local doctors for
              treatment. Doctors evaluate patients, prescribe treatments, and
              record diagnoses using ICD10 codes. A tablet-based app assists
              health workers in tracking and completing follow-ups, even
              offline. Doctors can access patient data and summary information
              for informed decision-making. The scheme also provides API
              integration for a state-level dashboard and offers multi-lingual
              support for inclusivity. Overall, it aims to improve healthcare
              accessibility and outcomes within communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
