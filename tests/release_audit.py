"""Audit deployed-root assumptions and local resource portability for BUILDORA."""

from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    'index.html', 'services.html', 'projects.html',
    'project.html', 'about.html', 'contact.html',
)
EXTERNAL_SCHEMES = {'http', 'https', 'mailto', 'tel', 'data'}


class ResourceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[tuple[str, str, str]] = []
        self.html_attrs: dict[str, str | None] = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == 'html':
            self.html_attrs = attributes
        for key in ('src', 'href'):
            if attributes.get(key):
                self.references.append((tag, key, attributes[key] or ''))


def check_reference(owner: Path, target: str, errors: list[str], *, html_asset: bool = False) -> None:
    if target.startswith('//'):
        errors.append(f'{owner.relative_to(ROOT)}: protocol-relative reference {target}')
        return
    parts = urlsplit(target)
    if parts.scheme in EXTERNAL_SCHEMES or parts.netloc:
        if html_asset and parts.scheme == 'http':
            errors.append(f'{owner.relative_to(ROOT)}: insecure HTTP asset {target}')
        return
    if target.startswith('/'):
        errors.append(f'{owner.relative_to(ROOT)}: absolute-root URL incompatible with subpath: {target}')
        return
    if not parts.path:
        return
    path = (owner.parent / unquote(parts.path)).resolve()
    if not path.is_relative_to(ROOT) or not path.is_file():
        errors.append(f'{owner.relative_to(ROOT)}: missing or unsafe resource: {target}')


def main() -> None:
    errors: list[str] = []
    if not (ROOT / 'index.html').is_file():
        errors.append('index.html must be at repository root')
    if sorted(p.name for p in ROOT.glob('*.html')) != sorted(PAGES):
        errors.append('HTML pages do not match the six-page site plan')

    icon_names = set(re.findall(r"'fa-[a-z-]+'", (ROOT / 'assets/js/components/icons.js').read_text(encoding='utf-8')))
    icon_count = 0

    for name in PAGES:
        page = ROOT / name
        parser = ResourceParser()
        parser.feed(page.read_text(encoding='utf-8'))
        if parser.html_attrs.get('lang') != 'ar' or parser.html_attrs.get('dir') != 'rtl':
            errors.append(f'{name}: missing Arabic RTL declaration')
        for tag, key, url in parser.references:
            check_reference(page, url, errors, html_asset=tag in {'script', 'img', 'link'})
        text = page.read_text(encoding='utf-8')
        for classes in re.findall(r'<i\s+class=["\']([^"\']+)["\']', text):
            parts = classes.split()
            if 'fa-solid' not in parts:
                continue
            names = [part for part in parts if part.startswith('fa-') and part != 'fa-solid']
            if len(names) != 1 or repr(names[0]) not in icon_names:
                errors.append(f'{name}: unknown Font Awesome icon {classes}')
            icon_count += 1
        if 'sprite.svg' in text or '<use' in text:
            errors.append(f'{name}: obsolete SVG sprite usage')
        if 'family=Zain:' not in text or 'font-awesome/6.7.2/css/all.min.css' not in text:
            errors.append(f'{name}: missing Zain or Font Awesome stylesheet')

    for script in sorted((ROOT / 'assets/js').rglob('*.js')):
        text = script.read_text(encoding='utf-8')
        for specifier in re.findall(r'''(?:from\s*|import\s*\()\s*['"](\.[^'"]+)['"]''', text):
            check_reference(script, specifier, errors)
        for resource in re.findall(r'''['"](assets/(?:images|data|icons)/[^'"`]+)['"]''', text):
            check_reference(ROOT / 'index.html', resource, errors)

    for css in (ROOT / 'assets/css').glob('*.css'):
        for resource in re.findall(r'url\(\s*["\']?([^\)"\']+)', css.read_text(encoding='utf-8')):
            check_reference(css, resource.strip(), errors, html_asset=True)

    for data_file in (ROOT / 'assets/data').glob('*.json'):
        json.loads(data_file.read_text(encoding='utf-8'))

    if errors:
        raise SystemExit('Release audit FAILED:\n' + '\n'.join(errors))
    print(f'Release audit PASS: {len(PAGES)} root HTML pages, local HTML/JS/CSS paths, '
          f'{len(icon_names)} Font Awesome classes, {icon_count} in-page icons, JSON valid, Arabic RTL.')


if __name__ == '__main__':
    main()
