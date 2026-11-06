---
name: client-validation-analysis
description: Analyse customer or client interviews against a product hypothesis and report how strongly the evidence supports it. Use when the user shares interview notes or transcripts (pasted, files, or Notion pages) and wants to know whether a problem, solution or willingness to pay is validated, what customers actually said, and what to ask next.
---

# Client validation analysis

## 1. Set up

Confirm three things before reading the interviews:

- **Hypotheses**: the beliefs under test, each as one falsifiable sentence. For example: "Finance leads at 50 to 500 person companies spend more than 2 hours a week reconciling card spend." Help the user rewrite vague ones.
- **Target segment**: who the hypothesis is about, so off-target interviews can be weighed separately.
- **Sources**: pasted text, files, or Notion pages read through the user's Notion connector. List every interview with its date, company type and role.

## 2. Extract evidence from each interview

For each interview, pull out:

- **Pains** in the customer's words, with how often they happen and what they cost (time, money, risk).
- **Current workaround** and what they pay or spend on it today.
- **Commitment signals**: next meeting booked, pilot agreed, budget named, intro to a buyer, data shared.
- **Quotes**: the exact sentence behind each finding, with speaker role.

Tag each piece of evidence against each hypothesis as **supports**, **contradicts** or **neutral**, and grade its strength:

| Strength | What counts |
|---|---|
| Strong | Past behaviour or a commitment: they already pay for a workaround, built one, or agreed to a pilot |
| Medium | Specific recent story with real numbers or consequences |
| Weak | Opinion, compliment, hypothetical ("I would use that"), or a feature request with no story behind it |

Use only what the interviews say. When an interview lacks the detail to grade, mark it as missing.

## 3. Report

**Summary table**, one row per hypothesis:

| Hypothesis | Verdict | Confidence | Supporting (strong/medium/weak) | Contradicting | Interviews |
|---|---|---|---|---|---|

- **Verdict**: Validated, Invalidated, or Inconclusive.
- **Confidence**: High when several strong pieces of evidence agree across different companies in the segment. Low when the verdict rests on weak evidence, one company, or off-target interviews.

Then, for each hypothesis:

- The two or three strongest quotes for and against
- Patterns across interviews (repeated pains, shared workarounds, segment differences)
- Surprises: needs nobody planned to test

Close with:

- **Bias check**: leading questions in the notes, a skewed sample (all friendly accounts, one role, one region), small sample size
- **Gaps**: what the evidence leaves open
- **Next interviews**: who to talk to next and 3 to 5 questions about past behaviour that would settle the open points
- **Recommendation**: proceed, adjust the hypothesis, or stop, with the reason

## 4. Save

Offer to save the analysis where the user keeps research. With a Notion connector, create a page and link each finding to its source interview.

