# Wardrobe.AI API Integration

This document describes the API integration for the Wardrobe.AI mobile application based on the Swagger documentation available at `http://localhost:4000/api-docs/`.

## 📁 File Structure

```
src/
├── constants/
│   └── api.ts                 # API endpoint constants
├── services/
│   ├── api.service.ts         # Main API service with typed methods
│   └── api.examples.ts        # Usage examples for all endpoints
└── types/
    └── api.types.ts           # TypeScript types for API requests/responses
```

## 🔐 Authentication

The API service automatically handles authentication by:

- Reading the auth token from Redux store
- Adding `Authorization: Bearer <token>` header to all requests
- Handling 401 unauthorized responses

## 📡 Available Endpoints

### Authentication (`/v1/auth`)

| Method | Endpoint                | Description                                  |
| ------ | ----------------------- | -------------------------------------------- |
| POST   | `/v1/auth/signup`       | Register a new user                          |
| POST   | `/v1/auth/login`        | Login with email and password                |
| POST   | `/v1/auth/device-token` | Register device token for push notifications |
| GET    | `/v1/auth/preferences`  | Get user preferences                         |
| PATCH  | `/v1/auth/preferences`  | Update user preferences                      |

### Clothes Management (`/v1/clothes`)

| Method | Endpoint           | Description                     |
| ------ | ------------------ | ------------------------------- |
| GET    | `/v1/clothes`      | Get all clothing items          |
| DELETE | `/v1/clothes/{id}` | Delete a specific clothing item |

### Upload (`/v1/upload`)

| Method | Endpoint     | Description                           |
| ------ | ------------ | ------------------------------------- |
| POST   | `/v1/upload` | Upload clothing image with AI tagging |

## 🚀 Usage Examples

### 1. User Signup

```typescript
import ApiService from './services/api.service';

const handleSignup = async () => {
  try {
    const response = await ApiService.signup({
      email: 'user@example.com',
      password: 'securePassword123',
      name: 'John Doe',
    });

    if (response.data.success) {
      const { userId, token } = response.data.data;
      // Store token in Redux
    }
  } catch (error) {
    console.error('Signup failed:', error);
  }
};
```

### 2. User Login

```typescript
const handleLogin = async () => {
  try {
    const response = await ApiService.login({
      email: 'user@example.com',
      password: 'securePassword123',
    });

    if (response.data.success) {
      const { token } = response.data.data;
      // Store token in Redux
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 3. Get Clothes List

```typescript
const fetchClothes = async () => {
  try {
    const response = await ApiService.getClothes();

    if (response.data.success) {
      const clothes = response.data.data;
      console.log('Total items:', response.data.total);
      // Update UI with clothes list
    }
  } catch (error) {
    console.error('Failed to fetch clothes:', error);
  }
};
```

### 4. Upload Clothing Image

```typescript
import { launchImageLibrary } from 'react-native-image-picker';

const handleImageUpload = async () => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]) {
      const file = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      };

      const response = await ApiService.uploadClothingImage(file as any, true);

      if (response.data.success) {
        const { imageUrl, tags, aiSuggestions } = response.data.data;
        console.log('AI detected category:', aiSuggestions?.category);
        console.log('AI detected color:', aiSuggestions?.color);
        console.log('AI suggested tags:', tags);
      }
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### 5. Delete Clothing Item

```typescript
const handleDelete = async (clothingId: string) => {
  try {
    const response = await ApiService.deleteClothes(clothingId);

    if (response.data.success) {
      console.log('Item deleted successfully');
      // Refresh clothes list
    }
  } catch (error) {
    console.error('Delete failed:', error);
  }
};
```

### 6. Manage User Preferences

```typescript
// Get preferences
const getPreferences = async () => {
  try {
    const response = await ApiService.getPreferences();

    if (response.data.success) {
      const preferences = response.data.data;
      console.log('User preferences:', preferences);
    }
  } catch (error) {
    console.error('Failed to get preferences:', error);
  }
};

// Update preferences
const updatePreferences = async () => {
  try {
    const response = await ApiService.updatePreferences({
      notifications: true,
      theme: 'dark',
      language: 'en',
    });

    if (response.data.success) {
      console.log('Preferences updated');
    }
  } catch (error) {
    console.error('Failed to update preferences:', error);
  }
};
```

### 7. Register Device Token

```typescript
import messaging from '@react-native-firebase/messaging';

const registerForPushNotifications = async () => {
  try {
    const fcmToken = await messaging().getToken();

    const response = await ApiService.registerDeviceToken({
      deviceToken: fcmToken,
      platform: Platform.OS === 'ios' ? 'ios' : 'android',
    });

    if (response.data.success) {
      console.log('Device token registered');
    }
  } catch (error) {
    console.error('Failed to register device token:', error);
  }
};
```

## 🛡️ Error Handling

All API methods return typed responses. Always check for success and handle errors:

```typescript
try {
  const response = await ApiService.login(credentials);

  if (response.data.success) {
    // Handle success
  } else {
    // Handle API-level error
    console.error('API Error:', response.data.message);
  }
} catch (error: any) {
  if (error.response) {
    // Server responded with error status
    console.error('Status:', error.response.status);
    console.error('Message:', error.response.data?.message);
  } else if (error.request) {
    // No response from server
    console.error('Network error');
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

## 🔧 Configuration

Make sure to set the following environment variables in your `.env` file:

```env
API_BASE_URL=http://localhost:4000
API_TIMEOUT=30000
```

## 📝 TypeScript Types

All API requests and responses are fully typed. Import types from:

```typescript
import type {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  ClothingItem,
  UserPreferences,
  // ... and more
} from './types/api.types';
```

## 🔄 Interceptors

The API service includes:

1. **Request Interceptor**: Automatically adds auth token to headers
2. **Response Interceptor**: Handles 401 errors and token refresh logic

## 📚 Additional Resources

- **Swagger Documentation**: http://localhost:4000/api-docs/
- **API Examples**: See `src/services/api.examples.ts`
- **Type Definitions**: See `src/types/api.types.ts`

## 🎯 Next Steps

1. Update your Redux store to handle auth tokens
2. Implement token refresh logic in the response interceptor
3. Create React hooks for common API operations
4. Add loading states and error handling in your components
5. Implement offline support with AsyncStorage

## 📞 Support

For API-related issues, check the Swagger documentation or contact the backend team.
