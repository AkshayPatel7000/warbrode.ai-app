/**
 * API Error Types
 *
 * Extended error types for API responses with user-friendly messages
 */

export interface ApiErrorExtended extends Error {
  // User-friendly error message (prioritizes backend message)
  userMessage?: string;

  // HTTP status code
  statusCode?: number;

  // Field-specific validation errors
  fieldErrors?: Record<string, string>;

  // Flag for network errors
  isNetworkError?: boolean;

  // Original axios response
  response?: {
    status: number;
    data: any;
    headers: any;
  };

  // Original axios request
  request?: any;

  // Original axios config
  config?: any;
}

/**
 * Type guard to check if error is an API error
 */
export const isApiError = (error: any): error is ApiErrorExtended => {
  return error && typeof error === 'object' && 'userMessage' in error;
};

/**
 * Type guard to check if error is a network error
 */
export const isNetworkError = (error: any): boolean => {
  return error?.isNetworkError === true || (!error?.response && error?.request);
};

/**
 * Type guard to check if error has field errors
 */
export const hasFieldErrors = (error: any): boolean => {
  return error?.fieldErrors && Object.keys(error.fieldErrors).length > 0;
};
