"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Sample data
const data = [
  { POI_id: 202, visit_count: 1 },
  { POI_id: 204, visit_count: 1 },
  { POI_id: 201, visit_count: 1 },
  { POI_id: 203, visit_count: 1 },
  { POI_id: 209, visit_count: 5 },
  { POI_id: 208, visit_count: 1 },
];

const TopVisitedPOIs: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] p-4 rounded-lg text-white">
      <h2 className="text-lg font-semibold mb-2">Top Visited POIs</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis type="number" stroke="#fff" />
          <YAxis dataKey="POI_id" type="category" stroke="#fff" />
          <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
          <Bar dataKey="visit_count" fill="#808080" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopVisitedPOIs;
