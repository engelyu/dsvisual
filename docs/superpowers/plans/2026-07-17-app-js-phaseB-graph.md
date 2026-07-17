# app.js Stage 4 Phase B — Plan #2: graph domain

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Extract the graph domain (11 ids → 5 renderers) out of `js/app.js` into `js/domains/graph.js`, following the proven hash-domain template ([js/domains/hash.js](../../../js/domains/hash.js), recipe in [js/domains/README.md](../../../js/domains/README.md)). Zero behavior change; tests green each step.

**Architecture:** IIFE + globals, no bundler. `js/domains/graph.js` owns all graph state, its 5 renderers, its 3 animation functions, its helpers, and its 5 action handlers; self-registers its 11 renderer ids via `VizRegistry.attach` and itself via `VizCore.registerDomain({id:'graph', init, onModeSwitch})`.

## Global Constraints

- Follow the hash template exactly: `const K=()=>global.VizKit; const C=()=>global.VizCore; const R=()=>global.VizRegistry;`; `code:` BARE const; `currentMode`→`C().getMode()`; `showStatus`/`executeAnimWrapper`→`K().*`; `sleep` global; DOM via `init()` self-lookup.
- Zero behavior/styling/feature change; all suites green after every task.
- `updateLayout`'s graph container/action show-hide + the graph DOM consts it uses (`graphContainer`, `graphActions`, and the button/input consts referenced there) STAY in app.js. The domain looks up its own element references in `init()`.
- Load order: `js/core/registry.js` → `js/core/domains.js` → `js/code_db.js` → `js/domains/hash.js` → `js/domains/graph.js` → `js/app.js` (last).

## Graph inventory (verified against app.js)

- **ids → renderer** (all `layout:{host:'dynamic'}`): `graph`,`graph-adjlist`,`graph-bfs`,`graph-dfs`,`graph-kruskal`,`graph-dijkstra`,`graph-topo` → `renderGraph`; `graph-traversal` → `renderGraphDual`; `graph-prim` → `renderPrim`; `graph-bellman-ford` → `renderBellmanFord`; `graph-floyd-warshall` → `renderFloydWarshall`. Code consts: `codeGraph`, `codeGraphAdjlist`, `codeGraphBFS`, `codeGraphDFS`, `codeGraphKruskal`, `codeGraphDijkstra`, `codeGraphTopo`, `codeGraphTraversal`, `codeGraphPrim`, `codeGraphBellmanFord`, `codeGraphFloydWarshall`.
- **renderers:** `renderGraph` (~4030), `renderGraphDual` (~3437), `renderPrim` (~3806), `renderBellmanFord` (~3881), `renderFloydWarshall` (~3957).
- **animation fns:** `runKruskalMST` (~3375), `runDijkstra` (~4305), `runTopoSort` (~4354).
- **handlers:** `btnGraphAdd` (~1817), `btnGraphKruskal` (~1855), `btnGraphDijkstra` (~1863), `btnGraphTopo` (~1873), `btnGraphClear` (~1881).
- **helpers (graph-only):** `DEFAULT_EDGES` (1435), `DEFAULT_WEIGHTED_EDGES` (1436), `freshEdges` (1440), `freshWeightedEdges` (1441), `edgeKey` (3371).
- **state:** `edges`, `weightedEdges` (1442); `mstEdgeKeys`, `graphCandidateEdgeKey` (1443); `dijkstraDistances`, `dijkstraVisited`, `shortestPathEdges` (1444); `topoOrder`, `topoVisited`, `topoEdges` (on shared line 1445).

---

### Task 1: Extract the graph domain (atomic flip)

**Files:** create `js/domains/graph.js`; modify `js/app.js`, `index.html`.

- [ ] **Step 1: Create `js/domains/graph.js`**

IIFE per the hash template. Move VERBATIM into the module (with the standard substitutions `currentMode`→`C().getMode()`, `showStatus`→`K().showStatus`, `executeAnimWrapper`→`K().executeAnimWrapper`, containers→`dom.*` from `init()`; `sleep` and `document.getElementById('graph-edges')`/node-id lookups stay):
- state: `edges`, `weightedEdges`, `mstEdgeKeys`, `graphCandidateEdgeKey`, `dijkstraDistances`, `dijkstraVisited`, `shortestPathEdges`, `topoOrder`, `topoVisited`, `topoEdges` (as module `let`s).
- helpers: `DEFAULT_EDGES`, `DEFAULT_WEIGHTED_EDGES`, `freshEdges`, `freshWeightedEdges`, `edgeKey`.
- renderers: `renderGraph`, `renderGraphDual`, `renderPrim`, `renderBellmanFord`, `renderFloydWarshall`.
- animation fns: `runKruskalMST`, `runDijkstra`, `runTopoSort`.
- `onModeSwitch(mode)`: reset the graph state to defaults — `edges = freshEdges(); weightedEdges = freshWeightedEdges(); mstEdgeKeys.clear(); graphCandidateEdgeKey = null;` (this is exactly the graph portion of app.js's `switchMode` reset line 1785). Note: the per-mode clears currently done in handlers (dijkstra/topo) stay in those handlers; `onModeSwitch` only needs the base graph reset that line 1785 did for every switch.
- `init()`: self-look-up the graph DOM (`graph-u/v/w`, `btn-graph-add`, `btn-graph-kruskal`, `btn-graph-dijkstra`, `btn-graph-topo`, `btn-graph-clear`, `graph-source`, `graph-target`) and wire the 5 handlers, moving their bodies VERBATIM (with substitutions). Handlers call the module's own `render*`/`run*` and `K().executeAnimWrapper`.
- Register: `R().attach(id, { render, code: () => <bareConst>, layout: { host: 'dynamic' } })` for all 11 ids (mapping above); then `C().registerDomain({ id: 'graph', init, onModeSwitch })`.

- [ ] **Step 2: Remove graph bits from app.js (surgical)**

- Delete the 5 renderers, 3 animation fns, 5 handlers, and the 5 helpers (`DEFAULT_EDGES`/`DEFAULT_WEIGHTED_EDGES`/`freshEdges`/`freshWeightedEdges`/`edgeKey`).
- Delete graph state decls: line 1442 (`edges`/`weightedEdges`) and 1443 (`mstEdgeKeys`/`graphCandidateEdgeKey`) and 1444 (`dijkstra*`/`shortestPathEdges`) entirely. **Line 1445 is SHARED** — remove ONLY `topoOrder`, `topoVisited`, `topoEdges`; KEEP `bstRoot`, `mainListData`, `sortArrData` (other domains).
- **`switchMode` line 1785 is SHARED** — remove ONLY the graph portion (`edges = freshEdges(); weightedEdges = freshWeightedEdges(); mstEdgeKeys.clear(); graphCandidateEdgeKey = null;`); KEEP `stackData = []; qArr = ...; qFront/qRear/qCount; bstRoot = null;`. (Graph reset now runs via the domain's `onModeSwitch`, invoked by the existing `domains().forEach` in switchMode.)
- Delete the 11 `reg('graph...', ...)` lines in `registerBehaviors`.
- Delete the graph arms in `renderAll` (lines ~2757-2761: the `graph-traversal`→renderGraphDual, the big graph||... →renderGraph, graph-prim, graph-bellman-ford, graph-floyd-warshall arms).
- KEEP: `graphContainer`, `graphActions`, and any graph button/input consts still referenced by `updateLayout` (grep each; a const only used by the now-moved handlers should be removed, one still used by updateLayout stays). `updateLayout`'s graph show/hide block stays.

After removal: `grep -nE "renderGraph\b|renderGraphDual|renderPrim|renderBellmanFord|renderFloydWarshall|runKruskalMST|runDijkstra|runTopoSort|freshEdges|edgeKey|weightedEdges|mstEdgeKeys|dijkstraDistances|topoOrder" js/app.js` must be 0 (except inside `updateLayout`/DOM-const lines that legitimately stay — verify each remaining hit is a container/action show-hide, not graph logic).

- [ ] **Step 3: Load the module** — in index.html add `<script src="js/domains/graph.js" defer></script>` after `js/domains/hash.js`, before `js/app.js`.

- [ ] **Step 4: Verify (report commands + output)**
- `node -c js/app.js && node -c js/domains/graph.js`; grep-clean confirmation.
- FULL `npx playwright test` + `node --test tests/unit/*.test.js` — all pass.
- Headless scripted check (or clearly state coverage): for each of `graph` (add edge), `graph-kruskal` (run MST), `graph-dijkstra` (shortest path), `graph-topo` (topo sort), `graph-prim`, `graph-bellman-ford`, `graph-floyd-warshall`, `graph-bfs`, `graph-dfs`, `graph-traversal` (dual), `graph-adjlist` — load the mode, confirm it renders with no console errors; add an edge and reset; confirm switching modes resets the graph.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "refactor: extract graph domain to js/domains/graph.js"`

---

### Task 2: Verify + record

- [ ] **Step 1:** `npm run test:all` — all pass; report counts + `wc -l js/app.js`.
- [ ] **Step 2:** Confirm the seam: all 11 graph ids resolve via registry; `switchMode` graph reset flows via `onModeSwitch`; handlers wired via `init()`; no graph logic left in app.js beyond the shell (`updateLayout` show-hide + DOM consts). Report any graph const/reference intentionally kept and why.
- [ ] **Step 3:** Update `js/domains/README.md`'s "remaining domains" list to mark graph done. Commit if changed.

---

## Self-Review

- **Spec coverage:** graph domain from the Phase B design's domain map → Task 1; verify → Task 2. Follows the merged hash template + README recipe.
- **Placeholder scan:** the large renderer/run/handler bodies are "move verbatim with the listed substitutions" (proven approach); every state var, helper, id→renderer mapping, and surgical line-split is spelled out.
- **Consistency:** `K()/C()/R()`, bare code consts, `onModeSwitch`, `init()` self-lookup, atomic flip (register + remove together) — matches hash.
- **Risk (highest points, called out):** (1) the two SHARED lines (decl 1445, switchMode 1785) must be split, not deleted — bstRoot/mainListData/sortArrData/stackData/qArr belong to other domains and must remain. (2) 11 ids across 5 renderers — every id must attach exactly once and map to the same renderer `renderAll` used. (3) graph helpers (`freshEdges` etc.) are graph-only (8 uses, all graph) — safe to move wholesale. Verified via grep before writing this plan.
