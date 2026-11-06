# Repository boundaries

Keep PM Toolkit as one repository while its components serve the same PM audience and evolve together.

| Folder | Responsibility |
|---|---|
| `skills/` | Reusable task instructions |
| `agents/` | Specialist definitions, with run and scheduling guidance |
| `apps/` | Companion interfaces, with a README for each |
| `workflows/` | Importable n8n examples and setup |
| `examples/` | Fictional inputs, expected outputs, and evaluation guidance |
| `tests/` | Local regression and workflow-structure checks |
| `scripts/` | Installation and validation helpers |
| `docs/` | Compatibility, validation, and project decisions |

The main README groups these components by the problem they solve, so a reader can find related pieces without following the implementation folders.

## When to split

Extract a component when it needs its own installation, release cycle, dependencies, or audience, and can be used without the toolkit. Keep a short description and link here rather than maintaining duplicate copies.

- Competitor Delta Monitor already fits this boundary and stays in its own repository.
- Feedback triage is a possible future extraction once its independent setup and connected execution are validated. Its three workflow files form one system and should move together.
- Keep each small app with its companion skill or agent for now.
- Content guidelines remains an optional editorial helper rather than a separate repository.

## Known overlap

Call Task Hub extracts meeting actions; Linear task creation provides a broader issue-drafting process. Use the latter when a handoff needs workspace discovery, duplicate checking, or richer issue types. The Call Task Hub app's demo buttons do not implement that process.

Feature request triage analyses demand across sources and a time window. The feedback workflow handles one incoming Slack message. They are related entry points with different scopes.
