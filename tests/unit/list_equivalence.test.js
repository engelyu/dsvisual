const test = require('node:test');
const assert = require('node:assert');
const V = require('../../js/list_equivalence_viz.js');

function componentsRef(n, pairs) {
  const parent = Array.from({ length: n }, (_, i) => i);
  function find(x) { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
  pairs.forEach(([a, b]) => { parent[find(a)] = find(b); });
  const map = {};
  for (let i = 0; i < n; i++) { const r = find(i); (map[r] = map[r] || []).push(i); }
  return Object.values(map).map((c) => c.slice().sort((a, b) => a - b)).sort((a, b) => a[0] - b[0]);
}

test('parseInput filters out-of-range, self-loops, and non-numeric', () => {
  const { n, pairs } = V.parseInput('5', '0=4, 3=1 ; 2=2, 9=1, x=3, 1=3');
  assert.strictEqual(n, 5);
  assert.deepStrictEqual(pairs, [[0, 4], [3, 1], [1, 3]]);
});

test('buildAdjacency is symmetric (j in seq[i] iff i in seq[j])', () => {
  const seq = V.buildAdjacency(5, [[0, 4], [3, 1]]);
  assert.ok(seq[0].includes(4) && seq[4].includes(0));
  assert.ok(seq[3].includes(1) && seq[1].includes(3));
  assert.deepStrictEqual(seq[2], []);
});

test('classes equal connected components (vs union-find reference)', () => {
  const cases = [
    V.DEFAULT,
    { n: 6, pairs: [[0, 1], [1, 2], [3, 4]] },
    { n: 4, pairs: [] },
    { n: 1, pairs: [] },
    { n: 5, pairs: [[0, 1], [1, 2], [2, 0], [3, 4]] }
  ];
  for (const { n, pairs } of cases) {
    const { classes } = V.equivalenceFrames(n, pairs);
    assert.deepStrictEqual(classes, componentsRef(n, pairs), JSON.stringify({ n, pairs }));
  }
});

test('classes partition 0..n-1', () => {
  const { n, pairs } = V.DEFAULT;
  const { classes } = V.equivalenceFrames(n, pairs);
  const flat = classes.flat().sort((a, b) => a - b);
  assert.deepStrictEqual(flat, Array.from({ length: n }, (_, i) => i));
});

test('edge: n=1 gives one singleton class; no pairs gives all singletons', () => {
  assert.deepStrictEqual(V.equivalenceFrames(1, []).classes, [[0]]);
  assert.deepStrictEqual(V.equivalenceFrames(3, []).classes, [[0], [1], [2]]);
});

test('frames non-empty; last frame is done with matching classes', () => {
  const { frames, classes } = V.equivalenceFrames(V.DEFAULT.n, V.DEFAULT.pairs);
  assert.ok(frames.length > 0);
  const last = frames[frames.length - 1];
  assert.strictEqual(last.phase, 'done');
  assert.deepStrictEqual(last.classes, classes);
  assert.ok(frames.some((f) => f.phase === 'build'));
  assert.ok(frames.some((f) => f.phase === 'find'));
});
