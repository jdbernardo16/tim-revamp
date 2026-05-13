// content-loader.js — fetches all CMS content into window globals
(async function loadContent() {
  try {
    const r = await fetch('api/content.php?type=all');
    const data = await r.json();

    // Populate globals for each content area
    window.CONTENT = data;

    // Legacy globals for backward compat
    if (data.products) window.PRODUCTS = data.products;
    if (data.home) window.HOME = data.home;
    if (data['product-details']) window.PRODUCT_DETAILS = data['product-details'];
    if (data.icp) window.ICP = data.icp;
    if (data.pages) window.PAGES = data.pages;
    if (data.speaking) window.SPEAKING = data.speaking;
    if (data.global) window.GLOBAL = data.global;
    if (data.checkout) window.CHECKOUT = data.checkout;

    window._CONTENT_LOADED = true;
  } catch (e) {
    console.warn('Content API unavailable, using fallback.');
    window._CONTENT_LOADED = false;
  }
})();
