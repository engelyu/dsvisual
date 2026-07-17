(function (global) {
  const K = () => global.VizKit;
  const C = () => global.VizCore;
  const R = () => global.VizRegistry;

  // Pentagon + one diagonal — connected, has cycles, good for BFS/DFS/MST demos.
  // Used as the default starting state for every graph mode (so users see a
  // non-trivial graph instead of 5 isolated nodes) and as the target of
  // btnGraphClear ("Reset Graph" → restore defaults, not empty).
  const DEFAULT_EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]];
  const DEFAULT_WEIGHTED_EDGES = [
    { u: 0, v: 1, w: 4 }, { u: 1, v: 2, w: 1 }, { u: 2, v: 3, w: 6 },
    { u: 3, v: 4, w: 2 }, { u: 4, v: 0, w: 3 }, { u: 0, v: 2, w: 5 },
  ];
  function freshEdges() { return DEFAULT_EDGES.map((e) => e.slice()); }
  function freshWeightedEdges() { return DEFAULT_WEIGHTED_EDGES.map((e) => ({ ...e })); }

  let edges = freshEdges(); let weightedEdges = freshWeightedEdges();
  let mstEdgeKeys = new Set(); let graphCandidateEdgeKey = null;
  let dijkstraDistances = new Map(); let dijkstraVisited = new Set(); let shortestPathEdges = new Set();
  let topoOrder = []; let topoVisited = new Set(); let topoEdges = [];

  let dom = null; // { graphU, graphV, graphW, btnGraphAdd, btnGraphKruskal, btnGraphClear, graphSource, graphTarget, btnGraphDijkstra, btnGraphTopo, runtimeControls }

  function edgeKey(u, v) {
    return u < v ? (u + '-' + v) : (v + '-' + u);
  }

  async function runKruskalMST() {
    const showStatus = K().showStatus;
    const nodeCount = 5;
    const parent = Array.from({ length: nodeCount }, (_, i) => i);
    const rank = Array(nodeCount).fill(0);
    const sorted = [...weightedEdges].sort((a, b) => a.w - b.w);
    mstEdgeKeys.clear();

    function find(x) {
      if (parent[x] !== x) parent[x] = find(parent[x]);
      return parent[x];
    }

    function unite(a, b) {
      let ra = find(a); let rb = find(b);
      if (ra === rb) return false;
      if (rank[ra] < rank[rb]) [ra, rb] = [rb, ra];
      parent[rb] = ra;
      if (rank[ra] === rank[rb]) rank[ra] += 1;
      return true;
    }

    let totalWeight = 0;
    let selected = 0;

    for (const e of sorted) {
      graphCandidateEdgeKey = edgeKey(e.u, e.v);
      renderGraph();
      showStatus('Consider edge ' + e.u + '-' + e.v + ' (w=' + e.w + ')', '#fbbf24');
      await sleep(500);

      if (unite(e.u, e.v)) {
        mstEdgeKeys.add(graphCandidateEdgeKey);
        totalWeight += e.w;
        selected += 1;
        renderGraph();
        showStatus('Pick edge ' + e.u + '-' + e.v + ' (w=' + e.w + ')', '#34d399');
        await sleep(500);
        if (selected === nodeCount - 1) break;
      }
    }

    graphCandidateEdgeKey = null;
    renderGraph();
    if (selected === nodeCount - 1) showStatus('Kruskal complete: MST weight = ' + totalWeight, '#34d399');
    else showStatus('Kruskal complete: forest weight = ' + totalWeight + ' (graph disconnected)', '#fbbf24');
  }

  function buildWeightedGraphSvg(nodes, edgeList, directed) {
    function nodeById(id) { return nodes.find((nd) => nd.id === id); }
    function hasEdge(u, v) { return edgeList.some((ed) => ed.u === u && ed.v === v); }
    let svg = '<svg class="wgraph-svg" viewBox="0 0 320 250" width="100%" ' +
              'xmlns="http://www.w3.org/2000/svg">';
    if (directed) {
      svg += '<defs><marker id="wg-arrow" markerWidth="9" markerHeight="9" refX="8" refY="3" ' +
             'orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8"/></marker></defs>';
    }
    for (const e of edgeList) {
      const a = nodeById(e.u), b = nodeById(e.v);
      const dx = b.x - a.x, dy = b.y - a.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const ux = dx / len, uy = dy / len;
      let ox = 0, oy = 0;
      if (directed && hasEdge(e.v, e.u)) {
        // anti-parallel pair: offset each edge to opposite sides of the shared path
        const ln = nodeById(Math.min(e.u, e.v)), hn = nodeById(Math.max(e.u, e.v));
        const cdx = hn.x - ln.x, cdy = hn.y - ln.y;
        const clen = Math.sqrt(cdx * cdx + cdy * cdy) || 1;
        const off = 7 * (e.u < e.v ? 1 : -1);
        ox = (-cdy / clen) * off;
        oy = (cdx / clen) * off;
      }
      const x1 = (a.x + ux * 18 + ox).toFixed(1), y1 = (a.y + uy * 18 + oy).toFixed(1);
      const x2 = (b.x - ux * 18 + ox).toFixed(1), y2 = (b.y - uy * 18 + oy).toFixed(1);
      svg += '<line class="wgraph-edge" data-edge="' + e.u + '-' + e.v + '" x1="' + x1 +
             '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
             '" stroke="#94a3b8" stroke-width="2"' +
             (directed ? ' marker-end="url(#wg-arrow)"' : '') + '/>';
      const mx = ((a.x + b.x) / 2 + ox).toFixed(1), my = ((a.y + b.y) / 2 + oy - 4).toFixed(1);
      svg += '<text class="wgraph-weight" x="' + mx + '" y="' + my +
             '" text-anchor="middle" font-size="11" fill="#475569">' + e.w + '</text>';
    }
    for (const nd of nodes) {
      svg += '<circle class="wgraph-node" data-node="' + nd.id + '" cx="' + nd.x + '" cy="' +
             nd.y + '" r="16" fill="#fff" stroke="#1e40af" stroke-width="2"/>';
      svg += '<text class="wgraph-nlabel" x="' + nd.x + '" y="' + (nd.y + 5) +
             '" text-anchor="middle" font-size="13" font-weight="700">' + nd.label + '</text>';
    }
    svg += '</svg>';
    return svg;
  }

  function renderGraphDual() {
    const host = K().acquireDynamicVizHost();
    const adjacency = [[1,4],[0,2,3,4],[1,3],[1,2,4],[0,1,3]];

    function paneSvg(modeClass) {
      return `<svg viewBox="0 0 280 200" width="100%" class="` + modeClass + `-svg"
      xmlns="http://www.w3.org/2000/svg">
      <g class="edges" stroke="#94a3b8" stroke-width="2">
          <line x1="140" y1="30" x2="60"  y2="80"/>
          <line x1="140" y1="30" x2="220" y2="80"/>
          <line x1="60"  y1="80" x2="80"  y2="160"/>
          <line x1="60"  y1="80" x2="200" y2="160"/>
          <line x1="60"  y1="80" x2="220" y2="80"/>
          <line x1="80"  y1="160" x2="200" y2="160"/>
          <line x1="200" y1="160" x2="220" y2="80"/>
      </g>
      <g class="nodes">
          <circle cx="140" cy="30"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="0"/>
          <text x="140" y="35" text-anchor="middle" font-size="14" font-weight="700">0</text>
          <circle cx="60"  cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="1"/>
          <text x="60"  y="85" text-anchor="middle" font-size="14" font-weight="700">1</text>
          <circle cx="80"  cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="2"/>
          <text x="80"  y="165" text-anchor="middle" font-size="14" font-weight="700">2</text>
          <circle cx="200" cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="3"/>
          <text x="200" y="165" text-anchor="middle" font-size="14" font-weight="700">3</text>
          <circle cx="220" cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="4"/>
          <text x="220" y="85" text-anchor="middle" font-size="14" font-weight="700">4</text>
      </g>
  </svg>`;
    }

    const grid = document.createElement('div');
    grid.className = 'graph-dual-grid';
    grid.innerHTML =
        '<div class="graph-dual-pane" data-pane="bfs"><h4>BFS (queue)</h4>' + paneSvg('bfs') +
            '<div class="bfs-queue" data-testid="bfs-queue"><strong>Queue:</strong> <span class="bfs-queue-items">0</span></div>' +
            '<div class="bfs-visited"><strong>Visited:</strong> <span class="bfs-visited-items"></span></div>' +
        '</div>' +
        '<div class="graph-dual-pane" data-pane="dfs"><h4>DFS (stack)</h4>' + paneSvg('dfs') +
            '<div class="dfs-stack" data-testid="dfs-stack"><strong>Stack:</strong> <span class="dfs-stack-items">0</span></div>' +
            '<div class="bfs-visited"><strong>Visited:</strong> <span class="dfs-visited-items"></span></div>' +
        '</div>';
    host.appendChild(grid);

    // BFS state
    let bfsVisited = new Set(), bfsQueue = [0], bfsOrder = [];
    // DFS state
    let dfsVisited = new Set(), dfsStack = [0], dfsOrder = [];

    const bfsPane = host.querySelector('[data-pane="bfs"]');
    const dfsPane = host.querySelector('[data-pane="dfs"]');
    const bfsQueueEl = bfsPane.querySelector('.bfs-queue-items');
    const dfsStackEl = dfsPane.querySelector('.dfs-stack-items');
    const bfsVisitedEl = bfsPane.querySelector('.bfs-visited-items');
    const dfsVisitedEl = dfsPane.querySelector('.dfs-visited-items');

    function bfsStep() {
      while (bfsQueue.length && bfsVisited.has(bfsQueue[0])) bfsQueue.shift();
      if (bfsQueue.length === 0) return;
      const u = bfsQueue.shift();
      bfsVisited.add(u);
      bfsOrder.push(u);
      const c = bfsPane.querySelector('[data-node="' + u + '"]');
      if (c) c.setAttribute('fill', '#10b981');
      for (const v of adjacency[u]) if (!bfsVisited.has(v)) bfsQueue.push(v);
      bfsQueueEl.textContent = bfsQueue.join(' ');
      bfsVisitedEl.textContent = bfsOrder.join(' ');
    }
    function dfsStep() {
      while (dfsStack.length && dfsVisited.has(dfsStack[dfsStack.length - 1])) dfsStack.pop();
      if (dfsStack.length === 0) return;
      const u = dfsStack.pop();
      dfsVisited.add(u);
      dfsOrder.push(u);
      const c = dfsPane.querySelector('[data-node="' + u + '"]');
      if (c) c.setAttribute('fill', '#f59e0b');
      // push reverse so smallest-numbered neighbor visited first
      for (let i = adjacency[u].length - 1; i >= 0; i--) {
        const v = adjacency[u][i];
        if (!dfsVisited.has(v)) dfsStack.push(v);
      }
      dfsStackEl.textContent = dfsStack.join(' ');
      dfsVisitedEl.textContent = dfsOrder.join(' ');
    }

    const runtimeControls = dom.runtimeControls;
    const stepBtn = runtimeControls.querySelector('[data-action="step"]')
                 || runtimeControls.querySelector('.demo-step-btn')
                 || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /step/i.test(b.textContent || ''));
    const resetBtn = runtimeControls.querySelector('[data-action="reset"]')
                  || runtimeControls.querySelector('.demo-reset-btn')
                  || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /reset/i.test(b.textContent || ''));
    if (stepBtn) stepBtn.onclick = () => { bfsStep(); dfsStep(); };
    if (resetBtn) resetBtn.onclick = () => {
      bfsVisited = new Set(); bfsQueue = [0]; bfsOrder = [];
      dfsVisited = new Set(); dfsStack = [0]; dfsOrder = [];
      bfsQueueEl.textContent = '0';
      dfsStackEl.textContent = '0';
      bfsVisitedEl.textContent = '';
      dfsVisitedEl.textContent = '';
      host.querySelectorAll('.nodes circle').forEach(c => c.setAttribute('fill', '#fff'));
    };
  }

  function renderPrim() {
    const host = K().acquireDynamicVizHost();
    const nodes = [
      { id: 0, label: '0', x: 160, y: 35 },
      { id: 1, label: '1', x: 270, y: 110 },
      { id: 2, label: '2', x: 225, y: 215 },
      { id: 3, label: '3', x: 95, y: 215 },
      { id: 4, label: '4', x: 50, y: 110 },
    ];
    const primEdges = [
      { u: 0, v: 1, w: 2 }, { u: 0, v: 3, w: 6 }, { u: 1, v: 2, w: 3 },
      { u: 1, v: 3, w: 8 }, { u: 1, v: 4, w: 5 }, { u: 2, v: 4, w: 7 },
      { u: 3, v: 4, w: 9 },
    ];
    const adj = {};
    nodes.forEach((nd) => { adj[nd.id] = []; });
    primEdges.forEach((e) => {
      adj[e.u].push({ to: e.v, w: e.w });
      adj[e.v].push({ to: e.u, w: e.w });
    });
    const inTree = {};
    const steps = [{ node: 0, edge: null, total: 0 }];
    inTree[0] = true;
    let total = 0;
    for (let c = 1; c < nodes.length; c++) {
      let best = null;
      for (const id in inTree) {
        for (const nb of adj[id]) {
          if (!inTree[nb.to] && (!best || nb.w < best.w)) {
            best = { from: parseInt(id, 10), to: nb.to, w: nb.w };
          }
        }
      }
      inTree[best.to] = true;
      total += best.w;
      steps.push({ node: best.to, edge: [best.from, best.to], total: total });
    }
    let idx = 0;

    const wrap = document.createElement('div');
    wrap.className = 'prim-wrap';
    wrap.innerHTML = buildWeightedGraphSvg(nodes, primEdges, false) +
        '<div class="prim-stats" data-testid="prim-stats">MST weight: ' +
        '<span class="prim-weight">0</span></div>';
    host.appendChild(wrap);
    const weightEl = wrap.querySelector('.prim-weight');

    function draw() {
      wrap.querySelectorAll('.wgraph-node').forEach((c) => c.classList.remove('wgraph-in'));
      wrap.querySelectorAll('.wgraph-edge').forEach((l) =>
          l.classList.remove('wgraph-in', 'wgraph-cur'));
      for (let s = 0; s <= idx; s++) {
        const st = steps[s];
        const nodeEl = wrap.querySelector('.wgraph-node[data-node="' + st.node + '"]');
        if (nodeEl) nodeEl.classList.add('wgraph-in');
        if (st.edge) {
          const eEl = wrap.querySelector(
              '.wgraph-edge[data-edge="' + st.edge[0] + '-' + st.edge[1] + '"], ' +
              '.wgraph-edge[data-edge="' + st.edge[1] + '-' + st.edge[0] + '"]');
          if (eEl) eEl.classList.add(s === idx ? 'wgraph-cur' : 'wgraph-in');
        }
      }
      weightEl.textContent = steps[idx].total;
    }
    function step() {
      if (idx >= steps.length - 1) return false;
      idx++;
      draw();
      return idx < steps.length - 1;
    }
    function reset() { idx = 0; draw(); }
    wrap.appendChild(K().buildStepControls(step, reset, 700));
    draw();
  }

  function renderBellmanFord() {
    const host = K().acquireDynamicVizHost();
    const nodes = [
      { id: 0, label: '0', x: 45, y: 70 },
      { id: 1, label: '1', x: 160, y: 35 },
      { id: 2, label: '2', x: 160, y: 160 },
      { id: 3, label: '3', x: 275, y: 60 },
      { id: 4, label: '4', x: 275, y: 185 },
    ];
    const bfEdges = [
      { u: 0, v: 1, w: 6 }, { u: 0, v: 2, w: 7 }, { u: 1, v: 2, w: 8 },
      { u: 1, v: 3, w: 5 }, { u: 1, v: 4, w: -4 }, { u: 2, v: 3, w: -3 },
      { u: 2, v: 4, w: 9 }, { u: 3, v: 1, w: -2 }, { u: 4, v: 0, w: 2 },
      { u: 4, v: 3, w: 7 },
    ];
    const V = nodes.length;
    const INF = Infinity;
    const dist = new Array(V).fill(INF);
    dist[0] = 0;
    const frames = [{ dist: dist.slice(), edge: null, msg: 'init: dist[0] = 0, others ∞' }];
    for (let pass = 1; pass <= V - 1; pass++) {
      let changed = false;
      for (const e of bfEdges) {
        if (dist[e.u] !== INF && dist[e.u] + e.w < dist[e.v]) {
          dist[e.v] = dist[e.u] + e.w;
          changed = true;
          frames.push({ dist: dist.slice(), edge: [e.u, e.v],
              msg: 'pass ' + pass + ': relax ' + e.u + '→' + e.v +
                   '   dist[' + e.v + '] = ' + dist[e.v] });
        } else {
          frames.push({ dist: dist.slice(), edge: [e.u, e.v],
              msg: 'pass ' + pass + ': edge ' + e.u + '→' + e.v + ' — no improvement' });
        }
      }
      if (!changed) break;
    }
    let idx = 0;

    const wrap = document.createElement('div');
    wrap.className = 'bellman-wrap';
    wrap.innerHTML = buildWeightedGraphSvg(nodes, bfEdges, true) +
        '<div class="bellman-darr"></div>' +
        '<div class="bellman-msg" data-testid="bellman-msg">&nbsp;</div>';
    host.appendChild(wrap);
    const darrEl = wrap.querySelector('.bellman-darr');
    const msgEl = wrap.querySelector('.bellman-msg');

    function draw() {
      const f = frames[idx];
      wrap.querySelectorAll('.wgraph-edge').forEach((l) => l.classList.remove('wgraph-cur'));
      if (f.edge) {
        const eEl = wrap.querySelector('.wgraph-edge[data-edge="' + f.edge[0] + '-' + f.edge[1] + '"]');
        if (eEl) eEl.classList.add('wgraph-cur');
      }
      let html = '';
      for (let v = 0; v < V; v++) {
        const val = f.dist[v] === INF ? '∞' : f.dist[v];
        html += '<div class="bellman-dcol">' +
                '<span class="bellman-didx">' + v + '</span>' +
                '<span class="bellman-dcell" data-dist="' + v + '">' + val + '</span>' +
                '</div>';
      }
      darrEl.innerHTML = html;
      msgEl.textContent = f.msg;
    }
    function step() {
      if (idx >= frames.length - 1) return false;
      idx++;
      draw();
      return idx < frames.length - 1;
    }
    function reset() { idx = 0; draw(); }
    wrap.appendChild(K().buildStepControls(step, reset, 400));
    draw();
  }

  function renderFloydWarshall() {
    const host = K().acquireDynamicVizHost();
    const V = 4;
    const labels = ['A', 'B', 'C', 'D'];
    const INF = Infinity;
    const init = [
      [0, 3, INF, 7],
      [8, 0, 2, INF],
      [5, INF, 0, 1],
      [2, INF, INF, 0],
    ];
    const frames = [{ k: -1, dist: init.map((r) => r.slice()), changed: [],
        msg: 'initial distance matrix (direct edges only)' }];
    let dist = init.map((r) => r.slice());
    for (let k = 0; k < V; k++) {
      const changed = [];
      const next = dist.map((r) => r.slice());
      for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            next[i][j] = dist[i][k] + dist[k][j];
            changed.push(i + ',' + j);
          }
        }
      }
      dist = next;
      frames.push({ k: k, dist: dist.map((r) => r.slice()), changed: changed,
          msg: 'k = ' + k + '  (' + labels[k] + ' as intermediate) — ' +
               changed.length + ' cell(s) improved' });
    }
    let idx = 0;

    const wrap = document.createElement('div');
    wrap.className = 'floyd-wrap';
    wrap.innerHTML =
        '<div class="floyd-grid"></div>' +
        '<div class="floyd-msg" data-testid="floyd-msg">&nbsp;</div>';
    host.appendChild(wrap);
    const gridEl = wrap.querySelector('.floyd-grid');
    const msgEl = wrap.querySelector('.floyd-msg');

    function draw() {
      const f = frames[idx];
      let html = '<div class="floyd-hcell"></div>';
      for (let j = 0; j < V; j++) {
        html += '<div class="floyd-hcell' + (j === f.k ? ' floyd-pivot' : '') + '">' +
                labels[j] + '</div>';
      }
      for (let i = 0; i < V; i++) {
        html += '<div class="floyd-hcell' + (i === f.k ? ' floyd-pivot' : '') + '">' +
                labels[i] + '</div>';
        for (let j = 0; j < V; j++) {
          const val = f.dist[i][j] === INF ? '∞' : f.dist[i][j];
          const cls = 'floyd-cell' +
              (f.changed.indexOf(i + ',' + j) >= 0 ? ' floyd-changed' : '') +
              ((i === f.k || j === f.k) ? ' floyd-pivotline' : '');
          html += '<div class="' + cls + '" data-cell="' + i + '-' + j + '">' + val + '</div>';
        }
      }
      gridEl.innerHTML = html;
      msgEl.textContent = f.msg;
    }
    function step() {
      if (idx >= frames.length - 1) return false;
      idx++;
      draw();
      return idx < frames.length - 1;
    }
    function reset() { idx = 0; draw(); }
    wrap.appendChild(K().buildStepControls(step, reset, 800));
    draw();
  }

  function renderGraph() {
    const currentMode = C().getMode();
    if (currentMode === 'graph-bfs') {
      const host = K().acquireDynamicVizHost();
      const svg = `<svg viewBox="0 0 280 200" width="100%" style="max-width:280px"
    xmlns="http://www.w3.org/2000/svg" class="bfs-svg">
    <g class="edges" stroke="#94a3b8" stroke-width="2">
        <line x1="140" y1="30" x2="60"  y2="80"/>
        <line x1="140" y1="30" x2="220" y2="80"/>
        <line x1="60"  y1="80" x2="80"  y2="160"/>
        <line x1="60"  y1="80" x2="200" y2="160"/>
        <line x1="60"  y1="80" x2="220" y2="80"/>
        <line x1="80"  y1="160" x2="200" y2="160"/>
        <line x1="200" y1="160" x2="220" y2="80"/>
    </g>
    <g class="nodes">
        <circle cx="140" cy="30"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="0"/>
        <text x="140" y="35" text-anchor="middle" font-size="14" font-weight="700">0</text>
        <circle cx="60"  cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="1"/>
        <text x="60"  y="85" text-anchor="middle" font-size="14" font-weight="700">1</text>
        <circle cx="80"  cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="2"/>
        <text x="80"  y="165" text-anchor="middle" font-size="14" font-weight="700">2</text>
        <circle cx="200" cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="3"/>
        <text x="200" y="165" text-anchor="middle" font-size="14" font-weight="700">3</text>
        <circle cx="220" cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="4"/>
        <text x="220" y="85" text-anchor="middle" font-size="14" font-weight="700">4</text>
    </g>
</svg>`;

      const wrap = document.createElement('div');
      wrap.className = 'bfs-wrap';
      wrap.innerHTML = svg + '<div class="bfs-queue" data-testid="bfs-queue"><strong>Queue:</strong> <span class="bfs-queue-items">0</span></div>'
                         + '<div class="bfs-visited"><strong>Visited:</strong> <span class="bfs-visited-items"></span></div>';
      host.appendChild(wrap);

      // BFS step handler — bind to the existing step/reset buttons if present.
      const adjacency = [[1,4],[0,2,3,4],[1,3],[1,2,4],[0,1,3]];
      const state = { visited: [], queue: [0], visitedSet: new Set() };
      const queueEl = wrap.querySelector('.bfs-queue-items');
      const visitedEl = wrap.querySelector('.bfs-visited-items');

      function bfsStep() {
        while (state.queue.length && state.visitedSet.has(state.queue[0])) state.queue.shift();
        if (state.queue.length === 0) return;
        const u = state.queue.shift();
        state.visitedSet.add(u);
        state.visited.push(u);
        const circle = wrap.querySelector('[data-node="' + u + '"]');
        if (circle) circle.setAttribute('fill', '#10b981');
        for (const v of adjacency[u]) if (!state.visitedSet.has(v)) state.queue.push(v);
        queueEl.textContent = state.queue.join(' ');
        visitedEl.textContent = state.visited.join(' ');
      }
      function bfsReset() {
        state.visited = [];
        state.queue = [0];
        state.visitedSet = new Set();
        queueEl.textContent = '0';
        visitedEl.textContent = '';
        wrap.querySelectorAll('.nodes circle').forEach((c) => c.setAttribute('fill', '#fff'));
      }

      // Bind to existing graph controls — search the runtimeControls for step/reset buttons.
      const runtimeControls = dom.runtimeControls;
      const stepBtn = runtimeControls.querySelector('[data-action="step"]')
                   || runtimeControls.querySelector('.demo-step-btn')
                   || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /step/i.test(b.textContent || ''));
      const resetBtn = runtimeControls.querySelector('[data-action="reset"]')
                    || runtimeControls.querySelector('.demo-reset-btn')
                    || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /reset/i.test(b.textContent || ''));
      if (stepBtn) stepBtn.onclick = bfsStep;
      if (resetBtn) resetBtn.onclick = bfsReset;
      return;
    }
    if (currentMode === 'graph-dfs') {
      const host = K().acquireDynamicVizHost();
      const svg = `<svg viewBox="0 0 280 200" width="100%" style="max-width:280px"
    xmlns="http://www.w3.org/2000/svg" class="dfs-svg">
    <g class="edges" stroke="#94a3b8" stroke-width="2">
        <line x1="140" y1="30" x2="60"  y2="80"/>
        <line x1="140" y1="30" x2="220" y2="80"/>
        <line x1="60"  y1="80" x2="80"  y2="160"/>
        <line x1="60"  y1="80" x2="200" y2="160"/>
        <line x1="60"  y1="80" x2="220" y2="80"/>
        <line x1="80"  y1="160" x2="200" y2="160"/>
        <line x1="200" y1="160" x2="220" y2="80"/>
    </g>
    <g class="nodes">
        <circle cx="140" cy="30"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="0"/>
        <text x="140" y="35" text-anchor="middle" font-size="14" font-weight="700">0</text>
        <circle cx="60"  cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="1"/>
        <text x="60"  y="85" text-anchor="middle" font-size="14" font-weight="700">1</text>
        <circle cx="80"  cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="2"/>
        <text x="80"  y="165" text-anchor="middle" font-size="14" font-weight="700">2</text>
        <circle cx="200" cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="3"/>
        <text x="200" y="165" text-anchor="middle" font-size="14" font-weight="700">3</text>
        <circle cx="220" cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="4"/>
        <text x="220" y="85" text-anchor="middle" font-size="14" font-weight="700">4</text>
    </g>
</svg>`;
      const wrap = document.createElement('div');
      wrap.className = 'dfs-wrap';
      wrap.innerHTML = svg + '<div class="dfs-stack" data-testid="dfs-stack"><strong>Stack:</strong> <span class="dfs-stack-items">0</span></div>'
                         + '<div class="bfs-visited"><strong>Visited:</strong> <span class="dfs-visited-items"></span></div>';
      host.appendChild(wrap);

      // DFS step handler — bind to step/reset buttons (use same fallback chain as graph-bfs).
      const adjacency = [[1,4],[0,2,3,4],[1,3],[1,2,4],[0,1,3]];
      const state = { visited: [], stack: [0], visitedSet: new Set() };
      const stackEl = wrap.querySelector('.dfs-stack-items');
      const visitedEl = wrap.querySelector('.dfs-visited-items');

      function dfsStep() {
        while (state.stack.length && state.visitedSet.has(state.stack[state.stack.length - 1])) state.stack.pop();
        if (state.stack.length === 0) return;
        const u = state.stack.pop();
        state.visitedSet.add(u);
        state.visited.push(u);
        const circle = wrap.querySelector('[data-node="' + u + '"]');
        if (circle) circle.setAttribute('fill', '#f59e0b');
        // push reverse so smallest-numbered neighbor visited first
        for (let i = adjacency[u].length - 1; i >= 0; i--) {
          const v = adjacency[u][i];
          if (!state.visitedSet.has(v)) state.stack.push(v);
        }
        stackEl.textContent = state.stack.join(' ');
        visitedEl.textContent = state.visited.join(' ');
      }
      function dfsReset() {
        state.visited = []; state.stack = [0]; state.visitedSet = new Set();
        stackEl.textContent = '0';
        visitedEl.textContent = '';
        wrap.querySelectorAll('.nodes circle').forEach((c) => c.setAttribute('fill', '#fff'));
      }

      const runtimeControls = dom.runtimeControls;
      const stepBtn = runtimeControls.querySelector('[data-action="step"]')
                   || runtimeControls.querySelector('.demo-step-btn')
                   || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /step/i.test(b.textContent || ''));
      const resetBtn = runtimeControls.querySelector('[data-action="reset"]')
                    || runtimeControls.querySelector('.demo-reset-btn')
                    || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /reset/i.test(b.textContent || ''));
      if (stepBtn) stepBtn.onclick = dfsStep;
      if (resetBtn) resetBtn.onclick = dfsReset;
      return;
    }
    if (currentMode === 'graph-adjlist') {
      // Render the same 5-node graph but as a vertical list of adjacency rows:
      // [0] -> 1 -> 4 -> null
      // [1] -> 0 -> 2 -> 3 -> 4 -> null
      // ... etc.
      const adjacency = [
        [1, 4],
        [0, 2, 3, 4],
        [1, 3],
        [1, 2, 4],
        [0, 1, 3],
      ];
      const host = K().acquireDynamicVizHost();
      const container = document.createElement('div');
      container.className = 'adjlist-container';
      for (let i = 0; i < adjacency.length; i++) {
        const row = document.createElement('div');
        row.className = 'adjlist-row';
        const head = document.createElement('span');
        head.className = 'adjlist-vertex';
        head.textContent = '[' + i + ']';
        row.appendChild(head);
        for (const n of adjacency[i]) {
          const arrow = document.createElement('span');
          arrow.className = 'adjlist-arrow';
          arrow.textContent = '→';
          row.appendChild(arrow);
          const node = document.createElement('span');
          node.className = 'adjlist-node';
          node.textContent = String(n);
          row.appendChild(node);
        }
        const arrowEnd = document.createElement('span');
        arrowEnd.className = 'adjlist-arrow';
        arrowEnd.textContent = '→';
        row.appendChild(arrowEnd);
        const nullNode = document.createElement('span');
        nullNode.className = 'adjlist-null';
        nullNode.textContent = 'null';
        row.appendChild(nullNode);
        container.appendChild(row);
      }
      host.appendChild(container);
      return;
    }
    const svg = document.getElementById('graph-edges'); svg.innerHTML = '';
    const pos = [{x:150,y:30},{x:270,y:120},{x:225,y:255},{x:75,y:255},{x:30,y:120}];

    // Update node classes
    for (let i = 0; i < 5; i++) {
      const nodeEl = document.getElementById('gn-' + i);
      nodeEl.className = 'graph-node';
      if (currentMode === 'graph-dijkstra') {
        if (i === parseInt(dom.graphSource.value)) nodeEl.classList.add('source');
        else if (dijkstraVisited.has(i)) nodeEl.classList.add('visited');
      } else if (currentMode === 'graph-topo') {
        if (topoVisited.has(i)) nodeEl.classList.add('visited');
      }
    }

    if (currentMode === 'graph-kruskal') {
      weightedEdges.forEach(e => {
        const p1 = pos[e.u], p2 = pos[e.v];
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
        const key = edgeKey(e.u, e.v);
        let className = 'graph-edge weighted';
        if (key === graphCandidateEdgeKey) className += ' candidate';
        if (mstEdgeKeys.has(key)) className += ' mst';
        line.setAttribute("class", className);
        svg.appendChild(line);

        const tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tx.setAttribute('x', ((p1.x + p2.x) / 2));
        tx.setAttribute('y', ((p1.y + p2.y) / 2));
        tx.setAttribute('class', 'graph-weight');
        tx.textContent = String(e.w);
        svg.appendChild(tx);
      });
    } else if (currentMode === 'graph-dijkstra') {
      edges.forEach(e => {
        const p1 = pos[e[0]], p2 = pos[e[1]];
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
        let className = 'graph-edge';
        if (shortestPathEdges.has(edgeKey(e[0], e[1]))) className += ' shortest';
        else if (dijkstraVisited.has(e[0]) && dijkstraVisited.has(e[1])) className += ' visited';
        line.setAttribute("class", className);
        svg.appendChild(line);
      });
      // Display distances
      dijkstraDistances.forEach((dist, node) => {
        const p = pos[node];
        const tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tx.setAttribute('x', p.x);
        tx.setAttribute('y', p.y + 20);
        tx.setAttribute('class', 'graph-distance');
        tx.textContent = 'd=' + dist;
        svg.appendChild(tx);
      });
    } else if (currentMode === 'graph-topo') {
      topoEdges.forEach(e => {
        const p1 = pos[e[0]], p2 = pos[e[1]];
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
        line.setAttribute("class", 'graph-edge');
        svg.appendChild(line);
        // Add arrow for directed edge
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const arrowSize = 8;
        const arrowX = p2.x - arrowSize * Math.cos(angle);
        const arrowY = p2.y - arrowSize * Math.sin(angle);
        const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        poly.setAttribute("points", `${p2.x},${p2.y} ${arrowX - arrowSize * Math.sin(angle)},${arrowY + arrowSize * Math.cos(angle)} ${arrowX + arrowSize * Math.sin(angle)},${arrowY - arrowSize * Math.cos(angle)}`);
        poly.setAttribute("fill", "#94a3b8");
        svg.appendChild(poly);
      });
      // Display topo order
      topoOrder.forEach((node, idx) => {
        const p = pos[node];
        const tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tx.setAttribute('x', p.x);
        tx.setAttribute('y', p.y + 20);
        tx.setAttribute('class', 'graph-order');
        tx.textContent = '#' + (idx + 1);
        svg.appendChild(tx);
      });
    } else {
      edges.forEach(e => { const p1 = pos[e[0]], p2 = pos[e[1]]; const line = document.createElementNS("http://www.w3.org/2000/svg", "line"); line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y); line.setAttribute("class", "graph-edge"); svg.appendChild(line); });
    }
  }

  async function runDijkstra(source) {
    const showStatus = K().showStatus;
    dijkstraDistances.clear();
    dijkstraVisited.clear();
    shortestPathEdges.clear();

    // Initialize distances
    for (let i = 0; i < 5; i++) {
      dijkstraDistances.set(i, i === source ? 0 : Infinity);
    }

    const pq = [[0, source]]; // [distance, node]
    const visited = new Set();

    while (pq.length > 0) {
      // Manual priority queue - find min
      let minIdx = 0;
      for (let i = 1; i < pq.length; i++) {
        if (pq[i][0] < pq[minIdx][0]) minIdx = i;
      }
      const [dist, u] = pq.splice(minIdx, 1)[0];

      if (visited.has(u)) continue;
      visited.add(u);
      dijkstraVisited.add(u);
      renderGraph();

      showStatus(`Processing node ${u}, distance: ${dist}`, '#60a5fa');
      await sleep(500);

      // Find neighbors
      for (const edge of edges) {
        let v = -1;
        if (edge[0] === u) v = edge[1];
        else if (edge[1] === u) v = edge[0];
        if (v === -1 || visited.has(v)) continue;

        // Assume unit weights for simplicity
        const newDist = dist + 1;
        if (newDist < dijkstraDistances.get(v)) {
          dijkstraDistances.set(v, newDist);
          pq.push([newDist, v]);
        }
      }
      renderGraph();
    }

    showStatus(`Dijkstra complete from node ${source}. All distances computed.`, '#34d399');
  }

  async function runTopoSort() {
    const showStatus = K().showStatus;
    topoOrder = [];
    topoVisited.clear();
    const adjList = Array(5).fill(null).map(() => []);
    const inDegree = Array(5).fill(0);

    // Build adjacency list and in-degrees
    topoEdges.forEach(e => {
      adjList[e[0]].push(e[1]);
      inDegree[e[1]]++;
    });

    // Find all nodes with in-degree 0
    const queue = [];
    for (let i = 0; i < 5; i++) {
      if (inDegree[i] === 0) queue.push(i);
    }

    while (queue.length > 0) {
      const u = queue.shift();
      topoOrder.push(u);
      topoVisited.add(u);
      renderGraph();

      showStatus(`Added node ${u} to topological order. Sequence: [${topoOrder.join(', ')}]`, '#a78bfa');
      await sleep(500);

      // Reduce in-degree for neighbors
      for (const v of adjList[u]) {
        inDegree[v]--;
        if (inDegree[v] === 0) {
          queue.push(v);
        }
      }
      renderGraph();
    }

    if (topoOrder.length < 5) {
      showStatus('Topological sort: Cycle detected! Only ' + topoOrder.length + ' nodes visited.', '#f87171');
    } else {
      showStatus(`Topological sort complete: [${topoOrder.join(' → ')}]`, '#34d399');
    }
  }

  function onModeSwitch(mode) {
    edges = freshEdges();
    weightedEdges = freshWeightedEdges();
    mstEdgeKeys.clear();
    graphCandidateEdgeKey = null;
  }

  function init() {
    dom = {
      graphU: document.getElementById('graph-u'),
      graphV: document.getElementById('graph-v'),
      graphW: document.getElementById('graph-w'),
      btnGraphAdd: document.getElementById('btn-graph-add'),
      btnGraphKruskal: document.getElementById('btn-graph-kruskal'),
      btnGraphClear: document.getElementById('btn-graph-clear'),
      graphSource: document.getElementById('graph-source'),
      graphTarget: document.getElementById('graph-target'),
      btnGraphDijkstra: document.getElementById('btn-graph-dijkstra'),
      btnGraphTopo: document.getElementById('btn-graph-topo'),
      // NOTE: app.js's `runtimeControls` is captured once at DOMContentLoaded
      // top (before renderMethodSections() relocates the node out from under
      // .visualization-panel into the active method section), so its scoped
      // selector still resolves there. This module's init() runs after that
      // relocation, so scope to the unique `.controls` class instead (there
      // is exactly one in the document) rather than its original ancestor.
      runtimeControls: document.querySelector('.controls'),
    };

    dom.btnGraphAdd.addEventListener('click', () => {
      const currentMode = C().getMode();
      const showStatus = K().showStatus;
      const u = parseInt(dom.graphU.value); const v = parseInt(dom.graphV.value);
      if(isNaN(u) || isNaN(v) || u<0 || u>4 || v<0 || v>4) return showStatus('Invalid Nodes (0-4)', '#f87171');
      if(u === v) return showStatus('No self loops', '#f87171');
      if (currentMode === 'graph-kruskal') {
        const w = parseInt(dom.graphW.value);
        if (isNaN(w) || w <= 0) return showStatus('Weight must be >= 1', '#f87171');
        const key = edgeKey(u, v);
        if (weightedEdges.some(e => edgeKey(e.u, e.v) === key)) return showStatus('Edge already exists', '#f87171');
        weightedEdges.push({ u, v, w });
        mstEdgeKeys.clear();
        graphCandidateEdgeKey = null;
        showStatus('Added weighted edge: ' + u + ' - ' + v + ' (w=' + w + ')', '#60a5fa');
        renderGraph();
        return;
      }
      if (currentMode === 'graph-dijkstra') {
        if(edges.some(e => (e[0]===u && e[1]===v) || (e[0]===v && e[1]===u))) return showStatus('Edge already exists', '#f87171');
        edges.push([u, v]);
        dijkstraDistances.clear();
        dijkstraVisited.clear();
        shortestPathEdges.clear();
        showStatus('Added undirected edge: ' + u + ' - ' + v, '#60a5fa');
        renderGraph();
        return;
      }
      if (currentMode === 'graph-topo') {
        if(topoEdges.some(e => e[0]===u && e[1]===v)) return showStatus('Edge already exists', '#f87171');
        topoEdges.push([u, v]);
        topoOrder = [];
        topoVisited.clear();
        showStatus('Added directed edge: ' + u + ' → ' + v, '#60a5fa');
        renderGraph();
        return;
      }
      if(edges.some(e => (e[0]===u && e[1]===v) || (e[0]===v && e[1]===u))) return showStatus('Edge already exists', '#f87171');
      edges.push([u, v]); showStatus("Added edge: " + u + " - " + v, '#60a5fa'); renderGraph();
    });

    dom.btnGraphKruskal.addEventListener('click', () => {
      const currentMode = C().getMode();
      const showStatus = K().showStatus;
      if (currentMode !== 'graph-kruskal') return;
      K().executeAnimWrapper(async () => {
        if (weightedEdges.length === 0) return showStatus('Add weighted edges first.', '#f87171');
        await runKruskalMST();
        return '__KEEP_STATUS__';
      });
    });

    dom.btnGraphDijkstra.addEventListener('click', () => {
      const currentMode = C().getMode();
      const showStatus = K().showStatus;
      if (currentMode !== 'graph-dijkstra') return;
      const src = parseInt(dom.graphSource.value);
      if (isNaN(src) || src < 0 || src > 4) return showStatus('Invalid source node.', '#f87171');
      K().executeAnimWrapper(async () => {
        if (edges.length === 0) return showStatus('Add edges first.', '#f87171');
        await runDijkstra(src);
        return '__KEEP_STATUS__';
      });
    });

    dom.btnGraphTopo.addEventListener('click', () => {
      const currentMode = C().getMode();
      const showStatus = K().showStatus;
      if (currentMode !== 'graph-topo') return;
      K().executeAnimWrapper(async () => {
        if (topoEdges.length === 0) return showStatus('Add directed edges first.', '#f87171');
        await runTopoSort();
        return '__KEEP_STATUS__';
      });
    });

    dom.btnGraphClear.addEventListener('click', () => {
      const showStatus = K().showStatus;
      edges = freshEdges();
      weightedEdges = freshWeightedEdges();
      mstEdgeKeys.clear();
      graphCandidateEdgeKey = null;
      dijkstraDistances.clear();
      dijkstraVisited.clear();
      shortestPathEdges.clear();
      topoOrder = [];
      topoVisited.clear();
      topoEdges = [];
      renderGraph();
      showStatus('Graph reset.', '#94a3b8');
    });
  }

  R().attach('graph', { render: renderGraph, code: () => codeGraph, layout: { host: 'dynamic' } });
  R().attach('graph-adjlist', { render: renderGraph, code: () => codeGraphAdjlist, layout: { host: 'dynamic' } });
  R().attach('graph-traversal', { render: renderGraphDual, code: () => codeGraphTraversal, layout: { host: 'dynamic' } });
  R().attach('graph-bfs', { render: renderGraph, code: () => codeGraphBFS, layout: { host: 'dynamic' } });
  R().attach('graph-dfs', { render: renderGraph, code: () => codeGraphDFS, layout: { host: 'dynamic' } });
  R().attach('graph-kruskal', { render: renderGraph, code: () => codeGraphKruskal, layout: { host: 'dynamic' } });
  R().attach('graph-dijkstra', { render: renderGraph, code: () => codeGraphDijkstra, layout: { host: 'dynamic' } });
  R().attach('graph-topo', { render: renderGraph, code: () => codeGraphTopo, layout: { host: 'dynamic' } });
  R().attach('graph-prim', { render: renderPrim, code: () => codeGraphPrim, layout: { host: 'dynamic' } });
  R().attach('graph-bellman-ford', { render: renderBellmanFord, code: () => codeGraphBellmanFord, layout: { host: 'dynamic' } });
  R().attach('graph-floyd-warshall', { render: renderFloydWarshall, code: () => codeGraphFloydWarshall, layout: { host: 'dynamic' } });
  C().registerDomain({ id: 'graph', init: init, onModeSwitch: onModeSwitch });
})(typeof window !== 'undefined' ? window : globalThis);
