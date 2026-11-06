#!/usr/bin/env python3
"""Check repository-local Markdown links and parse all JSON exports."""
from pathlib import Path
import json
import re
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
errors = []
links = 0
for doc in ROOT.rglob('*.md'):
    text = doc.read_text()
    # Strip fenced code so example commands/paths are not treated as prose links.
    text = re.sub(r'```.*?```', '', text, flags=re.S)
    for match in re.finditer(r'!?\[[^\]]*\]\(([^)\s]+)\)', text):
        url = match.group(1)
        if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:', url) or url.startswith('#'):
            continue
        target = unquote(url.split('#', 1)[0].split('?', 1)[0])
        if not target:
            continue
        links += 1
        path = (doc.parent / target).resolve()
        if ROOT not in path.parents and path != ROOT:
            errors.append(f'{doc.relative_to(ROOT)}: link leaves repository: {url}')
        elif not path.exists():
            errors.append(f'{doc.relative_to(ROOT)}: missing link: {url}')
json_count = 0
for path in ROOT.rglob('*.json'):
    try:
        json.loads(path.read_text())
        json_count += 1
    except (ValueError, UnicodeError) as exc:
        errors.append(f'{path.relative_to(ROOT)}: {exc}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'Checked {links} local Markdown links and {json_count} JSON files.')
