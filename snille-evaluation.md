# Project Snille — An Evaluation Against the Actual Paradox Portfolio

**Scope.** This document evaluates Alignment Brief 3.2 ("AI for Grand Strategy") on three questions: (1) is the venture realistic, (2) could the company reach Palantir size, and (3) given what the Paradox games, the Clausewitz engine, and the data actually are, what should the killer first product be. The evaluation is grounded in the technical and commercial reality of the specific games and engine the deck relies on, not in the deck's own framing.

---

## 1. What the deck claims, in one paragraph

An independent company (Rodolfo Rosini + Fredrik Wester; Paradox as minority non-voting IP shareholder) licenses the Clausewitz engine and forks it into a real-world grand-strategy simulator. One artifact, three faces: **sold** as decision-support software to governments and enterprises ($250k/yr vs. a $300m custom build), **trained** on as a self-play/RL ground, and **licensed** to frontier labs as an RL environment and benchmark. Defense money gets it off the ground; finance is the scaling lever; the twenty-year arc ends at a "$100B+ decision layer" comp'd to BlackRock's Aladdin. The stated moat: Clausewitz "couples the political, economic, military, and logistical at once," plus "tens of millions of player-hours" of human strategic decisions.

---

## 2. Reality check: what the assets actually are

The deck's argument stands on three legs — the games, the engine, the data. Each leg is real but materially different from how the deck describes it.

### 2.1 The games: four partial simulations, none of the modern world

No single Clausewitz title couples politics, economics, military, and logistics deeply. The coupling exists **across the portfolio, in pieces**:

- **Hearts of Iron IV** (1936–1948) has the deepest military layer: production lines, division design, supply hubs and rail logistics, theaters, naval and air. But its politics is a "political power" currency and scripted focus trees, and its economy is "civilian factories" — there are no prices, no labor market, no trade in any economic sense.
- **Victoria 3** (1836–1936) has the deepest economic layer Paradox has ever shipped: pops with professions and living standards, buildings with production methods, goods markets with endogenous price formation, trade routes, interest-group politics. Its **war system is the weakest in the portfolio** (the fronts system remains the game's most criticized feature), and its economy is a closed system calibrated for game balance — famously exploitable (the construction-loop meta) precisely because its numbers were never fit to data.
- **Europa Universalis IV/V** (1337–1836) models diplomacy, coalitions, trade flows, and control at continental scale. EU4's core resource ("monarch points") is a pure gameplay abstraction with no real-world referent; EU5 (Nov 2025, on the modernized Clausewitz/Jomini stack) moves to a pop-and-goods simulation and is the most relevant codebase to fork.
- **Crusader Kings III** models individual leaders — personality traits, schemes, councils, succession. This is the only asset in the portfolio that models *decision-makers* rather than states, which matters for geopolitics more than the deck notices.

Two consequences the deck skips:

1. **There is no modern-day scenario.** Paradox content ends in 1948. Everything the product screenshots show — live stability indices, Taiwan-adjacent supply chains, contemporary trade and energy flows — requires building a rigorous modern-world scenario **from scratch**: every country's current economy, military, alliances, industries, supply networks. The community proof-of-concept exists (Millennium Dawn, the HOI4 modern-day mod, ~1M+ subscribers) and proves feasibility, but at fan quality. Building the professional version is the single largest content lift in the plan and it is nowhere in the deck's milestones as a named cost.
2. **Integration is new R&D, not a fork.** Fusing Vic3-class economics with HOI4-class military and CK3-class leader modeling has never been done, even by Paradox, even for a game. "Fork to start warm" is honest about the endpoint (Stage 4 admits a rewrite) but the deck prices the fork as if the coupling already exists.

### 2.2 The engine: a superb *environment*, a poor *oracle*, and famously bad AI

What Clausewitz/Jomini actually is: a ~20-year-old proprietary C++ engine, tick-based, **deterministic lockstep** simulation (that's how Paradox multiplayer works), with the entire ruleset — events, decisions, AI weights, focus trees, country data — in a human-readable script layer that a large modding community has worked in for two decades.

**Genuine, underrated technical strengths for this venture:**

- **Determinism + complete-state saves = branchable.** You can snapshot any world state, fork it, replay it, and diff outcomes. That is precisely the affordance tree search and RL need, and most "serious" simulators don't have it.
- **The script layer is LLM-legible.** Thousands of events and decision trees in readable text means language models can read, critique, and author scenario logic. Scenario authoring — the most expensive part of professional wargaming — becomes semi-automatable. This is a real, specific edge nobody else has at this depth.
- **Any-country perspective.** The deck is right that playing the board as the adversary is native to the engine.

**Genuine weaknesses the deck understates:**

- **Fidelity is calibrated to fun, not truth.** Every number in these games was tuned for player experience and balance. As a *verifier* for RL — the deck's own core thesis — an unvalidated simulator is a reward-hacking target: agents will learn to exploit the sim's quirks (as human players demonstrably do; the entire meta-game culture of these titles is exploit discovery). AlphaZero worked because chess rules *are* ground truth. GenCast worked because weather has decades of reanalysis data to train and score against. Geopolitics has neither, and Clausewitz is not a substitute until validated — which is Stage 3, years in.
- **Performance.** The simulation core is effectively single-threaded and late-game performance is the most common complaint across HOI4/Vic3/EU4. RL needs millions of fast, parallel, headless rollouts; Clausewitz ships none of that (no headless server mode, speed capped near real-time-ish). Source access makes it fixable — or sidesteppable by using the engine as a *data generator to train a fast neural surrogate* (the GenCast lesson, which cuts against hand-built sims and quietly supports the deck's own Stage 4).
- **The AI is the worst part of the asset.** Paradox game AI is scripted weights, universally regarded as weak and exploitable; higher difficulties cheat with bonuses rather than play better. "Twenty years of paid R&D" bought content and simulation plumbing — not intelligence. All agent capability must be built new. (For the RL-environment framing this is fine — an environment shouldn't come with a solved policy — but it must be said plainly: the engine contributes the *board*, not the *player*.)
- **$250k/yr vs. $300m custom build** is a false comparison. Defense simulation programs are expensive substantially because of data integration, security accreditation (IL5/6), and VV&A — verification, validation, and accreditation. A forked game escapes none of those costs; it escapes the part of the cost (world modeling content) that was calibrated for entertainment.

### 2.3 The data: the moat is prospective, not on the shelf

The deck's strongest-sounding claim — "the largest record anywhere of humans making strategic decisions under pressure: tens of millions of player-hours" — needs the most correction:

- **The volume is real (understated, even):** cumulative play across HOI4/EU4/CK3/Stellaris/Vic3 is in the *billions* of player-hours.
- **But the decision-level data mostly was not recorded.** Paradox telemetry is aggregate (achievements, session stats). Full game-state + action trajectories at scale are not sitting in a warehouse; saves live on players' machines; multiplayer is peer-to-peer lockstep. The dataset the thesis needs must be **instrumented going forward**, with consent, shipped inside the live games — which, notably, is something only a Paradox-blessed company can do. That is the real (and defensible) version of the data moat, and the deck should state it that way.
- **Distribution shift is severe.** Players min-max a game: world conquest as Luxembourg, exploit metas, restart-scumming. Human play data teaches "how humans win Hearts of Iron," not "how states behave." Useful for imitation-bootstrapping agents in the environment; nearly useless as evidence about real-world strategic behavior.
- **The under-claimed data assets:** (a) the content files themselves — tens of thousands of hand-encoded events, decisions, and causal triggers constitute a structured knowledge base of strategic logic, ideal LLM grounding material; (b) twenty years of AARs (after-action reports), wiki, and forum text — a large corpus of humans *explaining* strategic reasoning; (c) the modding toolchain and community as a scenario-authoring labor pool. The deck mentions none of these, and they are more real than the player-hours claim.

---

## 3. Is the venture realistic?

**The honest answer: the deck is unusually honest (its "Honest Ledger" names the right risks), the wedge economics are plausible, and the core scientific bet is real but unproven. Realism depends almost entirely on which of the three faces leads.**

### What the deck gets right

1. **The timing argument is genuinely strong.** Frontier labs paying for RL environments is real and current; long-horizon agency is the frontier's stated bottleneck; test-time search is mainstream. A deep, deterministic, multi-agent, imperfect-information, long-horizon environment with two decades of content is exactly what that buyer wants, and almost nothing like it exists at Clausewitz depth.
2. **The buyer evidence is real.** DIU's Thunderforge (Scale AI/Anduril/Microsoft, deployed toward INDOPACOM/EUCOM), NATO's six-month Maven procurement, DARPA's SCEPTER line of work on AI course-of-action generation — the demand side of AI wargaming is no longer hypothetical.
3. **The game-to-institution path has precedent.** Slitherine's Command: Modern Operations Professional Edition is licensed by real militaries. It proves a commercial wargame can cross into professional use — at the *operational* level. The strategic/political level above it is genuinely unoccupied.
4. **Founder-asset fit is unusual.** "Fred" is Paradox's chairman; the IP access, the Swedish defense ecosystem (Saab, FOI, FMV), and NATO-member Sweden post-2024 are all real. Non-dilutive NRE/SBIR bridging is the correct financing structure for the procurement gap.

### What the deck gets wrong or underweights

1. **The verifier thesis eats its own tail.** The pitch is "the simulator is the verifier of the RL era" — but a verifier is only as good as its validity, and Clausewitz's validity is exactly what's unproven (the deck's own core bet). Until Stage 3 validation, the "trained" face is training against an unvalidated reward. The plan implicitly knows this (revenue leads with the *sold* and *licensed* faces) but the narrative leads with the weakest-grounded claim.
2. **The modern-world content build is the hidden mountain** (§2.1). It is the real Stage 1–2 cost driver and the deck never prices it.
3. **The competitive clock is worse than stated.** Scale is already inside the COCOMs; Palantir owns the data-integration layer and the clearances; if simulation proves valuable, **Palantir is better positioned to add a sim layer than Snille is to add Palantir's distribution**. The deck's defense ("engine + play data can't be assembled by contract") is weakest exactly where §2.2–2.3 show the assets are thinnest.
4. **Foreign-ownership friction is structural, not a slide.** A Swedish company selling strategic decision tools to the DoD lives under FOCI mitigation, export control, and — a wrinkle the deck skips — the *engine itself becoming a controlled dual-use item*, which then constrains Paradox's own consumer business. Related and unmentioned: **community/brand risk**. Paradox is a public company whose customers are gamers; "beloved game engine now powers military targeting of the political layer" is a plausible PR crisis (the games community has punished far smaller defense associations). This is a real go/no-go input for the Paradox board, not a footnote.
5. **The Aladdin comp is aspirational, not structural.** Aladdin grew inside BlackRock with daily ground truth (market prices) scoring it. A geopolitical simulator gets sparse, ambiguous, years-delayed feedback. The mechanism that compounded Aladdin does not exist here yet.

**Verdict: realistic as a company, unrealistic as pitched.** A venture that leads with the environment/benchmark business and honest wargaming products is fundable and buildable on these assets. A venture that leads with "forked game predicts geopolitics" is a credibility time bomb — and the deck's own Honest Ledger ("a strategic model trusted too early is a liability") agrees.

---

## 4. Could it be Palantir size?

Palantir context: founded 2003, In-Q-Tel-seeded, ~17 years to IPO, profitable only since 2023, ~$4B revenue and a market cap in the hundreds of billions. It got there not by predicting anything but by becoming the **data/workflow layer** government analysts live in, with forward-deployed engineers grinding through two decades of procurement.

**Base rates for the closest comps are sobering:**

| Comp | What it was | Outcome |
|---|---|---|
| Bohemia Interactive Simulations (VBS, from *Arma*) | Game engine → military training sim, the most direct "game tech to defense" analog | Sold to BAE for ~$200M (2021–22) |
| Slitherine / Command PE | Commercial wargame → professional military licenses | Healthy niche, tens of millions, not venture-scale |
| Improbable | $680M+ raised on "synthetic environments" incl. defense | Defense arm divested; thesis didn't sustain |
| Palantir | Data integration layer, not simulation | The outlier the deck wants to be |

The honest probability-weighted view of Snille:

- **~25%: failure or acqui-hire** (procurement gap outlasts runway; Paradox board balks; Scale/Palantir occupy the shelf space first).
- **~50–55%: a good niche company** — the strategic-level Slitherine/BISim: $20–100M revenue, $100M–500M outcome. This is the *modal* outcome and it is a fine business, just not the deck's curve.
- **~15–20%: a $1–5B category winner** — *if* the RL-environment thesis lands and Snille becomes the canonical training/eval ground for long-horizon strategic agents across labs + NATO. This upside is 2026-specific and real; it did not exist when BISim sold. It is also the path with the least procurement friction.
- **~1–3%: Palantir scale.** Requires (a) the open scientific question (useful geopolitical simulation) resolving favorably, (b) beating Palantir/Scale at distribution in their home market, (c) simulation becoming a budgeted procurement category across defense *and* finance, and (d) 15–20 years of survival. Each is possible; the conjunction is a tail.

**So: "could" — yes, the ceiling argument is coherent for the first time because of the RL-environment era. "Should you underwrite it as Palantir" — no.** The correct framing for investors is: a defensible $100–500M wargaming/environment business with a real call option on the strategic-agents platform. The deck's $100B-by-2046 chart is decoration and should be cut; it costs credibility with exactly the sophisticated buyers this company needs.

---

## 5. The actual killer first product

The deck's proposed Stage 1 — a supply-chain reroute demo — is the **wrong wedge**. Supply-chain risk is the most crowded adjacent market (Altana, Interos, Everstream, Sayari, Kpler already sell it, with real data pipes); Clausewitz contributes least there (no real logistics-network model exists in any title at sub-national firm level — Vic3's goods market is the closest and it is abstract); and it invites a head-to-head fidelity comparison the fork loses on day one.

The right first product falls out of §2 directly: **sell the engine as what it actually is — a game and an environment — and defer every oracle claim until a learned layer earns them.** Concretely, one product with two SKUs sharing one build:

### 5.1 The Clausewitz Gym + public benchmark (labs SKU — first revenue, months 0–9)

Headless, API-wrapped, parallelized Clausewitz (start from the EU5-era Jomini stack; HOI4 scenario content) with programmatic save/branch/rollback, sold to frontier labs and AI-safety institutes as a **long-horizon strategic-agents environment and eval**. Launch with a public benchmark — *"GSM-Bench: play 1936 Poland; survive"* — that frontier models fail in public.

Why this is the killer wedge and not just a side business:

- **It monetizes the asset exactly as-is.** No validity claim required — the environment only needs to be deep, hard, and legible, which two decades of human play *has* proven, calibrated against millions of humans. That calibration is itself the benchmark's credibility: everyone under 45 in the target institutions knows how hard it is to win as Poland.
- **No procurement.** Lab deals close in weeks, not the 18–36-month government cycle the deck worries about. The deck says Anthropic-class environment budgets are $1B+; even a sliver funds the company past Stage 1 without touching equity or SBIR paperwork.
- **It builds the substrate the whole thesis needs anyway** (headless engine, agent API, trajectory logging, the instrumentation that creates the *actual* data moat going forward — including, with Paradox's blessing, opt-in trajectory collection in the live consumer games, the one thing no competitor can replicate).
- **The benchmark is the marketing event.** "Frontier models can't win a Paradox game" is a headline that reaches every lab, every defense-tech fund, and every terminally-online defense analyst simultaneously, for the cost of a paper.

### 5.2 The synthetic adversary for strategic wargaming (defense SKU — months 6–24)

The same engine + agents, packaged as **wargaming acceleration, not decision support**: a professionally-built modern-day scenario (the Millennium Dawn concept executed to institutional standard — this is the big content investment, budget it explicitly), an AI red team conditioned on adversary doctrine that plays the board from the other side, and a branch explorer that runs a seminar wargame's excursions overnight instead of over a semester. Buyers: war colleges and professional military education, ONA/CAPE-type net-assessment shops, NATO's M&S track, RAND/CNA-type FFRDCs who run wargames by hand today — then think tanks and macro/strategy desks (who also wargame, by hand, expensively).

Why this framing wins:

- **It sells honestly.** A wargame's output is a structured argument, options surfaced, assumptions stress-tested — value that is *real and verifiable* (weeks of prep and adjudication collapsed to days) without claiming to predict the future. It sits exactly inside the trust envelope the deck's own Honest Ledger demands, and it matches what the engine's fidelity can actually support today.
- **It occupies the empty square on the deck's own landscape map.** Slitherine proved the path at the operational level; the strategic/political level above it — the level Clausewitz games actually model — has no incumbent. Thunderforge wires LLMs onto *theater* sims; the political-economic board above the theater is unclaimed.
- **CK3's leader modeling is a sleeper differentiator here:** red teams conditioned on *specific decision-makers* (risk tolerance, domestic constraints, succession pressure) is precisely what human red-teamers are paid to roleplay, and no incumbent tool attempts it.
- **The upgrade path is built-in.** Every wargame run generates trajectories; agents trained on the accumulating corpus get stronger; scenario authoring (the LLM-legible script layer, §2.2) compounds. When Stage 3 historical validation eventually lands, the same product graduates from "wargame adjudicator" to "decision support" with the customer relationships already in place — trust arriving *on* schedule rather than being demanded up front.

**Technical note that should shape the roadmap:** don't fight Clausewitz's performance ceiling with C++ heroics. Use the engine as the *data generator* to train a fast neural surrogate world model (the MuZero/GenCast pattern) — millions of engine rollouts distill into a model that rolls out orders of magnitude faster, and this becomes the proprietary Stage 4 engine the deck gestures at, grown organically instead of rewritten speculatively.

**What to explicitly not build first:** the live global stability index and any forecast-shaped product (unverifiable, credibility-fatal if wrong early — the deck agrees in its own ledger), and the supply-chain twin (crowded, data-heavy, engine-irrelevant; revisit later as a *scenario domain* inside the wargaming product rather than a standalone).

---

## 5.1a Pricing the Gym (SKU 5.1)

**List a frontier-lab training license at ~$2M/yr; hold a $1M floor; never sell exclusivity cheap.**

Value anchors: a lab replicating a Clausewitz-depth environment needs a 5–10 person team for 6–12 months (~$3–10M loaded) and still lacks the content and human difficulty calibration, so $1–3M/yr sits comfortably under build-cost; environment budgets at frontier labs run to $1B+/yr, so $2M is noise to the buyer and material to Snille. The cheap substitutes (open-source games, the $50 consumer copy) cap pricing but miss what is actually sold: headless parallel infrastructure, save/branch API, human baselines, support, and the **legal right to train commercially on Paradox content** — clean licensing is part of the product.

| Tier | Who | Price |
|---|---|---|
| Public benchmark | everyone | Free — the marketing engine |
| Held-out eval suite | labs needing uncontaminated tests | ~$100–250k/yr |
| Training license (core) | frontier labs, headless parallel rollouts | $1.5–3M/yr, list $2M |
| Scale-up / custom | scenario packs, instrumentation, priority support | $3–5M+/yr |
| Safety institutes | AISI-type evaluators | $250–500k/yr |
| Academia | research groups | free/nominal — ecosystem seeding |

Structure: first two deals at ~$750k–1M as design partners, explicitly traded for public citation rights with contracted step-ups at renewal; flat annual licenses with instance caps rather than per-rollout metering; non-exclusive by design (5 labs × ~$1.5M ≈ $7.5M ARR covers seed burn) — exclusivity is a 10x conversation and probably still "no," since it kills the benchmark's legitimacy. Below ~$500k for a frontier lab the company has priced itself as a dataset vendor. Treat eval/train separation and versioning as a product feature from day one: contamination-proofing is what keeps the benchmark citable.

---

## 5.2a Pricing the wargaming platform (Product 2) and decision support (Product 3)

**Product 2 anchor:** a serious analytic wargame today costs $100k–several million per event in expert labor and prep. Land-and-expand against that: per-exercise service at **$150–300k** (priced ~half the manual equivalent so the pilot is easy and "weeks to days" is verified on the customer's own budget line); annual institutional license **$500k–1.5M/yr** (unlimited exercises, seats, scenario library); enterprise tier **$1–3M/yr** for COCOM cells and NATO M&S with custom builds and classified-enclave deployment at a **+50–100% premium** (accreditation is real cost and real moat); scenario packs **$100–250k** as add-ons — the DLC model, correctly applied.

**Product 3** (sold only after §6 validation gates): government/ministry platform **$2–5M/yr**; finance **$1–3M/yr per desk** scaling to **$5–10M enterprise** (anchors: Eurasia-Group-type retainers for static quarterly views, ultimately Aladdin-style bps-of-assets economics); bespoke studies **$250k–1M**. No performance-linked pricing (unauditable, invites gaming); tier by users × scenario domains × refresh rate.

**Meta-rule:** price rises ~an order of magnitude per trust tier — environment ($1–3M) → exercises ($0.5–3M) → decisions ($2–10M) → risk engine at scale (tens of millions). Never price tier N on tier N+1's promise.

---

## 5.4 The exhaust economy: how Product 4+ is a by-product of Products 1–3

Product 4 is the **Grand Strategy Model** — the learned world model that replaces Clausewitz as the proprietary engine. The deck schedules it as a Stage 4 rewrite project; the better plan is that it is never a project: it condenses out of the exhaust of the revenue products, each contributing an otherwise-unbuyable ingredient, each paid for by its own customers.

- **Product 1 exhaust — coverage.** Lab agents training in the Gym generate millions of state→action→next-state trajectories, including the exploit-hunting corners only RL agents reach — simultaneously the surrogate's supervised training set and a continuous fuzzing service for the sim's fidelity bugs. Labs pay ~$2M/yr each to generate this. Result: a fast copy of the game (already valuable — it makes Gym hosting faster and higher-margin).
- **Product 2 exhaust — expert correction.** Wargames create the professional strategic-decision data the deck claimed already existed, and, more valuable, **referee overrides**: each adjudicator correction is an expert-labeled point where the game diverges from institutional judgment. Make the override workflow a first-class product feature. This data cannot be bought; it exists only as exercise by-product. Result: the surrogate is fine-tuned away from the game, toward professional judgment.
- **Product 3 + ledger exhaust — reality's gradient.** Pre-registered forecasts scored against outcomes convert "matches expert judgment" into "matches the world"; decision-support customers wire in live feeds on their own data budgets, expanding the state representation.

Progression of one artifact: fast copy of the game → corrected by expert judgment → calibrated against reality — at which point it is no longer a copy of Clausewitz but a learned geopolitical world model with a **documented provenance trail**, which is itself the future VV&A/accreditation case: the audit trail of what corrected the model and when is the compliance artifact, built as a side effect of revenue operations.

**Products 5+** are the same model repackaged at higher trust tiers, each unlocked by the ledger's track record: the finance risk engine (Aladdin analog), sovereign digital-twin deployments, and the environment-as-standard position where evaluating anyone's strategic agent means running it in this world model.

One line: every customer at every tier is unknowingly a data-labeler for the tier above — labs label coverage, colonels label fidelity, reality labels truth — and Product 4 is the ledger where all three deposits accumulate. A $10M-seed company ends up owning a frontier asset not by buying the data but by selling the collection process.

---

## 5.3 Addendum: the real-world event "oracle" — build it in parallel, but as a private ledger

Should a real-world event oracle for the environment be a parallel first step? **Yes — scoped as internal grounding-and-calibration infrastructure (~1–1.5 FTE), not as an oracle product.**

**Build three things from day one:**

1. **Live state ingestion** — GDELT/ACLED/Comtrade/GLEIF/price feeds into engine state. Needed anyway to initialize and refresh the modern-day scenario; this is the data half of SKU 5.2 started early, not a new workstream.
2. **A resolvable question bank + resolution machinery** — piggyback on Metaculus/Good Judgment/Polymarket questions and resolutions (writing unambiguous geopolitical questions is a solved craft there); author questions natively only for variables the engine outputs directly (trade volumes, prices, escalation events).
3. **A pre-registered forecast ledger** — engine rollouts, an LLM-only baseline, and market prices each log predictions on the same questions, timestamped, immutable, private.

**Why parallel rather than sequential:**

- **The ledger's value is time-locked.** Hindcasts are always suspect; live pre-registered forecasts are the only credibility currency that can't be faked, and every month the loop isn't running is track record that can never be recovered. Validation is the long pole of the whole thesis — start its clock at incorporation, not at Stage 3.
- **It disciplines the scenario build.** Forcing the modern-day scenario into resolvable variables is the QA harness that separates the professional build from Millennium Dawn.
- **Prediction-market prices are a free continuous verifier proxy** — the closest thing geopolitics has to a cheap verifier, usable as a calibration signal years before any government grants trust.

**Three constraints that keep it from becoming the credibility mistake §5 warns against:**

- **Private until it wins.** Publish nothing until the engine beats the LLM baseline over a meaningful sample; a public track record that starts mediocre is fatal with net-assessment buyers. Once it wins, it converts instantly into the Stage 3 evidence, DARPA/ONA study material, and the finance-market door-opener.
- **Capped scope.** On a ~10-person team this stays a pipeline plus a dashboard. If it exceeds ~15% of engineering, it is cannibalizing the two SKUs that pay for everything.
- **Never "oracle" externally.** The word invites the fidelity comparison the fork cannot yet win and repositions the company as a prediction shop prematurely. Externally it is grounding and calibration infrastructure.

Sequencing note: it does nothing for SKU 5.1 (labs want depth and legibility, not real-world grounding) and must not delay the Gym. Its beneficiaries are SKU 5.2, Stage 3, and eventually finance — the highest-paying market once calibration is demonstrable.

---

## 6. What has to be true — the tests that settle it

The deck's Honest Ledger is good; here is the sharpened version with falsifiable near-term tests:

1. **The environment sells.** Two signed lab deals (≥$500k/yr each) within 9 months of the Gym existing. If labs won't pay for the deepest multi-agent environment ever built during peak environment-hunger, the RL face of the thesis is dead and the company is a wargaming studio — still viable, size accordingly.
2. **The benchmark lands.** GSM-Bench cited by ≥2 frontier-lab evals or safety institutes within 12 months. This is the cheap test of whether "grand strategy" becomes a recognized agent-capability axis.
3. **A wargaming customer renews.** One PME institution or net-assessment shop runs ≥3 exercises and re-contracts. Renewal, not the pilot, is the signal — pilots in this market are free money and prove nothing.
4. **The modern-day scenario is affordable.** Scope it in month one. If the professional modern-world build costs more than ~$5M/18 months, the content mountain changes the funding plan and the board should know before incorporation, not after.
5. **Paradox survives the association.** A candid board assessment of consumer-brand and export-control blowback *before* the license is signed. If Paradox flinches later, the company loses its engine mid-flight; a five-year field-of-use license needs explicit irrevocability and escrowed source for exactly this.
6. **Validation shows signal by Stage 3.** One historical recreation (a trade war, a blockade, a sanctions cascade) where the calibrated engine materially outperforms an LLM-only baseline. This is the first moment any oracle claim becomes speakable — and if it fails, the company is still standing on SKUs 5.1 and 5.2, which never needed it.

---

## 6a. Illustrative financials and capital plan

Scenario illustrations, not forecasts: bear ≈ the modal niche outcome (~50% odds), base ≈ plan-of-record if both SKUs land (~coin flip), bull ≈ the environment-thesis-wins branch (15–20%). Clock starts Q4 2026: Y3 = 2029, Y5 = 2031, Y10 = 2036.

**Revenue, base case ($M):**

| Stream | Y3 | Y5 | Y10 |
|---|---|---|---|
| Environment licenses (labs + institutes) | 8 | 18 | 20 |
| Wargaming platform (gov/PME/FFRDC/NATO) | 4 | 16 | 55 |
| Government NRE / studies | 2 | 4 | 5 |
| Enterprise & finance | — | 3 | 22 |
| **Total** | **~14** | **~41** | **~102** |

Bear/base/bull totals — Y3: 5/14/25 · Y5: 12/40/85 · Y10: 30/100/350+. Environment revenue is deliberately flattened by Y10 (lab environment spend is plausibly a 2025–28 bubble); the wargaming platform becomes the majority. The bull case is the one where the environment instead becomes the canonical strategic-agents substrate.

**Costs, base case ($M):** Y3: ~16 (40 FTE, $4M compute) → EBITDA –2 · Y5: ~43 (95 FTE, $8M compute) → –3 · Y10: ~82 (220 FTE) → +20. Gross margins ~85%; government NRE keeps burn small by design. The modern-day scenario build (~$5M/18mo, test #4) sits in the Y2–Y3 people line.

**Why the compute line is small (an investor will ask):** Snille pretrains nothing general — foundation-model priors are bought (API/open-weight fine-tunes, $10k–100k scale), and the only house-trained model is the narrow Clausewitz surrogate, whose right comps (GenCast, MuZero/Dreamer-class) cost single-digit millions per training program. Rollout data generation is headless CPU simulation on spot fleets — hundreds of thousands, not millions. And the heavy training happens on customers' budgets by design: labs burn their own nine-figure compute training agents *inside* the Gym, paying a license — the arena doesn't pay for the gladiators' training. Two events would break this: the surrogate growing into a large multimodal grounded model ($20–30M/yr — fits Series B, and signals Layer 2 is working), or a decision to train the frontier Grand Strategy Model in-house — which turns Snille into a frontier lab with frontier-lab economics, and is exactly what the gated 2032 growth round prices.

**Valuations ($M):**

| | Y3 | Y5 | Y10 |
|---|---|---|---|
| Bear | ~60 | ~100 | ~150 (BAE/Saab/Scale acquisition — the BISim outcome) |
| Base | ~250 (18×) | ~600 (15×) | ~900–1,200 (10×, profitable) |
| Bull | ~500 | ~1,700 (20×) | ~4,000–6,000 |

Multiples at 10–20× ARR — below peak defense-AI (20–40×), compressing with maturity. Palantir scale is not a plannable case; it is the bull case compounding a further decade.

**Capital plan:**

| Round | When | Amount | Post | Gate (§6 tests) |
|---|---|---|---|---|
| First close (SAFE) | Q4 2026 | $4–5M | cap $18–25M | Buys 18 months to: license executed, CTO+GM hired, Gym v1 + benchmark public, 1–2 lab LOIs, scenario scoped |
| Seed (priced) | ~Q3 2027 | $10–12M | ~$45–55M | The gates above hit; prices on shipped benchmark + lab traction |
| Series A | H2 2028 | $25–30M | ~$180–250M | Tests 1–3: two ≥$500k lab deals, benchmark cited, one wargaming renewal |
| Series B | 2030 | $60–80M | ~$550–700M | ~$25M+ ARR, first enterprise logos, US subsidiary |
| **Total dilutive to Y5** | | **~$100–120M** | | |
| Non-dilutive NRE/SBIR/OTA | 2027–31 | ~$15–25M | | Runs alongside; keeps A and B small |

**Revised founding cap table** (fixing the deck's biggest structural flaw: 52% to two part-time founders plus Paradox, 26% to the two full-time builders — no seed investor prices that without forcing a restructure). Passive block capped at ≤25%: full-time CEO **25–32%** (founding-CEO grade at founder-level cash, ~$140–160k salary / ~$200–220k loaded in Sweden, stepping up post-A); CTO **14–17%**; Rodolfo and Fred **6–8% each**, reverse-vested with milestone-linked (not time-based) schedules and a pool step-up only on conversion to full-time; Paradox **8–10% non-voting** — IP-for-equity comps run 5–15% and the top is for perpetual assigned IP, so either 8–10% plus a capped royalty, or equity earning up to ~12% when the five-year license converts to perpetual and irrevocable (which test #5 requires anyway); pool **20–25%**; advisors 1–2%.

Founder dilution ≈ 20%/16%/12% plus pool top-ups → founders/early team retain ~50–55% through B. Minimum viable version: Gym revenue at §5.1a pricing plus NRE can carry the company to the A on the seed alone. After Y5 the base case is self-funding; the bull case takes one growth round (~$150–250M, 2032 — In-Q-Tel/EQT/NIF territory) raised only if tests 5–6 pass. Every round is gated on the falsifiable tests, not the calendar: if test 1 fails, don't raise the A — shrink to the wargaming niche; the bear column still returns the seed.

---

## 7. Bottom line

- **Realistic?** Yes, as an environment-and-wargaming company with a research arm; no, as pitched — the fork-to-oracle framing overstates engine fidelity, claims a data moat that must actually be built going forward, and hides the modern-world content mountain. The deck's self-awareness (Honest Ledger, long R&D phase, revenue-bridging design) is above average and most flaws are fixable by reordering, not by new inventions.
- **Palantir size?** The ceiling argument is newly coherent thanks to the RL-environment era, but the modal outcome is a $100–500M strategic-level BISim/Slitherine, with a real 15–20% path to $1–5B if the environment thesis lands, and low-single-digit odds of Palantir scale. Fund it as the former with a call option on the latter; cut the $100B chart.
- **Killer first product?** Not the supply-chain demo. Ship the **Clausewitz Gym + public "can an AI win as 1936 Poland" benchmark** to frontier labs for immediate, procurement-free revenue, and the **AI red team / synthetic adversary for strategic wargaming** (on a professionally built modern-day scenario) to war colleges and net-assessment shops. Sell the engine as a game and an environment — the two framings its fun-calibrated fidelity honestly supports — and let the oracle earn its way in through validation, on the customer relationships those two products create.
