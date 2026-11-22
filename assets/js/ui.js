const MOBILE_BREAKPOINT = 1024;

export function initializeNavigation() {
  const header = document.querySelector('#site-header');
  const toggle = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  const backdrop = document.querySelector('#navigation-backdrop');

  if (!header || !toggle || !nav || !backdrop) return;

  const icon = toggle.querySelector('.icon');
  const links = [...nav.querySelectorAll('a[href]')];
  const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  let previousFocus = null;
  let isOpen = false;

  const updateHeader = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 24);
  };

  const setOpen = (next, { restoreFocus = true } = {}) => {
    if (isOpen === next) return;
    isOpen = next;
    header.classList.toggle('site-header--menu-open', isOpen);
    document.documentElement.classList.toggle('no-scroll', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
    icon?.classList.toggle('fa-bars', !isOpen);
    icon?.classList.toggle('fa-xmark', isOpen);

    if (isOpen) {
      previousFocus = document.activeElement;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isOpen) links[0]?.focus();
        });
      });
    } else if (restoreFocus && previousFocus instanceof HTMLElement) {
      previousFocus.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(!isOpen));
  backdrop.addEventListener('click', () => setOpen(false));

  // Closing on the chosen destination avoids obscuring anchored content.
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) setOpen(false, { restoreFocus: false });
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;

    // Keep keyboard navigation inside the mobile menu while it is visible.
    const focusable = [...links, toggle].filter((element) => element.getClientRects().length);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  mobileQuery.addEventListener('change', ({ matches }) => {
    if (!matches) setOpen(false, { restoreFocus: false });
  });

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}
