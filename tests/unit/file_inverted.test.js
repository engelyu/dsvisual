const test = require('node:test');
const assert = require('node:assert');
const V = require('../../js/file_inverted_viz.js');

const DOCS = ['the cat sat', 'the dog ran', 'cat and dog'];

test('buildInverted maps terms to sorted unique docIds', () => {
  const idx = V.buildInverted(DOCS);
  assert.deepStrictEqual(idx['the'], [0, 1]);
  assert.deepStrictEqual(idx['cat'], [0, 2]);
  assert.deepStrictEqual(idx['dog'], [1, 2]);
  assert.deepStrictEqual(idx['sat'], [0]);
});

test('buildFrames produces a frame per posting insertion and a final index', () => {
  const { frames, index } = V.buildFrames(DOCS);
  assert.ok(frames.length >= 1);
  assert.deepStrictEqual(index['cat'], [0, 2]);
});

test('queryFrames returns postings for a term (case-insensitive)', () => {
  const idx = V.buildInverted(DOCS);
  const r = V.queryFrames(idx, 'CAT');
  assert.deepStrictEqual(r.postings, [0, 2]);
});

test('query for an absent term returns empty postings', () => {
  const idx = V.buildInverted(DOCS);
  assert.deepStrictEqual(V.queryFrames(idx, 'zebra').postings, []);
});
