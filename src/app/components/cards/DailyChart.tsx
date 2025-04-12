"use client";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { daily_active } from "./../../../services/usersApi"; // update path if needed

interface DailyDataPoint {
  date: string;
  count: number;
}

const DailyChart: React.FC = () => {
  const [data, setData] = useState<DailyDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await daily_active();

        // Map `dau_count` to `count` for chart compatibility
        const formatted = result.map((item: any) => ({
          date: item.date,
          count: item.dau_count,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching daily active users:", err);
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      {loading ? (
        <p className="text-white">Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip cursor={{ stroke: "#F5A623", strokeWidth: 2 }} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#F5A623"
              fillOpacity={0.3}
              fill="#F5A623"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DailyChart;
