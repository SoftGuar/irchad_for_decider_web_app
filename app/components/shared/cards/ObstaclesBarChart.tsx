
// "use client";
// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

// const data = [
//   { zone: "101", obstacles: 6 },
//   { zone: "113", obstacles: 4 },
//   { zone: "104", obstacles: 4 },
//   { zone: "106", obstacles: 3 },
//   { zone: "114", obstacles: 2 },
// ];

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-black text-white p-2 rounded">
//         <p>{`Zone: ${payload[0].payload.zone}`}</p>
//         <p>{`Obstacles: ${payload[0].value}`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const ObstacleChart: React.FC = () => {
//   return (
//     <div className="bg-gray-900 p-4 rounded-lg text-white">
//       <h2 className="text-lg font-semibold mb-2">Zones with the highest number of obstacles detected.</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//           <XAxis dataKey="zone" stroke="#ccc" />
//           <YAxis stroke="#ccc" allowDecimals={false} />
//           <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
//           <Legend wrapperStyle={{ color: "white" }} />
//           <Bar dataKey="obstacles" fill="#4CAF50" name="< 80" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ObstacleChart;
"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { zone: "101", obstacles: 6 },
  { zone: "113", obstacles: 4 },
  { zone: "104", obstacles: 4 },
  { zone: "106", obstacles: 3 },
  { zone: "114", obstacles: 2 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#222] text-[#F5A623] p-2 rounded shadow-md">
        <p>{`Zone: ${payload[0].payload.zone}`}</p>
        <p>{`Obstacles: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ObstacleChart: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg text-white shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-[#F5A623]">Zones with the highest number of obstacles detected.</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" />
          <XAxis dataKey="zone" stroke="#ccc" />
          <YAxis stroke="#ccc" allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
          <Legend wrapperStyle={{ color: "white" }} />
          <Bar dataKey="obstacles" fill="#F5A623" name="Obstacles Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ObstacleChart;
