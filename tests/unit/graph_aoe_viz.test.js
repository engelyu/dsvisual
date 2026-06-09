const test = require('node:test');
const assert = require('node:assert/strict');
const { AOE_PRESET, topoOrder, buildAoeFrames } = require('../../graph_aoe_viz');

test('topoOrder returns a valid topological order of the preset', () => {
  const { nodes, edges } = AOE_PRESET;
  const order = topoOrder(nodes, edges);
  const pos = {}; order.forEach((id, i) => { pos[id] = i; });
  assert.equal(order.length, nodes.length);
  for (const e of edges) assert.ok(pos[e.u] < pos[e.v], 'edge ' + e.u + '->' + e.v + ' violates order');
});

test('forward/backward pass and critical path are correct for the textbook preset', () => {
  const { nodes, edges } = AOE_PRESET;
  const { ee, le, criticalEdges } = buildAoeFrames(nodes, edges);
  assert.deepEqual(ee, { 1: 0, 2: 6, 3: 4, 4: 5, 5: 7, 6: 7, 7: 16, 8: 14, 9: 18 });
  assert.deepEqual(le, { 1: 0, 2: 6, 3: 6, 4: 8, 5: 7, 6: 10, 7: 16, 8: 14, 9: 18 });
  assert.equal(ee[9], 18);
  const crit = new Set(criticalEdges.map((e) => e.u + '-' + e.v));
  for (const id of ['1-2', '2-5', '5-7', '7-9', '5-8', '8-9']) assert.ok(crit.has(id), 'missing critical ' + id);
  assert.ok(!crit.has('1-3'));
});

test('frames cover topo→forward→backward→critical and carry bilingual msg', () => {
  const { nodes, edges } = AOE_PRESET;
  const { frames } = buildAoeFrames(nodes, edges);
  const phases = new Set(frames.map((f) => f.phase));
  for (const p of ['forward', 'backward', 'critical']) assert.ok(phases.has(p), 'missing phase ' + p);
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); }
});
