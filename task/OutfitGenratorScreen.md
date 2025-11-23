## 1. Screen Name & Purpose

**Screen:** `Outfit Generator`
**Goal:** Let the user see and interact with AI-generated outfits in a way that feels visual, fun, and understandable.

From this screen, the user should be able to:

- View a full outfit (top, bottom, shoes, optional layer) at a glance
- Understand why it was chosen (AI explanation, color score, weather badge)
- Shuffle / regenerate outfits
- Accept an outfit (“Wear today”)
- Like / dislike outfits to give feedback

This screen is the core “AI stylist” experience.

---

## 2. Design Language

Keep this screen visually aligned with the rest of the app:

- Soft glassmorphism, rounded surfaces (large radii)
- Pastel lime/green accents for AI actions and “good” states
- Neutral backgrounds and white cards with subtle shadows
- Thin, simple icons (no heavy fills)
- Clean typography with clear hierarchy:
  - Big label for outfit name / type
  - Smaller descriptive text for reasoning and meta

- Same bottom navigation bar as other screens

The overall feel should be: **calm, premium, and “smart”** — not noisy or cluttered.

---

## 3. High-Level Layout

Think top-to-bottom:

1. **Header / Title Area**
2. **Outfit Preview Card** (flat-lay image)
3. **Outfit Meta Info Row** (chips: weather, score, style)
4. **AI Explanation / Reason Section**
5. **Interaction Row** (like/dislike, shuffle, wear)
6. **Optional: Outfit Pieces List** (top/bottom/shoes breakdown)
7. **Bottom Navigation Bar** (same as other screens)

Everything should sit on a light neutral background and be scrollable if content grows.

---

## 4. Section-by-Section Spec

### 4.1 Header / Title

**Purpose:** Immediately orient the user and clarify context.

- Title text: `Today’s Outfit` or just `Outfit Generator`
- Subtext (optional): `Based on your wardrobe and today’s weather`
- Back or close icon only if this screen is not one of the main tabs.
  If it _is_ a tab, omit the back icon and keep it consistent with Home/Wardrobe header style.

Visually, this can reuse the same **header pattern** as Home:

- Simple top area; may or may not use a gradient depending on how heavy it feels.
- Keep it visually light so the focus remains on the outfit card below.

---

### 4.2 Outfit Preview Card

This is the main “hero” of the screen.

**Component:** `OutfitPreviewCard`

- Large card in the upper half of the screen.
- Rounded corners with soft shadow.
- Inside:
  - A **flat-lay outfit image** (from backend preview you already planned).
  - The image should show top, bottom, and shoes arranged in a neat composition.

- Layout:
  - Card occupies most of the width, with comfortable margins.
  - Aspect ratio around 4:3 for the preview area.

- Optional small overlay:
  - A small badge like `AI` or `Today` in one corner.

The user should instantly recognize: “this is the outfit I will wear.”

---

### 4.3 Outfit Meta Row (Chips)

**Purpose:** Quick metadata about the outfit in small visual chunks.

**Component:** `MetaChipRow`

Placed directly under the preview card, show a **row of 3–4 chips**, for example:

- Weather chip:
  - Icon + label, e.g. `21°C • Sunny`.

- Color score chip:
  - Icon + label, e.g. `Color match: 87/100`.

- Style chip:
  - `Casual`, `Smart casual`, `Formal`, etc.

- AI rank chip (optional):
  - `AI score: 92`.

Each chip:

- Small pill with icon + text.
- Selected/active look but still subtle (no heavy contrasting backgrounds).
- Use the same chip style across the app (reused from Home/Wardrobe).

---

### 4.4 AI Explanation Section

**Component:** `ReasonCard` or `ExplanationCard`

**Purpose:** Answer “Why this outfit?”

- Small title: `Why this outfit?` or `AI’s reasoning`.
- Body text (1–3 short lines):
  - Example: `Neutral sneakers balance the bold top, and the jeans match today’s mild weather.`

- Should feel like a chat bubble or soft card, not like a long article.

Style:

- White / off-white card, rounded, with moderate padding.
- Text in secondary color, easy to skim.
- Optionally show a small AI icon or sparkle icon to signal this is AI-generated insight.

---

### 4.5 Interaction Row (Core Actions)

This is where the user interacts with the outfit.

**Component:** `OutfitActionRow`

The row should contain:

1. **Like / Dislike buttons**
   - Heart / thumbs-up for “Like”.
   - Cross / thumbs-down for “Dislike”.
   - Tap states:
     - Highlight when selected.
     - Persist user’s choice so it can be sent to backend later.

2. **Shuffle / Next Outfit**
   - Prominent control to generate another outfit:
     - Label like `Shuffle` or `New outfit`.
     - Icon: dice / refresh.

   - When tapped:
     - New outfit is requested from backend.
     - Transition: quick fade/slide for preview card and meta.

3. **Wear Today (primary action)**
   - Clear, strong button: `Wear today`.
   - Pressing this:
     - Marks outfit as chosen for today (calls backend).
     - Could give short success feedback.

Layout:

- Either a horizontal row with icons & text or:
  - One main `Wear today` pill button centered,
  - And smaller icon buttons for like/dislike/shuffle above or around it.

- Ensure spacing so taps are unambiguous (thumb-friendly).

---

### 4.6 Outfit Pieces List (Optional but Recommended)

**Component:** `OutfitItemList`

**Purpose:** Show the items that make up the outfit, for transparency and control.

- Title: `Items in this outfit` or `What you’ll wear`.
- For each item, show a small row:
  - Thumbnail image (mini version of the clothing photo).
  - Type: `T-Shirt`, `Jeans`, `Sneakers`.
  - Color label (e.g., `Navy`, `White`).
  - Optional: tap to open Clothing Details screen in a new view.

This helps users trust the AI and understand which physical items they’re actually choosing.

---

### 4.7 Bottom Navigation Bar

- Same bottom nav as all other main screens.
- `Outfit` tab is highlighted/active.
- Glass / floating style remains consistent.

---

## 5. Reusable Components to Use

The AI coder should **not** build this screen from scratch each time, but rather compose it from reusable blocks:

- `ScreenContainer` – generic wrapper for background, padding, scroll.
- `HeaderBar` – used across Home/Wardrobe/Outfit.
- `OutfitPreviewCard` – large image card (reusable in History/Details).
- `MetaChipRow` – re-used for showing meta chips in other views.
- `ReasonCard` – AI explanation block, callable elsewhere (e.g., History).
- `OutfitActionRow` – the cluster of like/dislike/shuffle/wear controls.
- `OutfitItemList` – vertical list of items with thumbnails.
- `BottomNavBar` – global navigation component.

Each of these should be generic enough that they can be reused on **Outfit History** and **Outfit Details** later.

---

## 6. States & Edge Cases

The Outfit Generator screen must handle:

1. **Loading state**
   - Show skeleton placeholder for preview card.
   - Grey chips for meta.
   - Disabled actions, with a spinner near center or inside the card.

2. **No outfits available**
   - Friendly message: `We couldn’t create an outfit right now.`
   - Suggest action: `Try uploading more clothes` with a button to Wardrobe/Upload.

3. **Error state**
   - Short, clear error + retry button:
     - `Something went wrong` + `Try again`.

4. **Already chosen outfit**
   - If today’s outfit is already selected, show a subtle label like `Selected for today` near the top or on the preview.

---
