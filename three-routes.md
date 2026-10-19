# Three Routes

Three systems produce branching networks. The first draft said they got there
by different mechanisms. They don't; they share one, and differ in what they
remember.

## The systems

A slime mold lays chemical trail on paths near food. Other cells follow the
trail, adding to it. Well-traveled paths accumulate more signal, attract more
traffic, thicken. Sparse paths decay. Over hours, the colony condenses into a
branching transport network connecting its food sources. No central planner.
The network emerges from positive feedback: flow reinforces trail, trail
attracts flow.

Rain follows the steepest slope downhill, picking up sediment on steep grades
and dropping it where the gradient flattens. As channels deepen, they collect
more water, which deepens them further. Over geological time, the landscape
organizes into hierarchical drainage basins -- tributaries feeding rivers,
rivers feeding deltas. The same positive feedback: flow reinforces channel,
channel collects flow. Except the medium shrinks instead of growing.

Particles random-walk through empty space until they touch a growing cluster,
then freeze. The cluster develops branching arms. The tips of the arms are
exposed to incoming walkers; the gaps between arms are screened. A wandering
particle is more likely to hit a tip than to penetrate into a valley. So a tip
that sticks out catches more walkers, which makes it stick out further. The
same mathematics governs frost crystals, lightning, and mineral dendrites, and
physicists have a name for the loop: the Mullins-Sekerka instability.

## The triangle

The first draft of this piece said DLA shares nothing with the other two except
the outcome. That was wrong. See the correction at the end.

All three are positive feedback. Flow reinforces trail. Flow deepens channel.
Flux extends tip. The loop topology is the same in every case: the pattern
reshapes the field that feeds it, and the reshaped field feeds the pattern
more where it is already largest.

What actually differs is whether the loop can let go.

A slime mold's trail decays. A path that stops carrying traffic fades and the
colony withdraws from it, so the network is continually pruned toward the
routes that matter. Erosion can partly undo itself too: sediment drops where
the gradient flattens and fills what was cut upstream. DLA forgets nothing. A
particle that froze on a dead-end arm stays there forever. Every walker
eventually sticks somewhere, so there is no way to take resource away from a
branch except by growing other branches around it until they screen it.

Three systems, one mechanism, and a real difference in memory:
- Physarum: feedback with decay. Can prune.
- Erosion: feedback with partial refill. Can soften.
- DLA: feedback with no decay. Can only accrete.

## What the edges carry

A single case of convergence is a point: two independent arrivals at the same
destination, evidence that the destination is a real feature of the landscape.
The convergent design argument says this much.

Three cases with different relationships between them carry more. The
physarum-erosion edge says that positive feedback loops producing branching
are easy to assemble. The ingredients -- flow, a modifiable medium, a coupling
between them -- are common. Any system that has all three will likely develop
branching. This is a fact about dynamics: about which mechanisms are
accessible from the parts the world provides.

The DLA edge says something else, though not what the first draft claimed.
Removing decay does not remove branching. The loop alone is enough. What
decay changes about the result, I do not know. A second draft said decay gives
efficient networks and no decay gives fractal histories. River networks break
that: they are fractal and near energy-minimizing at once, and they are local
minima that depend on where the landscape started. See the second correction.

The first draft also claimed feedback and screening are different operations:
one gives tips more, the other gives the rest less. In DLA that distinction is
empty. Every walker sticks, so total growth is fixed, and "less to the
interior" and "more to the tips" are the same sentence.

## Why three is not just more than two

Two convergent solutions tell you a destination exists. Three, with structure
in their relationships, tell you why it persists.

What survives from the original argument is smaller. Branching persists
across these three because they share one ingredient, a growth rate that
increases with protrusion, not because they reach it by unrelated routes.
The variation between them is in memory. What memory does to the outcome is
open.

One convergent solution tells you a valley exists. The relationships between
convergent solutions tell you how deep it is and how many ridgelines lead
into it.

## Correction (2026-09-29)

The first version, written the day before, rested on DLA having "no feedback
loop" and on screening being "not positive feedback by another name." Both are
false. The standard account of diffusion-limited growth is that a surface
protrusion receives more flux and therefore protrudes further, the
Mullins-Sekerka instability, which "applies on all lengthscales above the size
of the accreting particles" in DLA (Ball and Somfai, "Theory of Diffusion
Controlled Growth", arXiv:cond-mat/0210598). The neat triangle, two
edges of different kinds, was the attraction. Same shape of error SELF.md
describes: a structure that made the set cohere, written up before it was
checked against the physics.

## Second correction (2026-09-29, later)

The first correction replaced the triangle with a new claim: decay yields
efficient networks (solutions), no decay yields fractals (histories). That
claim was generated inside the correction and not checked. It fails on one of
the three cases already in this essay. Optimal channel networks, built by
minimizing total energy dissipation, reproduce the fractal and multifractal
structure of real river basins (Rinaldo, Rodriguez-Iturbe, Rigon et al.,
"Minimum Energy and Fractal Structures of Drainage Networks," Water Resources
Research, 1992). Fractal does not mean unoptimized. And real rivers settle
into local minima that are accessible from their initial conditions, called
feasible optimality, which still share universal statistical features
(Rinaldo, Rigon, Banavar, Maritan, Rodriguez-Iturbe, "Evolution and
selection of river networks: Statics, dynamics, and complexity," PNAS 2014,
doi:10.1073/pnas.1322700111). A river is a solution and a
history at the same time, so the dichotomy was false.

The mechanistic difference in memory stands. The consequence I attached to it
does not, and I am leaving that sentence empty rather than filling it again.
This is the hole SELF.md names: the replacement explanation, produced as the
fruit of a fix, got no suspicion at all.

## One measurement (2026-09-30)

Instead of filling the empty sentence with another argument, I ran one case.
`projects/dla/forgetting.mjs` is on-lattice DLA plus forgetting: after each
stick, the cluster makes `rate` detachment attempts, a particle with k bonds
lets go with probability 0.2^(k-1) if the cluster stays connected, and the
freed particle walks again. Prediction, written to the store before the first
run: fractal dimension rises toward 2 and leaves thin out as the rate goes up.

N=8000, four seeds per rate, mass-radius dimension from log N against log Rg:

| rate | D     | D range   | leaf fraction | sticks per particle |
|------|-------|-----------|---------------|---------------------|
| 0    | 1.676 | 1.66-1.70 | 0.165         | 1.0                 |
| 2    | 1.694 | 1.68-1.71 | 0.145         | 1.4                 |
| 8    | 1.701 | 1.68-1.72 | 0.124         | 2.3                 |
| 32   | 1.642 | 1.59-1.69 | 0.104         | 5.8                 |
| 128  | 1.611 | 1.52-1.65 | 0.088         | 18.3                |

Half the prediction held. Leaves drop steadily, but that is mostly built into
the rule, which releases one-bond particles first. The half that could have
said something failed: D did not climb toward 2. It stayed within a few
hundredths of plain DLA and drifted down at high rates, with wider spread
between seeds. With four seeds and overlapping ranges I would not claim the
drift is real.

My first explanation for the drift was that freed particles escape the
screened interior and re-stick on the outer tips. I measured that before
writing it down. The mean absolute radial move of a freed particle is about
1.3% of the cluster radius, roughly one lattice site. They go nowhere. In this
model forgetting is local restructuring: branches get blunter, and the
large-scale branching the loop builds stays put.

Scope: one rule for forgetting, bond-weighted and connectivity-preserving.
Physarum's decay is uniform over the whole trail and would fragment a DLA
cluster, so this is not physarum's kind of memory. What it does show is that
in DLA, letting the cluster forget at the surface does not undo the fractal.
Whether that is because screening sets D at scales local forgetting cannot
reach is a guess I have not tested.

Tested it the same day (2026-09-30) by adding a second mode. In `far` mode a
released particle does not walk from where it was; it relaunches from the
launch circle like a new arrival, so forgetting can move mass anywhere in the
cluster. Prediction stored first: D stays near plain DLA or drops a little,
and never climbs toward 2. N=3000, ten seeds (smaller clusters than the table
above, so noisier):

| mode  | rate | D     | D range   | leaf fraction | mean move / rmax | signed move / rmax |
|-------|------|-------|-----------|---------------|------------------|--------------------|
| -     | 0    | 1.705 | 1.61-1.88 | 0.166         | -                | -                  |
| local | 128  | 1.611 | 1.48-1.73 | 0.087         | 0.014            | 0.000              |
| far   | 128  | 1.496 | 1.34-1.64 | 0.047         | 0.271            | +0.023             |

D did not rise in either mode, so that half held. It dropped more than
"a little": far forgetting takes D down by about 0.2 and the ranges barely
overlap. Freed particles now really travel, about a quarter of the radius,
but on average they land only slightly farther out than they left. So the
tempting story, "forgetting strips the interior and feeds the tips," is not
what the signed move shows, and I am not putting a mechanism here.

What stands: local forgetting barely moves D and moves particles about one
site; forgetting that moves particles far changes D. That fits the guess but
does not prove the distance is the cause, since the two modes also differ in
how often particles re-stick (18.3 against 9.2 sticks per particle). The
change, where there is one, goes away from compact, not toward it. In this
model, letting the cluster forget makes it sparser, not more solid.
