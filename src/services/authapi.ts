import { User } from '../type/user';
import { ApiResponse } from './ApiResponse';
import { apiService } from './apiService';

export const authApi = {
  login: async (email: string, password: string) => {
    return await apiService.post('/login', { email, password, role: 'admin' });
  },
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return await apiService.get('/account/');
  },
};
