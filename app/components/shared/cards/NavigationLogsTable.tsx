// import React from "react";

// interface LogEntry {
//   id: number;
//   user_id: number;
//   environment_id: number;
//   rerouting_count: number;
//   start_time: string;
//   end_time: string;
// }

// interface Props {
//   data: LogEntry[];
// }

// const NavigationLogsTable: React.FC<Props> = ({ data }) => {
//   return (
//     <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg">
//       <h2 className="text-lg font-semibold mb-2">NavigationsLogs</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-700">
//           <thead>
//             <tr className="bg-gray-800 text-gray-300">
//               <th className="border border-gray-700 p-2">id</th>
//               <th className="border border-gray-700 p-2">user_id</th>
//               <th className="border border-gray-700 p-2">environment_id</th>
//               <th className="border border-gray-700 p-2">rerouting_count</th>
//               <th className="border border-gray-700 p-2">start_time</th>
//               <th className="border border-gray-700 p-2">end_time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-800">
//                 <td className="border border-gray-700 p-2">{row.id}</td>
//                 <td className="border border-gray-700 p-2">{row.user_id}</td>
//                 <td className="border border-gray-700 p-2">{row.environment_id}</td>
//                 <td className="border border-gray-700 p-2">{row.rerouting_count}</td>
//                 <td className="border border-gray-700 p-2">{row.start_time}</td>
//                 <td className="border border-gray-700 p-2">{row.end_time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default NavigationLogsTable;
import React from "react";

interface LogEntry {
  id: number;
  user_id: number;
  environment_id: number;
  rerouting_count: number;
  start_time: string;
  end_time: string;
}

interface Props {
  data: LogEntry[];
}

const NavigationLogsTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-6 bg-[#1E1E1E] text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-[#F5A623]">Navigation Logs</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#3A3A3A]">
          <thead className="bg-[#2E2E2E] text-white">
            <tr>
              <th className="border border-[#3A3A3A] p-3">ID</th>
              <th className="border border-[#3A3A3A] p-3">User ID</th>
              <th className="border border-[#3A3A3A] p-3">Environment ID</th>
              <th className="border border-[#3A3A3A] p-3">Rerouting Count</th>
              <th className="border border-[#3A3A3A] p-3">Start Time</th>
              <th className="border border-[#3A3A3A] p-3">End Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="bg-[#252525] hover:bg-[#333]">
                <td className="border border-[#3A3A3A] p-3">{row.id}</td>
                <td className="border border-[#3A3A3A] p-3">{row.user_id}</td>
                <td className="border border-[#3A3A3A] p-3">{row.environment_id}</td>
                <td className="border border-[#3A3A3A] p-3">{row.rerouting_count}</td>
                <td className="border border-[#3A3A3A] p-3">{row.start_time}</td>
                <td className="border border-[#3A3A3A] p-3">{row.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NavigationLogsTable;
