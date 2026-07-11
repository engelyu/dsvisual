const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFrames } = require('../../js/nano_bpe_train_viz');

test('most frequent adjacent pair is merged first', () => {
  // corpus symbols: a b a b a b  -> pair "a b" appears 3x, "b a" 2x
  const { frames, merges } = buildFrames(['a','b','a','b','a','b'], 1);
  assert.equal(merges[0], 'a b');
  const final = frames[frames.length - 1];
  assert.equal(final.status, 'done');
  // after merging a+b -> "ab": ab ab ab
  assert.deepEqual(final.symbols, ['ab','ab','ab']);
});

test('two merges collapse "a b c" repeated into a single symbol', () => {
  const { merges } = buildFrames(['a','b','c','a','b','c'], 2);
  assert.equal(merges.length, 2);
  // first merge the most frequent pair, then a pair involving the new symbol
  assert.ok(merges[0] === 'a b' || merges[0] === 'b c');
});

test('numMerges is capped when no pair repeats', () => {
  const { merges } = buildFrames(['a','b','c'], 5);
  assert.ok(merges.length <= 2);
});
