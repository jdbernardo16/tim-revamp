<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/helpers.php';
requireLogin();

$uploadsDir = __DIR__ . '/../uploads/';
$allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
$images = [];

if (is_dir($uploadsDir)) {
  $files = scandir($uploadsDir);
  foreach ($files as $f) {
    $ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
    if (in_array($ext, $allowed)) {
      $images[] = $f;
    }
  }
}

$mode = $_GET['mode'] ?? 'picker';
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8">
<title><?= $mode === 'picker' ? 'Select Image' : 'Image Manager' ?> — CMS</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* { box-sizing: border-box; margin: 0; }
body { font-family: system-ui, sans-serif; background: #faf8f5; color: #0f203d; padding: 24px; }
.top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
h1 { font-size: 18px; font-weight: 500; }
.back { color: #8a95a8; text-decoration: none; font-size: 13px; }
.back:hover { color: #0f203d; }

.upload-area { border: 2px dashed rgba(15,32,61,0.15); padding: 32px; text-align: center; margin-bottom: 24px; border-radius: 4px; }
.upload-area.drag-over { border-color: #d4b478; background: rgba(212,180,120,0.05); }
.upload-btn { padding: 10px 24px; background: #d4b478; color: #0f203d; border: none; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 3px; }
.upload-hint { font-size: 12px; color: #8a95a8; margin-top: 8px; }
.upload-progress { margin-top: 12px; font-size: 13px; color: #1a7a2e; }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
.card { background: white; border: 1px solid rgba(15,32,61,0.1); border-radius: 4px; overflow: hidden; cursor: pointer; transition: border-color 0.2s; }
.card:hover { border-color: #d4b478; }
.card img { width: 100%; height: 140px; object-fit: cover; display: block; }
.card .name { font-size: 11px; padding: 6px 8px; color: #8a95a8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.card .size { font-size: 10px; padding: 0 8px 6px; color: #b0b8c0; }

.empty { text-align: center; padding: 48px; color: #8a95a8; font-size: 14px; }
</style>
</head>
<body>
<div class="top">
  <div>
    <a href="<?= $mode === 'picker' ? 'javascript:window.close()' : 'dashboard.php' ?>" class="back">&larr; Back</a>
    <h1 style="margin-top:6px"><?= $mode === 'picker' ? 'Select an Image' : 'Image Manager' ?></h1>
  </div>
  <span style="font-size:13px;color:#8a95a8"><?= count($images) ?> images</span>
</div>

<div class="upload-area" id="dropZone">
  <p style="margin-bottom:12px;font-size:14px;color:#8a95a8">Drop an image here or click to upload</p>
  <input type="file" id="fileInput" accept="image/*" style="display:none">
  <button class="upload-btn" onclick="document.getElementById('fileInput').click()">Choose file</button>
  <p class="upload-hint">JPG, PNG, WebP, GIF, SVG &middot; max 5MB</p>
  <div class="upload-progress" id="uploadStatus"></div>
</div>

<div class="grid" id="imageGrid">
<?php foreach ($images as $img):
  $path = '../uploads/' . $img;
  $size = filesize($path);
  $sizeStr = $size > 1024 * 1024 ? round($size / 1024 / 1024, 1) . ' MB' : round($size / 1024) . ' KB';
?>
  <div class="card" onclick="<?= $mode === 'picker' ? "selectImage('uploads/$img')" : '' ?>">
    <img src="../uploads/<?= htmlspecialchars($img) ?>" alt="<?= htmlspecialchars($img) ?>" loading="lazy">
    <div class="name"><?= htmlspecialchars($img) ?></div>
    <div class="size"><?= $sizeStr ?></div>
  </div>
<?php endforeach; ?>
</div>

<?php if (empty($images)): ?>
<div class="empty">No images uploaded yet. Drop one above.</div>
<?php endif; ?>

<script>
// Drag & drop
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const status = document.getElementById('uploadStatus');

dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('drag-over'); if (e.dataTransfer.files.length) uploadFile(e.dataTransfer.files[0]); });
fileInput.addEventListener('change', () => { if (fileInput.files.length) uploadFile(fileInput.files[0]); });

async function uploadFile(file) {
  if (!file.type.startsWith('image/')) { status.textContent = 'Not an image file.'; return; }
  if (file.size > 5 * 1024 * 1024) { status.textContent = 'File too large (max 5MB).'; return; }
  const form = new FormData();
  form.append('file', file);
  status.textContent = 'Uploading...';
  try {
    const r = await fetch('upload.php', { method: 'POST', body: form });
    const d = await r.json();
    if (d.error) { status.textContent = 'Error: ' + d.error; return; }
    status.innerHTML = 'Uploaded ✓ <a href="browse-images.php" style="color:#d4b478">Refresh to see</a>';
    if (typeof window.opener !== 'undefined' && window.opener.selectImage) {
      window.opener.selectImage(d.path);
      window.close();
    }
  } catch(e) {
    status.textContent = 'Upload failed.';
  }
}

<?php if ($mode === 'picker'): ?>
function selectImage(path) {
  if (window.opener && window.opener.selectImage) {
    window.opener.selectImage(path);
    window.close();
  }
}
<?php endif; ?>
</script>
</body>
</html>
