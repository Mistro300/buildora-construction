import { getTestimonials } from '../data.js';
import { element, setStatus } from '../components/dom.js';

export async function initializeAbout() {
  const host = document.getElementById('testimonial-list');
  if (!host) return;
  const load = async (fresh = false) => {
    setStatus(host, 'loading', 'جارٍ تحميل الاقتباسات التوضيحية...');
    try {
      const quotes = await getTestimonials({ fresh });
      if (!quotes.length) { setStatus(host, 'empty', 'لا توجد اقتباسات توضيحية متاحة حاليًا.'); return; }
      host.replaceChildren(...quotes.map((quote, i) => element('blockquote', { className: 'quote-card', children: [
        element('span', { className: 'quote-card__number', text: String(i + 1).padStart(2, '0') }),
        element('p', { text: `«${quote.quote}»` }),
        element('footer', { text: `${quote.attribution} — Demo غير موثق` }),
      ] })));
    } catch { setStatus(host, 'error', 'تعذّر تحميل الأمثلة التوضيحية.', () => load(true)); }
  };
  await load();
}
