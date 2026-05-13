<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/helpers.php';
requireLogin();

$msg = '';
$err = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $current = $_POST['current'] ?? '';
  $new = $_POST['new_password'] ?? '';
  $confirm = $_POST['confirm'] ?? '';

  if (login($current)) {
    if (strlen($new) < 6) {
      $err = 'New password must be at least 6 characters.';
    } elseif ($new !== $confirm) {
      $err = 'Passwords do not match.';
    } else {
      $hash = password_hash($new, PASSWORD_DEFAULT);
      file_put_contents(__DIR__ . '/../content/.admin_pass', $hash);
      $msg = 'Password changed successfully.';
    }
  } else {
    $err = 'Current password is incorrect.';
  }
}

adminHeader('Change Password');
if ($msg) echo "<div class=\"msg\">$msg</div>";
if ($err) echo "<div class=\"err\">$err</div>";
?>
<form method="post">
  <div class="field"><label>Current password</label><input type="password" name="current" required></div>
  <div class="field"><label>New password (min 6 chars)</label><input type="password" name="new_password" required></div>
  <div class="field"><label>Confirm new password</label><input type="password" name="confirm" required></div>
  <div class="btn-row">
    <button type="submit">Change password</button>
    <a href="dashboard.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php adminFooter(); ?>
