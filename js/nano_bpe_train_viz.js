(function (global) {
  function countPairs(symbols) {
    const counts = new Map();
    for (let i = 0; i + 1 < symbols.length; i++) {
      const key = symbols[i] + ' ' + symbols[i + 1];
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return counts;
  }
  // pick max count; tie-break by lexicographically smallest pair (deterministic "heap top")
  function best(counts) {
    let bk = null, bc = 0;
    for (const [k, c] of counts) {
      if (c > bc || (c === bc && bk !== null && k < bk)) { bk = k; bc = c; }
      else if (bk === null) { bk = k; bc = c; }
    }
    return bc >= 2 ? { pair: bk, count: bc } : null; // only merge pairs that repeat
  }
  function merge(symbols, pair) {
    const [l, r] = pair.split(' ');
    const out = [];
    for (let i = 0; i < symbols.length; i++) {
      if (i + 1 < symbols.length && symbols[i] === l && symbols[i + 1] === r) { out.push(l + r); i++; }
      else out.push(symbols[i]);
    }
    return out;
  }
  function buildFrames(corpus, numMerges) {
    let symbols = corpus.slice();
    const frames = [], merges = [];
    const snap = (o) => frames.push(Object.assign(
      { symbols: symbols.slice(), pairCounts: [], top: null, merged: null, round: merges.length, status: 'count' }, o));
    for (let round = 0; round < numMerges; round++) {
      const counts = countPairs(symbols);
      const pc = [...counts.entries()].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
      snap({ pairCounts: pc, status: 'count', msg: { en: 'count adjacent pairs', zh: '統計相鄰配對' } });
      const b = best(counts);
      if (!b) break;
      snap({ pairCounts: pc, top: b.pair, status: 'select',
             msg: { en: 'heap top: "' + b.pair + '" ×' + b.count, zh: 'heap 最大："' + b.pair + '" ×' + b.count } });
      symbols = merge(symbols, b.pair); merges.push(b.pair);
      snap({ merged: b.pair, top: b.pair, status: 'merge',
             msg: { en: 'merge "' + b.pair + '" → ' + b.pair.replace(' ', ''), zh: '合併 "' + b.pair + '" → ' + b.pair.replace(' ', '') } });
    }
    snap({ status: 'done', msg: { en: merges.length + ' merges learned', zh: '學到 ' + merges.length + ' 個合併' } });
    return { frames, merges };
  }
  const api = { buildFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.NanoBpeTrainViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
