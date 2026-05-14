// repeater.js — add/remove/reorder/re-index for admin repeater fields

document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-repeater-add], [data-repeater-remove], [data-repeater-up], [data-repeater-down]');
    if (!btn) return;
    e.preventDefault();

    var wrapper = btn.closest('[data-repeater]');
    if (!wrapper) return;
    var items = wrapper.querySelector('.repeater-items');
    var template = wrapper.querySelector('.repeater-template');

    if (btn.hasAttribute('data-repeater-add')) {
        if (!template) return;
        var clone = template.cloneNode(true);
        clone.classList.remove('repeater-template');
        clone.classList.add('repeater-item');
        var inputs = clone.querySelectorAll('input, textarea');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type !== 'hidden') {
                inputs[i].value = '';
                var preview = clone.querySelector('.img-preview');
                if (preview) preview.style.display = 'none';
            }
        }
        items.appendChild(clone);
        reindex(wrapper);
    }

    if (btn.hasAttribute('data-repeater-remove')) {
        if (!items) return;
        var item = btn.closest('.repeater-item');
        var min = parseInt(wrapper.getAttribute('data-repeater-min') || '1', 10);
        if (items.querySelectorAll('.repeater-item').length > min) {
            item.parentNode.removeChild(item);
            reindex(wrapper);
        }
    }

    if (btn.hasAttribute('data-repeater-up')) {
        var item = btn.closest('.repeater-item');
        var prev = item.previousElementSibling;
        if (prev && prev.classList.contains('repeater-item')) {
            item.parentNode.insertBefore(item, prev);
            reindex(wrapper);
        }
    }

    if (btn.hasAttribute('data-repeater-down')) {
        var item = btn.closest('.repeater-item');
        var next = item.nextElementSibling;
        if (next && next.classList.contains('repeater-item')) {
            item.parentNode.insertBefore(next, item);
            reindex(wrapper);
        }
    }
});

function reindex(wrapper) {
    var items = wrapper.querySelectorAll('.repeater-item');
    var name = wrapper.getAttribute('data-repeater');
    for (var i = 0; i < items.length; i++) {
        var inputs = items[i].querySelectorAll('[name]');
        for (var j = 0; j < inputs.length; j++) {
            var old = inputs[j].getAttribute('name');
            var newName = old.replace(/^([^\[]+)\[(\d+|__INDEX__)\]\[/, '$1[' + i + '][');
            inputs[j].setAttribute('name', newName);
            var id = inputs[j].getAttribute('id');
            if (id) {
                var newId = id.replace(/_\d+_/g, '_' + i + '_').replace('__INDEX__', '' + i);
                inputs[j].setAttribute('id', newId);
                var preview = document.getElementById(newId + '_preview');
                if (preview) preview.setAttribute('id', newId + '_preview');
                var browseBtn = items[i].querySelector('.img-browse');
                if (browseBtn) {
                    var oc = browseBtn.getAttribute('onclick');
                    if (oc) browseBtn.setAttribute('onclick', oc.replace(/_\d+_/g, '_' + i + '_'));
                }
            }
        }
        // Update label for attributes to match new IDs
        var labels = items[i].querySelectorAll('label[for]');
        for (var k = 0; k < labels.length; k++) {
            var oldFor = labels[k].getAttribute('for');
            if (oldFor) {
                labels[k].setAttribute('for', oldFor.replace(/_\d+_/g, '_' + i + '_'));
            }
        }
        // Update repeater-item headers if present
        var h = items[i].querySelector('.repeater-item-h');
        if (h) h.textContent = (i + 1) + '.';
    }
}
