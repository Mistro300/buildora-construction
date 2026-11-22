import { getProjects, categoryLabels } from '../data.js';
import { createProjectCard, setStatus } from '../components/dom.js';

// Unknown categories intentionally return no results instead of silently changing the filter.
export function filterProjects(projects, category) {
  return category === 'all' ? [...projects] : projects.filter((project) => project.category === category);
}

export async function initializeProjects() {
  const grid = document.getElementById('projects-grid');
  const filters = document.getElementById('project-filters');
  const count = document.getElementById('projects-count');
  if (!grid || !filters || !count) return;

  let projects = [];
  let selected = new URLSearchParams(location.search).get('category') || 'all';

  const render = () => {
    const filtered = filterProjects(projects, selected);
    count.textContent = `${filtered.length} من أصل ${projects.length} مشروعًا توضيحيًا`;
    for (const button of filters.querySelectorAll('button[data-category]')) {
      const active = button.dataset.category === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    if (!filtered.length) {
      setStatus(grid, 'empty', 'لا توجد مشروعات ضمن هذا التصنيف. يمكنك عرض جميع المشروعات.');
      const reset = document.createElement('button');
      reset.type = 'button';
      reset.className = 'button button--brass';
      reset.textContent = 'عرض كل المشاريع';
      reset.addEventListener('click', () => choose('all'));
      grid.querySelector('.state-message')?.append(reset);
      return;
    }
    grid.replaceChildren(...filtered.map((project) => createProjectCard(project, categoryLabels[project.category])));
  };

  const choose = (category, updateUrl = true) => {
    if (selected === category && !updateUrl) { render(); return; }
    selected = category;
    if (updateUrl) {
      const url = new URL(location.href);
      if (category === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', category);
      if (url.href !== location.href) history.pushState({}, '', url);
    }
    render();
  };

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-category]');
    if (button && filters.contains(button)) choose(button.dataset.category);
  });
  addEventListener('popstate', () => {
    choose(new URLSearchParams(location.search).get('category') || 'all', false);
  });

  const load = async (fresh = false) => {
    setStatus(grid, 'loading', 'جارٍ تحميل المشاريع التوضيحية...');
    try {
      projects = await getProjects({ fresh });
      render();
    } catch {
      count.textContent = 'تعذّر تحميل البيانات';
      setStatus(grid, 'error', 'تعذّر تحميل ملف المشاريع. تحقق من الاتصال وأعد المحاولة.', () => load(true));
    }
  };
  await load();
}
