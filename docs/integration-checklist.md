# Connected acceptance checklist

Status: **pending access to a test n8n instance and compatible Claude artifact environment**. Local simulated tests do not complete this checklist. Use fictional data and disposable destinations. Keep real production triggers disabled.

## Feedback triage

Record n8n version and confirm the imported Slack node exposes Capture Who Responded and Restrict Who Can Approve. Configure the Slack signing secret in its credential and its Interactivity endpoint. Import specialists first and reselect their IDs in the orchestrator if needed.

Start with `enable_writes=false`, a private test review channel and an explicit allowlist of Slack user IDs. Set valid sandbox Linear team and Notion database IDs. The builder stops on invalid placeholders.

| Case | Required observation |
|---|---|
| Bug, request, noise | Expected classification and source evidence; noise never requests a business write |
| Authorized approval, dry run | Identity and channel present in node output; dry-run branch; no Linear/Notion change |
| Rejection | Rejected branch; no business write |
| User outside allowlist | Native Slack node keeps waiting; no business write |
| Link preview or copied legacy GET URL | No accepted approval; no business write |
| Missing/wrong signing secret | Slack callback rejected; no business write |
| Timeout | After two days the guard blocks writes; shorten the wait only in a temporary test copy |
| Missing identity or wrong channel | Authorization guard blocks; exercise with synthetic node input too |
| Correct a proposal | Reject and resubmit; new proposal receives its own fresh approval |
| Enable writes in sandbox | Only the displayed, approved title/body and destination are used; one expected record/comment appears |
| Repeated response | Later click does not cause a second write on the installed n8n version |
| API failure and manual retry | Record behaviour and inspect for duplicates; no durable idempotency guarantee is claimed |

Before enabling the event trigger, test create issue, comment on duplicate issue, and log request independently. Inspect the actual Notion properties and confirm the node can read the exact records used for demand sizing. Lookups are limited to the first 100 records.

## Weekly shipped digest

Use a test Slack channel and Notion page. Run empty and populated weeks; compare every output identifier with Linear. Check workflow timezone and schedule, API errors, and repeated execution. More than 100 issues or a large Notion block set needs pagination/batching before use at that scale.

## Claude companions

- Call Task Hub: grant artifact sampling and verify AI extraction/criteria on fictional text; Slack/Linear buttons remain demo-only.
- Drift Tracker: connect a test findings database, compare a row with its source, update a status, and verify the Notion row. Run the agent twice and confirm accepted findings retain their status.
- PM News Desk: grant database/user capabilities; run the news agent with ArtifactData access to the same store; verify items, an empty-run record, stable IDs and per-user read marks.
- Scheduled agents: confirm source access, timezone, displayed next run, first scheduled output, and blocked-source reporting in the actual host.

## Recording a pass

Record the date, host/version, scenario, expected result and actual result in a private test log. Keep credentials, personal responder details and private workspace URLs out of public commits. Update the public validation table with scenario outcomes only after they have been observed.
