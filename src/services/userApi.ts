import { apiService } from "./apiService";
import { User } from "../type/user"; 

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
  }
};