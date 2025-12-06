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
  },
  UPLOAD: {
    IMAGE: '/v1/upload',
  },
};
