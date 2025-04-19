'use client'
import React, { useEffect, useState } from "react";
 
import DeviceStatusGrid from "../app/components/cards/DeviceStatusGrid";
import UserCommentsTable from "@/src/app/components/cards/UserComment";
import NavigationLogsTable from "@/src/app/components/cards/NavigationLogsTable";
import ObstaclesBarChart from "@/src/app/components/cards/ObstaclesBarChart";
import TimeSpentChart from "@/src/app/components/cards/TimeSpentChart";
import ReroutingBarChart from "@/src/app/components/cards/ReroutingBarChart";
import TopVisitedPOIs from "@/src/app/components/cards/TopVisitedPOIs";
import UsersAuthChart from "@/src/app/components/cards/UsersAuthChart";
import { averagetimespent } from "../services/zonesApi"; // adjust the path if needed
import { navigationLogs } from "../services/zonesApi"; // adjust the path if needed
 

const TestDeviceStatus = () => {
  const [timeSpentData, setTimeSpentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await averagetimespent();
        setTimeSpentData(data);
      } catch (error) {
        console.error("Error fetching time spent data:", error);
      }
    };

    fetchData();
  }, []);

  const [logsData, setLogsData] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await navigationLogs();
        setLogsData(data);
      } catch (error) {
        console.error("Error fetching navigation logs:", error);
      }
    };
  
    fetchLogs();
  }, []);
  
    return (
      <div className="flex flex-col min-h-screen w-full bg-[#121212] p-6 space-y-6 overflow-auto text-white">
      {/* Section 1: État des dispositifs (Devices Status) */}
      
      {/* Section 3: Comprehensive Analytics */}
      <section className="w-full max-w-6xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-white font-semibold mb-4 border-b border-gray-700 pb-2">
          Analyse détaillée
        </h2>
    
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Large Chart on Top - Full Width */}
          <div className="w-full bg-[#262626] p-6 rounded-xl shadow">
            <h3 className="text-lg text-white font-semibold mb-3">Temps moyen passé par zone</h3>
            <TimeSpentChart data={timeSpentData} />
          </div>
        </div>
    
        {/* Two Charts Side by Side (Each takes half of the screen) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[#262626] p-6 rounded-xl shadow">
            <h3 className="text-lg text-white font-semibold mb-3">Points d'intérêt principaux</h3>
            <TopVisitedPOIs />
          </div>
    
          <div className="bg-[#262626] p-6 rounded-xl shadow">
            <h3 className="text-lg text-white font-semibold mb-3">Zones avec le plus d'obstacles</h3>
            <ObstaclesBarChart />
          </div>
        </div>
    
        {/* Navigation Logs (2/4 width) & Rerouting Chart (1/3 width) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Navigation Logs - Takes 2/4 of the screen */}
          <div className="md:col-span-2 bg-[#262626] p-6 rounded-xl shadow">
            <h3 className="text-lg text-white font-semibold mb-3">Journaux de navigation</h3>
            <NavigationLogsTable data={logsData} />
          </div>
    
          {/* Rerouting Chart - Takes 1/3 of the screen */}
          <div className="bg-[#262626] p-6 rounded-xl shadow">
            <h3 className="text-lg text-white font-semibold mb-3">Environnements avec le plus de réacheminements</h3>
            <ReroutingBarChart />
          </div>
        </div>
      </section>
    </div>
    
    );
  };
  
  export default TestDeviceStatus;