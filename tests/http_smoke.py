"""Check the static site's real HTTP responses without a browser or backend."""

from __future__ import annotations

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]


class SilentHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args: object) -> None:
        pass


def main() -> None:
    files = [
        *ROOT.glob('*.html'),
        *ROOT.glob('assets/css/*.css'),
        *ROOT.glob('assets/js/**/*.js'),
        *ROOT.glob('assets/data/*.json'),
        *ROOT.glob('assets/images/**/*.webp'),
        ROOT / 'favicon.svg',
    ]
    handler = partial(SilentHandler, directory=str(ROOT))
    with ThreadingHTTPServer(('127.0.0.1', 0), handler) as server:
        thread = Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            for file in files:
                path = file.relative_to(ROOT).as_posix()
                with urlopen(f'http://127.0.0.1:{server.server_port}/{path}', timeout=5) as response:
                    if response.status != 200 or not response.read():
                        raise AssertionError(f'Bad HTTP response for {path}: {response.status}')
            print(f'HTTP smoke OK: {len(files)} HTML/CSS/JS/JSON/WebP files returned HTTP 200.')
        finally:
            server.shutdown()
            thread.join(timeout=2)


if __name__ == '__main__':
    main()
