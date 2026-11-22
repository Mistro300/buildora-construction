"""Browser interaction regression for BUILDORA when localhost is blocked.

Uses the real HTML/CSS/JS and actual JSON with an in-memory fetch adapter.
This validates browser interactions, not HTTP integration or remote font loading.
Dependencies (development only): playwright, beautifulsoup4, lxml and Chromium.
"""

from __future__ import annotations

import base64
import copy
import json
import re
from pathlib import Path

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
IMAGE_MAP = {
    path.relative_to(ROOT).as_posix(): 'data:image/webp;base64,' + base64.b64encode(path.read_bytes()).decode()
    for path in (ROOT / 'assets/images').rglob('*.webp')
}
STYLES = '\n'.join((ROOT / 'assets/css' / name).read_text(encoding='utf-8') for name in (
    'tokens.css', 'base.css', 'components.css', 'pages.css', 'responsive.css',
))
STYLES = STYLES.replace("url('../images/hero-residence.webp')", f"url('{IMAGE_MAP['assets/images/hero-residence.webp']}')")
DATA = {file.name: json.loads(file.read_text(encoding='utf-8')) for file in (ROOT / 'assets/data').glob('*.json')}
MODULES = (
    'assets/js/components/icons.js',
    'assets/js/data.js',
    'assets/js/components/dom.js',
    'assets/js/components/quote-validation.js',
    'assets/js/components/accordion.js',
    'assets/js/components/gallery.js',
    'assets/js/components/comparison.js',
    'assets/js/ui.js',
    'assets/js/pages/projects.js',
    'assets/js/pages/project.js',
    'assets/js/pages/services.js',
    'assets/js/pages/about.js',
    'assets/js/pages/contact.js',
)


def bundle() -> str:
    source = []
    for name in MODULES:
        content = (ROOT / name).read_text(encoding='utf-8')
        content = re.sub(r'^import .*?;\s*$', '', content, flags=re.M)
        content = content.replace('export async function ', 'async function ')
        content = content.replace('export function ', 'function ')
        content = content.replace('export const ', 'const ')
        if name.endswith('/dom.js'):
            content = content.replace('attrs: { src, alt, width, height, loading, decoding:',
                                      'attrs: { src: window.__assetMap[src] || src, alt, width, height, loading, decoding:')
        source.append(content)
    return '\n'.join(source).replace('new URLSearchParams(location.search)',
                                     'new URLSearchParams(window.__qaSearch || location.search)')


BUNDLE = bundle()


def page_for(browser, filename: str, query: str = '', *, width: int = 1280, data=None):
    page = browser.new_page(viewport={'width': width, 'height': 900}, has_touch=True)
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    raw = (ROOT / filename).read_text(encoding='utf-8')
    soup = BeautifulSoup(raw, 'lxml')
    for tag in soup.find_all(['link', 'script']):
        tag.decompose()
    style = soup.new_tag('style')
    style.string = STYLES
    soup.head.append(style)
    for img in soup.find_all('img'):
        source = img.get('src')
        if source in IMAGE_MAP:
            img['src'] = IMAGE_MAP[source]
    page.set_content(str(soup), wait_until='domcontentloaded')
    page.evaluate('''({data, assets, query}) => {
      window.__qaSearch = query;
      window.__mockData = data;
      window.__assetMap = assets;
      window.__fetchCalls = [];
      window.fetch = async (url) => {
        const file = String(url).split('/').pop();
        window.__fetchCalls.push(file);
        if (!(file in window.__mockData)) return new Response('', {status:404});
        const value = window.__mockData[file];
        if (value === '__INVALID_JSON__') return new Response('{invalid', {status:200});
        if (value === '__HTTP_ERROR__') return new Response('Offline', {status:503});
        return new Response(JSON.stringify(value), {status:200,headers:{'Content-Type':'application/json'}});
      };
      window.history.pushState = (state, unused, path) => {
        window.__qaSearch = new URL(String(path)).search;
      };
    }''', {'data': copy.deepcopy(data if data is not None else DATA), 'assets': IMAGE_MAP, 'query': query})
    class_name = {
        'projects.html': 'initializeProjects', 'project.html': 'initializeProject',
        'services.html': 'initializeServices', 'about.html': 'initializeAbout',
        'contact.html': 'initializeContact',
    }[filename]
    page.add_script_tag(content=BUNDLE + f'\ninitializeNavigation(); {class_name}();')
    return page, errors


def check(condition, message):
    if not condition:
        raise AssertionError(message)
    print('PASS', message)


def run() -> None:
    with sync_playwright() as engine:
        browser = engine.chromium.launch(executable_path='/usr/bin/chromium', headless=True,
                                         args=['--no-sandbox', '--disable-dev-shm-usage'])
        try:
            page, errors = page_for(browser, 'projects.html')
            page.locator('#projects-grid article').first.wait_for()
            check(page.locator('#projects-grid article').count() == 12, '12 projects rendered')
            page.locator('[data-category="finishing"]').click()
            check(page.locator('#projects-grid article').count() == 3, 'filter returns three finishing projects')
            check(page.locator('[data-category="finishing"]').get_attribute('aria-pressed') == 'true', 'filter ARIA state')
            page.locator('[data-category="all"]').click()
            check(page.locator('#projects-grid article').count() == 12, 'all filter resets project list')
            check(not errors, f'projects has no page exceptions: {errors}')
            page.close()

            page, errors = page_for(browser, 'projects.html', '?category=not-a-category')
            page.locator('.state-message--empty').wait_for()
            check(page.locator('#projects-grid article').count() == 0, 'unknown category shows Empty State')
            page.get_by_role('button', name='عرض كل المشاريع').click()
            check(page.locator('#projects-grid article').count() == 12, 'Empty State reset button works')
            check(not errors, f'unknown category has no page exceptions: {errors}')
            page.close()

            page, errors = page_for(browser, 'projects.html', data={**DATA, 'projects.json': '__INVALID_JSON__'})
            page.locator('.state-message--error').wait_for()
            check(page.locator('.state-message--error button').count() == 1, 'invalid JSON shows Retry')
            page.evaluate('window.__mockData["projects.json"] = arguments[0]', DATA['projects.json']) if False else None
            page.evaluate('(records)=> {window.__mockData["projects.json"] = records}', DATA['projects.json'])
            page.get_by_role('button', name='إعادة المحاولة').click()
            page.locator('#projects-grid article').first.wait_for()
            check(page.locator('#projects-grid article').count() == 12, 'Retry recovers after invalid JSON')
            check(not errors, f'invalid JSON handled without exceptions: {errors}')
            page.close()

            page, errors = page_for(browser, 'project.html', '?id=unknown')
            page.locator('#project-detail .state-message--empty').wait_for()
            check(page.locator('#project-content').is_hidden(), 'unknown project shows Not Found')
            check(not errors, f'unknown project has no page exceptions: {errors}')
            page.close()

            records = copy.deepcopy(DATA)
            records['projects.json'][1]['gallery'] = records['projects.json'][1]['gallery'][:1]
            page, errors = page_for(browser, 'project.html', '?id=project-002', data=records)
            page.locator('.gallery__open').wait_for()
            check(page.locator('#comparison-section').is_hidden(), 'no Before/After pair hides comparison')
            page.locator('.gallery__open').click()
            check(page.locator('.lightbox__control[aria-label="الصورة التالية"]').is_disabled(), 'single-photo next disabled')
            page.keyboard.press('Escape')
            check(not page.locator('dialog.lightbox').evaluate('(dialog)=>dialog.open'), 'Escape closes single-photo lightbox')
            check(not errors, f'single image project no page exceptions: {errors}')
            page.close()

            page, errors = page_for(browser, 'project.html', '?id=project-001')
            page.locator('.gallery__open').wait_for()
            button = page.locator('.gallery__open')
            button.focus()
            button.click()
            dialog = page.locator('dialog.lightbox')
            check(dialog.evaluate('(d)=>d.open'), 'lightbox opens as modal')
            check(page.evaluate('document.activeElement.getAttribute("aria-label")') == 'إغلاق المعرض', 'lightbox focus starts at Close')
            page.keyboard.press('Shift+Tab')
            check(page.evaluate('document.activeElement.getAttribute("aria-label")') == 'الصورة التالية', 'Shift+Tab wraps focus')
            page.keyboard.press('ArrowLeft')
            check(page.locator('.lightbox__counter').inner_text() == '2 / 2', 'ArrowLeft changes lightbox image')
            page.keyboard.press('Escape')
            check(not dialog.evaluate('(d)=>d.open'), 'Escape dismisses modal')
            check(page.evaluate('document.activeElement.classList.contains("gallery__open")'), 'focus returns to gallery opener')
            range_control = page.locator('#project-comparison input[type=range]')
            range_control.focus()
            page.keyboard.press('End')
            check(range_control.input_value() == '100', 'native slider keyboard End reaches 100')
            check(range_control.get_attribute('aria-valuetext').startswith('100%'), 'slider exposes value to assistive technology')
            page.keyboard.press('Home')
            check(range_control.input_value() == '0', 'native slider keyboard Home reaches 0')
            page.keyboard.press('ArrowRight')
            check(range_control.input_value() == '1', 'native slider arrow key increments')
            range_control.scroll_into_view_if_needed()
            bounds = range_control.bounding_box()
            page.touchscreen.tap(bounds['x'] + bounds['width'] * 0.75, bounds['y'] + bounds['height'] / 2)
            check(int(range_control.input_value()) > 25, 'native slider responds to touchscreen tap')
            check(not errors, f'detail interactions no page exceptions: {errors}')
            page.close()

            records = copy.deepcopy(DATA)
            records['projects.json'][0]['gallery'][1]['src'] = 'assets/images/projects/missing.webp'
            page, errors = page_for(browser, 'project.html', '?id=project-001', data=records)
            page.locator('.gallery__open').wait_for()
            page.locator('.gallery__open').click()
            page.locator('[aria-label="الصورة التالية"]').last.click()
            page.locator('.lightbox__photo .media-fallback').wait_for(timeout=4500)
            check(page.locator('.lightbox__photo .media-fallback').is_visible(), 'failed gallery image shows fallback instead of broken image')
            check(not errors, f'missing image has no JS exceptions: {errors}')
            page.close()

            page, errors = page_for(browser, 'services.html')
            page.locator('#process-accordion .accordion__item').first.wait_for()
            buttons = page.locator('#process-accordion .accordion__toggle')
            buttons.first.focus()
            page.keyboard.press('Enter')
            check(buttons.first.get_attribute('aria-expanded') == 'true', 'accordion opens with Enter')
            panel_id = buttons.first.get_attribute('aria-controls')
            check(page.locator(f'#{panel_id}').get_attribute('aria-labelledby') == buttons.first.get_attribute('id'), 'accordion region labeled by toggle')
            buttons.nth(1).click()
            check(buttons.first.get_attribute('aria-expanded') == 'false', 'accordion closes previous panel')
            check(buttons.nth(1).get_attribute('aria-expanded') == 'true', 'accordion opens next panel')
            check(not errors, f'accordion no page exceptions: {errors}')
            page.close()

            page, errors = page_for(browser, 'contact.html')
            page.locator('#quote-form-wrapper').wait_for(state='visible')
            page.locator('#quote-form button[type=submit]').click()
            check(page.locator('#quote-error').is_visible(), 'empty form shows validation summary')
            check(page.locator('#quote-name').get_attribute('aria-invalid') == 'true', 'invalid name marked for screen readers')
            check(page.evaluate('document.activeElement.id') == 'quote-name', 'first invalid field receives focus')
            check(page.locator('#quote-preview').is_hidden(), 'invalid form does not show Preview')
            page.locator('#quote-name').fill('عميل تجريبي')
            page.locator('#quote-service').select_option('service-003')
            page.locator('#quote-area').fill('-1')
            page.locator('#quote-budget').select_option('undecided')
            page.locator('#quote-description').fill('وصف تفصيلي لتجربة تطوير التصميم والمساحات الداخلية.')
            page.locator('#quote-form button[type=submit]').click()
            check(page.locator('#quote-area').get_attribute('aria-invalid') == 'true', 'negative area rejected')
            page.locator('#quote-area').fill('220')
            page.locator('#quote-form button[type=submit]').click()
            check(page.locator('#quote-preview').is_visible(), 'valid quote enters Preview')
            check('220 m²' in page.locator('#quote-review-list').inner_text(), 'Preview contains normalized area')
            check(page.evaluate('document.activeElement.id') == 'quote-preview-title', 'Preview heading receives focus')
            page.locator('#quote-edit').click()
            check(page.locator('#quote-name').input_value() == 'عميل تجريبي', 'Edit preserves unsent draft')
            page.locator('#quote-form button[type=submit]').click()
            page.locator('#quote-finish').click()
            check(page.locator('#quote-completed').is_visible(), 'Finish displays Demo completion')
            check(page.locator('#quote-review-list').inner_text() == '', 'Finish clears preview personal values')
            page.locator('#quote-restart').click()
            check(page.locator('#quote-name').input_value() == '', 'Restart clears name')
            check(page.locator('#quote-preview').is_hidden(), 'Restart returns to blank form')
            check(page.evaluate('window.__fetchCalls.every((name)=>name === "services.json")'), 'Quote form makes no submission request')
            check(not errors, f'quote form no page exceptions: {errors}')
            page.close()

            print('ALL BROWSER REGRESSION CHECKS PASSED (in-memory harness; not HTTP E2E)')
        finally:
            browser.close()


if __name__ == '__main__':
    run()
