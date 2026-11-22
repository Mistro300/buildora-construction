import { initializeNavigation } from './ui.js';

// Keep the shared navigation independent of page-specific data requests.
initializeNavigation();

const page = document.body.dataset.page;
const pageModules = {
  projects: () => import('./pages/projects.js').then(({ initializeProjects }) => initializeProjects()),
  project: () => import('./pages/project.js').then(({ initializeProject }) => initializeProject()),
  services: () => import('./pages/services.js').then(({ initializeServices }) => initializeServices()),
  about: () => import('./pages/about.js').then(({ initializeAbout }) => initializeAbout()),
  contact: () => import('./pages/contact.js').then(({ initializeContact }) => initializeContact()),
};

if (Object.hasOwn(pageModules, page)) {
  pageModules[page]().catch((error) => {
    // Individual screens own their own Error UI; report unexpected module failures.
    console.error('Unable to initialize BUILDORA page:', error);
  });
}
