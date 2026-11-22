import { FONT_AWESOME_ICONS } from './components/icons.js';

const DATA_ROOT = 'assets/data/';
const dataFiles = new Set(['projects.json', 'services.json', 'faqs.json', 'process-steps.json', 'testimonials.json', 'site.json']);
const requests = new Map();

async function loadJson(filename, { fresh = false } = {}) {
  if (!dataFiles.has(filename)) throw new TypeError('Unsupported data resource');
  if (fresh) requests.delete(filename);
  if (!requests.has(filename)) {
    const request = fetch(`${DATA_ROOT}${filename}`, { headers: { Accept: 'application/json' } })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        try { return await response.json(); }
        catch { throw new Error('Invalid JSON response'); }
      })
      .catch((error) => {
        requests.delete(filename);
        throw error;
      });
    requests.set(filename, request);
  }
  return requests.get(filename);
}

function assertRecords(records, name, expectedCount, required) {
  if (!Array.isArray(records) || (records.length !== expectedCount && records.length !== 0)) {
    throw new Error(`Invalid ${name} record count`);
  }
  const ids = new Set();
  for (const record of records) {
    if (!record || typeof record !== 'object' || Array.isArray(record) ||
      !required.every((key) => Object.hasOwn(record, key)) ||
      typeof record.id !== 'string' || !record.id || ids.has(record.id)) {
      throw new Error(`Invalid ${name} entry`);
    }
    ids.add(record.id);
  }
  return records;
}

const categories = new Set(['residential', 'commercial', 'finishing', 'construction']);
const iconIds = FONT_AWESOME_ICONS;

function isSafeImagePath(src) {
  return typeof src === 'string' &&
    /^assets\/images\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.webp$/.test(src);
}

function isImageAsset(asset) {
  return asset && isSafeImagePath(asset.src) &&
    typeof asset.alt === 'string' && asset.alt.trim().length > 0 &&
    Number.isInteger(asset.width) && asset.width > 0 &&
    Number.isInteger(asset.height) && asset.height > 0;
}

export async function getProjects(options) {
  const projects = assertRecords(await loadJson('projects.json', options), 'projects', 12,
    ['id', 'slug', 'title', 'category', 'city', 'year', 'areaSqm', 'thumbnail', 'gallery', 'beforeImage', 'afterImage', 'summary', 'scope']);
  const slugs = new Set();
  for (const p of projects) {
    if (!categories.has(p.category) || !p.title || !p.city || !p.summary ||
      !/^project-\d{3}$/.test(p.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || slugs.has(p.slug) ||
      !Number.isInteger(p.year) || p.year < 2000 || p.year > 2100 ||
      typeof p.areaSqm !== 'number' || p.areaSqm <= 0 ||
      !isSafeImagePath(p.thumbnail) || !p.thumbnailAlt?.trim() || !Array.isArray(p.scope) || !p.scope.length ||
      !Array.isArray(p.gallery) || !p.gallery.every(isImageAsset) ||
      Boolean(p.beforeImage) !== Boolean(p.afterImage) ||
      (p.beforeImage && (!isImageAsset(p.beforeImage) || !isImageAsset(p.afterImage)))) {
      throw new Error('Invalid project schema');
    }
    slugs.add(p.slug);
  }
  return projects;
}

export async function getServices(options) {
  const services = assertRecords(await loadJson('services.json', options), 'services', 6,
    ['id', 'title', 'icon', 'summary', 'bullets', 'processSteps']);
  if (services.some((s) => !iconIds.has(s.icon) || !s.title || !s.summary ||
    !Array.isArray(s.bullets) || !s.bullets.length || !Array.isArray(s.processSteps))) {
    throw new Error('Invalid service schema');
  }
  return services;
}

export async function getFaqs(options) {
  const faqs = assertRecords(await loadJson('faqs.json', options), 'faqs', 8, ['id', 'question', 'answer']);
  if (faqs.some((faq) => !faq.question || !faq.answer)) throw new Error('Invalid FAQ schema');
  return faqs;
}

export async function getProcessSteps(options) {
  return assertRecords(await loadJson('process-steps.json', options), 'steps', 5, ['id', 'title', 'description']);
}

export async function getTestimonials(options) {
  const testimonials = assertRecords(await loadJson('testimonials.json', options), 'testimonials', 4, ['id', 'quote', 'attribution', 'isDemo']);
  if (testimonials.some((item) => item.isDemo !== true)) throw new Error('Testimonials must be marked as demos');
  return testimonials;
}

export async function getSite(options) {
  const site = await loadJson('site.json', options);
  if (!site || site.brand !== 'BUILDORA' || typeof site.legalNotice !== 'string' || !site.contact) {
    throw new Error('Invalid site schema');
  }
  return site;
}

export const categoryLabels = Object.freeze({
  residential: 'سكني', commercial: 'تجاري', finishing: 'تشطيب', construction: 'بناء',
});
