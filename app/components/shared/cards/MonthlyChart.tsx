import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const monthlyData = [
  { date: "Jan", count: 200 },
  { date: "Feb", count: 210 },
  { date: "Mar", count: 205 },
  { date: "Apr", count: 208 },
];

const MonthlyChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
        <Bar dataKey="count" fill="#24777D" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;
