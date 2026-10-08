# LeanOps — Pilot Scope & Margin Guard

LeanOps is a privacy-first SaaS prototype for founder-led AI and software teams. It converts client briefs and statements of work into a commercial delivery check: scope risk, estimated effort, projected margin, detected obligations, and explicit triggers for when specialist subcontracting may be justified.

## Why it exists
Early-stage teams often accept pilot requirements before translating them into operating cost. A single clause such as 24/7 support, on-site coverage, security assurance, or a strict SLA can materially change delivery economics.

## Core workflow
1. Paste a client brief or pilot scope.
2. Enter expected contract value and internal hourly cost.
3. LeanOps detects operational obligations and delivery complexity.
4. It estimates effort, scope risk, projected margin, and staffing triggers.
5. Export a structured JSON review or copy a concise decision summary.

## Architecture
- Static browser application
- HTML/CSS/vanilla JavaScript
- No server-side processing
- No external API calls
- No brief text leaves the browser
- Deterministic rules engine for explainable scoring

## Monetization
- Free — 3 analyses/month
- Pro — €29/month for unlimited solo use
- Team — €99/month for shared policies and team workflows

A production version would add authenticated workspaces, policy templates, organization-specific cost models, encrypted persistence, Stripe billing, and optional private-model inference.

## Privacy
The demo is local-first. Text entered into the analyzer is processed entirely in the browser and is not transmitted or stored remotely.

## Galuxium Nexus V2
This project was conceived and built during the Galuxium Nexus V2 hackathon window as an original submission.

## License
MIT
