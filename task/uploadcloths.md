

## 1. Flow Overview

**Goal:** Let the user add a new clothing item in a way that feels fast, clear and a bit “premium”.

**User steps:**

1. Tap **Upload** (from Home quick actions, Wardrobe screen, or bottom nav).
2. See a **bottom sheet** with options:

   * Take Photo
   * Upload Photo (from gallery)
3. Capture / pick an image.
4. Land on an **AI preview screen** where:

   * Image is shown
   * Auto tags / type / color are visible
   * User can adjust details
5. Confirm → item is saved and user is taken back to Wardrobe (with a subtle success message).

The flow should feel like a single, smooth sequence with minimal friction.

---

## 2. Design Language

Use the same visual style as your Home and Wardrobe screens:

* **Soft-glass, rounded surfaces** (large radii, subtle shadows)
* **Pastel lime accents** for primary actions
* White/neutral backgrounds for cards
* Minimal, thin icons
* Calm typography: clear, not shouty

Every surface here should feel like part of the same design system.

---

## 3. Entry Point – Upload Trigger

This is the **starting point** of the flow (reused on multiple screens).

### Component: `UploadTrigger`

* Appears as:

  * A pill button (`Upload`) in Home quick actions and/or
  * A button or icon on the Wardrobe screen (“Upload new clothes”).
* Includes:

  * Icon (camera or plus)
  * Clear label: `Upload` or `Upload clothes`
* Behaviour:

  * On tap → opens **Upload Options Sheet** (see next section).

The trigger should look obviously tappable and be one of the main actions on Wardrobe and Home.

---

## 4. Upload Options – Bottom Sheet

### Screen/Component: `UploadOptionsSheet`

**Purpose:** Let user choose how to add a photo, with a modern, friendly UX.

**Presentation:**

* Slides up from the bottom as a rounded, glass-style **bottom sheet**.
* Dimmed background behind it.
* Top handle (small rounded bar) to indicate draggable nature.
* Title: `Upload new clothes`.

**Content layout:**

Inside the sheet, show **two large, rounded option cards**, side by side or stacked:

1. **Take Photo**

   * Camera icon in a lime badge.
   * Label: `Take Photo`.
   * Subtext: `Use your camera`.

2. **Upload Photo**

   * Image/gallery icon.
   * Label: `Upload Photo`.
   * Subtext: `Choose from gallery`.

Each option tile:

* Big enough for thumb tapping.
* Uses soft gradient or subtle lime glow to feel “premium”.
* Entire tile is clickable (not just the text/icon).

**Behaviour:**

* Tap **Take Photo** → navigate to **Capture Screen** with camera view.
* Tap **Upload Photo** → open system gallery picker.
* Close icon / swipe down to dismiss without action.

---

## 5. Capture / Select Image Screen

### Screen: `CaptureClothingScreen`

This screen handles both **camera capture** and **gallery-selected** images, so the design is consistent.

**Layout:**

* If using camera:

  * Full-screen camera view.
  * Overlay framing guides (faint box / circle) to help the user center the clothing.
* If coming from gallery:

  * Show the chosen image full-width at the top, with a soft rounded frame.

**Controls (for camera mode):**

* Bottom area:

  * Big round shutter button in the center.
  * Small “close” icon in top-left or top-right to exit.
  * Optional “flip camera” and “flash” icons.

**After capture / pick:**

* Show a preview with:

  * The image on top (large card).
  * Two buttons below:

    * `Retake` (secondary)
    * `Use photo` (primary)

Once the user taps `Use photo`, navigate to the **AI Tag Review** screen.

---

## 6. AI Tag Review / Confirm Screen

### Screen: `ConfirmClothingScreen`

This is the most important part of the flow: the user approves what the AI understood.

**Layout blocks:**

1. **Image Preview Card**

   * Large, rounded image card at the top.
   * Same look as the hero cards used elsewhere.
   * Optional label overlay: `New item`.

2. **Basic Info Section**

   * Compact header for the item:

     * Label: `Item type`
     * A dropdown or segmented control: `Shirt`, `T-Shirt`, `Jeans`, `Sneakers`, etc.
   * Optionally a text field for `Name` (e.g., “Green linen shirt”).

3. **AI Tags & Attributes Section**

   * Title: `AI details`
   * Show AI-generated info as editable controls:

     * **Color**: swatch + color name / hex (can be tapped to change).
     * **Pattern**: chips like `Solid`, `Striped`, `Checked` (AI pre-selects one).
     * **Style tags**: chips like `Casual`, `Summer`, `Office`, `Party`.
   * Make tags feel like clickable chips:

     * Selected = filled, unselected = outline / subtle.

4. **Category / Placement Section** (optional)

   * E.g. `Category: Tops` or `Footwear`.
   * Could be a segmented control or dropdown.

5. **Action Bar**

   * Primary button: `Save to wardrobe`.
   * Secondary text link: `Discard` (with confirm dialog if tapped).

**Feedback & State:**

* Show a **small banner** at the top of the card if AI tags are still loading:
  `Analyzing your item…` with a spinner.
* Once data arrives, smoothly fade in tags and details.
* If AI fails, show message:
  `We couldn’t analyze this item automatically. You can still save it and edit later.`
  and collapse to manual fields only.

---

## 7. Success & Navigation

After the user taps **Save to wardrobe**:

* Show a brief, friendly success toast or banner:
  `Added to your wardrobe`.
* Navigate back to the **Wardrobe** screen.
* The newly added item should be visible near the top (e.g., as the first item), so the user gets visual confirmation.

Optionally, you can scroll to the new item or give it a short highlight animation.

---

## 8. Components to Use / Reuse

The AI coder should implement the flow using **reusable custom components**, not fresh layout every time. Suggested components:

* `UploadTrigger` – main button/entry on Home and Wardrobe.
* `BottomSheet` – generic sheet; `UploadOptionsSheet` configures it for upload.
* `OptionTile` – large square/rectangular card for “Take Photo” / “Upload Photo”.
* `CaptureView` – camera + controls bundle.
* `ImagePreviewCard` – reused for single-item preview and outfit preview.
* `AttributeField` – label + dropdown or segmented control (for type, category).
* `TagChip` and `TagChipRow` – for AI tags.
* `PrimaryActionBar` – bottom-fixed row for `Save` / `Discard`.
* `Toast` / `Snackbar` – for success and errors.
* `ConfirmDialog` – for discard during process.

Every subsequent feature (like editing existing items) should be able to reuse `ImagePreviewCard`, `AttributeField`, `TagChipRow`, and `PrimaryActionBar`.

---
