<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/helpers.php';
requireLogin();

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $d = $_POST;
  $data = [
    'hideOriginalHero' => isset($d['hideOriginalHero']),
    'heroEyebrow' => strip_tags($d['heroEyebrow']),
    'heroTitle' => $d['heroTitle'],
    'heroBody' => $d['heroBody'],
    'heroCtaPrimary' => strip_tags($d['heroCtaPrimary']),
    'heroCtaSecondary' => strip_tags($d['heroCtaSecondary']),
    'heroStars' => strip_tags($d['heroStars']),
    'heroMeta1' => strip_tags($d['heroMeta1']),
    'heroMeta2' => strip_tags($d['heroMeta2']),
    'heroImage' => strip_tags($d['heroImage']),
    'heroQuote' => $d['heroQuote'],
    'heroQuoteAuthor' => strip_tags($d['heroQuoteAuthor']),
    'brandHeroVideo' => strip_tags($d['brandHeroVideo']),
    'brandHeroHeading' => $d['brandHeroHeading'],
    'brandHeroBody' => $d['brandHeroBody'],
    'brandHeroCtaPrimary' => strip_tags($d['brandHeroCtaPrimary']),
    'brandHeroCtaSecondary' => strip_tags($d['brandHeroCtaSecondary']),
    'logoRowLabel' => strip_tags($d['logoRowLabel']),
    'logos' => array_map(function($item) {
      return [
        'src' => strip_tags($item['src'] ?? ''),
        'alt' => strip_tags($item['alt'] ?? ''),
      ];
    }, $d['logos'] ?? []),
    'falseProblemEyebrow' => strip_tags($d['falseProblemEyebrow']),
    'falseProblems' => array_map('trim', explode("\n", $d['falseProblems'])),
    'falseProblemOverline' => strip_tags($d['falseProblemOverline']),
    'whatsHappeningEyebrow' => strip_tags($d['whatsHappeningEyebrow']),
    'whatsHappeningTitle' => $d['whatsHappeningTitle'],
    'whatsHappeningBody' => strip_tags($d['whatsHappeningBody']),
    'whatsHappeningList' => array_map('trim', explode("\n", $d['whatsHappeningList'])),
    'missingPieceEyebrow' => strip_tags($d['missingPieceEyebrow']),
    'missingPieceBody' => $d['missingPieceBody'],
    'missingPieceQuote' => $d['missingPieceQuote'],
    'missingPieceQuoteBy' => strip_tags($d['missingPieceQuoteBy']),
    'missingPieceMuted' => $d['missingPieceMuted'],
    'whyMattersEyebrow' => strip_tags($d['whyMattersEyebrow']),
    'whyMattersTitle' => strip_tags($d['whyMattersTitle']),
    'whyMattersBody' => $d['whyMattersBody'],
    'whatShiftsEyebrow' => strip_tags($d['whatShiftsEyebrow']),
    'whatShiftsList' => array_map('trim', explode("\n", $d['whatShiftsList'])),
    'chooseEyebrow' => strip_tags($d['chooseEyebrow']),
    'chooseTitle' => $d['chooseTitle'],
    'chooseBody' => $d['chooseBody'],
    'chooseMuted' => $d['chooseMuted'],
    'notSureText' => strip_tags($d['notSureText']),
    'notSureCta' => strip_tags($d['notSureCta']),
    'testimonialsEyebrow' => strip_tags($d['testimonialsEyebrow']),
    'closerTitle' => $d['closerTitle'],
    'closerCtaPrimary' => strip_tags($d['closerCtaPrimary']),
    'closerCtaSecondary' => strip_tags($d['closerCtaSecondary']),
  ];

  // ICP cards — only overwrite if POST has data (preserves on accidental save)
  if (!empty($d['icpCards'])) {
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
    }, $d['icpCards']);

    // Enrich with auto-route + featured defaults
    $routeMap = ['the speaker' => 'speaker', 'the authority' => 'authority', 'the legacy' => 'legacy'];
    foreach ($icpCards as $i => $card) {
      if (empty($card['route'])) {
        $key = strtolower(trim($card['phase']));
        $icpCards[$i]['route'] = $routeMap[$key] ?? "card-$i";
      }
      if (count($icpCards) >= 3) {
        $icpCards[$i]['featured'] = ($i === 1);
      }
    }
    $data['icpCards'] = $icpCards;
  }

  // Front door
  $data['frontDoor'] = [
    [
      'eyebrow' => strip_tags($d['fd_paid_eyebrow']),
      'title' => strip_tags($d['fd_paid_title']),
      'body' => $d['fd_paid_body'],
      'price' => strip_tags($d['fd_paid_price']),
      'cta' => strip_tags($d['fd_paid_cta']),
      'productId' => 'dollar-message',
      'paid' => true,
      'image' => strip_tags($d['fd_paid_image'] ?? ''),
    ],
    [
      'eyebrow' => strip_tags($d['fd_free_eyebrow']),
      'title' => strip_tags($d['fd_free_title']),
      'body' => $d['fd_free_body'],
      'price' => strip_tags($d['fd_free_price']),
      'cta' => strip_tags($d['fd_free_cta']),
      'productId' => 'vault',
      'paid' => false,
      'image' => strip_tags($d['fd_free_image'] ?? ''),
    ],
  ];

  // Testimonials — only overwrite if POST has data
  if (!empty($d['testimonials'])) {
    $data['testimonials'] = array_map(function($item) {
      return [
        'quote' => $item['quote'] ?? '',
        'name' => strip_tags($item['name'] ?? ''),
        'role' => strip_tags($item['role'] ?? ''),
      ];
    }, $d['testimonials']);
  }

  saveJson('home.json', $data);
  $msg = 'Homepage saved.';
}

$data = loadJson('home.json');
adminHeader('Edit Homepage');
if ($msg) echo "<div class=\"msg\">$msg</div>";
?>
<form method="post">
  <div class="section-h">Hero</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="heroEyebrow" value="<?= htmlspecialchars($data['heroEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Stars</label><input name="heroStars" value="<?= htmlspecialchars($data['heroStars'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Title (HTML allowed: &lt;em&gt;, &lt;br/&gt;, &lt;span class="u"&gt;)</label>
    <textarea name="heroTitle" rows="3"><?= htmlspecialchars($data['heroTitle'] ?? '') ?></textarea>
  </div>
  <div class="field"><label>Body (HTML allowed)</label>
    <textarea name="heroBody" rows="3"><?= htmlspecialchars($data['heroBody'] ?? '') ?></textarea>
  </div>
  <div class="row">
    <div class="field"><label>CTA Primary</label><input name="heroCtaPrimary" value="<?= htmlspecialchars($data['heroCtaPrimary'] ?? '') ?>"></div>
    <div class="field"><label>CTA Secondary</label><input name="heroCtaSecondary" value="<?= htmlspecialchars($data['heroCtaSecondary'] ?? '') ?>"></div>
  </div>
  <div class="row">
    <div class="field"><label>Meta 1</label><input name="heroMeta1" value="<?= htmlspecialchars($data['heroMeta1'] ?? '') ?>"></div>
    <div class="field"><label>Meta 2</label><input name="heroMeta2" value="<?= htmlspecialchars($data['heroMeta2'] ?? '') ?>"></div>
  </div>
  <div class="row">
    <div class="field"><label>Quote</label><input name="heroQuote" value="<?= htmlspecialchars($data['heroQuote'] ?? '') ?>"></div>
    <div class="field"><label>Quote Author</label><input name="heroQuoteAuthor" value="<?= htmlspecialchars($data['heroQuoteAuthor'] ?? '') ?>"></div>
  </div>
  <?php imageField('heroImage', $data['heroImage'] ?? '', 'Hero Image'); ?>
  <div class="field" style="margin-top:-8px"><label>
    <input type="checkbox" name="hideOriginalHero" value="1" <?= ($data['hideOriginalHero'] ?? false) ? 'checked' : '' ?>>
    Hide original hero section
  </label></div>

  <div class="section-h">Brand Hero (cinematic video)</div>
  <div class="field"><?php imageField('brandHeroVideo', $data['brandHeroVideo'] ?? '', 'Video (mp4)'); ?></div>
  <div class="field"><label>Heading</label>
    <input name="brandHeroHeading" value="<?= htmlspecialchars($data['brandHeroHeading'] ?? '') ?>">
  </div>
  <div class="field"><label>Body</label>
    <textarea name="brandHeroBody" rows="3"><?= htmlspecialchars($data['brandHeroBody'] ?? '') ?></textarea>
  </div>
  <div class="row">
    <div class="field"><label>CTA Primary</label><input name="brandHeroCtaPrimary" value="<?= htmlspecialchars($data['brandHeroCtaPrimary'] ?? '') ?>"></div>
    <div class="field"><label>CTA Secondary</label><input name="brandHeroCtaSecondary" value="<?= htmlspecialchars($data['brandHeroCtaSecondary'] ?? '') ?>"></div>
  </div>

  <div class="section-h">Partners / Trusted By</div>
  <div class="field"><label>Section label</label><input name="logoRowLabel" value="<?= htmlspecialchars($data['logoRowLabel'] ?? '') ?>"></div>
  <?php renderRepeater('logos', $data['logos'] ?? [], [
      ['src', 'image', 'Logo Image'],
      ['alt', 'text', 'Alt Text'],
  ], ['label' => 'Partner Logos']); ?>

  <div class="section-h">The False Problem</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="falseProblemEyebrow" value="<?= htmlspecialchars($data['falseProblemEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Overline</label><input name="falseProblemOverline" value="<?= htmlspecialchars($data['falseProblemOverline'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Statements (one per line)</label>
    <textarea name="falseProblems" rows="3"><?= htmlspecialchars(implode("\n", $data['falseProblems'] ?? [])) ?></textarea>
  </div>

  <div class="section-h">What's Actually Happening</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="whatsHappeningEyebrow" value="<?= htmlspecialchars($data['whatsHappeningEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Body</label><input name="whatsHappeningBody" value="<?= htmlspecialchars($data['whatsHappeningBody'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Title (HTML allowed)</label><textarea name="whatsHappeningTitle" rows="2"><?= htmlspecialchars($data['whatsHappeningTitle'] ?? '') ?></textarea></div>
  <div class="field"><label>List items (one per line)</label>
    <textarea name="whatsHappeningList" rows="4"><?= htmlspecialchars(implode("\n", $data['whatsHappeningList'] ?? [])) ?></textarea>
  </div>

  <div class="section-h">The Missing Piece</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="missingPieceEyebrow" value="<?= htmlspecialchars($data['missingPieceEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Quote by</label><input name="missingPieceQuoteBy" value="<?= htmlspecialchars($data['missingPieceQuoteBy'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Body (HTML)</label><textarea name="missingPieceBody" rows="2"><?= htmlspecialchars($data['missingPieceBody'] ?? '') ?></textarea></div>
  <div class="field"><label>Quote</label><input name="missingPieceQuote" value="<?= htmlspecialchars($data['missingPieceQuote'] ?? '') ?>"></div>
  <div class="field"><label>Muted text (HTML)</label><textarea name="missingPieceMuted" rows="2"><?= htmlspecialchars($data['missingPieceMuted'] ?? '') ?></textarea></div>

  <div class="section-h">Why This Matters + What Shifts</div>
  <div class="row">
    <div class="field"><label>Why matters eyebrow</label><input name="whyMattersEyebrow" value="<?= htmlspecialchars($data['whyMattersEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>What shifts eyebrow</label><input name="whatShiftsEyebrow" value="<?= htmlspecialchars($data['whatShiftsEyebrow'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Why matters title</label><input name="whyMattersTitle" value="<?= htmlspecialchars($data['whyMattersTitle'] ?? '') ?>"></div>
  <div class="field"><label>Why matters body (HTML)</label><textarea name="whyMattersBody" rows="3"><?= htmlspecialchars($data['whyMattersBody'] ?? '') ?></textarea></div>
  <div class="field"><label>What shifts list (one per line)</label>
    <textarea name="whatShiftsList" rows="5"><?= htmlspecialchars(implode("\n", $data['whatShiftsList'] ?? [])) ?></textarea>
  </div>

  <div class="section-h">Choose Where You Are</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="chooseEyebrow" value="<?= htmlspecialchars($data['chooseEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Not sure text</label><input name="notSureText" value="<?= htmlspecialchars($data['notSureText'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Title (HTML)</label><textarea name="chooseTitle" rows="2"><?= htmlspecialchars($data['chooseTitle'] ?? '') ?></textarea></div>
  <div class="field"><label>Body (HTML)</label><textarea name="chooseBody" rows="2"><?= htmlspecialchars($data['chooseBody'] ?? '') ?></textarea></div>
  <div class="field"><label>Muted text (HTML)</label><textarea name="chooseMuted" rows="2"><?= htmlspecialchars($data['chooseMuted'] ?? '') ?></textarea></div>
  <div class="field"><label>Not sure CTA</label><input name="notSureCta" value="<?= htmlspecialchars($data['notSureCta'] ?? '') ?>"></div>

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

  <div class="section-h">Front Door Offers</div>
  <?php $fd = $data['frontDoor'] ?? []; ?>
  <div class="repeater">
    <div class="repeater-h">Your Dollar Message ($29)</div>
    <div class="row">
      <div class="field"><label>Eyebrow</label><input name="fd_paid_eyebrow" value="<?= htmlspecialchars($fd[0]['eyebrow'] ?? '') ?>"></div>
      <div class="field"><label>Price</label><input name="fd_paid_price" value="<?= htmlspecialchars($fd[0]['price'] ?? '') ?>"></div>
    </div>
    <div class="field"><label>Title</label><input name="fd_paid_title" value="<?= htmlspecialchars($fd[0]['title'] ?? '') ?>"></div>
    <div class="field"><label>Body</label><textarea name="fd_paid_body" rows="2"><?= htmlspecialchars($fd[0]['body'] ?? '') ?></textarea></div>
    <div class="row">
      <div class="field"><label>CTA</label><input name="fd_paid_cta" value="<?= htmlspecialchars($fd[0]['cta'] ?? '') ?>"></div>
      <div class="field"><?php imageField('fd_paid_image', $fd[0]['image'] ?? '', 'Dollar Message Image', 'fd_paid_img'); ?></div>
    </div>
  </div>
  <div class="repeater">
    <div class="repeater-h">The Vault (Free)</div>
    <div class="row">
      <div class="field"><label>Eyebrow</label><input name="fd_free_eyebrow" value="<?= htmlspecialchars($fd[1]['eyebrow'] ?? '') ?>"></div>
      <div class="field"><label>Price Label</label><input name="fd_free_price" value="<?= htmlspecialchars($fd[1]['price'] ?? '') ?>"></div>
    </div>
    <div class="field"><label>Title</label><input name="fd_free_title" value="<?= htmlspecialchars($fd[1]['title'] ?? '') ?>"></div>
    <div class="field"><label>Body</label><textarea name="fd_free_body" rows="2"><?= htmlspecialchars($fd[1]['body'] ?? '') ?></textarea></div>
    <div class="row">
      <div class="field"><label>CTA</label><input name="fd_free_cta" value="<?= htmlspecialchars($fd[1]['cta'] ?? '') ?>"></div>
      <div class="field"><?php imageField('fd_free_image', $fd[1]['image'] ?? '', 'Vault Image', 'fd_free_img'); ?></div>
    </div>
  </div>

  <div class="section-h">Testimonials</div>
  <div class="field"><label>Eyebrow</label><input name="testimonialsEyebrow" value="<?= htmlspecialchars($data['testimonialsEyebrow'] ?? '') ?>"></div>
  <?php renderRepeater('testimonials', $data['testimonials'] ?? [], [
      ['quote', 'textarea', 'Quote'],
      ['name', 'text', 'Name'],
      ['role', 'text', 'Role'],
  ], ['label' => 'Testimonial Entries']); ?>

  <div class="section-h">Closer</div>
  <div class="field"><label>Title (HTML)</label><textarea name="closerTitle" rows="2"><?= htmlspecialchars($data['closerTitle'] ?? '') ?></textarea></div>
  <div class="row">
    <div class="field"><label>CTA Primary</label><input name="closerCtaPrimary" value="<?= htmlspecialchars($data['closerCtaPrimary'] ?? '') ?>"></div>
    <div class="field"><label>CTA Secondary</label><input name="closerCtaSecondary" value="<?= htmlspecialchars($data['closerCtaSecondary'] ?? '') ?>"></div>
  </div>

  <div class="btn-row">
    <button type="submit">Save homepage</button>
    <a href="dashboard.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php adminFooter(); ?>
