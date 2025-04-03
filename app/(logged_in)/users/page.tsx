"use client";
import React from "react";
import DailyChart from "../../components/shared/cards/DailyChart";
import WeeklyChart from "../../components/shared/cards/WeeklyChart";
import MonthlyChart from "../../components/shared/cards/MonthlyChart";
import UserCommentsTable from "../../components/shared/cards/UserComment";

const commentsData = [
  { user_id: 2, comment: "Not satisfied.", created_at: "2024-03-20 15:00:00" },
  { user_id: 5, comment: "Loved it!", created_at: "2024-03-20 13:50:00" },
  { user_id: 4, comment: "Very bad service.", created_at: "2024-03-20 12:40:00" },
  { user_id: 3, comment: "Average experience.", created_at: "2024-03-20 11:30:00" },
  { user_id: 2, comment: "Good but could be better.", created_at: "2024-03-20 10:20:00" },
];

const UsersAuthChart: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] w-full">
    <div className="bg-[#1E1E1E] p-6 rounded-lg text-white w-full  flex gap-6">
      
      <div className="w-2/3 flex flex-col h-full">
        {/* Graphique quotidien */}
        <div className="bg-[#1E1E1E] p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Utilisateurs actifs (Quotidien)</h3>
          <DailyChart />
          <UserCommentsTable data={commentsData} />
        </div>

        {/* Tableau des commentaires directement sous le graphique */}
      
      </div>

      {/* Section des graphiques hebdomadaire et mensuel */}
      <div className="w-1/3 flex flex-col gap-6">
        {/* Weekly Chart */}
        <div className="bg-[#262626] p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3">Utilisateurs actifs (Hebdomadaire)</h3>
          <WeeklyChart />
        </div>

        {/* Monthly Chart */}
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
