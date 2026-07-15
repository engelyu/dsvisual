(function (global) {
  'use strict';

  function randInt(rng, lo, hi) { return lo + Math.floor(rng() * (hi - lo + 1)); }
  function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
  function uniqueInts(rng, n, lo, hi) {
    const set = new Set();
    let guard = 0;
    while (set.size < n && guard++ < n * 80) set.add(randInt(rng, lo, hi));
    return Array.from(set);
  }

  function valSeq(rng, difficulty) {
    switch (difficulty) {
      case 'special': {
        const base = uniqueInts(rng, randInt(rng, 6, 8), 10, 99).sort((a, b) => a - b);
        return rng() < 0.5 ? base : base.slice().reverse();
      }
      case 'edge': {
        if (rng() < 0.5) return [randInt(rng, 10, 99)];
        const v = randInt(rng, 10, 99);
        return [v, v, v, v];
      }
      case 'large':
        return uniqueInts(rng, randInt(rng, 18, 24), 10, 99);
      default:
        return uniqueInts(rng, randInt(rng, 6, 9), 10, 99);
    }
  }

  function searchInput(rng, difficulty, uniform) {
    let n;
    if (difficulty === 'large') n = randInt(rng, 30, 40);
    else if (difficulty === 'edge') n = rng() < 0.5 ? 1 : randInt(rng, 6, 10);
    else n = randInt(rng, 8, 12);
    let arr;
    if (uniform && difficulty === 'special') {
      const start = randInt(rng, 1, 9), step = randInt(rng, 3, 9);
      arr = Array.from({ length: n }, (_, i) => start + i * step);
    } else {
      arr = uniqueInts(rng, n, 1, 200).sort((a, b) => a - b);
      while (arr.length < n) arr.push(arr[arr.length - 1] + 1);
    }
    let target;
    if (difficulty === 'edge') target = arr[arr.length - 1] + randInt(rng, 1, 9);
    else target = arr[randInt(rng, 0, arr.length - 1)];
    return { arr, target };
  }

  function huffmanText(rng, difficulty) {
    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ch = () => A[Math.floor(rng() * 26)];
    if (difficulty === 'edge') return ch();
    if (difficulty === 'special') {
      const a = ch(); let b = ch(); while (b === a) b = ch();
      return (a + b).repeat(randInt(rng, 4, 6));
    }
    const len = difficulty === 'large' ? randInt(rng, 30, 40) : randInt(rng, 8, 14);
    let s = '';
    for (let i = 0; i < len; i++) s += ch();
    return s;
  }

  function buildExprTree(rng, n, operandFn, singleOp) {
    const ops = ['+', '-', '*', '/'];
    let nodes = [];
    for (let i = 0; i < n; i++) nodes.push({ v: operandFn(rng, i) });
    while (nodes.length > 1) {
      const i = Math.floor(rng() * (nodes.length - 1));
      const op = singleOp || pick(rng, ops);
      nodes.splice(i, 2, { op, l: nodes[i], r: nodes[i + 1] });
    }
    return nodes[0];
  }
  function toInfix(node) {
    if (node.v != null) return String(node.v);
    return '(' + toInfix(node.l) + node.op + toInfix(node.r) + ')';
  }
  function toPostfix(node) {
    if (node.v != null) return String(node.v);
    return toPostfix(node.l) + ' ' + toPostfix(node.r) + ' ' + node.op;
  }
  function exprInfix(rng, difficulty) {
    const letter = (r, i) => 'ABCDEFGHIJ'[i % 10];
    let n, singleOp = null;
    if (difficulty === 'edge') { n = 1; }
    else if (difficulty === 'special') { n = 4; singleOp = '+'; }
    else if (difficulty === 'large') { n = randInt(rng, 7, 8); }
    else { n = 4; }
    return toInfix(buildExprTree(rng, n, letter, singleOp));
  }
  function exprPostfix(rng, difficulty) {
    const num = (r) => randInt(r, 1, 9);
    let n, singleOp = null;
    if (difficulty === 'edge') { n = 1; }
    else if (difficulty === 'special') { n = 4; singleOp = '+'; }
    else if (difficulty === 'large') { n = randInt(rng, 7, 8); }
    else { n = 4; }
    return toPostfix(buildExprTree(rng, n, num, singleOp));
  }

  function obstInput(rng, difficulty) {
    let nk;
    if (difficulty === 'edge') nk = 1;
    else if (difficulty === 'large') nk = randInt(rng, 8, 10);
    else nk = randInt(rng, 4, 6);
    const keys = uniqueInts(rng, nk, 10, 99).sort((a, b) => a - b);
    let freqs;
    if (difficulty === 'special' && keys.length > 1) {
      freqs = keys.map(() => randInt(rng, 1, 2));
      freqs[Math.floor(rng() * freqs.length)] = randInt(rng, 20, 30);
    } else {
      freqs = keys.map(() => randInt(rng, 1, 9));
    }
    return { keys, freqs };
  }

  function matrixText(rng, difficulty) {
    let rows, cols;
    if (difficulty === 'edge') { rows = randInt(rng, 2, 3); cols = randInt(rng, 2, 3); }
    else if (difficulty === 'large') { rows = 8; cols = 8; }
    else { rows = randInt(rng, 4, 5); cols = randInt(rng, 4, 5); }
    const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
    if (difficulty === 'edge') {
      // all zeros — leave grid as-is
    } else if (difficulty === 'special') {
      for (let i = 0; i < Math.min(rows, cols); i++) grid[i][i] = randInt(rng, 1, 9);
    } else {
      const nz = Math.max(2, Math.floor(rows * cols * 0.2));
      for (let k = 0; k < nz; k++) grid[randInt(rng, 0, rows - 1)][randInt(rng, 0, cols - 1)] = randInt(rng, 1, 9);
    }
    return grid.map((r) => r.join(',')).join(';');
  }

  function polyInput(rng, difficulty) {
    const term = (e) => randInt(rng, 1, 9) + ':' + e;
    if (difficulty === 'edge') return { a: term(randInt(rng, 0, 3)), b: term(randInt(rng, 0, 3)) };
    if (difficulty === 'special') {
      const exps = [3, 2, 1];
      return { a: exps.map(term).join(','), b: exps.map(term).join(',') };
    }
    if (difficulty === 'large') {
      return { a: [6, 5, 4, 3, 2, 1].map(term).join(','), b: [5, 4, 3, 2, 1, 0].map(term).join(',') };
    }
    return { a: [2, 1, 0].map(term).join(','), b: [3, 1].map(term).join(',') };
  }

  function parseMaze(text) { return text.split(';').map((r) => r.split('')); }
  function findCell(g, ch) {
    for (let r = 0; r < g.length; r++) for (let c = 0; c < g[r].length; c++) if (g[r][c] === ch) return [r, c];
    return null;
  }
  function isMazeSolvable(text) {
    const g = parseMaze(text);
    const s = findCell(g, 'S'), e = findCell(g, 'E');
    if (!s || !e) return false;
    const R = g.length, C = g[0].length;
    const seen = Array.from({ length: R }, () => Array(C).fill(false));
    const q = [s]; seen[s[0]][s[1]] = true;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (q.length) {
      const [r, c] = q.shift();
      if (r === e[0] && c === e[1]) return true;
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < R && nc >= 0 && nc < C && !seen[nr][nc] && g[nr][nc] !== '#') {
          seen[nr][nc] = true; q.push([nr, nc]);
        }
      }
    }
    return false;
  }
  function makeMaze(rng, R, C, wallP) {
    const g = Array.from({ length: R }, () => Array.from({ length: C }, () => (rng() < wallP ? '#' : '.')));
    g[0][0] = 'S'; g[R - 1][C - 1] = 'E';
    return g.map((r) => r.join('')).join(';');
  }
  function mazeText(rng, difficulty) {
    if (difficulty === 'edge') {
      const R = 5, C = 5;
      const g = Array.from({ length: R }, () => Array.from({ length: C }, () => '.'));
      g[0][0] = 'S'; g[R - 1][C - 1] = 'E';
      g[R - 2][C - 1] = '#'; g[R - 1][C - 2] = '#';
      return g.map((r) => r.join('')).join(';');
    }
    const R = difficulty === 'large' ? randInt(rng, 8, 9) : 5;
    const C = R;
    const wallP = difficulty === 'special' ? 0.32 : 0.25;
    for (let t = 0; t < 60; t++) {
      const m = makeMaze(rng, R, C, wallP);
      if (isMazeSolvable(m)) return m;
    }
    return makeMaze(rng, R, C, 0);
  }

  function mwayInput(rng, difficulty) {
    let nk;
    if (difficulty === 'edge') nk = randInt(rng, 1, 2);
    else if (difficulty === 'large') nk = randInt(rng, 14, 18);
    else nk = randInt(rng, 6, 8);
    let keys = uniqueInts(rng, nk, 10, 99);
    if (difficulty === 'special') keys = keys.sort((a, b) => a - b);
    return { keys, m: 3 };
  }

  function randomInputFor(methodId, difficulty, rng) {
    rng = rng || Math.random;
    if (['normal', 'special', 'edge', 'large'].indexOf(difficulty) === -1) difficulty = 'normal';
    switch (methodId) {
      case 'tree-traversal':
      case 'tree-threaded': return { vals: valSeq(rng, difficulty) };
      case 'list-doubly': return { vals: valSeq(rng, difficulty), circular: rng() < 0.5 };
      case 'list-equivalence': {
        if (difficulty === 'edge') return rng() < 0.5 ? { n: 1, pairs: [] } : { n: randInt(rng, 4, 6), pairs: [] };
        if (difficulty === 'special') {
          const n = randInt(rng, 8, 10); const pairs = [];
          for (let i = 0; i < n - 1; i++) pairs.push([i, i + 1]);
          return { n: n, pairs: pairs };
        }
        const n = difficulty === 'large' ? 12 : randInt(rng, 8, 10);
        const m = difficulty === 'large' ? randInt(rng, 10, 14) : randInt(rng, 6, 8);
        const pairs = [];
        for (let k = 0; k < m; k++) { const a = randInt(rng, 0, n - 1), b = randInt(rng, 0, n - 1); if (a !== b) pairs.push([a, b]); }
        return { n: n, pairs: pairs };
      }
      case 'sort': return { data: valSeq(rng, difficulty) };
      case 'sort-external': return { data: valSeq(rng, difficulty), M: 4 };
      case 'huffman': return { text: huffmanText(rng, difficulty) };
      case 'expr-infix-postfix': return { text: exprInfix(rng, difficulty) };
      case 'tree-expression': return { text: exprPostfix(rng, difficulty) };
      case 'tree-obst': return obstInput(rng, difficulty);
      case 'matrix-sparse': return { text: matrixText(rng, difficulty) };
      case 'poly-padd': return polyInput(rng, difficulty);
      case 'maze-stack': return { text: mazeText(rng, difficulty) };
      case 'tree-mway': return mwayInput(rng, difficulty);
      case 'search-fibonacci': return searchInput(rng, difficulty, false);
      case 'search-interpolation': return searchInput(rng, difficulty, true);
      case 'search-binary':
      case 'search-linear': return searchInput(rng, difficulty, false);
      default: return null;
    }
  }

  const api = { randomInputFor: randomInputFor, isMazeSolvable: isMazeSolvable };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.RandomInput = api;
})(typeof window !== 'undefined' ? window : globalThis);
