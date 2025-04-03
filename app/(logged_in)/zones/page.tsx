
// import React from "react";
// import DeviceStatusGrid from "../../components/shared/cards/DeviceStatusGrid";
// import UserCommentsTable from "@/app/components/shared/cards/UserComment";
// import NavigationLogsTable from "@/app/components/shared/cards/NavigationLogsTable";
// import ObstaclesBarChart from "@/app/components/shared/cards/ObstaclesBarChart";
// import TimeSpentChart from "@/app/components/shared/cards/TimeSpentChart";
// import ReroutingBarChart from "@/app/components/shared/cards/ReroutingBarChart";
// import TopVisitedPOIs from "@/app/components/shared/cards/TopVisitedPOIs";
// import UsersAuthChart from "@/app/components/shared/cards/UsersAuthChart";

// const testData = [
//   { dispositive_id: 1, connected: true, battery_level: 78, timestamp: "2024-03-21T10:15:00Z" },
//   { dispositive_id: 2, connected: true, battery_level: 50, timestamp: "2024-03-21T11:00:00Z" },
//   { dispositive_id: 3, connected: false, battery_level: 20, timestamp: "2024-03-21T11:30:00Z" },
//   { dispositive_id: 4, connected: true, battery_level: 95, timestamp: "2024-03-21T12:00:00Z" },
//   { dispositive_id: 5, connected: false, battery_level: 30, timestamp: "2024-03-21T12:45:00Z" },
// ];

// const commentsData = [
//   { user_id: 2, comment: "Not satisfied.", created_at: "2024-03-20 15:00:00" },
//   { user_id: 5, comment: "Loved it!", created_at: "2024-03-20 13:50:00" },
//   { user_id: 4, comment: "Very bad service.", created_at: "2024-03-20 12:40:00" },
//   { user_id: 3, comment: "Average experience.", created_at: "2024-03-20 11:30:00" },
//   { user_id: 2, comment: "Good but could be better.", created_at: "2024-03-20 10:20:00" },
// ];

// const datalog = [
//   { id: 1, user_id: 1, environment_id: 1, rerouting_count: 2, start_time: "2024-03-20 11:00:00", end_time: "2024-03-20 11:30:00" },
//   { id: 2, user_id: 2, environment_id: 1, rerouting_count: 1, start_time: "2024-03-20 12:00:00", end_time: "2024-03-20 12:45:00" },
//   { id: 3, user_id: 3, environment_id: 2, rerouting_count: 3, start_time: "2024-03-20 13:00:00", end_time: "2024-03-20 13:20:00" },
//   { id: 4, user_id: 1, environment_id: 101, rerouting_count: 2, start_time: "2024-03-20 09:00:00", end_time: "2024-03-20 09:30:00" },
// ];

// const timespentdata = [
//   { zone_id: 105, avg_time_seconds: 1200 },
//   { zone_id: 112, avg_time_seconds: 900 },
//   { zone_id: 108, avg_time_seconds: 900 },
//   { zone_id: 110, avg_time_seconds: 900 },
//   { zone_id: 104, avg_time_seconds: 900 },
// ];

// const TestDeviceStatus = () => {
//   return (
//     <div className="flex flex-col min-h-screen w-full bg-[#1E1E1E] p-6 space-y-6 overflow-auto">
      
//       {/* Section: État des dispositifs */}
//       <section className="w-full max-w-6xl mx-auto">
//         <h2 className="text-lg text-white font-semibold mb-4">État des dispositifs</h2>
//         <DeviceStatusGrid data={testData} />
//       </section>

//       {/* Section: Feedback utilisateurs */}
//       <section className="w-full max-w-6xl mx-auto">
//         <h2 className="text-lg text-white font-semibold mb-4">Commentaires des utilisateurs</h2>
//         <UserCommentsTable data={commentsData} />
//       </section>

//       {/* Section: Données analytiques */}
//       <section className="w-full max-w-6xl mx-auto">
//         <h2 className="text-lg text-white font-semibold mb-4">Données analytiques</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <NavigationLogsTable data={datalog} />
//           <ObstaclesBarChart />
//           <TimeSpentChart data={timespentdata} />
//           <ReroutingBarChart />
//         </div>
//       </section>

//       {/* Section: Points d'intérêt et authentification */}
//       <section className="w-full max-w-6xl mx-auto">
//         <h2 className="text-lg text-white font-semibold mb-4">Points d'intérêt et connexions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <TopVisitedPOIs />
//           <UsersAuthChart />
//         </div>
//       </section>

//     </div>
//   );
// };

// export default TestDeviceStatus;
// import React from "react";
// import DeviceStatusGrid from "../../components/shared/cards/DeviceStatusGrid";
// import UserCommentsTable from "@/app/components/shared/cards/UserComment";
// import NavigationLogsTable from "@/app/components/shared/cards/NavigationLogsTable";
// import ObstaclesBarChart from "@/app/components/shared/cards/ObstaclesBarChart";
// import TimeSpentChart from "@/app/components/shared/cards/TimeSpentChart";
// import ReroutingBarChart from "@/app/components/shared/cards/ReroutingBarChart";
// import TopVisitedPOIs from "@/app/components/shared/cards/TopVisitedPOIs";
// import UsersAuthChart from "@/app/components/shared/cards/UsersAuthChart";

// const testData = [
//   { dispositive_id: 1, connected: true, battery_level: 78, timestamp: "2024-03-21T10:15:00Z" },
//   { dispositive_id: 2, connected: true, battery_level: 50, timestamp: "2024-03-21T11:00:00Z" },
//   { dispositive_id: 3, connected: false, battery_level: 20, timestamp: "2024-03-21T11:30:00Z" },
//   { dispositive_id: 4, connected: true, battery_level: 95, timestamp: "2024-03-21T12:00:00Z" },
//   { dispositive_id: 5, connected: false, battery_level: 30, timestamp: "2024-03-21T12:45:00Z" },
// ];

// const commentsData = [
//   { user_id: 2, comment: "Not satisfied.", created_at: "2024-03-20 15:00:00" },
//   { user_id: 5, comment: "Loved it!", created_at: "2024-03-20 13:50:00" },
//   { user_id: 4, comment: "Very bad service.", created_at: "2024-03-20 12:40:00" },
//   { user_id: 3, comment: "Average experience.", created_at: "2024-03-20 11:30:00" },
//   { user_id: 2, comment: "Good but could be better.", created_at: "2024-03-20 10:20:00" },
// ];

// const datalog = [
//   { id: 1, user_id: 1, environment_id: 1, rerouting_count: 2, start_time: "2024-03-20 11:00:00", end_time: "2024-03-20 11:30:00" },
//   { id: 2, user_id: 2, environment_id: 1, rerouting_count: 1, start_time: "2024-03-20 12:00:00", end_time: "2024-03-20 12:45:00" },
//   { id: 3, user_id: 3, environment_id: 2, rerouting_count: 3, start_time: "2024-03-20 13:00:00", end_time: "2024-03-20 13:20:00" },
//   { id: 4, user_id: 1, environment_id: 101, rerouting_count: 2, start_time: "2024-03-20 09:00:00", end_time: "2024-03-20 09:30:00" },
// ];

// const timespentdata = [
//   { zone_id: 105, avg_time_seconds: 1200 },
//   { zone_id: 112, avg_time_seconds: 900 },
//   { zone_id: 108, avg_time_seconds: 900 },
//   { zone_id: 110, avg_time_seconds: 900 },
//   { zone_id: 104, avg_time_seconds: 900 },
// ];

// const TestDeviceStatus = () => {
//   return (
//     <div className="flex flex-col min-h-screen w-full bg-[#121212] p-6 space-y-6 overflow-auto text-white">
//       {/* Section 1: État des dispositifs (Devices Status) */}
//       <section className="w-full max-w-6xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md">
//         <h2 className="text-xl text-white font-semibold mb-4 border-b border-gray-700 pb-2">État des dispositifs</h2>
//         <DeviceStatusGrid data={testData} />
//       </section>

//       {/* Section 2: User Comments and Daily Active Users */}
//       <section className="w-full max-w-6xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h2 className="text-xl text-white font-semibold mb-4 border-b border-gray-700 pb-2">Commentaires des utilisateurs</h2>
//             <UserCommentsTable data={commentsData} />
//           </div>
//           <div>
//             <h2 className="text-xl text-white font-semibold mb-4 border-b border-gray-700 pb-2">Utilisateurs actifs quotidiens</h2>
//             <UsersAuthChart />
//           </div>
//         </div>
//       </section>

//       {/* Section 3: Comprehensive Analytics */}
//       <section className="w-full max-w-6xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md">
//         <h2 className="text-xl text-white font-semibold mb-4 border-b border-gray-700 pb-2">Analyse détaillée</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-lg text-white font-semibold mb-3">Points d'intérêt principaux</h3>
//             <TopVisitedPOIs />
//           </div>
//           <div>
//             <h3 className="text-lg text-white font-semibold mb-3">Temps moyen passé par zone</h3>
//             <TimeSpentChart data={timespentdata} />
//           </div>
//           <div>
//             <h3 className="text-lg text-white font-semibold mb-3">Nombre de réacheminements par environnement</h3>
//             <ReroutingBarChart />
//           </div>
//           <div>
//             <h3 className="text-lg text-white font-semibold mb-3">Zones avec le plus d'obstacles</h3>
//             <ObstaclesBarChart />
//           </div>
//         </div>
//         <div className="mt-6">
//           <h3 className="text-lg text-white font-semibold mb-3">Journaux de navigation</h3>
//           <NavigationLogsTable data={datalog} />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default TestDeviceStatus;
import React from "react";
import DeviceStatusGrid from "../../components/shared/cards/DeviceStatusGrid";
import UserCommentsTable from "@/app/components/shared/cards/UserComment";
import NavigationLogsTable from "@/app/components/shared/cards/NavigationLogsTable";
import ObstaclesBarChart from "@/app/components/shared/cards/ObstaclesBarChart";
import TimeSpentChart from "@/app/components/shared/cards/TimeSpentChart";
import ReroutingBarChart from "@/app/components/shared/cards/ReroutingBarChart";
import TopVisitedPOIs from "@/app/components/shared/cards/TopVisitedPOIs";
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

const timespentdata = [
  { zone_id: 105, avg_time_seconds: 1200 },
  { zone_id: 112, avg_time_seconds: 900 },
  { zone_id: 108, avg_time_seconds: 900 },
  { zone_id: 110, avg_time_seconds: 900 },
  { zone_id: 104, avg_time_seconds: 900 },
];

const TestDeviceStatus = () => {
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
          <TimeSpentChart data={timespentdata} />
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
          <NavigationLogsTable data={datalog} />
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