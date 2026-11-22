import { getProjects, categoryLabels } from '../data.js';
import { element, icon, setStatus, createProjectCard } from '../components/dom.js';
import { createGallery } from '../components/gallery.js';
import { createComparison } from '../components/comparison.js';

function list(target, values) {
  target.replaceChildren(...values.map((value) => element('li', { text: value })));
}

export async function initializeProject() {
  const root = document.getElementById('project-detail');
  if (!root) return;
  const heading = document.getElementById('project-title');
  const lead = document.getElementById('project-summary');
  const main = document.getElementById('project-content');
  const gallery = document.getElementById('project-gallery');
  const compareSection = document.getElementById('comparison-section');
  const comparison = document.getElementById('project-comparison');
  const related = document.getElementById('related-projects');
  const id = new URLSearchParams(location.search).get('id');

  const updateSeo = (title, description) => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  };

  const load = async (fresh = false) => {
    setStatus(root, 'loading', 'جارٍ تحميل تفاصيل المشروع...');
    main.hidden = true;
    try {
      const projects = await getProjects({ fresh });
      const project = projects.find((item) => item.id === id);
      if (!project) {
        heading.textContent = 'المشروع غير موجود';
        lead.textContent = 'لم نعثر على مشروع بهذا المعرّف. يمكنك الرجوع إلى معرض الأعمال.';
        updateSeo('المشروع غير موجود | BUILDORA', 'المشروع المطلوب غير موجود في معرض BUILDORA التوضيحي.');
        setStatus(root, 'empty', 'المعرّف غير معروف أو لم يتم تحديد مشروع.');
        root.querySelector('.state-message')?.append(element('a', {
          className: 'button button--outline-dark', text: 'العودة إلى المشاريع',
          attrs: { href: 'projects.html' },
        }));
        return;
      }
      root.replaceChildren();
      main.hidden = false;
      heading.textContent = project.title;
      lead.textContent = project.summary;
      updateSeo(`${project.title} | BUILDORA`, `${project.summary} مشروع معماري توضيحي من BUILDORA.`);
      document.getElementById('detail-category').textContent = categoryLabels[project.category];
      document.getElementById('detail-city').textContent = project.city;
      document.getElementById('detail-year').textContent = String(project.year);
      document.getElementById('detail-area').textContent = `${project.areaSqm} m²`;
      document.getElementById('detail-category-link').href = `projects.html?category=${project.category}`;
      list(document.getElementById('project-scope'), project.scope);
      list(document.getElementById('project-challenges'), project.challenges || []);
      list(document.getElementById('project-solutions'), project.solutions || []);
      createGallery(gallery, project.gallery, project.title);
      if (project.beforeImage && project.afterImage) {
        compareSection.hidden = false;
        createComparison(comparison, project.beforeImage, project.afterImage);
      } else {
        compareSection.hidden = true;
        comparison.replaceChildren();
      }
      const suggestions = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 2);
      related.replaceChildren(...suggestions.map((item) => createProjectCard(item, categoryLabels[item.category])));
      const quoteLink = document.getElementById('detail-quote-link');
      quoteLink.href = `contact.html?project=${encodeURIComponent(project.id)}#quote`;
    } catch {
      heading.textContent = 'تفاصيل المشروع';
      lead.textContent = 'المشاريع التالية أمثلة تصميمية وليست أعمالًا منفذة.';
      updateSeo('تعذّر تحميل المشروع | BUILDORA', 'تعذّر تحميل بيانات المشروع التوضيحي من BUILDORA.');
      setStatus(root, 'error', 'تعذّر تحميل بيانات المشروع. تحقق من الاتصال وحاول مجددًا.', () => load(true));
    }
  };
  await load();
}
