import React from "react";
import DeviceStatusGrid from "../../components/shared/cards/DeviceStatusGrid";
import UserCommentsTable from "@/app/components/shared/cards/UserComment";
import UserRatingGauge from "@/app/components/shared/cards/UserRatingProps";
import NavigationLogsTable from "@/app/components/shared/cards/NavigationLogsTable";
import ObstaclesBarChart from "@/app/components/shared/cards/ObstaclesBarChart";
import TimeSpentChart from "@/app/components/shared/cards/TimeSpentChart";
import ReroutingBarChart from "@/app/components/shared/cards/ReroutingBarChart";
import TopVisitedPOIs from "@/app/components/shared/cards/TopVisitedPOIs";
import GaugeChart from "@/app/components/shared/cards/UserRatingProps";
import UsersAuthChart from "@/app/components/shared/cards/UsersAuthChart";

const testData = [
  { dispositive_id: 1, connected: true, battery_level: 78, timestamp: "2024-03-21T10:15:00Z" },
  { dispositive_id: 2, connected: true, battery_level: 50, timestamp: "2024-03-21T11:00:00Z" },
  { dispositive_id: 3, connected: false, battery_level: 20, timestamp: "2024-03-21T11:30:00Z" },
  { dispositive_id: 4, connected: true, battery_level: 95, timestamp: "2024-03-21T12:00:00Z" },
  { dispositive_id: 5, connected: false, battery_level: 30, timestamp: "2024-03-21T12:45:00Z" },
];
const commentsData = [
    { user_id: 2, comment: "Not satisfied.", created_at: "2024-03-20 15:00:00" },
    { user_id: 5, comment: "Loved it!", created_at: "2024-03-20 13:50:00" },
    { user_id: 4, comment: "Very bad service.", created_at: "2024-03-20 12:40:00" },
    { user_id: 3, comment: "Average experience.", created_at: "2024-03-20 11:30:00" },
    { user_id: 2, comment: "Good but could be better.", created_at: "2024-03-20 10:20:00" },
  ];
  const datalog = [
    { id: 1, user_id: 1, environment_id: 1, rerouting_count: 2, start_time: "2024-03-20 11:00:00", end_time: "2024-03-20 11:30:00" },
    { id: 2, user_id: 2, environment_id: 1, rerouting_count: 1, start_time: "2024-03-20 12:00:00", end_time: "2024-03-20 12:45:00" },
    { id: 3, user_id: 3, environment_id: 2, rerouting_count: 3, start_time: "2024-03-20 13:00:00", end_time: "2024-03-20 13:20:00" },
    { id: 4, user_id: 1, environment_id: 101, rerouting_count: 2, start_time: "2024-03-20 09:00:00", end_time: "2024-03-20 09:30:00" },
  ];
  const Obstacledata = [
    { zone_id: 101, total_obstacles: 6 },
    { zone_id: 113, total_obstacles: 4 },
    { zone_id: 104, total_obstacles: 4 },
    { zone_id: 106, total_obstacles: 3 },
    { zone_id: 114, total_obstacles: 2 },
  ];
  const timespentdata = [
    { zone_id: 105, avg_time_seconds: 1200 },
    { zone_id: 112, avg_time_seconds: 900 },
    { zone_id: 108, avg_time_seconds: 900 },
    { zone_id: 110, avg_time_seconds: 900 },
    { zone_id: 104, avg_time_seconds: 900 },
    { zone_id: 107, avg_time_seconds: 900 },
    { zone_id: 109, avg_time_seconds: 900 },
    { zone_id: 106, avg_time_seconds: 900 },
    { zone_id: 113, avg_time_seconds: 900 },
    { zone_id: 103, avg_time_seconds: 800 },
    { zone_id: 101, avg_time_seconds: 700 },
    { zone_id: 114, avg_time_seconds: 600 },
    { zone_id: 102, avg_time_seconds: 570 },
  ];
  const Reroutingdata = [
    { environment_id: 107, rerouting_count: 4 },
    { environment_id: 2, rerouting_count: 3 },
    { environment_id: 103, rerouting_count: 3 },
    { environment_id: 110, rerouting_count: 3 },
    { environment_id: 1, rerouting_count: 2 }
  ];
  const TestDeviceStatus = () => {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gray-800 p-6 space-y-8 overflow-auto">
        <div className="w-full max-w-5xl">
          <DeviceStatusGrid data={testData} />
        </div>
        <div className="w-full max-w-5xl">
          <UserCommentsTable data={commentsData} />
        </div>
        <div className="w-full max-w-5xl">
        {/* <UserRatingGauge  /> */}
        <NavigationLogsTable data={datalog} />

        </div>
        <div className="w-full max-w-5xl">
        <ObstaclesBarChart  />

        </div>
        <div className="w-full max-w-5xl">
        <TimeSpentChart data={timespentdata} />

        </div>
        <div className="w-full max-w-5xl">
        <ReroutingBarChart  />

        </div>
        <div className="w-full max-w-5xl">
        <TopVisitedPOIs  />

        </div>
        <div className="w-full max-w-5xl">
        <UsersAuthChart />

        </div>
       
      </div>
    );
  };
  
  

export default TestDeviceStatus;
