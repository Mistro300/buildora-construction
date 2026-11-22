# BUILDORA — Stage C QA and acceptance

**Date:** 22 November 2026. **Scope:** services/projects/project/about/contact and Local JSON. No claim of live deployment or third-party backend.

## Static checks

- All 6 HTML files have one H1, correct page titles and internal navigation.
- All CSS/JS/image/SVG/HTML referenced paths resolve to local files; no site-root `/assets` paths.
- All ES Modules pass Node `--check`; SVG sprite parses with 25 unique IDs.
- JSON validates in Python: `projects` 12 unique IDs, `services` 6, `faqs` 8, `process-steps` 5, `testimonials` 4, and 1 `site` object.
- Icon identifiers in services match the actual SVG sprite; image paths from Project JSON exist.
- Images are local WebP concept illustrations, not real photographs or construction evidence.

## Chromium interaction verification (in-memory harness)

For this environment, navigation to `localhost` / a synthetic HTTPS origin via Chromium was blocked (`ERR_BLOCKED_BY_ADMINISTRATOR`). To test JS interactions, the QA harness loaded actual HTML with CSS and SVG inserted inline, replaced local images with Data URIs, and answered `fetch` from the actual JSON file contents in memory. These are **real browser DOM/interaction tests** of the code, but **not HTTP end-to-end tests**.

| Test | Result |
|---|---|
| All projects present (12) | Passed |
| Filter construction → 3, reset → 12 | Passed |
| Unknown `?id=unknown` → Not Found | Passed |
| Existing project detail and linked metadata | Passed |
| Gallery opens modal, Escape closes | Passed |
| Before/After range changes to 78 | Passed |
| Project without Before/After hides slider | Passed |
| Services 6 and FAQs 8 loaded from JSON | Passed |
| Accordion opens and updates `aria-expanded` | Passed |
| About 4 visibly labelled demo quotes | Passed |
| Contact 7 service select options including placeholder | Passed |
| Invalid quote input cannot enter Preview | Passed |
| Valid quote → Preview → Edit → Preview → Finish | Passed |
| Unrecognized `?category=` → Empty and Reset → 12 | Passed |
| Lazy image loaded after scrolling into view | Passed |
| Mobile nav opened and closed via Escape | Passed |
| Chromium page errors during these normal flows | None observed |

## Responsive geometry

Viewports tested for **projects, project detail, services and contact**: **1440, 1366, 1200, 1024, 992, 768, 576, 480, 375, 330 px**. None reported document-level unintended horizontal overflow in the inline browser harness. Home previously passed the same ten widths in Stage B. About content was visually spot-reviewed, not included in the ten-width automated run.

## Still required before production acceptance

1. Run the whole project via `python -m http.server 5500` on a real browser with unrestricted localhost navigation; verify all CSS/JS/JSON/WebP/SVG requests receive HTTP 200.
2. Confirm external `<use href="assets/icons/sprite.svg#…">` renders in actual HTTP mode on Chrome, Firefox and Safari.
3. Verify loading of IBM Plex Sans Arabic, Space Grotesk and Inter from Google Fonts or accepted fallbacks.
4. Test with keyboard/Touch device and screen reader (Tab order, focus trap, Range, invalid fields and ARIA).
5. Simulate network errors, malformed JSON and missing image files on served origin; inspect Retry and media fallback.
6. Check Lighthouse / Core Web Vitals on HTTPS deployment; do not invent Lighthouse numbers.
7. Confirm `robots.txt` and `sitemap.xml` with final domain only in Stage F.

**Conclusion:** Stage C functional and static implementation is complete, subject to the above production integration verification and review phases D/E/F.
