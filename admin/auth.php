<?php
session_start();

$passwordFile = __DIR__ . '/../content/.admin_pass';
$defaultHash = password_hash('admin123', PASSWORD_DEFAULT);

// Create default password file if none exists
if (!file_exists($passwordFile)) {
  file_put_contents($passwordFile, $defaultHash);
}

function isLoggedIn(): bool {
  return !empty($_SESSION['cms_logged_in']);
}

function login(string $password): bool {
  $hash = file_get_contents(__DIR__ . '/../content/.admin_pass');
  if (password_verify($password, $hash)) {
    $_SESSION['cms_logged_in'] = true;
    return true;
  }
  return false;
}

function logout(): void {
  unset($_SESSION['cms_logged_in']);
  session_destroy();
}

function requireLogin(): void {
  if (!isLoggedIn()) {
    header('Location: index.php');
    exit;
  }
}
