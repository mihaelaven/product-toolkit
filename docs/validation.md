# Testing and remaining checks

Toolkit cleanup reviewed on **2026-11-09**. The app code and its six logic tests now belong to the standalone repositories.

## Repeat local checks

Use Node.js 18 or newer and Python 3.9 or newer:

```sh
node --test tests/toolkit.test.cjs tests/approval.test.cjs
python3 -m unittest discover -s tests -p 'test_*.py' -v
python3 scripts/check-docs.py
```

## Local coverage

| Area | Coverage |
|---|---|
| Shipped digest formatter | Two tests: empty input and issue identities grouped by project |
| Workflow structure | Two tests: valid edges, matching specialist IDs and guarded write paths |
| Approval guards | Eight tests: identity, reviewer allowlist, channel, timestamps, decisions, write settings and frozen proposals |
| Skill installer | Three tests: six skills and examples, existing installations, valid names and protected source folders |

These checks use bundled data and the actual exported workflow code. They cover selected local behaviors. Connected behavior requires the checks below.

## Observed connected checks

Observed in n8n 2.35.7 on 2026-11-07:

- The feedback template imported into a separate inactive test workflow.
- The Slack node exposed responder capture, reviewer restriction and a two-day timeout.
- Ten simulated approval scenarios passed inside an n8n Code node.
- Read-only requests returned Linear teams, a shared Notion test page and the Anthropic model list.
- Live Slack approval returned the `dry_run` result. Live rejection returned `rejected`. The isolated workflow contained read and approval steps only.

Private workspace values and response data stay in private test records.

## Plugin validation

The local plugin validator passes. The plugin loads the six skill guides. A marketplace listing icon remains optional. Real session discovery and invocation remain part of the checks below.

## Tests still needed

| Component | Next checks |
|---|---|
| Six skills | Real Claude Code discovery and invocation, output quality on the fictional examples, connector setup and reviewed saves |
| Feedback triage | Paid model classification and specialist outputs; real Linear and Notion writes; unauthorized users, timeout, replay and retry behavior |
| Weekly shipped digest | Import, live Linear query, Slack post, Notion append, timezone and schedule |
| Larger datasets | Pagination, Notion batching, repeated events, retries and duplicate prevention |

Paid model testing remains deferred. Workflow writes begin in disposable destinations after dry-run checks pass. The templates need deployment-specific verification before routine use.

Use the [connected checklist](integration-checklist.md) to record each pass. App-specific browser and artifact tests are listed in each [standalone app repository](../README.md#standalone-apps).

