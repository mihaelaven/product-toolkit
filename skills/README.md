# Skills

A skill is a set of instructions Claude follows for one task. Claude loads it when your request matches its description, or you can ask for it by name.

| Skill | Say this | What it does | Works with |
|---|---|---|---|
| [prd](prd/) | "write a PRD for..." | Turns an idea into a one-page brief or a full PRD, or reviews one from engineering, leadership and research angles. | Notion, Linear (optional) |
| [feature-request-triage](feature-request-triage/) | "what are clients asking for?" | Collects requests, groups them into underlying needs, sizes demand by client and recommends what to build next. | Slack, Linear, Notion |
| [client-validation-analysis](client-validation-analysis/) | "does this interview back the hypothesis?" | Checks interview notes against a hypothesis and reports how strong the evidence is, what customers actually said and what to ask next. | Notion (optional) |
| [pm-vault](pm-vault/) | "log this decision" | Keeps a decision log with context, options, rationale and owner. Finds past decisions and flags ones due for review. | Notion, or a markdown file |
| [linear-task-creation](linear-task-creation/) | "file tickets from these notes" | Drafts well-formed Linear issues from notes or a transcript. Checks for duplicates and creates issues only after you confirm. | Linear |
| [content-guidelines](content-guidelines/) | "write this in my brand voice" | Writes or reviews copy against a guideline, or builds a guideline with you. Includes an example guideline. | Notion (optional) |

"Works with" lists the tools a skill can connect to through your own Claude connectors. A skill still runs without them where marked optional.

## Install

From a repository checkout, run `python3 scripts/install-skills.py prd` or `python3 scripts/install-skills.py --all`.

The installer copies six available skills and their examples. Existing installations require an explicit `--overwrite` to replace. See [installation](../docs/installation.md) for destinations and plugin loading.

## Examples and separate apps

Try the [fictional examples](../examples/README.md), then review the output against their criteria. Each skill produces an assisted draft that benefits from source and owner review.

Call Task Hub and Capacity Timeline Planner include their companion skills in their own public repositories. See the [standalone apps](../README.md#standalone-apps). Content guidelines remains an optional editorial helper.
