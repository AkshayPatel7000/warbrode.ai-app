# Toast Implementation Guide

## Overview

`react-native-toast-message` has been successfully integrated into the WardrobeAI app with custom styling that matches the app's design system.

## Installation

✅ Already installed: `react-native-toast-message@^2.3.3`

## Setup

The Toast component is configured in `App.tsx` as the last child in the component hierarchy with custom styling.

## Usage

### Method 1: Direct Import (Anywhere in the app)

```tsx
import Toast from 'react-native-toast-message';

// Success toast
Toast.show({
  type: 'success',
  text1: 'Success',
  text2: 'Operation completed successfully',
  visibilityTime: 3000,
});

// Error toast
Toast.show({
  type: 'error',
  text1: 'Error',
  text2: 'Something went wrong',
});

// Info toast
Toast.show({
  type: 'info',
  text1: 'Info',
  text2: 'This is an informational message',
});

// Warning toast
Toast.show({
  type: 'warning',
  text1: 'Warning',
  text2: 'Please be careful',
});
```

### Method 2: Using Helper Functions (Recommended)

```tsx
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
} from '@/utils/toast';

// Success
showSuccessToast('Success', 'Profile updated successfully');

// Error
showErrorToast('Error', 'Failed to update profile');

// Info
showInfoToast('Info', 'Please check your email');

// Warning
showWarningToast('Warning', 'You have unsaved changes');
```

### Method 3: Using Predefined Messages

```tsx
import { showSuccessToast, showErrorToast, ToastMessages } from '@/utils/toast';

// Using predefined messages
showSuccessToast(
  ToastMessages.SUCCESS.PROFILE_UPDATED.title,
  ToastMessages.SUCCESS.PROFILE_UPDATED.message,
);

showErrorToast(
  ToastMessages.ERROR.NETWORK.title,
  ToastMessages.ERROR.NETWORK.message,
);
```

## Advanced Options

### Auto-hide with Callback

```tsx
Toast.show({
  type: 'success',
  text1: 'Success',
  text2: 'Profile updated',
  visibilityTime: 2000,
  onHide: () => {
    // Navigate or perform action after toast hides
    navigation.goBack();
  },
});
```

### Manual Hide

```tsx
import { hideToast } from '@/utils/toast';

// Hide the currently visible toast
hideToast();
```

### Custom Position

```tsx
Toast.show({
  type: 'success',
  text1: 'Success',
  text2: 'Operation completed',
  position: 'bottom', // 'top' | 'bottom'
  visibilityTime: 3000,
});
```

### Auto-hide Disabled

```tsx
Toast.show({
  type: 'info',
  text1: 'Loading',
  text2: 'Please wait...',
  autoHide: false, // Toast won't auto-hide
});

// Later, manually hide it
Toast.hide();
```

## Custom Styling

Custom toast configurations are defined in `src/config/toastConfig.tsx` with:

- Premium rounded corners (16px)
- Custom icons from lucide-react-native
- Color-coded left borders
- Smooth shadows
- Consistent typography

### Toast Types & Colors

- **Success**: Lime green (#a3e635) - CheckCircle icon
- **Error**: Red (#ef4444) - XCircle icon
- **Info**: Blue (#3b82f6) - Info icon
- **Warning**: Amber (#f59e0b) - AlertCircle icon

## Examples in the App

### EditProfileScreen

```tsx
// Success with navigation callback
Toast.show({
  type: 'success',
  text1: 'Success',
  text2: 'Profile updated successfully',
  visibilityTime: 2000,
  onHide: () => navigation.goBack(),
});

// Error handling
Toast.show({
  type: 'error',
  text1: 'Error',
  text2: 'Failed to update profile',
});

// Photo upload success
Toast.show({
  type: 'success',
  text1: 'Photo Updated',
  text2: 'Your profile photo has been updated',
  visibilityTime: 2000,
});
```

## Best Practices

1. **Use appropriate toast types**
   - Success: For completed actions
   - Error: For failures and errors
   - Info: For informational messages
   - Warning: For cautionary messages

2. **Keep messages concise**
   - text1: Short title (1-3 words)
   - text2: Brief description (1 sentence)

3. **Set appropriate durations**
   - Success: 2000-3000ms
   - Error: 3000-4000ms (users need more time to read errors)
   - Info: 3000ms
   - Warning: 3000-4000ms

4. **Use callbacks wisely**
   - Use `onHide` for navigation or cleanup
   - Use `onShow` for analytics or logging

5. **Avoid toast spam**
   - Don't show multiple toasts rapidly
   - Hide previous toast before showing a new one if needed

## Files Modified/Created

### Created:

- `src/config/toastConfig.tsx` - Custom toast styling
- `src/utils/toast.ts` - Helper functions and predefined messages
- `docs/TOAST_GUIDE.md` - This documentation

### Modified:

- `App.tsx` - Added Toast component with custom config
- `src/screens/EditProfileScreen.tsx` - Replaced Alert with Toast

## Resources

- [Official Documentation](https://github.com/calintamas/react-native-toast-message)
- [API Reference](https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/api.md)
- [Custom Layouts](https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/custom-layouts.md)
