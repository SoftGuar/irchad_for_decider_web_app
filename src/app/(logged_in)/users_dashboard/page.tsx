"use client";
import React, { useEffect, useState } from "react";

import DailyChart from "../../components/cards/DailyChart";
import WeeklyChart from "../../components/cards/WeeklyChart";
import MonthlyChart from "../../components/cards/MonthlyChart";
import UserCommentsTable from "../../components/cards/UserComment";
import Image from "next/image";
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
      <div className="bg-black h-screen w-full relative overflow-y-scroll">
          <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden ">
            <Image src="/images/login_image.png" alt="Background" layout="fill" objectFit="cover" quality={100} priority className="rounded-b-lg" />
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
              <h1 className="text-4xl font-bold drop-shadow-lg">Quotations</h1>
              <p className="text-lg drop-shadow-md"></p>
            </div>
          </div>
    
          <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/5 bg-transparent p-6 w-full mt-36"></div>
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
    </div>
  );
};

export default UsersAuthChart;
