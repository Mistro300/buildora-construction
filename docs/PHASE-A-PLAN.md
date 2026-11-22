# BUILDORA — المرحلة A: التحليل والتخطيط المعماري

**المرجع:** دليل BUILDORA المرفق بتاريخ 18 نوفمبر 2026.  
**الحالة:** مرحلة تخطيط قابلة للمراجعة؛ ليست تطبيقًا للموقع.  
**قاعدة المصادقية:** كل بيانات الأعمال والعملاء والفريق والمقاييس والاقتباسات افتراضية (Demo).

## 1. Executive Brief

BUILDORA مشروع Portfolio Concept لموقع شركة مصرية افتراضية تعمل في المقاولات والتشطيبات، يستهدف ملاك الوحدات والفلل والمطورين وأصحاب الأنشطة التجارية. مهمته إظهار جودة التنفيذ وتفاصيل المشاريع عبر صور معمارية قوية، مع 12 مشروعًا قابلًا للفلترة وصفحات تفاصيل ومقارنة قبل/بعد، وتوجيه الزائر إلى نموذج طلب عرض سعر يصل إلى **مرحلة مراجعة محلية فقط**، دون حفظ أو إرسال فعلي. تتقدم العربية RTL التنفيذ، مع بنية تسمح بالإنجليزية لاحقًا. الأسلوب بصريًا Architectural Luxury: أسطح دافئة، أزرق بحري هندسي، ونحاس محدود. جميع الصفحات والأصول تعمل باستضافة Static وبمسارات نسبية.

### أهداف واضحة وقابلة للتحقق

- استعراض 12 مشروعًا بتفاصيلها، وتمكين فلتر للفئات الأربع مع عداد نتائج.
- عرض 6 خدمات، 5 مراحل عمل، 8 FAQ، و4 شهادات تخيلية مع وسم صريح.
- تمكين مسارات تصفح مشاريع → تفاصيل → نموذج سعر دون روابط ميتة.
- دعم Lightbox، Before/After، Accordion، وتحقق ومعاينة عرض السعر، مع حالات خطأ وإفراغ واضحة.
- إتمام مراجعة الأداء وإمكانية الوصول والتجاوب قبل تسليم Demo HTTPS وCase Study.

### قرارات النطاق

- داخل النطاق: HTML5, CSS3, ES Modules, local JSON, SVG sprite, صور محلية مرخصة، SEO وصيغ ARIA.
- خارج النطاق: Backend، قاعدة بيانات، إيميلات حقيقية، لوحة إدارة، دفع، إرسال طلبات، نسخة إنجليزية مكتملة.
- لا تُفهم كلمة «إرسال» في واجهة Demo على أنها إرسال حقيقي؛ تبدأ الرحلة بـ«مراجعة الطلب» وتنتهي بتوضيح أن الطلب لم يُرسل.

## 2. Sitemap تفصيلي — الأسماء كما في الدليل

| الصفحة / الرابط | الغرض | أقسام رئيسية | مسارات CTA والتفاعل |
|---|---|---|---|
| `index.html` | تقديم الشركة واستعراض القيمة | Hero بصور مشروع، 6 خدمات، مشاريع مختارة، 5 مراحل، مؤشرات خبرة Demo، CTA | `projects.html`, `services.html`, `contact.html#quote-form` |
| `services.html` | توضيح نطاق الخدمات | Hero داخلي، 6 بطاقات وخطوط النطاق، 5 مراحل عمل Accordion، 8 أسئلة FAQ | `contact.html#quote-form`, `projects.html` |
| `projects.html` | اكتشاف 12 مشروعًا | Intro، Tabs: الكل/سكني/تجاري/تشطيب/بناء، عدد النتائج، Grid 4:3، Empty/Error | `project.html?id=project-001` وما يماثله |
| `project.html?id=...` | إثبات الخبرة بمشروع محدد | Breadcrumb، Title، Category، Gallery/Lightbox، المدينة/السنة/المساحة، Description، Challenges/Solutions، Before/After حيث تتوفر الصورتان، CTA | `projects.html`, `contact.html#quote-form` |
| `about.html` | الثقة والهوية | نبذة، قيم، فريق Demo، منهجية جودة، بيان Concept، CTA | `projects.html`, `contact.html` |
| `contact.html` | تحويل الاهتمام إلى معاينة طلب | بيانات Demo، نموذج الاسم/الخدمة/المساحة/الميزانية/الوصف، تحقق، شاشة مراجعة، توضيح عدم الإرسال | `#quote-form`, العودة للمراجعة/التعديل |

**Global navigation:** شعار BUILDORA → الصفحة الرئيسية؛ روابط الخدمات، المشاريع، من نحن، تواصل معنا؛ CTA «اطلب عرض سعر» إلى `contact.html#quote-form`. يحتوي الـ Footer روابط هذه الصفحات وبيان «Concept Project / Demo». لا تُضاف صفحات FAQ أو Contact Success منفصلة؛ المحتوى يتم داخل الصفحات الست.

**تفاصيل الروابط:** كل صفحات HTML في جذر المشروع؛ جميع مراجع CSS/JS/JSON/صور/SVG نسبية (`assets/...`)؛ لا روابط تبدأ بـ`/assets/`. `id` مصدره JSON، وعند غيابه أو عدم مطابقته تُعرض Not Found مع رجوع واضح إلى قائمة المشاريع.

## 3. User Journeys

### J1: التحقق من أعمال سكنية قبل التواصل

1. دخول `index.html` ومشاهدة مشروع Hero والـ CTA.
2. فتح `projects.html` ثم اختيار فلتر «سكني» مع تحديث عدد النتائج.
3. فتح بطاقة → `project.html?id=...`؛ مراجعة الصور والمدينة والمساحة والتحديات والحلول.
4. استخدام Lightbox أو Before/After إن توافرت الصور؛ البديل المعروض واضح عند عدم توافر المقارنة.
5. الانتقال إلى `contact.html#quote-form` لبدء معاينة طلب السعر.
6. **النجاح:** الوصول لنموذج صالح للمعاينة؛ **ليس** إرسال Lead حقيقي.

### J2: مستخدم تجاري يبحث عن نطاق خدمة

1. دخول `services.html` من القائمة الرئيسية.
2. مقارنة البطاقات الست والتفاصيل المرتبطة بنطاق العمل.
3. فتح مراحل العمل وFAQ عبر Accordion قابل للوحة المفاتيح.
4. الانتقال إلى `projects.html` لمراجعة أمثلة تجارية ثم `contact.html`.
5. **النجاح:** وضوح الخدمة ومراحلها ومسار طلب العرض بلا وعود تشغيلية زائفة.

### J3: استكمال نموذج الطلب دون خادم

1. دخول `contact.html#quote-form`، اختيار خدمة من `services.json`.
2. إدخال الاسم، المساحة، نطاق الميزانية، الوصف.
3. ظهور أخطاء تحقق مفهومة ومربوطة بحقولها عند اللزوم.
4. اختيار «مراجعة الطلب»، فتظهر شاشة ملخص قابلة للتعديل.
5. اختيار «إنهاء المعاينة» يعرض إشعار «هذا نموذج تجريبي؛ لم يُرسل الطلب ولم يُحفظ على خادم».
6. لا يتم تخزين الاسم أو وصف الطلب في LocalStorage.

### J4: تصفح من هاتف وطلب الثقة

1. فتح Home بعرض 375 أو 330 بكسل.
2. فتح قائمة Mobile من زر مع `aria-expanded` وإغلاقها بالزر أو Escape.
3. فتح About وقراءة وصف الشركة والقيم وبيان أنها افتراضية.
4. استعراض الأعمال أو العودة للخدمات ثم Contact.
5. **النجاح:** تدفق كامل باستخدام Tap أو Keyboard، بلا قص أفقي أو عوائق Overlay.

## 4. Wireframes نصية — Desktop / Mobile

| الصفحة | Desktop (شاشات عريضة) | Mobile (شاشات صغيرة) |
|---|---|---|
| Home | Header ثابت؛ Hero صورة ممتدة مع عمود نص/CTA؛ شبكة خدمات 3×2؛ مشاريع مختارة 3 أعمدة؛ مراحل أفقية/Accordion؛ مؤشرات؛ CTA داكن؛ Footer | Header مختصر وقائمة منسدلة؛ Hero نص منضبط وأزرار متتابعة؛ خدمات/مشاريع عمود واحد؛ مراحل عمودية؛ CTA بعرض مناسب |
| Services | عنوان داخلي؛ 6 بطاقات 3×2؛ نطاقات بتفاصيل واضحة؛ 5 مراحل Accordion؛ FAQ؛ CTA | عنوان أصغر؛ بطاقات عمود واحد؛ تفاصيل لا تتطلب Hover؛ Accordion بعرض الشاشة |
| Projects | Header/Intro؛ Filter tabs/عدد النتائج؛ Grid ثلاثي (أو 4 حسب المساحة)؛ Empty/Error داخل الشبكة | فلاتر قابلة للتمرير الأفقي مع ظهور واضح لحالة التركيز؛ بطاقة واحدة؛ العداد فوق الشبكة؛ Reset ظاهر |
| Project | Breadcrumb؛ عنوان ومؤشرات؛ Gallery مع صورة رئيسية وصور ثانوية؛ تفاصيل في عمود معلومات؛ قسم تحديات وحلول؛ Before/After؛ CTA | Breadcrumb قابل للالتفاف؛ صورة رئيسية كبيرة؛ صور مصغرة قابلة للتمرير؛ معلومات مكدسة؛ Range يعمل باللمس؛ CTA أسفل المحتوى |
| About | عنوان وقصة في تقسيم عمودين؛ قيم Grid؛ فريق افتراضي وبطاقة Demo؛ منهجية الجودة؛ CTA | عنوان/قصة ثم صورة؛ قيم وفريق عمود واحد؛ وسم Demo ملازم للمحتوى الافتراضي |
| Contact | عنوان + بطاقتا معلومات وForm؛ حقول منظمة على عمودين عند السعة؛ Preview في مساحة/حوار واضح | معلومات أولًا ثم نموذج بحقول كاملة العرض؛ Validation أسفل كل حقل؛ Preview شاشة/قسم واضح مع رجوع للتعديل |

**حالات التصميم المشتركة:** Loading skeleton أو نص حالة، Empty مع Reset، Error مع Retry، Unknown ID ببديل مفيد، Missing Image مع placeholder محلي، عدم وجود صورة Before/After لا يُظهر سلايدرًا ناقصًا.

## 5. Design Tokens — مواصفة Stage A لتطبيقها في `assets/css/tokens.css` في Stage B

### 5.1 لوحة 60/30/10

| الدور | CSS Custom Property | القيمة | الاستخدام |
|---|---|---|---|
| 60% | `--bg-page` | `#F8F7F3` | جسم الصفحة/الأقسام الهادئة |
| 60% | `--bg-surface` | `#FFFFFF` | بطاقات ونماذج |
| 60% | `--bg-subtle` | `#EFECE4` | تبديل الأسطح |
| 30% | `--brand-navy` | `#14212E` | Header/Hero/Footer والعناوين |
| 30% | `--brand-navy-deep` | `#0D1620` | Footer وعمق Hero |
| 30% | `--brand-navy-elevated` | `#1D2E3F` | بطاقات على الداكن |
| 10% | `--accent-brass` | `#C89A65` | CTA، أرقام 01/02، خطوط فنية |
| 10% | `--accent-brass-hover` | `#B0834F` | تفاعل CTA |
| Semantic | `--text-primary` | `#14212E` | أساسي |
| Semantic | `--text-muted` | `#55616D` | ثانوي على فاتح |
| Semantic | `--text-inverse` | `#FFFFFF` | نص على الداكن |
| Semantic | `--border-hairline` | `rgba(20,33,46,.12)` | فاصل 1px |
| Semantic | `--border-inverse` | `rgba(255,255,255,.2)` | فاصل على داكن |
| Semantic | `--focus-strong` | `#14212E` | حلقة تركيز عالية التباين على فاتح |

توزيع 60/30/10 **تقريبي للمساحات البصرية** وليس نسبة عدد عناصر CSS. النحاس `#C89A65` على الأبيض لا يحقق نسبة 4.5:1 للنص الصغير (تقريبًا 2.54:1)، لذلك يستخدم على خلفية بحرية داكنة للنص، أو كزخرفة/سطح زر بنص داكن. النص `#14212E` على النحاس يقارب 6.42:1. يُعاد اختبار حالات Hover/Focus وتباين العناصر التفاعلية في Stage E.

### 5.2 Typography

- `--font-display: 'Space Grotesk', 'IBM Plex Sans Arabic', system-ui, sans-serif;` لعناوين وهوية `BUILDORA` والأرقام اللاتينية.
- `--font-body: 'Inter', 'IBM Plex Sans Arabic', system-ui, sans-serif;` للنصوص الإنجليزية/العربية المختلطة.
- `--font-ar: 'IBM Plex Sans Arabic', system-ui, sans-serif;` للاستخدام العربي الصريح عند الحاجة.
- الأوزان: Space Grotesk 500/600/700؛ Inter 400/500/600؛ IBM Plex Sans Arabic 400/500/600/700.
- `--fs-h1: clamp(2.25rem,4.5vw,3.85rem)`؛ وزن 700؛ ارتفاع سطر 1.15.
- `--fs-h2: clamp(1.65rem,3vw,2.6rem)`؛ وزن 700؛ ارتفاع سطر 1.25.
- `--fs-h3: clamp(1.15rem,1.6vw,1.4rem)`؛ وزن 600؛ ارتفاع سطر 1.35.
- `--fs-body: 1rem`؛ Arabic line-height 1.75 / English 1.6.
- أحجام إضافية مقترحة: `--fs-small: clamp(.875rem,.85rem + .12vw,.95rem)`، `--fs-lead: clamp(1.075rem,1.01rem + .3vw,1.25rem)`، `--fs-stat: clamp(2rem,3.75vw,3.5rem)`.
- `font-variant-numeric: tabular-nums` في الإحصاءات والمؤشرات، و`dir="ltr"` على سلاسل مثل `220 m²`, `2025` عند الحاجة بدون قلب ترتيب نص RTL.

### 5.3 Spacing / Layout / Radii / Motion

| الفئة | Tokens | القيم |
|---|---|---|
| Spacing (مقياس 4px) | `--space-1/2/3/4/6/8/12/16/20/24` | `4/8/12/16/24/32/48/64/80/96px` |
| Section | `--section-space` | `clamp(4rem,7.5vw,6.5rem)` |
| Container | `--container-max` | `1280px` |
| Side gutters | `--page-gutter` | `clamp(1rem,3vw,2.5rem)` |
| Grid gap | `--grid-gap` | `clamp(1rem,2.3vw,2rem)` |
| Radius | `--radius-sm/md/lg` | `2px / 4px / 8px` (الحد الأقصى) |
| Border | `--border-width` | `1px` |
| Icons | `--icon-sm/md/lg` | `16px / 20px / 24px` |
| Shadow | `--shadow-card` | `0 8px 24px rgba(13,22,32,.07)` |
| Transitions | `--duration-fast/normal/image` | `160ms / 240ms / 400ms` |
| Easing | `--ease-architectural` | `cubic-bezier(.22,1,.36,1)` |
| Header | `--header-height` | `80px` Desktop مبدئيًا؛ Mobile `64px` (افتراض للمراجعة) |

التدرج الوحيد المتكرر: Overlay محسوب فوق صورة Hero لقراءة النص؛ لا Glassmorphism ولا Neon ولا ظلال عميقة. بطاقات المشاريع `aspect-ratio:4/3`، وZoom `1.04` لمدة 400ms بالـ Easing المذكور عند توافر Hover؛ الحركة تختفي مع `prefers-reduced-motion`.

**عروض الفحص الإلزامية:** 1440، 1366، 1200، 1024، 992، 768، 576، 480، 375، 330px. هذه نقاط *اختبار*؛ ليست كلها بالضرورة Media Queries.

## 6. SVG sprite inventory — أسماء معرّفات ثابتة مقترحة

الملف المستهدف `assets/icons/sprite.svg`، مع `stroke="currentColor"`, `fill="none"`, `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"` و`viewBox="0 0 24 24"`. جميع معرّفات الخدمات تطابق `services.json.icon` حرفيًا.

| الاستعمال | Sprite IDs |
|---|---|
| الخدمات (6) | `icon-building`, `icon-hard-hat`, `icon-paintbrush`, `icon-ruler`, `icon-layers`, `icon-clipboard-check` |
| بيانات المشاريع (3) | `icon-map-pin`, `icon-maximize`, `icon-calendar-days` |
| التنقل وCTA (7) | `icon-arrow-left`, `icon-arrow-right`, `icon-arrow-up-right`, `icon-menu`, `icon-x`, `icon-chevron-left`, `icon-chevron-right` |
| التواصل والحالات (3) | `icon-phone`, `icon-mail`, `icon-check` |
| الفلاتر/الأسئلة/المعرض (6) | `icon-chevron-down`, `icon-sliders-horizontal`, `icon-images`, `icon-search`, `icon-rotate-ccw`, `icon-move-horizontal` |

**الإجمالي: 25 رمزًا**؛ صياغة الأيقونات بأسلوب Lucide SVG، لا رموز Unicode تصويرية، ولا مكتبة أخرى/CDN. الـ RTL يُعالَج بتحديد معنى السهم ووظيفته ولا ينعكس كل رمز آليًا. أيقونات زخرفية `aria-hidden="true"`، وأزرار بلا نص مرئي تحمل `aria-label`.

## 7. Proposed file tree (الملفات المخططة وليست مُنشأة في هذه المرحلة)

```text
buildora-construction/
├── index.html
├── services.html
├── projects.html
├── project.html
├── about.html
├── contact.html
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── pages.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── app.js
│   │   ├── data.js
│   │   ├── ui.js
│   │   ├── storage.js
│   │   ├── pages/
│   │   │   ├── home.js
│   │   │   ├── services.js
│   │   │   ├── projects.js
│   │   │   ├── project.js
│   │   │   ├── about.js
│   │   │   └── contact.js
│   │   └── components/
│   │       ├── lightbox.js
│   │       ├── before-after.js
│   │       ├── accordion.js
│   │       └── quote-form.js
│   ├── data/
│   │   ├── projects.json
│   │   ├── services.json
│   │   ├── faqs.json
│   │   ├── process-steps.json
│   │   ├── testimonials.json
│   │   └── site.json
│   ├── images/
│   └── icons/
│       └── sprite.svg
├── docs/
│   ├── PHASE-A-PLAN.md
│   ├── DATA-CONTRACTS.md
│   ├── ASSET-REGISTER.md
│   └── DECISION-LOG.md
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── CASE-STUDY.md
└── README.md
```

**ملف tokens draft:** `docs/DESIGN-TOKENS-DRAFT.css` يضم مواصفة CSS قابلة للنسخ في المرحلة B، دون تفعيلها على صفحات في المرحلة A.

**معمارية الوحدات:** `data.js` جلب JSON/Parsing/Validation خفيف؛ `ui.js` حالات Loading/Empty/Error والمساعدات DOM؛ `storage.js` حالات UX غير حساسة فقط مع prefix `buildora:` ومعالجة أخطاء التخزين؛ `pages/*` تهيئة الصفحة المختصة؛ `components/*` وظائف تفاعلية مستقلة. ملفات `process-steps.json`, `testimonials.json`, `site.json` إضافة منظمة لا تغيّر أسماء الصفحات أو أي Feature من الدليل. احذف أي ملف لا يُستخدم بدل الاحتفاظ بفارغ. `robots.txt`, `sitemap.xml`, `CASE-STUDY.md` في مراحل التسليم وليس مرحلة A.

## 8. خطة التنفيذ إلى مراحل قابلة للمراجعة

| المرحلة | العمل | ملفات/مخرجات أساسية | بوابة القبول قبل التالية |
|---|---|---|---|
| A — تأسيس | Brief، Sitemap، Journeys، Wireframes، Icons، Data Contracts، Asset Register، قرارات/افتراضات | `README.md` وملفات `docs/*` الحالية | ست صفحات محفوظة بأسمائها، التفاعلات الخمس موثقة، نطاق Demo صريح، لا Backend مطلوب |
| B — Design System | tokens.css، base.css، components.css، responsive.css، Sprite، Header/Footer/Navigation مشتركة، Shell أساسي | CSS وSVG وShell | الخطوط والتباين والأيقونات والـ RTL وKeyboard Menu تعمل فعليًا؛ لا Emoji |
| C — الصفحات والبيانات | مخطط مشاريع وعروض أولًا، ثم Home، ثم بقية الصفحات و12/6/5/8/4 بيانات | صفحات HTML وJSON وpage modules | الروابط النسبية تعمل، بيانات مكتملة ومتمايزة، `?id=` صالح وNot Found، حالات البيانات ظاهرة |
| D — التفاعلات | الفلاتر/العدد، Lightbox/Focus/Escape، Before/After range، Accordions، Quote Preview | JS components/pages | سيناريوهات Happy/Edge مثبتة، لا Events مكررة ولا إرسال/تخزين بيانات حساسة |
| E — QA | Responsive، WCAG، SEO، performance، الصور، Console/Network، direct links | تقارير وقائمة إصلاحات | لا overflow في المقاسات المطلوبة، لا 404/console errors، تجربة keyboard جيدة، صور حرجة محسّنة |
| F — نشر/Case Study | GitHub، Cloudflare Pages، HTTPS، صور Desktop/Mobile، README وCase Study نهائيان | رابط عام ومستودع وتوثيق | اختبار فعلي في نافذة خاصة وهاتف، شارة Demo، روابط صحيحة، لا ادعاء أرقام Lighthouse دون قياس |

**ملاحظة ترتيب المرحلة C:** المطلوب في الدليل تقديم مخطط صفحات المشاريع وعروض الأسعار، ثم بناء Home، ثم Gallery/Before-After، ثم نموذج السعر. لا تُطبَّق كل الوظائف دفعة واحدة؛ يجرى بناء الصفحات والمحتوى تدريجيًا ثم ربط التفاعلات في D.

## 9. Acceptance checklist للمرحلة A

- [x] الصفحات الست ومساراتها وFeatures المقررة مثبتة بلا تغيير.
- [x] User Journeys وWireframes Desktop/Mobile لكل صفحة موثقة.
- [x] Color/Type/Spacing/Radius/Icon tokens محددة.
- [x] SVG sprite inventory (25 رمزًا) محددة.
- [x] Data Contracts وحالات Loading/Empty/Error/Not Found موثقة.
- [x] Asset Register والحقوق/ترخيص الصور قيد التحضير.
- [x] عدم الحاجة إلى Backend مُثبت **ضمن نطاق Demo فقط**.
- [x] خطة التنفيذ Stage A–F وبوابات مراجعة موثقة.
- [ ] اعتماد أسماء/قيم بيانات Demo والصور الحقيقية المرخصة قبل اكتمال المرحلة C.
- [ ] تنفيذ/اختبار صفحات الموقع (خارج مرحلة A).

## 10. قيود الأمان والخصوصية وتجربة الاستخدام

- التحقق من بيانات URLSearchParams وقيم JSON قبل استخدامها في DOM؛ نصوص المستخدم عبر `textContent`، لا إدخال HTML غير موثوق.
- `fetch()` مع `try/catch` ورسائل أخطاء Parsing/Network؛ لا `file://` للاختبار.
- الروابط كلها حقيقية ولا `href="#"` للزينة؛ `aria-expanded` وEscape وتركيز واضح وعمل Tap/Keyboard.
- أي بيانات اسم/وصف/ميزانية في Form تبقى بالذاكرة أثناء الجلسة فقط؛ LocalStorage مخصص لتفضيلات غير شخصية عند الحاجة، وباسم مشروع واضح.
- الصور محلية WebP/AVIF بإذن استخدام، مع alt وwidth/height وPlaceholder؛ لا Hotlink.
- H1 واحد لكل صفحة وتسلسل H2/H3، وعنوان ووصف SEO فريدان لكل صفحة.
