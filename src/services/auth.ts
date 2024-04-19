import api from './api';
import axios from 'axios';
import { User, UserData } from '@/types/auth/User';
import { UserLoginState } from '@/types/auth/UserLoginState';
import { JWTState } from '@/types/auth/JWTState';
import { ApiResponse } from '@/types/api/ApiResponse';
import { PaginatedResponse } from '@/types/api/PaginatedResponse';

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
  return (await api.get('api/auth/user')).data;
};

const verifyToken = async (
  refreshToken: string | null | undefined
): Promise<ApiResponse<{ detail: string }>> => {
  try {
    const response = await api.post('api/auth/token/verify', {
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

const getUsers = async (
  isOnline?: boolean,
  today?: boolean
): Promise<PaginatedResponse<UserData[] | null>> => {
  const onlineParam = isOnline !== undefined ? `isOnline=${isOnline}` : '';
  const todayParam = today ? '&today=true' : '';
  return (await api.get(`api/auth/users?${onlineParam}${todayParam}`)).data;
};

const getUsersHistory = async (
  filter: string
): Promise<{ date: string; value: number }[] | null> => {
  return (await api.get(`api/auth/users/history?filter=${filter}`)).data;
};

export { login, logout, getUserInfo, getUsers, verifyToken, getUsersHistory };
