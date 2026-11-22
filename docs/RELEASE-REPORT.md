# BUILDORA — Stage F Release Verification Report

**Date:** 2026-11-22. **Baseline:** Stage E (actual local source tree, not reports alone). **Scope of this stage:** Release documents, validation tooling, `.gitignore`, final ZIP. **No visual redesign or modification to the six functional HTML pages, site CSS/JS, SVG Sprite or JSON records.**

## Files created or changed in Stage F

- `README.md` — rewrote outdated Stage D status to describe Stage F, actual test results, limitations, usage and post-deployment controls.
- `CASE-STUDY.md` — new, with an explicit Concept/Demo disclosure, UX goals, design rationale, architecture, documented QA and unverified items.
- `docs/DEPLOYMENT-CHECKLIST.md` — new, with replacement values, exact GitHub → Cloudflare Pages settings, HTTPS tests, incremental updates and rollback.
- `docs/RELEASE-REPORT.md` — this report.
- `tests/release_audit.py` — new local asset/relative-path and icon audit.
- `tests/verify_live.py` — new optional HTTP(S) deployment smoke tool. Post-deploy HTTPS test has not run because a production URL was not provided.
- `.gitignore` — new, development and personal settings exclusions.
- `STAGE-F-MANIFEST.sha256` — manifest of this Stage F source package (excluding itself).

## Tests rerun against local files

| Test | Actual result | Method and limitation |
|---|---|---|
| `python tests/validate_static.py` | PASS | 6 HTML pages, 12 projects, 6 services, 8 FAQs, 5 steps, 4 Demo quotes, local references and SVG associations |
| `node --test tests/logic.test.mjs` | PASS — 6/6 | Logic/validation tests; not browser integration |
| `python tests/http_smoke.py` | PASS — 68/68 | Real responses from Python localhost HTTP server via urllib; not public HTTPS |
| `python tests/phase_e_acceptance.py` | PASS — 60/60 responsive layout cases | Chromium in-memory testing; not browser over HTTP |
| `python tests/interactive_browser_qa.py` | PASS | Chromium in-memory functional regression suite; not HTTP E2E |
| `python tests/release_audit.py` | PASS | 6 root pages, paths in HTML/JS/CSS, 25 SVG symbols, 45 HTML icon uses, JSON syntax, Arabic RTL |
| `tests/verify_live.py` against local HTTP | PASS — 14/14 files at root **and** 14/14 files under `/buildora-construction/` | Verifier self-test with `--allow-http-local`, not public HTTPS |
| Chromium `page.goto(http://127.0.0.1:PORT/projects.html)` | BLOCKED | Explicit error: `net::ERR_BLOCKED_BY_ADMINISTRATOR`; site browser-over-HTTP not verified |
| Cloudflare HTTPS / Lighthouse / Search Console | **NOT RUN** | No deployed production origin, credentials, or completed network browse available |

## Path / host readiness

- `index.html` and five other HTML pages are in repository root.
- No root-absolute HTML/JS/CSS paths detected by the release audit; WebP/SVG/JSON live under relative `assets/` paths.
- `assets/icons/sprite.svg` is local with 25 symbols; HTML references use local `assets/icons/sprite.svg#...`.
- `site.json` contains `contact@example.com`, a clearly labeled inactive Demo address, not a verified live contact.
- `robots.txt` exists and allows indexing; `sitemap.xml`, absolute OG image, canonical/`og:url` have **not** been generated without a production origin. Do not claim these are complete.
- Cloudflare Pages settings: no framework, blank build command, output `.`, root `.`.
- Final ZIP stores `index.html` at its **ZIP root**, for extraction directly into the Git repository root or static site directory.

## Launch gating decisions

**Approved for:** controlled static Concept Demo handoff and initial Git/Cloudflare deployment attempt. **Not signed off as production-verified** until HTTPS direct-navigation, browser console, Google Fonts/network, mobile keyboard/touch and Lighthouse checks are run on actual deployment; SEO origin-dependent fields must be finalized if indexing is desired.

**Design/communications limitations:** local pictures are conceptual WebP illustrations rather than evidence of real constructed projects, so retain visible Demo labeling. Social scrapers may not render per-project `?id` content. A real quote-submission workflow would require a service with validation, storage and privacy review, outside the current static-only scope.

## Stage G addendum (2026-11-22)

This report documents the former Stage F baseline. The active distribution now uses **Zain via Google Fonts** and **Font Awesome Free 6.7.2 via cdnjs**. SVG sprite references, prior icon counts and font checks above are historical rather than current. Verification for Stage G is documented separately in `docs/STAGE-G-TYPOGRAPHY-ICONS.md`.
