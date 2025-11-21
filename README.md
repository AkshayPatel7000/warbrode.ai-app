# WardrobeAI - Production Ready React Native App

A production-ready React Native application with complete setup for navigation, state management, styling, and more.

## 📦 Installed Packages

### Navigation
- `@react-navigation/native` - Core navigation library
- `@react-navigation/bottom-tabs` - Bottom tab navigation
- `@react-navigation/native-stack` - Native stack navigation
- `react-native-screens` - Native screen components
- `react-native-safe-area-context` - Safe area handling
- `react-native-gesture-handler` - Gesture handling

### State Management
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React bindings for Redux
- `redux-persist` - Persist Redux state
- `@react-native-async-storage/async-storage` - Local storage

### Networking
- `axios` - HTTP client

### Styling
- `nativewind` - TailwindCSS for React Native
- `tailwindcss` - CSS framework

### Icons & Animations
- `lucide-react-native` - Icon library
- `react-native-svg` - SVG support
- `lottie-react-native` - Lottie animations
- `moti` - Animation library
- `react-native-reanimated` - Reanimated library

### Environment
- `react-native-dotenv` - Environment variables

## 📁 Folder Structure

```
wardrobeai/
├── src/
│   ├── components/          # Reusable components
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── WardrobeScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/          # Navigation setup
│   │   ├── RootNavigator.tsx
│   │   ├── BottomTabNavigator.tsx
│   │   └── types.ts
│   ├── store/               # Redux store
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   └── userSlice.ts
│   │   └── middleware/
│   ├── services/            # API services
│   │   └── api.service.ts
│   ├── utils/               # Utility functions
│   │   ├── helpers.ts
│   │   └── storage.ts
│   ├── hooks/               # Custom hooks
│   │   └── useRedux.ts
│   ├── constants/           # Constants
│   │   ├── theme.ts
│   │   └── api.ts
│   ├── types/               # TypeScript types
│   │   ├── env.d.ts
│   │   └── nativewind.d.ts
│   └── assets/              # Static assets
│       ├── images/
│       ├── animations/
│       └── fonts/
├── .env                     # Environment variables
├── .env.example             # Environment template
├── tailwind.config.js       # TailwindCSS config
├── babel.config.js          # Babel config
└── App.tsx                  # Root component
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Install iOS Pods (iOS only)
```bash
cd ios && pod install && cd ..
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
```

### 4. Run the App

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

## 🎨 Styling with NativeWind

This project uses NativeWind (TailwindCSS for React Native). Use className prop:

```tsx
<View className="flex-1 bg-white p-4">
  <Text className="text-2xl font-bold text-gray-900">Hello</Text>
</View>
```

## 🔄 Redux Usage

### Using Redux Hooks
```tsx
import { useAppSelector, useAppDispatch } from './src/hooks/useRedux';
import { setUser } from './src/store/slices/userSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.currentUser);
  
  const handleLogin = () => {
    dispatch(setUser({ id: '1', name: 'John', email: 'john@example.com' }));
  };
};
```

## 🌐 API Calls

### Using API Service
```tsx
import apiService from './src/services/api.service';

const fetchData = async () => {
  try {
    const response = await apiService.get('/endpoint');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

## 🧭 Navigation

### Navigate Between Screens
```tsx
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();
  
  const goToProfile = () => {
    navigation.navigate('Profile');
  };
};
```

## 📱 Bottom Tab Navigation

The app includes a bottom tab navigator with 4 tabs:
- **Home** - Main dashboard
- **Explore** - Discover content
- **Wardrobe** - Manage items
- **Profile** - User profile

## 🔐 Environment Variables

Available environment variables in `.env`:
- `API_BASE_URL` - API base URL
- `API_TIMEOUT` - API timeout in milliseconds
- `APP_NAME` - Application name
- `APP_VERSION` - Application version
- `ENABLE_ANALYTICS` - Enable/disable analytics
- `ENABLE_CRASH_REPORTING` - Enable/disable crash reporting
- `DEBUG_MODE` - Enable/disable debug mode

## 🎭 Icons

Using Lucide React Native icons:
```tsx
import { Home, User, Settings } from 'lucide-react-native';

<Home color="#000" size={24} />
```

## 🎬 Animations

### Lottie Animations
```tsx
import LottieView from 'lottie-react-native';

<LottieView
  source={require('./assets/animations/loading.json')}
  autoPlay
  loop
/>
```

### Moti Animations
```tsx
import { MotiView } from 'moti';

<MotiView
  from={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ type: 'timing', duration: 1000 }}
>
  <Text>Animated Content</Text>
</MotiView>
```

## 📝 Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🏗️ Building for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace WardrobeAI.xcworkspace -scheme WardrobeAI -configuration Release
```

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [NativeWind](https://www.nativewind.dev/)
- [Lucide Icons](https://lucide.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
