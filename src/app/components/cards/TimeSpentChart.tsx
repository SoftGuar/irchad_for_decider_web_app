"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type TimeSpentChartProps = {
  data: { zone_id: number; avg_time_seconds: number }[];
};

// Convert seconds to minutes
const formatTime = (seconds: number) => {
  return (seconds / 60).toFixed(2) + " min";
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-2 rounded">
        <p className="font-semibold">Zone ID: {payload[0].payload.zone_id}</p>
        <p>{`Time Spent: ${formatTime(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const TimeSpentChart = ({ data }: TimeSpentChartProps) => {
  // Sort data by Zone ID
  const sortedData = [...data].sort((a, b) => a.zone_id - b.zone_id);

  return (
    <div className="w-full h-96 bg-[#1E1E1E] p-4 rounded-lg">
      <h2 className="text-white text-lg mb-4">Average Time Spent per Zone</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={sortedData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="zone_id" stroke="#fff" />
          <YAxis stroke="#fff" tickFormatter={(tick) => formatTime(tick)} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="avg_time_seconds" stroke="#F5A623" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSpentChart;