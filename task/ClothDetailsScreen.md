Here’s a clean product / UI spec you can hand directly to an AI UI coder for **Screen 2 – Clothing Details**.

No code, only structure, behaviour, and how to use **custom components** in the same design language as Home + Wardrobe.

---

## 1. Screen Name & Purpose

**Screen:** `Clothing Details`
**Goal:** Show full information about a single clothing item and make it very easy to:

* See the item clearly
* Understand its attributes (type, color, tags, cleanliness, last worn)
* Perform quick actions (mark clean/dirty, edit, delete, use in outfit)

This is the “profile page” for one piece of clothing.

---

## 2. Design Language

Same family as Home and Wardrobe:

* Soft, premium, rounded UI (large radii, no sharp corners)
* Pastel accents (lime / soft gradients) used sparingly as highlights
* White / light surfaces with subtle shadows
* Thin, simple icons
* Strong hierarchy: big image at top, then key stats, then actions

---

## 3. High-Level Layout

Vertically, think in these blocks:

1. **Top Bar** – back nav + overflow actions
2. **Hero Image Card** – large preview of the clothing item
3. **Item Summary & Status** – name, type, clean/dirty, last worn
4. **Attributes & Tags Section** – color, pattern, categories, tags
5. **Usage Stats Section** – how often it is worn
6. **Action Row** – primary actions (Mark clean/dirty, Add to outfit, Delete)

Everything should scroll smoothly if content exceeds screen height.

---

## 4. Section-by-Section Spec

### 4.1 Top Bar

**Purpose:** Orientation and navigation.

* Left: **Back button** (chevron) → returns to Wardrobe grid.
* Center: (optional) small title, e.g. `Item details` or the item type.
* Right: **More / options icon** (three dots) → opens small menu:

  * `Edit item`
  * `Delete item`
  * `Duplicate` (optional, future)

This bar should be light and unobtrusive, not a heavy colored bar. It can sit over a faded top edge of the hero image or above it depending on what looks cleaner in your design system.

---

### 4.2 Hero Image Card

**Purpose:** The clothing item is the star here.

* Large, centered card occupying the upper half of the screen.
* Rounded rectangle with soft shadow, consistent with other cards.
* Inside:

  * Clothing image (photo), on a subtle neutral background (off-white / light gray).
* Optionally, a small overlay icon to indicate if the item is **dirty/clean** (e.g., a small badge in a corner).

Use the same styling style as “Today’s Outfit” image but for a single item.

---

### 4.3 Item Summary & Status

Placed just below the hero image card.

**Content:**

* **Item name / label**

  * E.g. `Green Linen Shirt`
  * If the user did not name it, fall back to `Color + Type` variant.

* **Secondary line**

  * Clothing type: `Shirt`, `T-shirt`, `Jeans`, `Sneakers`, etc.

* **Status pill(s)**

  * `Clean` or `Dirty` (color-coded)
  * Optional `Favourite` heart toggle.

* **Last worn info**

  * Small, subtle line: `Last worn: 3 days ago` or `Not worn yet`.

Visually, this block should feel like a **summary “header”** for the item below the image.

---

### 4.4 Attributes & Tags

**Purpose:** Show the AI-understood metadata in a way that’s easy to read and edit.

**Attributes Row**

Use a compact, repeatable component to show key/value pairs:

* Color: show color chip + label (e.g. `#3B5B8B` / `Navy blue`)
* Pattern: `Solid / Striped / Checked`
* Category: `Top / Bottom / Footwear / Layer`
* Style: `Casual / Formal / Street / Sport` (optional, if available)

Each attribute can be displayed as:

* Icon (small) + label + value, in a small card or list row.

**Tags**

* Show as a horizontal or wrap row of chips under the attributes.
* Each chip shows a tag like `Casual`, `Summer`, `Office`, etc.
* Tapping a chip could be used later for filtering or editing, but for now it can be static.

Provide a small **“Edit tags”** link or icon near this section that opens an edit mode / bottom sheet.

---

### 4.5 Usage Stats

**Purpose:** Give the user a sense of how often they use this item.

This can be a small section below attributes:

* “Times worn”: number
* “Added on”: date
* Optional mini visual:

  * Progress bar or small horizontal graph (e.g., wear frequency).

Keep it compact and visual; do not overwhelm this screen with analytics.

---

### 4.6 Action Row

This is where the user decides what to do with the item.

Recommended primary actions:

1. **Mark Clean / Mark Dirty**

   * Toggles based on current state.
   * When tapped, instantly updates UI state and sends backend call.

2. **Use in Outfit / Generate outfit with this item**

   * Takes user to the outfit generator screen, with this item pre-selected (if in backend spec).

3. **Delete Item**

   * Destructive action, should open a confirmation modal:

     * “Are you sure you want to delete this item? This cannot be undone.”

Arrange these actions as a horizontal row of large, icon-plus-label buttons or as two main buttons (Clean/Dirty + Use in outfit) and one smaller text button for Delete.

All must be clear and easy to tap, with spacing so the user is unlikely to mis-tap.

---

## 5. Component Guidelines (Custom Components Only)

The Clothing Details screen should be built from these **reusable custom components**, not ad-hoc layout:

* `ScreenContainer` – base wrapper that handles background, padding, scrolling.
* `TopBar` – back button + title + more-menu entry.
* `HeroImageCard` – single large image of the clothing item.
* `ItemSummary` – name, type, status pills, last worn text.
* `AttributeList` – vertical group for Color / Pattern / Category / Style.
* `TagChipRow` – group of tags in chips.
* `UsageStatsCard` – compact stats section.
* `ActionButtonRow` – row of primary actions (Clean/Dirty, Use in Outfit, Delete).
* `ConfirmModal` – reusable confirm dialog for Delete or bigger status changes.

The AI coder should define these components in a way that they can be re-used later in other contexts (e.g., a similar view in “Outfit Details”).

---

## 6. States & Edge Cases

The UI must handle these states cleanly:

1. **Normal state**

   * All data present, image loaded, tags visible.

2. **Loading state**

   * Show skeleton/faded placeholders for image and text (no layout jump).

3. **Image load failure**

   * Show a neutral placeholder with clothing icon and text like `Image unavailable`.

4. **No metadata / tags**

   * If AI tags are not yet available, show a small line: `AI tags are being generated…` or `No tags yet` with prompt to edit manually.

5. **Dirty vs Clean**

   * Visual difference should be clear:

     * `Dirty` might be a warmer badge; `Clean` a calmer, neutral badge.
     * Changes instantly when toggled.

---
