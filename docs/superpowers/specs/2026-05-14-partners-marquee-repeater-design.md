# Partners Marquee + CMS Repeater — Design Spec

**Date**: 2026-05-14
**Status**: Approved design direction

---

## 1. Overview

Replace the old logo row with a branded "Trusted By" partners marquee that matches the site's dark navy/gold/ivory theme, pull partner logos from CMS data (not hardcoded), and build a reusable repeater field component for the admin CMS so repeating content types (logos, testimonials, ICP cards, etc.) use add/remove/reorder instead of fixed slots.

## 2. Visual Design — Partners Section

The section sits between dark navy sections as a gold accent band.

### 2.1 Section Container

| Property | Value |
|---|---|
| Background | `var(--accent)` (`#d4b478` gold) |
| Position | `relative`, `overflow: hidden` |
| Padding | 0 (internal spacing via children) |

### 2.2 Dividers (top & bottom)

- 1px tall, full width
- Navy (`--ink` / `#0f203d`) gradient to transparent
- Gradient: `transparent → rgba(15,32,61,0.5) → transparent`
- Top divider: `margin-bottom: 48px`
- Bottom divider: `margin-top: 48px`

### 2.3 "Trusted By" Pill Badge

| Property | Value |
|---|---|
| Background | `rgba(15,32,61,0.08)` (navy tint) |
| Border | `1px solid rgba(15,32,61,0.15)` |
| Text color | `var(--ink)` (`#0f203d` navy) |
| Dot color | `var(--ink)` |
| Font | 0.7rem, 700 weight, 0.2em letter-spacing, uppercase |
| Shape | `border-radius: 9999px`, `padding: 8px 20px` |

### 2.4 Logo Marquee Strip

- Outer wrapper: `overflow: hidden`, CSS `mask-image` fade on left/right edges (navy-tinted)
- Track: flex row, `@keyframes marquee 50s linear infinite` scrolling to `-50%`
- Logos duplicated in DOM for seamless loop
- Each logo is a flex-centered container, `padding: 16px 24px` (20px 40px on desktop)

**Logo image styling**:
| State | Filter | Opacity |
|---|---|---|
| Default | `brightness(0)` (black silhouette — reads as dark ink on gold) | 0.55 |
| Hover | `none` (full color) | 1 |

**Marquee pauses on hover** (`animation-play-state: paused`).

### 2.5 Responsive

- Mobile: logos `max-height: 40px`, padding `16px 24px`
- Desktop (768px+): logos `max-height: 56px`, padding `20px 40px`
- Container `max-width: 1280px`, horizontal padding `32px`

## 3. CMS Data Model

### 3.1 Partner Logos (in `content/home.json`)

```json
{
  "logos": [
    { "src": "assets/partners/cnn.webp", "alt": "CNN" },
    { "src": "assets/partners/forbes.jpeg", "alt": "Forbes" }
  ]
}
```

`HOME.logos` drives the frontend — no hardcoded partner list.

### 3.2 Existing Data Backward Compatibility

Old `logos` format `[{src, alt}]` is identical — existing saved data continues working. The only change is the admin now allows any number of entries instead of exactly 6.

## 4. CMS Repeater Component

### 4.1 PHP Helper: `renderRepeater()`

A reusable function in `admin/helpers.php`:

```php
function renderRepeater(string $name, array $items, array $fields, array $opts = []): void
```

**Parameters**:
- `$name`: Base name for form fields (e.g., `'logos'` generates `logos[0][src]`, `logos[0][alt]`)
- `$items`: Current array of data from `loadJson()`
- `$fields`: Array of field definitions:
  ```php
  [
    ['src', 'image', 'Logo Image'],
    ['alt', 'text', 'Alt Text'],
  ]
  ```
  Each field: `[key, type, label]` where type is `text`, `textarea`, `image`
- `$opts`: Optional — `maxItems`, `minItems`, `sortable` (default true)

**Rendered output**:
```
<div class="repeater-wrapper" data-name="logos">
  <div class="repeater-items">
    <div class="repeater-item">
      <button type="button" class="repeater-remove">×</button>
      <button type="button" class="repeater-move-up">↑</button>
      <button type="button" class="repeater-move-down">↓</button>
      <input name="logos[0][src]" value="...">
      <input name="logos[0][alt]" value="...">
    </div>
  </div>
  <button type="button" class="repeater-add">+ Add item</button>
</div>
```

### 4.2 JavaScript Behavior (`admin/repeater.js`)

- **Add**: Clones the last `.repeater-item` template, clears values, increments indices
- **Remove**: Deletes the item row (if above `minItems`)
- **Reorder**: Up/down buttons swap adjacent rows
- **Indices**: Re-indexed on every add/remove/reorder so PHP receives a clean 0-based array
- **Image picker**: Re-binds `openImagePicker` for cloned image fields

### 4.3 PHP Processing (in `edit-home.php`)

Generic handler pattern for repeater fields:

```php
$logos = [];
foreach (($d['logos'] ?? []) as $item) {
  $logos[] = [
    'src' => strip_tags($item['src'] ?? ''),
    'alt' => strip_tags($item['alt'] ?? ''),
  ];
}
$data['logos'] = $logos;
```

### 4.4 Upgrade Existing CMS Fields

Replace fixed-slot and textarea-delimited repeaters across `edit-home.php`:

| Section | Current | New |
|---|---|---|
| **Partner logos** | Fixed 6 slots (`for $i 0..5`) | `renderRepeater('logos', ...)` |
| **Testimonials** | Textarea with `---` delimiter | `renderRepeater('testimonials', ...)` with quote/name/role fields |
| **ICP cards** | Fixed 3 (speaker/authority/legacy) | `renderRepeater('icpCards', ...)` with optional `maxItems: 3` |

(Optional stretch: `falseProblems`, `whatsHappeningList`, `whatShiftsList` remain textarea/simple arrays since each item is a single string.)

## 5. Frontend — home.jsx

### 5.1 Partners Section Rendering

```jsx
<section className="partners-section">
  <div className="partners-container">
    <div className="partners-gold-divider partners-divider-ink" />
    <div className="partners-heading">
      <span className="partners-pill partners-pill-ink">
        <span className="partners-pill-dot partners-pill-dot-ink" />
        {HOME.logoRowLabel || "Trusted By"}
      </span>
    </div>
  </div>
  <div className="partners-marquee-wrapper">
    <div className="partners-marquee-track">
      {[...HOME.logos, ...HOME.logos].map((logo, i) => (
        <div key={i} className="partner-logo" aria-label={logo.alt}>
          <img src={logo.src} alt={logo.alt} draggable="false" />
        </div>
      ))}
    </div>
  </div>
  <div className="partners-container">
    <div className="partners-gold-divider partners-divider-ink" />
  </div>
</section>
```

Key change from current code:
- Data from `HOME.logos` (CMS) instead of hardcoded array
- Two-class pattern for pill/divider to handle both ink and accent color schemes
- `.partners-divider-ink` = navy gradient (for gold bg)
- `.partners-pill-ink` = navy-styled pill (for gold bg)

### 5.2 Partner Data Population

Populate `HOME.logos` with the 32 partner images so the CMS has seed data. The `content/home.json` logos array gets populated with all 32 entries.

## 6. CSS Changes

### 6.1 New Classes (replace current partners CSS)

```css
/* Section — gold background */
.partners-section {
  background: var(--accent);
  position: relative;
  overflow: hidden;
  padding: 0;
}

/* Container */
.partners-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Gold divider defaults */
.partners-gold-divider {
  height: 1px;
  width: 100%;
}
/* Default = gold on dark bg (for legacy if re-used) */
.partners-divider-gold {
  background: linear-gradient(to right, transparent, rgba(212,180,120,0.4), transparent);
}
/* Ink divider for gold bg */
.partners-divider-ink {
  background: linear-gradient(to right, transparent, rgba(15,32,61,0.5), transparent);
}

/* Pill — gold bg variant */
.partners-pill-ink {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(15,32,61,0.08);
  border: 1px solid rgba(15,32,61,0.15);
  color: var(--ink);
  padding: 8px 20px;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.partners-pill-dot-ink {
  width: 8px; height: 8px;
  background: var(--ink);
  border-radius: 50%;
}

/* Heading wrapper */
.partners-heading {
  text-align: center;
  margin-bottom: 48px;
}

/* Marquee wrapper — fade edges */
.partners-marquee-wrapper {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

/* Track animation */
@keyframes partners-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.partners-marquee-track {
  display: flex;
  align-items: center;
  width: fit-content;
  animation: partners-marquee 50s linear infinite;
}
.partners-marquee-track:hover {
  animation-play-state: paused;
}

/* Individual logo */
.partners-marquee-track .partner-logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
}
.partners-marquee-track .partner-logo img {
  max-height: 40px;
  width: auto;
  object-fit: contain;
  opacity: 0.55;
  filter: brightness(0);
  transition: all 0.4s ease;
  user-select: none;
}
.partners-marquee-track .partner-logo:hover img {
  opacity: 1;
  filter: none;
}

/* Desktop */
@media (min-width: 768px) {
  .partners-marquee-track .partner-logo {
    padding: 20px 40px;
  }
  .partners-marquee-track .partner-logo img {
    max-height: 56px;
  }
}
```

### 6.2 Admin Repeater CSS (in `helpers.php` inline styles)

Additional admin styles for repeater rows, add/remove buttons, drag handles.

## 7. Files Changed

| File | Change |
|---|---|
| `admin/helpers.php` | Add `renderRepeater()` function + CSS + JS assets |
| `admin/repeater.js` | New file — repeater JS (add/remove/reorder/indexing) |
| `admin/edit-home.php` | Replace fixed logos with `renderRepeater()`, upgrade testimonials + ICP |
| `content/home.json` | Populate `logos` with 32 partner entries |
| `home.jsx` | Replace hardcoded partner data with `HOME.logos` loop, update CSS classes |
| `styles-comp.css` | Replace partner CSS with gold-bg + navy-filter variant |

## 8. Edge Cases & Error Handling

- **Empty logos**: If `HOME.logos` is empty or undefined, render nothing (no marquee, no section)
- **Single logo**: Duplicate works fine — track scrolls through 2 items
- **Old data format**: Same `{src, alt}` shape — backward compatible
- **Repeater min items**: Default 1 (can't delete last item)
- **Image picker on cloned rows**: JS re-binds `openImagePicker` for each new row
- **PHP indexing**: Repeater submits clean `[0]`, `[1]`, `[2]`... indices

## 9. Verification

- Partners section renders gold background with navy dividers
- Logos appear navy-tinted, become full color on hover
- Marquee animation scrolls smoothly, pauses on hover
- Admin: add/remove/reorder logo entries, save, reload — data persists
- Testimonials and ICP cards also upgraded to repeater
- No console errors, no missing images
