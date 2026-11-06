# Workflows

n8n workflows you can import. Each folder has the workflow JSON files and a README that explains the design, what each step does and why.

| Workflow | What it does | Uses AI? |
|---|---|---|
| [01-shipped-digest](01-shipped-digest/) | Every Friday, lists the Linear issues finished in the last 7 days, groups them by project, posts the digest to Slack and adds it to a Notion changelog. | No, by design. Every step is a rule. |
| [02-feedback-triage](02-feedback-triage/) | A Slack message starts an orchestrator agent. It classifies the message as a bug, a feature request or noise, calls a specialist agent and posts a proposed action with authenticated Approve and Reject buttons. Business writes default off; an allowlisted reviewer must approve before enabled writes can run. | Yes, with a human approval step. |

## Import a workflow

1. In n8n, choose **Import from file** and pick the workflow's JSON file. For `02-feedback-triage`, import all three files.
2. Create your own credentials and select them on the nodes that show a warning. The files hold placeholders, not keys.
3. Replace every `YOUR_...` value in the **Config** nodes with your own IDs, such as the Slack channel, Linear team and Notion databases.
4. Run once manually, then switch the workflow to Active.

The test data in the examples is from a fictional company, Fernpay.

