---
name: feature-request-triage
description: Triage client feature requests and feedback. Collects requests from Slack, Linear and Notion through the user's connectors, clusters them into underlying needs, sizes demand by client, and recommends what to build next. Use when the user asks what clients are asking for, wants feedback grouped or prioritised, or needs a build recommendation backed by client demand.
---

# Feature request triage

## 1. Set the scope

Confirm before collecting:

- **Sources**: Slack channels, Linear teams, labels or projects, and Notion pages or databases where requests land.
- **Period**: default the last 90 days.
- **Client data**: how to weigh clients. Ask for a list with revenue or plan tier, segment and renewal date, or a Notion or Linear source that holds it. Without it, count clients equally and say so in the report.

## 2. Collect

Read each source through the user's connectors. For every request, record:

- Client (company, not person) and requester role
- The request in the client's words, with a link to the source
- Date, and whether it blocks a deal, a renewal or a live workflow

Merge duplicates of the same request from the same client. Skip internal chatter and items with no client attached, and list how many you skipped.

## 3. Cluster

Group requests by the underlying need, which is often broader than the feature asked for. "Export to Excel", "scheduled CSV email" and "API for reports" can all be "get report data into finance tools". Give each cluster:

- A one-line need statement
- The requests inside it, with clients
- What clients do today to work around it

## 4. Size demand

For each cluster:

| Measure | How |
|---|---|
| Clients | distinct clients asking |
| Weighted demand | sum of client weights (revenue or tier) |
| Urgency | requests tied to a deal, renewal date or blocked workflow |
| Recency | requests in the last 30 days |
| Segment fit | share of asks from the target segment |

## 5. Recommend

Rank clusters and recommend the top three to build, each with:

- Why now, in one or two lines, citing the clients and numbers
- The smallest version that serves most of the demand
- Open questions to answer with clients before committing
- Effort, as a range the user confirms with engineering

Also list clusters to decline or park, with the reason, and single-client requests that look like custom work.

## 6. Hand off, on request

Offer to create Linear issues or a project for the recommended clusters, linking every source request, and to draft Slack replies telling clients their request is tracked. Show each draft and create or send it after the user confirms.

## Try it

Ask: “Northstar requested CSV export twice this month. River requested scheduled CSV email once. Both need report data in finance tools. Northstar needs it for the weekly close. Use these pasted requests and equal client weights. Return a draft recommendation in chat.”

Look for one underlying need, two distinct clients and an urgency note for Northstar. Both Northstar messages represent the same client. Keep effort estimates as questions for engineering and external handoffs as drafts for review.
