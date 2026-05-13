<?php require_once __DIR__ . '/auth.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $p = $_POST['password'] ?? '';
  if (login($p)) {
    header('Location: dashboard.php');
    exit;
  }
  $error = 'Wrong password.';
}
if (isLoggedIn()) {
  header('Location: dashboard.php');
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>CMS Login</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* { box-sizing: border-box; margin: 0; }
body { font-family: system-ui, sans-serif; background: #0f203d; color: #faf8f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
.login { background: rgba(255,255,255,0.05); border: 1px solid rgba(212,180,120,0.2); padding: 40px; width: 360px; border-radius: 4px; }
h1 { font-size: 20px; margin-bottom: 8px; font-weight: 500; }
p { font-size: 13px; color: rgba(250,248,245,0.6); margin-bottom: 24px; }
input { width: 100%; padding: 10px 14px; background: rgba(255,255,255,0.08); border: 1px solid rgba(212,180,120,0.2); color: #faf8f5; font-size: 15px; margin-bottom: 16px; }
button { width: 100%; padding: 12px; background: #d4b478; color: #0f203d; border: none; font-size: 14px; font-weight: 600; cursor: pointer; }
.error { color: #e8a838; font-size: 13px; margin-bottom: 16px; }
</style>
</head>
<body>
<form class="login" method="post">
  <h1>True Influence Method CMS</h1>
  <p>Enter the admin password to edit content.</p>
  <?php if ($error): ?><div class="error"><?= htmlspecialchars($error) ?></div><?php endif; ?>
  <input type="password" name="password" placeholder="Password" autofocus required>
  <button type="submit">Log in</button>
</form>
</body>
</html>
