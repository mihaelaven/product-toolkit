---
name: pm-vault
description: Keep a product decision log. Record decisions with their context, options, rationale and owner; find past decisions; supersede old ones; and flag decisions due for review. Use when the user says a decision was made, asks why or when something was decided, revisits a topic that has a recorded decision, or asks to set up or review their decision log.
---

# PM vault: decision log

## Where the log lives

Ask once and remember the answer for the conversation:

- **Notion**: a database in the user's Notion through their connector, with one property per field below.
- **Markdown**: one file, `decisions.md`, in the folder the user names. Newest entries first.

When neither is set up, offer to create the Notion database or the markdown file with the structure below.

## Entry format

```
## D-<number>: <decision in one line>
Date: YYYY-MM-DD · Status: Proposed | Accepted | Superseded by D-<n> | Reversed
Owner: <person accountable> · Involved: <people consulted>
Area: <product area or project> · Tags: <keywords>

Context: what forced the decision, with links to data, tickets or docs.
Options considered:
1. <option>: pros, cons
2. <option>: pros, cons
Decision: what was chosen.
Rationale: why, including the trade-off accepted.
Consequences: what changes, what is now harder.
Revisit when: a date or a trigger (a metric threshold, a contract renewal, a launch).
```

## Actions

- **Log**: when the user describes a decision, draft the entry from what they said and ask only for missing essentials (owner, options, rationale). Show the draft, then save it on their yes. Number entries in sequence.
- **Find**: answer "why did we…" and "what did we decide about…" by searching titles, areas, tags and text. Quote the entry, give its date and status, and link it.
- **Supersede**: when a new decision replaces an old one, log the new entry, set the old one to "Superseded by D-n", and link both ways. Keep old entries intact.
- **Review**: list entries whose "Revisit when" date has passed or whose trigger the user reports as met, plus Proposed entries older than two weeks.
- **Recall in passing**: when the conversation reaches a topic with an accepted decision, mention it in one line with its ID, so the team builds on it or reopens it on purpose.

## Sources

Decisions often surface in meeting transcripts, Slack threads and Linear issues. When the user points to one, read it through their connector, pick out the decisions, and offer each as a draft entry.
