# Installation and environments

Keep a checkout of the repository if you want the apps, examples, and n8n exports. The repository must be accessible to your GitHub account while it is private.

## Install selected skills in Claude Code

From the repository root:

```bash
python3 scripts/install-skills.py prd
python3 scripts/install-skills.py call-task-hub capacity-timeline-planner
python3 scripts/install-skills.py --all
```

The default destination is `~/.claude/skills`. Existing skill folders are left untouched; use `--overwrite` deliberately when updating. Updates replace the installed copy, including bundled assets, so keep personal edits elsewhere.

For a project-local or temporary installation:

```bash
python3 scripts/install-skills.py --all --destination .claude/skills
```

Each installed skill keeps its examples. The two skills with visual companions also receive `assets/index.html`, copied from the app in this repository. The installer prints the paths. Restart the Claude Code session after installation, then ask for the skill by name.

Copying just `skills/call-task-hub/` or `skills/capacity-timeline-planner/` manually installs the instructions without the companion app. In that case, retain this checkout and supply the HTML file separately.

## Load the whole plugin for a session

From the checkout:

```bash
claude --plugin-dir .
```

This loads the skills and agent definitions together. For example, invoke `/pm-toolkit:prd`. Loading a plugin does not configure connectors, launch apps, import n8n workflows, or create schedules. See the [official plugin documentation](https://code.claude.com/docs/en/plugins).

## Install agents individually

```bash
mkdir -p ~/.claude/agents
cp agents/scope-drift-checker.md agents/pm-news-digest.md ~/.claude/agents/
```

These explicit filenames avoid copying `agents/README.md` as an agent. Check for existing files before copying. Start a fresh session and ask Claude to use the named agent. See [run-once and scheduling instructions](../agents/README.md).

## Apps and connectors

Open an app's `index.html` in a browser for its local capabilities. Read the app-specific README before using it with your data. A Claude Code connector and a claude.ai artifact capability are different runtime interfaces; installing this plugin does not bridge them.

- [Call Task Hub](../apps/call-task-hub/README.md)
- [Capacity Timeline Planner](../apps/capacity-timeline-planner/README.md)
- [Drift Tracker](../apps/drift-tracker/README.md)
- [PM News Desk](../apps/pm-news-desk/README.md)

## n8n

Import workflows separately using their [setup instructions](../workflows/README.md). Configure credentials and IDs in your own instance. Start with fictional data and manual execution; enable a recurring or event trigger after reviewing the result.
