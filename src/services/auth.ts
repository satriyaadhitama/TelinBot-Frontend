import { User } from '@/types/auth/User';
import api from './api';
import { UserLoginState } from '@/types/auth/UserLoginState';
import { JWTState } from '@/types/auth/JWTState';
import axios from 'axios';

const login = async (userData: UserLoginState) => {
  // Removing the Authorization header
  delete api.defaults.headers.common['Authorization'];

  try {
    const token: JWTState = (await api.post('api/auth/login', userData)).data;
    return token;
  } catch (e) {
    console.error('Authentication failed:', e);
  }
};

const logout = async (refreshToken: string | null | undefined) => {
  await api.post('api/auth/logout', { refresh: refreshToken });
};

const getUserInfo = async (): Promise<User> => {
  return (await api.get('api/auth/users')).data;
};

const verifyToken = async (
  refreshToken: string | null | undefined
): Promise<ApiResponse<{ detail: string }>> => {
  try {
    const response = await api.post('api/auth/token/verify/', {
      refresh: refreshToken,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      throw error;
    }
  }
};

export { login, logout, getUserInfo, verifyToken };
