# Validation record

Last local checks: **2026-11-06**. These checks use fictional data and do not require API keys.

## Reproduce automated checks

Requirements: Node.js 18+ with `node:test`, Python 3.9+. The recorded run used Node.js 25.2.1 and Python 3.9.6. No package installation is required.

From the repository root:

```bash
node --test tests/toolkit.test.cjs tests/approval.test.cjs
python3 -m unittest discover -s tests -p 'test_*.py' -v
python3 scripts/check-docs.py
```

## Results and scope

| Area | Result | What the check establishes |
|---|---|---|
| Transcript extraction | 2 tests passed | Actual browser keyword extractor handles the fixture, negative promises, relative weekdays, and undated decisions |
| Capacity scheduling | 4 tests passed | Actual scheduling helpers respect shared capacity, dependencies, leave, and missing assignments in small scenarios |
| Shipped digest formatter | 2 tests passed | Actual n8n formatter handles empty input and preserves three issue identities across two project groups |
| Workflow structure | 2 tests passed | Export edges point to existing nodes, specialist IDs match, and normal trigger paths cannot reach business writes while bypassing the native approval node |
| Authenticated approval guards | 8 tests passed | Actual builder and guard code reject missing identity, unlisted reviewers, invalid timestamps, link-style responses and writes without explicit enablement; frozen proposals are preserved |
| Skill installer | 3 tests passed | Eight skills install in temporary folders; examples and companion HTML survive; existing copies and source folders are protected |

The app logic checks load bounded sections of the actual HTML scripts in Node's VM. They do not emulate a browser or validate every scheduling case. Workflow graph checks do not establish authenticated approval handling, import compatibility, or live execution correctness.

## Browser smoke checklist

- Call Task Hub: initial fictional tasks render; paste a transcript and extract locally; open a composer and confirm demo labels are visible.
- Capacity planner: timeline renders; Projects and Settings are usable; edit an effort value and verify the timeline updates.
- Drift Tracker: sample findings render; expand a row and change a sample status; disconnected Settings explains the connector requirement.
- PM News Desk: an ordinary browser shows Store unavailable and explains the missing artifact store.

Completed in Chrome on 2026-11-06, using a loopback preview server:

| App | Observed result |
|---|---|
| Call Task Hub | Initial sample rendered; a pasted two-line transcript produced an action due the following day and an undated decision; Linear composer showed the demo-only notice and Create demo ticket label |
| Capacity planner | Initial timeline rendered; Projects and Settings opened; changing focus time changed the status from At risk to Off track |
| Drift Tracker | Sample evidence expanded; accepting a finding reduced open findings from three to two; disconnected Connect explained the Notion requirement |
| PM News Desk | Store unavailable message rendered with no invented articles |

Screenshots in `docs/images/` show the browser states (fictional sample data for the first three, unavailable store for News Desk). Browser coverage is separate from connected integration coverage. Explicit UTF-8 metadata was added to all four HTML files after the preview exposed incorrectly decoded accented names and currency symbols.

## Not yet verified

- Claude Code plugin discovery, installation in a real user account, and language-model quality across the example prompts.
- Claude artifact sampling, database/user capabilities, Notion MCP reads or writes, and `ArtifactData` agent-to-app handoff.
- Scheduled agent execution in Desktop, cloud, or `/loop`.
- n8n import, account-specific model availability, authenticated Slack callback routing, timeout/rejection runtime behaviour, API compatibility, and live Slack/Linear/Notion writes.
- Large datasets, pagination, retries, idempotency, browser accessibility, and cross-browser behaviour.

The [example scenarios](../examples/README.md) provide the acceptance checklist for those follow-up checks. The individual app and workflow READMEs document current limitations. Local passes should not be presented as production or integration certification.

## Publication hardening

Custom GET approval links and the free-text edit route were replaced with native Slack interactive approvals, identity capture, an explicit allowlist and a second authorization guard. Business writes default off. This implementation was checked against the [official n8n approval guide](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.slack/approvals). Native signature verification and live API writes still require the [connected checklist](integration-checklist.md). The [publication plan](publication.md) uses a new clean repository and preserves the original privately.
