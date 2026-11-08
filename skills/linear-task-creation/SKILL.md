---
name: linear-task-creation
description: Turn a request, notes or a meeting transcript into well-formed Linear issues through the user's Linear connector. Picks the issue type (user story, bug, improvement, technical task, spike, chore or epic with child issues), fills a template for each, sets team, project, labels, priority and estimate from what the workspace actually has, checks for duplicates and links related issues. Shows every draft and creates issues only after the user confirms. Use when the user wants to log a bug, write a story, file tickets from notes or a call, or break work into Linear issues.
---

# Linear task creation

## 1. Read the input

Take what the user gave you: a one-line request, notes, a Slack thread, a document or a transcript. Pull out every distinct piece of work. One issue covers one outcome a person can finish and verify. Split anything with two outcomes, and group five or more related pieces under an epic (see the epic template).

For each piece, note the source: who asked, where, and the exact words when they matter. Keep a link to the source when there is one.

## 2. Learn the workspace

Before drafting, read through the Linear connector:

- **Teams**: the teams the user belongs to. When there is more than one, pick by the work's subject and the team's existing issues, and say why.
- **Projects**: active projects in that team. Match by name and description. Leave the project empty when nothing fits.
- **Labels**: the existing label set, team and workspace. Use only labels that exist. Suggest a new label only when the gap is clear, and create it only after the user agrees.
- **Statuses**: the team's workflow. New issues go to the team's default status (often Backlog or Triage).
- **Estimates**: whether the team uses estimates, and which scale (points, t-shirt sizes or exponential). Skip estimates when the team has them off.
- **Cycles and milestones**: the current cycle and project milestones, used only when the user asks to schedule the work.

Mirror the conventions of the team's recent issues: title style, description headings, how labels are combined.

## 3. Check for duplicates and related work

Search the team's issues, open and recently closed, by the key terms of each piece.

- **Duplicate**: same outcome already tracked. Skip the new draft and offer to add the new detail as a comment on the existing one.
- **Related**: overlapping area, same client or a dependency. Draft the issue and list the related issues to link, with the relation type (related, blocks, blocked by, duplicate of).
- **Parent**: an existing epic or parent issue the piece belongs to. Set it as the parent.

## 4. Pick the type and fill the template

Choose the type that matches the work. Use the type name as a label when the workspace has a matching one (for example Bug, Feature, Improvement). Titles are short and specific: what changes, for whom or where. Write descriptions in Markdown, plain language, one idea per line. Mark anything you inferred as an assumption.

### User story

For new user-facing capability.

```
**As a** <user role>
**I want** <capability>
**So that** <outcome or value>

## Context
Why this matters now, who asked, and links to the source.

## Acceptance criteria
- **Given** <starting state> **When** <action> **Then** <observable result>
- **Given** ... **When** ... **Then** ...

## Out of scope
- ...

## Open questions
- ...
```

Write 2 to 6 acceptance criteria, each testable on its own. Include at least one edge or failure case.

### Bug

For behaviour that breaks what the product promises.

```
## Summary
One sentence: what breaks, where, for whom.

## Steps to reproduce
1. ...
2. ...

## Expected
...

## Actual
...

## Environment
App or service and version, platform, browser or device, account or tenant, date first seen.

## Severity
Critical, Major, Minor or Trivial, with the reason (users affected, money or data at risk, workaround available).

## Evidence
Screenshots, logs, error messages, request IDs, links to reports.
```

Map severity to priority: Critical to Urgent, Major to High, Minor to Medium, Trivial to Low. When steps to reproduce are missing, draft the issue and list the gap under open questions.

### Improvement

For a change to something that already works.

```
## Current behaviour
What happens today and the friction it causes.

## Proposed change
What should happen instead.

## Why
Evidence: client asks, data, support volume, quotes with links.

## Success measure
The metric or observable change that shows it worked, with a target when known.
```

### Technical task

For engineering work with no direct user-facing change: refactors, migrations, infrastructure, integrations.

```
## Goal
The outcome in one or two sentences.

## Approach
The proposed way to get there, with options considered when relevant.

## Definition of done
- [ ] ...
- [ ] Tests updated
- [ ] Docs or runbook updated

## Risks and dependencies
- ...
```

### Spike

For a time-boxed investigation that answers a question before committing to build.

```
## Question
The decision this spike unblocks.

## Time box
Maximum effort, for example 2 days.

## Approach
What to try, read or prototype.

## Output
What the spike delivers: a recommendation, a prototype, a written comparison. Where it is shared.
```

### Chore

For routine upkeep: dependency updates, renewals, clean-up, config changes.

```
## Task
What to do, in one or two sentences.

## Why
The reason or deadline.

## Checklist
- [ ] ...
```

### Epic with child issues

For work too large for one issue. Create the epic as a parent issue (or as a Linear project when the team plans epics as projects, matching what the workspace already does), then draft each child with its own template and set the epic as parent.

```
## Goal
The outcome the whole epic delivers.

## Scope
- In: ...
- Out: ...

## Child issues
1. <title> (type)
2. <title> (type)

## Success measure
...
```

## 5. Set the fields

For each draft, propose:

| Field | How to choose |
|---|---|
| Team | From step 2, with the reason when there was a choice |
| Project | The matching active project, or none |
| Labels | Existing labels only: type label, area label, plus any the team pairs with this kind of work (for example a client request label) |
| Priority | Urgent, High, Medium, Low or No priority, from impact and deadline in the input. Bugs follow the severity map |
| Estimate | On the team's scale, from the size of similar closed issues. Mark it as a suggestion for the team to confirm |
| Parent | Epic or parent issue from step 3 |
| Links | Related issues and their relation type |
| Assignee | Only when the user names one |

## 6. Show the drafts and confirm

Present every draft in one message: type, title, fields, then the description. Number them so the user can reply "create 1 and 3", "change 2 to a bug", or "create all".

Also list duplicates found (with the existing issue link and the comment you would add), and any new labels you suggest.

Create issues only after the user confirms. Apply their edits and show the changed drafts again when the changes are more than small wording fixes.

## 7. Create and report

Create the confirmed issues through the Linear connector, epics first so children can take the parent. Then add the relations and any agreed comments on existing issues.

Report back with each new issue's identifier, title and link, plus the relations added. When a creation fails, say which one and why, and keep the draft so the user can retry.

## Try it

Ask: “Draft a bug issue: exporting an empty report produces a server error. Expected result: a CSV containing headers. Reproduced on web. Ask me for the app version and show the draft for review.”

Look for expected and actual behavior, reproduction details and a clear question about the version. With Linear connected, review workspace conventions and possible duplicates. Creating the issue follows approval of the exact draft and destination.
