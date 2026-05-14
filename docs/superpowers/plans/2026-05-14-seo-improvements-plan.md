# SEO Improvements — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add comprehensive SEO to the True Influence Method website including meta tags, Open Graph, Twitter Cards, favicon, robots.txt, sitemap.xml, JSON-LD structured data, and dynamic per-page title/meta updates.

**Architecture:** Static SEO tags in `index.html <head>` provide crawler defaults. A `PAGE_SEO` map in `shell.jsx` is exposed via `window` and consumed by a `useEffect` in the App component to update `document.title` and meta tags on route changes. Static files `robots.txt` and `sitemap.xml` live at the project root.

**Tech Stack:** HTML, Vanilla JS, React (via Babel standalone)

**Files:**
- Modify: `index.html`
- Modify: `shell.jsx`
- Create: `robots.txt`
- Create: `sitemap.xml`

---

## File Structure

| File | Responsibility |
|---|---|
| `index.html` | Static `<head>` SEO tags, dynamic `useEffect` for route-based meta updates, `setMeta` helper |
| `shell.jsx` | `PAGE_SEO` metadata map, exposed via `window.PAGE_SEO` |
| `robots.txt` | Crawler directives |
| `sitemap.xml` | Page URLs for search engines |

---

### Task 1: Add static SEO tags to index.html `<head>`

**Files:**
- Modify: `index.html` (the `<head>` section, before the CSS links)

Add meta description, OG tags, Twitter Card, JSON-LD, canonical URL, and favicon links.

- [ ] **Step 1: Read index.html**

Read lines 1-25 of `index.html` to confirm the current `<head>` content.

- [ ] **Step 2: Insert SEO tags after the `<meta charset>` and before the font preconnect**

Using a single edit, insert all of the following right after `<meta name="viewport" ... />` (line 6):

```html
  <meta name="description" content="The True Influence Method helps leaders find their message, build trust, and earn influence — without speaking. Work with Joanna." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://trueinfluencemethod.com/" />

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
  <link rel="apple-touch-icon" href="assets/thumbnail.png" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="True Influence Method" />
  <meta property="og:title" content="True Influence Method — with Joanna" />
  <meta property="og:description" content="Leaders find their message, build trust, and earn influence — without speaking." />
  <meta property="og:image" content="https://trueinfluencemethod.com/assets/thumbnail.png" />
  <meta property="og:url" content="https://trueinfluencemethod.com/" />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="True Influence Method — with Joanna" />
  <meta name="twitter:description" content="Leaders find their message, build trust, and earn influence — without speaking." />
  <meta name="twitter:image" content="https://trueinfluencemethod.com/assets/thumbnail.png" />

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "True Influence Method",
    "url": "https://trueinfluencemethod.com",
    "description": "Leaders find their message, build trust, and earn influence — without speaking.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://trueinfluencemethod.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
```

- [ ] **Step 3: Verify the tags are present**

Run: `grep -c 'og:title\|twitter:card\|schema.org\|favicon.ico' /Users/jdbernardo/Sites/tim-revamp/index.html`
Expected: `4` (at least one match each for OG, Twitter, JSON-LD, favicon)

---

### Task 2: Add PAGE_SEO map to shell.jsx

**Files:**
- Modify: `shell.jsx`

Add the `PAGE_SEO` metadata map and expose it via `Object.assign(window, ...)`.

- [ ] **Step 1: Read shell.jsx**

Read the end of `shell.jsx` to find the `Object.assign(window, ...)` block (around lines 278-284).

- [ ] **Step 2: Add PAGE_SEO before the Object.assign**

Add this right before the `Object.assign(window, ...)` block:

```javascript
// ----- per-page SEO metadata -----
const PAGE_SEO = {
    home:      { title: "True Influence Method \u2014 with Joanna", desc: "Leaders find their message, build trust, and earn influence \u2014 without speaking. Work with Joanna." },
    speaker:   { title: "The Speaker \u2014 Find Your Message | True Influence Method", desc: "You know you have something to say \u2014 but you can\u2019t clearly say what defines you yet. Start Phase 1 and find your message." },
    authority: { title: "The Authority \u2014 Build Your Talk | True Influence Method", desc: "You know your work \u2014 but you over-explain it when it matters most. Build your signature talk in Phase 2." },
    legacy:    { title: "The Legacy \u2014 Define Your Legacy | True Influence Method", desc: "You\u2019ve built something significant but you aren\u2019t clearly known for what you do differently. Define your legacy." },
    about:     { title: "About Joanna \u2014 True Influence Method", desc: "Joanna helps leaders find the words for the work they already do \u2014 and build the rooms where those words land." },
    journey:   { title: "The Journey \u2014 True Influence Method", desc: "How Joanna found the work \u2014 from a caf\u00e9 conversation to 300+ leaders guided." },
    stories:   { title: "Success Stories \u2014 True Influence Method", desc: "Real women, real results across every phase of the True Influence Method." },
    faq:       { title: "FAQ \u2014 True Influence Method", desc: "Answers to common questions about the True Influence Method, programs, and getting started." },
    speaking:  { title: "Book Joanna to Speak \u2014 True Influence Method", desc: "Book Joanna for your next event, keynote, or corporate training." },
    community: { title: "Community \u2014 True Influence Method", desc: "Monthly gatherings, events, and community for leaders using the True Influence Method." },
    corporate: { title: "Corporate Training \u2014 True Influence Method", desc: "The True Influence Method delivered to leadership teams of 6\u201324." },
    work:      { title: "All Programs \u2014 True Influence Method", desc: "Explore all True Influence Method programs and find the path that fits where you are." },
    product:   { title: "Program Details \u2014 True Influence Method", desc: "Detailed information about True Influence Method programs and products." },
    assessment:{ title: "Influence Path Assessment \u2014 True Influence Method", desc: "Take the 5-minute assessment to find your phase in the True Influence Method." },
};
```

- [ ] **Step 3: Add PAGE_SEO to the window exports**

In the `Object.assign(window, ...)` block, add `PAGE_SEO` to the list:

```javascript
Object.assign(window, {
    goTo,
    PRODUCTS,
    CHECKOUT_URLS,
    PAGE_SEO,
    ...
});
```

- [ ] **Step 4: Verify**

Run: `grep -c 'PAGE_SEO' /Users/jdbernardo/Sites/tim-revamp/shell.jsx`
Expected: `3` (definition, Object.assign, and the var statement)

---

### Task 3: Add dynamic SEO update in App component (index.html)

**Files:**
- Modify: `index.html` (the inline `<script type="text/babel">` App component)

Add a `setMeta` helper function and a `useEffect` that updates `<title>` and meta tags when the route changes.

- [ ] **Step 1: Add setMeta helper**

Inside the inline `<script type="text/babel">` block in `index.html`, add the `setMeta` helper as a top-level function before the `App` component definition:

```javascript
    function setMeta(property, content) {
      var el = document.querySelector('meta[property="' + property + '"], meta[name="' + property + '"]');
      if (!el) {
        el = document.createElement('meta');
        if (property.indexOf('og:') === 0) el.setAttribute('property', property);
        else el.setAttribute('name', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    }
```

- [ ] **Step 2: Add SEO useEffect to the App component**

Inside the `App` component, add a `useEffect` that runs when `route.name` changes. Place it after the existing palette `useEffect` (the one that sets CSS variables):

```javascript
      // SEO — update title and meta on route change
      React.useEffect(() => {
        var SEO = window.PAGE_SEO || {};
        var seo = SEO[route.name];
        if (seo) {
          document.title = seo.title;
          setMeta('description', seo.desc);
          setMeta('og:title', seo.title);
          setMeta('og:description', seo.desc);
          setMeta('twitter:title', seo.title);
          setMeta('twitter:description', seo.desc);
        }
      }, [route.name]);
```

- [ ] **Step 3: Verify**

Run: `grep -c 'setMeta\|PAGE_SEO\[route' /Users/jdbernardo/Sites/tim-revamp/index.html`
Expected: `2` (the function definition and the useEffect call)

---

### Task 4: Create robots.txt

**Files:**
- Create: `robots.txt`

- [ ] **Step 1: Create robots.txt**

```txt
User-agent: *
Allow: /

Sitemap: https://trueinfluencemethod.com/sitemap.xml
```

- [ ] **Step 2: Verify**

Run: `cat /Users/jdbernardo/Sites/tim-revamp/robots.txt`
Expected: Content matches above

---

### Task 5: Create sitemap.xml

**Files:**
- Create: `sitemap.xml`

- [ ] **Step 1: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://trueinfluencemethod.com/</loc><priority>1.0</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/speaker</loc><priority>0.9</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/authority</loc><priority>0.9</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/legacy</loc><priority>0.9</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/about</loc><priority>0.7</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/journey</loc><priority>0.7</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/stories</loc><priority>0.7</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/faq</loc><priority>0.6</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/speaking</loc><priority>0.6</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/community</loc><priority>0.5</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/corporate</loc><priority>0.5</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/work</loc><priority>0.8</priority></url>
  <url><loc>https://trueinfluencemethod.com/#/assessment</loc><priority>0.5</priority></url>
</urlset>
```

- [ ] **Step 2: Verify XML is well-formed**

Run: `php -r "simplexml_load_file('sitemap.xml'); echo 'Valid XML';" 2>/dev/null || echo 'Invalid XML'`
Expected: `Valid XML`

---

## Self-Check: Spec Coverage

- **Static meta/OG/Twitter tags in `<head>`**: Task 1 ✓
- **Favicon + apple-touch-icon**: Task 1 ✓
- **Canonical URL**: Task 1 ✓
- **JSON-LD structured data**: Task 1 ✓
- **PAGE_SEO map**: Task 2 ✓
- **Expose via window**: Task 2 ✓
- **Dynamic title/meta update**: Task 3 (setMeta + useEffect) ✓
- **robots.txt**: Task 4 ✓
- **sitemap.xml**: Task 5 ✓
- **Edge case — unknown route falls back to static default**: Task 3 useEffect only updates if seo found, else static tags remain ✓
- **Edge case — missing meta elements created**: Task 3 setMeta creates them if absent ✓
