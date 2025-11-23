# **5. Profile Screen — UI Specification**

## **1. Screen Purpose**

A simple, clean overview of the user’s account with quick access to settings, preferences, support, and logout.
This screen should feel personal yet minimal, avoiding clutter.

---

## **2. Visual & Structural Overview**

### **A. Header**

- Small, simple top bar.
- Title: **“Profile”** in bold.
- No gradient header needed (unless your global design system requires it).

### **B. User Identity Card**

**Component:** `ProfileHeaderCard`

- Large rounded card.
- Center aligned.
- Shows:
  - **User avatar** (circular, large, soft shadow).
  - **Name** (e.g., _Akshay Patel_).
  - **Email** (secondary text).

- Optional edit icon on the avatar for changing profile photo.
- Soft subtitle like: _Member since Jan 2025_ (optional).

This block should look warm and welcoming.

---

### **C. Quick Profile Actions**

**Component:** `ProfileQuickActionList`

Small rounded action tiles (like mini-cards or list rows):

- **Edit Profile**
  - Update name, avatar, gender (optional).

- **Manage Wardrobe**
  - Shortcut to wardrobe screen.

- **View My Outfits**
  - Shortcut to outfit history.

Each row:

- Left icon (outline style)
- Title text
- Right chevron

Spacing: generous, airy.

---

### **D. Preferences, Settings & Support Sections**

These appear as **sectioned lists**, each section separated by spacious dividers.

**Sections to include:**

1. **App Preferences**
   - Style Preferences
   - No-repeat Outfit Rules
   - Weather Settings
   - Notification Time
   - Color Preferences (avoid colors, etc.)

   _Each item opens the corresponding Settings sub-screen._

2. **Support**
   - Help & FAQ
   - Contact Support
   - Privacy Policy
   - Terms & Conditions

3. **Account**
   - Delete Account
   - Logout (placed last, marked in red or danger style).

---

### **E. Logout Button**

**Component:** `DangerButton`

- Label: **“Log out”**
- Placed at the very bottom.
- Red / danger text style (not a filled red button).
- Confirmation modal should appear on tap.

---

## **3. Component Breakdown for Profile Screen**

Use these reusable custom components:

- `ScreenContainer`
- `ProfileHeaderCard`
- `SectionTitle`
- `ListRow` (icon + label + chevron)
- `Divider` (spaced, soft)
- `DangerButton`
- `ConfirmModal`

No ad-hoc layout. Everything must be composed from reusable elements.

---

## **4. UX Principles**

- Minimal, personal, warm.
- Very easy to navigate.
- Strong information hierarchy.
- Clear separation of “Account actions” vs “Preferences”.

---

# **6. Settings Screen — UI Specification**

## **1. Screen Purpose**

The Settings Screen is where the user configures:

- Style preferences
- Weather control
- No-repeat rules
- Notifications
- Advanced wardrobe rules
- App behavior

The goal: make settings simple, visually consistent, and not intimidating.

---

## **2. Structure & Layout**

### A. Header

- Title: **“Settings”**
- Back button to return to Profile.

Gradient header optional — settings usually look cleaner without it.

---

### B. Scrollable Content Using Sections

Organize settings into clean, separated categories.
Each category = **Section Title + Setting Items (rows/cards)**.

---

## **3. Settings Categories & Descriptions**

### **1. Style Preferences**

_What style does the user prefer?_

- Component: `ChipSelector` (multiple selectable)
- Options: **Casual**, **Formal**, **Streetwear**, **Sport**, **Minimal**, etc.
- Should be visually clean: pill chips with subtle selection glow.

---

### **2. Weather Settings**

Allows user to enable or disable weather-based outfit generation.

- Toggle switch: **“Use weather in outfit suggestions”**
- If ON → Show:
  - Location display (e.g., _Mumbai, IN_)
  - “Change location” row → opens location selector modal.
  - “Temperature sensitivity” slider (optional).

---

### **3. No-Repeat Outfit Rule**

_How many days before an item can be reused?_

- Slider component:
  - Range: **1–14 days**
  - Label: `Avoid repeating items for X days`

- Show the current value dynamically.

---

### **4. Notifications**

Daily notification for outfit of the day.

- Toggle: **“Daily outfit notification”**

- If ON → time picker row:
  - Label: _Notification time_
  - Value: `7:00 AM`
  - Opens bottom-sheet time picker.

- Optional:
  - Toggle: **“Send weather alerts when it changes significantly”**

---

### **5. Color Preferences**

Let user mark colors they dislike (useful for avoiding certain items in AI matching).

- `ColorChipGrid` component
- Multi-select chips (circles or pills)
- Selected chips show a border or a check icon.

---

### **6. Data & Privacy**

- “Clear AI generated outfits”
- “Clear wardrobe cache”
- “Export my data” (future optional)
- “Delete my account”
  → Must open a danger modal with explicit confirmation.

---

## **4. Visual Appearance & Component Usage**

Use the same reusable building blocks:

- `SettingsSectionTitle`
- `SettingsRow` (left label + right control or chevron)
- `ToggleSwitch`
- `TimePickerRow`
- `SliderRow`
- `ChipSelector`
- `ColorChipGrid`
- `BottomSheet` for pickers
- `ConfirmModal` for destructive actions

All rows should follow a consistent pattern:

- Left-aligned title
- Right-aligned control (toggle, arrow, chip group, etc.)
- Enough padding so each line is easy to tap
- Use `rounded-xl` or `rounded-2xl` white tiles with soft shadows around each group

---

## **5. UX Principles for Settings**

- Avoid clutter; group logically.
- Keep controls spaced for easy thumb interaction.
- Use clear, natural language for setting labels.
- Provide inline help only when needed (small secondary text).
- Always give feedback after user makes changes.

---

## **7. Combined Flow Logic**

- Profile → Settings → Each individual settings sub-screen.
- Changes reflect immediately (optimistic UI) with a success toast like:
  - “Preferences updated”

---
