# True Influence Method — Project Overview

## Project Type: In-Browser React SPA (no build step)

This is **not** a standard React project (no `package.json`, no build tooling, no bundler). Instead, it's a **static HTML site** that uses:

- **React 18** loaded via CDN (`unpkg`) as UMD bundles
- **JSX transpiled in-browser** by `@babel/standalone` (no compile step)
- **Hash-based SPA routing** via a lightweight custom router
- **Plain CSS** (no Tailwind, no CSS-in-JS, no preprocessor)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.3.1 (UMD CDN) |
| JSX transpiler | Babel Standalone 7.29.0 |
| Styling | Vanilla CSS (5 stylesheets) |
| Routing | Custom hash-based SPA router (`tim:navigate` custom events) |
| Build | None — files served directly as `.html` |
| Design tool | Built-in "Tweaks Panel" for live palette/page switching |

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | App entry point — loads React/Babel CDN, mounts `<App />`, defines routes |
| `shell.jsx` | Shared components: `Nav`, `Footer`, `Container`, `Section`, `Button`, `Pill`, `Quote`, `Field`, `Plate`. Also holds the `PRODUCTS` catalog and `goTo()` router helper. |
| `home.jsx` | Homepage (`HomePage`) — hero, ICP cards, lead magnets, testimonials, footer CTA |
| `icp.jsx` | ICP (Ideal Customer Profile) pages: `SpeakerPage`, `AuthorityPage`, `LegacyPage` |
| `products.jsx` | Product detail pages (`ProductDetail`, `CheckoutPage`), plus `AssessmentPage`, `AllProgramsPage`, `CorporatePage`, `SpeakingPage`, and other full-page components |
| `supporting.jsx` | Supporting pages: `AboutPage`, `JourneyPage`, `StoriesPage`, `FAQPage`, `CommunityPage`, `NotFound` |
| `design-canvas.jsx` | Design canvas / moodboard page |
| `wireframes.jsx` | Wireframe / layout grid page |
| `tweaks-panel.jsx` | Reusable `TweaksPanel` component — design-time controls for palette, sliders, selects. Only visible in "edit mode." |
| `joanna.html` | Standalone HTML page (likely an earlier version or alternative entry) |
| `styles-base.css` | Root variables, nav, footer, typography, buttons, layout primitives |
| `styles-comp.css` | Component-level styles (cards, forms, hero grid, testi grid, etc.) |
| `styles-page.css` | Full-page component styles (ICP pages, product pages, about, etc.) |
| `styles-speaking.css` | Speaking / keynote booking page styles |
| `styles-journey.css` | Journey / timeline page styles |

## Architecture

### Routing

Custom hash-based SPA router:
- `index.html` listens for `tim:navigate` custom events on `window`
- `goTo(route, params)` dispatches the event and pushes hash state
- `<App>` renders the matching page component via a `switch` statement
- Routes: `home`, `speaker`, `authority`, `legacy`, `product`, `checkout`, `about`, `journey`, `stories`, `faq`, `community`, `corporate`, `speaking`, `work`, `assessment`

### Component Pattern

All pages are **function components** exposed on `window` (e.g., `window.HomePage = HomePage`). The main `<App>` component references them from the global scope — there's no module system.

### Design Stage / Tweaks

The project includes a client-side design iteration tool:
- `TweaksPanel` enables live editing of colors, palettes, and route navigation
- Palette values are injected as CSS custom properties (`--accent`, `--ink`, `--paper`, `--accent-soft`)
- The file can be opened directly in a browser and iterated on without any server

## How to Run

Open `index.html` directly in a browser. No server, build step, or dependencies needed. The site loads React, Babel, and all JSX files from CDN and local disk.

## Custom PHP CMS

The project now includes a **flat-file PHP CMS** running alongside the React frontend.

### Architecture

```
Browser ──→ index.html → content-loader.js ──→ api/content.php ←─→ content/*.json
                  ↓                                      ↑
              React SPA                          admin/*.php (editors)
```

### How It Works

- All hardcoded content from JSX files is extracted into `content/*.json` files
- A PHP API (`api/content.php?type=all`) serves the content
- `content-loader.js` fetches it on page load and sets `window.CONTENT`, `window.PRODUCTS`, etc.
- JSX components reference `window.PRODUCTS`, `window.HOME`, `window.ICP`, etc.
- The `<Underline>` JSX component is replaced by a CSS `.u` class (same visual)
- When the API is unavailable, components gracefully degrade (empty states)

### Admin Panel

| Path | Purpose |
|------|---------|
| `/admin/` | Login (default password: `admin123`, change immediately) |
| `/admin/dashboard.php` | Content manager index |
| `/admin/edit-products.php` | Edit product catalog (names, prices, bullets, CTAs) |
| `/admin/edit-home.php` | Edit homepage (all sections, testimonials, ICP cards) |
| `/admin/edit-pages.php` | Edit About, Journey, Stories, FAQ, Community, Corporate |
| `/admin/edit-speaking.php` | Edit Speaking page (talks, events, inquiry) |
| `/admin/edit-global.php` | Edit nav menus, footer, site settings |
| `/admin/edit-password.php` | Change admin password |

### Content Files

| File | What it controls |
|------|-----------------|
| `content/products.json` | 10 products with prices, bullets, tags |
| `content/home.json` | Homepage hero, sections, ICP cards, testimonials |
| `content/product-details.json` | Per-product "You build/experience/leave with" copy |
| `content/icp.json` | Speaker, Authority, Legacy pages |
| `content/pages.json` | About, Journey, Stories, FAQ, Community, Corporate |
| `content/speaking.json` | Booking page, reel, events, talks, inquiry form |
| `content/global.json` | Nav menus, footer columns, site name, email |
| `content/checkout.json` | Checkout page copy |

### Deployment Requirements

- **PHP 8+** (Hostinger supports this natively)
- Upload everything via FTP — no database, no build step
- Change the default password at `/admin/edit-password.php` after first login
- The `content/` directory must be writable by PHP to save edits

### Editing Flow

1. Visit `/admin/` → log in
2. Select content area to edit
3. Save → file written to `content/*.json`
4. Refresh the frontend → changes reflected immediately

## Notes

- This is a **prototype / design-stage** project — evidenced by the `tweaks-panel.jsx`, `design-canvas.jsx`, `wireframes.jsx`, and screenshot directories
- No React hooks or state management beyond `useState`/`useEffect`
- No TypeScript
- The project is for a personal brand coaching business called **"True Influence Method — with Joanna"**
