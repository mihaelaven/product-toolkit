# Weekly "what we shipped" digest

Every Friday at 16:00 (workflow timezone, set to UTC by default) this n8n workflow lists the Linear issues team TEAM moved to Done in the last 7 days, groups them by project, posts the digest to Slack and appends it to a Notion changelog page.

```
Schedule (Fri 16:00) → Config → Linear: issues done in last 7 days → Group by project and format → Slack
                                                                                               → Notion changelog
```

## Why there is no AI step

The input is structured: issue, project, status, completion date. The output is a grouped list. Every step is a rule, so a rule does it.

- **Exact.** The digest shows only what Linear says shipped. A model could reword a title or add an item that never shipped.
- **Cheap and fast.** One API call and a few lines of code. No tokens, no model latency.
- **Easy to check.** Anyone can trace a line in the digest back to a Linear issue.

AI would earn a place if the digest needed judgement, for example writing a customer-facing summary of why the week's work matters. That would be a separate step with a human review before it goes out.

## Set up

1. In n8n, **Import from file** and pick `weekly-shipped-digest.json`.
2. Create three credentials and select them on the nodes that show a warning:
   - **Linear API**: a personal API key (Linear, Settings, API).
   - **Slack API**: a bot token with `chat:write`. Invite the bot to the channel.
   - **Notion API**: an internal integration token. Share the changelog page with the integration.
3. Edit the **Config** node and replace the `YOUR_...` placeholders: `slack_channel_id`, `notion_changelog_page_id`, and set `team_key` to your Linear team key.
4. Run it once with **Execute workflow**, then switch the workflow to Active.

No keys are stored in this file. Credential IDs are placeholders that n8n replaces when you select your own.

## Built with

n8n 2.35 (self-hosted). Nodes: Schedule Trigger 1.3, Edit Fields 3.4, HTTP Request 4.5 (Linear GraphQL and Notion API 2022-06-28), Code 2, Slack 2.7.

## Current limits and validation

This is an importable example, not a verified deployment. Local checks execute the formatter against empty and populated fixtures and check the workflow graph. Live credential use, API compatibility, import, scheduling, and writes remain unverified.

The Linear query reads the first 100 matching issues with no pagination. The Notion append sends all blocks in one request; larger digests need batching. Rerunning the workflow posts/appends the digest again because no deduplication store is implemented. `Config.timezone` formats the digest date; configure the workflow's own timezone separately to control the trigger time.

See [validation](../../docs/validation.md) before activating, and test in a separate Slack channel and Notion page.
