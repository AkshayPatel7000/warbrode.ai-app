export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
  WARDROBE: {
    LIST: '/wardrobe',
    CREATE: '/wardrobe',
    UPDATE: (id: string) => `/wardrobe/${id}`,
    DELETE: (id: string) => `/wardrobe/${id}`,
  },
};
