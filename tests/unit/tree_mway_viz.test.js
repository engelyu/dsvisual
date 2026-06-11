const test = require('node:test');
const assert = require('node:assert/strict');
const { buildMwayFrames } = require('../../js/tree_mway_viz');

function flatten(n, out) {
  if (!n) return out;
  for (let i = 0; i < n.keys.length; i++) { flatten(n.children[i], out); out.push(n.keys[i]); }
  flatten(n.children[n.keys.length], out);
  return out;
}
function eachNode(n, fn) { if (!n) return; fn(n); n.children.forEach((c) => eachNode(c, fn)); }

const KEYS = [50, 30, 70, 20, 40, 60, 80, 10, 25];

test('in-order flatten equals the sorted unique keys (m=3)', () => {
  const { tree } = buildMwayFrames(KEYS, 3);
  assert.deepEqual(flatten(tree, []), [...new Set(KEYS)].sort((a, b) => a - b));
});

test('every node respects m-way invariants (m=3)', () => {
  const { tree } = buildMwayFrames(KEYS, 3);
  eachNode(tree, (n) => {
    assert.ok(n.keys.length <= 3 - 1, 'too many keys: ' + n.keys.join(','));
    assert.equal(n.children.length, n.keys.length + 1, 'children must be keys+1');
    for (let i = 1; i < n.keys.length; i++) assert.ok(n.keys[i - 1] < n.keys[i], 'keys must be sorted');
  });
});

test('m=4 also holds invariants and full flatten', () => {
  const { tree } = buildMwayFrames(KEYS, 4);
  assert.deepEqual(flatten(tree, []), [...new Set(KEYS)].sort((a, b) => a - b));
  eachNode(tree, (n) => assert.ok(n.keys.length <= 4 - 1));
});

test('frames carry a tree snapshot, descendPath, and bilingual msg', () => {
  const { frames } = buildMwayFrames(KEYS, 3);
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); assert.ok(Array.isArray(f.descendPath)); }
  assert.ok(frames.some((f) => f.tree));
});
