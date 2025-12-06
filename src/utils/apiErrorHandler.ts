/**
 * API Error Handler Utility
 *
 * Centralized error handling for API responses
 * Use this to maintain consistent error handling across the app
 */

import { showErrorToast } from '../utils/toast';

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string>;
  statusCode?: number;
}

export interface ErrorHandlerOptions {
  setFieldError?: (field: string, message: string) => void;
  showToast?: boolean;
  customMessages?: Record<number, string>;
}

/**
 * Handle API errors consistently across the app
 *
 * @param error - The error object from axios
 * @param options - Configuration options for error handling
 * @returns User-friendly error message
 */
export const handleApiError = (
  error: any,
  options: ErrorHandlerOptions = {},
): string => {
  const { setFieldError, showToast = true, customMessages = {} } = options;

  let errorMessage = 'An unexpected error occurred';
  let errorTitle = 'Error';

  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data: ApiErrorResponse = error.response.data;

    // Use custom message if provided
    if (customMessages[status]) {
      errorMessage = customMessages[status];
    } else {
      // Default messages based on status code
      switch (status) {
        case 400:
          errorMessage =
            data?.message || 'Invalid input. Please check your details.';
          errorTitle = 'Invalid Input';
          // Handle field-specific errors
          if (setFieldError && data?.errors) {
            Object.keys(data.errors).forEach(field => {
              setFieldError(field, data.errors![field]);
            });
          }
          break;

        case 401:
          errorMessage = data?.message || 'Invalid credentials';
          errorTitle = 'Authentication Failed';
          break;

        case 403:
          errorMessage =
            data?.message ||
            'You do not have permission to perform this action';
          errorTitle = 'Access Denied';
          break;

        case 404:
          errorMessage =
            data?.message || 'The requested resource was not found';
          errorTitle = 'Not Found';
          break;

        case 409:
          errorMessage = data?.message || 'This resource already exists';
          errorTitle = 'Conflict';
          break;

        case 422:
          errorMessage =
            data?.message || 'Validation error. Please check your input.';
          errorTitle = 'Validation Error';
          break;

        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          errorTitle = 'Rate Limit Exceeded';
          break;

        case 500:
          errorMessage = 'Server error. Please try again later.';
          errorTitle = 'Server Error';
          break;

        case 503:
          errorMessage =
            'Service temporarily unavailable. Please try again later.';
          errorTitle = 'Service Unavailable';
          break;

        default:
          errorMessage =
            data?.message ||
            `Error ${status}: ${data?.error || 'Unknown error'}`;
          errorTitle = 'Error';
      }
    }
  } else if (error.request) {
    // Request made but no response
    errorMessage = 'Network error. Please check your internet connection.';
    errorTitle = 'Network Error';
  } else {
    // Other errors
    errorMessage = error.message || 'An unexpected error occurred';
    errorTitle = 'Error';
  }

  // Show toast if enabled
  if (showToast) {
    showErrorToast(errorTitle, errorMessage);
  }

  // Log error for debugging
  console.error('API Error:', {
    status: error.response?.status,
    message: errorMessage,
    data: error.response?.data,
    error,
  });

  return errorMessage;
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: any): boolean => {
  return !error.response && error.request;
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: any): boolean => {
  return error.response?.status === 401 || error.response?.status === 403;
};

/**
 * Check if error is a validation error
 */
export const isValidationError = (error: any): boolean => {
  return error.response?.status === 400 || error.response?.status === 422;
};

/**
 * Check if error is a server error
 */
export const isServerError = (error: any): boolean => {
  const status = error.response?.status;
  return status >= 500 && status < 600;
};

/**
 * Extract error message from error object
 */
export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

/**
 * HTTP Status Code Reference
 */
export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Example Usage:
 *
 * // Basic usage
 * try {
 *   const response = await ApiService.login(data);
 * } catch (error) {
 *   handleApiError(error);
 * }
 *
 * // With field errors
 * try {
 *   const response = await ApiService.signup(data);
 * } catch (error) {
 *   handleApiError(error, { setFieldError });
 * }
 *
 * // With custom messages
 * try {
 *   const response = await ApiService.deleteClothes(id);
 * } catch (error) {
 *   handleApiError(error, {
 *     customMessages: {
 *       404: 'This item no longer exists',
 *       403: 'You cannot delete this item',
 *     },
 *   });
 * }
 *
 * // Without toast
 * try {
 *   const response = await ApiService.getClothes();
 * } catch (error) {
 *   const message = handleApiError(error, { showToast: false });
 *   // Handle error message manually
 * }
 */
