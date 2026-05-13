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

## Notes

- This is a **prototype / design-stage** project — evidenced by the `tweaks-panel.jsx`, `design-canvas.jsx`, `wireframes.jsx`, and screenshot directories
- No React hooks or state management beyond `useState`/`useEffect`
- No TypeScript
- The project is for a personal brand coaching business called **"True Influence Method — with Joanna"**
