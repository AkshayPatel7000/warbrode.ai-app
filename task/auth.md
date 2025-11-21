````markdown
# Smart Wardrobe AI – Auth Flow & UI Spec  
_Target: React Native style UI using Tailwind CSS utility classes (or a Tailwind-compatible library)._

---

## 1. Tech & Design Guidelines

- **Design style**
  - Soft glassmorphism, large rounded cards (`rounded-2xl`, `rounded-3xl`)
  - Pastel lime gradient headers (`bg-gradient-to-r from-lime-200 to-lime-400`)
  - Neutral surfaces with soft shadows (`bg-white shadow-lg shadow-black/5`)
  - Thin, iOS-style outline icons
- **Typography**
  - Font: `Inter` or system equivalent
  - Sizes: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`
  - Font weights: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- **Color tokens (Tailwind style)**
  - Primary accent: `#4A6CF7` → `text-indigo-600`, `bg-indigo-600`
  - Lime gradient: `from-lime-200 to-lime-400`
  - Background: `bg-slate-50`
  - Surface: `bg-white`
  - Text primary: `text-slate-900`
  - Text secondary: `text-slate-500`
  - Error: `text-red-500`, `border-red-400`, `bg-red-50`
  - Success: `text-emerald-600`
- **Layout**
  - Global padding: `px-5 pb-6 pt-4`
  - Vertical spacing between sections: `space-y-4` / `space-y-6`
  - Use a base 4/8px scale via Tailwind (`p-2`, `p-3`, `p-4`, etc.).

---

## 2. Screens Overview

Auth flow includes:

1. **Splash**
2. **Onboarding (multi-step)**
3. **Login / Signup (toggle in one screen)**
4. **Forgot Password**

All screens must use the **same component system** and **Tailwind CSS classes**.

---

## 3. Screen Specs

### 3.1 Splash Screen

**Purpose:** Brand moment + token check.

- **Layout**
  - Root container: `flex-1 items-center justify-center bg-slate-50`
  - Centered logo container:
    - Outer: `items-center`
    - Logo circle: `w-20 h-20 rounded-full bg-gradient-to-br from-lime-200 to-lime-400 flex items-center justify-center shadow-lg`
    - App name text: `mt-4 text-xl font-semibold text-slate-900`
    - Subtitle: `text-sm text-slate-500`
- **Behavior**
  - On mount, check stored auth token.
  - If valid → navigate to Home; else → Onboarding.
  - Add small fade-in animation for the logo/card.

---

### 3.2 Onboarding Screen (Carousel)

**Purpose:** Explain value and request permissions.

- **Layout**
  - Root: `flex-1 bg-slate-50`
  - Top gradient header strip: `h-40 bg-gradient-to-b from-lime-200 to-lime-50 rounded-b-3xl`
  - Pager/content area: `flex-1 -mt-16 px-5`
  - Each slide:
    - Card: `bg-white rounded-3xl p-6 shadow-lg shadow-black/5`
    - Illustration placeholder: `h-40 rounded-2xl bg-slate-100`
    - Title: `mt-4 text-lg font-semibold text-slate-900`
    - Body text: `mt-2 text-sm text-slate-500`
  - Pagination dots: `flex flex-row justify-center mt-4 space-x-2`
    - Active dot: `w-6 h-2 rounded-full bg-slate-900`
    - Inactive: `w-2 h-2 rounded-full bg-slate-300`
  - Bottom CTA row: `flex flex-row justify-between items-center mt-6`
    - “Skip” text button: `text-sm text-slate-500`
    - Primary button: see Button component (below), with `w-32` and label `Get started`.

- **Slides content**
  1. Upload your clothes.
  2. Get AI daily outfits.
  3. Smart suggestions → “Allow Camera & Photos” (trigger permission modal here).

---

### 3.3 Login / Signup Screen (Combined)

**Purpose:** Email/password auth + Google Sign-In.

- **Layout**
  - Root: `flex-1 bg-slate-50`
  - Header:
    - Gradient band: `h-36 bg-gradient-to-br from-lime-200 to-lime-400 rounded-b-3xl`
    - Content overlay: `px-5 -mt-16`
    - Title: `text-2xl font-bold text-slate-900` (e.g., “Welcome back” / “Create account”)
    - Subtitle: `mt-1 text-sm text-slate-600`
  - Auth card:
    - Container: `mt-4 bg-white rounded-3xl p-5 shadow-lg shadow-black/5 space-y-4`
    - Toggle row for Login / Signup:
      - Background: `bg-slate-100 rounded-full p-1 flex flex-row`
      - Each tab: `flex-1 py-2 rounded-full text-center text-sm`  
        - Active: `bg-white shadow text-slate-900 font-medium`  
        - Inactive: `text-slate-500`
    - Form fields:
      - Use `<Input />` component (see below).
      - Login: Email, Password.
      - Signup: Name (optional), Email, Password, Confirm password.
    - Forgot password link (login mode only):
      - `self-end text-xs text-slate-500`
  - Primary CTA:
    - `<Button variant="primary" className="mt-2 w-full" label="Login" />`
  - Divider:
    - `flex flex-row items-center my-3`
    - Line: `flex-1 h-px bg-slate-200`
    - Label: `mx-2 text-xs text-slate-400` (“or continue with”)
  - Social login:
    - `<SocialButton provider="google" />` (outlined pill with Google logo).
  - Bottom inline link:
    - e.g. `Don't have an account? Sign up`  
      `text-center text-xs text-slate-500 mt-3`

- **Validation / States**
  - Show field errors below inputs: `text-xs text-red-500 mt-1`
  - Submit button enters loading state.
  - Disable button `opacity-50` when loading or invalid.

---

### 3.4 Forgot Password Screen

**Purpose:** Trigger reset email.

- **Layout**
  - Root: `flex-1 bg-slate-50 px-5 pt-8`
  - Title: `text-xl font-semibold text-slate-900`
  - Subtitle: `mt-1 text-sm text-slate-500`
  - Card:
    - `mt-4 bg-white rounded-3xl p-5 shadow-lg shadow-black/5 space-y-4`
    - Email `<Input />`
    - `<Button label="Send reset link" className="w-full" />`
  - After success, replace card body with confirmation text and `Resend` / `Back to login` buttons.

---

## 4. Reusable Component Specification

All components should accept a `className` prop so Tailwind utility classes can be composed.

### 4.1 Button

**Usage**

```jsx
<Button
  variant="primary"        // 'primary' | 'outline' | 'ghost'
  label="Continue"
  onPress={handleSubmit}
  loading={isSubmitting}
  iconLeft={<Icon name="arrow-right" />}
  className="mt-4 w-full"
/>
````

**Default Tailwind styles**

* Root base: `h-12 px-4 rounded-2xl flex flex-row items-center justify-center active:scale-[0.98]`
* Variants:

  * primary: `bg-indigo-600 text-white shadow-md shadow-indigo-500/30`
  * outline: `border border-slate-300 bg-white text-slate-900`
  * ghost: `bg-transparent text-slate-700`
* Loading: replace label with spinner; keep width.

---

### 4.2 Input

**Usage**

```jsx
<Input
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  error={errors.email}
  secure={false}
  className="mt-2"
/>
```

**Default Tailwind styles**

* Container: `w-full`
* Label: `mb-1 text-xs font-medium text-slate-600`
* Field wrapper:
  `flex flex-row items-center px-3 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm`
* Input text: `flex-1 text-sm text-slate-900`
* Error text: `mt-1 text-xs text-red-500`

---

### 4.3 SocialButton (Google)

**Usage**

```jsx
<SocialButton
  provider="google"
  label="Continue with Google"
  onPress={handleGoogle}
  className="w-full"
/>
```

**Styles**

* `flex-row items-center justify-center h-12 rounded-2xl bg-white border border-slate-200 shadow-sm`
* Google icon on left: 20x20, `mr-2`
* Text: `text-sm font-medium text-slate-800`

---

### 4.4 AuthCard

**Description**
Wrapper for auth content (login/signup/forgot), reusing consistent padding/rounded/shadow.

* Styles: `bg-white rounded-3xl p-5 shadow-lg shadow-black/5 space-y-4`

---

### 4.5 OnboardingCarousel

* Accepts an array of slides `{ title, description, image }`.
* Internal pager state + dots at bottom.
* Expose callbacks `onSkip()`, `onDone()`.

---

### 4.6 PermissionModal (optional)

* Glassmorphism style bottom sheet:

  * `rounded-t-3xl bg-white/80 backdrop-blur-xl shadow-2xl`
  * Used when asking for camera/photos permission.

---

## 5. Auth Logic Hooks (Short Spec)

Create `useAuth()` hook with:

* `login(email, password)`
* `signup(data)`
* `loginWithGoogle()`
* `logout()`
* `forgotPassword(email)`
* Expose `status` (`'idle' | 'loading' | 'error' | 'authenticated'`) and `user`.

All API calls should go through a centralized client and attach auth token automatically.

---

## 6. Navigation Flow

1. **App start → Splash**

   * If token valid → Home.
   * Else → Onboarding.
2. **Onboarding finished / skipped → AuthScreen**
3. **AuthScreen**

   * Default tab = Login.
   * Toggle tab to Signup via pill switch.
   * Forgot password link → ForgotPasswordScreen.
4. **Successful login/signup → Home Dashboard.**

---

## 7. What the AI Coder Must Deliver

* All auth screens implemented exactly as described using Tailwind CSS classes (or a Tailwind-like utility system for React Native).
* Reusable components: `Button`, `Input`, `SocialButton`, `AuthCard`, `OnboardingCarousel`, `PermissionModal`.
* Clean separation of UI and logic (hooks for auth, components for layout).
* Consistent theming using the tokens above.
* Simple demo navigation showing full flow: Splash → Onboarding → Login/Signup → Home (stub).

```
::contentReference[oaicite:0]{index=0}
```