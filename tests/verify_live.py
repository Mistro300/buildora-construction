"""Verify that a published BUILDORA origin serves the required static assets."""

from __future__ import annotations

import argparse
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit, urlunsplit
from urllib.request import Request, urlopen

RESOURCES = (
    'index.html', 'services.html', 'projects.html', 'project.html?id=project-001',
    'about.html', 'contact.html', 'favicon.svg', 'robots.txt',
    'assets/js/components/icons.js', 'assets/css/tokens.css',
    'assets/js/app.js', 'assets/data/projects.json',
    'assets/data/services.json', 'assets/images/hero-residence.webp',
)


def check(origin: str, *, allow_http_local: bool = False) -> None:
    parts = urlsplit(origin)
    local = parts.hostname in {'127.0.0.1', 'localhost'}
    if parts.scheme != 'https' and not (allow_http_local and local and parts.scheme == 'http'):
        raise ValueError('Expected an HTTPS site URL (HTTP permitted only for localhost test).')
    if not parts.netloc or parts.query or parts.fragment:
        raise ValueError('Supply the base origin, optionally including a subdirectory, without query/fragment.')
    base = urlunsplit((parts.scheme, parts.netloc, (parts.path or '/').rstrip('/') + '/', '', ''))
    errors: list[str] = []
    for relative in RESOURCES:
        target = urljoin(base, relative)
        try:
            request = Request(target, headers={'User-Agent': 'BUILDORA-static-deployment-check/1.0'})
            with urlopen(request, timeout=12) as response:
                payload = response.read()
                if response.status != 200 or not payload:
                    errors.append(f'{relative}: HTTP {response.status} or empty response')
                    continue
                content_type = response.headers.get('Content-Type', '').lower()
                if relative.endswith('.json') and 'json' not in content_type:
                    errors.append(f'{relative}: unexpected Content-Type {content_type}')
                if relative.endswith('.html') and 'html' not in content_type:
                    errors.append(f'{relative}: unexpected Content-Type {content_type}')
                print(f'PASS {response.status}: {relative}')
        except (HTTPError, URLError, TimeoutError) as exc:
            errors.append(f'{relative}: {exc}')
    if errors:
        raise SystemExit('Live verification FAILED:\n' + '\n'.join(errors))
    print(f'LIVE STATIC SMOKE PASS: {len(RESOURCES)} files from {base}')
    print('Still verify JS interactions, fonts, accessibility, and browser console manually.')


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('site_url', help='Real deployed HTTPS base URL, ending with / for subpath')
    parser.add_argument('--allow-http-local', action='store_true', help='For testing this verifier against localhost only')
    args = parser.parse_args()
    check(args.site_url, allow_http_local=args.allow_http_local)


if __name__ == '__main__':
    main()
