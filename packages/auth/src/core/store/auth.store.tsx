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
    login(state, user) {
      state.isAuthenticated = true;
      const auth = { isAuthenticated: true, user: user.payload };
      localStorage.setItem('storage_auth', JSON.stringify(auth));

      // navigate after login
      state.navigatingTo = ROUTE.DASHBOARD;
    },
    logout(state) {
      state.isAuthenticated = false;
      const auth = { isAuthenticated: false, user: null };
      localStorage.setItem('storage_auth', JSON.stringify(auth));
      localStorage.removeItem("storage_auth");
    },
    navigateTo(state, navigatingTo) {
       state.navigatingTo = navigatingTo.payload;
    }
  },
});

const authStore = configureStore({
  reducer: { auth: authSlice.reducer },
});

export type AuthState = ReturnType<typeof authStore.getState>
export const authActions = authSlice.actions;
export default authStore;
