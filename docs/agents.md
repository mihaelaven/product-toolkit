# Agents: run once, then schedule

These are specialist instruction files, not background services. Installing them does not create a recurring task.

| Agent | Inputs | Output and environment |
|---|---|---|
| [scope-drift-checker](../agents/scope-drift-checker.md) | Scope, meeting notes, period, destination | Report in chat by default; optional named report destination and Notion findings database through tools available to the runner |
| [pm-news-digest](../agents/pm-news-digest.md) | Time window, sources, optional digest store | Dated, sourced report; artifact-store writes require `ArtifactData` in the runner |

## Install and run once

Follow [installation](installation.md) to load the plugin or copy the two agent files individually. In a fresh Claude Code session, ask:

```text
Use the scope-drift-checker agent.
Scope: the local file examples/scope.md.
Meeting notes: examples/meeting.md.
Since: 2026-11-01.
Report destination: return the report in this conversation.
Do not write to external tools or a findings database.
```

The [example files](../examples/README.md) are fictional. Check the exact source quotes and the proposed edit. For the news agent, run:

```text
Use the pm-news-digest agent for the last 24 hours.
Sources: https://www.anthropic.com/news and https://openai.com/news/.
Return the report here; no digest store.
List blocked sources and retain only items whose publication window you can verify.
```

Web access is required for news. An empty report is valid. Skills, tools, and authentication vary by host; verify source access in the same environment that will run the schedule.

## Configure recurring execution

1. Run once with the exact sources, destinations, and tools you intend to use.
2. Choose a scheduler that can run in that environment. Claude Desktop scheduled tasks can use local files; cloud tasks require their own source and connector configuration. A temporary Claude Code `/loop` requires an open session. See the [official scheduling comparison](https://code.claude.com/docs/en/scheduled-tasks).
3. Supply the complete instruction file in the scheduled task's context, or load this repository's agents in the task environment. A different host does not automatically discover your local agent files.
4. Configure the cadence and timezone explicitly: for example, **scope review every Monday at 09:00 Europe/Sofia**, or **news daily at 08:00 Europe/Sofia**. Confirm the scheduler's displayed next run.
5. Use the same tested prompt. For news, say “the 24 hours ending when this run starts” rather than a fixed date. For scope review, name the source period or previous report location.
6. Inspect the first scheduled output. Check source coverage, repeat handling, destination, and failure reporting. Enable only the external writes you intend.

For a session-only trial, after loading the agent and setting its inputs:

```text
/loop 1d Use the pm-news-digest agent for the last 24 hours; return the report here, with no digest store.
```

The app integration is a separate step: [Drift Tracker](https://github.com/mihaelaven/drift-tracker) needs a findings database and artifact Notion tools; [PM News Desk](https://github.com/mihaelaven/pm-news-desk) needs a runner with `ArtifactData` access to its store. Scheduling in Claude Code alone does not grant these capabilities.

Scheduled runs and connected agent-to-app handoffs have not been exercised in this repository's validation record.

