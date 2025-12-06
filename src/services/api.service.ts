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
  ClothingAttributesResponse,
  UploadResponse,
  UploadStatusResponse,
  UploadHistoryParams,
  UploadHistoryResponse,
  UpdateClothingRequest,
  UpdateClothingResponse,
  OutfitGenerateParams,
  OutfitGenerateResponse,
  OutfitHistoryParams,
  OutfitHistoryResponse,
  MarkOutfitWornResponse,
} from '../types/api.types';
import type { ApiErrorExtended } from '../types/error.types';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
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

        // Remove Content-Type for FormData to let axios set it with boundary
        if (config.data instanceof FormData && config.headers) {
          console.log('🔍 FormData detected, removing Content-Type header');
          console.log('📋 Request URL:', config.url);
          console.log('📋 Base URL:', config.baseURL);
          console.log(
            '📋 Headers before:',
            JSON.stringify(config.headers, null, 2),
          );
          delete config.headers['Content-Type'];
          console.log(
            '📋 Headers after:',
            JSON.stringify(config.headers, null, 2),
          );
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
  public async getDashboard(params?: {
    lat?: number;
    lon?: number;
  }): Promise<AxiosResponse<DashboardResponse>> {
    return this.get<DashboardResponse>(API_ENDPOINTS.HOME.DASHBOARD, {
      params,
    });
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

  public async updateClothingItem(
    id: string,
    data: UpdateClothingRequest,
  ): Promise<AxiosResponse<UpdateClothingResponse>> {
    return this.patch<UpdateClothingResponse>(
      API_ENDPOINTS.CLOTHES.UPDATE(id),
      data,
    );
  }

  public async getClothingAttributes(
    gender?: string | null,
  ): Promise<AxiosResponse<ClothingAttributesResponse>> {
    return this.get<ClothingAttributesResponse>(
      API_ENDPOINTS.CLOTHES.ATTRIBUTES,
      {
        params: gender ? { gender } : undefined,
      },
    );
  }

  // Upload API methods
  public async uploadClothingImage(
    formData: FormData,
  ): Promise<AxiosResponse<UploadResponse>> {
    // Don't set Content-Type manually - axios will set it with the correct boundary
    // Use transformRequest to ensure FormData is handled correctly in React Native
    return this.post<UploadResponse>(API_ENDPOINTS.UPLOAD.IMAGE, formData, {
      timeout: 60000, // 60 seconds for file upload
      transformRequest: (data, headers) => {
        // Return data as-is for FormData
        return data;
      },
    });
  }

  /**
   * Alternative upload method using react-native-blob-util
   * More reliable for React Native file uploads
   */
  public async uploadClothingImageWithBlob(
    imageUri: string,
    fileName: string = 'clothing.jpg',
  ): Promise<UploadResponse> {
    const ReactNativeBlobUtil = require('react-native-blob-util').default;
    const state = store.getState();
    const token = state.auth.token;

    // Remove file:// prefix if present
    const cleanUri = imageUri.replace('file://', '');

    console.log('🔧 Blob upload starting...');
    console.log(
      '📍 URL:',
      `${this.axiosInstance.defaults.baseURL}${API_ENDPOINTS.UPLOAD.IMAGE}`,
    );
    console.log('📁 File URI:', cleanUri);

    try {
      const response = await ReactNativeBlobUtil.fetch(
        'POST',
        `${this.axiosInstance.defaults.baseURL}${API_ENDPOINTS.UPLOAD.IMAGE}`,
        {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'image',
            filename: fileName,
            type: 'image/jpeg',
            data: ReactNativeBlobUtil.wrap(cleanUri),
          },
        ],
      );

      const statusCode = response.info().status;
      console.log('📊 Response status:', statusCode);

      // Check status code first (200, 201, 202 are all valid for uploads)
      // 202 = Accepted (async processing)
      if (statusCode !== 200 && statusCode !== 201 && statusCode !== 202) {
        const errorText = response.text();
        console.error('❌ Upload failed with status:', statusCode, errorText);
        throw new Error(
          `Upload failed with status ${statusCode}: ${errorText}`,
        );
      }

      // Parse JSON response
      const jsonResponse = response.json();
      console.log('✅ Blob upload successful:', jsonResponse);

      return jsonResponse;
    } catch (error: any) {
      console.error('❌ Blob upload error:', error);
      throw this.transformError(error);
    }
  }

  public async getUploadStatus(
    uploadId: string,
  ): Promise<AxiosResponse<UploadStatusResponse>> {
    return this.get<UploadStatusResponse>(
      API_ENDPOINTS.UPLOAD.STATUS(uploadId),
    );
  }

  public async getUploadHistory(
    params?: UploadHistoryParams,
  ): Promise<AxiosResponse<UploadHistoryResponse>> {
    return this.get<UploadHistoryResponse>(API_ENDPOINTS.UPLOAD.HISTORY, {
      params,
    });
  }

  // Outfit API methods
  public async generateOutfits(
    params?: OutfitGenerateParams,
  ): Promise<AxiosResponse<OutfitGenerateResponse>> {
    return this.get<OutfitGenerateResponse>(API_ENDPOINTS.OUTFITS.GENERATE, {
      params,
    });
  }

  public async getOutfitHistory(
    params?: OutfitHistoryParams,
  ): Promise<AxiosResponse<OutfitHistoryResponse>> {
    return this.get<OutfitHistoryResponse>(API_ENDPOINTS.OUTFITS.HISTORY, {
      params,
    });
  }

  public async markOutfitAsWorn(
    id: string,
  ): Promise<AxiosResponse<MarkOutfitWornResponse>> {
    return this.patch<MarkOutfitWornResponse>(
      API_ENDPOINTS.OUTFITS.MARK_WORN(id),
      {},
    );
  }
}

export default new ApiService();
