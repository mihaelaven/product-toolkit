# Feedback triage with authenticated Slack approval

One Slack message is classified as a bug, feature request, or noise. Read-only specialists propose an action. A named reviewer approves the exact text inside Slack before any Linear or Notion business write can run.

**Experimental integration template. Business writes default off.** Local tests cover the exported guard code and workflow graph; connected execution still needs validation in your n8n and Slack environment.

## Files

| File | Role |
|---|---|
| `triage-orchestrator.json` | Trigger, classification, native approval, authorization guard, writes |
| `triage-bug-specialist.json` | Read issues, judge duplicates, draft a bug or comment |
| `triage-request-specialist.json` | Read clients and feedback, match needs, calculate demand |

```text
Slack → classify → read-only specialist → freeze exact proposal + destination
  → Slack authenticated Approve / Reject → validate responder + channel + expiry
    → approved + writes enabled → write the frozen proposal → confirmation
    → approved + dry run → report without business writes
    → rejected / expired / malformed / unauthorized → no business write
```

## Approval protection

The export uses the native Slack Send and Wait operation with `captureResponder` enabled, a nonempty user-ID allowlist, and approval/rejection buttons. n8n verifies Slack callbacks using the signing secret stored in your Slack credential. No custom GET resume links are posted. The second guard rejects missing or unauthorized identities, wrong channels, expired responses, and non-boolean decisions. Only the frozen proposal and destination shown to the reviewer are used for the business write.

Correct a proposal by rejecting it and submitting corrected feedback for a fresh review. The former free-text edit route is removed so an unauthenticated edit form cannot feed a write.

## Configure

1. Use an n8n release whose Slack node supports **Capture Who Responded** and **Restrict Who Can Approve**. Version number alone is insufficient: confirm these controls are present after import. See [n8n's approval guide](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.slack/approvals).
2. Import both specialists, then the orchestrator. Re-select the specialist workflows if import changed their IDs. The orchestrator export is inactive.
3. Configure your own Anthropic, Linear, Notion, and Slack credentials. Set the Slack credential's **Signature Secret** from your Slack app's signing secret. Secrets belong in n8n credentials, never in these files.
4. In your Slack app, enable Interactivity with the HTTPS Request URL `https://YOUR_N8N_HOST/webhook-waiting-slack` (adjust for a customized webhook-wait endpoint). A plain localhost server cannot receive Slack callbacks. Set scopes per the official guide and use a private test review channel.
5. In Config, set `review_channel_id`, comma-separated `approver_user_ids`, `linear_team_id`, and `feedback_db_id`. Keep `enable_writes` **false** initially. Set the Slack trigger's feedback channel and the specialist Config values too. IDs and approvers are deployment settings, not model decisions.
6. Create the Notion database properties expected by the specialist fetches and write node; select an available model in your account. Test the manual sample first. Invalid placeholders stop before requesting approval.
7. Follow the [connected acceptance checklist](../../docs/integration-checklist.md). Turn on writes only in a disposable test workspace after dry-run approval, rejection, unauthorized-user and timeout checks pass. Inspect resulting records before enabling the real trigger.

## Local verification

From the repository root:

```bash
node --test tests/toolkit.test.cjs tests/approval.test.cjs
```

Tests execute the actual proposal builder, guard and final-proposal code with simulated native-node outputs. They do not claim to verify Slack signatures, import compatibility, or a live n8n execution.

## Remaining limits

Record fetches stop at 100 without pagination. API errors, retry behaviour and downstream permissions need deployment testing. Repeated events or manual execution retries can cause repeated proposals/writes; no durable idempotency store is implemented. The native node owns first-response handling; verify replay behaviour on your installed release. A user with n8n workflow-editing or credential access is an administrator and can change these controls.

The builder requires the full title/body to fit the review message and rejects oversized proposals instead of showing truncated approval text. Approval expires after two days. The formatter escapes Slack link/mention markup in supplied content.
