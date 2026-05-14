<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/helpers.php';
requireLogin();

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $d = $_POST;
  $data = loadJson('pages.json');

  // About — merge with existing to preserve fields not in form
  $aboutExisting = $data['about'] ?? [];
  $data['about'] = array_merge($aboutExisting, [
    'image' => strip_tags($d['about_image']),
    'eyebrow' => strip_tags($d['about_eyebrow']),
    'title' => $d['about_title'],
    'lead' => $d['about_lead'],
    'body' => $d['about_body'],
    'quote' => $d['about_quote'],
    'quoteBy' => strip_tags($d['about_quoteBy']),
    'journeyEyebrow' => strip_tags($d['about_journeyEyebrow']),
    'timeline' => [],
    'closerTitle' => strip_tags($d['about_closerTitle'] ?? $aboutExisting['closerTitle'] ?? ''),
    'closerCtaPrimary' => strip_tags($d['about_closerCtaPrimary'] ?? $aboutExisting['closerCtaPrimary'] ?? ''),
    'closerCtaSecondary' => strip_tags($d['about_closerCtaSecondary'] ?? $aboutExisting['closerCtaSecondary'] ?? ''),
    'closerCtaSecondaryRoute' => $aboutExisting['closerCtaSecondaryRoute'] ?? 'product',
    'closerCtaSecondaryParams' => $aboutExisting['closerCtaSecondaryParams'] ?? ['id' => 'vault'],
  ]);
  foreach (explode("\n", $d['about_timeline']) as $line) {
    $parts = array_map('trim', explode('|', $line, 2));
    if (count($parts) === 2) {
      $data['about']['timeline'][] = ['year' => strip_tags($parts[0]), 'text' => strip_tags($parts[1])];
    }
  }

  // Journey — merge with existing to preserve fields not in form
  $journeyExisting = $data['journey'] ?? [];
  $data['journey'] = array_merge($journeyExisting, [
    'eyebrow' => strip_tags($d['journey_eyebrow']),
    'title' => $d['journey_title'],
    'lead' => $d['journey_lead'],
    'chapters' => [],
    'closerQuote' => $d['journey_closerQuote'],
    'closerQuoteBy' => strip_tags($d['journey_closerQuoteBy']),
    'closerTitle' => strip_tags($d['journey_closerTitle'] ?? $journeyExisting['closerTitle'] ?? ''),
    'closerCtaPrimary' => strip_tags($d['journey_closerCtaPrimary'] ?? $journeyExisting['closerCtaPrimary'] ?? ''),
    'closerCtaSecondary' => strip_tags($d['journey_closerCtaSecondary'] ?? $journeyExisting['closerCtaSecondary'] ?? ''),
    'closerCtaSecondaryRoute' => $journeyExisting['closerCtaSecondaryRoute'] ?? 'product',
    'closerCtaSecondaryParams' => $journeyExisting['closerCtaSecondaryParams'] ?? ['id' => 'vault'],
  ]);
  foreach (explode("\n", $d['journey_chapters']) as $line) {
    $parts = array_map('trim', explode('|', $line, 2));
    if (count($parts) === 2) {
      $data['journey']['chapters'][] = ['year' => strip_tags($parts[0]), 'text' => strip_tags($parts[1])];
    }
  }

  // Stories
  $data['stories'] = [
    'eyebrow' => strip_tags($d['stories_eyebrow']),
    'title' => $d['stories_title'],
    'lead' => $d['stories_lead'],
    'items' => [],
    'closerTitle' => strip_tags($d['stories_closerTitle']),
    'closerCta' => strip_tags($d['stories_closerCta']),
  ];
  $storyNames = $d['story_name'] ?? [];
  $storyRoles = $d['story_role'] ?? [];
  $storyQuotes = $d['story_quote'] ?? [];
  $storyBodies = $d['story_body'] ?? [];
  $storyPhases = $d['story_phase'] ?? [];
  $storyImages = $d['story_image'] ?? [];
  $data['stories']['items'] = [];
  foreach ($storyNames as $i => $name) {
    if (empty($name)) continue;
    $data['stories']['items'][] = [
      'name' => strip_tags($name),
      'role' => strip_tags($storyRoles[$i] ?? ''),
      'quote' => strip_tags($storyQuotes[$i] ?? ''),
      'body' => strip_tags($storyBodies[$i] ?? ''),
      'phase' => strip_tags($storyPhases[$i] ?? ''),
      'image' => strip_tags($storyImages[$i] ?? ''),
    ];
  }

  // FAQ
  $data['faq'] = [
    'eyebrow' => strip_tags($d['faq_eyebrow']),
    'title' => $d['faq_title'],
    'sections' => [],
    'stillHeading' => strip_tags($d['faq_stillHeading']),
    'stillBody' => $d['faq_stillBody'],
  ];
  $sectionCount = (int) ($d['faq_section_count'] ?? 1);
  for ($i = 0; $i < $sectionCount; $i++) {
    $items = [];
    $itemCount = (int) ($d["faq_s{$i}_count"] ?? 0);
    for ($j = 0; $j < $itemCount; $j++) {
      if (!empty($d["faq_s{$i}_q{$j}"])) {
        $items[] = [
          'q' => strip_tags($d["faq_s{$i}_q{$j}"]),
          'a' => $d["faq_s{$i}_a{$j}"],
          'defaultOpen' => $j === 0 && $i === 0,
        ];
      }
    }
    if (!empty($d["faq_s{$i}_heading"]) || !empty($items)) {
      $data['faq']['sections'][] = [
        'heading' => strip_tags($d["faq_s{$i}_heading"] ?? ''),
        'items' => $items,
      ];
    }
  }

  // Community
  $data['community'] = [
    'eyebrow' => strip_tags($d['community_eyebrow']),
    'title' => $d['community_title'],
    'body' => $d['community_body'],
    'image' => strip_tags($d['community_image'] ?? ''),
    'ctaLabel' => strip_tags($d['community_cta']),
    'ctaRoute' => 'product',
  ];

  // Corporate
  $data['corporate'] = [
    'eyebrow' => strip_tags($d['corporate_eyebrow']),
    'title' => $d['corporate_title'],
    'body' => $d['corporate_body'],
    'image' => strip_tags($d['corporate_image'] ?? ''),
    'ctaLabel' => strip_tags($d['corporate_cta']),
    'ctaRoute' => 'legacy',
  ];

  saveJson('pages.json', $data);
  $msg = 'Pages saved.';
}

$data = loadJson('pages.json');
adminHeader('Edit Pages');
if ($msg) echo "<div class=\"msg\">$msg</div>";
?>
<form method="post">
  <div class="section-h">About Joanna</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="about_eyebrow" value="<?= htmlspecialchars($data['about']['eyebrow'] ?? '') ?>"></div>
    <?php imageField('about_image', $data['about']['image'] ?? '', 'About Photo', 'about_image_field'); ?>
  </div>
  <div class="field"><label>Title (HTML)</label><textarea name="about_title" rows="2"><?= htmlspecialchars($data['about']['title'] ?? '') ?></textarea></div>
  <div class="field"><label>Lead (HTML)</label><textarea name="about_lead" rows="2"><?= htmlspecialchars($data['about']['lead'] ?? '') ?></textarea></div>
  <div class="field"><label>Body (HTML)</label><textarea name="about_body" rows="4"><?= htmlspecialchars($data['about']['body'] ?? '') ?></textarea></div>
  <div class="row">
    <div class="field"><label>Quote</label><input name="about_quote" value="<?= htmlspecialchars($data['about']['quote'] ?? '') ?>"></div>
    <div class="field"><label>Quote by</label><input name="about_quoteBy" value="<?= htmlspecialchars($data['about']['quoteBy'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Journey eyebrow</label><input name="about_journeyEyebrow" value="<?= htmlspecialchars($data['about']['journeyEyebrow'] ?? '') ?>"></div>
  <div class="field"><label>Timeline (year | text, one per line)</label>
    <textarea name="about_timeline" rows="5"><?php
      foreach ($data['about']['timeline'] ?? [] as $t) echo htmlspecialchars(($t['year'] ?? '') . ' | ' . ($t['text'] ?? '')) . "\n";
    ?></textarea>
  </div>
  <div class="row">
    <div class="field"><label>Closer title</label><input name="about_closerTitle" value="<?= htmlspecialchars($data['about']['closerTitle'] ?? '') ?>"></div>
    <div class="field"><label>Closer CTA primary</label><input name="about_closerCtaPrimary" value="<?= htmlspecialchars($data['about']['closerCtaPrimary'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Closer CTA secondary ("Meet me first — free June 5")</label><input name="about_closerCtaSecondary" value="<?= htmlspecialchars($data['about']['closerCtaSecondary'] ?? '') ?>"></div>

  <div class="section-h">The Journey</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="journey_eyebrow" value="<?= htmlspecialchars($data['journey']['eyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Lead</label><input name="journey_lead" value="<?= htmlspecialchars($data['journey']['lead'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Title (HTML)</label><textarea name="journey_title" rows="2"><?= htmlspecialchars($data['journey']['title'] ?? '') ?></textarea></div>
  <div class="field"><label>Chapters (year | text, one per line)</label>
    <textarea name="journey_chapters" rows="5"><?php
      foreach ($data['journey']['chapters'] ?? [] as $c) echo htmlspecialchars(($c['year'] ?? '') . ' | ' . ($c['text'] ?? '')) . "\n";
    ?></textarea>
  </div>
  <div class="row">
    <div class="field"><label>Closer quote</label><input name="journey_closerQuote" value="<?= htmlspecialchars($data['journey']['closerQuote'] ?? '') ?>"></div>
    <div class="field"><label>Quote by</label><input name="journey_closerQuoteBy" value="<?= htmlspecialchars($data['journey']['closerQuoteBy'] ?? '') ?>"></div>
  </div>
  <div class="row">
    <div class="field"><label>Closer title</label><input name="journey_closerTitle" value="<?= htmlspecialchars($data['journey']['closerTitle'] ?? '') ?>"></div>
    <div class="field"><label>Closer CTA primary</label><input name="journey_closerCtaPrimary" value="<?= htmlspecialchars($data['journey']['closerCtaPrimary'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Closer CTA secondary ("Meet me first · free June 5")</label><input name="journey_closerCtaSecondary" value="<?= htmlspecialchars($data['journey']['closerCtaSecondary'] ?? '') ?>"></div>

  <div class="section-h">Success Stories</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="stories_eyebrow" value="<?= htmlspecialchars($data['stories']['eyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Lead</label><input name="stories_lead" value="<?= htmlspecialchars($data['stories']['lead'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Title (HTML)</label><textarea name="stories_title" rows="2"><?= htmlspecialchars($data['stories']['title'] ?? '') ?></textarea></div>
  <?php $storyItems = $data['stories']['items'] ?? []; foreach ($storyItems as $si => $s): ?>
  <div class="repeater">
    <div class="repeater-h">Story <?= $si + 1 ?></div>
    <div class="row">
      <div class="field"><label>Name</label><input name="story_name[<?= $si ?>]" value="<?= htmlspecialchars($s['name'] ?? '') ?>"></div>
      <div class="field"><label>Role</label><input name="story_role[<?= $si ?>]" value="<?= htmlspecialchars($s['role'] ?? '') ?>"></div>
    </div>
    <div class="field"><label>Quote</label><input name="story_quote[<?= $si ?>]" value="<?= htmlspecialchars($s['quote'] ?? '') ?>"></div>
    <div class="field"><label>Body</label><textarea name="story_body[<?= $si ?>]" rows="2"><?= htmlspecialchars($s['body'] ?? '') ?></textarea></div>
    <div class="row">
      <div class="field"><label>Phase</label><input name="story_phase[<?= $si ?>]" value="<?= htmlspecialchars($s['phase'] ?? '') ?>"></div>
      <div class="field"><?php imageField("story_image[$si]", $s['image'] ?? '', 'Story Image', "story_img_$si"); ?></div>
    </div>
  </div>
  <?php endforeach; ?>
  <div class="row">
    <div class="field"><label>Closer title</label><input name="stories_closerTitle" value="<?= htmlspecialchars($data['stories']['closerTitle'] ?? '') ?>"></div>
    <div class="field"><label>Closer CTA</label><input name="stories_closerCta" value="<?= htmlspecialchars($data['stories']['closerCta'] ?? '') ?>"></div>
  </div>

  <div class="section-h">FAQ</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="faq_eyebrow" value="<?= htmlspecialchars($data['faq']['eyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Title (HTML)</label><input name="faq_title" value="<?= htmlspecialchars($data['faq']['title'] ?? '') ?>"></div>
  </div>
  <div class="row">
    <div class="field"><label>Still heading</label><input name="faq_stillHeading" value="<?= htmlspecialchars($data['faq']['stillHeading'] ?? '') ?>"></div>
    <div class="field"><label>Still body (HTML)</label><input name="faq_stillBody" value="<?= htmlspecialchars($data['faq']['stillBody'] ?? '') ?>"></div>
  </div>
  <?php $faqSections = $data['faq']['sections'] ?? []; ?>
  <input type="hidden" name="faq_section_count" value="<?= count($faqSections) ?: 1 ?>">
  <?php foreach ($faqSections as $si => $section): ?>
  <div class="repeater">
    <div class="repeater-h">Section <?= $si + 1 ?></div>
    <input type="hidden" name="faq_s<?= $si ?>_count" value="<?= count($section['items']) ?>">
    <div class="field"><label>Section heading</label><input name="faq_s<?= $si ?>_heading" value="<?= htmlspecialchars($section['heading'] ?? '') ?>"></div>
    <?php foreach ($section['items'] as $ji => $item): ?>
    <div style="border-left:2px solid rgba(15,32,61,0.1);padding-left:12px;margin:8px 0">
      <div class="field"><label>Q <?= $ji + 1 ?></label><input name="faq_s<?= $si ?>_q<?= $ji ?>" value="<?= htmlspecialchars($item['q'] ?? '') ?>"></div>
      <div class="field"><label>A <?= $ji + 1 ?></label><textarea name="faq_s<?= $si ?>_a<?= $ji ?>" rows="2"><?= htmlspecialchars($item['a'] ?? '') ?></textarea></div>
    </div>
    <?php endforeach; ?>
  </div>
  <?php endforeach; ?>

  <div class="section-h">Community</div>
  <div class="field"><label>Eyebrow</label><input name="community_eyebrow" value="<?= htmlspecialchars($data['community']['eyebrow'] ?? '') ?>"></div>
  <div class="field"><label>Title (HTML)</label><textarea name="community_title" rows="2"><?= htmlspecialchars($data['community']['title'] ?? '') ?></textarea></div>
  <div class="field"><label>Body</label><textarea name="community_body" rows="2"><?= htmlspecialchars($data['community']['body'] ?? '') ?></textarea></div>
  <?php imageField('community_image', $data['community']['image'] ?? '', 'Community Page Image', 'community_img'); ?>
  <div class="field"><label>CTA</label><input name="community_cta" value="<?= htmlspecialchars($data['community']['cta'] ?? '') ?>"></div>

  <div class="section-h">Corporate</div>
  <div class="field"><label>Eyebrow</label><input name="corporate_eyebrow" value="<?= htmlspecialchars($data['corporate']['eyebrow'] ?? '') ?>"></div>
  <div class="field"><label>Title (HTML)</label><textarea name="corporate_title" rows="2"><?= htmlspecialchars($data['corporate']['title'] ?? '') ?></textarea></div>
  <div class="field"><label>Body</label><textarea name="corporate_body" rows="2"><?= htmlspecialchars($data['corporate']['body'] ?? '') ?></textarea></div>
  <?php imageField('corporate_image', $data['corporate']['image'] ?? '', 'Corporate Page Image', 'corporate_img'); ?>
  <div class="field"><label>CTA</label><input name="corporate_cta" value="<?= htmlspecialchars($data['corporate']['cta'] ?? '') ?>"></div>

  <div class="btn-row">
    <button type="submit">Save all pages</button>
    <a href="dashboard.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php adminFooter(); ?>
