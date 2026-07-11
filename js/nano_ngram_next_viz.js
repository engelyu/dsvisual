(function (global) {
  // Sample the next token from a count distribution via cumulative array + binary search.
  // Bucket rule: pick the first index i where target < cumulative[i], target = r*total.
  function buildFrames(candidates, r) {
    const frames = [];
    const total = candidates.reduce((a, [, c]) => a + c, 0);
    const cumulative = [];
    let run = 0;
    for (const [, c] of candidates) { run += c; cumulative.push(run); }
    frames.push({ candidates, cumulative: [], total, draw: r, lo: 0, hi: candidates.length - 1, mid: -1,
      picked: null, status: 'dist', msg: { en: 'distribution over ' + candidates.length + ' tokens', zh: candidates.length + ' 個候選 token 的分布' } });
    frames.push({ candidates, cumulative: cumulative.slice(), total, draw: r, lo: 0, hi: candidates.length - 1, mid: -1,
      picked: null, status: 'cumsum', msg: { en: 'cumulative counts', zh: '累積次數' } });
    const target = r * total;
    let lo = 0, hi = candidates.length - 1, ans = candidates.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      frames.push({ candidates, cumulative: cumulative.slice(), total, draw: target, lo, hi, mid,
        picked: null, status: 'bsearch', msg: { en: 'search target ' + target.toFixed(2) + ' at mid ' + mid, zh: '二分搜尋 target ' + target.toFixed(2) + '（mid ' + mid + '）' } });
      if (target < cumulative[mid]) { ans = mid; hi = mid - 1; } else { lo = mid + 1; }
    }
    const picked = candidates[ans][0];
    frames.push({ candidates, cumulative: cumulative.slice(), total, draw: target, lo, hi, mid: ans,
      picked, status: 'pick', msg: { en: 'pick "' + picked + '"', zh: '選出 "' + picked + '"' } });
    frames.push({ candidates, cumulative: cumulative.slice(), total, draw: target, lo, hi, mid: ans,
      picked, status: 'done', msg: { en: 'next token = "' + picked + '"', zh: '下一個 token = "' + picked + '"' } });
    return { frames, picked };
  }
  const api = { buildFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.NanoNgramNextViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
