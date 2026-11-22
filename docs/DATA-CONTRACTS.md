# BUILDORA — JSON Data Contracts (Stage A)

الملفات الفعلية للبيانات تُنشأ في المرحلة C. الأمثلة أدناه **نماذج تعاقدية فقط** ولا تعني وجود مشاريع أو عملاء حقيقيين. الحفاظ على أسماء حقول الدليل الأساسية إلزامي.

## قواعد مشتركة

- كل ملف JSON إما `Array` للسجلات المتكررة أو `Object` موثق للبيانات العامة؛ لا نصوص تعليق داخل JSON.
- `id`: فريد، ثابت، `string`، لا يعاد تدويره. `slug`: فريد من أحرف إنجليزية صغيرة وواصلات، مخصص للعرض/التوسع؛ رابط المشروع المعتمد حاليًا يستخدم `id`.
- `category`: واحدة فقط من `residential | commercial | finishing | construction`. «الكل» حالة فلتر UI وليست قيمة في البيانات.
- `year`: عدد صحيح من 4 أرقام؛ `areaSqm`: عدد موجب؛ `scope`: مصفوفة strings غير فارغة.
- `price` عند الحاجة مستقبلًا رقم وليس string منسقًا. لا نحتاج سعرًا تشغيليًا أو API لإتمام Demo.
- مسارات الصور **نسبية محلية** ومحددة بدقة، والأبعاد أعداد صحيحة. `alt` مفيد ومخصص لكل صورة. `beforeImage/afterImage` يقبلان `null` معًا أو قيمتين متاحتين؛ لا سلايدر بصورة واحدة.
- حقل `isDemo: true` في الاقتباسات والمقاييس، مع رسالة توضيحية ظاهرة في UI.
- عند فشل `fetch` أو JSON parsing: `Error` مع إجراء Retry. عند `[]`: `Empty`. أثناء القراءة: `Loading`. عند ID غير معروف: `Not Found`.

## 1. `assets/data/projects.json` — exactly 12 records

الحقول المطلوبة وفق الدليل: `id, slug, title, category, city, year, areaSqm, thumbnail, gallery[], beforeImage, afterImage, summary, scope[]`.

**الأنواع المعتمدة:**

| الحقل | النوع | وصف/تحقق |
|---|---|---|
| `id` | `string` | مثل `project-001`؛ مفتاح الرابط `?id=` |
| `slug` | `string` | kebab-case، فريد |
| `title` | `string` | اسم عربي فريد وغير عام |
| `category` | `enum string` | واحدة من الأربع |
| `city` | `string` | اسم عربي للمدينة/المنطقة؛ مثال «القاهرة الجديدة» |
| `year` | `integer` | 4 digits؛ Demo |
| `areaSqm` | `number` | أكبر من صفر؛ `220` تعني `220 m²` |
| `thumbnail` | `string` | مسار صورة محلية نسبي |
| `thumbnailAlt` | `string` (إضافي) | وصف الصورة المصغرة |
| `gallery` | `ImageAsset[]` | صور فعلية، يمكن أن تكون فارغة ويظهر Placeholder |
| `beforeImage` | `ImageAsset | null` | اختياري منطقيًا |
| `afterImage` | `ImageAsset | null` | يجب أن تتوفر مع before للمقارنة |
| `summary` | `string` | ملخص واضح غير مكرر |
| `scope` | `string[]` | الأعمال المنفذة في السيناريو |
| `challenges` | `string[]` (إضافي) | لدعم قسم تحديات المشروع |
| `solutions` | `string[]` (إضافي) | لدعم قسم الحلول |
| `featured` | `boolean` (إضافي) | اختيار عناصر Home |

**ImageAsset** = `{ "src": string, "alt": string, "width": integer, "height": integer }`، والأبعاد أكبر من صفر.

**مثال واحد — Demo:**

```json
[
  {
    "id": "project-001",
    "slug": "new-cairo-villa-renovation",
    "title": "تجديد فيلا سكنية بالقاهرة الجديدة",
    "category": "residential",
    "city": "القاهرة الجديدة",
    "year": 2025,
    "areaSqm": 220,
    "thumbnail": "assets/images/projects/project-001-cover.webp",
    "thumbnailAlt": "واجهة فيلا سكنية معاصرة بعد أعمال التجديد - صورة توضيحية",
    "gallery": [
      {
        "src": "assets/images/projects/project-001-gallery-01.webp",
        "alt": "منطقة المعيشة في الفيلا - صورة توضيحية",
        "width": 1200,
        "height": 900
      }
    ],
    "beforeImage": null,
    "afterImage": null,
    "summary": "تصور تجريبي لتجديد فيلا مع إعادة توزيع المساحات وتحسين المعالجات المادية والإضاءة.",
    "scope": ["إعادة توزيع الفراغات", "أعمال تشطيب", "تنسيق الإضاءة"],
    "challenges": ["تحقيق حركة أكثر سلاسة بين المساحات"],
    "solutions": ["اقتراح مخطط مفتوح لمنطقة الاستقبال"],
    "featured": true
  }
]
```

هذا المثال ليس العدد النهائي المطلوب؛ عند إنشاء الملف الفعلي تُضاف **12** سجلاً فريدًا.

### Demo project inventory المقترح (افتراض محتوى قابل للمراجعة)

| ID | عنوان افتراضي | فئة | مدينة افتراضية |
|---|---|---|---|
| project-001 | تجديد فيلا سكنية بالقاهرة الجديدة | residential | القاهرة الجديدة |
| project-002 | تشطيب شقة معاصرة | residential | الشيخ زايد |
| project-003 | تطوير مسكن عائلي | residential | مدينة نصر |
| project-004 | تصميم وتنفيذ مكتب إداري | commercial | القاهرة الجديدة |
| project-005 | تجهيز معرض تجاري | commercial | السادس من أكتوبر |
| project-006 | إعادة تأهيل مساحة عمل | commercial | المعادي |
| project-007 | تشطيبات داخلية لوحدة سكنية | finishing | العبور |
| project-008 | أعمال تشطيب لمساحة استقبال | finishing | مصر الجديدة |
| project-009 | تشطيبات متجر بمفهوم بسيط | finishing | التجمع الخامس |
| project-010 | أعمال هيكل خرساني لفيلا | construction | الشروق |
| project-011 | تنفيذ مبنى خدمي صغير | construction | بدر |
| project-012 | أعمال إنشاء وتوسعة | construction | السادس من أكتوبر |

التوزيع 3 لكل فئة **قرار Demo مقترح** لضمان اختبار الفلاتر، وليس شرطًا عدديًا واردًا في الدليل. لا تمثل هذه المشروعات أعمالًا حقيقية.

## 2. `assets/data/services.json` — exactly 6 records

الحقول الإلزامية: `id, title, icon, summary, bullets[], processSteps[]`.

| حقل | النوع | قواعد |
|---|---|---|
| `id` | `string` | `service-001..006` |
| `title` | `string` | اسم خدمة عربي |
| `icon` | `string` | معرف Sprite مثل `icon-building`، يجب أن يوجد حرفيًا |
| `summary` | `string` | مختصر لا يتكرر |
| `bullets` | `string[]` | نطاق الخدمة |
| `processSteps` | `string[]` | مصفوفة معرفات مرجعية من `process-steps.json`؛ لا تكرار في كل خدمة |

**مثال:**

```json
[
  {
    "id": "service-001",
    "title": "الأعمال الإنشائية",
    "icon": "icon-building",
    "summary": "تصور لخدمات تنفيذ الأعمال الإنشائية من التحضير إلى مراجعة التسليم.",
    "bullets": ["مراجعة المتطلبات", "تنسيق مراحل التنفيذ", "متابعة الجودة"],
    "processSteps": ["step-01", "step-02", "step-03", "step-04", "step-05"]
  }
]
```

**ستة أسماء للخدمات كمحتوى Demo مقترح وليست تسميات مفروضة من الدليل:** الأعمال الإنشائية `icon-building`، إدارة مواقع التنفيذ `icon-hard-hat`، التشطيبات الداخلية `icon-paintbrush`، التصميم الهندسي `icon-ruler`، أعمال الواجهات `icon-layers`، إدارة الجودة والتسليم `icon-clipboard-check`.

## 3. `assets/data/faqs.json` — exactly 8 records

```json
[
  {
    "id": "faq-001",
    "question": "كيف تبدأ مناقشة نطاق المشروع؟",
    "answer": "في هذا العرض التجريبي يمكنك مراجعة الخدمات والأعمال ثم معاينة نموذج طلب سعر دون إرسال فعلي."
  }
]
```

يُشترط جواب نصي مفيد لكل سؤال وعدم ادعاء أسعار أو مواعيد تعاقد حقيقية.

## 4. `assets/data/process-steps.json` — exactly 5 records (ملف إضافي تنظيمي)

```json
[
  { "id": "step-01", "title": "فهم الاحتياج", "description": "تحديد نطاق المشروع وأهدافه." },
  { "id": "step-02", "title": "المعاينة والتخطيط", "description": "إعداد تصور للأعمال والمساحات." },
  { "id": "step-03", "title": "التصميم والتحضير", "description": "اعتماد اختيارات التنفيذ والمواد في السيناريو." },
  { "id": "step-04", "title": "التنفيذ والمتابعة", "description": "استعراض أسلوب متابعة الجودة الافتراضي." },
  { "id": "step-05", "title": "المراجعة والتسليم", "description": "عرض خطوات فحص المخرجات قبل التسليم." }
]
```

## 5. `assets/data/testimonials.json` — exactly 4 records (ملف إضافي تنظيمي)

```json
[
  {
    "id": "testimonial-001",
    "quote": "صياغة تخيلية توضح شكل تجربة العميل المتوقعة دون نسبتها لشخص حقيقي.",
    "attribution": "عميل افتراضي",
    "isDemo": true
  }
]
```

يظهر نص «آراء توضيحية غير موثقة — Demo» قريبًا من القسم. لا صور أو أسماء أشخاص حقيقيين ولا تقييمات رقمية مدعاة.

## 6. `assets/data/site.json` — Object (ملف إضافي تنظيمي)

```json
{
  "brand": "BUILDORA",
  "legalNotice": "مشروع تصميم افتراضي — Demo. لا تمثل المشاريع أو بيانات التواصل جهة حقيقية.",
  "locale": "ar-EG",
  "direction": "rtl",
  "contact": {
    "displayEmail": "contact@example.com",
    "displayPhone": "غير متاح في النسخة التجريبية",
    "addressLabel": "مصر — بيانات توضيحية"
  },
  "stats": [
    { "id": "stat-01", "label": "مشروعات معروضة", "value": 12, "isDemo": true }
  ]
}
```

بريد `example.com` مخصص للأمثلة ولا يوظف كرابط إرسال مضمون؛ يمكن عرض نسخة عامة «وسائل التواصل غير مفعلة في Demo» بدل روابط بريد/هاتف غير حقيقية. لا تستخدم أرقام جوال تبدو حقيقية.

## 7. نموذج حالة Quote Form — state في الذاكرة وليس ملفًا أو إرسالًا

| الحقل | النوع | تحقق مطلوب |
|---|---|---|
| `name` | `string` | غير فارغ، حد أقصى معقول مثل 100 حرف (افتراض) |
| `serviceId` | `string` | يطابق `services[].id` |
| `areaSqm` | `number` | > 0، إذا أدخل؛ تحديد الإلزامية بمرحلة التنفيذ |
| `budgetBand` | `enum string` | نطاقات Demo لا تمثل عرض سعر؛ خيارات تحدد قبل بناء Form |
| `description` | `string` | نص مفهوم مع حد أقصى مثل 2000 حرف (افتراض) |

مراحل واجهة النموذج: `editing -> invalid (if needed) -> preview -> demo-complete`. لا تخزين PII، ولا POST، ولا `mailto:` يوهم بإرسال تلقائي. أزرار «تعديل البيانات» و«إنهاء المعاينة» واضحة.

## 8. Data validation / cross-reference checklist

- [ ] `projects.length === 12`؛ IDs/slugs فريدة، كل category مسموحة، gallery صور محلية صحيحة.
- [ ] `services.length === 6`؛ أي `icon` من قائمة Sprite المحددة.
- [ ] `faqs.length === 8`; `processSteps.length === 5`; `testimonials.length === 4`.
- [ ] كل مرجع `processSteps` موجود؛ كل `serviceId` في Quote Form صحيح.
- [ ] `.gallery` قد يكون `[]`؛ يظهر Empty/placeholder بلا crash.
- [ ] `<project.html?id=unknown>` يُظهر Not Found لا صفحة بيضاء.
- [ ] JSON parsing/error handling وEmpty/Retry ظاهر.
- [ ] نصوص من JSON تمر عبر `textContent` أو DOM API آمنة؛ لا إدراج URL parameter خام في HTML.
