# BUILDORA — Phase D: JavaScript interactions and accessibility QA

**Date:** 2026-11-22  
**Source:** Stage C project and mandatory `01-buildora-construction-GUIDE.md`.  
**Scope:** Only the five agreed client-side behaviors; no new pages, external APIs, build step, backend or persistence.

## Implemented changes

1. **Project filtering:** `filterProjects()` is deterministic and exports an independently testable function. All four categories preserve `aria-pressed`, result count and Query String state. Unknown categories remain visible as an Empty State with a working Reset button. Loading, invalid JSON and Retry are handled by existing data/status modules.
2. **Gallery / Lightbox:** Native `<dialog>.showModal()`, Close/Next/Previous, ArrowLeft/ArrowRight, Escape, a constrained Tab cycle, and focus restoration to the launching control. A single-image gallery disables Next/Previous; a failed image gets an accessible fallback. The enlarged image is loaded when the dialog opens rather than during initial project rendering.
3. **Before/After:** Native `input[type="range"]` handles keyboard arrows, Home/End and touch. `aria-valuetext` describes the selected percentage. The comparison only appears where both conceptual images exist. Dimensions are taken from JSON and visual fallbacks are provided for failed assets.
4. **Accordion:** Each button has `aria-expanded`, `aria-controls` and a unique ID. Each associated `role="region"` has `aria-labelledby`; only one item is expanded in a host at a time. Enter/Space use built-in button keyboard behavior.
5. **Quote demo:** Pure `validateQuote()` with bounded name/description, an available-service check, finite numerical area between 1 and 100000, and whitelisted budget. Inline `aria-invalid` and custom validation messages; focus moves to first invalid field. Valid values go to Preview/Edit/Finish only, and are cleared on Finish. No request, storage, e-mail or server submission occurs.

## Automated test commands

Run from the project root:

```bash
python tests/validate_static.py
python tests/http_smoke.py
node --test tests/logic.test.mjs
python tests/interactive_browser_qa.py
```

`interactive_browser_qa.py` requires **development-only** Python packages `playwright`, `beautifulsoup4`, `lxml` and a Chromium executable at `/usr/bin/chromium` (adjust the test launcher path for your machine). This harness loads the actual HTML, CSS, JavaScript bodies and JSON content into Chromium, with local images as data URLs and a fetch stub. Do not confuse that with an actual browser navigating to localhost.

## Verified results

| Check | Result |
|---|---|
| Static HTML/assets/data references & IDs | PASS — 6 pages, 12 projects, 6 services, 8 FAQs, 5 steps, 4 testimonials |
| JavaScript module syntax | PASS — `node --check` for all modules |
| Pure unit tests | PASS — 6 / 6 |
| Chromium scripted interaction assertions | PASS — 51 / 51 |
| HTTP asset smoke test (Python client to Python server) | PASS — 68 / 68 files returned HTTP 200 |
| Invalid category / Reset | PASS |
| Unknown project ID | PASS |
| Missing comparison pair and single gallery photo | PASS |
| Failed gallery image fallback | PASS |
| Invalid JSON / Retry success | PASS |
| Lightbox Escape, arrow keys, focus restoration and Shift+Tab wrap | PASS |
| Slider touch, Home/End/ArrowRight, accessible value | PASS |
| Accordion accessible state | PASS |
| Invalid quote / valid Preview → Edit → Finish → Restart | PASS |
| Quote form sends no request | PASS (only the `services.json` fetch observed in harness) |
| New JavaScript page exceptions in tested flows | None observed |

## Manual acceptance scenarios (real browser)

1. Start `python -m http.server 5500`, then open `http://localhost:5500/projects.html`. Choose each filter; verify the list/count/`aria-pressed`, browser Back/Forward and Reset after `?category=not-a-category`.
2. Open `project.html?id=project-001`. Activate **عرض الصورة مكبرة** using Enter. Navigate images with buttons and arrows; press Shift+Tab/Tab and Escape; verify focus returns to the opener.
3. Open the project's Before/After range. Use Left/Right, Home/End, then drag or tap the range on a touch device. Confirm that the revealed region and announced value change together.
4. Open `project.html?id=project-002`: the Before/After area must be hidden. To test a single image, temporarily reduce `gallery` to one item in a development copy of `projects.json`; previous/next should be disabled.
5. Open `services.html`: expand an accordion by Enter or Space; expand another; the first closes and `aria-expanded`, `aria-controls` and `aria-labelledby` stay consistent.
6. Open `contact.html?service=service-003#quote`. Submit an empty form, then a negative/non-numeric area or description shorter than 15 characters. Confirm the error summary, focus and `aria-invalid`. Fill valid *fictional* details, Preview, Edit, Finish and Restart. Check Network/Storage: no request containing the quote and no saved quote data.
7. Simulate a missing image by changing one gallery image path in a **development copy** of `projects.json` to a nonexistent relative WebP. The gallery and Lightbox should show a legible fallback without breaking the controls.
8. In DevTools request blocking, block `assets/data/projects.json` or return malformed JSON. Confirm Error + Retry; unblock and retry. Separately test unknown ID with `project.html?id=unknown`.
9. Test at 330, 375, 768, 1024 and 1440 px, particularly lightbox keyboard navigation, focus visibility, accordion, range handle and quote error layout.

## Limitations / pending production checks

- Browser navigation to `http://127.0.0.1` is administratively blocked in this execution environment (`ERR_BLOCKED_BY_ADMINISTRATOR`). The successful HTTP smoke test and successful in-memory Chromium DOM tests are **two different checks**, not a complete browser-over-HTTP E2E run.
- Actual loading of external Google Fonts and the external SVG sprite over HTTPS, Firefox/Safari focus behavior, physical touchscreen/screen reader testing and production Lighthouse metrics remain pending Stage E/F.
- Existing `STAGE-C-MANIFEST.sha256` is a historical Stage C record, not the current stage manifest. Use `STAGE-D-MANIFEST.sha256` for this handoff.

## Phase D acceptance

Five interactions are implemented and pass the automated regression cases above. **Phase D can be reviewed**, but production sign-off requires the outstanding real-browser/HTTP and cross-browser checks in Stage E.
