import { element, icon, image } from './dom.js';

export function createGallery(host, photos, title) {
  host.replaceChildren();
  if (!photos.length) {
    host.append(element('p', { className: 'state-message', text: 'لا توجد صور إضافية لهذا التصور.' }));
    return () => {};
  }

  let current = 0;
  let previousFocus = null;
  const stage = element('div', { className: 'gallery__stage' });
  const stageImage = element('div', { className: 'gallery__visual' });
  const open = element('button', {
    className: 'gallery__open', attrs: { type: 'button', 'aria-label': 'عرض الصورة مكبرة' },
    children: [icon('fa-maximize')],
  });
  stage.append(stageImage, open);
  const thumbs = element('div', { className: 'gallery__thumbs', attrs: { role: 'group', 'aria-label': 'اختيار صورة المشروع' } });
  const dialog = element('dialog', { className: 'lightbox', attrs: { 'aria-label': `معرض ${title}`, 'aria-modal': 'true' } });
  const toolbar = element('div', { className: 'lightbox__toolbar' });
  const counter = element('span', { className: 'lightbox__counter', attrs: { dir: 'ltr' } });
  const close = element('button', {
    className: 'lightbox__control', attrs: { type: 'button', 'aria-label': 'إغلاق المعرض' },
    children: [icon('fa-xmark')],
  });
  toolbar.append(counter, close);
  const largePhoto = element('div', { className: 'lightbox__photo' });
  const controls = element('div', { className: 'lightbox__actions' });
  const prev = element('button', {
    className: 'lightbox__control', attrs: { type: 'button', 'aria-label': 'الصورة السابقة' },
    children: [icon('fa-arrow-right')],
  });
  const next = element('button', {
    className: 'lightbox__control', attrs: { type: 'button', 'aria-label': 'الصورة التالية' },
    children: [icon('fa-arrow-left')],
  });
  controls.append(prev, next);
  dialog.append(toolbar, largePhoto, controls);

  const renderLargePhoto = () => {
    const asset = photos[current];
    largePhoto.replaceChildren(image(asset.src, asset.alt, {
      width: asset.width, height: asset.height, loading: 'eager',
    }));
  };
  const redraw = () => {
    const asset = photos[current];
    stageImage.replaceChildren(image(asset.src, asset.alt, {
      width: asset.width, height: asset.height,
    }));
    counter.textContent = `${current + 1} / ${photos.length}`;
    for (const [index, button] of [...thumbs.children].entries()) {
      button.setAttribute('aria-pressed', String(index === current));
    }
    prev.disabled = next.disabled = photos.length < 2;
    if (dialog.open) renderLargePhoto();
  };
  const move = (direction) => {
    current = (current + direction + photos.length) % photos.length;
    redraw();
  };
  photos.forEach((asset, index) => {
    const thumb = element('button', {
      className: 'gallery__thumb',
      attrs: { type: 'button', 'aria-label': `الصورة ${index + 1} من ${photos.length}`, 'aria-pressed': String(index === current) },
    });
    thumb.append(image(asset.src, asset.alt, { width: asset.width, height: asset.height }));
    thumb.addEventListener('click', () => { current = index; redraw(); });
    thumbs.append(thumb);
  });

  const dismiss = () => { if (dialog.open) dialog.close(); };
  open.addEventListener('click', () => {
    if (dialog.open || typeof dialog.showModal !== 'function') return;
    previousFocus = document.activeElement;
    dialog.showModal();
    renderLargePhoto();
    close.focus();
  });
  close.addEventListener('click', dismiss);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dismiss(); });
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); dismiss(); });
  dialog.addEventListener('close', () => {
    largePhoto.replaceChildren();
    if (previousFocus?.isConnected) previousFocus.focus();
    previousFocus = null;
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { event.preventDefault(); dismiss(); return; }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(1); return; }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(-1); return; }
    if (event.key !== 'Tab') return;
    const focusable = [close, prev, next].filter((button) => !button.disabled);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  host.append(stage, thumbs, dialog);
  redraw();
  return dismiss;
}
