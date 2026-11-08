# Installation

The toolkit includes six skills, two reporting agents and n8n workflow examples. Use a repository checkout for the examples, tests and workflow exports.

## Install skills

From the repository root:

```sh
python3 scripts/install-skills.py prd
python3 scripts/install-skills.py linear-task-creation pm-vault
python3 scripts/install-skills.py --all
```

The default destination is `~/.claude/skills`. The installer preserves existing copies. Use `--overwrite` when you choose to replace an installed folder, and keep personal edits in a separate location.

For a project-local installation:

```sh
python3 scripts/install-skills.py --all --destination .claude/skills
```

Each skill keeps its bundled examples. Start a fresh Claude Code session and ask for the skill by name.

## Load the plugin for one session

From the checkout:

```sh
claude --plugin-dir .
```

For example, invoke `/pm-toolkit:prd`. Connect accounts, import workflows and configure schedules as separate setup steps. See the [plugin documentation](https://code.claude.com/docs/en/plugins).

## Install reporting agents

Check your existing agent files, then copy the selected definitions:

```sh
mkdir -p ~/.claude/agents
cp agents/scope-drift-checker.md agents/pm-news-digest.md ~/.claude/agents/
```

Start a fresh session and ask for the named agent. Follow the [run-once guide](agents.md) before adding a schedule.

## Use the apps

Download each app from its own repository:

- [Call Task Hub](https://github.com/mihaelaven/call-task-hub)
- [Capacity Timeline Planner](https://github.com/mihaelaven/capacity-timeline-planner)
- [Drift Tracker](https://github.com/mihaelaven/drift-tracker)
- [PM News Desk](https://github.com/mihaelaven/pm-news-desk)

Call Task Hub and Capacity Timeline Planner include their companion skills. Each app README explains its host requirements and connected features.

## Import n8n workflows

Follow the [workflow setup guides](../workflows/README.md). Add credentials and destination IDs in your own n8n instance. Run manually with fictional data and test destinations, then review the result before activating a trigger.
