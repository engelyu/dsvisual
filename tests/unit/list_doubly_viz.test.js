const test = require('node:test');
const assert = require('node:assert/strict');
const { buildNodes, buildDoublyFrames } = require('../../js/list_doubly_viz');

test('non-circular: ends are null, neighbours consistent', () => {
  const nodes = buildNodes([10, 20, 30], false);
  assert.equal(nodes[0].prevVal, null);
  assert.equal(nodes[2].nextVal, null);
  for (let i = 0; i < nodes.length - 1; i++) {
    assert.equal(nodes[i].nextVal, nodes[i + 1].val);
    assert.equal(nodes[i + 1].prevVal, nodes[i].val);
  }
});

test('circular: head.prev = tail, tail.next = head', () => {
  const nodes = buildNodes([10, 20, 30], true);
  assert.equal(nodes[0].prevVal, 30);
  assert.equal(nodes[2].nextVal, 10);
});

test('frames cover forward then backward traversal with bilingual msg', () => {
  const { frames } = buildDoublyFrames([10, 20, 30], false);
  const dirs = new Set(frames.map((f) => f.dir));
  assert.ok(dirs.has('forward'));
  assert.ok(dirs.has('backward'));
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); assert.ok(Array.isArray(f.nodes)); }
});
