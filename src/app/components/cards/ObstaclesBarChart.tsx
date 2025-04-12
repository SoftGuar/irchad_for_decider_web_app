"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { highestobstacles } from "../../../services/zonesApi"; // Update this path

const HighestObstacles: React.FC = () => {
  const [data, setData] = useState<{ zone_id: number; total_obstacles: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await highestobstacles();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data");
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
      <h2 className="text-lg font-semibold mb-2">Zones with Highest Obstacles</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis type="number" stroke="#fff" />
          <YAxis dataKey="zone_id" type="category" stroke="#fff" />
          <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
          <Bar dataKey="total_obstacles" fill="#F5A623" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HighestObstacles;
