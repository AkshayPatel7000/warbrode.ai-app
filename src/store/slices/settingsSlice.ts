import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppSettings } from '../../services/settings.service';

interface SettingsState {
  settings: AppSettings | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettingsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSettings: (state, action: PayloadAction<AppSettings>) => {
      state.settings = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSettingsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSettings: state => {
      state.settings = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setSettingsLoading,
  setSettings,
  setSettingsError,
  clearSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
