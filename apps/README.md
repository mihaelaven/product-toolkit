# Companion apps

Each app has its own setup, screenshot, limitations, and validation notes. All are single HTML files; optional fonts load from Google Fonts, with system-font fallbacks.

| App | Ordinary browser | Claude artifact | Live external actions |
|---|---|---|---|
| [Call Task Hub](call-task-hub/) | Local workspace, keyword extraction, draft/copy actions | Optional AI extraction and acceptance criteria via `sample` | Slack and Linear buttons remain simulated |
| [Capacity Timeline Planner](capacity-timeline-planner/) | Editable team, effort, leave, and scheduling simulation | Same local planner | No Linear or HR import implemented |
| [Drift Tracker](drift-tracker/) | Sample findings | Notion integration via `mcp` | Read findings and update their review status; connected execution unverified |
| [PM News Desk](pm-news-desk/) | Store-unavailable state | Stored digest, read marks, favourites via `db` and `user` | An agent must populate the artifact store; connected execution unverified |

Browser storage is local to the browser and origin. It is not a shared team database. Download the HTML file to use locally, or serve the checkout with `python3 -m http.server 8765` and open `http://localhost:8765/apps/`.

The separate [Competitor Delta Monitor](https://github.com/mihaelaven/competitor-delta-monitor) is a Python pipeline with its own dependencies and evaluation, rather than a bundled browser app.
