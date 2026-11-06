---
name: capacity-timeline-planner
description: Check whether projects make their target and go-live dates with the people available, by scheduling effort week by week against each person's capacity and time off. Use when the user asks if a release or MVP will make a date, who is overbooked, how time off or automated testing changes a timeline, or asks to open the Capacity Timeline Planner.
---

# Capacity Timeline Planner

## 1. Gather the inputs

- **Projects** in priority order, each marked MVP or V1.1, with effort in person-weeks for Design, Frontend, Backend, Mobile and QA, a target date, and any project it must wait for.
- **People**: name, role, the projects they are assigned to, and days off per month.
- **Settings**: go-live date for the MVP, focus time (default 80%), whether QA writes automated tests and how much that adds to QA effort (default 40%).

When the user has a Linear connector, read project names, target dates and assignees from Linear and show what you found. Ask the user for effort estimates and time off that no connected source gives. Use only figures the user gave or a source returned.

## 2. Schedule week by week

- A person's weekly capacity is focus time × their working days that week, after public holidays and their days off.
- Projects higher in the list get people's time first. MVP projects come before V1.1.
- Design finishes before build starts. QA keeps pace with build progress and finishes after it.
- A project with a dependency starts after that project finishes.
- MVP projects are due on the go-live date. V1.1 projects keep their own target dates.
- A role with effort and nobody assigned blocks the project.

## 3. Report

- One line per project: on time or days late, the week it lands, and the person it waited on most.
- A status for the MVP: On track, At risk (late), or Off track (blocked or past the plan).
- Bottlenecks: people with the most work queued.
- Up to three changes that bring the MVP in, each checked by rescheduling with the change: add a person to a role, move a project up, switch to manual testing, or move one late project to V1.1 as a last resort. Say what each change does to V1.1.

## 4. Open the app

The companion HTML is `assets/index.html` inside this skill when installed with `scripts/install-skills.py`. In a repository checkout, use `apps/capacity-timeline-planner/index.html` from the repository root. Check that the file exists before offering to open or publish it. If only this instruction file was copied, ask the user to obtain the app from the repository; do not invent the missing file. If the user has it, and where Claude can publish artifacts, publish that file as an artifact. It opens on an invented sample team; the user edits projects, people and time off in its Projects and Settings tabs.

