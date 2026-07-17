const test = require('node:test');
const assert = require('node:assert/strict');
const { catalanNumber, catalanClosed, enumerateShapes, catalanSequence, buildCatalanFrames } = require('../../js/tree_catalan_viz');

const PINNED = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796];

test('catalanNumber and catalanClosed match the pinned sequence 0..10', () => {
  for (let n = 0; n <= 10; n++) {
    assert.equal(catalanNumber(n), PINNED[n], 'recurrence C' + n);
    assert.equal(catalanClosed(n), PINNED[n], 'closed C' + n);
  }
});

test('enumerateShapes count equals the Catalan number for n=0..4', () => {
  for (let n = 0; n <= 4; n++) assert.equal(enumerateShapes(n).length, PINNED[n]);
  // shape well-formedness: n=2 yields two shapes (left-leaning and right-leaning)
  const s2 = enumerateShapes(2);
  assert.equal(s2.length, 2);
  for (const s of s2) assert.ok(s && (s.left || s.right));
});

test('buildCatalanFrames(3): group products and running total', () => {
  const { frames, total } = buildCatalanFrames(3);
  assert.equal(total, 5);
  const groups = frames.filter((f) => f.action === 'group');
  assert.equal(groups.length, 3);                       // splits i=0,1,2
  assert.deepEqual(groups.map((g) => g.product), [2, 1, 2]);
  for (const g of groups) assert.equal(g.groupShapes.length, g.product);
  assert.equal(groups[groups.length - 1].runningTotal, 5);
  assert.equal(frames[frames.length - 1].action, 'done');
});

test('n=0 total is 1 and frames are bilingual', () => {
  const { frames, total } = buildCatalanFrames(0);
  assert.equal(total, 1);
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); }
});

test('catalanSequence(10) rows match by both methods', () => {
  const seq = catalanSequence(10);
  assert.equal(seq.length, 11);
  for (const row of seq) assert.equal(row.recurrence, row.closed);
  assert.equal(seq[4].recurrence, 14);
});
