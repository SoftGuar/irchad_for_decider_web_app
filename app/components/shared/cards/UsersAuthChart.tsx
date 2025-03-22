"use client";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
 
const dataSets = {
  daily: [
    { date: "01 Mar", count: 10 },
    { date: "02 Mar", count: 12 },
    { date: "03 Mar", count: 9 },
    { date: "04 Mar", count: 11 },
    { date: "05 Mar", count: 14 },
  ],
  weekly: [
    { date: "W1", count: 50 },
    { date: "W2", count: 55 },
    { date: "W3", count: 53 },
    { date: "W4", count: 52 },
  ],
  monthly: [
    { date: "Jan", count: 200 },
    { date: "Feb", count: 210 },
    { date: "Mar", count: 205 },
    { date: "Apr", count: 208 },
  ],
};

const colors = {
  daily: "#F5A623", // Orange
  weekly: "#808080", // Gray
  monthly: "#24777D", // Teal
};

const UsersAuthChart: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<"daily" | "weekly" | "monthly">("daily");

  return (
    <div className="bg-[#1E1E1E] p-4 rounded-lg text-white">
      <div className="flex justify-center gap-4 mb-4">
        <button 
          className={`px-4 py-2 rounded ${activeDataset === "daily" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"}`} 
          onClick={() => setActiveDataset("daily")}
        >
          Daily
        </button>
        <button
          className={`px-4 py-2 rounded ${activeDataset === "weekly" ? "bg-gray-500 text-white" : "border border-gray-400 text-gray-600"}`}
          onClick={() => setActiveDataset("weekly")}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 rounded ${activeDataset === "monthly" ? "bg-teal-600 text-white" : "border border-gray-400 text-gray-600"}`}
          onClick={() => setActiveDataset("monthly")}
        >
          Monthly
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">{activeDataset.charAt(0).toUpperCase() + activeDataset.slice(1)} Active Users</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataSets[activeDataset]} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
          <Legend wrapperStyle={{ color: "white" }} />
          <Bar dataKey="count" fill={colors[activeDataset]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersAuthChart;
