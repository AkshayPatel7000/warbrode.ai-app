import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsService from '../services/settings.service';
import {
  setSettingsLoading,
  setSettings,
  setSettingsError,
} from '../store/slices/settingsSlice';
import type { RootState } from '../store';

/**
 * Hook to fetch and manage app settings from Firestore
 */
export const useAppSettings = () => {
  const dispatch = useDispatch();
  const { settings, loading, error } = useSelector(
    (state: RootState) => state.settings,
  );

  useEffect(() => {
    const fetchSettings = async () => {
      dispatch(setSettingsLoading(true));
      try {
        const fetchedSettings = await SettingsService.fetchSettings();
        dispatch(setSettings(fetchedSettings));
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch settings';
        dispatch(setSettingsError(errorMessage));
        console.error('Error fetching settings:', err);
      }
    };

    fetchSettings();
  }, [dispatch]);

  return {
    settings,
    loading,
    error,
    baseUrl: settings?.baseUrl,
    currentVersion: settings?.currentVersion,
    deployedVersion: settings?.deployedVersion,
    isMaintenanceMode: settings?.maintenanceMode || false,
    isForceUpdateRequired: settings?.forceUpdate || false,
  };
};

/**
 * Hook to subscribe to real-time settings updates
 */
export const useSettingsSubscription = (onUpdate?: (settings: any) => void) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = SettingsService.subscribeToSettings(newSettings => {
      dispatch(setSettings(newSettings));
      onUpdate?.(newSettings);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, onUpdate]);
};
