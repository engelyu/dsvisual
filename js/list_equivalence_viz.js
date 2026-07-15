(function (global) {
  'use strict';

  function parseInput(nText, pairsText) {
    let n = parseInt(nText, 10);
    if (!Number.isFinite(n) || n < 1) n = 1;
    const pairs = [];
    String(pairsText || '').split(/[,;]/).forEach((tok) => {
      const t = tok.trim();
      if (!t) return;
      const m = t.split('=');
      if (m.length !== 2) return;
      const i = parseInt(m[0].trim(), 10), j = parseInt(m[1].trim(), 10);
      if (!Number.isFinite(i) || !Number.isFinite(j)) return;
      if (i < 0 || j < 0 || i >= n || j >= n) return;
      if (i === j) return;
      pairs.push([i, j]);
    });
    return { n: n, pairs: pairs };
  }

  function buildAdjacency(n, pairs) {
    const seq = [];
    for (let i = 0; i < n; i++) seq.push([]);
    pairs.forEach((p) => { seq[p[0]].unshift(p[1]); seq[p[1]].unshift(p[0]); });
    return seq;
  }

  function equivalenceFrames(n, pairs) {
    const frames = [];
    const seq = [];
    for (let i = 0; i < n; i++) seq.push([]);
    const snapSeq = () => seq.map((l) => l.slice());
    pairs.forEach((p) => {
      seq[p[0]].unshift(p[1]); seq[p[1]].unshift(p[0]);
      frames.push({ phase: 'build', pair: [p[0], p[1]], seq: snapSeq() });
    });
    const out = new Array(n).fill(false);
    const classes = [];
    const snapFind = (active, event, stack, current, scanning) => frames.push({
      phase: 'find', active: active, event: event, stack: stack.slice(), out: out.slice(),
      classes: classes.map((c) => c.slice()), current: current.slice(), scanning: scanning || null
    });
    for (let i = 0; i < n; i++) {
      if (out[i]) continue;
      const cls = [];
      const stack = [i];
      out[i] = true;
      snapFind(i, 'push', stack, cls, null);
      while (stack.length) {
        const j = stack.pop();
        cls.push(j);
        snapFind(j, 'pop', stack, cls, null);
        seq[j].forEach((k) => {
          snapFind(j, 'scan', stack, cls, { from: j, to: k });
          if (!out[k]) { out[k] = true; stack.push(k); snapFind(k, 'push', stack, cls, null); }
        });
      }
      cls.sort((a, b) => a - b);
      classes.push(cls);
      snapFind(-1, 'class-done', [], [], null);
    }
    frames.push({ phase: 'done', classes: classes.map((c) => c.slice()) });
    return { frames: frames, classes: classes, seq: seq };
  }

  const DEFAULT = { n: 12, pairs: [[0, 4], [3, 1], [6, 10], [8, 9], [7, 4], [6, 8], [3, 5], [2, 11], [11, 0]] };

  const api = { parseInput: parseInput, buildAdjacency: buildAdjacency, equivalenceFrames: equivalenceFrames, DEFAULT: DEFAULT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ListEquivalenceViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
