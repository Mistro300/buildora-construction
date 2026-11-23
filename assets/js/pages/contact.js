import { getServices } from '../data.js';
import { element, setStatus } from '../components/dom.js';
import { budgetLabels, quoteFieldLabels, validateQuote } from '../components/quote-validation.js';

export async function initializeContact() {
  const status = document.getElementById('quote-load-status');
  const wrapper = document.getElementById('quote-form-wrapper');
  const form = document.getElementById('quote-form');
  const preview = document.getElementById('quote-preview');
  const completed = document.getElementById('quote-completed');
  const errors = document.getElementById('quote-error');
  const select = document.getElementById('quote-service');
  const review = document.getElementById('quote-review-list');
  if (![status, wrapper, form, preview, completed, errors, select, review].every(Boolean)) return;

  const fields = Object.fromEntries(Object.keys(quoteFieldLabels).map((name) =>
    [name, form.elements.namedItem(name)]));
  const requestedService = new URLSearchParams(location.search).get('service');
  let services = [];

  // Associate each validation message (and existing hint) with its input.
  const fieldErrors = Object.fromEntries(Object.entries(fields).map(([name, field]) => {
    const container = field.closest('.form-field');
    const hint = container?.querySelector('.field-hint');
    if (hint && !hint.id) hint.id = `quote-${name}-hint`;
    const error = element('span', {
      className: 'field-error',
      attrs: { id: `quote-${name}-error`, hidden: '' },
    });
    container?.append(error);
    field.setAttribute('aria-describedby', [hint?.id, error.id].filter(Boolean).join(' '));
    return [name, error];
  }));

  const clearFieldError = (field) => {
    field.setCustomValidity('');
    field.removeAttribute('aria-invalid');
    const error = fieldErrors[field.name];
    if (error) { error.hidden = true; error.textContent = ''; }
    errors.hidden = true;
    errors.textContent = '';
  };

  const showStep = (step) => {
    wrapper.hidden = step !== 'editing';
    preview.hidden = step !== 'preview';
    completed.hidden = step !== 'completed';
    const focusTarget = {
      editing: fields.name,
      preview: document.getElementById('quote-preview-title'),
      completed: document.getElementById('quote-completed-title'),
    }[step];
    focusTarget?.focus();
  };

  const clearValidation = () => {
    errors.hidden = true;
    errors.textContent = '';
    Object.values(fields).forEach(clearFieldError);
  };

  // Inline validity state is cleared as soon as the user modifies a field.
  form.addEventListener('input', (event) => {
    if (!Object.values(fields).includes(event.target)) return;
    clearFieldError(event.target);
  });
  form.addEventListener('change', (event) => {
    if (!Object.values(fields).includes(event.target)) return;
    clearFieldError(event.target);
  });

  const load = async (fresh = false) => {
    wrapper.hidden = true;
    setStatus(status, 'loading', 'جارٍ تجهيز الخدمات المتاحة للمعاينة...');
    try {
      services = await getServices({ fresh });
      if (!services.length) {
        setStatus(status, 'empty', 'لا توجد خدمات يمكن اختيارها حاليًا.');
        return;
      }
      select.replaceChildren(
        element('option', { text: 'اختر الخدمة', attrs: { value: '' } }),
        ...services.map((service) => element('option', {
          text: service.title, attrs: { value: service.id },
        })),
      );
      if (services.some((service) => service.id === requestedService)) select.value = requestedService;
      clearValidation();
      status.replaceChildren();
      wrapper.hidden = false;
    } catch {
      setStatus(status, 'error', 'تعذّر تحميل قائمة الخدمات. أعد المحاولة.', () => load(true));
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearValidation();
    const { valid, values, errors: problems } = validateQuote({
      name: fields.name.value,
      serviceId: fields.serviceId.value,
      areaSqm: fields.areaSqm.value,
      budgetBand: fields.budgetBand.value,
      description: fields.description.value,
    }, services);

    if (!valid || !form.checkValidity()) {
      const invalidNames = Object.keys(problems);
      for (const name of invalidNames) {
        fields[name].setCustomValidity(problems[name]);
        fields[name].setAttribute('aria-invalid', 'true');
        fieldErrors[name].textContent = problems[name];
        fieldErrors[name].hidden = false;
      }
      errors.textContent = `يرجى مراجعة: ${invalidNames.map((name) => quoteFieldLabels[name]).join('، ')}.`;
      errors.hidden = false;
      form.reportValidity();
      if (invalidNames.length) fields[invalidNames[0]].focus();
      return;
    }

    const serviceTitle = services.find((service) => service.id === values.serviceId).title;
    const phoneValue = String(form.elements.namedItem('phone')?.value ?? '').trim();
    const rows = [
      ['الاسم', values.name],
      ...(phoneValue ? [['رقم الهاتف (توضيحي)', phoneValue]] : []),
      ['الخدمة', serviceTitle],
      ['المساحة', `${values.areaSqm} m²`],
      ['الميزانية', budgetLabels[values.budgetBand]],
      ['وصف المشروع', values.description],
    ];
    review.replaceChildren(...rows.map(([label, value]) => element('div', {
      className: 'quote-review-list__row',
      children: [element('dt', { text: label }), element('dd', { text: value })],
    })));
    showStep('preview');
  });

  document.getElementById('quote-edit').addEventListener('click', () => showStep('editing'));
  document.getElementById('quote-finish').addEventListener('click', () => {
    form.reset();
    clearValidation();
    review.replaceChildren();
    showStep('completed');
  });
  document.getElementById('quote-restart').addEventListener('click', () => {
    form.reset();
    clearValidation();
    if (services.some((service) => service.id === requestedService)) select.value = requestedService;
    showStep('editing');
  });
  await load();
}
