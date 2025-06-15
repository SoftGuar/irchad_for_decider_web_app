import { apiService } from "./apiService";
import { User } from "../type/user"; 
// Define ActivityHistoryProps if not already defined or import it from the correct module
 

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const userApi = {
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return await apiService.get('/account/');
  },
  
  updateUser: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    return await apiService.put('/account/', userData);
  },

  deleteUser: async (userId: number): Promise<ApiResponse<void>> => {
    return await apiService.delete(`/account/${userId}/`);
  },
  getHistory: async (): Promise<ApiResponse<{ action: string; createdAt: string }[]>> => {
    return await apiService.get('/account/history');
  }
 
};



 



function fetchClient(arg0: string, arg1: { method: string; headers: { Authorization: string; }; }) {
  throw new Error("Function not implemented.");
}

