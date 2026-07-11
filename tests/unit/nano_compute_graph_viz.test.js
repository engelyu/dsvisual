const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFrames } = require('../../js/nano_compute_graph_viz');

const G = {
  nodes: [ { id: 'a', op: 'const', val: 2 }, { id: 'b', op: 'const', val: 3 },
           { id: 'm', op: 'mul' }, { id: 'c', op: 'const', val: 4 }, { id: 's', op: 'add' } ],
  edges: [ ['a','m'], ['b','m'], ['m','s'], ['c','s'] ],
};

test('topological order lists deps before dependents', () => {
  const { order } = buildFrames(G);
  assert.ok(order.indexOf('a') < order.indexOf('m'));
  assert.ok(order.indexOf('b') < order.indexOf('m'));
  assert.ok(order.indexOf('m') < order.indexOf('s'));
  assert.ok(order.indexOf('c') < order.indexOf('s'));
});

test('forward pass computes (2*3)+4 = 10 at s', () => {
  const { frames } = buildFrames(G);
  const final = frames[frames.length - 1];
  assert.equal(final.phase, 'done');
  assert.equal(final.values.m, 6);
  assert.equal(final.values.s, 10);
});
