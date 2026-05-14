# Partners Marquee + CMS Repeater — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old logo row with a gold-background partners marquee driven by CMS data, and build a reusable admin repeater component for dynamic content entries.

**Architecture:** The partners section renders on the gold (`--accent`) background with navy-styled pill badge and dividers. Logos come from `content/home.json`'s `logos` array (populated with 32 partners). Admin uses a reusable `renderRepeater()` PHP helper + JavaScript that supports add/remove/reorder for any repeating content type.

**Tech Stack:** PHP (admin CMS), Vanilla JS (repeater), React/JSX (frontend rendered via Babel standalone), CSS custom properties

**Files:**
- Modify: `styles-comp.css` — replace partners CSS with gold-bg theme
- Modify: `home.jsx` — wire to `HOME.logos`, use new CSS classes
- Create: `admin/repeater.js` — add/remove/reorder/index repeater rows
- Modify: `admin/helpers.php` — add `renderRepeater()` function
- Modify: `admin/edit-home.php` — upgrade logos/testimonials/ICP to repeater
- Modify: `content/home.json` — populate 32 partner logos

---

## File Structure

| File | Responsibility |
|---|---|
| `styles-comp.css` | All partners section CSS (gold bg, navy dividers, marquee animation, logo hover) |
| `home.jsx` | Partners section JSX — reads `HOME.logos`, `HOME.logoRowLabel`, applies CSS classes |
| `admin/repeater.js` | JS logic for adding/removing/reordering repeater rows, re-indexing form names |
| `admin/helpers.php` | `renderRepeater()` function that outputs repeater HTML with field templates |
| `admin/edit-home.php` | Admin page — calls `renderRepeater()` for logos/testimonials/ICP cards |
| `content/home.json` | Data store — `logos` array gets 32 entries |

---

### Task 1: Update partners CSS for gold background + navy ink accents

**Files:**
- Modify: `styles-comp.css`

Replace the existing `.partners-*` CSS rules with the gold-background theme. Keep the marquee animation but update colors and logo treatment.

- [ ] **Step 1: Replace the partners CSS block**

Replace everything from `/* ── partners marquee ──────────────────────────────── */` through the closing `}` of the `@media` block with the new CSS below.

Read the file first at the expected location (around line 237), then apply:

```
/* ── partners marquee ──────────────────────────────── */
@keyframes partners-marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.partners-section {
    background: var(--accent);
    position: relative;
    overflow: hidden;
    padding: 0;
}

.partners-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
}

.partners-gold-divider {
    height: 1px;
    width: 100%;
}

.partners-divider-ink {
    background: linear-gradient(to right, transparent, rgba(15,32,61,0.5), transparent);
}

.partners-heading {
    text-align: center;
    margin-bottom: 48px;
}

.partners-pill-ink {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(15,32,61,0.08);
    border: 1px solid rgba(15,32,61,0.15);
    color: var(--ink);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 8px 20px;
    border-radius: 9999px;
    margin-bottom: 24px;
}

.partners-pill-dot-ink {
    width: 8px;
    height: 8px;
    background: var(--ink);
    border-radius: 50%;
    flex-shrink: 0;
}

.partners-marquee-wrapper {
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
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

.partners-marquee-track .partner-logo {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    transition: all 0.4s ease;
}

.partners-marquee-track .partner-logo img {
    max-height: 40px;
    width: auto;
    object-fit: contain;
    opacity: 0.55;
    filter: brightness(0);
    transition: all 0.4s ease;
    user-select: none;
    -webkit-user-drag: none;
}

.partners-marquee-track .partner-logo:hover img {
    opacity: 1;
    filter: none;
}

@media (min-width: 768px) {
    .partners-marquee-track .partner-logo {
        padding: 20px 40px;
    }
    .partners-marquee-track .partner-logo img {
        max-height: 56px;
    }
}
```

- [ ] **Step 2: Verify the CSS**

Run: `grep -c 'partners-section' styles-comp.css`
Expected: `1` (the new class exists)

---

### Task 2: Update home.jsx — partners section driven by CMS data

**Files:**
- Modify: `home.jsx` (lines 136–203)

Replace the hardcoded partner array with `HOME.logos` loop. Use new gold-bg CSS classes.

- [ ] **Step 1: Read current partners section**

Read lines 136-203 of home.jsx to confirm current content.

- [ ] **Step 2: Replace the partners section JSX**

Replace the entire partners section (from `{/* ── Partners / Trusted By Marquee ── */}` through the closing `</section>`) with:

```jsx
            {/* ── Partners / Trusted By Marquee ── */}
            <section className="partners-section">
                <div className="partners-container" style={{ paddingTop: 0 }}>
                    <div className="partners-gold-divider partners-divider-ink" style={{ marginBottom: 48 }} />
                    <div className="partners-heading">
                        <span className="partners-pill-ink">
                            <span className="partners-pill-dot-ink" />
                            {HOME.logoRowLabel || "Trusted By"}
                        </span>
                    </div>
                </div>

                <div className="partners-marquee-wrapper">
                    <div className="partners-marquee-track" aria-label="As Seen On">
                        {((HOME.logos || []).length > 0
                            ? [...HOME.logos, ...HOME.logos]
                            : []
                        ).map((logo, i) => (
                            <div key={i} className="partner-logo" aria-label={logo.alt}>
                                <img src={logo.src || ""} alt={logo.alt || ""} draggable="false" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="partners-container" style={{ paddingBottom: 0 }}>
                    <div className="partners-gold-divider partners-divider-ink" style={{ marginTop: 48 }} />
                </div>
            </section>
```

- [ ] **Step 3: Verify JSX**

Run: `grep -c 'HOME.logos' home.jsx`
Expected: `1` (section reads from CMS)

---

### Task 3: Create admin repeater JavaScript

**Files:**
- Create: `admin/repeater.js`

Provides add/remove/reorder/re-index for repeater form rows.

- [ ] **Step 1: Write `admin/repeater.js`**

```javascript
// repeater.js — add/remove/reorder/re-index for admin repeater fields

document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-repeater-add], [data-repeater-remove], [data-repeater-up], [data-repeater-down]');
    if (!btn) return;
    e.preventDefault();

    var wrapper = btn.closest('[data-repeater]');
    if (!wrapper) return;
    var items = wrapper.querySelector('.repeater-items');
    var template = wrapper.querySelector('.repeater-template');
    var name = wrapper.getAttribute('data-repeater');

    if (btn.hasAttribute('data-repeater-add')) {
        // Clone template, remove template class, clear values
        var clone = template.cloneNode(true);
        clone.classList.remove('repeater-template');
        clone.classList.add('repeater-item');
        var inputs = clone.querySelectorAll('input, textarea');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type !== 'hidden') {
                inputs[i].value = '';
                // Reset image preview
                var preview = clone.querySelector('.img-preview');
                if (preview) preview.style.display = 'none';
            }
        }
        items.appendChild(clone);
        reindex(wrapper);
    }

    if (btn.hasAttribute('data-repeater-remove')) {
        var item = btn.closest('.repeater-item');
        var min = parseInt(wrapper.getAttribute('data-repeater-min') || '1', 10);
        if (items.querySelectorAll('.repeater-item').length > min) {
            item.parentNode.removeChild(item);
            reindex(wrapper);
        }
    }

    if (btn.hasAttribute('data-repeater-up')) {
        var item = btn.closest('.repeater-item');
        var prev = item.previousElementSibling;
        if (prev && prev.classList.contains('repeater-item')) {
            item.parentNode.insertBefore(item, prev);
            reindex(wrapper);
        }
    }

    if (btn.hasAttribute('data-repeater-down')) {
        var item = btn.closest('.repeater-item');
        var next = item.nextElementSibling;
        if (next && next.classList.contains('repeater-item')) {
            item.parentNode.insertBefore(next, item);
            reindex(wrapper);
        }
    }
});

function reindex(wrapper) {
    var items = wrapper.querySelectorAll('.repeater-item');
    var name = wrapper.getAttribute('data-repeater');
    for (var i = 0; i < items.length; i++) {
        var inputs = items[i].querySelectorAll('[name]');
        for (var j = 0; j < inputs.length; j++) {
            var old = inputs[j].getAttribute('name');
            // Replace name[index][field] with name[i][field]
            var newName = old.replace(/^([^\[]+)\[\d+\]\[/, '$1[' + i + '][');
            inputs[j].setAttribute('name', newName);
            // Update image field ID for image picker
            var id = inputs[j].getAttribute('id');
            if (id) {
                var newId = id.replace(/_\d+_/g, '_' + i + '_');
                inputs[j].setAttribute('id', newId);
                var preview = document.getElementById(newId + '_preview');
                if (preview) preview.setAttribute('id', newId + '_preview');
                // Update Browse button onclick to match new ID
                var browseBtn = items[i].querySelector('.img-browse');
                if (browseBtn) {
                    var oc = browseBtn.getAttribute('onclick');
                    if (oc) browseBtn.setAttribute('onclick', oc.replace(/_\d+_/g, '_' + i + '_'));
                }
            }
        }
        // Update repeater-item headers if present
        var h = items[i].querySelector('.repeater-item-h');
        if (h) h.textContent = (i + 1) + '.';
    }
}
```

---

### Task 4: Add renderRepeater() PHP helper

**Files:**
- Modify: `admin/helpers.php`

Add the `renderRepeater()` function before `adminFooter()`.

- [ ] **Step 1: Read helpers.php**

Read `admin/helpers.php` to find the right insertion point (before `adminFooter()` at line 76).

- [ ] **Step 2: Add renderRepeater function**

Insert before `adminFooter()`:

```php
function renderRepeater(string $name, array $items, array $fields, array $opts = []): void {
    $opts += ['minItems' => 1, 'maxItems' => 0, 'sortable' => true, 'label' => ''];
    $max = $opts['maxItems'];
    $min = $opts['minItems'];
    $count = count($items);
    if ($count === 0) {
        // Ensure at least minItems
        for ($i = 0; $i < $min; $i++) {
            $blank = [];
            foreach ($fields as $f) $blank[$f[0]] = '';
            $items[] = $blank;
        }
        $count = count($items);
    }
    ?>
    <div class="repeater-wrapper" data-repeater="<?= htmlspecialchars($name) ?>" data-repeater-min="<?= $min ?>">
        <?php if ($opts['label']): ?>
            <div class="repeater-section-label"><?= htmlspecialchars($opts['label']) ?></div>
        <?php endif; ?>
        <div class="repeater-items">
            <?php foreach ($items as $idx => $item): ?>
            <div class="repeater-item">
                <div class="repeater-item-tools">
                    <?php if ($opts['sortable']): ?>
                    <button type="button" class="repeater-btn repeater-btn-sm" data-repeater-up title="Move up">↑</button>
                    <button type="button" class="repeater-btn repeater-btn-sm" data-repeater-down title="Move down">↓</button>
                    <?php endif; ?>
                    <button type="button" class="repeater-btn repeater-btn-sm repeater-btn-remove" data-repeater-remove title="Remove">×</button>
                </div>
                <div class="repeater-item-fields">
                    <?php foreach ($fields as $f):
                        list($key, $type, $label) = $f;
                        $val = $item[$key] ?? '';
                        $inputName = htmlspecialchars($name . '[' . $idx . '][' . $key . ']');
                        $inputId = 'repeater_' . $name . '_' . $idx . '_' . $key;
                    ?>
                    <div class="field">
                        <label for="<?= $inputId ?>"><?= htmlspecialchars($label) ?></label>
                        <?php if ($type === 'image'): ?>
                            <div class="img-field">
                                <img class="img-preview" id="<?= $inputId ?>_preview" src="../<?= htmlspecialchars($val) ?>" alt="" onerror="this.style.display='none'">
                                <input name="<?= $inputName ?>" id="<?= $inputId ?>" value="<?= htmlspecialchars($val) ?>">
                                <button type="button" class="img-browse" onclick="openImagePicker('<?= $inputId ?>')">Browse</button>
                            </div>
                        <?php elseif ($type === 'textarea'): ?>
                            <textarea name="<?= $inputName ?>" id="<?= $inputId ?>" rows="2"><?= htmlspecialchars($val) ?></textarea>
                        <?php else: ?>
                            <input name="<?= $inputName ?>" id="<?= $inputId ?>" value="<?= htmlspecialchars($val) ?>">
                        <?php endif; ?>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

        <!-- Hidden template for JS cloning -->
        <div class="repeater-template">
            <div class="repeater-item">
                <div class="repeater-item-tools">
                    <?php if ($opts['sortable']): ?>
                    <button type="button" class="repeater-btn repeater-btn-sm" data-repeater-up title="Move up">↑</button>
                    <button type="button" class="repeater-btn repeater-btn-sm" data-repeater-down title="Move down">↓</button>
                    <?php endif; ?>
                    <button type="button" class="repeater-btn repeater-btn-sm repeater-btn-remove" data-repeater-remove title="Remove">×</button>
                </div>
                <div class="repeater-item-fields">
                    <?php foreach ($fields as $f):
                        list($key, $type, $label) = $f;
                        $inputName = htmlspecialchars($name . '[0][' . $key . ']');
                        $inputId = 'repeater_' . $name . '_0_' . $key;
                    ?>
                    <div class="field">
                        <label for="<?= $inputId ?>"><?= htmlspecialchars($label) ?></label>
                        <?php if ($type === 'image'): ?>
                            <div class="img-field">
                                <img class="img-preview" id="<?= $inputId ?>_preview" src="" alt="" style="display:none">
                                <input name="<?= $inputName ?>" id="<?= $inputId ?>" value="">
                                <button type="button" class="img-browse" onclick="openImagePicker('<?= $inputId ?>')">Browse</button>
                            </div>
                        <?php elseif ($type === 'textarea'): ?>
                            <textarea name="<?= $inputName ?>" id="<?= $inputId ?>" rows="2"></textarea>
                        <?php else: ?>
                            <input name="<?= $inputName ?>" id="<?= $inputId ?>" value="">
                        <?php endif; ?>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <?php if ($max === 0 || $count < $max): ?>
        <button type="button" class="repeater-btn repeater-btn-add" data-repeater-add>+ Add item</button>
        <?php endif; ?>
    </div>
    <?php
}
```

- [ ] **Step 3: Add repeater CSS to adminHeader inline styles**

Inside `adminHeader()`, before the closing `</style>`, add:

```css
.repeater-wrapper { margin-bottom: 16px; }
.repeater-section-label { font-weight: 600; font-size: 13px; margin-bottom: 8px; color: #0f203d; }
.repeater-item { border: 1px solid rgba(15,32,61,0.12); padding: 12px; margin-bottom: 8px; background: rgba(255,255,255,0.5); border-radius: 3px; display: flex; gap: 12px; align-items: flex-start; }
.repeater-item-tools { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; padding-top: 20px; }
.repeater-item-fields { flex: 1; min-width: 0; }
.repeater-template { display: none; }
.repeater-btn { padding: 4px 10px; background: transparent; border: 1px solid rgba(15,32,61,0.15); cursor: pointer; font-size: 14px; border-radius: 3px; color: #0f203d; line-height: 1; }
.repeater-btn:hover { border-color: #d4b478; }
.repeater-btn-sm { padding: 2px 8px; font-size: 13px; }
.repeater-btn-remove { color: #8b3a3a; border-color: rgba(139,58,58,0.3); }
.repeater-btn-remove:hover { border-color: #8b3a3a; background: rgba(139,58,58,0.05); }
.repeater-btn-add { margin-top: 4px; padding: 8px 20px; }
```

- [ ] **Step 4: Load repeater.js in adminHeader**

Inside `adminHeader()`, after the `image-picker.js` script tag, add:

```html
<script src="repeater.js"></script>
```

---

### Task 5: Update edit-home.php — replace logos with repeater

**Files:**
- Modify: `admin/edit-home.php`

Replace the fixed 6-slot logos section with `renderRepeater()`.

- [ ] **Step 1: Replace the logos admin block**

Find the "Logos bar" section (lines 166-175) and replace with:

```php
  <div class="section-h">Partners / Trusted By</div>
  <?php renderRepeater('logos', $data['logos'] ?? [], [
      ['src', 'image', 'Logo Image'],
      ['alt', 'text', 'Alt Text'],
  ], ['label' => 'Partner Logos']); ?>
```

- [ ] **Step 2: Update PHP POST handler for logos**

In the POST handler, replace the old logos processing block:

```php
    'logos' => array_map(function($i) use ($d) {
      return ['src' => strip_tags($d["logo_src_$i"] ?? ''), 'alt' => strip_tags($d['logo_alt'][$i] ?? '')];
    }, range(0, 5)),
```

with:

```php
    'logos' => array_map(function($item) {
      return [
        'src' => strip_tags($item['src'] ?? ''),
        'alt' => strip_tags($item['alt'] ?? ''),
      ];
    }, $d['logos'] ?? []),
```

- [ ] **Step 3: Verify no stale logo_src_0 references**

Run: `grep -n 'logo_src_\|logo_alt\[' admin/edit-home.php`
Expected: No matches (old indexed fields removed)

---

### Task 6: Update edit-home.php — upgrade testimonials + ICP to repeater

**Files:**
- Modify: `admin/edit-home.php`

- [ ] **Step 1: Replace testimonials textarea with repeater**

Replace the "Testimonials" section (lines 276-288):

```php
  <div class="section-h">Testimonials</div>
  <?php renderRepeater('testimonials', $data['testimonials'] ?? [], [
      ['quote', 'textarea', 'Quote'],
      ['name', 'text', 'Name'],
      ['role', 'text', 'Role'],
  ], ['label' => 'Testimonial Entries']); ?>
```

- [ ] **Step 2: Update PHP POST handler for testimonials**

Replace the old testimonials processing block:

```php
  // Testimonials
  $testis = [];
  foreach (explode("\n---\n", $d['testimonials']) as $block) {
    $lines = array_map('trim', explode("\n", $block));
    if (count($lines) >= 2) {
      $testis[] = [
        'quote' => $lines[0],
        'name' => strip_tags($lines[1] ?? ''),
        'role' => strip_tags($lines[2] ?? ''),
      ];
    }
  }
  $data['testimonials'] = $testis;
```

with:

```php
  $data['testimonials'] = array_map(function($item) {
    return [
      'quote' => $item['quote'] ?? '',
      'name' => strip_tags($item['name'] ?? ''),
      'role' => strip_tags($item['role'] ?? ''),
    ];
  }, $d['testimonials'] ?? []);
```

- [ ] **Step 3: Replace ICP cards with repeater**

Replace the "ICP Cards" section (lines 226-245):

```php
  <div class="section-h">ICP Cards</div>
  <?php renderRepeater('icpCards', $data['icpCards'] ?? [], [
      ['phase', 'text', 'Phase label'],
      ['heading', 'text', 'Heading (HTML)'],
      ['meta1', 'text', 'Meta 1'],
      ['meta2', 'text', 'Meta 2'],
      ['body', 'textarea', 'Body'],
      ['quote', 'text', 'Quote'],
      ['arrow', 'text', 'Arrow label'],
  ], ['label' => 'ICP Cards', 'minItems' => 0, 'maxItems' => 3]); ?>
```

Add route/featured handling: After saving `icpCards`, set route and featured:

```php
  // ICP cards — add route + featured flags
  foreach ($icpCards as $i => $card) {
    $card['featured'] = ($i === 1); // middle card featured
    $card['route'] = strtolower(preg_replace('/[^a-z0-9]/', '', $card['phase'] ?? "card-$i"));
  }
```

- [ ] **Step 4: Update PHP POST handler for ICP cards**

Replace the old ICP processing block:

```php
  // ICP cards
  $icpCards = [];
  foreach (['speaker','authority','legacy'] as $key) {
    $icpCards[] = [...];
  }
  $data['icpCards'] = $icpCards;
```

with:

```php
  // ICP cards
  $icpCards = array_map(function($item) {
    return [
      'phase' => strip_tags($item['phase'] ?? ''),
      'heading' => $item['heading'] ?? '',
      'meta1' => strip_tags($item['meta1'] ?? ''),
      'meta2' => strip_tags($item['meta2'] ?? ''),
      'body' => $item['body'] ?? '',
      'quote' => $item['quote'] ?? '',
      'arrow' => strip_tags($item['arrow'] ?? ''),
      'route' => strip_tags($item['route'] ?? ''),
      'featured' => !empty($item['featured']),
    ];
  }, $d['icpCards'] ?? []);
  $data['icpCards'] = $icpCards;
```

- [ ] **Step 5: Update frontDoor and remaining field keys**

The `route` and `featured` used to be set in the PHP handler. Now they come from the repeater. The `edit-home.php` form needs `route` and `featured` fields added to the ICP repeater field list. Update step 3's field list to include:

```php
      ['route', 'text', 'Route (page ID)'],
```

And add a checkbox for featured. Since the repeater field types don't include checkbox, add `featured` as a hidden field that gets set to `true` for index 1 only (middle card). This preserves the existing behavior where the middle card is auto-featured.

Actually — simplest approach: keep the route/featured logic server-side. After saving ICP cards from the repeater, enrich them:

```php
  // ICP cards — enrich with route + featured
  $icpCards = $data['icpCards'] ?? [];
  foreach ($icpCards as $i => $card) {
    $icpCards[$i]['featured'] = ($i === 1 && count($icpCards) >= 3);
    if (empty($card['route'])) {
      $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9]/', '-', $card['phase'])));
      $icpCards[$i]['route'] = $slug ?: "card-$i";
    }
  }
  $data['icpCards'] = $icpCards;
```

Keep this block after the repeater handler in the POST section.

---

### Task 7: Populate content/home.json with partner data

**Files:**
- Modify: `content/home.json`

Replace the empty `logos` array and `logoRowLabel` with the 32 partner entries.

- [ ] **Step 1: Update logoRowLabel and logos**

Set `logoRowLabel` to `"Trusted By"` and populate `logos` with all 32 partners. Build the JSON array manually:

```json
    "logoRowLabel": "Trusted By",
    "logos": [
        { "src": "assets/partners/30-rock.webp", "alt": "30 Rock" },
        { "src": "assets/partners/48-hours.webp", "alt": "48 Hours" },
        { "src": "assets/partners/abc.png", "alt": "ABC" },
        { "src": "assets/partners/aocc.png", "alt": "AOCC" },
        { "src": "assets/partners/att.webp", "alt": "AT&T" },
        { "src": "assets/partners/bbbs.png", "alt": "BBBS" },
        { "src": "assets/partners/bgca.png", "alt": "BGCA" },
        { "src": "assets/partners/bioneers.png", "alt": "Bioneers" },
        { "src": "assets/partners/bloomberg.png", "alt": "Bloomberg" },
        { "src": "assets/partners/chandler-chamber.jpeg", "alt": "Chandler Chamber" },
        { "src": "assets/partners/cnn.webp", "alt": "CNN" },
        { "src": "assets/partners/deseret-news.webp", "alt": "Deseret News" },
        { "src": "assets/partners/disney.webp", "alt": "Disney" },
        { "src": "assets/partners/flagler-college.png", "alt": "Flagler College" },
        { "src": "assets/partners/forbes.jpeg", "alt": "Forbes" },
        { "src": "assets/partners/golden-apple.webp", "alt": "Golden Apple Awards" },
        { "src": "assets/partners/harvard.svg", "alt": "Harvard" },
        { "src": "assets/partners/iheart-radio.webp", "alt": "iHeart Radio" },
        { "src": "assets/partners/mtv.png", "alt": "MTV" },
        { "src": "assets/partners/mentoring-monday.png", "alt": "Mentoring Monday" },
        { "src": "assets/partners/nawbo.jpg", "alt": "NAWBO" },
        { "src": "assets/partners/pbj.png", "alt": "PBJ" },
        { "src": "assets/partners/rsc.webp", "alt": "RSC" },
        { "src": "assets/partners/scaleup.jpeg", "alt": "ScaleUp" },
        { "src": "assets/partners/shambhala.png", "alt": "Shambhala" },
        { "src": "assets/partners/union-college.png", "alt": "Union College" },
        { "src": "assets/partners/usm.png", "alt": "USM" },
        { "src": "assets/partners/usa-today.svg", "alt": "USA Today" },
        { "src": "assets/partners/vassar-college.png", "alt": "Vassar College" },
        { "src": "assets/partners/wjct.webp", "alt": "WJCT" },
        { "src": "assets/partners/wildglobal.webp", "alt": "Wild Global" },
        { "src": "assets/partners/yahoo-news.png", "alt": "Yahoo News" }
    ],
```

- [ ] **Step 2: Validate JSON**

Run: `php -r "json_decode(file_get_contents('content/home.json')); echo json_last_error_msg();"`
Expected: `No error`

---

## Self-Check: Spec Coverage

- **Visual gold-bg partners section**: Task 1 (CSS) + Task 2 (JSX) ✓
- **CMS-driven from HOME.logos**: Task 2 (JSX loops HOME.logos) + Task 7 (data populated) ✓
- **renderRepeater() PHP helper**: Task 4 ✓
- **repeater.js JS**: Task 3 ✓
- **Logos admin upgraded**: Task 5 ✓
- **Testimonials admin upgraded**: Task 6 ✓
- **ICP cards admin upgraded**: Task 6 ✓
- **Backward compatibility**: Same data shape {src, alt} — no breakage ✓
- **Empty logos guard**: Task 2 JSX short-circuits if HOME.logos is empty ✓
