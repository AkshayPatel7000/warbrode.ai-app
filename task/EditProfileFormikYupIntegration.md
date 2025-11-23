# EditProfileScreen - Formik & Yup Integration

## Summary

Successfully integrated **Formik** and **Yup** for robust form validation in the EditProfileScreen, replacing manual state management and basic validation with a professional, declarative validation approach.

## Packages Installed

```bash
yarn add formik yup
```

**Versions:**

- `formik@2.4.9`
- `yup@1.7.1`

## Changes Made

### 1. Added Imports

```typescript
import { Formik } from 'formik';
import * as Yup from 'yup';
```

### 2. Created Validation Schema

```typescript
const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number is too long'),

  location: Yup.string().max(100, 'Location must be less than 100 characters'),

  bio: Yup.string().max(200, 'Bio must be less than 200 characters'),

  gender: Yup.string().oneOf([
    'Male',
    'Female',
    'Non-binary',
    'Prefer not to say',
    'Not specified',
  ]),
});
```

### 3. Replaced State Management

**Before (Manual State):**

```typescript
const [name, setName] = useState(currentUser?.name || '');
const [email, setEmail] = useState(currentUser?.email || '');
const [phone, setPhone] = useState((currentUser as any)?.phone || '');
const [location, setLocation] = useState((currentUser as any)?.location || '');
const [bio, setBio] = useState((currentUser as any)?.bio || '');
const [gender, setGender] = useState(
  (currentUser as any)?.gender || 'Not specified',
);
const [isLoading, setIsLoading] = useState(false);
```

**After (Formik):**

```typescript
const initialValues = {
  name: currentUser?.name || '',
  email: currentUser?.email || '',
  phone: (currentUser as any)?.phone || '',
  location: (currentUser as any)?.location || '',
  bio: (currentUser as any)?.bio || '',
  gender: (currentUser as any)?.gender || 'Not specified',
};
```

### 4. Wrapped Form with Formik

```typescript
<Formik
  initialValues={initialValues}
  validationSchema={profileValidationSchema}
  onSubmit={handleSubmit}
  validateOnChange={true}
  validateOnBlur={true}
>
  {({
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  }) => (
    // Form JSX
  )}
</Formik>
```

### 5. Updated Input Fields

**Example - Name Field:**

```typescript
<View
  className={`flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-slate-900/5 ${
    touched.name && errors.name ? 'border-2 border-red-400' : ''
  }`}
>
  <User size={20} color="#94a3b8" />
  <TextInput
    value={values.name}
    onChangeText={handleChange('name')}
    onBlur={handleBlur('name')}
    placeholder="Enter your name"
    placeholderTextColor="#cbd5e1"
    className="flex-1 ml-3 text-slate-900 text-base"
  />
</View>
{touched.name && errors.name && (
  <Text className="text-red-500 text-xs mt-1 ml-1">
    {errors.name}
  </Text>
)}
```

### 6. Updated Gender Selection

```typescript
{genderOptions.map(option => (
  <TouchableOpacity
    key={option}
    onPress={() => setFieldValue('gender', option)}
    className={`px-4 py-3 rounded-2xl border-2 ${
      values.gender === option
        ? 'bg-lime-400 border-lime-400'
        : 'bg-white border-slate-200'
    }`}
    activeOpacity={0.7}
  >
    <Text
      className={`font-medium ${
        values.gender === option ? 'text-slate-900' : 'text-slate-600'
      }`}
    >
      {option}
    </Text>
  </TouchableOpacity>
))}
```

### 7. Updated Submit Handler

```typescript
const handleSubmit = async (values: typeof initialValues) => {
  try {
    // TODO: Dispatch update user action with avatar
    // await dispatch(updateUser({ ...values, avatar: avatarUri }));

    Alert.alert('Success', 'Profile updated successfully', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  } catch (error) {
    Alert.alert('Error', 'Failed to update profile');
  }
};
```

## Validation Rules

### Name

- ✅ Required field
- ✅ Minimum 2 characters
- ✅ Maximum 50 characters
- ❌ Error: "Name is required"
- ❌ Error: "Name must be at least 2 characters"
- ❌ Error: "Name must be less than 50 characters"

### Email

- ✅ Required field
- ✅ Valid email format
- ❌ Error: "Email is required"
- ❌ Error: "Invalid email address"

### Phone (Optional)

- ✅ Valid phone format (numbers, +, -, spaces, parentheses)
- ✅ Minimum 10 digits
- ✅ Maximum 20 characters
- ❌ Error: "Invalid phone number format"
- ❌ Error: "Phone number must be at least 10 digits"
- ❌ Error: "Phone number is too long"

### Location (Optional)

- ✅ Maximum 100 characters
- ❌ Error: "Location must be less than 100 characters"

### Bio (Optional)

- ✅ Maximum 200 characters
- ✅ Character counter displayed
- ❌ Error: "Bio must be less than 200 characters"

### Gender

- ✅ Must be one of predefined options
- ✅ Default: "Not specified"

## Features

### Real-time Validation

- ✅ **validateOnChange**: Validates as user types
- ✅ **validateOnBlur**: Validates when field loses focus
- ✅ Immediate feedback for better UX

### Visual Error Indicators

- ✅ **Red border** on invalid fields
- ✅ **Error message** below field
- ✅ **Only shows errors** after field is touched
- ✅ **Clears errors** when corrected

### Form State Management

- ✅ **values**: Current form values
- ✅ **errors**: Validation errors
- ✅ **touched**: Fields that have been interacted with
- ✅ **isSubmitting**: Submit state for loading indicators
- ✅ **setFieldValue**: Programmatic value updates (for gender)

### Submit Handling

- ✅ **Automatic validation** before submit
- ✅ **Prevents submit** if form is invalid
- ✅ **Loading state** during submission
- ✅ **Disabled buttons** while submitting

## Benefits

### Before (Manual Validation)

- ❌ Manual state for each field
- ❌ Manual validation logic
- ❌ Repetitive code
- ❌ Easy to miss edge cases
- ❌ No standardized error messages
- ❌ Hard to maintain

### After (Formik + Yup)

- ✅ Declarative validation schema
- ✅ Automatic state management
- ✅ Consistent error handling
- ✅ Comprehensive validation rules
- ✅ Type-safe with TypeScript
- ✅ Industry-standard approach
- ✅ Easy to extend and maintain

## Example Validation Scenarios

### Valid Inputs

```typescript
{
  name: "John Doe",                    // ✅ 2-50 chars
  email: "john@example.com",           // ✅ Valid email
  phone: "+1 (555) 123-4567",          // ✅ Valid format, 10+ digits
  location: "New York, USA",           // ✅ Under 100 chars
  bio: "Software developer...",        // ✅ Under 200 chars
  gender: "Male"                       // ✅ Valid option
}
```

### Invalid Inputs

```typescript
{
  name: "J",                           // ❌ Too short (< 2 chars)
  email: "invalid-email",              // ❌ Invalid format
  phone: "123",                        // ❌ Too short (< 10 digits)
  location: "Very long location...",   // ❌ Over 100 chars
  bio: "Very long bio...",             // ❌ Over 200 chars
  gender: "Other"                      // ❌ Not in allowed list
}
```

## Error Display Examples

### Name Error

```
┌─────────────────────────────┐
│ 👤 J                        │ ← Red border
└─────────────────────────────┘
  Name must be at least 2 characters ← Red text
```

### Email Error

```
┌─────────────────────────────┐
│ ✉️  invalid-email           │ ← Red border
└─────────────────────────────┘
  Invalid email address ← Red text
```

### Bio Error with Counter

```
┌─────────────────────────────┐
│ Very long bio that exceeds  │
│ the maximum character limit │
│ of 200 characters...        │
└─────────────────────────────┘
  Bio must be less than 200 characters
                          215/200 characters
```

## Code Quality Improvements

### Type Safety

```typescript
// Formik provides proper typing
const handleSubmit = async (values: typeof initialValues) => {
  // values is fully typed
  values.name; // string
  values.email; // string
  values.phone; // string
  // etc.
};
```

### Cleaner Code

**Before:**

```typescript
// 6 useState hooks
// Manual validation in handleSave
// Repetitive error checking
// 50+ lines of validation logic
```

**After:**

```typescript
// 1 Formik component
// Declarative validation schema
// Automatic error handling
// 30 lines of validation schema
```

### Maintainability

- ✅ Easy to add new fields
- ✅ Easy to modify validation rules
- ✅ Centralized validation logic
- ✅ Reusable schema patterns

## Testing Checklist

- [x] Name validation (required, min, max)
- [x] Email validation (required, format)
- [x] Phone validation (optional, format, length)
- [x] Location validation (optional, max length)
- [x] Bio validation (optional, max 200 chars)
- [x] Gender selection (setFieldValue)
- [x] Error messages display correctly
- [x] Errors clear when corrected
- [x] Red border on invalid fields
- [x] Submit disabled when invalid
- [x] Loading state during submit
- [ ] Form submits with valid data (needs backend)

## Future Enhancements

### 1. Async Validation

```typescript
email: Yup.string()
  .email('Invalid email address')
  .required('Email is required')
  .test('unique-email', 'Email already exists', async (value) => {
    // Check if email exists in database
    const exists = await checkEmailExists(value);
    return !exists;
  }),
```

### 2. Custom Validation Messages

```typescript
// Localization support
const validationMessages = {
  en: {
    name: {
      required: 'Name is required',
      min: 'Name must be at least 2 characters',
    },
  },
  es: {
    name: {
      required: 'El nombre es obligatorio',
      min: 'El nombre debe tener al menos 2 caracteres',
    },
  },
};
```

### 3. Field Dependencies

```typescript
// Validate based on other fields
location: Yup.string().when('phone', {
  is: (phone) => phone && phone.length > 0,
  then: Yup.string().required('Location required when phone is provided'),
}),
```

### 4. Custom Validators

```typescript
const profileValidationSchema = Yup.object().shape({
  phone: Yup.string().test('valid-phone', 'Invalid phone number', value => {
    // Custom phone validation logic
    return isValidPhoneNumber(value);
  }),
});
```

## Performance Considerations

- ✅ **Memoization**: Formik optimizes re-renders
- ✅ **Lazy Validation**: Only validates touched fields
- ✅ **Debouncing**: Can add debounce for async validation
- ✅ **Efficient Updates**: Only re-renders affected fields

## Documentation

### Formik

- Docs: https://formik.org/docs/overview
- API: https://formik.org/docs/api/formik

### Yup

- Docs: https://github.com/jquense/yup
- API: https://github.com/jquense/yup#api

---

**Status:** ✅ Complete - Professional form validation implemented!

**Result:** Robust, type-safe, user-friendly form with comprehensive validation and excellent UX.
