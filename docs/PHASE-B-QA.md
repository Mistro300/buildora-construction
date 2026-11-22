# BUILDORA — Stage B QA & handoff

## Scope delivered

- `index.html` in the project root; Arabic `lang=ar` and `dir=rtl`, one H1, semantic sections and accessible navigation.
- Five CSS modules, 25 Lucide-style SVG symbols, local favicon and four original illustrative WebP assets.
- Shared Header/Footer, sticky Header scroll styling, mobile navigation with Esc/focus loop/backdrop and reduced-motion consideration.
- Six services, three selected example projects, five process steps, metrics, introductory copy and non-operational Demo contact guidance.

## Tests actually run — 22 November 2026

1. **Static:** Node `--check` passed for both ES Modules; SVG sprite parsed as valid XML; 25 unique IDs present.
2. **HTTP (CLI):** `python -m http.server 5500` returned HTTP 200 for `index.html` locally. The project is static and production URLs remain untested.
3. **Chromium layout:** Headless Chromium rendered HTML with CSS, images and SVG icons **inlined in memory** because this environment blocks browser network navigation. It is a genuine browser layout test, **not** an end-to-end HTTP site test.
4. **Viewports:** 1440, 1366, 1200, 1024, 992, 768, 576, 480, 375, 330px tested; no document horizontal overflow at any width.
5. **Images:** Hero and all three project examples loaded in the in-memory browser after scrolling through lazy images; no broken images.
6. **Mobile navigation:** Opening worked at widths <=1024, panel aligned to the right, first menu link received focus after animation start, Esc closed menu, and `aria-expanded` returned to `false`.
7. **Script errors:** No page errors in the in-memory Chromium run.

## Limitations that still need device/deployment testing

- Chromium in this environment cannot navigate to localhost or a synthetic HTTPS origin (`net::ERR_BLOCKED_BY_ADMINISTRATOR`). Verify all asset HTTP 200s, SVG external `<use>` and ES Modules on a real browser-served origin before approving production.
- Google Fonts cannot be downloaded in this environment. The font URLs and CSS stacks are configured but need a visual QA pass with the actual font files loaded.
- The visual previews use fallback fonts and inlined assets. They are evaluation screenshots, not proof of a deployed site.
- Quote form, filters, gallery Lightbox, comparison slider, and Accordions belong to subsequent stages and have not been implemented or tested.
- The five remaining HTML pages and JSON models are deliberately not created in this stage.

## Stage B acceptance for a local reviewer

- Open `index.html` using the local server, not `file://`.
- Confirm successful network requests for Google Fonts (or system fallbacks), CSS, JS Modules, WebP, favicon and `sprite.svg`.
- Verify all navigation points to valid Home anchors; inspect links and keyboard focus.
- Resize through all ten target widths and inspect overflow, CTA contrast, Logo, Menu and footer.
- Toggle menu with keyboard, Escape, outside click and a link click; verify scrolling is restored.
- Inspect image alternatives and demo disclaimer. No real contact form exists yet by design.

## Static validation snapshot

- 1 H1; 19 unique HTML element IDs; 63 local file/fragment references resolved.
- 6 service cards, 3 featured project cards, 5 visible workflow steps.
- 25 unique icon symbol IDs and four valid locally generated WebP images.
- Approximate computed WCAG contrast ratios: muted text on white **6.33:1**, dark brass text on warm page **6.59:1**, accent brass on navy **6.42:1**, navy text on brass background **7.17:1**.
- No raw Emoji code points in HTML, CSS or JS files. Code comments are in English.
