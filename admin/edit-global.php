<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/helpers.php';
requireLogin();

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $d = $_POST;
  $data = loadJson('global.json');
  $data['siteName'] = strip_tags($d['siteName']);
  $data['email'] = strip_tags($d['email']);
  $data['speakingEmail'] = strip_tags($d['speakingEmail']);
  $data['year'] = (int) $d['year'];

  // Nav menus — textarea format: label | route (for simple) OR label (for dropdown, items on next lines)
  $data['navMenus'] = [];
  $navLines = explode("\n---\n", $d['nav_menus'] ?? '');
  foreach ($navLines as $block) {
    $lines = array_map('trim', explode("\n", $block));
    if (empty($lines[0])) continue;
    $parts = array_map('trim', explode('|', $lines[0], 2));
    $label = strip_tags($parts[0]);
    if (count($parts) >= 2 && !empty($parts[1])) {
      // Simple link: label | route
      $data['navMenus'][] = ['id' => 'nav-' . count($data['navMenus']), 'label' => $label, 'route' => strip_tags($parts[1])];
    } else {
      // Dropdown: label with items on subsequent lines as: label | route | params
      $items = [];
      for ($j = 1; $j < count($lines); $j++) {
        $iparts = array_map('trim', explode('|', $lines[$j], 3));
        if (empty($iparts[0])) continue;
        $item = ['label' => strip_tags($iparts[0]), 'route' => strip_tags($iparts[1] ?? 'home')];
        if (!empty($iparts[2])) {
          $parsed = []; parse_str($iparts[2], $parsed); $item['params'] = $parsed;
        }
        $items[] = $item;
      }
      $data['navMenus'][] = ['id' => 'nav-' . count($data['navMenus']), 'label' => $label, 'items' => $items];
    }
  }

  // Footer
  $data['footerCols'] = [];
  $footerHeadings = $d['footer_heading'] ?? [];
  $footerLinks = $d['footer_links'] ?? [];
  foreach ($footerHeadings as $fi => $heading) {
    if (empty($heading)) continue;
    $col = ['heading' => strip_tags($heading), 'links' => []];
    $linkLines = $footerLinks[$fi] ?? '';
    foreach (explode("\n", $linkLines) as $line) {
      $parts = array_map('trim', explode('|', $line, 3));
      if (count($parts) >= 2) {
        $link = ['label' => strip_tags($parts[0]), 'route' => strip_tags($parts[1])];
        if (!empty($parts[2])) {
          $parsed = [];
          parse_str($parts[2], $parsed);
          $link['params'] = $parsed;
        }
        $col['links'][] = $link;
      }
    }
    $data['footerCols'][] = $col;
  }

  saveJson('global.json', $data);
  $msg = 'Global settings saved.';
}

$data = loadJson('global.json');
adminHeader('Edit Global Settings');
if ($msg) echo "<div class=\"msg\">$msg</div>";
?>
<form method="post">
  <div class="section-h">Site Settings</div>
  <div class="row">
    <div class="field"><label>Site name</label><input name="siteName" value="<?= htmlspecialchars($data['siteName'] ?? '') ?>"></div>
    <div class="field"><label>Year</label><input name="year" value="<?= htmlspecialchars($data['year'] ?? '2026') ?>"></div>
  </div>
  <div class="row">
    <div class="field"><label>General email</label><input name="email" value="<?= htmlspecialchars($data['email'] ?? '') ?>"></div>
    <div class="field"><label>Speaking email</label><input name="speakingEmail" value="<?= htmlspecialchars($data['speakingEmail'] ?? '') ?>"></div>
  </div>

  <div class="section-h">Nav Menus</div>
  <div class="inline-hint">Simple links: <strong>label | route</strong>. Dropdown menus: <strong>label</strong> on first line, then <strong>label | route | optional-params</strong> on subsequent lines. Separate menus with <strong>---</strong> on its own line.</div>
  <div class="field">
    <textarea name="nav_menus" rows="12"><?php
      $menus = $data['navMenus'] ?? [];
      $out = [];
      foreach ($menus as $m) {
        if (!empty($m['route'])) {
          $out[] = ($m['label'] ?? '') . ' | ' . $m['route'];
        } else {
          $block = $m['label'] ?? '';
          foreach ($m['items'] ?? [] as $item) {
            $paramsStr = !empty($item['params']) ? ' | ' . http_build_query($item['params']) : '';
            $block .= "\n" . ($item['label'] ?? '') . ' | ' . ($item['route'] ?? 'home') . $paramsStr;
          }
          $out[] = $block;
        }
      }
      echo htmlspecialchars(implode("\n---\n", $out));
    ?></textarea>
  </div>

  <div class="section-h">Footer Columns</div>
  <div class="inline-hint">Each column: heading, then links (label|route|optional-params, one per line).</div>
  <?php $footerCols = $data['footerCols'] ?? []; ?>
  <?php foreach ($footerCols as $fi => $col): ?>
  <div class="repeater">
    <div class="field"><label>Column heading</label><input name="footer_heading[<?= $fi ?>]" value="<?= htmlspecialchars($col['heading']) ?>"></div>
    <div class="field"><label>Links (label | route | params, one per line)</label>
      <textarea name="footer_links[<?= $fi ?>]" rows="4"><?php
        foreach ($col['links'] as $link) {
          $paramsStr = !empty($link['params']) ? ' | ' . http_build_query($link['params']) : '';
          echo htmlspecialchars(($link['label'] ?? '') . ' | ' . ($link['route'] ?? '') . $paramsStr) . "\n";
        }
      ?></textarea>
    </div>
  </div>
  <?php endforeach; ?>

  <div class="btn-row">
    <button type="submit">Save global settings</button>
    <a href="dashboard.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php adminFooter(); ?>
