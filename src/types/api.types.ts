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

export interface GoogleLoginRequest {
  idToken: string;
  email: string;
  name?: string;
  photoURL?: string;
}

export interface GoogleLoginResponse {
  success: boolean;
  message: string;
  user?: {
    token: string;
    userId: string;
    email: string;
    name?: string;
    refreshToken?: string;
    isNewUser: boolean;
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

// Clothing Attributes Types
export interface ClothingAttributesResponse {
  data: {
    types: string[];
    patterns: string[];
    tags: string[];
  };
}

// Clothes Types - See updated types below in Home/Dashboard section

export interface DeleteClothesResponse {
  success: boolean;
  message: string;
}

// Upload Types
export interface UploadRequest {
  image: File | Blob;
}

export interface UploadResponse {
  message: string;
  uploadId: string;
  status: 'pending';
  uploadedAt: string;
}

export interface UploadStatusResponse {
  success: boolean;
  data: {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    uploadedAt: string;
    processedAt?: string | null;
    processedData?: {
      type: string;
      colorHex: string;
      pattern: string;
      tags: string[];
      gender: string | null;
    } | null;
    error?: string | null;
  };
}

export interface UploadHistoryParams {
  page?: number;
  limit?: number;
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'all';
  sort?: 'newest' | 'oldest';
}

export interface UploadHistoryResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  uploads: Array<{
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    uploadedAt: string;
    processedAt?: string;
    imageUrl: string;
    processedData?: {
      type: string;
      colorHex: string;
      pattern: string;
      tags: string[];
      gender: string | null;
    };
  }>;
}

// Outfit Types
export interface OutfitGenerateParams {
  limit?: number;
  preview?: boolean;
  lat?: number;
  lon?: number;
}

export interface OutfitItem {
  _id: string;
  userId: string;
  items: any[]; // Array of clothing item IDs
  styleType: string;
  explanation?: string;
  previewPath?: string | null;
  weather?: {
    temp: number;
    rainChance: number;
  };
  worn?: boolean;
  wornAt?: string;
  generatedAt: string;
}

export interface OutfitGenerateResponse {
  message: string;
  outfits: OutfitItem[];
}

export interface OutfitHistoryParams {
  page?: number;
  limit?: number;
  worn?: boolean;
}

export interface OutfitHistoryResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: OutfitItem[];
}

export interface MarkOutfitWornResponse {
  message: string;
  outfit: {
    _id: string;
    userId: string;
    worn: boolean;
    wornAt: string;
  };
}

// Clothes Update Types
export interface UpdateClothingRequest {
  type?: string;
  colorHex?: string;
  pattern?: string;
  tags?: string[];
}

export interface UpdateClothingResponse {
  message: string;
  data: {
    _id: string;
    userId: string;
    type: string;
    colorHex: string;
    pattern: string;
    tags: string[];
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
  filePath: string;
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
