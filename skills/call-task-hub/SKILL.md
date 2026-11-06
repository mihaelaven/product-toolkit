---
name: call-task-hub
description: Turn a meeting transcript into actions, decisions and open questions with owners, due dates and supporting quotes, then hand them off as Linear issues or Slack posts through the user's own connectors. Use when the user shares or points to a call transcript (pasted text, a file, or a Notion page) and wants tasks, a recap, tickets or follow-up messages, or asks to open Call Task Hub.
---

# Call Task Hub

Work through these steps in order. Use the user's own connectors. Every write to Linear or Slack waits for the user's explicit yes on the exact text and destination.

## 1. Get the transcript

- Pasted text or an attached file: use it as given.
- A Notion page: search the user's Notion connector by title or date, show the page title you found, and read it.
- A Notion page with no Notion connector: tell the user to connect Notion in Claude's connector settings, or paste the text.

Ask which speaker is the user when the transcript does not say. Call that person "You" from here on.

## 2. Extract the items

Find every action, decision and open question. Skip small talk and add nothing the transcript does not say.

- **text**: an imperative for actions, a plain statement for decisions, the question itself for questions. At most 16 words.
- **owner**: the person responsible, exactly as named, or unassigned.
- **due**: a date resolved from the meeting date when one is said. "Thursday" is the coming Thursday after the meeting, "next Thursday" one week later, "tomorrow" the day after, "next week" the Friday of the following week. Decisions have no due date.
- **quote**: the speaker and the exact sentence behind the item, at most 30 words.

## 3. Show the list

One line per item, grouped as Overdue, Today, Next 7 days, Later, No due date, Decisions, Open questions. Each line: type, text, owner, due date. Put the user's own items first within each group. End with a one-sentence summary of the call.

## 4. Hand off, on request

**Linear issue.** Draft the title, team, priority and assignee, plus this body:

```
## Context
<the item>. Raised in <call name> on <date>.
> <speaker>: "<quote>"

## Documentation
- Call notes: <call name>

## Design
-

## Acceptance criteria
- [ ] <3 to 5 testable criteria, one sentence each>
```

Show the draft, then create it with the Linear connector after the user confirms.

**Slack post.** One item: `*Action* from <call>: <text>` with owner, due date and the quote. A recap lists Decisions, Actions (owner, due) and Open questions. Show the draft and the channel, then post with the Slack connector after the user confirms.

When a connector is missing, name it and say where to connect it. Offer the draft as text to copy.

## 5. Open the app

The companion HTML is `assets/index.html` inside this skill when installed with `scripts/install-skills.py`. In a repository checkout, use `apps/call-task-hub/index.html` from the repository root. Check that the file exists before offering to open or publish it. If only this instruction file was copied, ask the user to obtain the app from the repository; do not invent the missing file. If the user has it, and where Claude can publish artifacts, publish that file as an artifact and declare the `sample` capability so its "Extract with Claude" button works. The app opens on an invented sample workspace, and its Slack and Linear buttons run in demo mode.

