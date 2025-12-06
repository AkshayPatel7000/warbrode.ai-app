// Authentication Types
export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
    token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    userId: string;
    email: string;
    token: string;
    refreshToken?: string;
  };
}

export interface DeviceTokenRequest {
  deviceToken: string;
  platform?: 'ios' | 'android';
}

export interface DeviceTokenResponse {
  success: boolean;
  message: string;
}

export interface UserPreferences {
  notifications?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  [key: string]: any;
}

export interface PreferencesResponse {
  success: boolean;
  data?: UserPreferences;
}

// Clothes Types
export interface ClothingItem {
  id: string;
  name: string;
  category?: string;
  color?: string;
  brand?: string;
  season?: string[];
  tags?: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClothesListResponse {
  success: boolean;
  data?: ClothingItem[];
  total?: number;
}

export interface DeleteClothesResponse {
  success: boolean;
  message: string;
}

// Upload Types
export interface UploadRequest {
  image: File | Blob;
  autoTag?: boolean;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    imageUrl: string;
    tags?: string[];
    category?: string;
    color?: string;
    aiSuggestions?: {
      category?: string;
      color?: string;
      season?: string[];
      style?: string[];
    };
  };
}

// Generic API Response
export interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

export type ApiResponse<T> = T | ApiError;
