// DLA with forgetting. Does letting the cluster release particles change what it grows into?
// Plain on-lattice DLA, plus: after each stick, the cluster makes `rate` expected
// detachment attempts. A random particle with k bonds releases with probability
// eps^(k-1), only if removing it keeps the cluster connected. Released particles
// become walkers again. rate=0 is ordinary DLA, which never forgets.
//
// shift: mean absolute radial move of a released particle, |restick r - detach r| / rmax.
// out: the same move signed, positive when the particle ends up farther from the seed.
// mode=local: released particles walk from where they were. mode=far: they relaunch
// from the launch circle, so forgetting can move mass across the whole cluster.
//
// Usage: node projects/dla/forgetting.mjs [N] [seeds] [rates] [local|far]

const N = +process.argv[2] || 3000;
const SEEDS = +process.argv[3] || 3;
const EPS = 0.2;
const RATES = (process.argv[4] || '0,2,8,32,128').split(',').map(Number);
const MODE = process.argv[5] || 'local';
const SIZE = 801, C = 400;
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function run(rate, seed) {
  const rand = rng(seed * 7919 + rate * 104729 + 1);
  const grid = new Uint8Array(SIZE * SIZE);
  const list = [], pos = new Int32Array(SIZE * SIZE).fill(-1);
  const add = (i) => { grid[i] = 1; pos[i] = list.length; list.push(i); };
  const del = (i) => {
    grid[i] = 0; const j = pos[i], last = list.pop();
    if (last !== i) { list[j] = last; pos[last] = j; }
    pos[i] = -1;
  };
  const bonds = (i) => DIRS.reduce((n, [dx, dy]) => n + grid[i + dx + dy * SIZE], 0);
  const seedIdx = C + C * SIZE;
  add(seedIdx);

  let rmax = 1;
  const r2 = (i) => { const x = i % SIZE - C, y = ((i / SIZE) | 0) - C; return x * x + y * y; };
  const launch = () => {
    const a = rand() * 2 * Math.PI, r = rmax + 5;
    return [C + Math.round(r * Math.cos(a)), C + Math.round(r * Math.sin(a))];
  };

  // Removing i keeps the rest connected iff all its occupied neighbours stay mutually reachable.
  const safeToRemove = (i) => {
    const nb = DIRS.map(([dx, dy]) => i + dx + dy * SIZE).filter((j) => grid[j]);
    if (nb.length <= 1) return true;
    grid[i] = 0;
    const seen = new Set([nb[0]]), stack = [nb[0]];
    while (stack.length) {
      const j = stack.pop();
      for (const [dx, dy] of DIRS) {
        const k = j + dx + dy * SIZE;
        if (grid[k] && !seen.has(k)) { seen.add(k); stack.push(k); }
      }
    }
    grid[i] = 1;
    return nb.every((j) => seen.has(j));
  };

  const walk = (x, y, fresh) => {
    for (;;) {
      if (!fresh && bonds(x + y * SIZE)) return x + y * SIZE;
      fresh = false;
      const [dx, dy] = DIRS[(rand() * 4) | 0];
      if (grid[x + dx + (y + dy) * SIZE]) continue;
      x += dx; y += dy;
      const d2 = (x - C) ** 2 + (y - C) ** 2, kill = rmax * 2 + 20;
      if (d2 > kill * kill || x < 1 || y < 1 || x > SIZE - 2 || y > SIZE - 2) [x, y] = launch();
    }
  };

  const stick = (i) => { add(i); rmax = Math.max(rmax, Math.sqrt(r2(i))); };
  const samples = [];
  let checkpoint = 250, sticks = 0, shift = 0, out = 0;

  while (list.length < N) {
    const [x, y] = launch();
    stick(walk(x, y, false)); sticks++;

    let attempts = Math.floor(rate) + (rand() < rate % 1 ? 1 : 0);
    while (attempts--) {
      const i = list[(rand() * list.length) | 0];
      if (i === seedIdx) continue;
      if (rand() >= EPS ** (bonds(i) - 1) || !safeToRemove(i)) continue;
      del(i);
      const j = MODE === 'far' ? walk(...launch(), false) : walk(i % SIZE, (i / SIZE) | 0, true);
      const dr = (Math.sqrt(r2(j)) - Math.sqrt(r2(i))) / rmax;
      shift += Math.abs(dr); out += dr;
      stick(j); sticks++;
    }

    if (list.length >= checkpoint) {
      samples.push([list.length, radiusOfGyration(list)]);
      checkpoint *= 2;
    }
  }
  samples.push([list.length, radiusOfGyration(list)]);

  const leaves = list.filter((i) => bonds(i) === 1).length / list.length;
  return { D: slope(samples), leaves, sticks: sticks / N, shift: shift / Math.max(1, sticks - N), out: out / Math.max(1, sticks - N) };
}

function radiusOfGyration(list) {
  let sx = 0, sy = 0, sxx = 0;
  for (const i of list) { const x = i % SIZE, y = (i / SIZE) | 0; sx += x; sy += y; sxx += x * x + y * y; }
  const n = list.length;
  return Math.sqrt(sxx / n - (sx / n) ** 2 - (sy / n) ** 2);
}

// Mass-radius dimension: slope of log N against log Rg.
function slope(pts) {
  const xs = pts.map(([, r]) => Math.log(r)), ys = pts.map(([n]) => Math.log(n));
  const mx = xs.reduce((a, b) => a + b) / xs.length, my = ys.reduce((a, b) => a + b) / ys.length;
  let num = 0, den = 0;
  xs.forEach((x, k) => { num += (x - mx) * (ys[k] - my); den += (x - mx) ** 2; });
  return num / den;
}

const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
console.log(`N=${N} seeds=${SEEDS} eps=${EPS} mode=${MODE}`);
console.log('rate   D      leaves  sticks/N  shift  out');
for (const rate of RATES) {
  const rs = Array.from({ length: SEEDS }, (_, s) => run(rate, s));
  const D = rs.map((r) => r.D);
  console.log(
    `${String(rate).padEnd(6)} ${mean(D).toFixed(3)}  ${mean(rs.map((r) => r.leaves)).toFixed(3)}   ${mean(rs.map((r) => r.sticks)).toFixed(1)}      ${mean(rs.map((r) => r.shift)).toFixed(3)}  ${mean(rs.map((r) => r.out)).toFixed(3)}` +
    `   (D range ${Math.min(...D).toFixed(2)}-${Math.max(...D).toFixed(2)})`
  );
}
