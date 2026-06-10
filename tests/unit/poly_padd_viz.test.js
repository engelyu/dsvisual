const test = require('node:test');
const assert = require('node:assert/strict');
const { parsePoly, formatPoly, buildPaddFrames } = require('../../js/poly_padd_viz');

test('parsePoly reads "coef:exp" terms sorted by descending exponent', () => {
  assert.deepEqual(parsePoly('2:1,3:2,1:0'), [
    { coef: 3, exp: 2 }, { coef: 2, exp: 1 }, { coef: 1, exp: 0 },
  ]);
});

test('PADD merges two polynomials by exponent', () => {
  const A = parsePoly('3:2,2:1,1:0');
  const B = parsePoly('5:3,4:1');
  const { result } = buildPaddFrames(A, B);
  assert.deepEqual(result, [
    { coef: 5, exp: 3 }, { coef: 3, exp: 2 }, { coef: 6, exp: 1 }, { coef: 1, exp: 0 },
  ]);
});

test('PADD drops terms whose coefficients cancel to zero', () => {
  const { result } = buildPaddFrames(parsePoly('3:2'), parsePoly('-3:2'));
  assert.deepEqual(result, []);
});

test('formatPoly renders a readable polynomial string', () => {
  assert.equal(formatPoly([{ coef: 5, exp: 3 }, { coef: 6, exp: 1 }, { coef: 1, exp: 0 }]), '5x^3 + 6x + 1');
});

test('frames carry pointer indices and bilingual msg', () => {
  const { frames } = buildPaddFrames(parsePoly('3:2,2:1'), parsePoly('4:1'));
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); assert.ok('i' in f && 'j' in f); }
});
