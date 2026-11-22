import { getServices, getProcessSteps, getFaqs } from '../data.js';
import { element, icon, setStatus } from '../components/dom.js';
import { renderAccordion } from '../components/accordion.js';

export async function initializeServices() {
  const servicesHost = document.getElementById('services-list');
  const processHost = document.getElementById('process-accordion');
  const faqHost = document.getElementById('faq-accordion');
  if (!servicesHost || !processHost || !faqHost) return;
  const loadServices = async (fresh = false) => {
    setStatus(servicesHost, 'loading', 'جارٍ تحميل الخدمات...');
    try {
      const services = await getServices({ fresh });
      if (!services.length) { setStatus(servicesHost, 'empty', 'لا توجد خدمات مسجلة حاليًا.'); return; }
      servicesHost.replaceChildren(...services.map((service, index) => {
        const item = element('article', { className: 'service-detail' });
        const iconBox = element('span', { className: 'service-detail__icon', children: [icon(service.icon, 'icon icon--lg')] });
        const heading = element('div', { className: 'service-detail__heading', children: [
          element('span', { className: 'service-detail__number', text: String(index + 1).padStart(2, '0') }),
          iconBox,
          element('h2', { text: service.title }),
        ] });
        const bullets = element('ul', { className: 'check-list', children: service.bullets.map((text) => element('li', { text })) });
        const contact = element('a', { className: 'button button--text', attrs: { href: `contact.html?service=${encodeURIComponent(service.id)}#quote` }, children: [
          document.createTextNode('اطلب تصورًا لهذه الخدمة'), icon('fa-arrow-left'),
        ] });
        item.append(heading, element('p', { text: service.summary }), bullets, contact);
        return item;
      }));
    } catch {
      setStatus(servicesHost, 'error', 'تعذّر عرض الخدمات. يرجى إعادة المحاولة.', () => loadServices(true));
    }
  };
  const loadProcess = async (fresh = false) => {
    setStatus(processHost, 'loading', 'جارٍ تحميل مراحل العمل...');
    try {
      const steps = await getProcessSteps({ fresh });
      if (!steps.length) { setStatus(processHost, 'empty', 'لا توجد مراحل عمل متاحة حاليًا.'); return; }
      renderAccordion(processHost, steps.map((step, i) => ({ title: `${String(i + 1).padStart(2, '0')} / ${step.title}`, description: step.description })), 'process-panel');
    } catch { setStatus(processHost, 'error', 'تعذّر تحميل المراحل.', () => loadProcess(true)); }
  };
  const loadFaqs = async (fresh = false) => {
    setStatus(faqHost, 'loading', 'جارٍ تحميل الأسئلة الشائعة...');
    try {
      const faqs = await getFaqs({ fresh });
      if (!faqs.length) { setStatus(faqHost, 'empty', 'لا توجد أسئلة متاحة حاليًا.'); return; }
      renderAccordion(faqHost, faqs.map((faq) => ({ title: faq.question, description: faq.answer })), 'faq-panel');
    } catch { setStatus(faqHost, 'error', 'تعذّر تحميل الأسئلة الشائعة.', () => loadFaqs(true)); }
  };
  await Promise.all([loadServices(), loadProcess(), loadFaqs()]);
}
