import { element, icon } from './dom.js';

export function renderAccordion(host, items, prefix, { variant = 'faq' } = {}) {
  host.replaceChildren();
  items.forEach((item, index) => {
    const panelId = `${prefix}-${index + 1}`;
    const buttonId = `${panelId}-toggle`;
    const isProcess = variant === 'process';

    const toggleChildren = isProcess
      ? [
          element('span', { className: 'process-step-card__num', text: item.number || String(index + 1).padStart(2, '0'), attrs: { dir: 'ltr' } }),
          element('span', { className: 'process-step-card__title', text: item.title }),
        ]
      : [
          element('span', { text: item.title }),
          icon('fa-plus', 'icon icon--sm'),
        ];

    const toggle = element('button', {
      className: 'accordion__toggle',
      attrs: { id: buttonId, type: 'button', 'aria-expanded': 'false', 'aria-controls': panelId },
      children: toggleChildren,
    });
    const panel = element('div', {
      className: 'accordion__panel',
      attrs: { id: panelId, role: 'region', 'aria-labelledby': buttonId, hidden: '' },
      children: [element('p', { text: item.description })],
    });
    toggle.addEventListener('click', () => {
      const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
      for (const button of host.querySelectorAll('.accordion__toggle[aria-expanded="true"]')) {
        button.setAttribute('aria-expanded', 'false');
        const btnIcon = button.querySelector('.icon');
        if (btnIcon) {
          btnIcon.classList.add('fa-plus');
          btnIcon.classList.remove('fa-minus');
        }
        const other = host.querySelector(`#${button.getAttribute('aria-controls')}`);
        if (other) other.hidden = true;
      }
      toggle.setAttribute('aria-expanded', String(willOpen));
      const activeIcon = toggle.querySelector('.icon');
      if (activeIcon) {
        activeIcon.classList.toggle('fa-plus', !willOpen);
        activeIcon.classList.toggle('fa-minus', willOpen);
      }
      panel.hidden = !willOpen;
    });
    host.append(element('div', { className: 'accordion__item', children: [toggle, panel] }));
  });
}
