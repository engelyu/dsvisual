const test = require('node:test');
const assert = require('node:assert/strict');
const { buildTreeFromValues, buildTraversalFrames, SAMPLE_VALUES } = require('../../js/tree_traversal_viz');

const TREE = buildTreeFromValues(SAMPLE_VALUES); // BST of [50,30,70,20,40,60,80]
const finalVisited = (order, mode) => {
  const f = buildTraversalFrames(TREE, order, mode);
  return f[f.length - 1].visited;
};

test('preorder order is correct (recursive & iterative agree)', () => {
  const expected = [50, 30, 20, 40, 70, 60, 80];
  assert.deepEqual(finalVisited('preorder', 'recursive'), expected);
  assert.deepEqual(finalVisited('preorder', 'iterative'), expected);
});

test('inorder order is correct (recursive & iterative agree)', () => {
  const expected = [20, 30, 40, 50, 60, 70, 80];
  assert.deepEqual(finalVisited('inorder', 'recursive'), expected);
  assert.deepEqual(finalVisited('inorder', 'iterative'), expected);
});

test('postorder order is correct (recursive & iterative agree)', () => {
  const expected = [20, 40, 30, 60, 80, 70, 50];
  assert.deepEqual(finalVisited('postorder', 'recursive'), expected);
  assert.deepEqual(finalVisited('postorder', 'iterative'), expected);
});

test('levelorder (BFS) order is correct', () => {
  assert.deepEqual(finalVisited('levelorder', 'iterative'), [50, 30, 70, 20, 40, 60, 80]);
});

test('each node visited exactly once; frames carry msg with zh & en', () => {
  const f = buildTraversalFrames(TREE, 'inorder', 'iterative');
  const last = f[f.length - 1].visited;
  assert.equal(last.length, SAMPLE_VALUES.length);
  assert.equal(new Set(last).size, SAMPLE_VALUES.length);
  for (const fr of f) { assert.ok(fr.msg.zh && fr.msg.en); assert.ok(Array.isArray(fr.visited)); }
});
