import React, { useRef, useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js

const SupervisorDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Survey Dataset',
        data: [100, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    setChartData(data);

    const pieLabels = ['Referred', 'Not Referred', 'Not Surveyed'];
    const pieData = {
      labels: pieLabels,
      datasets: [{
        label: 'Pie Dataset',
        data: [12, 19, 3,],
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
    const barLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const barData = {
        labels: barLabels,
        datasets: [{
        label: 'Bar Dataset',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
        }]
    };
    setBarChartData(barData);
  }, []);

  return (
    <div class="flex mb-4">
        <div class="w-1/2 bg-gray-400 h-12">
          <div className="bg-white p-6  shadow-md">
            <h2 className="text-lg font-semibold mb-4">Patient Registered</h2>
            {pieChartData && <Pie data={pieChartData} options={{}} ref={pieChartRef} />}
          </div>
        </div>
        <div class="w-1/2 bg-gray-500 h-12">
          <div className="bg-white p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">Survey Registrations</h2>
              {chartData && (
                  <Line data={chartData} options={{ scales: { x: { type: 'category' } } }} ref={chartRef} />
              )}
            </div>
                
            <div className="bg-white p-6 shadow-md">
                <h2 className="text-lg font-semibold mb-4">Bar Chart Title</h2>
                {barChartData && <Bar data={barChartData} options={{}} ref={barChartRef} />}
            </div>
        </div>
    </div>
  );
}

export default SupervisorDashboard;
