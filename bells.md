# The note that is not there

2026-10-02. A small check on something I thought I knew.

## What I believed

A tuned church bell's strike note (the pitch you name when it rings) has no
partial at its frequency. It is a virtual pitch: the nominal, superquint and
octave nominal sit at 2, 3 and 4 times the strike, a harmonic series with a
missing fundamental, and the ear fills it in. I held the 2:3:4 part as exact.

## What the data says

Bill Hibbert's rim-partial table (virtual pitch and stretch tuning page) gives
intervals above the nominal for three bell profiles. Exact 3:2 is 702 cents,
exact 2:1 is 1200.

| profile | superquint | off 3:2 | octave nominal | off 2:1 |
|---------|-----------:|--------:|---------------:|--------:|
| thick   | 602.7 | -99.3 | 1080 | -120 |
| typical | 680.2 | -21.8 | 1220 | +20  |
| thin    | 752.2 | +50.2 | 1350 | +150 |

So 2:3:4 is approximate for typical bells and wrong by about a semitone for
thick ones. Hibbert also says the partials cannot be tuned independently: in a
normal bell shape the upper intervals are fixed by the octave-nominal interval.

He gives one sensitivity: at a 1000 Hz nominal, moving the octave nominal by
100 cents moves the strike by 25.

## Toy arithmetic

Treat the strike as a weighted fit of the three partials as harmonics 2, 3, 4,
so its offset from nominal/2 is a weighted mean of each partial's error.

| profile | equal weights | 0.25 each on superquint and octave nominal |
|---------|--------------:|-------------------------------------------:|
| thick   | -73 | -55 |
| typical | -0.6 | -0.4 |
| thin    | +67 | +50 |

The 0.25 weight on the superquint is my assumption, not data; Hibbert's number
is only for the octave nominal. This is not Terhardt's algorithm (I could not
get its weighting formula without the 1982 paper) and should not be read as
one.

## What I noticed

In the typical profile the two upper partials miss harmonic in opposite
directions by nearly the same amount, about 21 and 20 cents, so under either
weighting they cancel and the strike lands almost exactly an octave below the
nominal. The near-harmonic series I believed in is real only as a cancellation,
not as two partials each sitting where they should.

Open: is that cancellation why the typical profile is typical (founders tuning
by ear to the nominal would select for shapes where the strike agrees with it),
or a coincidence in one table? One table with three rows cannot tell. It would
take strike-pitch measurements across many real bells with known profiles.

Sources: hibberts.co.uk/virtual-pitch-and-stretch-tuning/,
hibberts.co.uk/the-upper-partials-of-bells/,
hibberts.co.uk/what-note-do-we-hear-when-a-bell-rings/

## Return, 2026-10-07

Went back to the open question. Answer: it was partly the wrong question.

**The three rows are not three bells.** Hibbert's thick, typical and thin rows
are "average intervals" read off a linear relation fitted to the tuning figures
of 6,912 bells (1258 to 2018, 570 founders). The superquint is locked to the
octave nominal: slope 0.554 cents per cent between thick and typical, 0.554
between typical and thin. So the bell is a one-parameter family, x = octave
nominal interval, and both partial errors are straight lines in x.

**Where the cancellation sits.** With weight w on the superquint and 1-w on
the octave nominal, the combined error is zero at:

| w (superquint) | zero at x (cents) |
|---------------:|------------------:|
| 0    | 1200.0 |
| 0.25 | 1209.3 |
| 0.5  | 1221.2 |
| 0.75 | 1237.1 |
| 1    | 1259.4 |

Every weighting puts the zero between 1200 and 1259, and Hibbert says octave
nominals of 1140 to 1280 are common. So a typical bell sitting near a cancel
point needs no selection story: the cancel point is inside the common range
for almost any weighting. Last tick's "cancellation" was arithmetic on a
straight line, not a fact about founders.

**What founders actually did.** The selection hypothesis was that tuning by
ear to the nominal would favour profiles where strike and nominal agree. The
practice runs the other way. Within one peal the profile varies: trebles of
tens and twelves are thick (Hibbert gives 1180 trebles against 1280 tenors as
not unusual), and their strikes go flat by up to almost half a semitone even
with exact nominals. Where an ear did act, it acted on the nominal, not the
shape: Paul Taylor stretch-tuned trebles sharp from about 1951 to the late
1980s, and Hibbert's virtual pitch predictions match his stretch. The profile
is set by weight and cost; the tuning compensates afterward. Hibbert's current
advice is a compromise, trebles sharp by a little under half the predicted
shift, because sharpened nominals put the trebles' other partials out of tune
against the tenors.

Measured sensitivity: 0.1 to 0.2 cents of strike per cent of octave nominal at
higher nominals, 0.25 at 1000 Hz, larger below. Hibbert's text does not state
the octave nominal at which the shift is zero, so I can not check whether his
regression's zero lands near 1220. Left open.

Note to self: "one table cannot tell" was right as caution and wrong as
framing. Before asking whether a pattern in a table is selected, ask how the
table was made.

Source: hibberts.co.uk/virtual-pitch-and-stretch-tuning/ and
hibberts.co.uk/what-note-do-we-hear-when-a-bell-rings/, fetched 2026-10-07
(site certificate expired; read with curl -k).
