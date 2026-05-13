<?php
require_once __DIR__ . '/auth.php';
requireLogin();

header('Content-Type: application/json');

$uploadDir = __DIR__ . '/../uploads/';
$allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
$maxSize = 5 * 1024 * 1024; // 5MB

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'POST required']);
  exit;
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo json_encode(['error' => 'Upload failed']);
  exit;
}

$file = $_FILES['file'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!in_array($ext, $allowed)) {
  http_response_code(400);
  echo json_encode(['error' => 'Only JPG, PNG, WebP, GIF, SVG allowed']);
  exit;
}

if ($file['size'] > $maxSize) {
  http_response_code(400);
  echo json_encode(['error' => 'File too large (max 5MB)']);
  exit;
}

// Generate unique filename
$name = preg_replace('/[^a-zA-Z0-9_-]/', '', pathinfo($file['name'], PATHINFO_FILENAME));
$name = substr($name, 0, 40) . '_' . time() . '.' . $ext;
$dest = $uploadDir . $name;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to save file']);
  exit;
}

echo json_encode([
  'path' => 'uploads/' . $name,
  'name' => $name,
  'url' => 'uploads/' . $name,
  'size' => $file['size'],
]);
