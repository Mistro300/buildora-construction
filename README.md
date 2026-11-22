# BUILDORA — Architectural Construction Concept

**BUILDORA** هو موقع Portfolio Concept لشركة مصرية افتراضية للمقاولات والتشطيبات، بواجهة عربية RTL وهوية **Architectural Luxury**. **ليس مشروع عميل حقيقي**: أسماء المشروعات، المواقع، الأرقام، الاقتباسات، الصور المعمارية وبيانات التواصل توضيحية، وليست أدلة على أعمال منفذة أو عروضًا تجارية.

**حالة التسليم — 22 نوفمبر 2026:** تم تجهيز النسخة الثابتة **Stage G / Deployment Candidate** بعد مراجعة ملفات Stage E الفعلية وإعادة تشغيل اختبارات الملفات والـ JSON والـ JS والأصول. **لم يتم النشر على GitHub أو Cloudflare، ولا توجد نتيجة Lighthouse أو رابط HTTPS معتمد بعد.** الاختبارات التي تتطلب فتح localhost داخل Chromium مباشرة محظورة في بيئة التجهيز؛ يُستكمل اختبار المتصفح الحقيقي على جهاز المطور وعلى رابط النشر.

## التقنية والهوية

- HTML5 + CSS3 + Vanilla JavaScript ES Modules + JSON محلي؛ بلا Framework أو Backend أو Build Step في الإنتاج.
- **Zain** لكل النصوص العربية والإنجليزية والأرقام عبر Google Fonts مع Fallback.
- درجات دافئة 60%، كحلي معماري 30%، نحاسي Brass 10%، حواف هندسية 2–8px، **Font Awesome Free 6.7.2** عبر cdnjs للأيقونات.
- نسخة عربية `lang="ar" dir="rtl"`، صور WebP محلية، CSS modular، روابط أصول نسبية لدعم GitHub Pages subpath.

## الصفحات

| المسار | المحتوى |
|---|---|
| `index.html` | الصفحة الرئيسية، الخدمات، نماذج مشاريع، مراحل، دعوة لطلب عرض سعر Demo |
| `services.html` | 6 خدمات، مراحل التنفيذ الخمس و8 FAQs في Accordions |
| `projects.html` | 12 مشروعًا، فلاتر أربع فئات، عداد نتائج، Empty/Reset |
| `project.html?id=project-001` | تفاصيل المشروع، Gallery/Lightbox، Before/After لبعض المشاريع، Related Projects، Unknown ID |
| `about.html` | نبذة وقيم وفريق واقتباسات كلها توضيحية وموسومة Demo |
| `contact.html` | Quote form مع validation، معاينة، تعديل وإنهاء Demo بدون إرسال |

كل صفحة في **جذر المستودع**؛ تفريغ ZIP إلى جذر Repository مطلوب ليبقى `index.html` في الجذر مباشرة. لا تستبدل ملفات المرحلة الجديدة بنسخ Stage B/C/D القديمة.

## التشغيل المحلي

من داخل جذر المشروع:

```bash
python -m http.server 5500
```

على Windows يمكن استخدام `py -m http.server 5500`، ثم زيارة `http://localhost:5500/`. **لا تفتح HTML باستخدام `file://`**؛ قراءة ملفات JSON وES Modules تعتمد على HTTP.

أمثلة للاختبار: `projects.html?category=finishing`، و`project.html?id=project-001` (مقارنة صور)، و`project.html?id=project-002` (دون مقارنة)، و`project.html?id=unknown`، و`contact.html#quote`.

## أهم المجلدات

```text
buildora-construction/
├── index.html, services.html, projects.html, project.html, about.html, contact.html
├── assets/
│   ├── css/               # tokens, base, components, pages, responsive
│   ├── js/                # ES modules: shared, page modules, UI components
│   ├── data/              # projects, services, process-steps, faqs, testimonials, site
│   └── images/            # local WebP concept imagery
├── tests/                 # development-only validation and post-deploy checks
├── docs/                  # architectural decisions, QA, deployment documents
├── favicon.svg
├── robots.txt
├── README.md
├── CASE-STUDY.md
└── .gitignore
```

## البيانات والتفاعلات

- `projects.json`: **12**، `services.json`: **6**، `process-steps.json`: **5**، `faqs.json`: **8**، `testimonials.json`: **4**، `site.json`: بيانات العلامة والاتصال التوضيحي.
- حالات Loading / Empty / Error / Retry وUnknown ID، وفشل تحميل الصور مدعومة.
- أيقونات Font Awesome Free Solid؛ `services[].icon` يحمل مثل `fa-building` ويتحقق منها `assets/js/components/icons.js`.
- Lightbox: Previous/Next وEscape وFocus Restoration. Before/After: `input[type=range]` يدعم Touch/Keyboard. Accordion: `aria-expanded`. نموذج السعر: فحص في المتصفح ومعاينة فقط.
- **لا يتم إرسال الطلبات أو تخزين المدخلات في قاعدة بيانات أو LocalStorage أو SessionStorage.** لا يوجد Backend حقيقي.

## الاختبارات التي شُغّلت

```bash
python tests/validate_static.py
node --test tests/logic.test.mjs
python tests/http_smoke.py
python tests/phase_e_acceptance.py
python tests/interactive_browser_qa.py
python tests/release_audit.py
```

الأوامر الأولى والخامسة كما كانت في Stage E؛ `phase_e_acceptance.py` و`interactive_browser_qa.py` يحتاجان Playwright وChromium وحزم تطوير اختيارية. اختبارات Browser QA تحمّل ملفات الصفحة داخل harness محاكي ولا تثبت HTTP E2E. وثائق النتائج: [`docs/PHASE-E-QA.md`](docs/PHASE-E-QA.md) و[`docs/RELEASE-REPORT.md`](docs/RELEASE-REPORT.md).

## النشر على Cloudflare Pages

المستودع: **`buildora-construction`**، فرع الإنتاج: **`main`**، Framework preset **None**، Build command **فارغ**، Build output directory **`.`**، Root directory **جذر المستودع**. لا تحتاج `npm install` أو `npm run build`.

توجد الخطوات العملية، المتغيرات المطلوب تعيينها، التحقق بعد HTTPS، كيفية التحديث والـ rollback في **[`docs/DEPLOYMENT-CHECKLIST.md`](docs/DEPLOYMENT-CHECKLIST.md)**. استخدم رابط الإنتاج الفعلي بعد النشر مع:

```bash
python tests/verify_live.py https://YOUR-REAL-PAGES-DOMAIN.pages.dev/
```

القيمة في الأمر **مثال توضيحي وليست رابطًا منشورًا**؛ استبدلها بالرابط الحقيقي الذي تُظهره Cloudflare. أداة التحقق تقبل أيضًا رابط GitHub Pages داخل مسار فرعي.

## قبل تحويله إلى موقع عميل أو نشره كبورتفوليو

1. اختر **GitHub username** ورابط GitHub الحقيقي، واستبدل أمثلة بيانات التواصل من `assets/data/site.json` و`contact.html` أو أبقها معلنة Demo؛ لا تُظهر بريد `contact@example.com` كصندوق بريد يعمل.
2. اعتمد صور أعمال أصلية **مرخصة مع مصدرها**، أو واصل التصريح بأن الصور رسومات توضيحية. هذه الحزمة لا تدّعي وجود صور تنفيذ حقيقية.
3. اختر **الدومين النهائي** ثم أضف canonical URLs وOG image URL مطلقًا و`og:url`، وأنشئ `sitemap.xml` بعنوان HTTPS حقيقي؛ لا تنشر Sitemap مليئًا بـ placeholders.
4. عند نقل النظام إلى نشاط حقيقي، صمّم خدمة استقبال طلبات فعلية مع سياسات خصوصية وأمان؛ النموذج الحالي تجريبي ولا يرسل.
5. شغّل اختبارات Browser-over-HTTPS وLighthouse مع توثيق الأرقام الفعلية وتاريخها، ثم علّم بنود الـ Checklist بعد التحقق.

## ملفات المشروع ومصداقيته

- [CASE-STUDY.md](CASE-STUDY.md): دراسة حالة صالحة للبورتفوليو مع بيان حدود المشروع.
- [01-buildora-construction-GUIDE.md](01-buildora-construction-GUIDE.md): مصدر المتطلبات الملزم.
- [docs/DECISION-LOG.md](docs/DECISION-LOG.md): سجل القرارات الهندسية.
- [docs/DEPLOYMENT-CHECKLIST.md](docs/DEPLOYMENT-CHECKLIST.md): نشر وتحديث وفحوص قبول.
- [docs/RELEASE-REPORT.md](docs/RELEASE-REPORT.md): نتائج فحص النسخة الحالية والقيود المتبقية.

**لا توجد روابط Live Demo / GitHub فعلية داخل هذه النسخة.** أضفها إلى README ودراسة الحالة بعد إنشاء Repository والنشر الحقيقي، ولا تخترع قيمًا للعرض.

## تحديث الخطوط والأيقونات — Stage G

- جميع النصوص والواجهات والأرقام تستخدم **Zain** بدل الخطوط الثلاثة السابقة.
- الأيقونات تستخدم **Font Awesome Free 6.7.2 (Solid)** في HTML وJavaScript والبيانات.
- أُزيلت أيقونات SVG Sprite القديمة من الاستخدام ومن الحزمة، بينما `favicon.svg` مستقل كأيقونة علامة المتصفح.
- **مطلوب إنترنت** لتحميل Zain من Google Fonts وFont Awesome من Cloudflare cdnjs. في وضع عدم الاتصال تعمل ملفات HTML/JSON مع خط بديل، لكن الأيقونات الخارجية قد لا تظهر.
- سجل التغييرات والتأكد من صحتها في `docs/STAGE-G-TYPOGRAPHY-ICONS.md`.
