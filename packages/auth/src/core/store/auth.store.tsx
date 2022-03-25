import { createSlice, configureStore } from '@reduxjs/toolkit';
import { ROUTE } from '../constants/route.constant';

export interface IAuthState {
  isAuthenticated: boolean;
  navigatingTo: string;
}

const AUTH_INITIAL_STATE: IAuthState = { isAuthenticated: false, navigatingTo: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      const auth = { isAuthenticated: true };
      localStorage.setItem('wideui_auth', JSON.stringify(auth));
      state.navigatingTo = ROUTE.DASHBOARD;
    },
    logout(state) {
      state.isAuthenticated = false;
      const auth = { isAuthenticated: false };
      localStorage.setItem('wideui_auth', JSON.stringify(auth));
    },
    navigateTo(state) {
     // state.navigatingTo = ROUTE.DASHBOARD;
    }
  },
});

const authStore = configureStore({
  reducer: { auth: authSlice.reducer },
});

export type AuthState = ReturnType<typeof authStore.getState>
export const authActions = authSlice.actions;
export default authStore;
