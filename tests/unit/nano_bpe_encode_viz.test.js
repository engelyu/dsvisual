const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFrames } = require('../../js/nano_bpe_encode_viz');

test('start frame has empty tokens and cursor 0', () => {
  const { frames } = buildFrames(['a', 'b', 'ab'], 'ab');
  assert.equal(frames[0].status, 'walk');
  assert.equal(frames[0].cursor, 0);
  assert.deepEqual(frames[0].tokens, []);
});

test('greedy longest match emits "ab" not "a"+"b"', () => {
  const { frames } = buildFrames(['a', 'b', 'ab'], 'ab');
  const final = frames[frames.length - 1];
  assert.equal(final.status, 'done');
  assert.deepEqual(final.tokens, ['ab']);
});

test('falls back to shorter token then continues', () => {
  const { frames } = buildFrames(['a', 'b', 'ab', 'c'], 'abc');
  assert.deepEqual(frames[frames.length - 1].tokens, ['ab', 'c']);
});

test('unknown char is emitted as a single-char token (byte fallback)', () => {
  const { frames } = buildFrames(['a'], 'ax');
  assert.deepEqual(frames[frames.length - 1].tokens, ['a', 'x']);
});
