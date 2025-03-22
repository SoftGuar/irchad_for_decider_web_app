"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { environment_id: 107, rerouting_count: 4 },
  { environment_id: 2, rerouting_count: 3 },
  { environment_id: 103, rerouting_count: 3 },
  { environment_id: 110, rerouting_count: 3 },
  { environment_id: 1, rerouting_count: 2 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-2 rounded">
        <p className="font-semibold">Environment ID: {payload[0].payload.environment_id}</p>
        <p>Rerouting Count: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ReroutingChart: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] p-4 rounded-lg text-white">
      <h2 className="text-lg font-semibold mb-2">Environments with Highest Rerouting Counts</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical" // Chart Horizontal
          margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis type="number" stroke="#ccc" allowDecimals={false} />
          <YAxis dataKey="environment_id" type="category" stroke="#ccc" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
          <Legend wrapperStyle={{ color: "white" }} />
          <Bar dataKey="rerouting_count" fill="#F5A623" name="Rerouting Count" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReroutingChart;
