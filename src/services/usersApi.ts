import { DeviceIntervention, DeviceIssueStats, DevicePerformance, DeviceRevenue, DeviceSales, DeviceStatus, PopularDevice } from "../type/device";
import { AnalyticsData } from "../type/types";
import { ApiResponse } from "./ApiResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


 



// Sales Stats Endpoints
export async function feedback() {
  const response = await fetch(`${API_URL}/analytics/users/feedback`);
  if (!response.ok) throw new Error("Failed to fetch cfeedback data");
  return response.json();
}

export async function daily_active() {
    const response = await fetch(`${API_URL}/analytics/users/daily-active`);
    if (!response.ok) throw new Error("Failed to fetch daily active users data");
    return response.json();
  }
  export async function monthly_active() {
    const response = await fetch(`${API_URL}/analytics/users/monthly-active`);
    if (!response.ok) throw new Error("Failed to fetch monthly active users data");
    return response.json();
  }
    export async function weekly_active() {
        const response = await fetch(`${API_URL}/analytics/users/weekly-active`);
        if (!response.ok) throw new Error("Failed to fetch daily active users data");
        return response.json();
    }
