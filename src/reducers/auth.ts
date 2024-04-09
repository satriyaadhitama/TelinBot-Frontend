import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, getUserInfo } from '@/services/auth';
import { AuthState } from '@/types/auth/AuthState';
import { User } from '@/types/auth/User';
import { UserLoginState } from '@/types/auth/UserLoginState';
import api from '@/services/api';
import { JWTState } from '@/types/auth/JWTState';
import { RootState } from '@/types/auth/RootState';

const initialState: AuthState = {
  user: {
    id: null,
    first_name: null,
    last_name: null,
    position: null,
    groups: [],
  },
  token: { access: null, refresh: null },
  isAuthenticated: false,
  status: 'idle',
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: UserLoginState) => {
    // Login, retrieve token and set to header auth
    const token = await login(userData);
    // Set header authorization
    api.defaults.headers.common['Authorization'] = `Bearer ${token?.access}`;
    // Set user state
    const user = await getUserInfo();
    return { user, token };
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const refreshToken = state.auth.token?.refresh;
    if (refreshToken) {
      await logout(state.auth.token?.refresh);
      delete api.defaults.headers.common['Authorization'];
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: User; token: JWTState | undefined }>
        ) => {
          const { user, token } = action.payload;
          state.status = 'succeeded';
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          id: null,
          first_name: null,
          last_name: null,
          position: null,
          groups: [],
        };
        state.isAuthenticated = false;
        state.token = { refresh: null, access: null };
        state.status = 'idle';
      });
  },
});

// Export reducer
export default authSlice.reducer;
