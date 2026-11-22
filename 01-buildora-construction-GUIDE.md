# 01 — دليل تنفيذ ونشر مشروع BUILDORA (نسخة مطوّرة بالتصميم والخطوط والأيقونات)

> **الاسم:** BUILDORA — شركة مقاولات وتشطيبات  
> **النوع:** Corporate / Construction  
> **الصعوبة:** مبتدئ إلى متوسط  
> **التقنيات المسموحة:** HTML5 + CSS3 + Vanilla JavaScript (ES Modules) + JSON محلي  
> **نوع العمل:** Portfolio Concept / مشروع افتراضي وليس عميلًا حقيقيًا  
> **الهدف النهائي:** ملفات موقع جاهزة للرفع + رابط Demo HTTPS + توثيق Case Study + صور Desktop/Mobile.

## 0) طريقة استخدام هذا الملف مع ChatGPT Plus

1. أنشئ محادثة أو Project جديدًا في ChatGPT وسمّه `BUILDORA — Portfolio Build`.
2. ارفع **ملف الإرشادات هذا وحده** في بداية المشروع، واطلب اتباعه بوصفه مصدر المتطلبات المُلزم. لا تخلط ملفات مشاريع أخرى في نفس المحادثة.
3. انسخ «البرومبت 1» من القسم 12؛ ابدأ بالمخطط، ثم البرومبتات التالية بالترتيب. **لا تطلب إنتاج جميع صفحات الموقع دفعة واحدة.**
4. في كل مرحلة اطلب قائمة دقيقة بأسماء الملفات المُنشأة/المعدلة، واطلب الكود كاملًا لكل ملف تحتاجه. راجع المشروع محليًا قبل البدء في المرحلة التالية.
5. احتفظ دائمًا بآخر نسخة صحيحة من الملفات على جهازك وداخل Git؛ إذا فُقد سياق المحادثة ارفع ZIP النسخة الحالية مع هذا الدليل واطلب الاستكمال دون إعادة كتابة المشروع.
6. في نهاية كل مرحلة سجّل ما اكتمل وما لم يكتمل. ChatGPT Plus يساعد في كتابة الملفات والمراجعة، لكن النشر الفعلي يتطلب تنفيذك لخطوات GitHub وCloudflare من حساباتك.

**معيار الإنجاز:** ليس مجرد تصميم Screenshot؛ كل رابط وصفحة وزر يجب أن يعمل في متصفح حقيقي، مع ملاحظة واضحة لأي وظيفة تجريبية بلا خادم.

## 1) خطاب العميل الافتراضي (Project Brief)

> «أنا صاحب شركة مقاولات وتشطيبات في مصر، لدينا مشروعات سكنية وتجارية وأريد موقعًا يوثّق جودة أعمالنا، يوضح خدماتنا، ويحوّل المهتمين إلى طلبات عروض أسعار.»

- **الجمهور المستهدف:** أصحاب الشقق والفلل، المطوّرون العقاريون، أصحاب المكاتب والمتاجر.
- **هدف المشروع التجاري:** عرض 12 مشروعًا مرئيًا بوضوح، تيسير تصفح الخدمات، وإظهار طلب عرض سعر تجريبي يصل لمرحلة مراجعة قبل الإرسال.
- **فكرة تميّز المشروع:** الاهتمام بإظهار الإنجاز بالصور والجوانب الهندسية، وليس مجرد موقع خدمات عام.
- **الإطار التقني:** موقع ثابت قابل للنشر بدون PHP أو Node في الإنتاج، ولا قاعدة بيانات أو لوحة إدارة حقيقية.
- **قرار واجهة اللغة:** نسخة عربية RTL كاملة أولًا؛ يمكن تنفيذ الإنجليزية لاحقًا بشرط إعداد بنية النصوص وقواعد `dir` بشكل صحيح، مع تنسيق متقن للنصوص والأرقام والوحدات الإنجليزية داخل الواجهة (`BUILDORA`، `220 m²`، `2025`).
- **مصداقية العمل:** كل الأسماء والأسعار والمشاريع والمراجعات أمثلة اصطناعية، ويجب وسمها كبيانات Demo وعدم نسبها إلى عميل حقيقي.

## 2) الهوية والتصميم (Architectural Luxury Design Direction)

### 2.1 نظام الألوان وتوزيعه (60 / 30 / 10)
- **الألوان الأساسية والسطوح (60%):**
  - `--bg-page: #F8F7F3` (خلفية أبيض دافئ معماري مريح للعين).
  - `--bg-surface: #FFFFFF` (بطاقات ونماذج مرتفعة).
  - `--bg-subtle: #EFECE4` (خلفية ثانوية ناعمة للفصل بين الأقسام).
- **اللون المؤسسي الداكن (30%):**
  - `--brand-navy: #14212E` (العناوين، الـ Header الداكن/الـ Hero، شرائط التباين، الـ Footer).
  - `--brand-navy-deep: #0D1620` (عمق التدرجات والـ Footer).
  - `--brand-navy-elevated: #1D2E3F` (البطاقات داخل الأقسام الداكنة).
- **اللون التمييزي النحاسي (10%):**
  - `--accent-brass: #C89A65` (الـ CTA الرئيسي، الترقيم الهندسي `01 / 02`، الخطوط الرفيعة، الفلتر النشط).
  - `--accent-brass-hover: #B0834F` (حالة Hover للأزرار النحاسية).
- **النصوص والحدود:**
  - `--text-primary: #14212E` (النص الأساسي على الخلفيات الفاتحة).
  - `--text-muted: #55616D` (النص الثانوي مع ضمان تباين WCAG AA ≥ 4.5:1 بدل الرمادي الباهت).
  - `--border-hairline: rgba(20, 33, 46, 0.12)` (خطوط فاصلة رفيعة `1px` مستوحاة من المخططات الهندسية Blueprint).

### 2.2 الخطوط (Typography Pairing — إنجليزي + عربي)
- **الخط الإنجليزي للعناوين واسم العلامة والأرقام الهندسية (`Display / Numbers`):**
  - [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) بأوزان `500, 600, 700` — خط هندسي معماري حاد وعصري، يبرز اسم `BUILDORA` والأرقام (`+120`، `220 m²`، `01`) بدقة، مع تفعيل `font-variant-numeric: tabular-nums`.
  - *(بديل إنجليزي أكثر نعومة إذا أردت طابعًا أقل حدة: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)).*
- **الخط الإنجليزي للنصوص والـ UI (في النسخة الإنجليزية أو المسميات التقنية):**
  - [Inter](https://fonts.google.com/specimen/Inter) بأوزان `400, 500, 600` لوضوح ممتاز على جميع الشاشات.
- **الخط العربي (الواجهة الرئيسية RTL):**
  - [IBM Plex Sans Arabic](https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic) بأوزان `400, 500, 600, 700` لتناغمه الهندسي مع `Space Grotesk` و`Inter`، أو [Cairo](https://fonts.google.com/specimen/Cairo) كبديل معتمد.
- **تعريف `font-family` المركب في `tokens.css`:**
  - للعناوين والأرقام: `'Space Grotesk', 'IBM Plex Sans Arabic', system-ui, sans-serif`
  - للنصوص والواجهات: `'Inter', 'IBM Plex Sans Arabic', system-ui, sans-serif`
  - *(هذا الترتيب يجعل الأحرف والأرقام الإنجليزية تُعرض تلقائيًا بخطها المعماري بينما يُعرض النص العربي بخطه المتناسق دون تدخل يدوي في كل عنصر).*
- **السلم الطباعي (Type Scale) باستخدام `clamp()`:**
  - `H1`: `clamp(2.25rem, 4.5vw, 3.85rem)`، وزن `700`، `line-height: 1.15`.
  - `H2`: `clamp(1.65rem, 3vw, 2.6rem)`، وزن `700`، `line-height: 1.25`.
  - `H3`: `clamp(1.15rem, 1.6vw, 1.4rem)`، وزن `600`، `line-height: 1.35`.
  - `Body`: `1rem` (`16px`)، `line-height: 1.75` للعربي و`1.6` للإنجليزي.

### 2.3 نظام الأيقونات (Icon System — Lucide / Phosphor SVG محلي)
- **المكتبة المعتمدة:** [Lucide Icons](https://lucide.dev/) (بأسلوب خطوط معمارية رفيعة ودقيقة) — أو [Phosphor Icons](https://phosphoricons.com/) بوزن `light` أو `duotone`.
- **طريقة الدمج الإلزامية:** إنشاء ملف **SVG Sprite محلي** في `assets/icons/sprite.svg` يحتوي فقط على الأيقونات المستخدمة في المشروع (~20–25 أيقونة: البناء، التشطيب، المخطط الهندسي، الموقع، المساحة، التقويم، الأسهم، القائمة، الإغلاق، الهاتف، البريد، التحقق، السلايدر) واستدعاؤها عبر:
  ```html
  <svg class="icon icon--md" aria-hidden="true" focusable="false">
    <use href="assets/icons/sprite.svg#icon-building"></use>
  </svg>
  ```
- **ضوابط بصرية صارمة للأيقونات:**
  - سمك خط موحّد `stroke-width="1.5"` أو `1.75` مع `stroke="currentColor"` و`fill="none"` و`stroke-linecap="round"`.
  - أحجام قياسية عبر Tokens: `--icon-sm: 16px`، `--icon-md: 20px`، `--icon-lg: 24px`.
  - **ممنوع تمامًا** استخدام الـ Emojis (مثل 🏗️، 🏠، 📞، ✅) كأيقونات واجهة في أي صفحة أو بطاقة.
  - **ممنوع** خلط أكثر من مكتبة أيقونات أو الاعتماد على CDN خارجي لتشغيل الأيقونات (الـ Sprite المحلي أسرع ويعمل دون اتصال ومتوافق مع GitHub Pages).

### 2.4 قواعد التميّز البصري (منع مظهر القوالب التقليدية للذكاء الاصطناعي)
- **الهندسة والحواف:** حواف حادة أو شبه حادة فقط (`--radius-sm: 2px`، `--radius-md: 4px`، `--radius-lg: 8px` كحد أقصى). **ممنوع** الحواف الدائرية المبالغ فيها (`20px+`) أو خلفيات الـ Glassmorphism العشوائية أو التدرجات النيونية.
- **الإيقاع البصري والمساحات البيضاء:** فراغات سخية بين الأقسام `padding-block: clamp(4rem, 7.5vw, 6.5rem)`، وعرض حاوية `max-width: 1280px`. كسر الرتابة بالتناوب بين الأقسام الفاتحة (`#F8F7F3`) والأقسام الداكنة (`#14212E`) مع خطوط تقسيم رفيعة `1px` وترقيم هندسي (`01`، `02`، `03`) باللون النحاسي `#C89A65`.
- **الـ Hero والبطاقات:**
  - Hero بمشروع معماري ضخم مع طبقة تدرج محسوبة (`linear-gradient`) تضمن وضوح النص الأبيض، وزر CTA نحاسي صريح + زر ثانوي بإطار نحيف.
  - بطاقات المشاريع بنسبة أبعاد موحدة (`aspect-ratio: 4 / 3`) مع `object-fit: cover`، وتأثير Zoom ناعم للصورة عند Hover (`transform: scale(1.04)` خلال `400ms cubic-bezier(0.22, 1, 0.36, 1)`) مع ظلال خفيفة جدًا بدل الظلال الثقيلة.
- **المكونات والتجاوب والتفاعل:**
  - Header ثابت بحالة Scroll، Services grid، Project cards، Filter tabs، Before/After، Lightbox، Quote form، Footer.
  - تحقق على: 1440، 1366، 1200، 1024، 992، 768، 576، 480، 375، 330px باستخدام `clamp()` وGrid/Flex.
  - Hover للماوس مع بدائل Tap/Keyboard. الحركة مقتصدة وتُحترم `prefers-reduced-motion`.
- **الصور:** صور WebP/AVIF مرخصة (مثلاً Unsplash/Pexels وفق شروطها) أو أصول من تصميمك؛ لا تعتمد على روابط Hotlink قابلة للكسر. أضف `alt` مناسبًا وأبعاد `width`/`height` وصور Placeholder عند الحاجة.

## 3) خريطة الموقع وصفحات التسليم

| الرابط/الملف | المحتوى والهدف |
|---|---|
| `index.html` | Hero بمشروع رئيسي، الخدمات الست، أعمال مختارة، مراحل التنفيذ، مؤشرات الخبرة، دعوة لطلب السعر. |
| `services.html` | 6 خدمات في بطاقات، تفاصيل نطاق كل خدمة، مراحل العمل، أسئلة شائعة. |
| `projects.html` | شبكة 12 مشروعًا مع فلاتر (سكني/تجاري/تشطيب/بناء) ومؤشر عدد النتائج. |
| `project.html?id=...` | تفاصيل المشروع المستمدة من JSON: صور، المدينة، المساحة، نوع العمل، وصف وتحديات/حلول. |
| `about.html` | نبذة الشركة، القيم، الفريق الافتراضي، منهجية جودة العمل. |
| `contact.html` | بيانات تواصل تجريبية، نموذج طلب عرض سعر، حالة مراجعة قبل تنفيذ أي إرسال فعلي. |

**القاعدة المعمارية:** جميع صفحات HTML في جذر المشروع، وصفحات التفاصيل تستقبل `?id=` أو باراميترات Query أخرى؛ لا تستخدم مسارات مطلقة مثل `/assets/` حتى تعمل الاستضافة أيضًا تحت مسار GitHub Pages الفرعي.

## 4) المحتوى والبيانات التجريبية المطلوبة

- **كمية المحتوى:** 12 مشروعًا افتراضيًا متنوعًا، 6 خدمات، 5 مراحل عمل، 8 أسئلة شائعة، 4 اقتباسات تجريبية مع تنبيه بأنها غير موثقة.
- **مثال سجل توضيحي:** `project-001, residential, New Cairo, 2025, 220 m²`.
- اجعل النصوص منطقية ومختلفة، ولا تكرر Lorem Ipsum أو بيانات بطاقات متشابهة.
- احتفظ بالبيانات في ملفات JSON، واعرض رسائل Loading / Empty / Error عند القراءة.
- اكتب محتوى SEO طبيعيًا للصفحات؛ استخدم عنوان H1 واحد لكل صفحة وعناوين H2/H3 ذات تسلسل صحيح.
- لا تعرض تقييمًا أو شهادة حقيقية مزعومة؛ إن استخدمت Testimonials فهي تخيلية موصوفة بوضوح.

### نموذج الملفات والحقول

| ملف البيانات | الحد الأدنى من الحقول |
|---|---|
| `projects.json` | `id, slug, title, category, city, year, areaSqm, thumbnail, gallery[], beforeImage, afterImage, summary, scope[]` |
| `services.json` | `id, title, icon, summary, bullets[], processSteps[]` |
| `faqs.json` | `id, question, answer` |

**مهم:** لا تتجاهل اختلاف أنواع البيانات. الأسعار أرقام، الحالات قيم محددة، المعرّفات فريدة، والتواريخ بصيغة ISO عند الحاجة. لا تستخدم بيانات حساسة أو معلومات عملاء حقيقية. حقل `icon` في `services.json` يطابق معرّف الأيقونة داخل `assets/icons/sprite.svg` (مثل `icon-building`، `icon-ruler`، `icon-layers`).

## 5) وظائف JavaScript المطلوبة ومعايير سلوكها

- فلترة المشاريع حسب الفئة مع حالة Empty State واضحة وزر إعادة الضبط.
- Lightbox للصور باستخدام أزرار التالي/السابق وEscape وإدارة التركيز.
- مقارنة Before/After بسلايدر من `input type="range"` ودعم اللمس ولوحة المفاتيح.
- مراحل تنفيذ تفاعلية Accordion، مع إتاحة الوصول و`aria-expanded`.
- نموذج طلب عرض سعر: الاسم/الخدمة/المساحة/الميزانية/الوصف؛ تحقق في المتصفح فقط ثم شاشة معاينة، لا تدّعي وصول الطلب.

**حالات الطرف التي يجب اختبارها:** مشروع بلا صورة ثانوية؛ فئة لا نتائج لها؛ معرّف مشروع غير موجود؛ صورة فاشلة التحميل؛ حقول نموذج غير صالحة.

### قواعد تنفيذ JS

- JavaScript Modules محلية (`type="module"`)، دون jQuery أو إطار عمل أو CDN مطلوب حتى يعمل الموقع (استدعاء Google Fonts للخطوط فقط مسموح، مع Fallback إلى `system-ui`).
- استعمل `fetch()` لقراءة JSON عبر خادم محلي عند التطوير، مع `try/catch` ورسائل فشل وتحكم في أخطاء Parsing.
- نظّم التعامل مع DOM ولا تكرر Event Listeners عند إعادة الرسم؛ استخدم Event Delegation حين يفيد.
- استخدم `textContent` للمحتوى النصي غير الموثوق، ولا تمرر قيم `URLSearchParams` مباشرةً إلى `innerHTML`.
- استخدم State مركزيًا بسيطًا/دوال Pure للحسابات، ولا تعتمد على متغيرات `window` عامة.
- خزّن فقط الحالات التجريبية المسموح بها في LocalStorage، وأضف Namespace مرتبطًا باسم المشروع مع معالجة التخزين المعطّل أو البيانات التالفة.
- لا يُنشئ المتصفح وحده حجوزات أو عمليات دفع أو إدخالات قاعدة بيانات حقيقية. وضح ذلك في الواجهة.

## 6) هيكل المشروع المقترح

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
│   │   └── pages/
│   ├── data/
│   │   ├── projects.json
│   │   ├── services.json
│   │   ├── faqs.json
│   ├── images/
│   └── icons/
│       └── sprite.svg
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

هذا **هيكل مقترح** قابل للتكييف؛ احذف الملفات غير المستخدمة بدل إنشاء ملفات فارغة. الملفات الثابتة `robots.txt` و`sitemap.xml` تُحدّث بروابط الإنتاج النهائية بعد معرفة الدومين، ولا تنشر قيم Placeholder على أنها حقيقية. استخدم `README.md` لتوثيق كيفية التشغيل والتطوير والنشر.

## 7) مراحل التنفيذ خطوة بخطوة (نفّذ مرحلة ثم راجعها)

### المرحلة A — التأسيس والتحليل

- [ ] إنشاء مجلد `buildora-construction` وملف `README.md` وتسجيل هدف الموقع ومشاهده.
- [ ] إنشاء Sitemap، User Journeys، Wireframe نصي Desktop/Mobile لكل صفحة.
- [ ] إعداد قائمة صور مطلوبة لكل قسم، وتحديد مصدر/ترخيص كل صورة.
- [ ] تحديد بيانات JSON وحالات الفراغ والخطأ.
- [ ] التحقق من عدم وجود حاجة حقيقية لـ Backend في النطاق التجريبي.

### المرحلة B — نظام التصميم والهيكل المشترك

- [ ] بناء CSS Tokens: ألوان (60/30/10)، خطوط (`Space Grotesk` + `Inter` + `IBM Plex Sans Arabic`)، مسافات، أحجام خط، Radii هندسية، Shadows خفيفة، Containers.
- [ ] بناء `assets/icons/sprite.svg` بأيقونات خطية موحدة على نمط Lucide (`stroke-width="1.5"`).
- [ ] بناء Header قابل للوصول مع Mobile Menu وKeyboard focus.
- [ ] بناء Footer وروابط وأزرار ونماذج وبطاقات مشتركة.
- [ ] إعداد Reset معتدل مع Box Sizing ودعم RTL.
- [ ] إنشاء الهيكل الأساسي للصفحات من دون تكرار CSS غير لازم.

### المرحلة C — صفحات المشروع وبياناته

- [ ] التنفيذ بالترتيب المخصص: **ابدأ بمخطط صفحات المشاريع والعروض ثم ابنِ الصفحة الرئيسية؛ بعدها نفّذ Gallery وBefore/After؛ بعدها نموذج السعر.**
- [ ] إكمال كل صفحة بمحتوى واقعي متسق مع الهوية.
- [ ] إضافة JSON المحلي والتحقق من تنسيقه وصحة الربط بين المعرّفات والأيقونات.
- [ ] ربط صفحات التفاصيل بروابط Query Params وHandling مناسب لـ Not Found.
- [ ] إضافة Loading/Empty/Error UI.

### المرحلة D — الخصائص التفاعلية

- [ ] تنفيذ الوظائف المذكورة في القسم 5 واحدة تلو الأخرى.
- [ ] اختبار الأحداث والنماذج والفلاتر على البيانات الحقيقية التجريبية.
- [ ] اختبار LocalStorage ومسحه وفساده وتغيّر البيانات.
- [ ] منع الروابط الوهمية و`href="#"` التي لا تؤدي فعلًا ذا معنى.

### المرحلة E — ضبط الجودة والتحسين

- [ ] Responsive لكل المقاسات المذكورة واختبار على الموبايل فعليًا إن توفر.
- [ ] Accessibility: Label لكل حقل، Focus واضح، Tab order، Escape للحوارات، ARIA صحيحة، ألوان متباينة.
- [ ] SEO: Title وDescription فريدان، OG/Twitter metadata حيث يلزم، Semantic HTML، favicon، و`lang="ar" dir="rtl"`.
- [ ] Performance: ضغط الصور، تحديد عرض/ارتفاع الصور لمنع Layout Shift، Lazy Loading للصور غير الحرجة، وعدم تأخير صورة الـ Hero الرئيسية.
- [ ] اختبار Console وNetwork من DevTools؛ لا أخطاء JS ولا 404 للصور/الملفات.
- [ ] اختبار URLs المباشرة: فتح أي صفحة داخلية مباشرةً وبعد Refresh.

### المرحلة F — العرض والنشر

- [ ] إنشاء Git Repository وإضافة `.gitignore` حسب الملفات المستخدمة.
- [ ] رفع الملفات إلى GitHub والربط بـ Cloudflare Pages (القسم 9).
- [ ] اختبار رابط HTTPS العام في نافذة خاصة وعلى هاتف آخر إن أمكن.
- [ ] إضافة شارة `Concept Project / Demo` في Footer أو صفحة About.
- [ ] حفظ Screenshot للـ Desktop وMobile وكتابة Case Study (القسم 11).

## 8) التشغيل المحلي (لا تعتمد على فتح `file://`)

من Terminal داخل مجلد المشروع:

```bash
python -m http.server 5500
```

ثم افتح `http://localhost:5500/`. لو الأمر `python` غير متاح على Windows، جرّب `py -m http.server 5500`، أو استخدم VS Code Live Server. ملفات JSON المقروءة عبر `fetch` وملف `sprite.svg` قد لا تعمل عند فتح HTML مباشرة بواسطة `file://`.

**مراجعة سريعة قبل أي نشر:** افتح Home، صفحة القائمة، صفحة التفاصيل، نموذج التفاعل؛ افتح DevTools وتأكد أن ملفات CSS وJS وJSON وSVG وImages تُرجع HTTP 200، وأن Console خالٍ من الأخطاء.

## 9) النشر الأساسي: GitHub + Cloudflare Pages (أنصح به)

### 9.1 إنشاء المستودع

1. أنشئ حسابًا على https://github.com وحسابًا على https://dash.cloudflare.com إن لم يكن لديك.
2. أنشئ مستودعًا باسم `buildora-construction` (Public لعرض الكود، أو Private إذا أردت بقاء الكود غير منشور؛ الموقع نفسه سيكون عامًا).
3. إن كان المستودع الجديد فارغًا، نفّذ داخل مجلد المشروع بعد تعديل `GITHUB_USERNAME`:

```bash
git init
git add .
git commit -m "Initial BUILDORA portfolio demo"
git branch -M main
git remote add origin https://github.com/GITHUB_USERNAME/buildora-construction.git
git push -u origin main
```

إذا أنشأت Repository به README قبل الدفع، اسحب التغييرات أولًا أو ابدأ بمستودع فارغ لتجنب تعارضات History. عند طلب Login استخدم طريقة مصادقة GitHub المدعومة مثل Git Credential Manager أو SSH؛ لا تضع Token داخل الملفات.

### 9.2 نشر Cloudflare Pages عبر Git

1. من **Cloudflare Dashboard → Workers & Pages → Create application** اختر مسار **Pages / Connect to Git** (قد تختلف أسماء الأزرار قليلًا).
2. اربط GitHub وحدّد المستودع `buildora-construction` ثم `main` بوصفه Production branch.
3. لموقع HTML ثابت بلا Build: **Framework preset = None**، **Build command = فارغ** (أو `exit 0` إذا طُلب أمر)، و**Build output directory = `.`** لأن `index.html` في الجذر، و**Root directory** اتركه الافتراضي.
4. اضغط Save and Deploy، ثم اختبر الرابط الذي تظهره Cloudflare. الشكل المتوقع: `https://buildora-construction.pages.dev` **إذا كان الاسم متاحًا**؛ وإلا سيختلف الاسم النهائي.
5. كل تعديل جديد ينشر تلقائيًا مع `git add . && git commit -m "Update pages" && git push`.

**مهم:** لا تضع `dist` أو `build` كـ Output ما دمت لا تستخدم Build Tool. لا تنقل إعداد المشروع من Git إلى Direct Upload أو العكس على نفس مشروع Pages؛ سيتطلب ذلك إنشاء مشروع آخر. راجع أحدث واجهة خدمة الاستضافة عند التنفيذ.

### 9.3 بديل Cloudflare المباشر (للنشر الأول السريع فقط)

1. افتح Workers & Pages ثم Create application → Get started → **Drag and drop your files**.
2. اختر اسمًا فريدًا واسحب المجلد النهائي أو ZIP يحتوي على `index.html` في الجذر ثم Deploy site.
3. لتحديث نسخة Direct Upload اختَر Create a new deployment وأعد رفع الملفات.
4. هذه الطريقة **لا تتحول لاحقًا إلى Git integration على نفس مشروع Pages**؛ الأفضل من البداية GitHub إن كنت ستطوّر على مراحل.

## 10) بدائل مجانية للنشر

### Netlify Drop

- افتح https://app.netlify.com/drop وسجّل الدخول، واسحب مجلد الموقع الذي يحتوي `index.html` مباشرة.
- بعد النشر خذ الرابط المنتهي بـ `.netlify.app`، واحتفظ بالمشروع في حسابك لتحديث نفس الرابط.
- عند التعديل ادخل إلى Deploys واسحب المجلد المحدث إلى منطقة النشر اليدوي. حدود الخطة المجانية قد تتغير؛ تحقق من صفحة Pricing قبل الاستخدام الكثيف.

### GitHub Pages

1. من Repository افتح **Settings → Pages**.
2. من **Build and deployment** اختر **Deploy from a branch** ثم `main` و`/(root)` ثم Save.
3. رابط المشروع عادةً `https://GITHUB_USERNAME.github.io/buildora-construction/`.
4. جميع روابط CSS وJS والصور والأيقونات ينبغي أن تكون نسبية (`assets/css/base.css`)، لا تبدأ بشرطة `/`؛ واستخدم الرابط النهائي في روابط المشاركة.

## 11) تسليم المشروع وكتابة Case Study للبورتفوليو

اكتب ملف `CASE-STUDY.md` بالمحتوى التالي، وارفع مقتطفًا منه لموقع ملف أعمالك:

- **العنوان:** `BUILDORA — شركة مقاولات وتشطيبات`.
- **النوع:** Concept / Self-initiated Project — لم يُنفَّذ لصالح عميل حقيقي.
- **المشكلة:** تحدي تحويل معرض أعمال البناء إلى تجربة بحث مرئية، والحل: فلاتر سريعة + مقارنة قبل/بعد + CTA مناسب.
- **دورك:** UI/UX، Frontend، تنظيم البيانات، الاختبارات، النشر.
- **التقنيات:** HTML5, CSS3, Vanilla JS, JSON, SVG Sprite, GitHub, Cloudflare Pages.
- **شاشات العرض:** Desktop Home، Mobile Home، صفحة قائمة/تفاصيل، ميزة JavaScript مميزة.
- **الأدلة:** رابط Live Demo، رابط GitHub اختياري، لقطة أداء Lighthouse مع تاريخ وظروف الاختبار (لا تخترع نتيجة).
- **الحدود:** عمليات الطلب/الحجز/الحساب التجريبي لا تخزن بيانات على خادم ولا تمثل خدمة تجارية حقيقية.

## 12) برومبتات جاهزة للنسخ إلى ChatGPT Plus

**البرومبت 1 — تأسيس المشروع وتحليل المتطلبات**

```text
أنت Lead Frontend Developer وSenior UI/UX Designer متخصص في مواقع العمارة والمقاولات الفاخرة. هذا الملف المرفق هو المواصفات الملزمة لمشروع BUILDORA.
المطلوب الآن فقط: اكتب Brief تنفيذي مختصر، Sitemap تفصيلي، User Journeys، Design Tokens كاملة (الألوان بنظام 60/30/10، الخطوط: Space Grotesk للعناوين والأرقام الإنجليزية + Inter للنصوص الإنجليزية + IBM Plex Sans Arabic للعربي، أحجام clamp، حواف هندسية 2px–8px)، قائمة أيقونات SVG المطلوبة داخل assets/icons/sprite.svg بأسلوب Lucide (ممنوع الإيموجي نهائيًا)، قائمة الملفات المقترحة، Data Models للـ JSON، وخطة تنفيذ مرتبة إلى مراحل قابلة للمراجعة.
التقنيات: HTML5 + CSS3 + Vanilla JS ES Modules + JSON محلي، بلا Framework أو Backend.
ابدأ بالمرحلة الأولى ولا تكتب كود جميع صفحات الموقع الآن. حدّد الافتراضات وبيانات Demo بوضوح. لا تغيّر أسماء الصفحات أو الـ Features الموضحة في الملف بلا سبب مصرح به.
```

**البرومبت 2 — بناء Design System والأيقونات وHome (مع قفل جودة التصميم)**

```text
استكمل مشروع BUILDORA بالاعتماد على آخر خطة وافقتُ عليها وملف المواصفات. أنشئ الملفات اللازمة لنظام التصميم (tokens.css, base.css, components.css, pages.css, responsive.css) وملف الأيقونات المحلي assets/icons/sprite.svg (بأسلوب Lucide وstroke-width="1.5" وبدون أي Emoji) والـ Header والـ Footer وindex.html.
التزم بصرامة بالتوجيه البصري المعماري الفاخر (Architectural Luxury):
- الخطوط: Space Grotesk (500,600,700) للعناوين واسم BUILDORA والأرقام مع tabular-nums، وInter (400,500,600) للإنجليزي، وIBM Plex Sans Arabic (400,500,600,700) للعربي عبر Google Fonts.
- حواف هندسية حادة/شبه حادة (2px–8px كحد أقصى)، خطوط فاصلة رفيعة 1px (Blueprint hairlines)، مساحات بيضاء سخية، وترقيم هندسي (01 / 02 / 03) باللون النحاسي #C89A65.
- ممنوع مظهر القوالب العشوائية (لا ظلال ثقيلة، لا تدرجات نيونية، لا حواف 24px، لا إيموجي).
اكتب المحتوى العربي النهائي التجريبي بدل Lorem Ipsum. احرص على RTL والـ Semantic HTML وResponsive.
أرسل شجرة الملفات ثم الكود الكامل لكل ملف تنشئه أو تعدله. CSS نظيف Modular وأسماء Classes متناسقة. جميع تعليقات الكود بالإنجليزية.
لا تنفذ باقي الصفحات ولا تعِد كتابة ملفات مكتملة بلا داعٍ.
```

**البرومبت 3 — الصفحات والبيانات الخاصة بهذا المشروع**

```text
نفّذ الآن صفحات مشروع BUILDORA التالية بحسب المواصفات: services.html, projects.html, project.html?id=..., about.html, contact.html.
ابدأ بإعداد البيانات في assets/data/ مع عدد السجلات المطلوب وربط حقل icon في services.json بمعرّفات assets/icons/sprite.svg، ثم صفحة القائمة والتفاصيل والصفحات التابعة لها.
أسلوب التنفيذ المفضل هنا: ابدأ بمخطط صفحات المشاريع والعروض ثم راجع تناسقها مع الصفحة الرئيسية؛ بعدها نفّذ Gallery وBefore/After؛ بعدها نموذج السعر.
حافظ على نفس الهوية المعمارية ونفس الخطوط والأيقونات بدون أي Emoji.
قسّم الرد إلى دفعات منطقية لا تقطع ملفًا في منتصفه. لا تعتبر أي ميزة مكتملة قبل أن توفر الملفات المرتبطة بها وروابط الوصول إليها. تذكّر Handling لحالات Loading وEmpty وError وUnknown ID.
```

**البرومبت 4 — الوظائف التفاعلية**

```text
نفّذ خصائص JavaScript المقررة لمشروع BUILDORA فقط، مع وحدات منفصلة ودوال قابلة للاختبار.
الخصائص المطلوبة:
- فلترة المشاريع حسب الفئة مع حالة Empty State واضحة وزر إعادة الضبط.
- Lightbox للصور باستخدام أزرار التالي/السابق وEscape وإدارة التركيز.
- مقارنة Before/After بسلايدر من `input type="range"` ودعم اللمس ولوحة المفاتيح.
- مراحل تنفيذ تفاعلية Accordion، مع إتاحة الوصول و`aria-expanded`.
- نموذج طلب عرض سعر: الاسم/الخدمة/المساحة/الميزانية/الوصف؛ تحقق في المتصفح فقط ثم شاشة معاينة، لا تدّعي وصول الطلب.
اختبر الحالات الحدّية التالية: مشروع بلا صورة ثانوية؛ فئة لا نتائج لها؛ معرّف مشروع غير موجود؛ صورة فاشلة التحميل؛ حقول نموذج غير صالحة.
لا تستخدم Backend وهميًا ولا تكتب أن أي عملية حجز/شراء/تسجيل حفظت في قاعدة بيانات. أرسل أسماء الملفات المعدلة والكود الكامل لها، ثم سيناريوهات اختبار قابلة للتنفيذ.
```

**البرومبت 5 — مراجعة الإنتاج وجودة التصميم والجاهزية للنشر**

```text
راجع كل ملفات BUILDORA المرفقة كمراجع Code Reviewer وDesign Director صارم. افحص:
1) جودة التصميم والهوية: تباين الألوان WCAG AA، تحميل وتطبيق خطوط Space Grotesk + Inter + IBM Plex Sans Arabic، عمل جميع أيقونات sprite.svg بدون أي Emoji، تناسق المساحات والحواف الهندسية 2px–8px.
2) الكود والوظائف: كل الروابط، تشغيل صفحات التفاصيل مباشرة، فلاتر البيانات، Form validation، جميع المقاسات 1440 إلى 330، الوصولية، SEO، أحجام الصور، Console errors، JSON loading، تخزين LocalStorage، والتوافق مع Cloudflare Pages وGitHub Pages subpath.
قسّم النتائج إلى Blocker/Major/Minor، ثم طبّق الإصلاحات الضرورية في الملفات فقط. أرسل نسخة نهائية كاملة للملفات المعدلة وقائمة Acceptance Tests لا تدّعِ تشغيلها إذا لم تشغّل المتصفح فعلاً.
```

**البرومبت 6 — تسليم النسخة القابلة للنشر**

```text
اعتبر BUILDORA جاهزًا للتسليم بعد اختبار ملفاتي الفعلية. أنشئ README.md وCASE-STUDY.md وقائمة Deployment نهائية لمستودع buildora-construction.
حدد القيم التي عليّ استبدالها قبل النشر (GitHub username، الدومين، صور أصلية، أرقام التواصل)، وتأكد أن index.html في جذر المشروع وأن كل روابط الأصول والأيقونات نسبية.
أعطني خطوات Git → Cloudflare Pages (Build command فارغ، output .) ثم اختبار رابط HTTPS وتحديثات Git push. إن أمكن أنشئ ZIP نهائيًا للموقع؛ لا تذكر أن الملف موجود ما لم توفره فعليًا.
```

## 13) قائمة قبول نهائية (Definition of Done)

- [ ] جميع الصفحات الموضحة في القسم 3 موجودة ومفتوحة من القائمة وروابطها الداخلية.
- [ ] تطبيق الهوية المعمارية: خطوط `Space Grotesk` + `Inter` + `IBM Plex Sans Arabic`، وأيقونات `sprite.svg` نظيفة بلا أي Emoji.
- [ ] تعمل الخصائص الخمس المذكورة في القسم 5 بلا أخطاء ظاهرة.
- [ ] JSON صحيح وبياناته متسقة وروابط العناصر ليست مكسورة.
- [ ] شاشات 1440 / 768 / 375 / 330px لا تحتوي Overflow أفقيًا غير مقصود.
- [ ] Keyboard navigation وFocus وLabels وalt تعمل بصورة معقولة.
- [ ] لا يظهر خطأ JavaScript أو 404 أو Mixed Content في DevTools.
- [ ] العمليات التجريبية موسومة Demo بوضوح؛ لا تخزين بيانات حقيقية أو مدفوعات.
- [ ] نشر الموقع على رابط HTTPS يمكن فتحه في نافذة خاصة بدون Login.
- [ ] إنشاء README وCASE-STUDY وصور عرض Desktop/Mobile وروابط Live Demo.
- [ ] توثيق رابط GitHub والرابط المنشور وتاريخ آخر مراجعة.

## 14) مشاكل شائعة وإصلاحها

| المشكلة | التشخيص والحل |
|---|---|
| `fetch()` أو `sprite.svg` يفشل محليًا | شغّل خادم `python -m http.server 5500`؛ لا تفتح `file://`. |
| الصفحة الرئيسية 404 | تأكد أن `index.html` في جذر Build output واسم الملف بحروف صغيرة. |
| CSS/صور/أيقونات تعمل على Cloudflare ولا تعمل في GitHub Pages | استخدم مسارات نسبية بدل `/assets/...`، خصوصًا في URL المشاريع الفرعية. |
| تفاصيل عنصر تعطي شاشة فارغة | تحقق من Query Param، ومعرّف JSON، ووجود Empty/Not Found State. |
| تعديل Git لا يظهر في الرابط | افحص أن `git push` وصل لـ `main`، ثم سجل Deployments وحالة Build. |
| Direct Upload لا ينشر تلقائيًا | هذه طريقة رفع يدوي؛ اعمل Deployment جديد أو استخدم مشروعًا جديدًا مرتبطًا بـ Git. |
| الصور كبيرة أو بطيئة | اضغطها وارفع WebP/AVIF، واستعمل `width`/`height`، وقلّل الصور غير المستخدمة. |
| ChatGPT رجّع ملفات ناقصة أو استخدم Emoji | أرسل قائمة الملفات الفعلية وحدّد المطلوب، وأعد التذكير بملف `sprite.svg` واطلب كل ملف كاملًا دون placeholders. |

## 15) روابط مرجعية رسمية

- [Cloudflare Pages Git Integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare Pages Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [GitHub Pages branch publishing](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Netlify Drop](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/)
- [Google Fonts — Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)
- [Google Fonts — IBM Plex Sans Arabic](https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic)
- [Lucide Icons](https://lucide.dev/)
- [Phosphor Icons](https://phosphoricons.com/)

---

**آخر تحديث لإرشادات النشر:** 18 نوفمبر 2026. **ملحوظة:** أسماء أزرار لوحات التحكم والباقات قد تتغير؛ المرجع الحاسم عند التطبيق هو توثيق مزوّد الخدمة. **هدف هذا الدليل:** مشروع قابل للعرض والحكم عليه لا مجرد واجهات شكلية.
