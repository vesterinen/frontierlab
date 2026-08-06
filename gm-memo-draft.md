# What I would do if I spearhead the project

**Ville Vesterinen — draft memo to the founders**

*NB. I also absolutely used Claude to generate parts of this document if the editing is familiar.*

After talking to all of you, on my part, I would be happy to spearhead the company and commit to building the early foundation at minimum. I have the best visibility and the experience in going from 0 to 1: building the early team, setting the product vision and building the v1, raising the capital and setting the foundation for success. Naturally, if things pan out I'm absolutely interested in building a world-leading frontier lab.

## First 90 days

1. Crystallize the first product concept and the rough roadmap with the founding team — what we're selling and what's the promise.
2. Fix the cap table (passive/active ownership split needs to be VC-fundable).
3. Build the deck once 1. and 2. are done.
4. Talk to potential CTO candidates in parallel. Once there's a deck, the pitch becomes stronger. For a high-level CTO, joining can be conditional on the capital raise as long as we can use him on the deck. Easier sell.
5. Contact selected investors and customers. Engage customers on both sides of the Atlantic — frontier labs, DoD, Wallenberg portfolio — to understand needs and get dialogues going, but prioritize the specific sectors the first product is designed for.

Below is the product map I would suggest based on what I know at the moment. That said, I would still engage a wide selection of potential future customers to calibrate the product roadmap and learn about their needs and willingness to pay. At the same time I would keep the product dev effort and most of the customer dev time on the current thesis of what is our Product 1 and who is the buyer.

## The three products — and the machine they're secretly building

### Product 1: The Clausewitz Gym

**What it actually is.** Today, a Paradox game exists to be played by one human through a graphical interface, in real time, on one machine. The Gym is the same simulation with all of that stripped away and replaced by what a machine needs: it runs headless (no graphics, no UI — just the world ticking forward on a server), it's controlled through an API (a program reads the full world state as data — every country's economy, armies, treaties, politics — and submits orders the same way), and it exposes the engine's hidden superpower: because the simulation is deterministic, any moment can be saved, branched, and replayed. Freeze 1941, try invading, rewind, try blockading instead, compare the two futures. Run ten thousand copies in parallel on cheap CPUs. On top sits a public benchmark — a standardized challenge like "survive as Poland from 1936" with scored difficulty tiers calibrated by two decades of human play.

**Who buys it and why.** Frontier AI labs (OpenAI, Anthropic, DeepMind, xAI and the tier below) have hit a specific bottleneck: their models are brilliant in a single response but poor at long-horizon agency — pursuing goals over thousands of steps, against adversaries, with incomplete information. Training that capability requires practice environments, and the labs are paying heavily for them because good ones are scarce and slow to build. Almost everything on the market is shallow (browser tasks, coding sandboxes). A grand-strategy game is arguably the deepest agency environment ever constructed — multi-agent, imperfect-information, economic and military and diplomatic at once, with horizons of thousands of decisions — and it comes with something no lab can build internally: a human difficulty calibration, because millions of players have established exactly how hard it is. A lab buys a license ($1.5–3M/yr), plugs its models in, and trains. The public benchmark, which today's models will fail, is simultaneously the sales demonstration and a legitimate scientific contribution.

**Why it's first.** It requires no claim that the simulation matches reality (labs need it hard and deep, not true), no government procurement cycle, and no new content — the games as they exist are the product. It's sellable in months and funds everything else.

### Product 2: The AI red team for strategic wargaming

Three components: a professionally built modern-day scenario (the current world encoded into the engine — the plan's single biggest content investment; nothing like it exists at institutional quality); adversary agents — AI players built from foundation models steering the engine, tuned in the Gym, playing the other side of the board conditioned on real doctrine and real constraints; and a branch explorer — one seminar wargame's setup run down a thousand alternative paths overnight, producing the distribution of how the scenario tends to unfold and which decisions actually mattered.

The buyers are institutions that already run wargames by hand: war colleges, net-assessment offices, FFRDCs like RAND, NATO's modeling-and-simulation programs, eventually corporate strategy and macro-finance teams. Their current process is weeks of prep, scarce human experts role-playing the enemy, and — because of the cost — perhaps three or four excursions ever explored. The product collapses prep to days and multiplies explored branches a hundredfold. Priced against the manual alternative: $150–300k per exercise versus the $100k–$1M+ a serious manual game costs, growing into $0.5–3M/yr institutional licenses.

**The critical positioning choice:** it is sold as a better wargame, never as a prediction machine. A wargame's output — assumptions exposed, options surfaced — is verifiable on delivery regardless of whether the sim would have predicted reality. Every claim stays inside what the engine can honestly support, protecting our credibility during exactly the years we can't yet prove more.

### Product 3: Decision support

The same system, graduated from the exercise room to the operations floor: live data feeds continuously updating the world state, a standing board of branching futures with probabilities and horizons, watchlists that flag when reality starts tracking a dangerous branch. Buyers: foreign ministries and net-assessment shops, then the highest-paying market — macro funds, commodity traders, reinsurers, at $2–10M/yr. This product is **unlocked, not launched**: it goes on sale only after the private forecasting ledger (pre-registered predictions, scored against reality, compared against baselines) proves the system genuinely beats an analyst with an LLM. Until then, selling it would be selling a claim we can't back — the one mistake that would poison the trust the first two products earn. Conveniently, its first customers are the institutions Product 2 has already spent years serving.

### Why the sequence builds the ultimate product while customers use it

The ultimate product — Product 4, the Grand Strategy Model — is a learned neural world model of geopolitics: given a state of the world, it predicts how it evolves, fast enough to search millions of futures. It cannot be built directly, by anyone, at any price, because it needs three ingredients that do not exist as purchasable data: dense coverage of strategic state-space, expert judgment about how strategic situations really resolve, and ground-truth calibration against actual events. The three products are arranged so that each one's paying customers manufacture exactly one missing ingredient, as exhaust from getting value for themselves:

**Product 1 manufactures coverage.** The surrogate model starts as a student of the engine: a neural network trained on millions of "state → actions → next state" examples to imitate Clausewitz, becoming a copy that runs orders of magnitude faster. Those examples are precisely what lab customers generate every hour their agents train in the Gym — including the bizarre corners of state-space only reward-hungry RL agents ever visit. When those agents find exploits, each exploit is a discovered fidelity bug. The labs pay ~$2M a year each to be our data generator and our QA department. *Output: a fast copy of the game.*

**Product 2 manufactures expert correction.** Colonels and analysts playing the scenario produce the record of how trained strategists actually decide under pressure — the dataset the original deck claimed already existed in Paradox's archives; this is where it actually comes into being. More precious still are referee overrides: every time an adjudicator corrects the engine's outcome, that correction is an expert-labeled error pinpointing where game logic diverges from institutional knowledge. Built as a first-class product feature, these accumulate into a fine-tuning dataset that cannot be bought — only harvested from exercises customers pay us to run. *Output: a model pulled away from the game, toward professional judgment.*

**Product 3 (with the ledger underneath it) manufactures truth.** The pre-registered forecast ledger — running quietly from day one — scores the model's branches against what actually happens. A slow drip rather than a firehose, but the only signal that converts "agrees with the colonels" into "agrees with the world," compounding for years before Product 3 even launches. *Output: a model calibrated against reality — no longer a copy of Clausewitz at all.*

**Why this beats building Product 4 directly.** A frontier lab could throw $500M of compute at "simulate geopolitics" and still fail, because compute can't conjure the referee overrides or the decade of scored forecasts — those only exist as by-products of operating real exercises and deployments over years. The sequence converts that impossibility into a business plan: revenue arrives at each stage for what the system can already honestly do, customers fund the collection of the un-buyable data, and each tier's trust is earned before the next tier's claim is made. There's even a regulatory dividend: the provenance trail — what corrected the model, when, against what evidence — is precisely the documentation a government will one day demand before accrediting a learned model for real decisions.

One sentence: labs teach it the game, colonels teach it the world as experts believe it works, reality teaches it the world as it actually is — and every one of those teachers pays tuition to us.

## The first two rounds, as I would run them

I would raise twice before any Series A, with the second round priced on shipped product rather than story. Both rounds are gated on milestones, not scheduled on a calendar — if a gate fails, we don't raise into it, we fix or resize.

**Round 1 — first close: $4–5M on a SAFE, cap $18–25M, at incorporation (target Q4 2026).**

Why this size and not $2–3M (which I believe we could raise easily): the two slowest items on the critical path — the Paradox license process and a world-class CTO search — consume calendar without consuming much cash. Twelve months of runway with no slack means fundraising again mid-build, from weakness. Eighteen months of runway means we raise the seed on our terms. And why not more: before the CTO is aboard, hiring is the bottleneck, not capital. Money raised on story alone is the most expensive money we will ever take.

This round must deliver five things before we price the seed:

1. Clausewitz license executed — perpetuity/escrow terms on paper, not agreed in principle
2. CTO and founding engineering team hired
3. Gym v1 live and the public benchmark shipped
4. One or two frontier-lab design partners signed ($750k–1M each, traded for citation rights)
5. Modern-day scenario scoped and costed; the private forecast ledger running quietly

Investor profile: the retired defense/intelligence angels already identified (their value is warm US and Nordic introductions, not the check), one institutional fund capable of leading the seed later so the follow-on is pre-wired, and Nordic angels who open Saab/FOI/FMV doors. In parallel — month one, not later — we file the non-dilutive applications (Vinnova, EIC, NATO DIANA): their 6–9 month decision cycles land exactly when seed-stage burn begins.

**Round 2 — priced seed: $10–12M at ~$45–55M post, roughly 9–12 months after first close.**

Priced on a shipped benchmark, named lab logos, and a hired team — not on projections. This is the round that funds Product 2 and the US entry. Across both rounds we sell roughly a third of the company to reach ~$8–10M ARR; if the Gym sells at plan, the seed is partly optional and we take it for speed, not survival.

## What the money does

**First close, ~$4.5M over 18 months:**

| | $M |
|---|---|
| Team — ramp to ~9 FTE: CTO, two engine programmers, two RL/infra engineers, benchmark & data engineer, myself, ops (founders part-time) | 2.6 |
| Legal & IP — license negotiation, entity structure, early FOCI/export counsel (deliberately heavy line) | 0.4 |
| Compute & infrastructure — Gym hosting, surrogate-model prototyping | 0.25 |
| Customer development — the lab circuit, defense conferences, both sides of the Atlantic | 0.3 |
| Buffer (~20%) | 0.95 |
| **Total** | **4.5** |

**Seed, ~$11M, carrying us through 2029 in combination with revenue:**

| | $M |
|---|---|
| Team to ~25–30 — wargaming product team, scenario content team, first US hire | 6.0 |
| Modern-day scenario build — first tranche of the ~$5M program; our biggest content investment | 2.0 |
| Compute step-up — surrogate training at scale | 1.5 |
| US subsidiary + accreditation groundwork | 0.7 |
| Go-to-market — first paid exercises, NATO M&S track | 0.8 |
| **Total** | **11.0** |

Combined with Gym revenue ($3–6M/yr by 2028) and non-dilutive money, this reaches either the Series A gates (two lab deals ≥$500k renewed, benchmark cited by labs, one wargaming customer re-contracted) or breakeven — meaning the Series A becomes a choice about ambition, not a necessity.

## What I need from you

1. **The cap table restructure before any investor conversation.** Passive holders (non-full-time founders plus Paradox) at a maximum of 25% combined, active leadership at founder grade, everyone — including part-timers — on reverse vesting with milestone-linked schedules. This is condition zero: it cannot be fixed after first money is in.
2. **License posture.** Perpetuity/irrevocability and escrowed source as negotiation objectives with Paradox — not nice-to-haves. A five-year license on the company's core asset is not financeable at the level we intend.
3. **A decision date.** The existing 15 August go/no-go works. I'm asking for a yes or no on this structure by then.

## How I think about the seat

If for some reason it's not a great fit — or we conclude, for example, that we need a US-based CEO for the market we're entering — I'm happy to step down. The company comes first, and these things are more fun when we can talk about every scenario openly among the founders. This goes a long way to avoiding unnecessary theatre.
