# PM Toolkit

Practical tools for product managers: turn research into decisions, meetings into follow-up work, and delivery plans into something you can check.

Eight Claude skills, two agent definitions, four companion apps, and two n8n workflow examples. Use one piece or combine the ones that fit your work.

## Start with a problem

| I want to… | Start here | Companion |
|---|---|---|
| Turn an idea into a clear brief | [PRD skill](skills/prd/) | One-page brief or full PRD |
| Check whether interviews support a hypothesis | [Client validation analysis](skills/client-validation-analysis/) | Evidence table and next questions |
| Understand what clients need | [Feature request triage](skills/feature-request-triage/) | Ranked needs with source requests |
| Turn a call into follow-up work | [Call Task Hub skill](skills/call-task-hub/) | [Call Task Hub app](apps/call-task-hub/) |
| File consistent issues | [Linear task creation](skills/linear-task-creation/) | Duplicate checks and reviewed drafts |
| Check whether a release date is feasible | [Capacity planning skill](skills/capacity-timeline-planner/) | [Capacity planner app](apps/capacity-timeline-planner/) |
| Catch changes to agreed scope | [Scope drift agent](agents/scope-drift-checker.md) | [Drift Tracker app](apps/drift-tracker/) |
| Remember why a decision was made | [PM Vault](skills/pm-vault/) | A decision log in Markdown or Notion |
| Stay informed | [PM news agent](agents/pm-news-digest.md) | [PM News Desk app](apps/pm-news-desk/) |
| Process incoming Slack feedback | [Feedback triage workflow](workflows/02-feedback-triage/) | Proposed actions for human review |
| Share what shipped | [Weekly shipped digest](workflows/01-shipped-digest/) | Linear → Slack and Notion, using fixed rules |
| Keep product copy consistent | [Content guidelines](skills/content-guidelines/) | Optional editorial helper |

## Try one skill

Requires Python 3.9+ for this installer and Claude Code to use the installed skill.

```bash
git clone https://github.com/mihaelaven/pm-toolkit-public.git pm-toolkit
cd pm-toolkit
python3 scripts/install-skills.py prd
```

In a new Claude Code session, ask: **“Use the prd skill to write a one-page brief for…”**

The installer copies only the selected skill. For Call Task Hub and Capacity Timeline Planner, it also bundles the companion app. See [installation](docs/installation.md) for all skills, a custom destination, agents, and loading the whole plugin.

## What runs where

| Component | Environment | Current capability |
|---|---|---|
| Skills | Claude with the instruction file and any required tools | Instructions for an assisted task; connector availability varies by host |
| Agent definitions | Claude Code, or their instructions supplied to another compatible host | Run on request; recurring execution needs separate scheduling |
| Call Task Hub app | Ordinary browser; optional Claude artifact sampling | Local task management and keyword extraction; Slack and Linear actions are simulations |
| Capacity planner app | Ordinary browser | Local scheduling simulation; team and project data entered manually |
| Drift Tracker app | Browser demo; Claude artifact for Notion access | Sample review locally; implemented Notion read/status-update path requires artifact MCP access |
| PM News Desk app | Claude artifact with database/user capabilities | Displays stored digests; ordinary browser shows an unavailable-store state |
| n8n workflows | Your configured n8n instance | Importable examples requiring credentials, IDs, and end-to-end verification |

Publishing an HTML file as an artifact does not automatically add integrations. Each app's README lists its actual capabilities and setup.

## Explore and evaluate

- [Examples](examples/README.md): fictional inputs and expected output characteristics for every skill and agent.
- [Validation](docs/validation.md): checks run, manual smoke tests, and what remains unverified.
- [Agents and scheduling](agents/README.md): run once first, then configure a schedule.
- [Repository boundaries](docs/structure.md): why these components stay together and when to split one out.

The [Competitor Delta Monitor](https://github.com/mihaelaven/competitor-delta-monitor) lives separately because it has its own capture pipeline, dependencies, prompts, and evaluation set. Access depends on that repository's visibility.

## Design choices

Keep evidence attached to recommendations. Mark unknowns instead of inventing details. Use code for arithmetic and predictable transformations. Review proposed external actions before committing them where the component supports that workflow.

MIT license. Prototype and example status is recorded in [validation](docs/validation.md); passing local checks is not a claim that every connected workflow has been exercised.
