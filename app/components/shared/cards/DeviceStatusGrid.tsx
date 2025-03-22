import React from "react";

interface DeviceStatusProps {
  data: {
    dispositive_id: number;
    connected: boolean;
    timestamp: string;
    battery_level: number;
  }[];
}

const DeviceStatusGrid: React.FC<DeviceStatusProps> = ({ data }) => {
  return (
    <div className="bg-[#2E2E2E]
 text-white p-6 rounded-lg w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Device Status</h2>

      {/* Headers */}
      <div className="grid grid-cols-6 gap-2 mb-2 items-center">
        <div className="text-left font-semibold">dispositive_id</div>
        {data.map((device) => (
          <div key={device.dispositive_id} className="text-center font-bold">
            {device.dispositive_id}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-2 mb-2 items-center">
        <div className="text-left font-semibold">connected</div>
        {data.map((device) => (
          <div
            key={device.dispositive_id}
            className={`p-3 text-center rounded-md font-semibold ${
              device.connected ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {device.connected ? "true" : "false"}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-2 items-center">
        <div className="text-left font-semibold">battery_level</div>
        {data.map((device) => (
          <div
            key={device.dispositive_id}
            className={`p-3 text-center rounded-md font-semibold ${
              device.battery_level >= 80 ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {device.battery_level}
          </div>
        ))}
      </div>

      {/* Time Stamps */}
      <div className="grid grid-cols-6 gap-2 mt-3">
        <div></div>
        {data.map((device) => (
          <div key={device.dispositive_id} className="text-center text-sm">
            {device.timestamp}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-3 mt-4">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span className="text-sm">{"< 80"}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="text-sm">80+</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatusGrid;
