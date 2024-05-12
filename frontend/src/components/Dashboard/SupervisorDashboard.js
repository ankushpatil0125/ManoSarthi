import React, { useRef, useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js
import AdminService from '../../Services/AdminService';

const SupervisorDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [patientsVillageStats, setPatientsVillageStats] = useState([]); // [{dictrict: patientCount}]
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const patientsVillageStatsRes = await AdminService.getPatientCountAccordingtoVillage();
      // console.log("patientsVillageStatsRes: ", patientsVillageStatsRes.data)
      // setPatientsVillageStats(patientsVillageStatsRes.data);    
    } catch (error) {
      console.error("Error fetching survey stats: ", error);
    }
  }

  useEffect(() => {
    const labels = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Survey Dataset',
        data: [23, 6,7, 12, 8, 30, 3],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    setChartData(data);

    // Sample data for the Pie chart
    const pieLabels = patientsVillageStats.map((stat) => stat[0]); //All villages under supervisor
    const pieData = {
      labels: pieLabels,
      datasets: [{
        label: 'Pie Dataset',
        data: patientsVillageStats.map((stat) => stat[1]), //Patient count in a village,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4
      }]
    };
    setPieChartData(pieData);


    // Sample data for the bar chart
    const barLabels =  patientsVillageStats.map((stat) => stat[0]); //All villages under supervisor
    const barData = {
      labels: barLabels,
      datasets: [{
        label: 'Bar Dataset',
        data: patientsVillageStats.map((stat) => stat[1]), // Patient count in a village
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }]
    };
    setBarChartData(barData);
  }, [patientsVillageStats ]);

  return (
    <div className="flex gap-2 px-1 py-1 mb-4 h-10">
      <div className="w-1/2 bg-gray-400 mt-10">
        <div className="bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Patient Registered in Village</h2>
          {pieChartData && <Pie data={pieChartData} options={{}} ref={pieChartRef} />}
        </div>
      </div>
      <div className="w-1/2 bg-gray-500">
        <div className="bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Survey Registrations</h2>
          {chartData && (
            <Line data={chartData} options={{ scales: { x: { type: 'category' } } }} ref={chartRef} />
          )}
        </div>     
        <div className="bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Village wise patients stats</h2>
          {barChartData && <Bar data={barChartData} options={{ scales: { y: { suggestedMin: 1 }}}} ref={barChartRef} />}
        </div>
      </div>
    </div>
  );
}

export default SupervisorDashboard;
