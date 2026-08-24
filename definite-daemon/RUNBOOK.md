# The Definite Daemon — weekly run

The daemon checks every open signpost in `claims.json` against the news and
drafts "What moved in the future this week." One run ≈ 15 minutes of your
time (edit + send). Run it weekly, same day each week.

## How to run (v0 — via Claude Code / Cowork)

Open Claude Code (or Cowork) in this repo and paste:

> Run the Definite daemon. Read definite-daemon/claims.json. For every open
> signpost, web-search for developments since the last run (see
> definite-daemon/log/ for the previous digest date). For each signpost
> report: FIRED (event occurred — cite the primary source), MOVEMENT
> (progress but not fired — cite), or QUIET (nothing found). Never report a
> firing without a citable source; when a claim traces to a repost or an
> unverifiable quote, mark it PROVENANCE-FAIL and exclude it. Then draft
> this week's digest in the format of definite-daemon/log/digest-001.md:
> max 5 items, each with (1) what happened, one sentence, with source,
> (2) which branch it strengthens or weakens and the updated lean,
> (3) the so-what lens: one line each for builders, investors, operators.
> Items ranked by how much they move a tree. If fewer than 2 items are
> non-QUIET, write the short "quiet week" format instead. Save as
> definite-daemon/log/digest-NNN.md and update claims.json probabilities
> only if a signpost FIRED (small moves, ±5-10 points, note the change in
> the digest).

Then: edit the draft (your voice, your take on the top item), publish to
Substack / the site, and commit the log.

## Rules the daemon must obey

1. **Provenance or it didn't happen.** Primary sources only; a viral
   quote-card is not a source. Fabrications get called out in the digest —
   that's content, not a problem.
2. **Probabilities move on FIRED signposts only**, in small steps. The
   digest states every move and why. No silent rewrites of history: old
   digests are never edited.
3. **Quiet weeks are reported as quiet.** "Nothing moved" is a legitimate
   and trust-building output. Never inflate.
4. **The machine drafts, Ville publishes.** The digest goes out only after
   human edit. The take is yours; the watching is the daemon's.

## Upgrade path

- v0.5: GitHub Action (weekly cron) running the same loop via the Claude
  API — needs an API key as a repo secret; the draft lands as a PR.
- v1: per-claim follow alerts (email on FIRED), corporate briefing exports.
