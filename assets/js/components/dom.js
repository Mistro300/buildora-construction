import { FONT_AWESOME_ICONS } from './icons.js';

export function element(tag, { className, text, attrs = {}, children = [] } = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = String(text);
  for (const [name, value] of Object.entries(attrs)) {
    if (value !== null && value !== undefined) node.setAttribute(name, String(value));
  }
  for (const child of children) if (child) node.append(child);
  return node;
}

export function icon(name, className = 'icon icon--sm') {
  const safeName = FONT_AWESOME_ICONS.has(name) ? name : 'fa-building';
  return element('i', {
    className: `fa-solid ${safeName} ${className}`,
    attrs: { 'aria-hidden': 'true' },
  });
}

export function image(src, alt, { width = 1200, height = 800, loading = 'lazy' } = {}) {
  const img = element('img', { attrs: { src, alt, width, height, loading, decoding: 'async' } });
  img.addEventListener('error', () => {
    const fallback = element('div', {
      className: 'media-fallback',
      text: 'تعذّر تحميل الصورة التوضيحية',
      attrs: { role: 'img', 'aria-label': alt },
    });
    img.replaceWith(fallback);
  }, { once: true });
  return img;
}

export function setStatus(node, type, message, retry) {
  if (!node) return;
  node.replaceChildren();
  const wrap = element('div', { className: `state-message state-message--${type}`, attrs: { role: type === 'error' ? 'alert' : 'status' } });
  wrap.append(element('p', { text: message }));
  if (type === 'error' && typeof retry === 'function') {
    const button = element('button', { className: 'button button--outline-dark', text: 'إعادة المحاولة', attrs: { type: 'button' } });
    button.addEventListener('click', retry, { once: true });
    wrap.append(button);
  }
  node.append(wrap);
}

export function createProjectCard(project, category) {
  const href = `project.html?id=${encodeURIComponent(project.id)}`;
  const visual = element('figure', { className: 'project-card__image' });
  visual.append(image(project.thumbnail, project.thumbnailAlt));
  visual.append(element('figcaption', { className: 'project-card__category', text: category }));
  const mediaLink = element('a', { attrs: { href, 'aria-label': `تفاصيل ${project.title}` }, children: [visual] });
  const nameLink = element('a', { text: project.title, attrs: { href } });
  const title = element('h3', { children: [nameLink] });
  const meta = element('div', { className: 'meta-line project-card__meta', children: [
    element('span', { text: project.city }),
    element('span', { className: 'meta-line__divider', attrs: { 'aria-hidden': 'true' } }),
    element('span', { text: `${project.areaSqm} m²`, attrs: { dir: 'ltr', lang: 'en' } }),
  ] });
  const foot = element('a', { className: 'project-card__foot', attrs: { href }, children: [
    document.createTextNode('استعرض المشروع'), icon('fa-chevron-left'),
  ] });
  const body = element('div', { className: 'project-card__body', children: [title, meta, foot] });
  return element('article', { className: 'project-card', children: [mediaLink, body] });
}
