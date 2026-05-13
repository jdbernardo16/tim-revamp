<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/helpers.php';
requireLogin();

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $d = $_POST;
  $data = loadJson('speaking.json');
  $data['heroEyebrow'] = strip_tags($d['heroEyebrow']);
  $data['heroTitle'] = $d['heroTitle'];
  $data['heroBody'] = $d['heroBody'];
  $data['heroCtaPrimary'] = strip_tags($d['heroCtaPrimary']);
  $data['heroCtaSecondary'] = strip_tags($d['heroCtaSecondary']);
  $data['heroImage'] = strip_tags($d['heroImage']);
  $data['reelEyebrow'] = strip_tags($d['reelEyebrow']);
  $data['reelTitle'] = $d['reelTitle'];
  $data['reelImage'] = strip_tags($d['reelImage'] ?? '');
  $data['reelMuted'] = strip_tags($d['reelMuted']);
  $data['reelMutedLink'] = strip_tags($d['reelMutedLink']);
  $data['eventsEyebrow'] = strip_tags($d['eventsEyebrow']);
  $data['eventsTitle'] = $d['eventsTitle'];
  $data['eventsLead'] = strip_tags($d['eventsLead']);
  $data['eventsCta'] = strip_tags($d['eventsCta']);
  $data['talksEyebrow'] = strip_tags($d['talksEyebrow']);
  $data['talksTitle'] = $d['talksTitle'];
  $data['talksLead'] = strip_tags($d['talksLead']);
  $data['testimonialQuote'] = $d['testimonialQuote'];
  $data['testimonialBy'] = strip_tags($d['testimonialBy']);
  $data['inquiryEyebrow'] = strip_tags($d['inquiryEyebrow']);
  $data['inquiryTitle'] = $d['inquiryTitle'];
  $data['inquiryBody'] = $d['inquiryBody'];
  $data['inquiryEmailLabel'] = strip_tags($d['inquiryEmailLabel']);
  $data['inquiryEmail'] = strip_tags($d['inquiryEmail']);
  $data['relatedEyebrow'] = strip_tags($d['relatedEyebrow']);
  $data['relatedTitle'] = $d['relatedTitle'];
  $data['relatedCta'] = strip_tags($d['relatedCta']);
  $data['confirmedImage'] = strip_tags($d['confirmedImage'] ?? '');
  $data['confirmedEyebrow'] = strip_tags($d['confirmedEyebrow']);
  $data['confirmedTitle'] = $d['confirmedTitle'];
  $data['confirmedBody'] = $d['confirmedBody'];

  // Stats
  $data['stats'] = [];
  foreach (explode("\n", $d['stats']) as $line) {
    $parts = array_map('trim', explode('|', $line, 2));
    if (count($parts) === 2) {
      $data['stats'][] = ['number' => strip_tags($parts[0]), 'label' => strip_tags($parts[1])];
    }
  }

  // Events
  $data['events'] = [];
  foreach (explode("\n---\n", $d['events']) as $block) {
    $lines = array_map('trim', explode("\n", $block));
    if (count($lines) >= 3) {
      $data['events'][] = [
        'type' => strip_tags($lines[0]),
        'name' => strip_tags($lines[1]),
        'where' => strip_tags($lines[2]),
        'icon' => strip_tags($lines[3] ?? ''),
      ];
    }
  }

  // Talks
  $data['talks'] = [];
  foreach (explode("\n---\n", $d['talks']) as $block) {
    $lines = array_map('trim', explode("\n", $block));
    if (count($lines) >= 3) {
      $data['talks'][] = [
        'title' => strip_tags($lines[0]),
        'time' => strip_tags($lines[1]),
        'ideal' => strip_tags($lines[2]),
        'body' => strip_tags($lines[3] ?? ''),
      ];
    }
  }

  // Inquiry list
  $data['inquiryList'] = array_map('trim', explode("\n", $d['inquiryList']));

  saveJson('speaking.json', $data);
  $msg = 'Speaking page saved.';
}

$data = loadJson('speaking.json');
adminHeader('Edit Speaking Page');
if ($msg) echo "<div class=\"msg\">$msg</div>";
?>
<form method="post">
  <div class="section-h">Hero</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="heroEyebrow" value="<?= htmlspecialchars($data['heroEyebrow'] ?? '') ?>"></div>
    <?php imageField('heroImage', $data['heroImage'] ?? '', 'Hero Image'); ?>
  </div>
  <div class="field"><label>Title (HTML)</label><textarea name="heroTitle" rows="2"><?= htmlspecialchars($data['heroTitle'] ?? '') ?></textarea></div>
  <div class="field"><label>Body</label><textarea name="heroBody" rows="3"><?= htmlspecialchars($data['heroBody'] ?? '') ?></textarea></div>
  <div class="row">
    <div class="field"><label>CTA Primary</label><input name="heroCtaPrimary" value="<?= htmlspecialchars($data['heroCtaPrimary'] ?? '') ?>"></div>
    <div class="field"><label>CTA Secondary</label><input name="heroCtaSecondary" value="<?= htmlspecialchars($data['heroCtaSecondary'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Stats (number | label, one per line)</label>
    <textarea name="stats" rows="3"><?php
      foreach ($data['stats'] ?? [] as $s) echo htmlspecialchars(($s['number'] ?? '') . ' | ' . ($s['label'] ?? '')) . "\n";
    ?></textarea>
  </div>

  <div class="section-h">Reel</div>
  <?php imageField('reelImage', $data['reelImage'] ?? '', 'Reel Image (video thumbnail)', 'reelImage'); ?>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="reelEyebrow" value="<?= htmlspecialchars($data['reelEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Muted text</label><input name="reelMuted" value="<?= htmlspecialchars($data['reelMuted'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Title (HTML)</label><textarea name="reelTitle" rows="2"><?= htmlspecialchars($data['reelTitle'] ?? '') ?></textarea></div>
  <div class="field"><label>Muted link text</label><input name="reelMutedLink" value="<?= htmlspecialchars($data['reelMutedLink'] ?? '') ?>"></div>

  <div class="section-h">Past Events</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="eventsEyebrow" value="<?= htmlspecialchars($data['eventsEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Lead</label><input name="eventsLead" value="<?= htmlspecialchars($data['eventsLead'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Title (HTML)</label><textarea name="eventsTitle" rows="2"><?= htmlspecialchars($data['eventsTitle'] ?? '') ?></textarea></div>
  <div class="field"><label>Events CTA</label><input name="eventsCta" value="<?= htmlspecialchars($data['eventsCta'] ?? '') ?>"></div>
  <div class="field"><label>Events (type \n name \n where \n icon, separate with ---)</label>
    <textarea name="events" rows="10"><?php
      $ev = $data['events'] ?? [];
      $out = [];
      foreach ($ev as $e) $out[] = ($e['type']??'') . "\n" . ($e['name']??'') . "\n" . ($e['where']??'') . "\n" . ($e['icon']??'');
      echo htmlspecialchars(implode("\n---\n", $out));
    ?></textarea>
  </div>

  <div class="section-h">Signature Talks</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="talksEyebrow" value="<?= htmlspecialchars($data['talksEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Lead</label><input name="talksLead" value="<?= htmlspecialchars($data['talksLead'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Title (HTML)</label><textarea name="talksTitle" rows="2"><?= htmlspecialchars($data['talksTitle'] ?? '') ?></textarea></div>
  <div class="field"><label>Talks (title \n time \n ideal \n body, separate with ---)</label>
    <textarea name="talks" rows="10"><?php
      $tk = $data['talks'] ?? [];
      $out = [];
      foreach ($tk as $t) $out[] = ($t['title']??'') . "\n" . ($t['time']??'') . "\n" . ($t['ideal']??'') . "\n" . ($t['body']??'');
      echo htmlspecialchars(implode("\n---\n", $out));
    ?></textarea>
  </div>

  <div class="section-h">Testimonial</div>
  <div class="row">
    <div class="field"><label>Quote</label><textarea name="testimonialQuote" rows="2"><?= htmlspecialchars($data['testimonialQuote'] ?? '') ?></textarea></div>
    <div class="field"><label>By</label><input name="testimonialBy" value="<?= htmlspecialchars($data['testimonialBy'] ?? '') ?>"></div>
  </div>

  <div class="section-h">Inquiry</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="inquiryEyebrow" value="<?= htmlspecialchars($data['inquiryEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Email label</label><input name="inquiryEmailLabel" value="<?= htmlspecialchars($data['inquiryEmailLabel'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Title (HTML)</label><textarea name="inquiryTitle" rows="2"><?= htmlspecialchars($data['inquiryTitle'] ?? '') ?></textarea></div>
  <div class="field"><label>Body</label><textarea name="inquiryBody" rows="3"><?= htmlspecialchars($data['inquiryBody'] ?? '') ?></textarea></div>
  <div class="field"><label>List items (one per line)</label>
    <textarea name="inquiryList" rows="4"><?= htmlspecialchars(implode("\n", $data['inquiryList'] ?? [])) ?></textarea>
  </div>
  <div class="field"><label>Email</label><input name="inquiryEmail" value="<?= htmlspecialchars($data['inquiryEmail'] ?? '') ?>"></div>

  <div class="section-h">Confirmed / Thank You</div>
  <div class="row">
    <?php imageField('confirmedImage', $data['confirmedImage'] ?? '', 'Confirmed/Thank You Image', 'confirmedImage'); ?>
    <div class="field"><label>Eyebrow</label><input name="confirmedEyebrow" value="<?= htmlspecialchars($data['confirmedEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Title</label><input name="confirmedTitle" value="<?= htmlspecialchars($data['confirmedTitle'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>Body (HTML)</label><textarea name="confirmedBody" rows="3"><?= htmlspecialchars($data['confirmedBody'] ?? '') ?></textarea></div>

  <div class="section-h">Related / Footer</div>
  <div class="row">
    <div class="field"><label>Eyebrow</label><input name="relatedEyebrow" value="<?= htmlspecialchars($data['relatedEyebrow'] ?? '') ?>"></div>
    <div class="field"><label>Title (HTML)</label><input name="relatedTitle" value="<?= htmlspecialchars($data['relatedTitle'] ?? '') ?>"></div>
  </div>
  <div class="field"><label>CTA</label><input name="relatedCta" value="<?= htmlspecialchars($data['relatedCta'] ?? '') ?>"></div>

  <div class="btn-row">
    <button type="submit">Save speaking page</button>
    <a href="dashboard.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php adminFooter(); ?>
