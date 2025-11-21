# 📝 Quick Reference Cheat Sheet

## 🚀 Common Commands

```bash
# Start Metro
npm start

# Run Android
npm run android

# Run iOS
npm run ios

# Clear cache
npm start -- --reset-cache

# Run tests
npm test

# Lint code
npm run lint
```

## 📁 Import Paths

```tsx
// Components
import {Button} from './src/components';

// Screens
import HomeScreen from './src/screens/HomeScreen';

// Redux
import {useAppSelector, useAppDispatch} from './src/hooks/useRedux';
import {setUser} from './src/store/slices/userSlice';
import {setCredentials, logout} from './src/store/slices/authSlice';

// Services
import apiService from './src/services/api.service';
import storage from './src/utils/storage';

// Constants
import {COLORS, SPACING} from './src/constants/theme';
import {API_ENDPOINTS} from './src/constants/api';

// Utils
import {formatDate, truncateText} from './src/utils/helpers';

// Icons
import {Home, User, Settings, Search} from 'lucide-react-native';

// Env
import {API_BASE_URL} from '@env';

// Navigation
import {useNavigation} from '@react-navigation/native';
```

## 🎨 NativeWind Classes

```tsx
// Layout
className="flex-1 flex-row items-center justify-center"

// Spacing
className="p-4 px-6 py-8 m-4 mx-6 my-8"

// Colors
className="bg-primary-500 text-white"
className="bg-gray-100 text-gray-900"

// Typography
className="text-base text-lg text-xl text-2xl"
className="font-normal font-medium font-semibold font-bold"

// Borders
className="border border-2 border-gray-200 rounded-lg rounded-xl"

// Shadows (limited in RN)
className="shadow-sm shadow-md shadow-lg"
```

## 🔄 Redux Patterns

```tsx
// Read state
const user = useAppSelector(state => state.user.currentUser);
const isAuth = useAppSelector(state => state.auth.isAuthenticated);

// Dispatch actions
const dispatch = useAppDispatch();
dispatch(setUser({id: '1', name: 'John', email: 'john@example.com'}));
dispatch(logout());
```

## 🌐 API Calls

```tsx
// GET
const data = await apiService.get('/users');

// POST
const result = await apiService.post('/users', {name: 'John'});

// PUT
const updated = await apiService.put('/users/1', {name: 'Jane'});

// DELETE
await apiService.delete('/users/1');

// With error handling
try {
  const response = await apiService.get('/data');
  console.log(response.data);
} catch (error) {
  console.error('Error:', error);
}
```

## 🧭 Navigation

```tsx
// Navigate to screen
navigation.navigate('Home');
navigation.navigate('Profile', {userId: '123'});

// Go back
navigation.goBack();

// Reset navigation
navigation.reset({
  index: 0,
  routes: [{name: 'Home'}],
});
```

## 💾 Storage

```tsx
// Save
await storage.setItem('key', {data: 'value'});

// Get
const data = await storage.getItem('key');

// Remove
await storage.removeItem('key');

// Clear all
await storage.clear();
```

## 🎬 Moti Animations

```tsx
<MotiView
  from={{opacity: 0, translateY: 50}}
  animate={{opacity: 1, translateY: 0}}
  transition={{type: 'timing', duration: 500}}
>
  {children}
</MotiView>
```

## 🎭 Common Icons

```tsx
<Home size={24} color="#000" />
<User size={24} color="#000" />
<Settings size={24} color="#000" />
<Search size={24} color="#000" />
<ShoppingBag size={24} color="#000" />
<Heart size={24} color="#000" />
<Bell size={24} color="#000" />
<Menu size={24} color="#000" />
<X size={24} color="#000" />
<ChevronRight size={24} color="#000" />
```

## 📱 Common Components

```tsx
// Button
<Button
  title="Click Me"
  onPress={() => {}}
  variant="primary" // primary | secondary | outline
  loading={false}
  disabled={false}
/>

// View with styling
<View className="flex-1 bg-white p-4">
  <Text className="text-xl font-bold">Title</Text>
</View>

// ScrollView
<ScrollView className="flex-1">
  {content}
</ScrollView>

// TouchableOpacity
<TouchableOpacity
  onPress={() => {}}
  className="p-4 bg-primary-500 rounded-lg"
>
  <Text className="text-white">Press Me</Text>
</TouchableOpacity>
```

## 🎨 Color Palette

```tsx
// Primary (Blue)
primary-50 to primary-900

// Secondary (Purple)
secondary-50 to secondary-900

// Gray
gray-50 to gray-900

// Semantic
text-success  // Green
text-warning  // Orange
text-error    // Red
text-info     // Blue
```

## 🔧 Useful Utilities

```tsx
// Format date
formatDate(new Date()) // "November 21, 2025"

// Truncate text
truncateText("Long text...", 10) // "Long text..."

// Capitalize
capitalizeFirst("hello") // "Hello"

// Generate ID
generateId() // "a3f5k9p"

// Debounce
const debouncedFn = debounce(() => {}, 300);
```

## 🐛 Debug Tips

```tsx
// Log Redux state
console.log('State:', store.getState());

// Log API calls
console.log('API Response:', response.data);

// React Native Debugger
// Cmd+D (iOS) / Cmd+M (Android) -> Debug

// Check environment
console.log('ENV:', __DEV__ ? 'Development' : 'Production');
```
