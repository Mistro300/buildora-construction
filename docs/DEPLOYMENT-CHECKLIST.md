# BUILDORA — Final Deployment Checklist (GitHub → Cloudflare Pages)

**Release:** Stage G / 2026-11-22. **Repository name:** `buildora-construction`. **Framework:** None. **Production files:** Static HTML/CSS/ES Modules/JSON/WebP/SVG. **Build command:** *Blank*. **Build output directory:** `.`. **Root directory:** repository root. **Production branch:** `main`.

هذه الوثيقة تصف خطوات ينبغي تنفيذها من حساباتك الشخصية؛ **لم تُنفَّذ عمليات `git push` أو Cloudflare Deploy ضمن إعداد الملفات الحالي**. لا توجد بيانات دخول أو رموز وصول داخل الحزمة.

## A. قيم تُضبط قبل النشر النهائي

| القيمة | الوضع الحالي | المطلوب |
|---|---|---|
| GitHub username | غير معروف | اسم حسابك الفعلي، لإنشاء `https://github.com/USERNAME/buildora-construction` |
| Domain / public origin | غير معروف | استخدم الرابط الذي تُظهره Cloudflare بعد أول Deploy، أو اربط Custom Domain معلومًا |
| Branding + Contact | `site.json` و`contact.html`: بيانات مصر و`contact@example.com` التوضيحي | إذا بقي Portfolio Concept أبقِ الإفصاح Demo؛ إذا صار موقع شركة فعلية، استبدل التفاصيل بـبيانات مرخصة وصحيحة |
| Phone / office / WhatsApp | غير متاح عمدًا | أضفه فقط بعد معرفة الرقم الحقيقي؛ لا تخترع رقمًا للتجربة |
| Photographs | 36 صورة WebP محلية توضيحية (4 Stage B + 32 Stage C) | صور أعمال أصلية مرخصة مع Attribution مناسب إذا كان الهدف عرض تنفيذ واقعي؛ حدّث `assets/data/projects.json` ومسارات الصور وAlt |
| OG share image | ليس له URL مطلق معتمد | صورة 1200×630 مرخصة، ثم رابطها الكامل `https://REAL-ORIGIN/...` في صفحات HTML |
| Canonical + `og:url` | لم تعيَّن لأن الدومين غير معروف | URL مطلق وفريد للصفحات بعد حسم الدومين |
| `sitemap.xml` | غير موجود عمدًا | أنشئ Sitemap بعناوين HTTPS الحقيقية للصفحات الثابتة، وانظر الملاحظة أدناه عن صفحة المشاريع الديناميكية |
| `robots.txt` | يسمح بالفهرسة ولا يتضمن Sitemap | أضف `Sitemap: https://REAL-ORIGIN/sitemap.xml` بعد إنشاء الملف وتحديد الدومين |
| Live Demo / GitHub URLs | غير معروفة | أضفها إلى `README.md` و`CASE-STUDY.md` **بعد التحقق** |

**تنبيه:** `project.html?id=...` يعتمد على تحميل البيانات في المتصفح. غالبًا لا تنفّذ روبوتات مشاركة الروابط JavaScript؛ لذلك قد تعرض جميع الروابط معاينة Open Graph عامة. إذا كانت المعاينات/الفهرسة الفردية لكل مشروع مطلوبة، تحتاج استراتيجية تصدير صفحات Static لكل مشروع أو نشر آخر يدعم Rendering. لا تدّعِ حل هذه النقطة بمجرد تغيير Meta Tags عبر JS.

## B. تحقق محلي — قبل Git

- [ ] فك الـ ZIP النهائي بحيث يحتوي **جذر المستودع مباشرة** على `index.html`، وليس `buildora-construction/index.html` ضمن مجلد إضافي.
- [ ] تأكد من وجود `services.html` و`projects.html` و`project.html` و`about.html` و`contact.html` وملفات JSON في `assets/data/`.
- [ ] شغّل: `python tests/validate_static.py`، ثم `python tests/release_audit.py`، ثم `node --test tests/logic.test.mjs`، ثم `python tests/http_smoke.py`.
- [ ] شغّل محليًا `python -m http.server 5500`، وافتح `http://localhost:5500/` في متصفحك الحقيقي.
- [ ] اختبر الفلاتر، تفاصيل مشروع، Gallery وBefore/After وAccordion وQuote Preview، ثم اختبر `project.html?id=unknown`.
- [ ] افتح DevTools Network/Console؛ تأكد من عدم وجود 404/CORS/Module/JSON/SVG/font errors.
- [ ] جرّب لوحة المفاتيح وEscape وTap وشاشة بعرض 330px، واختبر مشاركة النطاقات RTL/LTR.
- [ ] قرّر هل سيبقى المشروع **Portfolio Demo** (الموصى به)، أم ستُستبدل أصوله وبياناته بمحتوى فعلي. لا تُزل إفصاح Demo ما دامت المحتويات افتراضية.

## C. إنشاء GitHub Repository

1. سجّل الدخول إلى [GitHub](https://github.com)، وأنشئ **مستودعًا فارغًا** باسم `buildora-construction` (لا تحدد إنشاء README آخر عند إنشاء المستودع لتفادي تضارب Commit أولي).
2. من Terminal داخل جذر المشروع الذي يحتوي `index.html` مباشرة:

```bash
git init
git add .
git commit -m "Release BUILDORA static portfolio demo"
git branch -M main
git remote add origin https://github.com/USERNAME/buildora-construction.git
git push -u origin main
```

استبدل **`USERNAME`** باسم GitHub الحقيقي. استعمل Git Credential Manager أو SSH للمصادقة ولا تضع Personal Access Token في ملفات المشروع. إذا كان مستودعك موجودًا بالفعل فاستعمل `git remote -v` وادفع إلى الـ Remote الصحيح بدل إضافة `origin` مكرر.

## D. Cloudflare Pages — Git Integration

1. افتح [Cloudflare Dashboard](https://dash.cloudflare.com) ثم **Workers & Pages** → إنشاء تطبيق → **Pages / Connect to Git** (تسميات الواجهة قد تتغير).
2. اربط GitHub واختر `buildora-construction` وفرع `main`.
3. اضبط الخيارات:

| Field | Value |
|---|---|
| Framework preset | **None** |
| Build command | **اتركه فارغًا** (إذا فرضت الواجهة أمرًا، يمكن استخدام `exit 0` بعد التحقق) |
| Build output directory | **`.`** |
| Root directory | جذر المستودع / الافتراضي |
| Production branch | `main` |
| Environment variables | لا حاجة لمتغيرات لأجل الموقع الثابت |

4. انقر **Save and Deploy**، وافتح Deployment Logs. لا تفترض نجاح النشر حتى تظهر حالة Success ويصبح رابط `*.pages.dev` قابلًا للفتح.
5. **لا تختلق رابطًا** من اسم المستودع: استخدم الرابط المعروض فعلًا في Cloudflare، أو أدخل Custom Domain بعد التأكد من DNS وTLS.

مراجع رسمية: [Cloudflare Git Integration](https://developers.cloudflare.com/pages/get-started/git-integration/) و[Cloudflare Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) و[Build Configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).

## E. HTTPS Acceptance — بعد النشر الفعلي

- [ ] افتح رابط الإنتاج في نافذة خاصة ومن جهاز آخر، دون تسجيل دخول.
- [ ] تأكد من HTTP 200 للصفحات الست عند فتحها مباشرة وبعد Refresh، وللـ JS Modules وCSS وFont Awesome وWebP وJSON.
- [ ] شغّل `python tests/verify_live.py https://YOUR-ACTUAL-DOMAIN/` باستخدام **رابط HTTPS الفعلي** وليس Placeholder؛ الدعم يشمل المسار الفرعي على GitHub Pages.
- [ ] تأكد أن الموقع يعمل عند النشر على Cloudflare Pages، وجرّب GitHub Pages subpath منفصلًا إذا كنت ستستخدم الاستضافتين.
- [ ] افتح `project.html?id=project-001` وتحقق من الصور والمقارنة، ثم `project.html?id=unknown` وتأكد من Not Found.
- [ ] اختبر category غير موجودة وبدون نتائج؛ Broken image / failed JSON باستخدام DevTools؛ وفشل validation في نموذج السعر.
- [ ] اختبر القائمة باللمس وبـ Escape وTab، Lightbox مع رجوع التركيز، سلايدر Before/After بمفاتيح الأسهم، ومراحل الـ Accordion.
- [ ] تحقق من تحميل Zain من Google Fonts وFont Awesome عبر cdnjs أو ظهور Fallback مقبول إذا حُظرت، ومن عدم وجود Mixed Content.
- [ ] اختبر Lighthouse Performance/Accessibility/SEO على Mobile وDesktop، **وسجل الدرجات الحقيقية بتاريخ الاختبار**؛ لا توجد درجة مثبتة في نسخة التسليم.
- [ ] بعد تحديد الدومين: أنشئ Canonical / OG absolute links و`Sitemap` وحدث `robots.txt` وأعد النشر.
- [ ] أضف روابط Live Demo وGitHub الموثقة إلى README ودراسة الحالة.

## F. تحديثات Git → Cloudflare

```bash
git status
git add .
git commit -m "Refine BUILDORA portfolio content"
git push origin main
```

يرسل `git push` تحديثًا إلى GitHub؛ عند تفعيل Cloudflare Pages Git Integration يُنشأ Deployment جديد تلقائيًا، ثم يجب مراجعة Status والسلوك على الرابط العام. **التعديل اليدوي داخل Cloudflare وحده لا يحدّث المستودع.**

**Rollback:** في Cloudflare Pages راجع Deployments واختر نسخة سابقة صالحة وفق واجهتك؛ أو عُد إلى Commit سابق عبر Git وادفع Commit إصلاحيًا جديدًا. لا تستخدم `git push --force` على `main` دون ضرورة وإدارة واضحة للتاريخ.

## G. GitHub Pages (بديل أو فحص للتوافق)

من Repository → Settings → Pages → Deploy from a branch → `main` و`/(root)`. غالبًا سيكون العنوان بصيغة `https://USERNAME.github.io/buildora-construction/`. يجب أن تعمل الروابط النسبية مثل `assets/css/tokens.css` دون شرطة `/` في البداية. لا تُستخدم روابط الدومين المفترض قبل ظهور الرابط الفعلي.

## H. حالة المراجعة عند إنشاء هذه الوثيقة

**مُنجز:** فحص الملفات/الروابط/JSON، Unit tests، HTTP smoke محلي، 60 حالة Responsive في Chromium in-memory. **لم يُنجز في حساباتك:** إنشاء GitHub Repository، Git push، Cloudflare HTTPS، Lighthouse الإنتاجي، Final SEO domain metadata، واعتماد صور حقيقية إن كنت تنوي عرضها كأعمال منفذة.

**Stage G:** يتطلب الموقع اتصالًا بـ `fonts.googleapis.com` و`fonts.gstatic.com` لتحميل Zain، و`cdnjs.cloudflare.com` لتحميل Font Awesome. أزيل `assets/icons/sprite.svg` من النسخة الحالية؛ المراجع القديمة في وثائق مراحل سابقة تاريخية فقط.
