# Header Standardization Refactor

## ✅ Objective

Create a consistent header experience across the app by implementing a reusable `ScreenHeader` component and replacing ad-hoc header implementations in key screens.

## 📦 Components Created

### `src/components/common/ScreenHeader.tsx`

A flexible, reusable header component that supports:

- **Variants**: `'default'` (Left-aligned) and `'center'` (Center-aligned title with back button).
- **Title**: Main screen title (customizable size).
- **Subtitle**: Optional descriptive text.
- **Navigation**: Built-in support for Back button with customizable icon.
- **Actions**: Support for Right Action button (icon or custom component).
- **Styling**: Customizable padding and background options.

## 🔄 Files Updated

1.  **`src/screens/OutfitGeneratorScreen.tsx`**
    - Replaced custom `View` header with `<ScreenHeader />`.
    - Configured with title "Outfit Generator" and subtitle.

2.  **`src/screens/UploadStatusScreen.tsx`**
    - Replaced custom `View` header with `<ScreenHeader />`.
    - Configured with dynamic subtitle showing processing/completed counts.
    - Integrated "Plus" action button for new uploads.

3.  **`src/components/wardrobe/WardrobeHeader.tsx`**
    - Refactored to wrap `<ScreenHeader />` instead of custom implementation.
    - Maintains existing props interface (`itemCount`, `onAddPress`).

4.  **`src/screens/ProfileScreen.tsx`**
    - Replaced custom `View` header with `<ScreenHeader />`.
    - Configured with title "Profile" and subtitle.

5.  **`src/screens/EditProfileScreen.tsx`**
    - Replaced custom header with `<ScreenHeader variant="center" />`.
    - Added Back button and "Save" (Check icon) action.

6.  **`src/screens/ReviewClothingScreen.tsx`**
    - Replaced custom header with `<ScreenHeader variant="center" />`.
    - Added "Cancel" (X icon) and "Delete" (Trash icon) actions.

7.  **`src/screens/ClothingDetailsScreen.tsx`**
    - Replaced `TopBar` with `<ScreenHeader variant="center" />`.
    - Added Back button and "More Options" action.
    - Fixed navigation type definition.

## 🎨 Benefits

- **Consistency**: All screens now share the exact same typography, spacing, and layout.
- **Flexibility**: Supports both main tab headers (large, left-aligned) and detail screen headers (center-aligned with navigation).
- **Maintainability**: Future header changes (e.g., font size, padding) only need to be made in one place.
- **Code Reduction**: Removed duplicated styling code across multiple screens.

## 🚀 Usage Example

```tsx
import ScreenHeader from '../components/common/ScreenHeader';
import { Plus, ArrowLeft } from 'lucide-react-native';

// Main Screen (Left Aligned)
<ScreenHeader
  title="My Screen"
  subtitle="Description"
  ActionIcon={Plus}
  onActionPress={handleAdd}
/>

// Detail Screen (Center Aligned)
<ScreenHeader
  title="Detail View"
  variant="center"
  onBackPress={() => navigation.goBack()}
  BackIcon={ArrowLeft} // Optional, defaults to ArrowLeft
  ActionIcon={MoreVertical} // Optional right action
  onActionPress={handleMore}
/>
```
