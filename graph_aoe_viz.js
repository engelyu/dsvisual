(function (global) {
  const AOE_PRESET = {
    nodes: [
      { id: 1, x: 40, y: 140 },
      { id: 2, x: 180, y: 50 }, { id: 3, x: 180, y: 140 }, { id: 4, x: 180, y: 230 },
      { id: 5, x: 330, y: 95 }, { id: 6, x: 330, y: 215 },
      { id: 7, x: 480, y: 50 }, { id: 8, x: 480, y: 160 },
      { id: 9, x: 640, y: 110 },
    ],
    edges: [
      { u: 1, v: 2, w: 6 }, { u: 1, v: 3, w: 4 }, { u: 1, v: 4, w: 5 },
      { u: 2, v: 5, w: 1 }, { u: 3, v: 5, w: 1 }, { u: 4, v: 6, w: 2 },
      { u: 5, v: 7, w: 9 }, { u: 5, v: 8, w: 7 }, { u: 6, v: 8, w: 4 },
      { u: 7, v: 9, w: 2 }, { u: 8, v: 9, w: 4 },
    ],
  };

  function topoOrder(nodes, edges) {
    const indeg = {}, adj = {};
    nodes.forEach((n) => { indeg[n.id] = 0; adj[n.id] = []; });
    edges.forEach((e) => { adj[e.u].push(e.v); indeg[e.v]++; });
    const q = nodes.filter((n) => indeg[n.id] === 0).map((n) => n.id).sort((a, b) => a - b);
    const order = [];
    while (q.length) {
      const u = q.shift();
      order.push(u);
      for (const v of adj[u]) { if (--indeg[v] === 0) q.push(v); }
      q.sort((a, b) => a - b);
    }
    return order;
  }

  function buildAoeFrames(nodes, edges) {
    const order = topoOrder(nodes, edges);
    const inEdges = {}, outEdges = {};
    nodes.forEach((n) => { inEdges[n.id] = []; outEdges[n.id] = []; });
    edges.forEach((e) => { outEdges[e.u].push(e); inEdges[e.v].push(e); });
    const ee = {}, le = {};
    const frames = [];
    let criticalSoFar = [];
    const snap = (phase, current, msg) => frames.push({ phase, current, ee: Object.assign({}, ee), le: Object.assign({}, le), criticalEdges: (phase === 'critical' ? criticalSoFar.slice() : []), msg });

    for (const u of order) {
      ee[u] = inEdges[u].length ? Math.max(...inEdges[u].map((e) => ee[e.u] + e.w)) : 0;
      snap('forward', u, { zh: 'Forward:ee(' + u + ') = ' + ee[u], en: 'Forward: ee(' + u + ') = ' + ee[u] });
    }
    const sink = order[order.length - 1];
    for (let i = order.length - 1; i >= 0; i--) {
      const u = order[i];
      le[u] = outEdges[u].length ? Math.min(...outEdges[u].map((e) => le[e.v] - e.w)) : ee[sink];
      snap('backward', u, { zh: 'Backward:le(' + u + ') = ' + le[u], en: 'Backward: le(' + u + ') = ' + le[u] });
    }
    const criticalEdges = edges.filter((e) => ee[e.u] === le[e.v] - e.w);
    criticalSoFar = criticalEdges.slice();
    snap('critical', null, { zh: '關鍵活動(e=l)標示為關鍵路徑;專案總工時 = ' + ee[sink], en: 'Critical activities (e=l) form the critical path; project length = ' + ee[sink] });

    return { frames, ee, le, criticalEdges };
  }

  const api = { AOE_PRESET, topoOrder, buildAoeFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AoeViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
