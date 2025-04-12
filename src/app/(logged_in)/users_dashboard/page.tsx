"use client";
import React, { useEffect, useState } from "react";

import DailyChart from "../../components/cards/DailyChart";
import WeeklyChart from "../../components/cards/WeeklyChart";
import MonthlyChart from "../../components/cards/MonthlyChart";
import UserCommentsTable from "../../components/cards/UserComment";

import { feedback } from "../../../services/usersApi"; // adjust path as needed

const UsersAuthChart: React.FC = () => {
  const [commentsData, setCommentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeedbackData() {
      try {
        const data = await feedback();
        setCommentsData(data);
      } catch (err) {
        console.error("Failed to fetch feedback:", err);
        setError("Erreur lors du chargement des commentaires.");
      } finally {
        setLoading(false);
      }
    }

    fetchFeedbackData();
  }, []);

  return (
    <div className="bg-[#1E1E1E] w-full">
      <div className="bg-[#1E1E1E] p-6 rounded-lg text-white w-full flex gap-6">
        <div className="w-2/3 flex flex-col h-full">
          {/* Graphique quotidien */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Utilisateurs actifs (Quotidien)</h3>
            <DailyChart />
            {loading ? (
              <p className="mt-4">Chargement des commentaires...</p>
            ) : error ? (
              <p className="mt-4 text-red-500">{error}</p>
            ) : (
              <UserCommentsTable data={commentsData} />
            )}
          </div>
        </div>

        {/* Graphiques hebdomadaire et mensuel */}
        <div className="w-1/3 flex flex-col gap-6">
          <div className="bg-[#262626] p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Utilisateurs actifs (Hebdomadaire)</h3>
            <WeeklyChart />
          </div>

          <div className="bg-[#262626] p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Utilisateurs actifs (Mensuel)</h3>
            <MonthlyChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersAuthChart;
