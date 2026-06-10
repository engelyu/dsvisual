const test = require('node:test');
const assert = require('node:assert/strict');
const { buildWinnerTree, buildExternalSortFrames } = require('../../js/sort_external_viz');

test('buildWinnerTree puts the overall minimum at index 1', () => {
  const tree = buildWinnerTree([5, 2, 8, 1]);
  assert.equal(tree[1].val, 1);
  assert.equal(tree[1].run, 3);
});

test('external sort output equals the fully sorted input', () => {
  const data = [5, 3, 8, 1, 9, 2, 7, 4, 6, 0];
  const { output } = buildExternalSortFrames(data, 4);
  assert.deepEqual(output, [...data].sort((a, b) => a - b));
});

test('run generation produces ceil(n/M) sorted runs', () => {
  const data = [5, 3, 8, 1, 9, 2, 7];
  const { runs } = buildExternalSortFrames(data, 3);
  assert.equal(runs.length, Math.ceil(data.length / 3));
  for (const r of runs) assert.deepEqual(r, [...r].sort((a, b) => a - b));
});

test('frames cover runs then merge, and carry bilingual msg', () => {
  const { frames } = buildExternalSortFrames([5, 3, 8, 1, 9], 2);
  const phases = new Set(frames.map((f) => f.phase));
  assert.ok(phases.has('runs'));
  assert.ok(phases.has('merge'));
  for (const f of frames) assert.ok(f.msg.zh && f.msg.en);
});
