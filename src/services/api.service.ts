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
  ClothesListResponse,
  DeleteClothesResponse,
  UploadResponse,
} from '../types/api.types';

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

        return Promise.reject(error);
      },
    );
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

  // Clothes API methods
  public async getClothes(): Promise<AxiosResponse<ClothesListResponse>> {
    return this.get<ClothesListResponse>(API_ENDPOINTS.CLOTHES.LIST);
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
