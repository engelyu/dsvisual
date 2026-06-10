(function (global) {
  const INF = Infinity;

  function buildWinnerTree(headVals) {
    let L = 1;
    while (L < headVals.length) L *= 2;
    if (L < 1) L = 1;
    const tree = new Array(2 * L).fill(null);
    for (let i = 0; i < L; i++) {
      const has = i < headVals.length;
      tree[L + i] = { val: has ? headVals[i] : INF, run: has ? i : -1 };
    }
    for (let i = L - 1; i >= 1; i--) {
      const a = tree[2 * i], b = tree[2 * i + 1];
      tree[i] = (a.val <= b.val) ? a : b;
    }
    return tree;
  }

  function buildExternalSortFrames(data, M) {
    const frames = [];
    const runs = [];
    for (let i = 0; i < data.length; i += M) {
      const run = data.slice(i, i + M).sort((a, b) => a - b);
      runs.push(run);
      frames.push({ phase: 'runs', runs: runs.map((r) => r.slice()), current: runs.length - 1, heads: [], tree: [], winnerRun: -1, output: [], msg: { zh: '產生第 ' + runs.length + ' 個 run(內排序)', en: 'Generate run ' + runs.length + ' (internal sort)' } });
    }

    const ptr = runs.map(() => 0);
    const output = [];
    const headVals = () => runs.map((r, i) => (ptr[i] < r.length ? r[ptr[i]] : INF));
    const remaining = () => runs.map((r, i) => r.slice(ptr[i]));
    let guard = 0;
    while (true) {
      const heads = headVals();
      if (heads.every((v) => v === INF)) break;
      const tree = buildWinnerTree(heads);
      const win = tree[1];
      output.push(win.val);
      ptr[win.run]++;
      frames.push({
        phase: 'merge',
        runs: remaining(),
        heads: heads.map((v) => (v === INF ? null : v)),
        tree: tree.map((t) => (t ? { val: (t.val === INF ? null : t.val), run: t.run } : null)),
        winnerRun: win.run,
        output: output.slice(),
        current: -1,
        msg: { zh: '取出最小值 ' + win.val + '(來自 run ' + (win.run + 1) + ')', en: 'Emit minimum ' + win.val + ' (from run ' + (win.run + 1) + ')' }
      });
      if (++guard > data.length + 5) break;
    }
    frames.push({ phase: 'merge', runs: remaining(), heads: [], tree: [], winnerRun: -1, output: output.slice(), current: -1, msg: { zh: '合併完成,輸出已排序', en: 'Merge complete; output is sorted' } });

    return { frames, runs, output };
  }

  const api = { buildWinnerTree, buildExternalSortFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ExtSortViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
