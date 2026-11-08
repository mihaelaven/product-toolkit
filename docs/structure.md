# Repository structure

| Folder | Contents |
|---|---|
| `skills/` | Six reusable PM instruction sets |
| `agents/` | Two reporting agents and scheduling guidance |
| `workflows/` | Two n8n examples and their setup guides |
| `tests/` | Installer, workflow and approval checks |
| `scripts/` | Installation and documentation helpers |
| `docs/` | Setup, validation and publication guidance |

## App ownership

The four apps live in their own public repositories, linked from the [main README](../README.md#standalone-apps). Call Task Hub and Capacity Timeline Planner own their companion skills, HTML, screenshots, fixtures and tests.

The toolkit keeps the scope-review and news agents because each can produce a useful report in chat. Their optional app connections are documented in the standalone repositories.

## Related tasks

Linear task creation supports issue drafting, workspace conventions and duplicate checks. Feature request triage groups demand across sources. The feedback workflow handles one incoming Slack message. Each task has its own inputs and review steps.

A future extraction of feedback triage should move the orchestrator and both specialist workflows together.


## Usage examples

Each skill and agent guide includes a short **Try it** example. The content-guidelines skill also includes a sample brand reference.
