const test = require('node:test');
const assert = require('node:assert/strict');
const { computeFrequencies, buildHuffmanFrames } = require('../../js/huffman_viz');

function isPrefixFree(codes) {
  const list = Object.values(codes);
  for (let i = 0; i < list.length; i++)
    for (let j = 0; j < list.length; j++)
      if (i !== j && list[j].startsWith(list[i])) return false;
  return true;
}
function wpl(codes, freqMap) {
  return Object.entries(codes).reduce((s, [sym, code]) => s + code.length * freqMap[sym], 0);
}

test('computeFrequencies counts chars, maps space to visible glyph, sorts asc', () => {
  const f = computeFrequencies('ABRACADABRA');
  const m = Object.fromEntries(f.map(x => [x.sym, x.freq]));
  assert.deepEqual(m, { A: 5, B: 2, R: 2, C: 1, D: 1 });
  for (let i = 1; i < f.length; i++) assert.ok(f[i - 1].freq <= f[i].freq);
  const sp = computeFrequencies('a b');
  assert.ok(sp.some(x => x.sym === '␣'));
});

test('forest shrinks by one per merge; total frequency conserved', () => {
  const freqs = computeFrequencies('ABRACADABRA');
  const { frames, nodes, root } = buildHuffmanFrames(freqs);
  const merges = frames.filter(f => f.phase === 'merge');
  assert.equal(merges.length, freqs.length - 1);
  const total = freqs.reduce((s, f) => s + f.freq, 0);
  assert.equal(nodes[root].freq, total);
});

test('codes are prefix-free and WPL is optimal for {1,1,2,4}', () => {
  const freqs = [{ sym: 'a', freq: 1 }, { sym: 'b', freq: 1 }, { sym: 'c', freq: 2 }, { sym: 'd', freq: 4 }];
  const { codes } = buildHuffmanFrames(freqs);
  assert.ok(isPrefixFree(codes));
  assert.equal(wpl(codes, { a: 1, b: 1, c: 2, d: 4 }), 14);
});

test('single symbol gets a 1-bit code', () => {
  const { codes } = buildHuffmanFrames([{ sym: 'x', freq: 7 }]);
  assert.equal(codes['x'], '0');
});
