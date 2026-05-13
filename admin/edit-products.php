<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/helpers.php';
requireLogin();

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $products = [];
  foreach ($_POST['products'] as $id => $p) {
    $entry = [
      'id' => $id,
      'name' => strip_tags($p['name']),
      'tagline' => strip_tags($p['tagline']),
      'price' => (int) $p['price'],
      'bullets' => array_map('strip_tags', explode("\n", $p['bullets'])),
      'cta' => strip_tags($p['cta']),
      'kind' => strip_tags($p['kind']),
    ];
    if (!empty($p['currency'])) $entry['currency'] = strip_tags($p['currency']);
    if (!empty($p['value'])) $entry['value'] = (int) $p['value'];
    if (!empty($p['phase'])) $entry['phase'] = strip_tags($p['phase']);
    if (!empty($p['leaveWith'])) $entry['leaveWith'] = strip_tags($p['leaveWith']);
    if (!empty($p['icp'])) $entry['icp'] = strip_tags($p['icp']);
    if (!empty($p['priceLabel'])) $entry['priceLabel'] = strip_tags($p['priceLabel']);
    $products[$id] = $entry;
  }
  saveJson('products.json', $products);

  // Save sidebar image
  $pd = loadJson('product-details.json');
  $pd['sidebarImage'] = strip_tags($_POST['sidebar_image'] ?? '');
  saveJson('product-details.json', $pd);

  $msg = 'Products saved.';
}

$data = loadJson('products.json');
$pd = loadJson('product-details.json');
adminHeader('Edit Products');
if ($msg) echo "<div class=\"msg\">$msg</div>";
?>

<form method="post">
<div class="section-h">Global</div>
<?php imageField('sidebar_image', $pd['sidebarImage'] ?? '', 'Product Detail Sidebar Image', 'sidebar_img'); ?>

<?php foreach ($data as $id => $p): ?>
  <div class="repeater">
    <div class="repeater-h"><?= htmlspecialchars($p['name'] ?? $id) ?> (<?= htmlspecialchars($id) ?>)</div>
    <input type="hidden" name="products[<?= htmlspecialchars($id) ?>][kind]" value="<?= htmlspecialchars($p['kind'] ?? '') ?>">
    <div class="row">
      <div class="field">
        <label>Name</label>
        <input name="products[<?= htmlspecialchars($id) ?>][name]" value="<?= htmlspecialchars($p['name'] ?? '') ?>">
      </div>
      <div class="field">
        <label>Price (0 = free)</label>
        <input name="products[<?= htmlspecialchars($id) ?>][price]" value="<?= htmlspecialchars($p['price'] ?? '0') ?>">
      </div>
    </div>
    <?php if (!empty($p['phase'])): ?>
    <div class="row">
      <div class="field"><label>Phase label</label><input name="products[<?= htmlspecialchars($id) ?>][phase]" value="<?= htmlspecialchars($p['phase']) ?>"></div>
      <div class="field"><label>Value (compare-at)</label><input name="products[<?= htmlspecialchars($id) ?>][value]" value="<?= htmlspecialchars($p['value'] ?? '') ?>"></div>
    </div>
    <?php endif; ?>
    <div class="field">
      <label>Tagline</label>
      <input name="products[<?= htmlspecialchars($id) ?>][tagline]" value="<?= htmlspecialchars($p['tagline'] ?? '') ?>">
    </div>
    <?php if (!empty($p['priceLabel'])): ?>
    <div class="field"><label>Price label (replaces numeric price)</label><input name="products[<?= htmlspecialchars($id) ?>][priceLabel]" value="<?= htmlspecialchars($p['priceLabel']) ?>"></div>
    <?php endif; ?>
    <?php if (!empty($p['currency']) && $p['currency'] !== '$'): ?>
    <div class="field"><label>Currency label</label><input name="products[<?= htmlspecialchars($id) ?>][currency]" value="<?= htmlspecialchars($p['currency']) ?>"></div>
    <?php endif; ?>
    <div class="field">
      <label>Bullets (one per line)</label>
      <textarea name="products[<?= htmlspecialchars($id) ?>][bullets]" rows="4"><?= htmlspecialchars(implode("\n", $p['bullets'] ?? [])) ?></textarea>
    </div>
    <div class="row">
      <div class="field"><label>CTA button text</label><input name="products[<?= htmlspecialchars($id) ?>][cta]" value="<?= htmlspecialchars($p['cta'] ?? '') ?>"></div>
      <?php if (!empty($p['leaveWith'])): ?>
      <div class="field"><label>Leave-with quote</label><input name="products[<?= htmlspecialchars($id) ?>][leaveWith]" value="<?= htmlspecialchars($p['leaveWith']) ?>"></div>
      <?php endif; ?>
    </div>
    <?php if (!empty($p['icp'])): ?>
    <div class="field"><label>ICP</label><input name="products[<?= htmlspecialchars($id) ?>][icp]" value="<?= htmlspecialchars($p['icp']) ?>"></div>
    <?php endif; ?>
  </div>
<?php endforeach; ?>
  <div class="btn-row">
    <button type="submit">Save all products</button>
    <a href="dashboard.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php adminFooter(); ?>
