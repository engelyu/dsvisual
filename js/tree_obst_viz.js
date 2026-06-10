(function (global) {
  function sumFreq(freqs, i, j) { let s = 0; for (let k = i; k <= j; k++) s += freqs[k]; return s; }

  function buildObstFrames(keys, freqs) {
    const n = keys.length;
    const cost = {}, root = {};
    const frames = [];
    const key = (i, j) => i + ',' + j;
    const snap = (phase, i, j, tryRoot, msg) => frames.push({
      phase, i, j, tryRoot,
      cost: Object.assign({}, cost), root: Object.assign({}, root), msg
    });

    for (let i = 0; i < n; i++) { cost[key(i, i)] = freqs[i]; root[key(i, i)] = i; snap('fill', i, i, i, { zh: 'cost[' + i + ',' + i + '] = ' + freqs[i], en: 'cost[' + i + ',' + i + '] = ' + freqs[i] }); }

    for (let len = 2; len <= n; len++) {
      for (let i = 0; i + len - 1 < n; i++) {
        const j = i + len - 1;
        const w = sumFreq(freqs, i, j);
        let best = Infinity, bestR = i;
        for (let r = i; r <= j; r++) {
          const left = r > i ? cost[key(i, r - 1)] : 0;
          const right = r < j ? cost[key(r + 1, j)] : 0;
          const c = left + right + w;
          if (c < best) { best = c; bestR = r; }
        }
        cost[key(i, j)] = best; root[key(i, j)] = bestR;
        snap('fill', i, j, bestR, { zh: 'cost[' + i + ',' + j + '] = ' + best + '(root=' + keys[bestR] + ')', en: 'cost[' + i + ',' + j + '] = ' + best + ' (root=' + keys[bestR] + ')' });
      }
    }

    let idCounter = 0;
    function build(i, j) {
      if (i > j) return null;
      const r = root[key(i, j)];
      const node = { val: keys[r], left: null, right: null, id: 'obst-' + (idCounter++) };
      node.left = build(i, r - 1);
      node.right = build(r + 1, j);
      return node;
    }
    const tree = build(0, n - 1);
    snap('tree', 0, n - 1, root[key(0, n - 1)], { zh: '重建最佳 BST,最小加權路徑長 = ' + cost[key(0, n - 1)], en: 'Reconstruct optimal BST; min weighted path length = ' + cost[key(0, n - 1)] });

    return { frames, cost, root, tree };
  }

  const api = { sumFreq, buildObstFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ObstViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
