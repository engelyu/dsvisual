# Stateful domain modules — recipe

`js/domains/hash.js` is the reference implementation of the Phase B pattern for
pulling one visualizer domain's state, renderers, and animation handlers out
of `js/app.js` into a standalone script. This doc captures the recipe so
linear/graph/tree/heap can follow the same shape without re-deriving it.

## The seam (already built in Phase B Task 1, do not touch)

Three small globals, attached by `js/core/registry.js` and `js/core/domains.js`
(loaded before any domain module), plus `window.VizKit` (built inline in
`app.js`, after `visualizerRuntime` is constructed):

- **`window.VizRegistry`** — `{ attach(id, {render, code, layout}), behavior(id), has(id) }`.
  `attach` partial-merges, so a domain module can register just `render`/`code`
  for an id. `app.js`'s `renderAll()` calls `VizRegistry.behavior(currentMode)`
  first and returns early if a domain owns that mode's render.
- **`window.VizCore`** — `{ registerDomain(d), domains(), bindMode(getter, setter), getMode(), setMode(m) }`.
  `app.js` calls `bindMode(() => currentMode, m => { currentMode = m; })` once,
  then `domains().forEach(d => d.init())` at startup, and
  `domains().forEach(d => d.onModeSwitch(currentMode))` inside `switchMode()`.
  A domain module never touches `currentMode` directly — always through
  `C().getMode()`.
- **`window.VizKit`** — grab-bag of app.js primitives a domain module needs:
  `acquireDynamicVizHost`, `buildStepControls`, `getInputDifficulty`,
  `langOf(m)`, `t(key, vars)`, `showStatus(msg, color)`,
  `executeAnimWrapper(fn)` (runs `fn` under the shared animation
  start/stop/pause state machine used by the Run/Pause/Step controls).
- **`sleep(ms)`** is a bare global (defined at the top of `app.js`, outside
  any function scope) — animation code awaits it directly, no accessor needed.

Domain modules are loaded as separate `<script defer>` tags in `index.html`,
**after** `js/core/registry.js`, `js/core/domains.js`, and `js/code_db.js`
(for the `code*` string constants), but **before** `js/app.js` (so
`registerDomain`/`attach` calls land before `app.js` reads `VizCore.domains()`
at startup):

```html
<script src="js/core/registry.js" defer></script>
<script src="js/core/domains.js" defer></script>
<script src="js/code_db.js" defer></script>
<script src="js/domains/hash.js" defer></script>
<script src="js/domains/<yours>.js" defer></script>
<!-- ... -->
<script src="js/app.js" defer></script>
```

Load order matters for `defer` scripts because they execute in document
order, not registration order — a domain module that runs before
`domains.js` would throw on `global.VizCore` being undefined.

## Module shape (copy `js/domains/hash.js`)

```js
(function (global) {
  const K = () => global.VizKit;
  const C = () => global.VizCore;
  const R = () => global.VizRegistry;

  // Own state — module-level `let`s, one per structure/mode variant this
  // domain owns. These replace the same-named `let`s that lived in app.js.
  let fooData = /* initial value */;

  // Animation handler(s) — call via K().executeAnimWrapper from a click
  // listener wired in init(). Read the active mode via C().getMode(),
  // never a captured `currentMode`.
  async function runFooInsert(val) {
    const currentMode = C().getMode();
    const showStatus = K().showStatus;
    // ...await sleep(...), mutate fooData, call renderFoo(), showStatus(...)
  }

  // Renderer(s) — dispatch on C().getMode() when one render function
  // serves multiple mode ids (as hash.js's renderHashes does for
  // hash-chain/hash-open/hash-bucket).
  function renderFoo() {
    const currentMode = C().getMode();
    // ...
  }

  // Called by app.js's switchMode() for every registered domain, every
  // mode switch — reset only the state slice(s) relevant to `mode`.
  function onModeSwitch(mode) {
    if (mode === 'foo-a') fooData = /* reset */;
  }

  // Called once at startup (after VizKit/VizCore/VizRegistry exist).
  // Self-look-up DOM (don't accept it as a constructor arg — there is no
  // constructor, the module is a singleton IIFE), wire click handlers.
  let dom = null;
  function init() {
    dom = {
      fooContainer: document.getElementById('foo-container'),
      btnFooAdd: document.getElementById('btn-foo-add'),
    };
    dom.btnFooAdd.addEventListener('click', () => {
      const val = parseInt(dom.fooVal.value);
      if (isNaN(val)) return K().showStatus('Enter valid number.', '#f87171');
      K().executeAnimWrapper(async () => await runFooInsert(val));
    });
  }

  // Registration — one R().attach per mode id this domain owns (`render`
  // and `code` are required; `layout` is usually null for stateful domains
  // with dedicated DOM containers (like hash-open), or `{ host: 'dynamic' }`
  // for dynamic-host viz), then one registerDomain call for the whole module.
  R().attach('foo-a', { render: renderFoo, code: () => codeFooA, layout: null });
  R().attach('foo-b', { render: renderFoo, code: () => codeFooB, layout: null });
  C().registerDomain({ id: 'foo', init: init, onModeSwitch: onModeSwitch });
})(typeof window !== 'undefined' ? window : globalThis);
```

Notes from the hash migration:
- `code*` string constants (e.g. `codeHashChain`) stay in `js/code_db.js` —
  they're shared catalog data, not domain logic, and the mode-metadata table
  in `app.js` (`{ id: 'hash-chain', file: ..., visualizer: 'hash', ... }`)
  also stays put; it's nav config, not state.
- Everything inside the module is private except what `R().attach` and
  `C().registerDomain` expose. No new globals beyond the one IIFE.

## app.js changes when migrating a domain

For each mode id the domain owns, **remove** from `app.js`:
1. The module-level state `let`(s) for that domain (moved into the new file).
2. The renderer function(s) and animation/handler function(s) (moved into
   the new file, verbatim body + the substitutions below).
3. The click-listener wiring for that domain's buttons (moved into the new
   file's `init()`).
4. The `reg(...)` line(s) in `registerBehaviors()` for those mode ids (the
   domain module's own `R().attach(...)` calls replace them — don't double
   register).
5. The domain's reset line(s) inside `switchMode()` (moved into the new
   file's `onModeSwitch(mode)` — the generic
   `VizCore.domains().forEach(d => d.onModeSwitch(currentMode))` call in
   `switchMode()` already fires for every registered domain, so nothing new
   needs to be added to `switchMode()` itself).

**Keep** in `app.js` (the "shell"):
- The container/action DOM element consts (e.g. `hashChContainer`,
  `hashActions` — `document.getElementById(...)` results used only for
  show/hide, listed in the `containers`/`actions` arrays near
  `updateLayout()`).
- The `updateLayout()` show/hide branch for the domain's modes (e.g.
  `else if (currentMode.includes('hash-')) { hashActions.classList.remove('hidden'); ... }`)
  — this also sets `codeTitle`/`codeDisplay` for the side code panel, which
  is shell UI, not domain render logic.
- Substitutions to make when moving a verbatim function body: replace bare
  `currentMode` reads with `C().getMode()`, replace calls to `showStatus`/
  `executeAnimWrapper`/etc. with `K().showStatus`/`K().executeAnimWrapper`/etc.,
  and replace direct DOM lookups the function used to close over with reads
  from the module's own `dom` object (populated in `init()`).

## Verifying a migration

- `npm run test:all` (unit + Playwright) must stay green — no test should
  need to change; the seam is behavior-preserving by construction.
- Grep `app.js` for the domain's mode ids / state var names / handler names
  after the edit — the only hits left should be: mode-metadata table
  entries, `code*` constant name references, and the shell bits listed
  above (container consts + `updateLayout` show/hide branch). Any renderer,
  handler, state `let`, or `reg(...)` line still present means the migration
  is incomplete.

## Migrated domains

- **hash** — `js/domains/hash.js` (reference implementation, Phase B Task 1).
- **graph** — `js/domains/graph.js` (graph, graph-adjlist, graph-traversal,
  graph-bfs, graph-dfs, graph-kruskal, graph-dijkstra, graph-topo,
  graph-prim, graph-bellman-ford, graph-floyd-warshall). DONE — verified via
  `npm run test:all` (286 unit + 207 Playwright, all green) and a grep of
  `app.js` for graph render/handler/state names, all clean.

## Remaining domains to migrate

Each of these is a separate future plan; the state slices below are what a
Task-2-equivalent PR for that domain needs to lift out of `app.js` (current
line numbers, so re-check before relying on them — they will have shifted
once earlier domains are migrated):

### linear (stack-array, stack-list, queue, deque, list-array, list-linked)
- State: `stackData`, `qArr`/`qFront`/`qRear`/`qCount`, `mainListData`.
  Deque is the odd one out — it currently stashes `_dequeData` on the
  runtime host DOM node inside `renderDeque()` rather than a module `let`;
  decide during migration whether to normalize it to a module `let` (and
  whether it should gain a mode-switch reset, since today it doesn't).
- Renderers: `renderStack`, `renderQueue`, `renderLists`, `renderDeque`.
- Handlers: push/pop/enqueue/dequeue/list-insert/list-remove are inlined in
  click listeners rather than named `runXxx` functions — will need to be
  extracted into named functions as part of the move.
- Existing reset in `switchMode`: `stackData = []; qArr = new Array(5).fill(null); qFront = 0; qRear = -1; qCount = 0;`
  and `if (currentMode === 'list-array' || currentMode === 'list-linked') mainListData = [];`

### tree (tree-bst, tree-avl, tree-splay, tree-trie, tree-radix, tree-ternary, tree-btree, tree-bplus, tree-rb)
- State: `bstRoot`, `trieRoot`, `radixRoot`, `tstRoot`, `btreeData`,
  `bplusData`, `_rbState`, `treeDrawLoop`.
- Renderers: `renderTree`, `renderAdvTrees`, `renderTreeRB`.
- Handlers: insert/search inlined in click listeners calling algorithm
  functions that already live in `js/algos/tree_algos.js` /
  `js/tree_traversal_viz.js` (those stay put — only the app.js-side glue
  moves); `drawTreeEdgesContinually` (rAF loop reading `bstRoot`).
- Existing reset in `switchMode`: `bstRoot = null;` and
  `trieRoot = { children: {}, endOfWord: false }; radixRoot = { edges: {} }; tstRoot = null; btreeData = []; bplusData = [];`
  Note tree-rb is special-cased separately at the top of `switchMode`
  (`if (_rbState) _rbState.hist.pause();`) rather than reset — `_rbState`
  itself is not cleared, only paused; treat tree-rb's `onModeSwitch` as
  needing to preserve that pause-not-clear behavior.

### heap (heap-binary, heap-binomial, heap-fibonacci, heap-leftist, heap-skew, heap-dary, heap-pairing)
- State: `heapIsMin`, `heapModels` (map of mode id → `HeapModels.createHeapModel(...)`),
  `heapTutorialState`, `heapEventTimer`.
- Renderer: `renderHeap` (largest renderer besides `renderGraph`, ~465 lines).
- Handlers: `animateHeapEvents`, `clearHeapEventMarks`, `getActiveHeapModel`,
  `resetHeapModels`, `setHeapComparator`, the heap-tutorial family
  (`buildHeapTutorial`/`startHeapTutorial`/`exitHeapTutorial`/
  `advanceHeapTutorial`/`maybeAdvanceHeapTutorial`/`syncHeapTutorialChrome`/
  `renderHeapTutorialPanel`, ~155 lines together), plus inlined button
  listeners for insert/peek/extract/merge/change/delete/find-min/stats.
- Existing reset in `switchMode`:
  ```
  if (heapTutorialState.active && nextMode !== heapTutorialState.mode) exitHeapTutorial(true);
  ...
  if(currentMode.includes('heap-')) {
      heapOrderSelect.value = heapIsMin ? 'min' : 'max';
      clearHeapEventMarks();
      heapModels[currentMode].clear();
      heapModels[currentMode].setOrder(heapIsMin);
  }
  ```
  This is the largest and most stateful of the four remaining domains —
  plan for a dedicated `heapOrderSelect` DOM ref inside the module's own
  `dom` object and for the tutorial state machine to move as a unit.
