# Tier-2 Batch E3: Threaded Binary Tree + m-way Search Tree — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two dsvisual tree visualizations — `tree-threaded` (inorder-threaded binary tree) and `tree-mway` (m-way search tree) — in the `trees` group, each with Step/Run/Reset (inherits Pause/Resume + speed), bilingual UI + slides, and tests.

**Architecture:** Pure frame-generators in `js/tree_threaded_viz.js` / `js/tree_mway_viz.js` (dual-export, like `js/heap_models.js`), unit-tested under `node --test`. DOM renderers (`renderTreeThreaded`, `renderTreeMway`) in `js/app.js` using `acquireDynamicVizHost()` + `buildStepControls()`. `tree-threaded` reuses `computeTreeLayout()` + `.tree-node` (node-drawing rules: translate-centered, edges at (x,y), `overflow:hidden`) plus dashed thread edges; `tree-mway` uses a custom multi-key box layout (NOT `.tree-node` circles).

**Tech Stack:** Vanilla JS (IIFE modules + browser globals), Node test runner, Playwright, Marp slides.

**Spec:** `docs/superpowers/specs/2026-06-09-tier2-visualizations-design.md` (§3.5 tree-threaded, §3.6 tree-mway).

---

## File Structure
- `js/tree_threaded_viz.js`, `js/tree_mway_viz.js` (new pure modules)
- `cpp/tree_threaded.cpp`, `cpp/tree_mway.cpp` (new C++ refs)
- `tests/unit/tree_threaded_viz.test.js`, `tests/unit/tree_mway_viz.test.js` (new)
- `tests/tree_threaded.spec.js`, `tests/tree_mway.spec.js` (new E2E)
- modify: `js/app.js`, `build_db.js`, `js/i18n.js`, `js/desc_db.js`, `slides_db.js`, `index.html`, `style.css`
- regenerated: `js/code_db.js`, `js/slides_rendered.js` (+ slides md)

---

## Task 1: Feature branch + threaded-tree pure module (TDD)

**Files:** Create `js/tree_threaded_viz.js`, `tests/unit/tree_threaded_viz.test.js`.

- [ ] **Step 1: Branch**
```bash
cd /Users/skhuang/course/dsvisual
git checkout main && git pull --ff-only
git checkout -b feat/tier2-batch-e3
git branch --show-current
```
Expected: `feat/tier2-batch-e3`.

- [ ] **Step 2: Write the failing unit test**

Create `tests/unit/tree_threaded_viz.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { buildTreeFromValues, buildThreadedFrames, SAMPLE } = require('../../js/tree_threaded_viz');

test('inorder traversal equals the sorted keys', () => {
  const tree = buildTreeFromValues(SAMPLE);
  const { inorder } = buildThreadedFrames(tree);
  assert.deepEqual(inorder, [...SAMPLE].sort((a, b) => a - b));
});

test('threads link each null-right node to its inorder successor', () => {
  const tree = buildTreeFromValues(SAMPLE); // BST of [50,30,70,20,40,60,80]
  const { threads } = buildThreadedFrames(tree);
  const pairs = new Set(threads.map((t) => t.fromVal + '->' + t.toVal));
  // 20→30, 40→50, 60→70 (80 is the max: null right, no successor → no thread)
  assert.equal(threads.length, 3);
  for (const p of ['20->30', '40->50', '60->70']) assert.ok(pairs.has(p), 'missing ' + p);
});

test('frames cover every node and carry bilingual msg', () => {
  const { frames } = buildThreadedFrames(buildTreeFromValues(SAMPLE));
  const last = frames[frames.length - 1];
  for (const f of frames) assert.ok(f.msg.zh && f.msg.en);
  // the penultimate frame has all nodes visited
  const visitedMax = Math.max(...frames.map((f) => f.visited.length));
  assert.equal(visitedMax, SAMPLE.length);
});
```

- [ ] **Step 3: Run — expect FAIL**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/tree_threaded_viz.test.js`
Expected: FAIL — `Cannot find module '../../js/tree_threaded_viz'`.

- [ ] **Step 4: Implement `js/tree_threaded_viz.js`**

Create `js/tree_threaded_viz.js`:
```js
(function (global) {
  function makeNode(val) { return { val: val, left: null, right: null, id: 'th-' + val }; }
  function insert(root, val) {
    if (!root) return makeNode(val);
    if (val < root.val) root.left = insert(root.left, val);
    else if (val > root.val) root.right = insert(root.right, val);
    return root;
  }
  function buildTreeFromValues(vals) { let r = null; for (const v of vals) r = insert(r, v); return r; }
  const SAMPLE = [50, 30, 70, 20, 40, 60, 80];

  function inorderNodes(root) {
    const out = [];
    (function rec(n) { if (!n) return; rec(n.left); out.push(n); rec(n.right); })(root);
    return out;
  }

  function buildThreadedFrames(root) {
    const order = inorderNodes(root);
    const inorder = order.map((n) => n.val);
    const threads = [];
    for (let i = 0; i < order.length; i++) {
      if (!order[i].right && i + 1 < order.length) {
        threads.push({ fromId: order[i].id, toId: order[i + 1].id, fromVal: order[i].val, toVal: order[i + 1].val });
      }
    }
    const frames = [];
    const visited = [];
    const snap = (current, usingThread, msg) => frames.push({
      current, threads: threads.map((t) => ({ fromId: t.fromId, toId: t.toId })),
      visited: visited.slice(), usingThread, msg
    });
    snap(null, false, { zh: '建立引線:右指標為空者指向中序後繼', en: 'Build threads: each null-right node points to its inorder successor' });
    for (let i = 0; i < order.length; i++) {
      visited.push(order[i].val);
      const usingThread = i > 0 && !order[i - 1].right;
      snap(order[i].id, usingThread, usingThread
        ? { zh: '沿引線到達後繼 ' + order[i].val, en: 'Follow thread to successor ' + order[i].val }
        : { zh: '造訪 ' + order[i].val + '(往右子樹最左)', en: 'Visit ' + order[i].val + ' (go to right-subtree leftmost)' });
    }
    snap(null, false, { zh: '中序走訪完成(未使用堆疊)', en: 'Inorder traversal done (no stack used)' });
    return { frames, inorder, threads };
  }

  const api = { makeNode, insert, buildTreeFromValues, inorderNodes, buildThreadedFrames, SAMPLE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ThreadedViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 5: Run — expect PASS**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/tree_threaded_viz.test.js`
Expected: PASS — 3 tests (`# pass 3`, `# fail 0`). If the threads test fails, STOP and report the actual thread pairs.

- [ ] **Step 6: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/tree_threaded_viz.js tests/unit/tree_threaded_viz.test.js
git commit -m "feat(viz): threaded binary tree pure frame generator + unit tests"
```

---

## Task 2: m-way search tree pure module (TDD)

**Files:** Create `js/tree_mway_viz.js`, `tests/unit/tree_mway_viz.test.js`.

- [ ] **Step 1: Write the failing unit test**

Create `tests/unit/tree_mway_viz.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { buildMwayFrames } = require('../../js/tree_mway_viz');

function flatten(n, out) {
  if (!n) return out;
  for (let i = 0; i < n.keys.length; i++) { flatten(n.children[i], out); out.push(n.keys[i]); }
  flatten(n.children[n.keys.length], out);
  return out;
}
function eachNode(n, fn) { if (!n) return; fn(n); n.children.forEach((c) => eachNode(c, fn)); }

const KEYS = [50, 30, 70, 20, 40, 60, 80, 10, 25];

test('in-order flatten equals the sorted unique keys (m=3)', () => {
  const { tree } = buildMwayFrames(KEYS, 3);
  assert.deepEqual(flatten(tree, []), [...new Set(KEYS)].sort((a, b) => a - b));
});

test('every node respects m-way invariants (m=3)', () => {
  const { tree } = buildMwayFrames(KEYS, 3);
  eachNode(tree, (n) => {
    assert.ok(n.keys.length <= 3 - 1, 'too many keys: ' + n.keys.join(','));
    assert.equal(n.children.length, n.keys.length + 1, 'children must be keys+1');
    for (let i = 1; i < n.keys.length; i++) assert.ok(n.keys[i - 1] < n.keys[i], 'keys must be sorted');
  });
});

test('m=4 also holds invariants and full flatten', () => {
  const { tree } = buildMwayFrames(KEYS, 4);
  assert.deepEqual(flatten(tree, []), [...new Set(KEYS)].sort((a, b) => a - b));
  eachNode(tree, (n) => assert.ok(n.keys.length <= 4 - 1));
});

test('frames carry a tree snapshot, descendPath, and bilingual msg', () => {
  const { frames } = buildMwayFrames(KEYS, 3);
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); assert.ok(Array.isArray(f.descendPath)); }
  assert.ok(frames.some((f) => f.tree));
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/tree_mway_viz.test.js`
Expected: FAIL — `Cannot find module '../../js/tree_mway_viz'`.

- [ ] **Step 3: Implement `js/tree_mway_viz.js`**

Create `js/tree_mway_viz.js`:
```js
(function (global) {
  function buildMwayFrames(keys, m) {
    let idc = 0;
    const newNode = (k) => ({ id: 'mw-' + (idc++), keys: [k], children: [null, null] });
    const clone = (n) => n ? { id: n.id, keys: n.keys.slice(), children: n.children.map(clone) } : null;
    let root = null;
    const frames = [];
    const snap = (current, key, path, msg) => frames.push({ tree: clone(root), current, insertedKey: key, descendPath: path.slice(), msg });

    snap(null, null, [], { zh: '空的 m-way 搜尋樹(m = ' + m + ')', en: 'Empty m-way search tree (m = ' + m + ')' });
    for (const key of keys) {
      if (!root) { root = newNode(key); snap(root.id, key, [root.id], { zh: '建立根節點,放入 ' + key, en: 'Create root holding ' + key }); continue; }
      let p = root; const path = [];
      while (true) {
        path.push(p.id);
        let i = 0;
        while (i < p.keys.length && key > p.keys[i]) i++;
        if (i < p.keys.length && p.keys[i] === key) { snap(p.id, key, path, { zh: key + ' 已存在,略過', en: key + ' already present; skip' }); break; }
        if (p.children[i] === null) {
          if (p.keys.length < m - 1) {
            p.keys.splice(i, 0, key); p.children.splice(i, 0, null);
            snap(p.id, key, path, { zh: '節點未滿,於位置 ' + i + ' 插入 ' + key, en: 'Node has room; insert ' + key + ' at slot ' + i });
          } else {
            p.children[i] = newNode(key); path.push(p.children[i].id);
            snap(p.children[i].id, key, path, { zh: '節點已滿,新建子節點放 ' + key, en: 'Node full; create child holding ' + key });
          }
          break;
        }
        p = p.children[i];
      }
    }
    return { frames, tree: root };
  }

  const api = { buildMwayFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.MwayViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run — expect PASS**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/tree_mway_viz.test.js`
Expected: PASS — 4 tests (`# pass 4`, `# fail 0`).

- [ ] **Step 5: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/tree_mway_viz.js tests/unit/tree_mway_viz.test.js
git commit -m "feat(viz): m-way search tree pure frame generator + unit tests"
```

---

## Task 3: C++ references + code_db regeneration

**Files:** Create `cpp/tree_threaded.cpp`, `cpp/tree_mway.cpp`; modify `build_db.js`; regenerate `js/code_db.js`.

- [ ] **Step 1: Create `cpp/tree_threaded.cpp`**
```cpp
#include <iostream>

// Right-threaded binary tree: a node's null right pointer becomes a thread to
// its inorder successor, enabling stack-free inorder traversal.
struct Node {
    int val;
    Node* left = nullptr;
    Node* right = nullptr;   // child or thread
    bool rightThread = false;
};

void inorderThreaded(Node* root) {
    Node* cur = root;
    while (cur && cur->left) cur = cur->left;       // leftmost
    while (cur) {
        std::cout << cur->val << ' ';
        if (cur->rightThread) {
            cur = cur->right;                       // follow thread to successor
        } else {
            cur = cur->right;                       // go right...
            while (cur && cur->left) cur = cur->left; // ...then leftmost
        }
    }
}
```

- [ ] **Step 2: Create `cpp/tree_mway.cpp`**
```cpp
#include <vector>
#include <algorithm>

// m-way search tree (unbalanced): each node holds up to m-1 sorted keys and
// up to m children. Insertion descends; fills a non-full node or creates a
// new child where the search falls off.
struct MwayNode {
    std::vector<int> keys;
    std::vector<MwayNode*> children; // size keys.size()+1
};

MwayNode* makeLeaf(int k) {
    MwayNode* n = new MwayNode();
    n->keys.push_back(k);
    n->children.assign(2, nullptr);
    return n;
}

MwayNode* insert(MwayNode* root, int key, int m) {
    if (!root) return makeLeaf(key);
    MwayNode* p = root;
    while (true) {
        int i = 0;
        while (i < (int)p->keys.size() && key > p->keys[i]) i++;
        if (i < (int)p->keys.size() && p->keys[i] == key) return root; // duplicate
        if (p->children[i] == nullptr) {
            if ((int)p->keys.size() < m - 1) {
                p->keys.insert(p->keys.begin() + i, key);
                p->children.insert(p->children.begin() + i, nullptr);
            } else {
                p->children[i] = makeLeaf(key);
            }
            return root;
        }
        p = p->children[i];
    }
}
```

- [ ] **Step 3: Register in `build_db.js`**

In `build_db.js` `mappings`, add:
```js
    'tree_threaded.cpp': 'codeTreeThreaded',
    'tree_mway.cpp': 'codeTreeMway',
```

- [ ] **Step 4: Regenerate + verify**
```bash
cd /Users/skhuang/course/dsvisual
node build_db.js
grep -c 'const codeTreeThreaded' js/code_db.js
grep -c 'const codeTreeMway' js/code_db.js
```
Expected: build no error; both counts `1`.

- [ ] **Step 5: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add cpp/tree_threaded.cpp cpp/tree_mway.cpp build_db.js js/code_db.js
git commit -m "feat(viz): C++ refs for threaded & m-way trees; regen code_db"
```

---

## Task 4: app.js registration + index.html

**Files:** Modify `js/app.js`, `index.html`.

- [ ] **Step 1: Register methods in METHOD_GROUPS**

In `js/app.js`, in the `trees` group's `methods` array, after the `tree-obst` entry (`{ id: 'tree-obst', ... }`) add:
```js
            { id: 'tree-threaded', title: 'Threaded Binary Tree', file: 'tree_threaded.cpp', visualizer: 'threaded', controls: 'threaded' },
            { id: 'tree-mway', title: 'm-way Search Tree', file: 'tree_mway.cpp', visualizer: 'mway', controls: 'mway' },
```

- [ ] **Step 2: code lookup in getCodeForMethod()**

In `js/app.js` `codeByMethod`, add:
```js
        'tree-threaded': codeTreeThreaded,
        'tree-mway': codeTreeMway,
```

- [ ] **Step 3: updateLayout() branches**

After the existing `else if (currentMode === 'tree-obst') { ... }` block, add:
```js
        else if (currentMode === 'tree-threaded') {
            codeTitle.textContent = 'tree_threaded.cpp';
            codeDisplay.textContent = codeTreeThreaded;
        }
        else if (currentMode === 'tree-mway') {
            codeTitle.textContent = 'tree_mway.cpp';
            codeDisplay.textContent = codeTreeMway;
        }
```

- [ ] **Step 4: renderAll() dispatch**

In `js/app.js` `renderAll()`, find `else if (currentMode === 'tree-obst') renderTreeObst();` and add immediately AFTER it:
```js
        else if (currentMode === 'tree-threaded') renderTreeThreaded();
        else if (currentMode === 'tree-mway') renderTreeMway();
```
(`renderAll`'s tree branches use exact-id `.includes([...])` arrays, not a `tree`-substring catch-all, so exact `===` here is safe. Verify in Step 7.)

- [ ] **Step 5: stubs**

Before `function renderSegmentTree()`, add:
```js
    function renderTreeThreaded() { const host = acquireDynamicVizHost(); host.textContent = 'tree-threaded (pending)'; }
    function renderTreeMway() { const host = acquireDynamicVizHost(); host.textContent = 'tree-mway (pending)'; }
```

- [ ] **Step 6: index.html — load modules**

After `<script src="js/search_interpolation_viz.js"></script>`, add:
```html
    <script src="js/tree_threaded_viz.js"></script>
    <script src="js/tree_mway_viz.js"></script>
```

- [ ] **Step 7: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/app.js && echo "app.js OK"
node -e "require('./js/tree_threaded_viz.js'); require('./js/tree_mway_viz.js'); console.log('modules load OK')"
grep -c "id: 'tree-threaded'" js/app.js
grep -c "id: 'tree-mway'" js/app.js
grep -c "function renderTreeThreaded" js/app.js
grep -c "function renderTreeMway" js/app.js
grep -c 'tree_threaded_viz.js' index.html
grep -c 'tree_mway_viz.js' index.html
# Confirm no generic tree-substring catch-all would shadow these:
grep -c "includes('tree')" js/app.js
```
Expected: `app.js OK`, `modules load OK`, six `1`s, and the last grep `0` (no `includes('tree')` substring catch-all). If `node -c` fails, STOP/BLOCKED.

- [ ] **Step 8: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js index.html
git commit -m "feat(viz): register tree-threaded & tree-mway; load modules"
```

---

## Task 5: `renderTreeThreaded()` + CSS

**Files:** Modify `js/app.js` (replace stub), `style.css`.

- [ ] **Step 1: Replace the `renderTreeThreaded` stub**

In `js/app.js`, replace the `renderTreeThreaded` stub line with:
```js
    let _threadedState = null;
    function renderTreeThreaded() {
        const host = acquireDynamicVizHost();
        if (!_threadedState) _threadedState = { vals: ThreadedViz.SAMPLE.slice() };
        const st = _threadedState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const root = ThreadedViz.buildTreeFromValues(st.vals);
        const res = ThreadedViz.buildThreadedFrames(root);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="th-controls"><input type="text" class="th-input" value="' + st.vals.join(',') + '"><button type="button" class="th-build">Build</button>' +
            '<span class="sm-hint">values build a BST; dashed = inorder thread</span></div>' +
            '<div class="th-stage"><svg class="th-edges"></svg><div class="th-nodes"></div></div>' +
            '<div class="th-output"><strong>Inorder:</strong> <span class="th-seq"></span></div>' +
            '<div class="th-phase"></div>';

        const meta = [];
        computeTreeLayout(root, 200, 30, 90, meta);
        const byId = {}; meta.forEach((m) => { byId[m.id] = m; });
        const nodesEl = host.querySelector('.th-nodes');

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.th-edges')) return;
            const edgesEl = host.querySelector('.th-edges');
            // solid child edges
            let svg = '';
            (function walk(n) { if (!n) return; [n.left, n.right].forEach((c) => { if (!c) return; const a = byId[n.id], b = byId[c.id]; svg += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="#94a3b8" stroke-width="2"/>'; walk(c); }); })(root);
            // dashed thread edges (curved upward arc approximated by a quadratic path)
            (fr.threads || []).forEach((t) => {
                const a = byId[t.fromId], b = byId[t.toId];
                if (!a || !b) return;
                const midY = Math.min(a.y, b.y) - 30;
                svg += '<path d="M' + a.x + ',' + a.y + ' Q' + ((a.x + b.x) / 2) + ',' + midY + ' ' + b.x + ',' + b.y + '" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="5 4"/>';
            });
            edgesEl.innerHTML = svg;
            nodesEl.innerHTML = meta.map((m) => '<div class="tree-node' + (fr.current === m.id ? ' active' : (fr.visited.includes(m.val) ? ' visited' : '')) + '" style="left:' + m.x + 'px;top:' + m.y + 'px">' + m.val + '</div>').join('');
            host.querySelector('.th-seq').textContent = fr.visited.join(', ');
            host.querySelector('.th-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();
        host.querySelector('.th-build').onclick = () => {
            const vals = host.querySelector('.th-input').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite);
            if (vals.length) { st.vals = vals; renderTreeThreaded(); }
        };
    }
```

- [ ] **Step 2: Append CSS**

Append to `style.css`:
```css
.th-controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 10px; }
.th-controls .th-input { flex: 1; min-width: 200px; }
.th-stage { position: relative; height: 320px; overflow: hidden; }
.th-stage .th-edges { position: absolute; inset: 0; width: 100%; height: 100%; }
.th-stage .th-nodes { position: absolute; inset: 0; }
.th-output { margin: 6px 0; }
.th-phase { margin-top: 6px; color: #1e40af; font-style: italic; }
```
(Reuses `.tree-node`, `.tree-node.active`, `.tree-node.visited` already defined.)

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/app.js && echo "app.js OK"
grep -c "tree-threaded (pending)" js/app.js
node --test tests/unit/tree_threaded_viz.test.js 2>&1 | grep -E 'pass [0-9]|fail [0-9]'
```
Expected: `app.js OK`; stub count `0`; unit pass 3 / fail 0.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js style.css
git commit -m "feat(viz): implement renderTreeThreaded (tree + dashed thread edges) + styles"
```

---

## Task 6: `renderTreeMway()` + CSS

**Files:** Modify `js/app.js` (replace stub), `style.css`.

- [ ] **Step 1: Replace the `renderTreeMway` stub**

In `js/app.js`, replace the `renderTreeMway` stub line with:
```js
    let _mwayState = null;
    function renderTreeMway() {
        const host = acquireDynamicVizHost();
        if (!_mwayState) _mwayState = { keys: [50, 30, 70, 20, 40, 60, 80, 10, 25], m: 3 };
        const st = _mwayState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const res = MwayViz.buildMwayFrames(st.keys, st.m);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="mw-controls">' +
              '<input type="text" class="mw-keys" value="' + st.keys.join(',') + '">' +
              'm <input type="number" class="mw-m" min="3" max="6" value="' + st.m + '" style="width:54px">' +
              '<button type="button" class="mw-apply">Apply</button>' +
            '</div>' +
            '<div class="mw-stage"><svg class="mw-edges"></svg><div class="mw-nodes"></div></div>' +
            '<div class="mw-phase"></div>';

        function layout(tree) {
            const pos = {}; let leaf = 0; const W = host.querySelector('.mw-stage').clientWidth || 720;
            function place(node, depth) {
                if (!node) return;
                const kids = node.children.filter((c) => c);
                if (kids.length === 0) { pos[node.id] = { col: leaf++, depth, node }; return; }
                kids.forEach((c) => place(c, depth + 1));
                const cols = kids.map((c) => pos[c.id].col);
                pos[node.id] = { col: (Math.min(...cols) + Math.max(...cols)) / 2, depth, node };
            }
            place(tree, 0);
            const maxCol = Math.max(1, leaf - 1);
            const xOf = (col) => 40 + (col / maxCol) * (W - 120);
            return { pos, xOf };
        }

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.mw-nodes')) return;
            const nodesEl = host.querySelector('.mw-nodes');
            const edgesEl = host.querySelector('.mw-edges');
            nodesEl.innerHTML = ''; edgesEl.innerHTML = '';
            if (!fr.tree) { host.querySelector('.mw-phase').textContent = langOf(fr.msg); return; }
            const { pos, xOf } = layout(fr.tree);
            const onPath = new Set(fr.descendPath || []);
            // edges parent → non-null children
            let svg = '';
            Object.keys(pos).forEach((id) => {
                const p = pos[id];
                p.node.children.forEach((c) => { if (c && pos[c.id]) svg += '<line x1="' + xOf(p.col) + '" y1="' + (p.depth * 78 + 24) + '" x2="' + xOf(pos[c.id].col) + '" y2="' + (pos[c.id].depth * 78 + 8) + '" stroke="#94a3b8" stroke-width="2"/>'; });
            });
            edgesEl.innerHTML = svg;
            nodesEl.innerHTML = Object.keys(pos).map((id) => {
                const p = pos[id];
                const cls = 'mw-node' + (id === fr.current ? ' cur' : (onPath.has(id) ? ' onpath' : ''));
                const cells = p.node.keys.map((k) => '<span class="mw-key">' + k + '</span>').join('');
                return '<div class="' + cls + '" style="left:' + xOf(p.col) + 'px;top:' + (p.depth * 78 + 8) + 'px">' + cells + '</div>';
            }).join('');
            host.querySelector('.mw-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();
        host.querySelector('.mw-apply').onclick = () => {
            const keys = host.querySelector('.mw-keys').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite);
            const m = parseInt(host.querySelector('.mw-m').value, 10);
            if (keys.length && m >= 3) { st.keys = keys; st.m = m; renderTreeMway(); }
        };
    }
```

- [ ] **Step 2: Append CSS**

Append to `style.css`:
```css
.mw-controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 10px; }
.mw-controls .mw-keys { flex: 1; min-width: 200px; }
.mw-stage { position: relative; height: 300px; overflow: hidden; }
.mw-stage .mw-edges { position: absolute; inset: 0; width: 100%; height: 100%; }
.mw-stage .mw-nodes { position: absolute; inset: 0; }
.mw-node { position: absolute; transform: translate(-50%, 0); display: inline-flex; border: 2px solid #1e40af; border-radius: 6px; overflow: hidden; background: #fff; }
.mw-node.onpath { border-color: #60a5fa; }
.mw-node.cur { border-color: #f59e0b; box-shadow: 0 0 0 2px #fde68a; }
.mw-key { padding: 5px 10px; font-weight: 700; border-right: 1px solid #cbd5e1; }
.mw-key:last-child { border-right: none; }
.mw-phase { margin-top: 6px; color: #1e40af; font-style: italic; }
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/app.js && echo "app.js OK"
grep -c "tree-mway (pending)" js/app.js
node --test tests/unit/tree_mway_viz.test.js 2>&1 | grep -E 'pass [0-9]|fail [0-9]'
```
Expected: `app.js OK`; stub count `0`; unit pass 4 / fail 0.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js style.css
git commit -m "feat(viz): implement renderTreeMway (multi-key nodes + descend path) + styles"
```

---

## Task 7: i18n + desc_db

**Files:** Modify `js/i18n.js`, `js/desc_db.js`.

- [ ] **Step 1: i18n method names (both locales)**

In `js/i18n.js` `en` block:
```js
        'method.tree-threaded': 'Threaded Binary Tree',
        'method.tree-mway': 'm-way Search Tree',
```
In the `zh` block:
```js
        'method.tree-threaded': '引線二元樹',
        'method.tree-mway': 'm 路搜尋樹',
```

- [ ] **Step 2: desc_db entries**

In `js/desc_db.js`, before the closing `};` add:
```js
    'tree-threaded': `
        <h3>Threaded Binary Tree</h3>
        <p>Null right pointers become threads to the inorder successor, enabling stack-free traversal.</p>
        <hr>
        <ul>
            <li><strong>Thread:</strong> a null-right node points to its inorder successor</li>
            <li><strong>Traversal:</strong> follow threads instead of recursion / a stack</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Inorder: O(N)</span>
            <span class="badge space">Space: O(1) (no stack)</span>
        </div>
    `,
    'tree-mway': `
        <h3>m-way Search Tree</h3>
        <p>Each node holds up to m−1 sorted keys and up to m children — a generalization of the BST.</p>
        <hr>
        <ul>
            <li><strong>Search:</strong> within a node, descend the child between the bounding keys</li>
            <li><strong>Insert:</strong> fill a non-full node or create a child where the search falls off</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Search: O(h · log m)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/i18n.js && echo "i18n OK"
node -c js/desc_db.js && echo "desc OK"
grep -c 'method.tree-threaded' js/i18n.js
grep -c 'method.tree-mway' js/i18n.js
```
Expected: both OK; both counts `2`.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/i18n.js js/desc_db.js
git commit -m "feat(viz): i18n names + desc_db for tree-threaded & tree-mway"
```

---

## Task 8: slides decks + build

**Files:** Modify `slides_db.js`; regenerate.

- [ ] **Step 1: Append two decks**

In `slides_db.js` (repo root), before `module.exports = SLIDES_DB;`, add:
```js
SLIDES_DB["tree-threaded"] = {
  "category": "Trees",
  "title": { "zh": "引線二元樹", "en": "Threaded Binary Tree" },
  "slides": [
    { "heading": { "zh": "概念", "en": "Idea" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "一般二元樹有許多浪費的空(null)指標;引線樹讓「右空指標」指向中序後繼。", "en": "A binary tree wastes many null pointers; a threaded tree makes each null right pointer point to the inorder successor." } },
        { "type": "bullets", "items": [
          { "zh": "右指標為空 → 設為指向中序後繼的引線。", "en": "Null right pointer → a thread to the inorder successor." },
          { "zh": "可在 O(1) 額外空間下完成中序走訪(免遞迴/堆疊)。", "en": "Enables inorder traversal in O(1) extra space (no recursion/stack)." }
        ] }
      ] },
    { "heading": { "zh": "走訪", "en": "Traversal" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "從根往左走到最左節點。", "en": "From the root, go left to the leftmost node." },
          { "zh": "造訪節點;若右為引線,沿引線到後繼。", "en": "Visit the node; if its right is a thread, follow it to the successor." },
          { "zh": "否則往右子樹再走到最左。", "en": "Otherwise go to the right subtree and then leftmost." }
        ] }
      ] }
  ]
};
SLIDES_DB["tree-mway"] = {
  "category": "Trees",
  "title": { "zh": "m 路搜尋樹", "en": "m-way Search Tree" },
  "slides": [
    { "heading": { "zh": "定義", "en": "Definition" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "二元搜尋樹的推廣:每個節點最多有 m−1 個排序鍵與 m 個子節點。", "en": "A generalization of the BST: each node has up to m−1 sorted keys and up to m children." } },
        { "type": "note", "text": { "zh": "鍵把鍵值區間切成數段,各段對應一個子指標。", "en": "Keys partition the value range into segments, each with a child pointer." } }
      ] },
    { "heading": { "zh": "插入", "en": "Insertion" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "在節點內找到鍵應落的區間。", "en": "Within a node, find the segment the key belongs to." },
          { "zh": "若該子指標為空:節點未滿則直接插入,已滿則新建子節點。", "en": "If that child is null: insert into the node if it has room, else create a new child." },
          { "zh": "否則往該子節點下降,重複。", "en": "Otherwise descend into that child and repeat." }
        ] },
        { "type": "code", "lang": "cpp", "file": "tree_mway.cpp", "code": "if (p->children[i] == nullptr) {\n    if ((int)p->keys.size() < m - 1)\n        p->keys.insert(p->keys.begin() + i, key);\n    else\n        p->children[i] = makeLeaf(key);\n    return root;\n}\np = p->children[i];" }
      ] }
  ]
};
```

- [ ] **Step 2: Build + verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c slides_db.js && echo "slides_db OK"
npm run build:slides
ls slides/zh/tree-threaded.md slides/en/tree-threaded.md slides/zh/tree-mway.md slides/en/tree-mway.md
```
Expected: `slides_db OK`; build prints `Generated N decks` (+2); all four md exist.

- [ ] **Step 3: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add slides_db.js js/slides_rendered.js slides/zh/tree-threaded.md slides/en/tree-threaded.md slides/zh/tree-mway.md slides/en/tree-mway.md
git commit -m "feat(viz): bilingual slides decks for tree-threaded & tree-mway"
```

---

## Task 9: Playwright E2E

**Files:** Create `tests/tree_threaded.spec.js`, `tests/tree_mway.spec.js`.

- [ ] **Step 1: Create `tests/tree_threaded.spec.js`**
```js
const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Threaded Binary Tree', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-threaded');
    });

    test('renders tree + dashed threads; steps to full inorder; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-threaded"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('tree_threaded.cpp');
        await expect(sec.locator('.th-edges path')).not.toHaveCount(0); // dashed thread edges exist
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 12; i++) await step.click();
        await expect(sec.locator('.th-seq')).toContainText('20, 30, 40, 50, 60, 70, 80');
    });
});
```

- [ ] **Step 2: Create `tests/tree_mway.spec.js`**
```js
const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('m-way Search Tree', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-mway');
    });

    test('builds multi-key nodes as keys are inserted; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-mway"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('tree_mway.cpp');
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 12; i++) await step.click();
        await expect(sec.locator('.mw-node').first()).toBeVisible();
        // at least one multi-key node (a node with 2 key cells) appears for m=3
        await expect(sec.locator('.mw-node:has(.mw-key:nth-child(2))').first()).toBeVisible();
    });
});
```

- [ ] **Step 3: Run**
```bash
cd /Users/skhuang/course/dsvisual
npx playwright test tests/tree_threaded.spec.js tests/tree_mway.spec.js --reporter=line
```
Expected: both PASS. If the threaded inorder isn't fully shown within 12 steps, increase the loop; if no multi-key node appears, confirm the default keys produce one for m=3. Do NOT commit failing tests; report BLOCKED if unresolved.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add tests/tree_threaded.spec.js tests/tree_mway.spec.js
git commit -m "test(viz): E2E for tree-threaded & tree-mway"
```

---

## Task 10: Full suite + README + finish

**Files:** Modify `README.md`.

- [ ] **Step 1: README rows**

In `README.md`, add to the Trees table:
```
| Threaded Binary Tree | Inorder-successor threads; stack-free traversal |
| m-way Search Tree | Up to m−1 keys / m children per node |
```

- [ ] **Step 2: Full suite**

Run: `cd /Users/skhuang/course/dsvisual && npm run test:all`
Expected: unit (incl. 2 new files) + Playwright all PASS. If a hardcoded method/tile COUNT test fails (e.g. `tests/i18n.spec.js` overview-tile count), update it (+2; same `trees` group → nav/category counts unchanged) and include in the Step 4 commit; report old→new. If a NON-count test fails, STOP and report BLOCKED.

- [ ] **Step 3: Clean-build check**
```bash
cd /Users/skhuang/course/dsvisual
node build_db.js && npm run build:slides
git status --porcelain
```
Expected: no diffs to `js/code_db.js` / `js/slides_rendered.js` / `slides/`.

- [ ] **Step 4: Commit and finish**
```bash
cd /Users/skhuang/course/dsvisual
git add README.md
git commit -m "docs(viz): list tree-threaded & tree-mway in README"
```
Then use **superpowers:finishing-a-development-branch** for `feat/tier2-batch-e3`.

---

## Self-Review notes
- **Spec coverage (E3):** tree-threaded §3.5 (Tasks 1,5,8), tree-mway §3.6 (Tasks 2,6,8); shared pattern §2 (Tasks 3,4,7,9); acceptance §5 (Task 10).
- **Dispatch safety:** `renderAll`'s tree branches are exact-id `.includes([...])` arrays — no `tree`-substring catch-all (Task 4 Step 7 asserts `includes('tree')` count is 0), so exact `===` for the two new ids is safe placed after `tree-obst`.
- **Node-drawing rules:** tree-threaded reuses `.tree-node` (translate-centered) with child edges at `(x,y)` (no offset) and `overflow:hidden`; thread edges are dashed SVG `path`s between node centers. tree-mway uses custom `.mw-node` boxes (translate-x centered) — not `.tree-node` circles — with its own layout.
- **Type/name consistency:** `buildTreeFromValues`/`buildThreadedFrames`/`SAMPLE`; `buildMwayFrames`; globals `window.ThreadedViz` / `window.MwayViz`; method ids `tree-threaded` / `tree-mway`. Consistent across modules, tests, renderers, index.html, build_db.
- **Fixtures verified by hand:** threaded SAMPLE [50,30,70,20,40,60,80] → inorder sorted; null-right nodes {20,40,60} thread to {30,50,70} (80 is max → no thread) → 3 threads. m-way KEYS with m=3: each node ≤2 keys, children=keys+1, inorder flatten = sorted unique.
- **No alignment caveat issues:** threaded uses the established `.tree-node` rules; m-way uses flat key boxes.
```
