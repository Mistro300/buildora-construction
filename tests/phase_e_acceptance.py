"""Phase E layout and accessibility smoke checks in an in-memory Chromium harness.

This cannot validate Google Fonts delivery, HTTP browser navigation, live HTTPS,
web crawlers or assistive technology. Use the manual checklist for those checks.
"""

from __future__ import annotations

import math
import re
from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from interactive_browser_qa import ROOT, STYLES, IMAGE_MAP, page_for

WIDTHS = [1440, 1366, 1200, 1024, 992, 768, 576, 480, 375, 330]
PAGES = ['index.html', 'services.html', 'projects.html', 'project.html', 'about.html', 'contact.html']
SCREENSHOTS = {('index.html', 330), ('projects.html', 375), ('contact.html', 1440)}


def luminance(hexcode: str) -> float:
    channels = [int(hexcode[i:i+2], 16) / 255 for i in (1, 3, 5)]
    linear = [c / 12.92 if c <= .04045 else ((c + .055) / 1.055)**2.4 for c in channels]
    return sum(w * c for w, c in zip((.2126, .7152, .0722), linear))


def contrast(a: str, b: str) -> float:
    x, y = luminance(a), luminance(b)
    return (max(x, y) + .05) / (min(x, y) + .05)


def home_page(browser, width: int):
    html = BeautifulSoup((ROOT / 'index.html').read_text(encoding='utf-8'), 'lxml')
    for tag in html.find_all(['link', 'script']):
        tag.decompose()
    style = html.new_tag('style')
    style.string = STYLES
    html.head.append(style)
    for img in html.find_all('img'):
        if img.get('src') in IMAGE_MAP:
            img['src'] = IMAGE_MAP[img['src']]
    page = browser.new_page(viewport={'width': width, 'height': 900})
    page.set_content(str(html), wait_until='domcontentloaded')
    return page, []


def main():
    core_pairs = {
        'muted on page': ('#55616D', '#F8F7F3'),
        'muted on white': ('#55616D', '#FFFFFF'),
        'dark brass on white': ('#77502E', '#FFFFFF'),
        'brass on navy': ('#C89A65', '#14212E'),
        'brass on deep navy': ('#C89A65', '#0D1620'),
        'navy on brass-hover': ('#0D1620', '#B0834F'),
        'inverse muted on navy': ('#D9E0E6', '#14212E'),
    }
    for label, (foreground, background) in core_pairs.items():
        ratio = contrast(foreground, background)
        assert ratio >= 4.5, f'{label} fails AA with {ratio:.2f}:1'
        print(f'PASS contrast {label}: {ratio:.2f}:1')

    for name in PAGES:
        text = (ROOT / name).read_text(encoding='utf-8')
        html = BeautifulSoup(text, 'lxml')
        assert html.html.get('lang') == 'ar' and html.html.get('dir') == 'rtl'
        assert len(html.select('h1')) == 1 and html.select_one('main')
        assert html.select_one('a.skip-link[href="#main-content"]')
        assert len(html.select('link[href*="fonts.googleapis.com/css2"]')) == 1
        assert html.select_one('meta[property="og:title"]')
        assert html.select_one('meta[property="og:description"]')
        assert html.select_one('meta[name="twitter:card"]')
        assert not re.search(r'href="(?:/assets/|#)"', text)
        assert not html.select('use[href]')
        assert html.select('i.fa-solid')
        assert html.select_one('link[href*=font-awesome]')
        for field in html.select('input,select,textarea'):
            assert field.get('id') and html.select_one(f'label[for="{field.get("id")}"]')
        for img in html.select('img'):
            assert img.has_attr('alt') and int(img['width']) > 0 and int(img['height']) > 0
        print('PASS semantic HTML', name)

    with sync_playwright() as engine:
        browser = engine.chromium.launch(executable_path='/usr/bin/chromium', headless=True,
                                         args=['--no-sandbox', '--disable-dev-shm-usage'])
        try:
            measurements = 0
            for name in PAGES:
                for width in WIDTHS:
                    if name == 'index.html':
                        page, errors = home_page(browser, width)
                    else:
                        query = '?id=project-001' if name == 'project.html' else ''
                        page, errors = page_for(browser, name, query, width=width)
                        if name == 'projects.html':
                            page.locator('#projects-grid article').first.wait_for(timeout=5000)
                        elif name == 'project.html':
                            page.locator('.gallery__open').first.wait_for(timeout=5000)
                        elif name == 'contact.html':
                            page.locator('#quote-form-wrapper').wait_for(state='visible', timeout=5000)
                        elif name == 'services.html':
                            page.locator('.service-detail').first.wait_for(timeout=5000)
                        elif name == 'about.html':
                            page.locator('.quote-card').first.wait_for(timeout=5000)
                    layout = page.evaluate('''() => ({
                        document: document.documentElement.scrollWidth,
                        viewport: innerWidth,
                        font: getComputedStyle(document.querySelector('h1')).fontFamily,
                        radius: getComputedStyle(document.querySelector('.button')).borderTopLeftRadius,
                    })''')
                    assert layout['document'] <= width + 1, f'{name} {width}px horizontal overflow: {layout}'
                    assert 'Zain' in layout['font']
                    assert float(layout['radius'].rstrip('px')) <= 8
                    assert not errors, f'{name} page exception: {errors}'
                    if name == 'index.html' and width == 330:
                        first_stat = page.locator('.overview-strip__item').first
                        assert first_stat.evaluate('(el) => getComputedStyle(el).display') == 'flex'
                    if (name, width) in SCREENSHOTS:
                        screenshot = ROOT / 'docs' / f'PHASE-E-{name.removesuffix(".html")}-{width}.png'
                        page.screenshot(path=str(screenshot), full_page=True)
                    measurements += 1
                    page.close()
                print('PASS responsive layout', name, '10 widths')
            page, errors = page_for(browser, 'contact.html', width=375)
            page.locator('#quote-form-wrapper').wait_for(state='visible')
            page.locator('#quote-form button[type=submit]').click()
            assert page.locator('#quote-name-error').is_visible()
            assert 'quote-name-error' in page.locator('#quote-name').get_attribute('aria-describedby')
            page.locator('#quote-name').fill('مستخدم تجريبي')
            assert page.locator('#quote-name-error').is_hidden()
            assert not errors
            print('PASS per-field validation feedback and accessible descriptions')
            page.close()

            page, errors = page_for(browser, 'project.html', '?id=unknown', width=375)
            page.locator('#project-detail .state-message--empty').wait_for()
            assert page.locator('#project-detail a[href="projects.html"]').is_visible()
            assert page.title() == 'المشروع غير موجود | BUILDORA'
            assert not errors
            print('PASS unknown project recovery link and document title')
            page.close()

            print(f'PASS ALL {measurements} responsive browser layout cases (in-memory harness, not HTTP E2E)')
        finally:
            browser.close()


if __name__ == '__main__':
    main()
