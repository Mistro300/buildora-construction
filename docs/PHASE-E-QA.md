# BUILDORA — Phase E / Strict Design & Code Audit

Audit date: 2026-11-22. Source: actual extracted **Stage D** files and mandatory `01-buildora-construction-GUIDE.md`. Scope: six existing HTML pages, common design system, local JSON, 25-symbol SVG sprite, client interactions, SEO and deployment portability. **No additional pages, framework or backend were introduced.**

## 1. Severity findings

### Blocker — production acceptance gate, not a confirmed source-code defect

| ID | Finding | Status / decision |
|---|---|---|
| B-01 | The execution environment blocks Chromium navigating to localhost (`ERR_BLOCKED_BY_ADMINISTRATOR`), even when a Python HTTP server is running. Therefore we cannot verify an actual browser-over-HTTP E2E session, real remote Google Fonts loading or external SVG sprite rendering via browser network requests. | **Open release gate.** Independent Python HTTP smoke passes, and Chromium in-memory rendering/interactions pass. They are not equivalent to a real browser-over-HTTP E2E test. Execute acceptance tests on a normal local machine and again on the live HTTPS deployment. |

**No reproducible Blocker-level defect was found in the inspected source. Production acceptance is nevertheless withheld until B-01 is closed.**

### Major

| ID | Observed issue | Fix / status |
|---|---|---|
| M-01 | Default dark `:focus-visible` outline blended into dark Lightbox, inner-page hero and CTA surfaces. | **Fixed** with contrasting inverse focus styling in `assets/css/components.css`. |
| M-02 | Quote validation reported invalid field names without field-specific explanatory messages linked via `aria-describedby`. | **Fixed** in `assets/js/pages/contact.js` and `assets/css/pages.css`: inline messages per field, existing hints linked, messages clear as fields change, and original Preview/Edit/Finish flow retained. |
| M-03 | At 330–375px, the three-up overview stats used very small labels/hints and compressed columns. | **Fixed** in `responsive.css`: one-column, readable numbers/labels below 480px. |
| M-04 | Unknown project ID had only a generic empty message; there was no direct recovery CTA and the browser title stayed generic. | **Fixed** in `pages/project.js`: meaningful title/description and an actual link back to projects. |
| M-05 | No Open Graph title/description metadata and no `robots.txt`. | **Partially fixed**: unique static-page `og:title`, `og:description`, `og:locale`, `og:site_name`, `twitter:card`; generic metadata on `project.html` updated client-side per project; valid minimal `robots.txt`. Canonical URLs and a production sitemap cannot be set until the actual hostname is known. |
| M-06 | Image asset path validation in `data.js` accepted any string prefixed with `assets/images/`, including malformed/traversal-like paths. | **Fixed** with a local relative WebP path whitelist plus informative thumbnail alt checks. No source data modified. |
| M-07 | `project.html?id=...` relies on client JavaScript for a unique project title/description/OG. Social preview scrapers that do not run JS may see only generic metadata. | **Open known architectural constraint**, not fixed by adding fake pre-rendered URLs. A static per-project export or edge-generated OG would be necessary if distinct link previews/indexing become a hard requirement; either requires changing the agreed single-file query-based delivery strategy. |
| M-08 | Many local Demo illustrations share similar architectural compositions. | **Open editorial-quality risk.** All are correctly labeled illustrations/Concept, but licensed/approved distinct architectural images are recommended before using this as a photo-led luxury portfolio. Image substitution requires approved imagery and should not be fabricated as real client work. |

### Minor

| ID | Observed issue | Fix / status |
|---|---|---|
| m-01 | Small brand caption sizes were under 10px on narrow devices. | **Fixed** by increasing `brand__caption` sizes in CSS. |
| m-02 | `aria-live=polite` on the entire projects grid risked announcing a large re-render of 12 cards in addition to the result counter. | **Fixed** by keeping the result count as the live `role=status` and leaving grid updates non-live; Error/Empty still get their own live message. |
| m-03 | Thumbnails container had `aria-label` without a semantic group role. | **Fixed** with `role=group` in `components/gallery.js`. |
| m-04 | Remote font delivery, image painting on physical mobile devices, screen-reader announcements and Safari/Firefox dialogs were not exercised. | **Unverified**; manual acceptance required. |
| m-05 | Sitemap, absolute canonical, absolute `og:image`, published domain and verified HTTPS sharing cards are pending actual deployment URL. | **Deferred intentionally**; no fictitious hostname inserted. |

## 2. Static/design results

- Exact base colors preserved: `#F8F7F3`, `#FFFFFF`, `#EFECE4`, `#14212E`, `#0D1620`, `#1D2E3F`, `#C89A65`, `#B0834F`.
- Verified WCAG normal text AA **for the following explicit token pairs only**: muted/page 5.91:1; muted/white 6.33:1; dark-brass/white 7.07:1; brass/navy 6.42:1; brass/deep 7.17:1; deep/brass-hover 5.38:1; inverse-muted/navy 12.24:1. This is not a universal pixel-by-pixel contrast test over images.
- All six pages include `lang="ar" dir="rtl"`, a single H1, skip link, semantic `<main>`, `<title>`, unique description, Google Fonts URL for Space Grotesk/Inter/IBM Plex Sans Arabic, shared SVG sprite and local relative assets. CSS `font-family`/radius computed in the Chromium in-memory harness.
- SVG sprite parses and has 25 symbols; all referenced service icons exist; no Emoji was found in runtime HTML, JS or CSS. Width/height metadata matched all JSON gallery assets. 36 WebP files total approximately 517 KiB; home critical image uses `fetchpriority="high"`. These numbers are asset sizes, **not** a measured Lighthouse score or LCP time.
- No actual `localStorage` or `sessionStorage` API calls in production JS. The quote remains in memory and never posts to a backend. No server endpoint is present.
- All local production asset URLs are relative (not `/assets/...`), making the structure compatible with root hosting and a GitHub Pages subpath. This is static-path validation, **not** a live deployment test.

## 3. Automated evidence actually executed

| Test | Result |
|---|---|
| `python tests/validate_static.py` | PASS: six pages, 12 projects, 6 services, 8 FAQs, five steps, four testimonials, local files, JSON and sprite IDs |
| `node --test tests/logic.test.mjs` | PASS: 6/6 pure-function tests |
| `node --check` on each JavaScript module | PASS |
| `python tests/interactive_browser_qa.py` | PASS: previous 51 browser interaction assertions in **in-memory Chromium** |
| `python tests/phase_e_acceptance.py` | PASS: 60 responsive page-width cases, 6 semantic page checks, seven contrast pairs, form-field ARIA errors, unknown-ID recovery, **in-memory Chromium** |
| `python tests/http_smoke.py` | PASS: 68 HTML/CSS/JS/JSON/SVG/WebP assets returned HTTP 200 to Python HTTP client |
| `robots.txt` via Python HTTP | PASS: HTTP 200 |
| Static image integrity & no Emoji / no root-absolute assets / no storage writes | PASS |
| Chromium navigation to localhost | **BLOCKED BY ENVIRONMENT**: `net::ERR_BLOCKED_BY_ADMINISTRATOR` |
| External Google Fonts fetch/render | **NOT VERIFIED** |
| Live Cloudflare/GitHub Pages deployment and HTTPS | **NOT VERIFIED** |
| Lighthouse/Web Vitals | **NOT RUN** |
| Safari, Firefox, VoiceOver, NVDA, physical touch device | **NOT RUN** |

Chromium screenshots of the in-memory layout were captured at 330, 375 and 1440 px (`PHASE-E-*.png`). This is a visual QA aid only.

## 4. Manual acceptance tests before release

1. Run `python -m http.server 5500` from repository root on a normal machine. Navigate in **Chrome** to `http://localhost:5500/` and each of the five other pages directly. Refresh each page. Confirm all resource requests are HTTP 200 (no Console errors and no 404). Check `robots.txt` directly.
2. Repeat from a **subdirectory** such as `https://USERNAME.github.io/buildora-construction/` (after deployment). Verify relative CSS, ES modules, JSON and `sprite.svg#icon-*` requests, Back/Forward and direct `project.html?id=project-001` URLs.
3. In DevTools > Network (Disable cache), verify `fonts.googleapis.com` CSS and `fonts.gstatic.com` font files load. Inspect computed fonts on Arabic/English text: Space Grotesk for the brand and Western digits, Inter for English UI/body, IBM Plex Sans Arabic for Arabic letters. Retry with font/network blocking and verify readable fallback.
4. Test widths 1440, 1366, 1200, 1024, 992, 768, 576, 480, 375, 330px for every page and filter view. Confirm no overflow, overlapping sticky header, unreadable text or clipped buttons. Also test 200%/400% browser zoom, large default text and Windows scaling.
5. Use keyboard **only**: skip link, header navigation/mobile menu (Tab, Shift+Tab, Enter, Escape), all filter buttons and result counts, accordion `aria-expanded`, Lightbox focus trap/restore, next/previous arrows, Before/After range Home/End and arrow keys. Confirm white focus outline is visible in the dark modal/hero.
6. Visit `projects.html?category=invalid` and reset; `project.html?id=unknown` and use the explicit recovery link; `project.html?id=project-002` (no Before/After). Simulate one failed image and an interrupted/malformed JSON fetch; expect readable fallback/Error + Retry.
7. Submit blank and invalid Quote (name under two characters, nonexistent service, area ≤ 0, area >100000, empty budget, short description). Check field-specific messages, `aria-invalid`, summary, focus, and reader announcements. Submit **fictional** valid values; test Preview → Edit → Finish → Restart. Confirm no data request or Browser Storage entries.
8. Verify a published HTTPS URL in incognito and on a mobile device. Generate real sitemap/canonical/absolute social image URLs **only after** hostname is finalized. Test sharing cards. Social crawlers may not see JS-updated per-project OG: decide whether a static-per-project export is required before search indexing.
9. Use screen-reader testing (NVDA + Firefox/Chrome; VoiceOver + Safari) and run Lighthouse on a real deployed build. Record date, device, network, metrics and unresolved findings; do not invent a score.
10. Review all 12 local architectural illustrations for originality and suitability. If replacing Demo artwork with photography, confirm license/source and never describe generated concepts as real executed projects.

## 5. Release disposition

**Stage E code corrections are complete for the defects listed as Fixed.** No confirmed code-blocker was reproduced. **Production release is NOT signed off** because browser-over-HTTP E2E, remote font rendering, cross-browser/screen-reader, deployed HTTPS and production SEO identity remain unverified. The next stage should explicitly close those gates rather than treating synthetic DOM tests as live-site success.
