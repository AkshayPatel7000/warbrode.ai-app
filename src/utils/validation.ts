/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  if (password.length > 50) {
    errors.push('Password must be less than 50 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate required field
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate form fields
 */
export const validateAuthForm = (
  data: {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
  },
  mode: 'login' | 'signup',
): {[key: string]: string} => {
  const errors: {[key: string]: string} = {};

  // Name validation (signup only)
  if (mode === 'signup' && data.name !== undefined) {
    const nameError = validateRequired(data.name, 'Name');
    if (nameError) errors.name = nameError;
  }

  // Email validation
  const emailError = validateRequired(data.email, 'Email');
  if (emailError) {
    errors.email = emailError;
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  const passwordError = validateRequired(data.password, 'Password');
  if (passwordError) {
    errors.password = passwordError;
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Confirm password validation (signup only)
  if (mode === 'signup' && data.confirmPassword !== undefined) {
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;
};
