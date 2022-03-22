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
      const auth = { isAuthenticated: true };
      localStorage.setItem('wideui_auth', JSON.stringify(auth));
    },
    logout(state) {
      state.isAuthenticated = false;
      const auth = { isAuthenticated: false };
      localStorage.setItem('wideui_auth', JSON.stringify(auth));
    },
  },
});

const authStore = configureStore({
  reducer: { auth: authSlice.reducer },
});

export type AuthState = ReturnType<typeof authStore.getState>
export const authActions = authSlice.actions;
export default authStore;
