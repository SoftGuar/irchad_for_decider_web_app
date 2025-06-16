"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface ActivityHistoryProps {
  title: string;
  activities: { message: string; timestamp: string }[];
  loading?: boolean;
  className?: string;
}

const ActivityHistoryCard: React.FC<ActivityHistoryProps> = ({ 
  title, 
  activities, 
  loading = false,
  className = "" 
}) => {
  const [selectedFilter, setSelectedFilter] = useState("All Time");

  return (
    <div className={`bg-[#2E2E2E] p-6 rounded-lg text-[#D3D3D3] flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute left-5 top-1 h-full w-[1px] bg-[#959595]"></div>

        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#959595]">No activity history available</p>
          </div>
        ) : (
          <ul className="space-y-4 pl-6 overflow-y-auto h-full pr-2">
            {activities.map((activity, index) => (
              <li key={index} className="relative flex items-center gap-4">
                <div className="w-4 h-4 bg-[#2E2E2E] border-2 border-orange-500 rounded-full absolute top-1 left-[-12px]"></div>
                <div className="border-l-4 border-transparent pl-4">
                  <p className="font-medium">{activity.message}</p>
                  <span className="text-[#959595] text-sm">{dayjs(activity.timestamp).format('MMM DD, YYYY - HH:mm')}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActivityHistoryCard;
