export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/v1/auth/signup',
    LOGIN: '/v1/auth/login',
    DEVICE_TOKEN: '/v1/auth/device-token',
    PREFERENCES: '/v1/auth/preferences',
  },
  HOME: {
    DASHBOARD: '/v1/home',
  },
  CLOTHES: {
    LIST: '/v1/clothes',
    DELETE: (id: string) => `/v1/clothes/${id}`,
    UPDATE: (id: string) => `/v1/clothes/${id}`,
    ATTRIBUTES: '/v1/clothes/attributes',
  },
  UPLOAD: {
    IMAGE: '/v1/upload',
    STATUS: (uploadId: string) => `/v1/upload/status/${uploadId}`,
    HISTORY: '/v1/upload/history',
  },
  OUTFITS: {
    GENERATE: '/v1/outfits/generate',
    HISTORY: '/v1/outfits/history',
    MARK_WORN: (id: string) => `/v1/outfits/${id}/worn`,
  },
};
