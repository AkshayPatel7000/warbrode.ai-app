import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  onboardingComplete: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  onboardingComplete: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{token: string; refreshToken: string}>,
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
    },
    setOnboardingComplete: state => {
      state.onboardingComplete = true;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearAuthError: state => {
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  logout,
  setOnboardingComplete,
  setAuthError,
  clearAuthError,
} = authSlice.actions;
export default authSlice.reducer;
