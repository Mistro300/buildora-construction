// Quote data is checked in memory only; this module never submits or persists it.
export const budgetLabels = Object.freeze({
  'under-500k': 'أقل من 500 ألف جنيه (Demo)',
  '500k-1m': '500 ألف — مليون جنيه (Demo)',
  '1m-3m': 'مليون — 3 ملايين جنيه (Demo)',
  'over-3m': 'أكثر من 3 ملايين جنيه (Demo)',
  undecided: 'لم أحدد بعد',
});

export const quoteFieldLabels = Object.freeze({
  name: 'الاسم',
  serviceId: 'الخدمة',
  areaSqm: 'المساحة',
  budgetBand: 'الميزانية',
  description: 'وصف المشروع',
});

export function validateQuote(input, services) {
  const values = {
    name: String(input.name ?? '').trim(),
    serviceId: String(input.serviceId ?? ''),
    areaSqm: Number(input.areaSqm),
    budgetBand: String(input.budgetBand ?? ''),
    description: String(input.description ?? '').trim(),
  };
  const errors = {};

  if (values.name.length < 2 || values.name.length > 100) {
    errors.name = 'أدخل اسمًا من حرفين إلى 100 حرف.';
  }
  if (!services.some((service) => service.id === values.serviceId)) {
    errors.serviceId = 'اختر خدمة من القائمة المتاحة.';
  }
  if (String(input.areaSqm ?? '').trim() === '' || !Number.isFinite(values.areaSqm) ||
      values.areaSqm < 1 || values.areaSqm > 100000) {
    errors.areaSqm = 'أدخل مساحة رقمية بين 1 و100000 متر مربع.';
  }
  if (!Object.hasOwn(budgetLabels, values.budgetBand)) {
    errors.budgetBand = 'اختر نطاق ميزانية من القائمة.';
  }
  if (values.description.length < 15 || values.description.length > 2000) {
    errors.description = 'اكتب وصفًا من 15 إلى 2000 حرف.';
  }

  return { valid: Object.keys(errors).length === 0, values, errors };
}
