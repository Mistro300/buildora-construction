# BUILDORA — Decision Log / سجل القرارات والافتراضات

تاريخ التوثيق: 22 نوفمبر 2026. جميع البنود في العمود «إلزامي» مستندة إلى دليل BUILDORA أو الطلب الحالي. البنود «اقتراح» لا تغيّر المرجع الملزم ولا تعتمد نهائيًا من دون مراجعة.

| الرمز | القرار/القيد | المصدر | الحالة |
|---|---|---|---|
| D-01 | صفحات المشروع الست بأسمائها وروابطها كما في الدليل | دليل / إلزامي | مثبت |
| D-02 | عربي RTL أولًا؛ الإنجليزية لاحقًا فقط | دليل / إلزامي | مثبت |
| D-03 | HTML5 + CSS3 + Vanilla JS ES Modules + JSON محلي، بلا Backend أو Framework | دليل / إلزامي | مثبت |
| D-04 | 12 مشروع، 6 خدمات، 5 مراحل، 8 FAQ، 4 اقتباسات Demo | دليل / إلزامي | مثبت |
| D-05 | فلاتر المشاريع، Lightbox، Before/After، Accordion، Quote Preview | دليل / إلزامي | مثبت |
| D-06 | لوحة 60/30/10، الخطوط الثلاثة، Radius 2–8px، أيقونات Lucide Sprite محلية 1.5 | دليل / إلزامي | مثبت |
| D-07 | المسارات نسبية حتى تعمل GitHub Pages داخل مسار فرعي | دليل / إلزامي | مثبت |
| D-08 | محتوى المشاريع والأسعار والشهادات والفريق Fictional مع وسم Demo | دليل / إلزامي | مثبت |
| A-01 | توزيع 12 مشروعًا بالتساوي على أربع فئات 3×4 | افتراض Demo | قابل للمراجعة |
| A-02 | ستة أسماء خدمات عربية ومطابقة أيقوناتها المقترحة | افتراض محتوى | قابل للمراجعة |
| A-03 | خمس مراحل عامة مرتبطة بخدمات متعددة باستخدام `processSteps` IDs | قرار بيانات | مقترح |
| A-04 | فصل Process Steps وTestimonials وSite Info إلى ثلاثة JSON إضافية | قرار تنظيمي | مقترح |
| A-05 | نموذج السعر يراجع بالمتصفح وينهي Demo دون إرسال، ولا يخزن PII | تفسير أمين للنطاق | مثبت |
| A-06 | أرقام Demo في الموقع مقتصرة على أرقام مستمدة من المحتوى (مثل 12 مشروعا)، ولا تُخترع سنوات خبرة أو فرق عمل حقيقية | نزاهة المحتوى | مقترح |
| A-07 | 4 أزواج Before/After توضيحية ضمن 12 مشروعًا بعد تحقق حقوق الصور | افتراض محتوى | قابل للمراجعة |
| A-08 | القيم الافتراضية لارتفاع Header وأحجام بعض النصوص ومسافات الشبكات قابلة للتحسين البصري | اجتهاد تصميم | قابل للمراجعة |
| A-09 | عدم خلق صفحات منفصلة للأسئلة أو النجاح؛ تبقى الأقسام والحوارات في الصفحات الست | محافظة على Sitemap | مثبت |
| A-10 | محتوى JSON يعرض بحذر عبر textContent وليس HTML خام | أمان الواجهة | مثبت |

## نقاط تُراجع قبل بدء كتابة محتوى المرحلة C

1. اعتماد أسماء الخدمات الست والعناوين الاثني عشر بصفتها Demo، أو استبدالها بأسماء افتراضية أقرب للأسلوب المطلوب.
2. اعتماد قائمة الصور المرخصة فعليًا وعدد الأزواج المناسبة للمقارنة؛ عدم استعمال صور قبل/بعد مضللة.
3. ضبط نطاقات الميزانية Demo وتسميات الحقول وفق نصوص UI، دون تحويل النموذج إلى إرسال حقيقي.
4. تحديد رابط الاستضافة النهائي عند Stage F لتحديث `sitemap.xml` و`robots.txt` وOG metadata.

## Stage status (historical Stage A snapshot)

- Stage A: **وثائق التحليل أُنشئت** — جاهزة للمراجعة، ولم تُختبر واجهات أو وظائف بعد.
- Stages B–F: **لم تبدأ في وقت إنشاء وثائق المرحلة A**؛ راجع تحديثي Stage B وStage C أدناه للحالة الحالية.

## تحديث Stage B — 22 نوفمبر 2026

| الرمز | القرار / الحالة | التبرير |
|---|---|---|
| B-01 | إنشاء Home وCSS وSVG Sprite وHeader/Footer وJS تنقل فقط | الالتزام بالنطاق وعدم إنشاء باقي الصفحات قبل Stage C |
| B-02 | تحويل روابط الصفحات التي لم تنفذ بعد إلى أقسام الصفحة الرئيسية مؤقتًا | منع 404 دون تغيير الـ Sitemap المستقبلي |
| B-03 | أربعة رسوم معمارية أصلية محلية بصيغة WebP | بديل Demo صادق للصور الحقيقية التي لم تعتمد بعد؛ لا Hotlink |
| B-04 | نموذج عرض السعر لا يعمل حاليًا ويشار إلى مرحلته بوضوح | منع ادعاء إرسال بيانات أو وجود Backend |
| B-05 | Header ثابت وتمرير وقائمة موبايل بإدارة تركيز وEscape | تغطية التفاعل المطلوب في المكونات المشتركة |

Stage B: **تم إنشاء ملفات التصميم والـ Home، واختبار تخطيطها في متصفح مع بدائل مضمنة للأصول عند الاختبار**. لا تُعد باقي الصفحات أو وظائف Stage D منفذة.

## تحديث Stage C — 22 نوفمبر 2026

| الرمز | القرار / الحالة | السبب |
|---|---|---|
| C-01 | إنشاء الصفحات الخمس بنفس المسارات المحددة في الدليل؛ تحديث روابط Home وHeader/Footer إليها | اكتمال Sitemap بدون روابط 404 أو تغيير أسماء الصفحات |
| C-02 | اعتماد 12 سجلًا و6 خدمات و5 خطوات و8 أسئلة و4 اقتباسات في Local JSON | التوافق مع Data Contracts ووظائف الصفحات |
| C-03 | 3 مشاريع من كل فئة؛ الأسماء والمدن والمساحات/السنوات كلها Demo | تجربة الفلاتر وعرض بيانات منطقية دون ادعاء أعمال حقيقية |
| C-04 | إنشاء 32 رسمًا معماريًا محليًا WebP للبطاقات والتفاصيل والمقارنات | لا Hotlink ولا صورة مخزون مجهولة الحقوق؛ المقارنات Concept phases وليست واقعًا |
| C-05 | إظهار Comparison على 4 مشاريع فقط وباقي المشروعات بدون Slider | تفعيل خاصية اختيارية بشكل آمن عند توافر الزوجين فقط |
| C-06 | إدارة Loading / Empty / Error / Unknown ID، مع Retry للـ fetch | منع الصفحات الفارغة والإخفاقات الصامتة |
| C-07 | `project.html?id=` مفتاح التفاصيل و`?category=` للفلتر، وحفظ الفلتر في History بلا تخزين شخصي | إمكانية الروابط المباشرة وBack/Forward |
| C-08 | نموذج عرض السعر Local Validation → Preview → Edit / Finish؛ بلا إرسال أو تخزين PII | النزاهة واتساق حدود Static Demo |
| C-09 | نطاقات الميزانية في Quote Form تقريبية وغير ملزمة، مع وسم Demo | لا يوجد Pricing API أو اتفاق تعاقدي |
| C-10 | الحفاظ على الـTokens والـHeader والـFooter الأصليين؛ توسعة pages.css وresponsive.css فقط | احترام Stage B وتجنب إعادة كتابة تصميم معتمد |
| C-11 | وظائف المرحلة D الخمس متوفرة أساسًا في Stage C؛ المرحلة D القادمة للفحص والتثبيت | ترتيب المستخدم يطلب Gallery/BeforeAfter/Quote ضمن هذه الدفعة |

**الحالة:** Stage C نُفذت، واختبرت في بيئة Chromium مضمّنة مع Fetch محاكى؛ يلزم اختبار تشغيل HTTP حقيقي على متصفح العميل قبل اعتماد الجاهزية للإنتاج.


## Stage D — 22 November 2026

- Keep the six existing page names, `assets/data` contracts, colors, three font families, and SVG sprite unchanged.
- Refine only the five required JavaScript interactions; add testable quote validation and pure filter/comparison functions.
- Use native `<dialog>`, `<input type="range">` and `<button>` for keyboard/touch semantics rather than custom pointer gesture emulation.
- Client-side Quote Preview/Edit/Finish **never submits or saves personal data**.
- Add in-memory Chromium regression tests, Node unit tests and real Python HTTP asset smoke tests. Browser-over-HTTP E2E remains for Stage E because local browser navigation is blocked here.

## 2026-11-22 — Stage E review decisions

- Preserve six agreed page paths, Arabic RTL and architectural palette/typography, 25 local SVG symbols, four categories, the five existing interactions and local JSON. No backend or client-side persistence.
- Improve only verified accessibility and mobile-readability shortcomings: visible focus ring on dark surfaces, per-field Quote errors with `aria-describedby`, readable 330–480px statistic layout, corrected thumbnail group semantics and an informative unknown-project link.
- Whitelist local WebP paths in JSON; do not accept path traversal-like assets. Keep data files unmodified.
- Add static generic social SEO tags, with runtime project metadata updates as best effort. Do not fabricate canonical, live hostname, sitemap or absolute social image. Social crawler rendering of query-based project pages is an accepted open constraint pending a new explicitly approved architecture.
- Provide minimal `robots.txt` now, defer `sitemap.xml` until the real production origin is known.
- Treat the environment's blocked browser-to-localhost connection as an unclosed **release verification gate**, not an alleged successful E2E test. Asset HTTP checks and in-memory Chromium checks are separately reported.
- Demo illustrations are clearly labeled; real-photo editorial quality remains subject to later approval. No visual reference was represented as an actual executed project.

## Stage G — Typography / Icon Library Override (2026-11-22)

- **Latest explicit request overrides the old design-system requirement:** use `Zain` across the full website instead of `Space Grotesk`, `Inter`, and `IBM Plex Sans Arabic`.
- Replace Lucide SVG sprite with Font Awesome Free 6.7.2 Solid via cdnjs. Update static HTML, DOM-generated icons, the navigation toggler, and service icon values in JSON together.
- Keep the rest of Stage F structure, content and interactions unchanged.
- External font/CSS dependencies require network access; preserve `system-ui` typography fallback.
- Historical Stage A–F specifications and QA reports describe previous versions; use README.md and STAGE-G-TYPOGRAPHY-ICONS.md as the new source of truth for typography and icons.
