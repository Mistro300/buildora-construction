import { element, icon, image } from './dom.js';

export function clampComparisonValue(value) {
  return Math.max(0, Math.min(100, Number.isFinite(Number(value)) ? Number(value) : 50));
}

export function createComparison(host, beforeImage, afterImage) {
  host.replaceChildren();
  if (!beforeImage || !afterImage) {
    host.append(element('p', {
      className: 'state-message', text: 'لا تتوفر مقارنة مرئية لهذا التصور.',
    }));
    return;
  }
  const compare = element('div', { className: 'comparison__visual' });
  const after = element('div', { className: 'comparison__after', children: [
    image(afterImage.src, afterImage.alt, { width: afterImage.width, height: afterImage.height }),
  ] });
  const before = element('div', { className: 'comparison__before', children: [
    image(beforeImage.src, beforeImage.alt, { width: beforeImage.width, height: beforeImage.height }),
  ] });
  const line = element('div', {
    className: 'comparison__handle', attrs: { 'aria-hidden': 'true' },
    children: [icon('fa-left-right', 'icon icon--lg')],
  });
  compare.append(after, before, line);
  const range = element('input', {
    className: 'comparison__range',
    attrs: {
      type: 'range', min: '0', max: '100', value: '50', step: '1',
      'aria-label': 'نسبة ظهور التصور الأولي مقارنة بالتصور المطوّر',
    },
  });
  const update = () => {
    const percent = clampComparisonValue(range.value);
    compare.style.setProperty('--reveal', `${percent}%`);
    range.setAttribute('aria-valuetext', `${percent}% من الصورة تُظهر التصور الأولي`);
  };
  // A native range handles pointer, touch, arrows, Home and End without custom drag code.
  range.addEventListener('input', update);
  const caption = element('div', { className: 'comparison__labels', children: [
    element('span', { text: 'تصور أولي / Demo' }),
    element('span', { text: 'تصور تطويري / Demo' }),
  ] });
  host.append(compare, range, caption);
  update();
}
