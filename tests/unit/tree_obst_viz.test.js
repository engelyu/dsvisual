const test = require('node:test');
const assert = require('node:assert/strict');
const { buildObstFrames } = require('../../js/tree_obst_viz');

function inorder(node, out) { if (!node) return out; inorder(node.left, out); out.push(node.val); inorder(node.right, out); return out; }

test('OBST cost/root tables are correct for keys [10,20,30,40] freq [4,2,6,3]', () => {
  const { cost, root } = buildObstFrames([10, 20, 30, 40], [4, 2, 6, 3]);
  assert.equal(cost['0,3'], 26);
  assert.equal(root['0,3'], 2);
  assert.equal(cost['0,1'], 8);
  assert.equal(cost['1,3'], 16);
});

test('reconstructed tree is a BST (inorder = sorted keys) rooted at the optimal key', () => {
  const { tree } = buildObstFrames([10, 20, 30, 40], [4, 2, 6, 3]);
  assert.equal(tree.val, 30);
  assert.deepEqual(inorder(tree, []), [10, 20, 30, 40]);
});

test('single key: cost = its frequency; tree is that key', () => {
  const { cost, tree } = buildObstFrames([5], [7]);
  assert.equal(cost['0,0'], 7);
  assert.equal(tree.val, 5);
  assert.equal(tree.left, null);
});

test('frames fill cells by increasing length and carry bilingual msg', () => {
  const { frames } = buildObstFrames([10, 20, 30, 40], [4, 2, 6, 3]);
  const cellFrames = frames.filter((f) => f.phase === 'fill');
  assert.ok(cellFrames.length >= 10);
  for (const f of frames) assert.ok(f.msg.zh && f.msg.en);
  assert.ok(frames.some((f) => f.phase === 'tree'));
});
