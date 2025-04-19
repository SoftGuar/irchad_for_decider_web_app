import { DeviceIntervention, DeviceIssueStats, DevicePerformance, DeviceRevenue, DeviceSales, DeviceStatus, PopularDevice } from "../type/device";
import { AnalyticsData } from "../type/types";
import { ApiResponse } from "./ApiResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


 



// Sales Stats Endpoints
export async function averagetimespent() {
  const response = await fetch(`${API_URL}/analytics/zones/average-time-spent`);
  if (!response.ok) throw new Error("Failed to fetch average-time-spent");
  return response.json();
}

export async function topvisitedPOIs() {
    const response = await fetch(`${API_URL}/analytics/pois/top-visited`);
    if (!response.ok) throw new Error("Failed to fetch top-visited POIs data");
    return response.json();
  }

  export async function highestobstacles() {
    const response = await fetch(`${API_URL}/analytics/zones/highest-obstacles`);
    if (!response.ok) throw new Error("Failed to fetch highest-obstacles data");
    return response.json();
  }

  export async function mostreroutingrequests() {
    const response = await fetch(`${API_URL}/analytics/navigation/most-rerouting-requests`);
    if (!response.ok) throw new Error("Failed to fetch most-rerouting-requests data");
    return response.json();
  }
  export async function successrateofnavigations() {
    const response = await fetch(`${API_URL}/analytics/navigation/successful`);
    if (!response.ok) throw new Error("Failed to fetch success rate of navigations data");
    return response.json();
  }

  export async function navigationLogs() 
  {
    const response = await fetch(`${API_URL}/analytics/navigation/logs`);
    if (!response.ok) throw new Error("Failed to fetch navigation logs data ");
    return response.json();
  }