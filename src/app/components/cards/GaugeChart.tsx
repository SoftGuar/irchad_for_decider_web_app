import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GaugeChartProps {
  data: { user_id: string }[];
  maxUsers?: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ data, maxUsers = 10 }) => {
  // Calculate Monthly Active Users (Unique Users)
  const uniqueUsers = new Set(data.map((d) => d.user_id)).size;

  const chartData = {
    labels: ["Active Users", "Remaining"],
    datasets: [
      {
        data: [uniqueUsers, maxUsers - uniqueUsers], 
        backgroundColor: ["#6FCF97", "#1E1E1E"], // Green for active users, dark for remaining
        borderWidth: 2,
        borderColor: "#000",
        cutout: "80%",
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-40 h-24">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="absolute top-12 text-2xl font-bold">
        {uniqueUsers}
      </div>
      <p className="text-gray-400 text-sm mt-2">Monthly Active Users</p>
    </div>
  );
};

export default GaugeChart;