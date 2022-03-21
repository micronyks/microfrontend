import { createSlice, configureStore } from '@reduxjs/toolkit';

export interface IAuthState {
  isAuthenticated: boolean;
}

const AUTH_INITIAL_STATE: IAuthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      localStorage.setItem('wideui_isAuthenticated', 'true');
    },
    logout(state) {
      console.log('logoutstore');
      state.isAuthenticated = false;
      localStorage.setItem('wideui_isAuthenticated', 'false');
    },
  },
});

const authStore = configureStore({
  reducer: { auth: authSlice.reducer },
});

export type AuthState = ReturnType<typeof authStore.getState>
export const authActions = authSlice.actions;
export default authStore;
