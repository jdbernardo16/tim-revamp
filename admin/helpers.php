<?php
function loadJson(string $file): array {
  $path = __DIR__ . '/../content/' . $file;
  if (!file_exists($path)) return [];
  return json_decode(file_get_contents($path), true) ?? [];
}

function saveJson(string $file, array $data): void {
  $path = __DIR__ . '/../content/' . $file;
  file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

function redirect(string $path): void {
  header("Location: $path");
  exit;
}

function adminHeader(string $title): void {
  ?>
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="utf-8"><title><?= htmlspecialchars($title) ?> — CMS</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="image-picker.js"></script>
  <style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: system-ui, sans-serif; background: #faf8f5; color: #0f203d; padding: 24px 40px 80px; }
  .top { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
  .top a { color: #8a95a8; text-decoration: none; font-size: 13px; }
  .top a:hover { color: #0f203d; }
  h1 { font-size: 20px; font-weight: 500; }
  .msg { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; border-radius: 4px; }
  .err { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; border-radius: 4px; }
  form { max-width: 900px; }
  .field { margin-bottom: 16px; }
  label { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #8a95a8; margin-bottom: 4px; }
  input, textarea, select { width: 100%; padding: 8px 12px; border: 1px solid rgba(15,32,61,0.15); font-size: 14px; background: white; border-radius: 3px; font-family: system-ui, sans-serif; }
  textarea { min-height: 60px; resize: vertical; }
  input:focus, textarea:focus { outline: none; border-color: #d4b478; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .repeater { border: 1px solid rgba(15,32,61,0.1); padding: 16px; margin-bottom: 12px; background: rgba(255,255,255,0.6); border-radius: 3px; }
  .repeater-h { font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #0f203d; }
  .section-h { font-size: 14px; font-weight: 600; margin: 24px 0 12px; padding-bottom: 6px; border-bottom: 1px solid rgba(15,32,61,0.1); }
  .btn-row { margin-top: 20px; display: flex; gap: 12px; }
  button, .btn { padding: 10px 28px; background: #d4b478; color: #0f203d; border: none; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 3px; text-decoration: none; }
  .btn-secondary { background: transparent; border: 1px solid rgba(15,32,61,0.15); color: #0f203d; }
  .btn-danger { background: #8b3a3a; color: white; }
  .inline-hint { font-size: 11px; color: #8a95a8; margin-top: 2px; }
  .img-field { display: flex; gap: 12px; align-items: flex-start; }
  .img-field input { flex: 1; }
  .img-field .img-browse { white-space: nowrap; padding: 8px 16px; background: transparent; border: 1px solid rgba(15,32,61,0.15); font-size: 12px; cursor: pointer; border-radius: 3px; color: #0f203d; }
  .img-field .img-browse:hover { border-color: #d4b478; }
  .img-preview { width: 80px; height: 50px; object-fit: cover; border-radius: 3px; border: 1px solid rgba(15,32,61,0.1); flex-shrink: 0; background: #f0ede8; }
  </style>
  </head>
  <body>
  <div class="top">
    <a href="dashboard.php">&larr; Dashboard</a>
    <h1><?= htmlspecialchars($title) ?></h1>
  </div>
  <?php
}

function imageField(string $name, string $value, string $label = 'Image', string $id = ''): void {
  $id = $id ?: 'img_' . $name;
  $safe = htmlspecialchars($value);
  echo '<div class="field"><label>' . htmlspecialchars($label) . '</label>';
  echo '<div class="img-field">';
  echo '<img class="img-preview" id="' . $id . '_preview" src="../' . $safe . '" alt="" onerror="this.style.display=\'none\'">';
  echo '<input name="' . htmlspecialchars($name) . '" id="' . $id . '" value="' . $safe . '">';
  echo '<button type="button" class="img-browse" onclick="openImagePicker(\'' . $id . '\')">Browse</button>';
  echo '</div></div>';
}

function adminFooter(): void {
  echo '</body></html>';
}
