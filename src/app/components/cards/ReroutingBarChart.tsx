"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { mostreroutingrequests } from "../../../services/zonesApi"; // Update this path

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
  const [data, setData] = useState<{ environment_id: number; rerouting_count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mostreroutingrequests();
        setData(result);
      } catch (err) {
        setError("Failed to fetch rerouting data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-[#1E1E1E] p-4 rounded-lg text-white">
      <h2 className="text-lg font-semibold mb-2">Environments with Highest Rerouting Counts</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
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
