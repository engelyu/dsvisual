const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFrames } = require('../../js/nano_ngram_next_viz');

const cand = [['the', 5], ['a', 3], ['cat', 2]]; // total 10

test('cumulative array is a prefix sum of counts', () => {
  const { frames } = buildFrames(cand, 0.0);
  const cum = frames.find((f) => f.status === 'cumsum').cumulative;
  assert.deepEqual(cum, [5, 8, 10]);
});

test('draw in the first bucket picks the first token', () => {
  const { picked } = buildFrames(cand, 0.1); // 0.1*10=1 -> bucket 0 (< 5)
  assert.equal(picked, 'the');
});

test('draw in the last bucket picks the last token', () => {
  const { picked } = buildFrames(cand, 0.95); // 9.5 -> bucket 2 (>=8)
  assert.equal(picked, 'cat');
});

test('bucket boundary picks the correct token', () => {
  const { picked } = buildFrames(cand, 0.5); // 5.0 -> first index with cum > 5 => bucket 1 ('a')
  assert.equal(picked, 'a');
});
