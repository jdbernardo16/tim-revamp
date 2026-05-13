// image-picker.js — shared image picker for CMS editor pages
function openImagePicker(fieldId) {
  const w = Math.min(900, screen.width - 80);
  const h = Math.min(650, screen.height - 80);
  const left = (screen.width - w) / 2;
  const top = (screen.height - h) / 2;
  const popup = window.open(
    'browse-images.php?mode=picker',
    'imagePicker',
    `width=${w},height=${h},left=${left},top=${top},popup=1`
  );
  window.selectImage = function(path) {
    const field = document.getElementById(fieldId);
    if (field) field.value = path;
    const preview = document.getElementById(fieldId + '_preview');
    if (preview) preview.src = '../' + path;
    if (popup && !popup.closed) popup.close();
  };
}

function previewImage(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (input && preview && input.value) {
    preview.src = '../' + input.value;
  }
}
