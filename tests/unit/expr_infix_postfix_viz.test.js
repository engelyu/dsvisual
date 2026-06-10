const test = require('node:test');
const assert = require('node:assert/strict');
const { tokenize, buildShuntingYardFrames, buildPostfixEvalFrames } = require('../../js/expr_infix_postfix_viz');

const postfixOf = (infix) => buildShuntingYardFrames(tokenize(infix)).postfix.join(' ');

test('tokenize splits identifiers, numbers, operators, parens; skips spaces', () => {
  assert.deepEqual(tokenize('A*(B + C)'), ['A', '*', '(', 'B', '+', 'C', ')']);
  assert.deepEqual(tokenize('31 + 4*2'), ['31', '+', '4', '*', '2']);
});

test('tokenize throws on invalid char', () => {
  assert.throws(() => tokenize('A & B'));
});

test('shunting-yard produces correct postfix', () => {
  assert.equal(postfixOf('A*(B+C)*D'), 'A B C + * D *');
  assert.equal(postfixOf('3+4*2'), '3 4 2 * +');
  assert.equal(postfixOf('(1-5)/2'), '1 5 - 2 /');
});

test('shunting-yard throws on unbalanced parentheses', () => {
  assert.throws(() => buildShuntingYardFrames(tokenize('(A+B')));
});

test('postfix eval computes numeric result', () => {
  const { value } = buildPostfixEvalFrames(['3', '4', '2', '*', '+']);
  assert.equal(value, 11);
});

test('postfix eval builds parenthesized string for symbolic operands', () => {
  const { value } = buildPostfixEvalFrames(['A', 'B', 'C', '+', '*']);
  assert.equal(value, '(A*(B+C))');
});

test('frames carry bilingual msg and stack/output snapshots', () => {
  const { frames } = buildShuntingYardFrames(tokenize('A+B'));
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); assert.ok(Array.isArray(f.opStack) && Array.isArray(f.output)); }
});
