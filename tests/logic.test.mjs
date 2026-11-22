import test from 'node:test';
import assert from 'node:assert/strict';
import { validateQuote } from '../assets/js/components/quote-validation.js';
import { clampComparisonValue } from '../assets/js/components/comparison.js';
import { filterProjects } from '../assets/js/pages/projects.js';

const services = [{ id: 'service-001', title: 'Service' }];
const validDraft = {
  name: 'عميل تجريبي', serviceId: 'service-001', areaSqm: '220',
  budgetBand: 'undecided', description: 'وصف تفصيلي لتجربة نموذج التسعير فقط.',
};

test('valid demo quote is normalized, never sent', () => {
  const result = validateQuote(validDraft, services);
  assert.equal(result.valid, true);
  assert.equal(result.values.areaSqm, 220);
  assert.equal(result.values.name, validDraft.name);
});

test('rejects blank, invalid and unavailable quote values', () => {
  const bad = validateQuote({
    name: ' ', serviceId: 'unknown', areaSqm: '', budgetBand: 'fake', description: 'short',
  }, services);
  assert.equal(bad.valid, false);
  assert.deepEqual(Object.keys(bad.errors), ['name', 'serviceId', 'areaSqm', 'budgetBand', 'description']);
});

test('rejects non-finite, negative and out-of-range area', () => {
  for (const areaSqm of ['1e309', '-1', '0', '100001', 'not-a-number']) {
    assert.equal(validateQuote({ ...validDraft, areaSqm }, services).valid, false);
  }
  assert.equal(validateQuote({ ...validDraft, areaSqm: '1' }, services).valid, true);
  assert.equal(validateQuote({ ...validDraft, areaSqm: '100000' }, services).valid, true);
});

test('trims field lengths and validates title/description boundaries', () => {
  assert.equal(validateQuote({ ...validDraft, name: ' A ' }, services).valid, false);
  assert.equal(validateQuote({ ...validDraft, description: ' 123456789012345 ' }, services).valid, true);
  assert.equal(validateQuote({ ...validDraft, description: 'a'.repeat(2001) }, services).valid, false);
});

test('filtering is deterministic without mutating original projects', () => {
  const records = [{ id: '1', category: 'residential' }, { id: '2', category: 'commercial' }];
  assert.deepEqual(filterProjects(records, 'residential').map((item) => item.id), ['1']);
  assert.deepEqual(filterProjects(records, 'not-a-category'), []);
  assert.notEqual(filterProjects(records, 'all'), records);
  assert.equal(records.length, 2);
});

test('comparison value stays within 0–100 with invalid fallback at 50', () => {
  assert.equal(clampComparisonValue(-23), 0);
  assert.equal(clampComparisonValue(133), 100);
  assert.equal(clampComparisonValue('bad'), 50);
  assert.equal(clampComparisonValue(44), 44);
});
