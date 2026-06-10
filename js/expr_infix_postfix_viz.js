(function (global) {
  function tokenize(infix) {
    const tokens = [];
    let i = 0;
    while (i < infix.length) {
      const c = infix[i];
      if (c === ' ' || c === '\t') { i++; continue; }
      if ('+-*/()'.includes(c)) { tokens.push(c); i++; continue; }
      if (/[0-9]/.test(c)) { let j = i; while (j < infix.length && /[0-9]/.test(infix[j])) j++; tokens.push(infix.slice(i, j)); i = j; continue; }
      if (/[A-Za-z]/.test(c)) { let j = i; while (j < infix.length && /[A-Za-z0-9]/.test(infix[j])) j++; tokens.push(infix.slice(i, j)); i = j; continue; }
      throw new Error('Invalid character: ' + c);
    }
    return tokens;
  }

  const isOp = (t) => t === '+' || t === '-' || t === '*' || t === '/';
  const prec = (o) => (o === '*' || o === '/') ? 2 : 1;

  function buildShuntingYardFrames(tokens) {
    const frames = [], opStack = [], output = [];
    const snap = (token, msg) => frames.push({ phase: 'convert', token: token, opStack: opStack.slice(), output: output.slice(), msg: msg });
    snap(null, { zh: '開始中序轉後序', en: 'Begin infix → postfix' });
    for (const t of tokens) {
      if (isOp(t)) {
        while (opStack.length && isOp(opStack[opStack.length - 1]) && prec(opStack[opStack.length - 1]) >= prec(t)) output.push(opStack.pop());
        opStack.push(t);
        snap(t, { zh: '運算子 ' + t + ':彈出優先權 ≥ 的運算子後入堆疊', en: 'Operator ' + t + ': pop >= precedence, then push' });
      } else if (t === '(') {
        opStack.push(t);
        snap(t, { zh: '( 入堆疊', en: 'Push (' });
      } else if (t === ')') {
        while (opStack.length && opStack[opStack.length - 1] !== '(') output.push(opStack.pop());
        if (!opStack.length) throw new Error('Unbalanced parentheses');
        opStack.pop();
        snap(t, { zh: ') :彈出運算子直到 (', en: ') : pop operators until (' });
      } else {
        output.push(t);
        snap(t, { zh: '運算元 ' + t + ' 進輸出', en: 'Operand ' + t + ' to output' });
      }
    }
    while (opStack.length) { const o = opStack.pop(); if (o === '(' || o === ')') throw new Error('Unbalanced parentheses'); output.push(o); }
    snap(null, { zh: '完成,輸出即為後序式', en: 'Done; output is the postfix expression' });
    return { frames, postfix: output.slice() };
  }

  function buildPostfixEvalFrames(postfix) {
    const frames = [], stack = [];
    const isNum = (t) => /^[0-9]+$/.test(t);
    const apply = (op, a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        if (op === '+') return a + b;
        if (op === '-') return a - b;
        if (op === '*') return a * b;
        return b === 0 ? NaN : a / b;
      }
      return '(' + a + op + b + ')';
    };
    const snap = (token, msg) => frames.push({ phase: 'eval', token: token, valStack: stack.map(String), msg: msg });
    snap(null, { zh: '開始後序求值', en: 'Begin postfix evaluation' });
    for (const t of postfix) {
      if (isOp(t)) {
        const b = stack.pop(), a = stack.pop();
        stack.push(apply(t, a, b));
        snap(t, { zh: '彈出兩運算元、套用 ' + t + '、推回結果', en: 'Pop two operands, apply ' + t + ', push result' });
      } else {
        stack.push(isNum(t) ? parseInt(t, 10) : t);
        snap(t, { zh: '運算元 ' + t + ' 入堆疊', en: 'Push operand ' + t });
      }
    }
    snap(null, { zh: '完成', en: 'Done' });
    return { frames, value: stack.length === 1 ? stack[0] : undefined };
  }

  const api = { tokenize, buildShuntingYardFrames, buildPostfixEvalFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ExprViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
