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
    <div className="bg-[#1E1E1E] text-white p-6 rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Navigation Logs</h2>

      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#2E2E2E] text-[#999EA7] sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left font-thin">ID</th>
                <th className="p-3 text-left font-thin">User ID</th>
                <th className="p-3 text-left font-thin">Environment ID</th>
                <th className="p-3 text-left font-thin">Rerouting Count</th>
                <th className="p-3 text-left font-thin">Start Time</th>
                <th className="p-3 text-left font-thin">End Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b border-[#3A3A3A] bg-[#252525] hover:bg-[#333]">
                  <td className="p-3 font-thin">{row.id}</td>
                  <td className="p-3 font-thin">{row.user_id}</td>
                  <td className="p-3 font-thin">{row.environment_id}</td>
                  <td className="p-3 font-thin">{row.rerouting_count}</td>
                  <td className="p-3 font-thin">{row.start_time}</td>
                  <td className="p-3 font-thin">{row.end_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NavigationLogsTable;