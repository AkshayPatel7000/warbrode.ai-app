Here is a **clear product / UI spec** you can give directly to an AI UI coder for **Screen 1 – Wardrobe Screen**.
No code, only structure, behaviour and components.

---

## 1. Screen Name & Purpose

**Screen:** `Wardrobe`
**Purpose:** Show all the user’s clothes in a clean, visual grid with simple filters and a clear way to add new items.

This is the **main inventory screen** of the app: from here the user understands what is in their wardrobe, can browse by category, and can start the “upload new clothes” flow.

---

## 2. Design Language (same family as Home)

The Wardrobe screen must visually match the Home screen you already have:

* Soft, friendly look – **rounded shapes, big cards, pastel lime header**
* **Glass / soft-shadow surfaces**, no harsh borders
* Simple iconography (thin, iOS-style outline icons)
* Typography: same as Home (`Inter` / similar, light/medium weights)
* Consistent paddings: generous white space, nothing cramped
* Easy scanning: clear section titles and labels

---

## 3. High-Level Layout

Think of the screen in vertical sections:

1. **Header band** (gradient area at top)
2. **Category chips row** (horizontal scroll)
3. **Wardrobe content grid** (clothing items)
4. **Optional section headers** (e.g., “Shirts”, “Jackets”)
5. **Primary upload entry point** (button or floating sheet trigger)
6. **Bottom navigation bar** (same as Home, Wardrobe tab active)

All sections should feel like **one smooth canvas**, not separate cards stacked randomly.

---

## 4. Section-by-Section Specification

### 4.1 Header

**Goal:** Tell the user “You are in your wardrobe” and let them quickly change context.

* Title text: `My Wardrobe` – large, bold, same weight as “Smart Wardrobe” on Home.
* Subtext line (smaller): e.g. `All items` or `124 items total`.
* Optional small icon/button on the right:

  * Three-dot menu for sorting (by newest, most worn, color).
* Background:

  * Same pastel lime gradient as Home.
  * Bottom corners slightly rounded so it flows into the content area.

Use the same **height and feel** as the header on Home so it feels like part of one system.

---

### 4.2 Category Chips Row

**Goal:** Let user quickly filter by clothing type in a very visual way.

* Horizontal, scrollable row directly under the header.
* Each chip = pill with:

  * Text: `Shirts`, `T-Shirts`, `Jackets`, `Jeans`, `Dresses`, `Shoes`, etc.
  * Optional small icon (e.g., shirt outline, pants, shoe).
* Selected chip:

  * Filled style + subtle shadow.
  * Text more prominent.
* Unselected chip:

  * Light background, low-contrast text.
* Behaviour:

  * Tap a chip → instantly filters the grid below.
  * First chip is “All” to reset filter.

Keep chips **large enough for thumb tapping** and with good spacing so the row feels airy.

---

### 4.3 Wardrobe Grid (Main Content)

**Goal:** Show clothing items as clean, repeatable cards that are easy to scan.

For each **Clothing Card**:

* Layout:

  * Square or slightly tall rectangle.
  * Image on top: single clothing picture (no text over image).
  * Label area below image:

    * Type or short name (e.g., `Green Shirt`).
    * Optional small metadata (e.g., `Last worn 3 days ago` or a tag like `Casual`).
* Visual:

  * Card has rounded corners and subtle shadow.
  * Image sits on a soft neutral background so the item stands out.
* Interaction:

  * Tap → go to Clothing Detail screen.
  * Long press (optional) → open a small action sheet (`Edit`, `Delete`, `Mark dirty/clean`).

The grid itself:

* 2 or 3 columns depending on screen width and your component system.
* Even spacing horizontally and vertically.
* Infinite scroll / pagination is supported; new items append smoothly.

---

### 4.4 Section Headers (Optional)

If you want to group items by category in the same screen (like in your references):

* Above each group (e.g., `Shirts`, `Jackets`), show a simple text header aligned left.
* The header should be subtle, not heavy:

  * Medium weight, smaller than the screen title.
* The clothing cards under each header follow the same grid rules.

This is optional – either you use **one grid with chip filters** or **sectioned groups**. Pick one approach and keep it consistent.

---

### 4.5 Upload New Clothes Entry Point

This is a crucial action, so it must be clear and inviting.

There are two patterns you can mix:

1. **Primary button in content area**

   * A wide button labelled `Upload new clothes` or just `Upload`.
   * Positioned near the top of the screen under the chips or at the bottom of first viewport.
   * When pressed → opens an **Upload Options bottom sheet**.

2. **Action in bottom bar or floating button**

   * Centrally emphasised icon in the bottom nav (if you choose that pattern)
     or
   * A circular floating button placed above the grid on the lower right.

**Upload Options Bottom Sheet** (very similar to your reference art):

* Title: `Upload new clothes`
* Two big cards inside:

  * `Take Photo` (camera icon)
  * `Upload Photo` (gallery icon)
* Each card is large, rounded, with soft gradient accent.

The important thing: **from anywhere in the wardrobe grid the user can see how to add a new item immediately**.

---

### 4.6 Empty States / Loading / Errors

The wardrobe screen must handle three special cases:

1. **Loading state**

   * Skeleton cards (grey placeholders) in the grid.
   * Category chips can be shown disabled.
   * No abrupt jumps.

2. **Empty wardrobe**

   * Friendly illustration.
   * Text like `Your wardrobe is empty` + short explanation.
   * Strong `Upload Clothes` button as the main call to action.

3. **Error state**

   * Short message: `Couldn’t load your wardrobe`.
   * Light retry button: `Try again`.

All states should still respect the same visual language (rounded, soft, minimal).

---

### 4.7 Bottom Navigation Bar

* Same bar as Home.
* Tabs: `Home`, `Wardrobe`, `Generate`, `History`, `Profile`.
* Wardrobe icon should be **highlighted**:

  * Neon pill background under the icon, or accent color.
* Bar uses glass/blur style and floats above the background.

This bar is not specific to the Wardrobe screen, but this screen must look correct with it.

---

## 5. Component-Level Guidance (Custom Components Only, No Raw Layout)

The UI coder should **compose this screen from reusable components** rather than custom layout for everything:

Suggested custom components (names are illustrative, not mandatory):

* `ScreenContainer` – handles safe area, background and padding.
* `GradientHeader` – re-used between Home & Wardrobe.
* `SectionTitle` – for `My Wardrobe`, `Shirts`, etc.
* `CategoryChip` / `CategoryChipRow` – horizontal filters.
* `ClothingCard` – one clothing item in the grid.
* `StatsBadge` (if you decide to show counts at top later).
* `UploadEntry` – the main “Upload clothes” CTA.
* `UploadOptionsSheet` – bottom sheet with `Take Photo` + `Upload Photo`.
* `BottomNavBar` – common across app.

Every element on the Wardrobe screen should be built using those components, not ad-hoc.

---

## 6. UX Principles for This Screen

* **Clarity over density**: the user should immediately understand what they can do—look at items, filter, and upload.
* **Discoverability**: Upload action is obvious at first glance.
* **Consistency**: Components look and behave the same as on the Home screen (rounded shapes, shadows, typography).
* **Thumb-friendly**: Key actions (`Upload`, `Filters`, nav) are reachable with one hand.
* **No clutter**: Limited text, no extra labels; rely on icons + short labels.

---

If you want, next I can write a similar **UI spec for the “Upload New Clothes” flow** or for the **Clothing Detail screen** so your AI coder can implement the full wardrobe experience end-to-end.