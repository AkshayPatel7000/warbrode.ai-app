// Authentication Types
export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: {
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
    token: string;
    userId: string;
    email: string;
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

// Clothes Types - See updated types below in Home/Dashboard section

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

// Home/Dashboard Types
export interface TodayOutfit {
  id: string;
  previewImage: string;
  score: number; // AI confidence score (0-100)
  aiReason: string;
}

export interface Weather {
  tempC: number;
  precipitation: number;
}

export interface WardrobeStats {
  tops: number;
  bottoms: number;
  footwear: number;
  total: number;
}

export interface QuickAction {
  label: string;
  icon: string;
}

export interface DashboardResponse {
  user: {
    name: string;
    avatar: string | null;
  };
  todayOutfit: TodayOutfit | null;
  weather: Weather | null;
  wardrobeStats: WardrobeStats;
  quickActions: QuickAction[];
  aiTip: string;
}

// Updated Clothes Types based on Swagger
export interface ClothingItem {
  _id: string;
  type: string;
  colorHex: string;
  pattern: string;
  tags: string[];
  isDirty: boolean;
  imageUrl: string;
  createdAt: string;
}

export interface ClothesListParams {
  page?: number;
  limit?: number;
  type?: string;
  color?: string;
  pattern?: string;
  dirty?: boolean;
  tags?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface ClothesListResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  filtersApplied: Record<string, any>;
  items: ClothingItem[];
}

// Generic API Response
export interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

export type ApiResponse<T> = T | ApiError;
