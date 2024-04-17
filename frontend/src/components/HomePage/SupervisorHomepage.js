import React from "react";
import Header from "../Header/Header";

import { Line } from "react-chartjs-2";

const SupervisorHomepage = () => {
  // Sample data for graph
  // const chartData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       label: "Scheme Implementation",
  //       data: [65, 59, 80, 81, 56, 55],
  //       fill: false,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)",
  //     },
  //   ],
  // };

  return (
    <div>
          <Header />
          </div>

    // <div>
    //   <Header />
    //   <div className="container mx-auto p-4 mt-28">
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
    //         <h2 className="text-2xl font-bold mb-4 ">Manage Field Workers</h2>
    //         <p className="text-gray-700">
    //           View and manage field workers assigned to your sub-district. Add
    //           new workers, update information, and track their activities.
    //         </p>
    //       </div>
    //       <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
    //         <h2 className="text-2xl font-bold mb-4">
    //           Monitor Scheme Implementation
    //         </h2>
    //         <div className="flex justify-center mb-4">
    //           <Line data={chartData} />
    //         </div>
    //         <p className="text-gray-700">
    //           Keep track of the implementation of the "Extending Care to the
    //           Home" scheme in your sub-district. Monitor progress, identify
    //           challenges, and ensure smooth operations.
    //         </p>
    //       </div>
    //       <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
    //         <h2 className="text-2xl font-bold mb-4 ">Generate Reports</h2>
    //         <p className="text-gray-700">
    //           Generate and analyze reports on various aspects of the scheme,
    //           including screening activities, referrals, follow-ups, and overall
    //           impact on health outcomes.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SupervisorHomepage;
