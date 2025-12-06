/**
 * API Service Usage Examples
 *
 * This file demonstrates how to use the API service methods
 * based on the Swagger documentation at http://localhost:4000/api-docs/
 */

import ApiService from '../services/api.service';
import type {
  SignupRequest,
  LoginRequest,
  DeviceTokenRequest,
  UserPreferences,
} from '../types/api.types';

// ============================================
// AUTHENTICATION EXAMPLES
// ============================================

/**
 * Example: User Signup
 */
export const signupExample = async () => {
  try {
    const signupData: SignupRequest = {
      email: 'user@example.com',
      password: 'securePassword123',
      name: 'John Doe',
    };

    const response = await ApiService.signup(signupData);

    if (response.data.success) {
      console.log('Signup successful!');
      console.log('User ID:', response.data.data?.userId);
      console.log('Token:', response.data.data?.token);
      // Store token in Redux or AsyncStorage
    }
  } catch (error) {
    console.error('Signup failed:', error);
  }
};

/**
 * Example: User Login
 */
export const loginExample = async () => {
  try {
    const loginData: LoginRequest = {
      email: 'user@example.com',
      password: 'securePassword123',
    };

    const response = await ApiService.login(loginData);

    if (response.data.success) {
      console.log('Login successful!');
      console.log('Token:', response.data.data?.token);
      // Store token in Redux store
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

/**
 * Example: Register Device Token for Push Notifications
 */
export const registerDeviceTokenExample = async () => {
  try {
    const deviceData: DeviceTokenRequest = {
      deviceToken: 'fcm_token_here',
      platform: 'android', // or 'ios'
    };

    const response = await ApiService.registerDeviceToken(deviceData);

    if (response.data.success) {
      console.log('Device token registered successfully!');
    }
  } catch (error) {
    console.error('Device token registration failed:', error);
  }
};

/**
 * Example: Get User Preferences
 */
export const getPreferencesExample = async () => {
  try {
    const response = await ApiService.getPreferences();

    if (response.data.success) {
      console.log('User preferences:', response.data.data);
    }
  } catch (error) {
    console.error('Failed to get preferences:', error);
  }
};

/**
 * Example: Update User Preferences
 */
export const updatePreferencesExample = async () => {
  try {
    const preferences: Partial<UserPreferences> = {
      notifications: true,
      theme: 'dark',
      language: 'en',
    };

    const response = await ApiService.updatePreferences(preferences);

    if (response.data.success) {
      console.log('Preferences updated successfully!');
      console.log('Updated preferences:', response.data.data);
    }
  } catch (error) {
    console.error('Failed to update preferences:', error);
  }
};

// ============================================
// CLOTHES MANAGEMENT EXAMPLES
// ============================================

/**
 * Example: Get All Clothes
 */
export const getClothesExample = async () => {
  try {
    const response = await ApiService.getClothes();

    if (response.data.success) {
      console.log('Total clothes:', response.data.total);
      console.log('Clothes list:', response.data.data);

      // Iterate through clothes
      response.data.data?.forEach(item => {
        console.log(`${item.name} - ${item.category} - ${item.color}`);
      });
    }
  } catch (error) {
    console.error('Failed to get clothes:', error);
  }
};

/**
 * Example: Delete a Clothing Item
 */
export const deleteClothesExample = async (clothingId: string) => {
  try {
    const response = await ApiService.deleteClothes(clothingId);

    if (response.data.success) {
      console.log('Clothing item deleted successfully!');
      console.log('Message:', response.data.message);
    }
  } catch (error) {
    console.error('Failed to delete clothing item:', error);
  }
};

// ============================================
// UPLOAD EXAMPLES
// ============================================

/**
 * Example: Upload Clothing Image with AI Tagging
 * This example shows how to upload an image from a file picker
 */
export const uploadClothingImageExample = async (imageFile: File) => {
  try {
    const response = await ApiService.uploadClothingImage(imageFile, true);

    if (response.data.success) {
      console.log('Image uploaded successfully!');
      console.log('Image URL:', response.data.data?.imageUrl);
      console.log('AI Tags:', response.data.data?.tags);
      console.log('AI Category:', response.data.data?.aiSuggestions?.category);
      console.log('AI Color:', response.data.data?.aiSuggestions?.color);
      console.log('AI Season:', response.data.data?.aiSuggestions?.season);
      console.log('AI Style:', response.data.data?.aiSuggestions?.style);
    }
  } catch (error) {
    console.error('Failed to upload image:', error);
  }
};

/**
 * Example: Upload Image from React Native Image Picker
 */
export const uploadFromImagePickerExample = async () => {
  try {
    // This is a pseudo-code example for React Native
    // You would use react-native-image-picker or similar library
    /*
    import {launchImageLibrary} from 'react-native-image-picker';
    
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
        console.log('Upload successful!');
      }
    }
    */
  } catch (error) {
    console.error('Failed to upload from image picker:', error);
  }
};

// ============================================
// COMPLETE WORKFLOW EXAMPLE
// ============================================

/**
 * Example: Complete User Journey
 * This shows a typical flow from signup to uploading clothes
 */
export const completeWorkflowExample = async () => {
  try {
    // 1. Sign up
    const signupResponse = await ApiService.signup({
      email: 'newuser@example.com',
      password: 'password123',
      name: 'Jane Doe',
    });

    if (!signupResponse.data.success) {
      throw new Error('Signup failed');
    }

    const token = signupResponse.data.data?.token;
    // Store token in Redux store here

    // 2. Register device token for notifications
    await ApiService.registerDeviceToken({
      deviceToken: 'device_fcm_token',
      platform: 'android',
    });

    // 3. Set user preferences
    await ApiService.updatePreferences({
      notifications: true,
      theme: 'dark',
    });

    // 4. Get existing clothes
    const clothesResponse = await ApiService.getClothes();
    console.log('Existing clothes:', clothesResponse.data.data);

    // 5. Upload a new clothing item
    // const imageFile = ... get from file picker
    // const uploadResponse = await ApiService.uploadClothingImage(imageFile, true);

    console.log('Workflow completed successfully!');
  } catch (error) {
    console.error('Workflow failed:', error);
  }
};

// ============================================
// ERROR HANDLING EXAMPLE
// ============================================

/**
 * Example: Proper Error Handling
 */
export const errorHandlingExample = async () => {
  try {
    const response = await ApiService.login({
      email: 'user@example.com',
      password: 'wrongpassword',
    });

    if (response.data.success) {
      // Handle success
      console.log('Login successful');
    } else {
      // Handle API-level error
      console.error('Login failed:', response.data.message);
    }
  } catch (error: any) {
    // Handle network or other errors
    if (error.response) {
      // Server responded with error status
      console.error('Server error:', error.response.status);
      console.error('Error message:', error.response.data?.message);
    } else if (error.request) {
      // Request made but no response
      console.error('Network error: No response from server');
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
  }
};
