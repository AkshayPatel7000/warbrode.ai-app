import Toast from 'react-native-toast-message';

/**
 * Toast Utility Helper
 * Provides convenient methods for showing toast notifications throughout the app
 */

export const showSuccessToast = (
  title: string,
  message?: string,
  duration: number = 3000,
) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    visibilityTime: duration,
  });
};

export const showErrorToast = (
  title: string,
  message?: string,
  duration: number = 4000,
) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    visibilityTime: duration,
  });
};

export const showInfoToast = (
  title: string,
  message?: string,
  duration: number = 3000,
) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    visibilityTime: duration,
  });
};

export const showWarningToast = (
  title: string,
  message?: string,
  duration: number = 3000,
) => {
  Toast.show({
    type: 'warning',
    text1: title,
    text2: message,
    visibilityTime: duration,
  });
};

/**
 * Hide the currently visible toast
 */
export const hideToast = () => {
  Toast.hide();
};

/**
 * Common toast messages for the app
 */
export const ToastMessages = {
  // Success messages
  SUCCESS: {
    PROFILE_UPDATED: {
      title: 'Success',
      message: 'Profile updated successfully',
    },
    PHOTO_UPDATED: {
      title: 'Photo Updated',
      message: 'Your profile photo has been updated',
    },
    SAVED: {
      title: 'Saved',
      message: 'Changes saved successfully',
    },
    UPLOADED: {
      title: 'Uploaded',
      message: 'File uploaded successfully',
    },
  },
  // Error messages
  ERROR: {
    GENERIC: {
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    },
    NETWORK: {
      title: 'Network Error',
      message: 'Please check your internet connection',
    },
    CAMERA: {
      title: 'Camera Error',
      message: 'Failed to access camera',
    },
    GALLERY: {
      title: 'Gallery Error',
      message: 'Failed to access gallery',
    },
    VALIDATION: {
      title: 'Validation Error',
      message: 'Please check your input and try again',
    },
  },
  // Info messages
  INFO: {
    LOADING: {
      title: 'Loading',
      message: 'Please wait...',
    },
    NO_CHANGES: {
      title: 'No Changes',
      message: 'No changes were made',
    },
  },
  // Warning messages
  WARNING: {
    UNSAVED_CHANGES: {
      title: 'Unsaved Changes',
      message: 'You have unsaved changes',
    },
  },
};
