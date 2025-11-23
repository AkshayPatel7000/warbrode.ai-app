# AuthScreen Refactor Summary

## ✅ Objective

Refactor the `AuthScreen` to use **Formik** for form management and validation, and **react-native-toast-message** for user feedback, replacing manual state and alerts.

## 🛠 Changes Implemented

### 1. Form Management with Formik

- **Removed**: Manual state variables (`name`, `email`, `password`, `confirmPassword`, `errors`) and manual validation logic.
- **Added**: `<Formik>` wrapper handling all form state and submission.
- **Dynamic Initial Values**: Form values reset automatically when switching between Login and Signup modes.

### 2. Validation with Yup

- **Login Schema**: Validates email format and password presence.
- **Signup Schema**: Validates name, email, password length (min 6), and password confirmation match.
- **Real-time Feedback**: Errors are displayed immediately upon interaction (touched) or submission.

### 3. Enhanced User Feedback (Toast)

- **Success**: Shows "Welcome back" or "Account Created" toasts upon successful submission.
- **Error**: Shows "Authentication Failed" toast if the simulated API call fails.
- **Replaced**: Removed all `Alert.alert` calls in favor of non-blocking toasts.

### 4. Code Quality

- **Cleaner Component**: Reduced component complexity by offloading form logic to Formik.
- **Type Safety**: Improved type usage for navigation and form values.
- **Maintainability**: Validation rules are now centralized in schemas, making them easier to update.

## 🚀 How to Test

1.  **Login Flow**:
    - Enter invalid email -> See error.
    - Enter valid credentials -> Click Login -> See Success Toast -> Navigate to Home.
2.  **Signup Flow**:
    - Switch to Signup.
    - Enter mismatched passwords -> See error.
    - Enter valid details -> Click Sign Up -> See Success Toast -> Navigate to Home.
