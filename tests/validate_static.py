"""Validate BUILDORA's static links, schema relationships and assets."""

from __future__ import annotations

import json
import re
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.refs: list[tuple[str, str]] = []
        self.h1_count = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if attributes.get('id'):
            self.ids.add(str(attributes['id']))
        if tag == 'h1':
            self.h1_count += 1
        for attribute in ('href', 'src'):
            value = attributes.get(attribute)
            if value:
                self.refs.append((tag, value))


def read_json(name: str) -> object:
    with (ROOT / 'assets/data' / name).open(encoding='utf-8') as handle:
        return json.load(handle)


def main() -> None:
    errors: list[str] = []
    pages = {path.name: path for path in ROOT.glob('*.html')}
    parsed: dict[str, PageParser] = {}
    for name, path in pages.items():
        parser = PageParser()
        parser.feed(path.read_text(encoding='utf-8'))
        parsed[name] = parser
        if parser.h1_count != 1:
            errors.append(f'{name}: expected one H1, got {parser.h1_count}')

    for name, parser in parsed.items():
        for tag, ref in parser.refs:
            parts = urlsplit(ref)
            if parts.scheme or parts.netloc or ref.startswith(('mailto:', 'tel:', 'data:')):
                continue
            target = unquote(parts.path) or name
            target_path = (ROOT / target).resolve()
            if not target_path.is_relative_to(ROOT) or not target_path.is_file():
                errors.append(f'{name}: missing local resource {ref}')
                continue
            if tag == 'a' and parts.fragment and target_path.suffix == '.html':
                target_parser = parsed.get(target_path.name)
                if not target_parser or unquote(parts.fragment) not in target_parser.ids:
                    errors.append(f'{name}: unknown fragment {ref}')

    projects = read_json('projects.json')
    services = read_json('services.json')
    faqs = read_json('faqs.json')
    steps = read_json('process-steps.json')
    testimonials = read_json('testimonials.json')
    expected = [('projects', projects, 12), ('services', services, 6), ('faqs', faqs, 8),
                ('steps', steps, 5), ('testimonials', testimonials, 4)]
    for label, records, count in expected:
        if not isinstance(records, list) or len(records) != count:
            errors.append(f'{label}: expected exactly {count} records')
            continue
        ids = [record.get('id') for record in records]
        if len(ids) != len(set(ids)):
            errors.append(f'{label}: repeated IDs')

    available_icons = set(re.findall(r"'fa-[a-z-]+'", (ROOT / 'assets/js/components/icons.js').read_text(encoding='utf-8')))
    process_ids = {record['id'] for record in steps}
    for service in services:
        if repr(service['icon']) not in available_icons:
            errors.append(f"{service['id']}: missing Font Awesome icon {service['icon']}")
        if not set(service['processSteps']).issubset(process_ids):
            errors.append(f"{service['id']}: unknown process step")
    allowed_categories = {'residential', 'commercial', 'finishing', 'construction'}
    slugs = [project['slug'] for project in projects]
    if len(slugs) != len(set(slugs)):
        errors.append('projects: repeated slugs')
    for project in projects:
        if project['category'] not in allowed_categories:
            errors.append(f"{project['id']}: invalid category")
        images = [project['thumbnail']] + [asset['src'] for asset in project['gallery']]
        before, after = project['beforeImage'], project['afterImage']
        if bool(before) != bool(after):
            errors.append(f"{project['id']}: before/after mismatch")
        for asset in (before, after):
            if asset:
                images.append(asset['src'])
        for image_path in images:
            resolved = (ROOT / image_path).resolve()
            if not resolved.is_relative_to(ROOT) or not resolved.is_file():
                errors.append(f"{project['id']}: missing image {image_path}")
    for testimonial in testimonials:
        if testimonial['isDemo'] is not True:
            errors.append(f"{testimonial['id']}: not labeled demo")

    if errors:
        raise SystemExit('BUILDORA validation failed:\n' + '\n'.join(errors))
    print(f'BUILDORA validation OK: {len(pages)} pages, 12 projects, 6 services, '
          '8 FAQs, 5 steps, 4 testimonials, Font Awesome and local references.')


if __name__ == '__main__':
    main()
