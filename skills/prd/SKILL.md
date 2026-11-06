---
name: prd
description: Write or review a product requirements document (PRD). Use when the user wants to turn a feature idea, problem or brief into a PRD, sharpen an existing PRD, or get a PRD reviewed from engineering, leadership and user research angles. Produces a one-page brief for early ideas or a full PRD for work heading into delivery.
---

# PRD

## 1. Sharpen the idea first

Ask 3 to 5 questions before drafting, picked from the gaps in what the user gave you. Ask them together in one message, and keep the tone collaborative.

- **Problem**: what specific pain does this solve, for whom, and how do we know it is real?
- **Evidence**: what research, data, tickets or customer quotes support it?
- **Why now**: what changes if we wait a quarter?
- **Success**: what measurable change tells us it worked, and what must stay healthy while we chase it?
- **Scope**: what is the smallest version that tests the core bet?

Skip any question the user's material already answers. When the user wants to go straight to a draft, draft with clearly marked assumptions.

## 2. Pick the format

- **One-pager** for an idea still being explored: description, problem, why it is real, success measure, audience, rough shape, experiment plan, timing.
- **Full PRD** for work heading into design and build: use the structure below.

## 3. Full PRD structure

```
# <Title>
Owner · Status (Draft, In review, Approved) · Last updated

## Problem and opportunity
The problem in one or two sentences a reader can repeat to someone else.
- Who has it and how often
- Evidence (research, data, quotes, with links)
- Why it matters to customers and the business
- Why now

## Approach
The rough shape of the solution, plus the alternatives considered and why this one won.
Optional: short customer stories, today versus after.

## Goals
In priority order. Measurable goals with a baseline and target, plus guardrail metrics.

## Non-goals
What this deliberately leaves out, and why.

## Key features
In priority order, each with a one-line purpose. Mark the first shippable slice.
Later: features saved for a future phase.

## Key flows
The end-to-end experience for each main use case, step by step.

## Rules and edge cases
Business rules, permissions, empty and error states, limits, and non-functional requirements (performance, security, accessibility, analytics events).

## Launch plan
Milestones with dates, rollout (beta, percentage, regions), experiment design, and the operational checklist (support, docs, legal, marketing).

## Risks and open questions
Each with an owner and a date to resolve it.

## Changelog
Date, change, reason.
```

Write in plain language. Put numbers where the user has them, and mark anything you inferred as an assumption for the user to confirm. Leave a section short when the user has little to say about it, and say what input would fill it.

## 4. Review on request

When the user asks for a review, read the PRD from three angles and return the top issues from each, most important first, with a suggested fix:

- **Engineering**: ambiguous requirements, missing edge cases, hidden dependencies, scope that will not fit the timeline.
- **Leadership**: link to strategy, size of the opportunity, whether the success metric proves the bet, cost of delay.
- **User research**: strength of the evidence, which users were left out, assumptions that need testing before build.

End with the three changes that would most improve the document.

## 5. Where to save it

Save to the place the user names. With a Notion or Linear connector available, offer to create the PRD there and link it to the related project.

