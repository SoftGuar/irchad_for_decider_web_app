export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
interface Activity {
    action: string;
    createdAt: string;
  }
  
  interface ActivityHistoryProps {
    title: string;
    activities: Activity[];
  }