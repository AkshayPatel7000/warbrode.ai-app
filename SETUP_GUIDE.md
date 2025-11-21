# 🚀 WardrobeAI - Complete Setup Guide

## ✅ Installation Complete!

All necessary packages have been installed and the project structure has been set up. Here's what was configured:

## 📦 Installed Packages

### Core Dependencies
- ✅ React Navigation (Native Stack + Bottom Tabs)
- ✅ Redux Toolkit + Redux Persist
- ✅ Axios (HTTP Client)
- ✅ AsyncStorage (Local Storage)
- ✅ NativeWind (TailwindCSS for RN)
- ✅ Lucide Icons
- ✅ Lottie + Moti (Animations)
- ✅ React Native Reanimated
- ✅ React Native Gesture Handler
- ✅ React Native SVG
- ✅ React Native Dotenv

## 📁 Project Structure Created

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Sample button component
│   └── index.ts        # Component exports
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   ├── ExploreScreen.tsx
│   ├── WardrobeScreen.tsx
│   └── ProfileScreen.tsx
├── navigation/         # Navigation setup
│   ├── RootNavigator.tsx
│   ├── BottomTabNavigator.tsx
│   └── types.ts
├── store/             # Redux store
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       └── userSlice.ts
├── services/          # API services
│   └── api.service.ts
├── utils/            # Utility functions
│   ├── helpers.ts
│   └── storage.ts
├── hooks/            # Custom hooks
│   └── useRedux.ts
├── constants/        # App constants
│   ├── theme.ts
│   └── api.ts
├── types/           # TypeScript types
│   ├── env.d.ts
│   └── nativewind.d.ts
└── assets/          # Static assets
    ├── images/
    ├── animations/
    └── fonts/
```

## 🔧 Configuration Files Created

- ✅ `tailwind.config.js` - TailwindCSS configuration
- ✅ `babel.config.js` - Updated with NativeWind & dotenv
- ✅ `.env` - Environment variables
- ✅ `.env.example` - Environment template
- ✅ `tsconfig.json` - Updated TypeScript config
- ✅ `.gitignore` - Updated to exclude .env

## 🎯 Next Steps

### 1. Install iOS Dependencies (iOS only)
```bash
cd ios && pod install && cd ..
```

### 2. Start Metro Bundler
```bash
npm start
```

### 3. Run the App

**For Android:**
```bash
npm run android
```

**For iOS:**
```bash
npm run ios
```

## 🎨 Using NativeWind

NativeWind is configured and ready to use. Use the `className` prop:

```tsx
import {View, Text} from 'react-native';

<View className="flex-1 bg-white p-6">
  <Text className="text-2xl font-bold text-gray-900">
    Hello World
  </Text>
</View>
```

## 🔄 Using Redux

### Import hooks:
```tsx
import {useAppSelector, useAppDispatch} from './src/hooks/useRedux';
import {setUser} from './src/store/slices/userSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.currentUser);
  
  const handleUpdate = () => {
    dispatch(setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    }));
  };
};
```

## 🌐 Making API Calls

```tsx
import apiService from './src/services/api.service';

const fetchData = async () => {
  try {
    const response = await apiService.get('/endpoint');
    console.log(response.data);
  } catch (error) {
    console.error('API Error:', error);
  }
};
```

## 🧭 Navigation

The app has a bottom tab navigator with 4 screens:
- Home
- Explore
- Wardrobe
- Profile

To navigate:
```tsx
import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation();
navigation.navigate('Profile');
```

## 🎭 Using Icons

```tsx
import {Home, User, Settings} from 'lucide-react-native';

<Home color="#0ea5e9" size={24} />
<User color="#64748b" size={20} />
```

## 🎬 Animations

### Moti (Simple animations):
```tsx
import {MotiView} from 'moti';

<MotiView
  from={{opacity: 0, scale: 0.9}}
  animate={{opacity: 1, scale: 1}}
  transition={{type: 'timing', duration: 500}}
>
  <Text>Animated Content</Text>
</MotiView>
```

### Lottie (JSON animations):
```tsx
import LottieView from 'lottie-react-native';

<LottieView
  source={require('./assets/animations/loading.json')}
  autoPlay
  loop
  style={{width: 100, height: 100}}
/>
```

## 🔐 Environment Variables

Update `.env` with your configuration:
```env
API_BASE_URL=https://your-api.com
API_TIMEOUT=30000
APP_NAME=WardrobeAI
DEBUG_MODE=true
```

Access in code:
```tsx
import {API_BASE_URL} from '@env';

console.log(API_BASE_URL);
```

## 🎨 Theme System

Colors and constants are defined in `src/constants/theme.ts`:

```tsx
import {COLORS, SPACING, FONT_SIZES} from './src/constants/theme';

const styles = {
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.primary[500],
  }
};
```

## 📱 Sample Component Usage

A Button component has been created as an example:

```tsx
import {Button} from './src/components';

<Button
  title="Click Me"
  onPress={() => console.log('Pressed!')}
  variant="primary"
  loading={false}
/>
```

## 🐛 Troubleshooting

### Clear Cache
```bash
npm start -- --reset-cache
```

### Clean Build (Android)
```bash
cd android && ./gradlew clean && cd ..
```

### Clean Build (iOS)
```bash
cd ios && pod deintegrate && pod install && cd ..
```

### Reset Everything
```bash
rm -rf node_modules
rm -rf ios/Pods
rm package-lock.json
npm install
cd ios && pod install && cd ..
```

## 📚 Documentation Links

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [NativeWind](https://www.nativewind.dev/)
- [Lucide Icons](https://lucide.dev/)
- [Moti](https://moti.fyi/)
- [Lottie](https://airbnb.io/lottie/)

## ✨ Features Ready to Use

- ✅ Bottom Tab Navigation
- ✅ Redux State Management with Persistence
- ✅ API Service with Interceptors
- ✅ Environment Variables
- ✅ TailwindCSS Styling
- ✅ Icon Library
- ✅ Animation Libraries
- ✅ Local Storage
- ✅ TypeScript Support
- ✅ Proper Folder Structure

## 🎉 You're All Set!

Your production-ready React Native app is configured and ready to build!

Start developing by:
1. Running the app: `npm run android` or `npm run ios`
2. Creating new screens in `src/screens/`
3. Adding components in `src/components/`
4. Managing state with Redux slices
5. Making API calls with the configured service

Happy coding! 🚀
