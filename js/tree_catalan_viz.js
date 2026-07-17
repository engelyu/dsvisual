(function (global) {
  function catalanNumber(n) {
    const C = new Array(n + 1).fill(0);
    C[0] = 1;
    for (let m = 1; m <= n; m++) for (let i = 0; i < m; i++) C[m] += C[i] * C[m - 1 - i];
    return C[n];
  }

  function catalanClosed(n) {
    let r = 1;
    for (let i = 0; i < n; i++) r = r * (2 * n - i) / (i + 1);   // r becomes binom(2n,n)
    return Math.round(r / (n + 1));
  }

  function enumerateShapes(n) {
    if (n === 0) return [null];
    const out = [];
    for (let i = 0; i < n; i++) {
      const L = enumerateShapes(i), R = enumerateShapes(n - 1 - i);
      for (const l of L) for (const r of R) out.push({ left: l, right: r });
    }
    return out;
  }

  function catalanSequence(maxN) {
    const seq = [];
    for (let n = 0; n <= maxN; n++) seq.push({ n, recurrence: catalanNumber(n), closed: catalanClosed(n) });
    return seq;
  }

  function buildCatalanFrames(n) {
    const frames = [];
    const terms = [];
    let running = 0;

    if (n === 0) {
      running = 1;
      frames.push({ n: 0, splitI: 0, leftSize: 0, rightSize: 0, ci: 1, crest: 1, product: 1, groupShapes: [null], runningTotal: 1, terms: [], action: 'group', msg: { zh: 'n=0:僅「空樹」一種形狀', en: 'n=0: exactly one shape — the empty tree' } });
    } else {
      for (let i = 0; i < n; i++) {
        const rightSize = n - 1 - i;
        const ci = catalanNumber(i), crest = catalanNumber(rightSize);
        const product = ci * crest;
        const L = enumerateShapes(i), R = enumerateShapes(rightSize);
        const groupShapes = [];
        for (const l of L) for (const r of R) groupShapes.push({ left: l, right: r });
        running += product;
        terms.push({ i, ci, crest, product });
        frames.push({
          n, splitI: i, leftSize: i, rightSize, ci, crest, product, groupShapes, runningTotal: running, terms: terms.slice(), action: 'group',
          msg: {
            zh: '左子樹 ' + i + ' 節點(C' + i + '=' + ci + ') × 右子樹 ' + rightSize + ' 節點(C' + rightSize + '=' + crest + ') = ' + product + ' 種',
            en: 'left subtree ' + i + ' nodes (C' + i + '=' + ci + ') × right subtree ' + rightSize + ' nodes (C' + rightSize + '=' + crest + ') = ' + product,
          },
        });
      }
    }

    const total = running;
    const closed = catalanClosed(n);
    const rec = terms.length
      ? ('C' + n + ' = ' + terms.map((t) => t.ci + '·' + t.crest).join(' + ') + ' = ' + total)
      : ('C' + n + ' = ' + total);
    frames.push({
      n, splitI: null, leftSize: null, rightSize: null, ci: null, crest: null, product: null, groupShapes: [], runningTotal: total, terms: terms.slice(), action: 'done',
      msg: {
        zh: '完成:' + rec + ';封閉形 C(' + (2 * n) + ',' + n + ')/' + (n + 1) + ' = ' + closed + (total === closed ? ' ✓' : ' ✗'),
        en: 'done: ' + rec + '; closed form C(' + (2 * n) + ',' + n + ')/' + (n + 1) + ' = ' + closed + (total === closed ? ' ✓' : ' ✗'),
      },
    });
    return { frames, total };
  }

  const api = { catalanNumber, catalanClosed, enumerateShapes, catalanSequence, buildCatalanFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.TreeCatalanViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
