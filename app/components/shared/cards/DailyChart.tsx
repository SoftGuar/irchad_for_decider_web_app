import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const dailyData = [
  { date: "01 Mar", count: 10 },
  { date: "02 Mar", count: 12 },
  { date: "03 Mar", count: 9 },
  { date: "04 Mar", count: 11 },
  { date: "05 Mar", count: 14 },
];

const DailyChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={dailyData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip cursor={{ stroke: "#F5A623", strokeWidth: 2 }} />
        <Area type="monotone" dataKey="count" stroke="#F5A623" fillOpacity={0.3} fill="#F5A623" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DailyChart;
