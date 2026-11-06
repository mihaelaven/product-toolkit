#!/usr/bin/env python3
"""Install selected skills with their examples and companion app assets."""
import argparse
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
APPS = {name: ROOT / 'apps' / name / 'index.html' for name in
        ('call-task-hub', 'capacity-timeline-planner')}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('skills', nargs='*')
    parser.add_argument('--all', action='store_true', help='Install all skills')
    parser.add_argument('--destination', type=Path, default=Path.home() / '.claude' / 'skills')
    parser.add_argument('--overwrite', action='store_true', help='Replace existing skill folders')
    args = parser.parse_args()
    available = {p.name: p for p in (ROOT / 'skills').iterdir()
                 if p.is_dir() and (p / 'SKILL.md').is_file()}
    if args.all and args.skills:
        parser.error('Choose skill names or --all, not both')
    selected = sorted(available) if args.all else list(dict.fromkeys(args.skills))
    if not selected:
        parser.error('Choose skill names or --all. Available: ' + ', '.join(sorted(available)))
    unknown = set(selected) - available.keys()
    if unknown:
        parser.error('Unknown skills: ' + ', '.join(sorted(unknown)))
    destination = args.destination.expanduser().resolve()
    # Validate all targets before modifying any installation.
    for name in selected:
        target = destination / name
        source = available[name].resolve()
        if target == source or source in target.parents or target in source.parents:
            parser.error('Destination overlaps a source skill: ' + str(target))
        if target.is_symlink():
            parser.error('Refusing to replace a symlink: ' + str(target))
        if target.exists() and not target.is_dir():
            parser.error('Destination is not a directory: ' + str(target))
        if target.exists() and not args.overwrite:
            parser.error('Already installed: ' + str(target) + '; use --overwrite to replace')
        if name in APPS and not APPS[name].is_file():
            parser.error('Companion app is missing: ' + str(APPS[name]))
    destination.mkdir(parents=True, exist_ok=True)
    for name in selected:
        target = destination / name
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(available[name], target)
        if name in APPS:
            (target / 'assets').mkdir(exist_ok=True)
            shutil.copy2(APPS[name], target / 'assets' / 'index.html')
        print('Installed ' + name + ': ' + str(target))

if __name__ == '__main__':
    main()
