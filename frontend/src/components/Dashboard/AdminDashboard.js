import React, { useRef, useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import AdminService from "../../Services/AdminService";

const AdminDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [diseasePieChartData, setDiseasePieChartData] = useState(null);
  const [districtPieChartData, setDistrictPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [dashboardStatsData, setDashboardStatsData] = useState([]);
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const diseasePieChartRef = useRef(null);
  const districtPieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminService.adminDashboard();
        setDashboardStatsData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dashboardStatsData.length === 0) return;

    // disease wise count
    const diseaseLabels = dashboardStatsData?.diseaseStats?.map((stat) => stat[0]);
    const diseasePieData = {
      labels: diseaseLabels,
      datasets: [
        {
          label: "Disease Pie Dataset",
          data: dashboardStatsData?.diseaseStats?.map((stat) => stat[1]),
          backgroundColor: [  
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(255, 0, 255)",
          "rgb(0, 255, 255)",
          "rgb(128, 128, 128)",
          "rgb(0, 128, 0)"
          ],
          hoverOffset: 4,
        },
      ],
    };
    setDiseasePieChartData(diseasePieData);

    // District wise count
    const districtLabels = dashboardStatsData?.districtStats?.map((stat) => stat[0]);
    const districtPieData = {
      labels: districtLabels,
      datasets: [
        {
          label: "District Pie Dataset",
          data: dashboardStatsData?.districtStats?.map((stat) => stat[1]),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
            "rgb(255, 0, 255)",
            "rgb(0, 255, 255)",
            "rgb(128, 128, 128)",
            "rgb(0, 128, 0)"
          ],
          hoverOffset: 4,
        },
      ],
    };
    setDistrictPieChartData(districtPieData);

    //Age wise count
    const ageLabels = ["Below 20", "20 - 40", "40 - 60", "Above 60"];
    const barData = {
      labels: ageLabels,
      datasets: [
        {
          label: "Patients",
          data:dashboardStatsData?.ageStats?.map(stat => Object.values(stat)[0]),
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };
    setBarChartData(barData);
  }, [dashboardStatsData]);

  
  return (
    <div>
    <div className="grid grid-cols-2 gap-4 px-4 py-4">
    <div className="bg-white p-6 mt-4 rounded shadow-md">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Total Surveys: {dashboardStatsData?.totalSurveysTaken}</h2>
          <span className="text-gray-600"></span>
        </div>
        <div className="flex items-center justify-between">
          <h5 className="font-semibold">Referred: {dashboardStatsData?.refferedCount}</h5>
          <span className="text-gray-600"></span>
        </div>
        <div className="flex items-center justify-between">
          <h5 className="font-semibold">Not Referred: {dashboardStatsData?.nonRefferedCount}</h5>
          <span className="text-gray-600"></span>
        </div>
        <div className="flex items-center justify-between">
          <h5 className="font-semibold">Treated: {dashboardStatsData?.totalTreated}</h5>
          <span className="text-gray-600"></span>
        </div>
      </div>
    </div>

      {/* Graphs */}
      <div className="bg-gray-400">
        <div className="bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Age wise patients stats</h2>
          {barChartData && <Bar data={barChartData} options={{ scales: { y: { suggestedMin: 1 }}}} ref={barChartRef} />}
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 px-4 py-4">
      <div className="bg-gray-400">
        <div className="bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Top 10 Disease wise patients stats</h2>
          {diseasePieChartData && <Pie data={diseasePieChartData} options={{}} ref={pieChartRef} />}
        </div>
      </div>
      <div className="bg-gray-400">
        <div className="bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Top 10 District wise patients stats</h2>
          {districtPieChartData && <Pie data={districtPieChartData} options={{}} ref={districtPieChartRef} />}
        </div>
      </div>
    </div>
  </div>  
  );
};

export default AdminDashboard;
