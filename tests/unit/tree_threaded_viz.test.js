const test = require('node:test');
const assert = require('node:assert/strict');
const { buildTreeFromValues, buildThreadedFrames, SAMPLE } = require('../../js/tree_threaded_viz');

test('inorder traversal equals the sorted keys', () => {
  const tree = buildTreeFromValues(SAMPLE);
  const { inorder } = buildThreadedFrames(tree);
  assert.deepEqual(inorder, [...SAMPLE].sort((a, b) => a - b));
});

test('threads link each null-right node to its inorder successor', () => {
  const tree = buildTreeFromValues(SAMPLE);
  const { threads } = buildThreadedFrames(tree);
  const pairs = new Set(threads.map((t) => t.fromVal + '->' + t.toVal));
  assert.equal(threads.length, 3);
  for (const p of ['20->30', '40->50', '60->70']) assert.ok(pairs.has(p), 'missing ' + p);
});

test('frames cover every node and carry bilingual msg', () => {
  const { frames } = buildThreadedFrames(buildTreeFromValues(SAMPLE));
  for (const f of frames) assert.ok(f.msg.zh && f.msg.en);
  const visitedMax = Math.max(...frames.map((f) => f.visited.length));
  assert.equal(visitedMax, SAMPLE.length);
});
