# PM Toolkit

Skills, reporting agents and workflow examples for product managers. Use them to turn evidence into decisions, write clearer issues and review delivery work.

This repository contains **six skills, two reporting agents and two n8n workflow examples**.

**Status: experimental.** Local tests, feedback-workflow import checks, read-only API checks and live Slack approval dry runs have passed. Model quality, real business writes and scheduled runs still need testing. See the [validation record](docs/validation.md).

## Choose a task

| Task | Start here |
|---|---|
| Write a product brief | [PRD](skills/prd/) |
| Assess interview evidence | [Client validation analysis](skills/client-validation-analysis/) |
| Group and rank customer needs | [Feature request triage](skills/feature-request-triage/) |
| Draft consistent Linear issues | [Linear task creation](skills/linear-task-creation/) |
| Keep a decision log | [PM Vault](skills/pm-vault/) |
| Write consistent product copy | [Content guidelines](skills/content-guidelines/) |
| Compare scope with meeting decisions | [Scope drift agent](agents/scope-drift-checker.md) |
| Gather a dated news digest | [PM news agent](agents/pm-news-digest.md) |
| Review incoming Slack feedback | [Feedback triage workflow](workflows/02-feedback-triage/) |
| Share completed Linear issues | [Weekly shipped digest](workflows/01-shipped-digest/) |

## Install one skill

Use Python 3.9 or newer and a compatible Claude Code installation:

```sh
git clone https://github.com/mihaelaven/product-toolkit.git
cd product-toolkit
python3 scripts/install-skills.py prd
```

Start a fresh Claude Code session and ask: “Use the prd skill to write a one-page brief for…”

The installer copies the selected skill and its examples. See [installation](docs/installation.md) for all six skills, custom destinations, agents and plugin loading.

## Standalone apps

The apps and their app-specific skills now live in public repositories:

- [Call Task Hub](https://github.com/mihaelaven/call-task-hub): transcript actions and follow-ups.
- [Capacity Timeline Planner](https://github.com/mihaelaven/capacity-timeline-planner): local capacity and release scenarios.
- [Drift Tracker](https://github.com/mihaelaven/drift-tracker): review scope findings.
- [PM News Desk](https://github.com/mihaelaven/pm-news-desk): read a stored news digest.

Each app has its own setup guide, limitations and testing record. The toolkit's scope and news agents also work on their own, returning a report in chat.

## Review before use

Start with [fictional examples](examples/README.md). Check source quotes, owners, dates and proposed destinations. Use a test workspace for connected writes.

- [Testing and remaining checks](docs/validation.md)
- [Connected acceptance checklist](docs/integration-checklist.md)
- [Agents and scheduling](docs/agents.md)
- [Repository structure](docs/structure.md)
- [Publication and privacy](docs/publication.md)

This public release contains reusable templates and fictional examples. The original research archive stays private. See the publication guide for the review process.

MIT license. Keep evidence attached to recommendations and review external actions before approving them.

