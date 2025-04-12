"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { monthly_active } from "../../../services/usersApi"; // adjust path if needed

interface MonthlyDataPoint {
  date: string;
  count: number;
}

const formatMonth = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short" }); // e.g., Jan, Feb
};

const MonthlyChart: React.FC = () => {
  const [data, setData] = useState<MonthlyDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await monthly_active();

        const formatted = result.map((item: any) => ({
          date: formatMonth(item.date),
          count: item.mau_count,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching monthly active users:", err);
        setError("Erreur lors du chargement des données mensuelles.");
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
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
            <Bar dataKey="count" fill="#24777D" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlyChart;
