import firestore from '@react-native-firebase/firestore';

/**
 * App Settings from Firestore
 */
export interface AppSettings {
  baseUrl: string;
  currentVersion: string;
  deployedVersion: string;
  maintenanceMode?: boolean;
  forceUpdate?: boolean;
  minSupportedVersion?: string;
  [key: string]: any; // Allow additional settings
}

/**
 * Settings Service
 * Fetches app configuration from Firestore
 */
class SettingsService {
  private settings: AppSettings | null = null;
  private settingsDocId = 'app'; // Document ID in settings collection

  /**
   * Fetch settings from Firestore
   */
  async fetchSettings(): Promise<AppSettings> {
    try {
      console.log('📥 Fetching app settings from Firestore...');

      const settingsDoc = await firestore()
        .collection('settings')
        .doc(this.settingsDocId)
        .get();

      if (!settingsDoc.exists()) {
        console.warn('⚠️ Settings document not found, using defaults');
        return this.getDefaultSettings();
      }

      const data = settingsDoc.data() as AppSettings;
      this.settings = data;

      console.log('✅ Settings fetched successfully:', {
        baseUrl: data.baseUrl,
        currentVersion: data.currentVersion,
        deployedVersion: data.deployedVersion,
      });

      return data;
    } catch (error) {
      console.error('❌ Error fetching settings:', error);
      return this.getDefaultSettings();
    }
  }

  /**
   * Get cached settings (returns null if not fetched yet)
   */
  getSettings(): AppSettings | null {
    return this.settings;
  }

  /**
   * Get a specific setting value
   */
  getSetting<T = any>(key: keyof AppSettings): T | undefined {
    return this.settings?.[key] as T;
  }

  /**
   * Get base URL from settings
   */
  getBaseUrl(): string {
    return this.settings?.baseUrl || this.getDefaultSettings().baseUrl;
  }

  /**
   * Get current version from settings
   */
  getCurrentVersion(): string {
    return (
      this.settings?.currentVersion || this.getDefaultSettings().currentVersion
    );
  }

  /**
   * Get deployed version from settings
   */
  getDeployedVersion(): string {
    return (
      this.settings?.deployedVersion ||
      this.getDefaultSettings().deployedVersion
    );
  }

  /**
   * Check if app is in maintenance mode
   */
  isMaintenanceMode(): boolean {
    return this.settings?.maintenanceMode || false;
  }

  /**
   * Check if force update is required
   */
  isForceUpdateRequired(): boolean {
    return this.settings?.forceUpdate || false;
  }

  /**
   * Default settings (fallback)
   */
  private getDefaultSettings(): AppSettings {
    return {
      baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
      currentVersion: '1.0.0',
      deployedVersion: '1.0.0',
      maintenanceMode: false,
      forceUpdate: false,
      minSupportedVersion: '1.0.0',
    };
  }

  /**
   * Listen to settings changes in real-time
   */
  subscribeToSettings(callback: (settings: AppSettings) => void): () => void {
    console.log('👂 Subscribing to settings updates...');

    const unsubscribe = firestore()
      .collection('settings')
      .doc(this.settingsDocId)
      .onSnapshot(
        doc => {
          if (doc.exists()) {
            const data = doc.data() as AppSettings;
            this.settings = data;
            console.log('🔄 Settings updated:', data);
            callback(data);
          }
        },
        error => {
          console.error('❌ Error listening to settings:', error);
        },
      );

    return unsubscribe;
  }

  /**
   * Clear cached settings
   */
  clearSettings(): void {
    this.settings = null;
  }
}

export default new SettingsService();
