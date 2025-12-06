import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '@env';
import { store } from '../store';
import { API_ENDPOINTS } from '../constants/api';
import type {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  DeviceTokenRequest,
  DeviceTokenResponse,
  UserPreferences,
  PreferencesResponse,
  DashboardResponse,
  ClothesListParams,
  ClothesListResponse,
  DeleteClothesResponse,
  UploadResponse,
} from '../types/api.types';
import type { ApiErrorExtended } from '../types/error.types';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://ql0rfdpp-4000.inc1.devtunnels.ms',
      timeout: parseInt(API_TIMEOUT, 10) || 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const state = store.getState();
        const token = state.auth.token;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async error => {
        const originalRequest = error.config;

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Here you can implement token refresh logic
          // const refreshToken = store.getState().auth.refreshToken;
          // Try to refresh token and retry the request

          return Promise.reject(error);
        }

        // Transform error to include user-friendly message
        const transformedError = this.transformError(error);
        return Promise.reject(transformedError);
      },
    );
  }

  /**
   * Transform error to include user-friendly message
   * Prioritizes backend error messages
   */
  private transformError(error: any): ApiErrorExtended {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // Prioritize backend error message
      let message = data?.message || data?.error;

      // Fallback messages if backend doesn't provide one
      if (!message) {
        switch (status) {
          case 400:
            message = 'Invalid input. Please check your details.';
            break;
          case 401:
            message = 'Invalid credentials. Please try again.';
            break;
          case 403:
            message = 'You do not have permission to perform this action.';
            break;
          case 404:
            message = 'The requested resource was not found.';
            break;
          case 409:
            message = 'This resource already exists.';
            break;
          case 422:
            message = 'Validation error. Please check your input.';
            break;
          case 429:
            message = 'Too many requests. Please try again later.';
            break;
          case 500:
            message = 'Server error. Please try again later.';
            break;
          case 503:
            message = 'Service temporarily unavailable.';
            break;
          default:
            message = 'An unexpected error occurred.';
        }
      }

      // Attach user-friendly message and field errors
      error.userMessage = message;
      error.statusCode = status;
      error.fieldErrors = data?.errors || {};
    } else if (error.request) {
      // Network error
      error.userMessage =
        'Network error. Please check your internet connection.';
      error.statusCode = 0;
      error.isNetworkError = true;
    } else {
      // Other errors
      error.userMessage = error.message || 'An unexpected error occurred.';
      error.statusCode = -1;
    }

    return error;
  }

  // Generic HTTP methods
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  // Authentication API methods
  public async signup(
    data: SignupRequest,
  ): Promise<AxiosResponse<SignupResponse>> {
    return this.post<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, data);
  }

  public async login(
    data: LoginRequest,
  ): Promise<AxiosResponse<LoginResponse>> {
    return this.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
  }

  public async registerDeviceToken(
    data: DeviceTokenRequest,
  ): Promise<AxiosResponse<DeviceTokenResponse>> {
    return this.post<DeviceTokenResponse>(
      API_ENDPOINTS.AUTH.DEVICE_TOKEN,
      data,
    );
  }

  public async getPreferences(): Promise<AxiosResponse<PreferencesResponse>> {
    return this.get<PreferencesResponse>(API_ENDPOINTS.AUTH.PREFERENCES);
  }

  public async updatePreferences(
    preferences: Partial<UserPreferences>,
  ): Promise<AxiosResponse<PreferencesResponse>> {
    return this.patch<PreferencesResponse>(
      API_ENDPOINTS.AUTH.PREFERENCES,
      preferences,
    );
  }

  // Home/Dashboard API methods
  public async getDashboard(): Promise<AxiosResponse<DashboardResponse>> {
    return this.get<DashboardResponse>(API_ENDPOINTS.HOME.DASHBOARD);
  }

  // Clothes API methods
  public async getClothes(
    params?: ClothesListParams,
  ): Promise<AxiosResponse<ClothesListResponse>> {
    return this.get<ClothesListResponse>(API_ENDPOINTS.CLOTHES.LIST, {
      params,
    });
  }

  public async deleteClothes(
    id: string,
  ): Promise<AxiosResponse<DeleteClothesResponse>> {
    return this.delete<DeleteClothesResponse>(API_ENDPOINTS.CLOTHES.DELETE(id));
  }

  // Upload API method
  public async uploadClothingImage(
    file: File | Blob,
    autoTag: boolean = true,
  ): Promise<AxiosResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('autoTag', String(autoTag));

    return this.post<UploadResponse>(API_ENDPOINTS.UPLOAD.IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new ApiService();
