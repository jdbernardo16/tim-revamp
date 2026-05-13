<?php
$format = $_GET['format'] ?? 'json';
$type = $_GET['type'] ?? 'all';

if ($format !== 'js') {
  header('Content-Type: application/json');
}
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

$dir = __DIR__ . '/../content';
$files = [
  'products' => 'products.json',
  'home' => 'home.json',
  'product-details' => 'product-details.json',
  'icp' => 'icp.json',
  'pages' => 'pages.json',
  'speaking' => 'speaking.json',
  'global' => 'global.json',
  'checkout' => 'checkout.json',
];

if ($type === 'all') {
  $data = [];
  foreach ($files as $key => $file) {
    $path = "$dir/$file";
    if (file_exists($path)) {
      $data[$key] = json_decode(file_get_contents($path), true);
    }
  }
  if ($format === 'js') {
    header('Content-Type: application/javascript');
    echo 'window.CONTENT = ' . json_encode($data) . ";\n";
    foreach ($data as $key => $val) {
      $var = $key === 'product-details' ? 'PRODUCT_DETAILS' : strtoupper(strtr($key, '-', '_'));
      echo 'window.' . $var . ' = window.CONTENT[' . json_encode($key) . "];\n";
    }
    echo 'window._CONTENT_LOADED = true;';
  } else {
    echo json_encode($data);
  }
} elseif (isset($files[$type])) {
  $path = "$dir/{$files[$type]}";
  if (!file_exists($path)) {
    http_response_code(404);
    echo json_encode(['error' => 'Content not found']);
    exit;
  }
  echo file_get_contents($path);
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid type']);
}
