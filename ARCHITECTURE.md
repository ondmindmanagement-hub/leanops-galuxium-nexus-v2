# Architecture

Browser UI → Input normalization → Explainable obligation detector → Risk + effort estimator → Margin model → Staffing-trigger mapper → Decision view / JSON export

## Security and privacy
- No remote telemetry
- No external API dependency
- No cookies
- No persistent user content
- No third-party script execution
- Deterministic calculations are inspectable in app.js

## Production path
A commercial deployment would add authenticated organization workspaces, encrypted persistence, billing, audit events, configurable cost models, and optional private LLM extraction for complex procurement documents.
