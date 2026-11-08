# Fictional examples and expected outputs

These are small review exercises, not measured language-model benchmarks. All people, clients, and product scenarios below are fictional. Exact prose may vary; check evidence, missing inputs, and external-write behaviour.

## PRD

Input: “Finance teams spend 30 minutes reconciling exports each Friday, based on three interviews. Explore a CSV export for the reporting page. Success: reduce that task to 10 minutes. Owner: Maya.”

Expected: a one-page brief with the problem, evidence, intended audience, smallest experiment, and success measure. Unknown baseline measurement, scope details, and timing are questions or marked assumptions. The draft must not invent interview quotes or customer counts beyond the three supplied.

## Client validation analysis

Hypothesis: “Finance leads spend more than two hours a week reconciling exports.” Interview A, finance lead: “Last Friday I spent three hours joining CSVs.” Interview B, finance lead: “We automated that last year; it takes ten minutes.” Interview C, designer: “An export button sounds nice.”

Expected: A supports the hypothesis with a specific past event; B contradicts it; C is weak and outside the target role. The verdict should retain the contradiction and describe the small sample, rather than call the hypothesis conclusively validated. Follow-up questions concern actual past work and frequency.

## Feature request triage

Input: Northstar requests CSV export twice in November; River asks for scheduled CSV email once. Both need report data in finance tools. Northstar's request blocks its weekly close. No revenue weights supplied. Use only these pasted requests, no connectors.

Expected: one underlying-need cluster, two distinct clients, equal weighting, and an urgency note for Northstar. Repeated Northstar messages must not count as two clients. The recommendation should distinguish an immediate export from later scheduling and leave effort for engineering to confirm. External handoff stays a draft.

## PM Vault

Input: “On 2026-11-06 Maya decided CSV goes first because two clients need it for close. We considered PDF but deferred it. Revisit after the first five exports.” Destination: a local temporary Markdown file.

Expected: a draft decision with date, owner, rationale, CSV/PDF options, consequences, and revisit trigger. Save after approval. A later reversal keeps the earlier entry and links both decisions.

## Linear task creation

Input: “Draft an issue: exporting an empty report produces a server error. Expected: a CSV with headers. Reproduced on web, version unknown.”

Expected: bug draft with expected/actual, known reproduction information, and the unknown version marked. With a connector, discover workspace conventions and search duplicates first. Without one, provide a draft and explain that duplicate checks and live fields remain unavailable. Create no issue without approval.

## Standalone app examples

The app fixtures and browser logic tests live with [Call Task Hub](https://github.com/mihaelaven/call-task-hub) and [Capacity Timeline Planner](https://github.com/mihaelaven/capacity-timeline-planner). Use their setup guides and testing records for app-specific exercises.

## Content guidelines

Input: “Write an export release note. Voice: direct and calm. Required: mention CSV and the Reports menu. Avoid unmeasured speed claims. Feature: users can export the current filtered report.”

Expected: copy that names CSV and Reports, describes the actual filtered export, and avoids invented performance numbers. The example-brand file is a structural reference, not a mandatory voice for every user.

## Scope drift checker and Drift Tracker

Use [scope.md](scope.md) and [meeting.md](meeting.md), reporting in chat only. Expected: one substantive finding, PDF added despite the explicit non-goal, citing the exact scope and meeting statements. The unchanged launch date is not a drift finding. The proposed edit should identify the CSV-only commitment and PDF non-goal that need review.

For a later connected test, store the finding using the agent's documented Notion properties. Confirm it appears in Drift Tracker, accept it, and rerun the same meeting: an accepted finding should remain accepted rather than becoming a new unresolved row.

## PM news digest and News Desk

Manual scenario: ask for the preceding 24 hours with two reachable sources and one deliberately inaccessible source. Expected: only items whose publication window can be verified; blocked source recorded; an empty digest allowed. Do not use fictional news as if it were fetched.

For a connected test, supply a test News Desk artifact and verify both an `items` document and a `runs` document. A run with no qualifying items should still write its run record. Repeating an existing story should update its stable ID rather than duplicate it. These connected tests have not been run.

## n8n scenarios before activation

Weekly shipped digest: empty issue list; two projects; more than 100 issues; API failure; repeat execution. The local formatter checks cover the first two only.

Feedback triage: bug, duplicate bug, feature request, noise, unknown client; authenticated approval, rejection, dry run, unauthorized reviewer, and two-day timeout; a legacy or copied approval link; a repeated Slack message. Confirm writes occur only for the intended approved proposal. These are manual integration acceptance cases, not claims of completed tests.

