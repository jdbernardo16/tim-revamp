<?php require_once __DIR__ . '/auth.php'; requireLogin(); ?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>CMS Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* { box-sizing: border-box; margin: 0; }
body { font-family: system-ui, sans-serif; background: #faf8f5; color: #0f203d; padding: 40px; }
h1 { font-size: 24px; font-weight: 500; margin-bottom: 8px; }
p.sub { color: #8a95a8; margin-bottom: 32px; font-size: 14px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.card { background: white; border: 1px solid rgba(212,180,120,0.2); padding: 24px; text-decoration: none; color: inherit; border-radius: 4px; transition: border-color 0.2s; }
.card:hover { border-color: #d4b478; }
.card h2 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.card p { font-size: 13px; color: #8a95a8; }
.logout { float: right; color: #8a95a8; text-decoration: none; font-size: 13px; }
.logout:hover { color: #0f203d; }
</style>
</head>
<body>
<a href="?logout" class="logout">Log out</a>
<h1>Content Manager</h1>
<p class="sub">Edit any content area below. Changes are saved immediately to the site.</p>
<?php if (isset($_GET['logout'])) { logout(); header('Location: index.php'); exit; } ?>
<?php if (isset($_GET['saved'])): ?><p style="color:#1a7a2e;margin-bottom:16px;font-size:14px">✓ Saved successfully.</p><?php endif; ?>
<div class="grid">
  <a class="card" href="edit-products.php"><h2>Products</h2><p>Prices, taglines, bullets, CTAs</p></a>
  <a class="card" href="edit-home.php"><h2>Homepage</h2><p>Hero, sections, testimonials, ICP cards</p></a>
  <a class="card" href="edit-pages.php"><h2>Pages</h2><p>About, Journey, Stories, FAQ, Community, Corporate</p></a>
  <a class="card" href="edit-speaking.php"><h2>Speaking</h2><p>Booking page, talks, events</p></a>
  <a class="card" href="edit-global.php"><h2>Global</h2><p>Nav menus, footer, site settings</p></a>
  <a class="card" href="edit-password.php"><h2>Change Password</h2><p>Update admin password</p></a>
</div>
</body>
</html>
