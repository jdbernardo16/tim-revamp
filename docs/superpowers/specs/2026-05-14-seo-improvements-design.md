# SEO Improvements — Design Spec

**Date**: 2026-05-14
**Status**: Approved design direction

---

## 1. Overview

Add comprehensive SEO to the True Influence Method website: meta tags, Open Graph, Twitter Cards, favicon, robots.txt, sitemap.xml, JSON-LD structured data, and dynamic per-page title/meta updates via React.

The site is a React SPA with CMS-driven content and client-side routing. SEO must work for both the initial HTML (crawlers) and dynamic route changes (users).

## 2. Static Files

### 2.1 robots.txt (at `/robots.txt`)

Allow all crawlers, point to sitemap:

```
User-agent: *
Allow: /

Sitemap: https://trueinfluencemethod.com/sitemap.xml
```

### 2.2 sitemap.xml (at `/sitemap.xml`)

List all public pages with lastmod dates and priority:

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
</urlset>
```

## 3. HTML `<head>` — Static Tags

Added to `index.html` `<head>` section before the CSS links.

### 3.1 Meta Tags

```html
<meta name="description" content="The True Influence Method helps leaders find their message, build trust, and earn influence — without speaking. Work with Joanna." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://trueinfluencemethod.com/" />
```

### 3.2 Favicon

```html
<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
<link rel="apple-touch-icon" href="assets/thumbnail.png" />
```

### 3.3 Open Graph

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="True Influence Method" />
<meta property="og:title" content="True Influence Method — with Joanna" />
<meta property="og:description" content="Leaders find their message, build trust, and earn influence — without speaking." />
<meta property="og:image" content="https://trueinfluencemethod.com/assets/thumbnail.png" />
<meta property="og:url" content="https://trueinfluencemethod.com/" />
<meta property="og:locale" content="en_US" />
```

### 3.4 Twitter Card

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="True Influence Method — with Joanna" />
<meta name="twitter:description" content="Leaders find their message, build trust, and earn influence — without speaking." />
<meta name="twitter:image" content="https://trueinfluencemethod.com/assets/thumbnail.png" />
```

### 3.5 JSON-LD Structured Data

```html
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

## 4. Dynamic Per-Page SEO (React)

### 4.1 SEO Metadata Map

Add a `PAGE_SEO` object to `shell.jsx` mapping each route to its title and description:

```javascript
const PAGE_SEO = {
  home:      { title: "True Influence Method — with Joanna", desc: "Leaders find their message, build trust, and earn influence — without speaking. Work with Joanna." },
  speaker:   { title: "The Speaker — Find Your Message | True Influence Method", desc: "You know you have something to say — but you can't clearly say what defines you yet. Start Phase 1 and find your message." },
  authority: { title: "The Authority — Build Your Talk | True Influence Method", desc: "You know your work — but you over-explain it when it matters most. Build your signature talk in Phase 2." },
  legacy:    { title: "The Legacy — Define Your Legacy | True Influence Method", desc: "You've built something significant but you aren't clearly known for what you do differently. Define your legacy." },
  about:     { title: "About Joanna — True Influence Method", desc: "Joanna helps leaders find the words for the work they already do — and build the rooms where those words land." },
  journey:   { title: "The Journey — True Influence Method", desc: "How Joanna found the work — from a caf\u00e9 conversation to 300+ leaders guided." },
  stories:   { title: "Success Stories — True Influence Method", desc: "Real women, real results across every phase of the True Influence Method." },
  faq:       { title: "FAQ — True Influence Method", desc: "Answers to common questions about the True Influence Method, programs, and getting started." },
  speaking:  { title: "Book Joanna to Speak — True Influence Method", desc: "Book Joanna for your next event, keynote, or corporate training." },
  community: { title: "Community — True Influence Method", desc: "Monthly gatherings, events, and community for leaders using the True Influence Method." },
  corporate: { title: "Corporate Training — True Influence Method", desc: "The True Influence Method delivered to leadership teams of 6\u201324." },
  work:      { title: "All Programs — True Influence Method", desc: "Explore all True Influence Method programs and find the path that fits where you are." },
};
```

### 4.2 Expose PAGE_SEO via window

In `shell.jsx`, add `PAGE_SEO` to the `Object.assign(window, ...)` call so the App component in `index.html` can access it:

```javascript
Object.assign(window, {
    ...
    PAGE_SEO,
});
```

### 4.3 Dynamic Update in App Component

In the App component (`index.html`, around the route rendering), add a `useEffect` that updates `<title>` and meta tags when the route changes:

```javascript
// SEO — update title and meta on route change
React.useEffect(() => {
  const SEO = window.PAGE_SEO || {};
  const seo = SEO[route.name];
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

Helper function to update meta tags (placed inside the App component or as a top-level function):

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

## 5. Files Changed

| File | Change |
|---|---|
| `index.html` | Add meta tags, OG, Twitter, JSON-LD, favicon, canonical to `<head>` |
| `shell.jsx` | Add `PAGE_SEO` map and expose `setMeta`/`PAGE_SEO` |
| `index.html` (App component) | Add `useEffect` for dynamic title/meta updates |
| `robots.txt` | New file — allow all, point to sitemap |
| `sitemap.xml` | New file — list all public pages |

## 6. Edge Cases

- **Route not in PAGE_SEO**: Falls back to default title/desc (the static `<title>` in index.html)
- **Product page detail routes**: Currently uses `route.name` which is `'product'` for all products. The `PAGE_SEO` map handles `product` with a generic title
- **Checkout redirect**: Already handled before React renders — SEO doesn't apply to these external pages
- **Missing meta elements**: The `setMeta` helper creates them if they don't exist

## 7. Verification

- View page source — meta description, OG tags, Twitter tags, JSON-LD, canonical, favicon all present
- Dynamic: navigate between routes — `<title>` and meta tags update
- `robots.txt` returns 200 with correct content
- `sitemap.xml` returns 200 with valid XML
- Share on Facebook/Twitter/LinkedIn — card shows title, description, thumbnail image
