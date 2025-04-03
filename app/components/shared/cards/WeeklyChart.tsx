import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const weeklyData = [
  { date: "W1", count: 50 },
  { date: "W2", count: 55 },
  { date: "W3", count: 53 },
  { date: "W4", count: 52 },
];

const WeeklyChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={weeklyData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
        <Bar dataKey="count" fill="#808080" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyChart;
