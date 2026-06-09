# Tier-1 Batch A: AOE Critical Path + Infix→Postfix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two dsvisual visualizations — `graph-aoe` (AOE network: topological order → forward/backward pass → critical path) and `expr-infix-postfix` (shunting-yard infix→postfix conversion → postfix evaluation) — each with Step/Run/Reset, bilingual UI + slides, and tests.

**Architecture:** Pure frame-generators in standalone dual-export modules (`graph_aoe_viz.js`, `expr_infix_postfix_viz.js`, like `heap_models.js`), unit-tested under `node --test`. DOM renderers (`renderGraphAoe`, `renderExprInfixPostfix`) added inside app.js using `acquireDynamicVizHost()` + `buildStepControls()`. `graph-aoe` draws a self-contained inline SVG (avoids the `.tree-node` translate centering entirely); `expr-infix-postfix` uses simple cell/stack DOM.

**Tech Stack:** Vanilla JS (IIFE modules + browser globals), Node test runner, Playwright, Marp slides via `build_slides.js`, Prism via `build_db.js`.

**Spec:** `docs/superpowers/specs/2026-06-09-tier1-remaining-visualizations-design.md`

---

## File Structure

- `expr_infix_postfix_viz.js` (new) — pure: `tokenize`, `buildShuntingYardFrames`, `buildPostfixEvalFrames`. `window.ExprViz` + `module.exports`.
- `graph_aoe_viz.js` (new) — pure: `AOE_PRESET`, `topoOrder`, `buildAoeFrames`. `window.AoeViz` + `module.exports`.
- `expr_infix_postfix.cpp`, `graph_aoe.cpp` (new) — C++ reference for the code panel.
- `tests/unit/expr_infix_postfix_viz.test.js`, `tests/unit/graph_aoe_viz.test.js` (new).
- `tests/expr_infix_postfix.spec.js`, `tests/graph_aoe.spec.js` (new) — Playwright E2E.
- `app.js` (modify) — register both methods, code lookup, updateLayout branches, renderAll dispatch, `renderExprInfixPostfix` + `renderGraphAoe`.
- `build_db.js`, `index.html`, `i18n.js`, `desc_db.js`, `slides_db.js`, `style.css` (modify).
- Regenerated: `code_db.js`, `slides_rendered.js` (+ slides md).

---

## Task 1: Feature branch + expr-infix-postfix pure module (TDD)

**Files:** Create `expr_infix_postfix_viz.js`, `tests/unit/expr_infix_postfix_viz.test.js`.

- [ ] **Step 1: Create the feature branch**

Run:
```bash
cd /Users/skhuang/course/dsvisual
git checkout main && git pull --ff-only
git checkout -b feat/tier1-batch-a
git branch --show-current
```
Expected: `feat/tier1-batch-a`.

- [ ] **Step 2: Write the failing unit test**

Create `tests/unit/expr_infix_postfix_viz.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { tokenize, buildShuntingYardFrames, buildPostfixEvalFrames } = require('../../expr_infix_postfix_viz');

const postfixOf = (infix) => buildShuntingYardFrames(tokenize(infix)).postfix.join(' ');

test('tokenize splits identifiers, numbers, operators, parens; skips spaces', () => {
  assert.deepEqual(tokenize('A*(B + C)'), ['A', '*', '(', 'B', '+', 'C', ')']);
  assert.deepEqual(tokenize('31 + 4*2'), ['31', '+', '4', '*', '2']);
});

test('tokenize throws on invalid char', () => {
  assert.throws(() => tokenize('A & B'));
});

test('shunting-yard produces correct postfix', () => {
  assert.equal(postfixOf('A*(B+C)*D'), 'A B C + * D *');
  assert.equal(postfixOf('3+4*2'), '3 4 2 * +');
  assert.equal(postfixOf('(1-5)/2'), '1 5 - 2 /');
});

test('shunting-yard throws on unbalanced parentheses', () => {
  assert.throws(() => buildShuntingYardFrames(tokenize('(A+B')));
});

test('postfix eval computes numeric result', () => {
  const { value } = buildPostfixEvalFrames(['3', '4', '2', '*', '+']);
  assert.equal(value, 11);
});

test('postfix eval builds parenthesized string for symbolic operands', () => {
  const { value } = buildPostfixEvalFrames(['A', 'B', 'C', '+', '*']);
  assert.equal(value, '(A*(B+C))');
});

test('frames carry bilingual msg and stack/output snapshots', () => {
  const { frames } = buildShuntingYardFrames(tokenize('A+B'));
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); assert.ok(Array.isArray(f.opStack) && Array.isArray(f.output)); }
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/expr_infix_postfix_viz.test.js`
Expected: FAIL — `Cannot find module '../../expr_infix_postfix_viz'`.

- [ ] **Step 4: Implement `expr_infix_postfix_viz.js`**

Create `expr_infix_postfix_viz.js`:
```js
(function (global) {
  function tokenize(infix) {
    const tokens = [];
    let i = 0;
    while (i < infix.length) {
      const c = infix[i];
      if (c === ' ' || c === '\t') { i++; continue; }
      if ('+-*/()'.includes(c)) { tokens.push(c); i++; continue; }
      if (/[0-9]/.test(c)) { let j = i; while (j < infix.length && /[0-9]/.test(infix[j])) j++; tokens.push(infix.slice(i, j)); i = j; continue; }
      if (/[A-Za-z]/.test(c)) { let j = i; while (j < infix.length && /[A-Za-z0-9]/.test(infix[j])) j++; tokens.push(infix.slice(i, j)); i = j; continue; }
      throw new Error('Invalid character: ' + c);
    }
    return tokens;
  }

  const isOp = (t) => t === '+' || t === '-' || t === '*' || t === '/';
  const prec = (o) => (o === '*' || o === '/') ? 2 : 1;

  function buildShuntingYardFrames(tokens) {
    const frames = [], opStack = [], output = [];
    const snap = (token, msg) => frames.push({ phase: 'convert', token: token, opStack: opStack.slice(), output: output.slice(), msg: msg });
    snap(null, { zh: '開始中序轉後序', en: 'Begin infix → postfix' });
    for (const t of tokens) {
      if (isOp(t)) {
        while (opStack.length && isOp(opStack[opStack.length - 1]) && prec(opStack[opStack.length - 1]) >= prec(t)) output.push(opStack.pop());
        opStack.push(t);
        snap(t, { zh: '運算子 ' + t + ':彈出優先權 ≥ 的運算子後入堆疊', en: 'Operator ' + t + ': pop >= precedence, then push' });
      } else if (t === '(') {
        opStack.push(t);
        snap(t, { zh: '( 入堆疊', en: 'Push (' });
      } else if (t === ')') {
        while (opStack.length && opStack[opStack.length - 1] !== '(') output.push(opStack.pop());
        if (!opStack.length) throw new Error('Unbalanced parentheses');
        opStack.pop();
        snap(t, { zh: ') :彈出運算子直到 (', en: ') : pop operators until (' });
      } else {
        output.push(t);
        snap(t, { zh: '運算元 ' + t + ' 進輸出', en: 'Operand ' + t + ' to output' });
      }
    }
    while (opStack.length) { const o = opStack.pop(); if (o === '(' || o === ')') throw new Error('Unbalanced parentheses'); output.push(o); }
    snap(null, { zh: '完成,輸出即為後序式', en: 'Done; output is the postfix expression' });
    return { frames, postfix: output.slice() };
  }

  function buildPostfixEvalFrames(postfix) {
    const frames = [], stack = [];
    const isNum = (t) => /^[0-9]+$/.test(t);
    const apply = (op, a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        if (op === '+') return a + b;
        if (op === '-') return a - b;
        if (op === '*') return a * b;
        return b === 0 ? NaN : a / b;
      }
      return '(' + a + op + b + ')';
    };
    const snap = (token, msg) => frames.push({ phase: 'eval', token: token, valStack: stack.map(String), msg: msg });
    snap(null, { zh: '開始後序求值', en: 'Begin postfix evaluation' });
    for (const t of postfix) {
      if (isOp(t)) {
        const b = stack.pop(), a = stack.pop();
        stack.push(apply(t, a, b));
        snap(t, { zh: '彈出兩運算元、套用 ' + t + '、推回結果', en: 'Pop two operands, apply ' + t + ', push result' });
      } else {
        stack.push(isNum(t) ? parseInt(t, 10) : t);
        snap(t, { zh: '運算元 ' + t + ' 入堆疊', en: 'Push operand ' + t });
      }
    }
    snap(null, { zh: '完成', en: 'Done' });
    return { frames, value: stack.length === 1 ? stack[0] : undefined };
  }

  const api = { tokenize, buildShuntingYardFrames, buildPostfixEvalFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ExprViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/expr_infix_postfix_viz.test.js`
Expected: PASS — 7 tests pass (`# pass 7`, `# fail 0`).

- [ ] **Step 6: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add expr_infix_postfix_viz.js tests/unit/expr_infix_postfix_viz.test.js
git commit -m "feat(viz): infix→postfix pure frame generator + unit tests"
```

---

## Task 2: graph-aoe pure module (TDD)

**Files:** Create `graph_aoe_viz.js`, `tests/unit/graph_aoe_viz.test.js`.

- [ ] **Step 1: Write the failing unit test**

Create `tests/unit/graph_aoe_viz.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { AOE_PRESET, topoOrder, buildAoeFrames } = require('../../graph_aoe_viz');

test('topoOrder returns a valid topological order of the preset', () => {
  const { nodes, edges } = AOE_PRESET;
  const order = topoOrder(nodes, edges);
  const pos = {}; order.forEach((id, i) => { pos[id] = i; });
  assert.equal(order.length, nodes.length);
  for (const e of edges) assert.ok(pos[e.u] < pos[e.v], 'edge ' + e.u + '->' + e.v + ' violates order');
});

test('forward/backward pass and critical path are correct for the textbook preset', () => {
  const { nodes, edges } = AOE_PRESET;
  const { ee, le, criticalEdges } = buildAoeFrames(nodes, edges);
  // Known values (Horowitz Fig. 6.32 style network):
  assert.deepEqual(ee, { 1: 0, 2: 6, 3: 4, 4: 5, 5: 7, 6: 7, 7: 16, 8: 14, 9: 18 });
  assert.deepEqual(le, { 1: 0, 2: 6, 3: 6, 4: 8, 5: 7, 6: 10, 7: 16, 8: 14, 9: 18 });
  // ee[sink] equals the project length
  assert.equal(ee[9], 18);
  // Critical activities: e(i) == l(i), i.e. ee[u] == le[v]-w
  const crit = new Set(criticalEdges.map((e) => e.u + '-' + e.v));
  for (const id of ['1-2', '2-5', '5-7', '7-9', '5-8', '8-9']) assert.ok(crit.has(id), 'missing critical ' + id);
  // non-critical example
  assert.ok(!crit.has('1-3'));
});

test('frames cover topo→forward→backward→critical and carry bilingual msg', () => {
  const { nodes, edges } = AOE_PRESET;
  const { frames } = buildAoeFrames(nodes, edges);
  const phases = new Set(frames.map((f) => f.phase));
  for (const p of ['forward', 'backward', 'critical']) assert.ok(phases.has(p), 'missing phase ' + p);
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/graph_aoe_viz.test.js`
Expected: FAIL — `Cannot find module '../../graph_aoe_viz'`.

- [ ] **Step 3: Implement `graph_aoe_viz.js`**

Create `graph_aoe_viz.js`:
```js
(function (global) {
  // Textbook AOE network (events 1..9). x/y are layout coords for an inline SVG (~700x280).
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
    const snap = (phase, current, msg) => frames.push({ phase, current, ee: Object.assign({}, ee), le: Object.assign({}, le), criticalEdges: (phase === 'critical' ? criticalSoFar.slice() : []), msg });
    let criticalSoFar = [];

    // Forward pass (earliest event time)
    for (const u of order) {
      ee[u] = inEdges[u].length ? Math.max(...inEdges[u].map((e) => ee[e.u] + e.w)) : 0;
      snap('forward', u, { zh: 'Forward:ee(' + u + ') = ' + ee[u], en: 'Forward: ee(' + u + ') = ' + ee[u] });
    }
    // Backward pass (latest event time)
    const sink = order[order.length - 1];
    for (let i = order.length - 1; i >= 0; i--) {
      const u = order[i];
      le[u] = outEdges[u].length ? Math.min(...outEdges[u].map((e) => le[e.v] - e.w)) : ee[sink];
      snap('backward', u, { zh: 'Backward:le(' + u + ') = ' + le[u], en: 'Backward: le(' + u + ') = ' + le[u] });
    }
    // Critical activities: e(i) == l(i)  i.e. ee[u] == le[v]-w
    const criticalEdges = edges.filter((e) => ee[e.u] === le[e.v] - e.w);
    criticalSoFar = criticalEdges.slice();
    snap('critical', null, { zh: '關鍵活動(e=l)標示為關鍵路徑;專案總工時 = ' + ee[sink], en: 'Critical activities (e=l) form the critical path; project length = ' + ee[sink] });

    return { frames, ee, le, criticalEdges };
  }

  const api = { AOE_PRESET, topoOrder, buildAoeFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AoeViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/graph_aoe_viz.test.js`
Expected: PASS — 3 tests pass (`# pass 3`, `# fail 0`).

- [ ] **Step 5: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add graph_aoe_viz.js tests/unit/graph_aoe_viz.test.js
git commit -m "feat(viz): AOE critical-path pure frame generator + unit tests"
```

---

## Task 3: C++ references + code_db regeneration

**Files:** Create `expr_infix_postfix.cpp`, `graph_aoe.cpp`; modify `build_db.js`; regenerate `code_db.js`.

- [ ] **Step 1: Create `expr_infix_postfix.cpp`**
```cpp
#include <stack>
#include <string>
#include <cctype>
#include <iostream>

int prec(char op) { return (op == '*' || op == '/') ? 2 : 1; }

// Dijkstra's shunting-yard: infix -> postfix (single-letter operands / digits).
std::string infixToPostfix(const std::string& s) {
    std::stack<char> ops;
    std::string out;
    for (char c : s) {
        if (std::isspace((unsigned char)c)) continue;
        if (std::isalnum((unsigned char)c)) { out += c; out += ' '; }
        else if (c == '(') ops.push(c);
        else if (c == ')') {
            while (!ops.empty() && ops.top() != '(') { out += ops.top(); out += ' '; ops.pop(); }
            if (!ops.empty()) ops.pop(); // discard '('
        } else { // operator
            while (!ops.empty() && ops.top() != '(' && prec(ops.top()) >= prec(c)) { out += ops.top(); out += ' '; ops.pop(); }
            ops.push(c);
        }
    }
    while (!ops.empty()) { out += ops.top(); out += ' '; ops.pop(); }
    return out;
}

// Evaluate a postfix expression of single-digit numbers.
int evalPostfix(const std::string& tokens) {
    std::stack<int> st;
    for (char c : tokens) {
        if (std::isspace((unsigned char)c)) continue;
        if (std::isdigit((unsigned char)c)) st.push(c - '0');
        else {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if (c == '+') st.push(a + b);
            else if (c == '-') st.push(a - b);
            else if (c == '*') st.push(a * b);
            else st.push(a / b);
        }
    }
    return st.top();
}
```

- [ ] **Step 2: Create `graph_aoe.cpp`**
```cpp
#include <vector>
#include <queue>
#include <algorithm>
#include <climits>

// AOE network: forward pass (earliest), backward pass (latest), critical activities.
struct Edge { int u, v, w; };

void criticalPath(int n, const std::vector<Edge>& edges) {
    std::vector<std::vector<std::pair<int,int>>> out(n + 1), in(n + 1);
    std::vector<int> indeg(n + 1, 0);
    for (const auto& e : edges) { out[e.u].push_back({e.v, e.w}); in[e.v].push_back({e.u, e.w}); indeg[e.v]++; }

    // Topological order (Kahn).
    std::vector<int> order;
    std::queue<int> q;
    for (int i = 1; i <= n; i++) if (indeg[i] == 0) q.push(i);
    std::vector<int> deg = indeg;
    while (!q.empty()) {
        int u = q.front(); q.pop(); order.push_back(u);
        for (auto [v, w] : out[u]) if (--deg[v] == 0) q.push(v);
    }

    std::vector<int> ee(n + 1, 0), le(n + 1, 0);
    for (int u : order) for (auto [p, w] : in[u]) ee[u] = std::max(ee[u], ee[p] + w);
    int sink = order.back();
    for (int i = 1; i <= n; i++) le[i] = ee[sink];
    for (auto it = order.rbegin(); it != order.rend(); ++it) {
        int u = *it;
        for (auto [v, w] : out[u]) le[u] = std::min(le[u], le[v] - w);
    }
    // Activity (u,v,w) is critical when ee[u] == le[v] - w.
    (void)le;
}
```

- [ ] **Step 3: Register in `build_db.js`**

In `build_db.js` `mappings`, after the lines added in the previous batch (or after `'huffman.cpp'` / `'tree_traversal.cpp'`), add:
```js
    'expr_infix_postfix.cpp': 'codeExprInfixPostfix',
    'graph_aoe.cpp': 'codeGraphAoe',
```

- [ ] **Step 4: Regenerate and verify**

Run:
```bash
cd /Users/skhuang/course/dsvisual
node build_db.js
grep -c 'const codeExprInfixPostfix' code_db.js
grep -c 'const codeGraphAoe' code_db.js
```
Expected: build prints summary, no error; both grep counts `1`.

- [ ] **Step 5: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add expr_infix_postfix.cpp graph_aoe.cpp build_db.js code_db.js
git commit -m "feat(viz): C++ refs for infix→postfix & AOE; regen code_db"
```

---

## Task 4: app.js registration + index.html

**Files:** Modify `app.js`, `index.html`.

- [ ] **Step 1: Register methods in METHOD_GROUPS**

In `app.js`, in the `graphs` group's `methods` array, after the `graph-floyd-warshall` entry add:
```js
            { id: 'graph-aoe', title: 'AOE / Critical Path', file: 'graph_aoe.cpp', visualizer: 'aoe', controls: 'aoe' },
```
In the `linear` group's `methods` array, after the `deque` entry add:
```js
            { id: 'expr-infix-postfix', title: 'Infix → Postfix (Stack)', file: 'expr_infix_postfix.cpp', visualizer: 'expr', controls: 'expr' },
```

- [ ] **Step 2: Add code lookup entries in `getCodeForMethod()`**

In `app.js` `codeByMethod`, add (near the graph / linear entries):
```js
        'graph-aoe': codeGraphAoe,
        'expr-infix-postfix': codeExprInfixPostfix,
```

- [ ] **Step 3: Add updateLayout branches**

In `app.js` `updateLayout()`, after the `tree-fenwick`/`huffman` branches (anywhere in the else-if chain), add:
```js
        else if (currentMode === 'graph-aoe') {
            codeTitle.textContent = 'graph_aoe.cpp';
            codeDisplay.textContent = codeGraphAoe;
        }
        else if (currentMode === 'expr-infix-postfix') {
            codeTitle.textContent = 'expr_infix_postfix.cpp';
            codeDisplay.textContent = codeExprInfixPostfix;
        }
```

- [ ] **Step 4: Add renderAll dispatch**

In `app.js` `renderAll()`, add (before the generic `currentMode.includes(...)` catch-alls; placing right after the `huffman` dispatch is safe):
```js
        else if (currentMode === 'graph-aoe') renderGraphAoe();
        else if (currentMode === 'expr-infix-postfix') renderExprInfixPostfix();
```

- [ ] **Step 5: Add temporary render stubs**

In `app.js`, just before `function renderSegmentTree()`, add:
```js
    function renderGraphAoe() { const host = acquireDynamicVizHost(); host.textContent = 'graph-aoe (pending)'; }
    function renderExprInfixPostfix() { const host = acquireDynamicVizHost(); host.textContent = 'expr-infix-postfix (pending)'; }
```

- [ ] **Step 6: Load modules in index.html**

In `index.html`, after `<script src="huffman_viz.js"></script>` (added in the previous batch; if absent, after `<script src="code_db.js"></script>`), add:
```html
    <script src="graph_aoe_viz.js"></script>
    <script src="expr_infix_postfix_viz.js"></script>
```

- [ ] **Step 7: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c app.js && echo "app.js OK"
node -e "require('./graph_aoe_viz.js'); require('./expr_infix_postfix_viz.js'); console.log('modules load OK')"
grep -c "id: 'graph-aoe'" app.js
grep -c "id: 'expr-infix-postfix'" app.js
grep -c 'graph_aoe_viz.js' index.html
grep -c 'expr_infix_postfix_viz.js' index.html
```
Expected: `app.js OK`, `modules load OK`, and four `1`s.

- [ ] **Step 8: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add app.js index.html
git commit -m "feat(viz): register graph-aoe & expr-infix-postfix; load modules"
```

---

## Task 5: `renderExprInfixPostfix()` + CSS

**Files:** Modify `app.js` (replace stub), `style.css`.

- [ ] **Step 1: Replace the `renderExprInfixPostfix` stub**

In `app.js`, replace the `renderExprInfixPostfix` stub line with:
```js
    let _exprState = null;
    function renderExprInfixPostfix() {
        const host = acquireDynamicVizHost();
        if (!_exprState) _exprState = { text: 'A*(B+C)*D' };
        const st = _exprState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        let frames = [], postfix = [];
        try {
            const tokens = ExprViz.tokenize(st.text);
            const conv = ExprViz.buildShuntingYardFrames(tokens);
            postfix = conv.postfix;
            const evalRes = ExprViz.buildPostfixEvalFrames(postfix);
            frames = conv.frames.concat(evalRes.frames);
        } catch (e) {
            host.innerHTML = '<div class="expr-controls"><input type="text" class="expr-input"><button type="button" class="expr-apply">Apply</button></div>' +
                '<div class="expr-error" style="color:#dc2626;margin-top:8px;"></div>';
            host.querySelector('.expr-input').value = st.text;
            host.querySelector('.expr-error').textContent = 'Parse error: ' + e.message;
            host.querySelector('.expr-apply').onclick = () => { st.text = host.querySelector('.expr-input').value; renderExprInfixPostfix(); };
            return;
        }
        let idx = 0;

        host.innerHTML =
            '<div class="expr-controls"><input type="text" class="expr-input"><button type="button" class="expr-apply">Apply</button></div>' +
            '<div class="expr-phasebadge"></div>' +
            '<div class="expr-stack"><strong>Stack:</strong> <span class="expr-stack-cells"></span></div>' +
            '<div class="expr-out"><strong>Output:</strong> <span class="expr-out-cells"></span></div>' +
            '<div class="expr-phase"></div>';
        host.querySelector('.expr-input').value = st.text;

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.expr-stack-cells')) return;
            host.querySelector('.expr-phasebadge').textContent = fr.phase === 'convert'
                ? 'Phase 1 — Convert (postfix: ' + postfix.join(' ') + ')'
                : 'Phase 2 — Evaluate';
            const stackArr = fr.phase === 'convert' ? fr.opStack : fr.valStack;
            const outArr = fr.phase === 'convert' ? fr.output : [];
            host.querySelector('.expr-stack-cells').innerHTML = stackArr.map((v) => '<span class="expr-cell">' + v + '</span>').join('');
            host.querySelector('.expr-out-cells').innerHTML = outArr.map((v) => '<span class="expr-cell out">' + v + '</span>').join('');
            host.querySelector('.expr-phase').textContent = (fr.token ? '[' + fr.token + '] ' : '') + langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();
        host.querySelector('.expr-apply').onclick = () => { st.text = host.querySelector('.expr-input').value; renderExprInfixPostfix(); };
    }
```

- [ ] **Step 2: Append CSS**

Append to `style.css`:
```css
.expr-controls { display: flex; gap: 8px; margin-bottom: 10px; }
.expr-controls .expr-input { flex: 1; }
.expr-phasebadge { font-weight: 700; color: #0f3a5f; margin: 4px 0; }
.expr-stack, .expr-out { margin: 6px 0; min-height: 30px; }
.expr-cell { display: inline-block; min-width: 26px; padding: 3px 8px; margin: 2px; background: #e2e8f0; border: 1px solid #cbd5e1; border-radius: 5px; text-align: center; font-weight: 600; }
.expr-cell.out { background: #dcfce7; border-color: #86efac; }
.expr-phase { margin-top: 6px; color: #1e40af; font-style: italic; }
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c app.js && echo "app.js OK"
grep -c "expr-infix-postfix (pending)" app.js
node --test tests/unit/expr_infix_postfix_viz.test.js 2>&1 | grep -E 'pass [0-9]|fail [0-9]'
```
Expected: `app.js OK`; stub count `0`; unit pass 7 / fail 0.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add app.js style.css
git commit -m "feat(viz): implement renderExprInfixPostfix (two-phase) + styles"
```

---

## Task 6: `renderGraphAoe()` + CSS

**Files:** Modify `app.js` (replace stub), `style.css`.

- [ ] **Step 1: Replace the `renderGraphAoe` stub**

In `app.js`, replace the `renderGraphAoe` stub line with:
```js
    function renderGraphAoe() {
        const host = acquireDynamicVizHost();
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const net = AoeViz.AOE_PRESET;
        const built = AoeViz.buildAoeFrames(net.nodes, net.edges);
        const frames = built.frames;
        let idx = 0;
        const nodeById = (id) => net.nodes.find((n) => n.id === id);

        host.innerHTML =
            '<div class="aoe-stage"><svg class="aoe-svg" viewBox="0 0 700 280" width="100%">' +
              '<defs><marker id="aoe-arrow" markerWidth="9" markerHeight="9" refX="14" refY="3" orient="auto">' +
              '<path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8"/></marker></defs>' +
              '<g class="aoe-edges"></g><g class="aoe-nodes"></g></svg></div>' +
            '<div class="aoe-table"></div>' +
            '<div class="aoe-phase"></div>';

        const edgesG = host.querySelector('.aoe-edges');
        const nodesG = host.querySelector('.aoe-nodes');

        function paint() {
            const fr = frames[idx];
            const crit = new Set((fr.criticalEdges || []).map((e) => e.u + '-' + e.v));
            edgesG.innerHTML = net.edges.map((e) => {
                const a = nodeById(e.u), b = nodeById(e.v);
                const isC = crit.has(e.u + '-' + e.v);
                const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
                return '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" ' +
                    'stroke="' + (isC ? '#dc2626' : '#94a3b8') + '" stroke-width="' + (isC ? 3 : 2) + '" marker-end="url(#aoe-arrow)"/>' +
                    '<text x="' + mx + '" y="' + (my - 4) + '" fill="' + (isC ? '#dc2626' : '#475569') + '" font-size="12" text-anchor="middle">' + e.w + '</text>';
            }).join('');
            nodesG.innerHTML = net.nodes.map((n) => {
                const active = fr.current === n.id;
                const eeT = fr.ee[n.id] != null ? 'ee=' + fr.ee[n.id] : '';
                const leT = fr.le[n.id] != null ? 'le=' + fr.le[n.id] : '';
                return '<circle cx="' + n.x + '" cy="' + n.y + '" r="16" fill="' + (active ? '#f59e0b' : '#fff') + '" stroke="#1e40af" stroke-width="2"/>' +
                    '<text x="' + n.x + '" y="' + (n.y + 4) + '" text-anchor="middle" font-size="13" font-weight="700">' + n.id + '</text>' +
                    '<text x="' + n.x + '" y="' + (n.y - 22) + '" text-anchor="middle" font-size="10" fill="#2563eb">' + eeT + '</text>' +
                    '<text x="' + n.x + '" y="' + (n.y + 30) + '" text-anchor="middle" font-size="10" fill="#7c3aed">' + leT + '</text>';
            }).join('');
            const rows = net.nodes.map((n) => '<tr><td>' + n.id + '</td><td>' + (fr.ee[n.id] != null ? fr.ee[n.id] : '') + '</td><td>' + (fr.le[n.id] != null ? fr.le[n.id] : '') + '</td></tr>').join('');
            host.querySelector('.aoe-table').innerHTML = '<table class="aoe-tbl"><thead><tr><th>v</th><th>ee</th><th>le</th></tr></thead><tbody>' + rows + '</tbody></table>';
            host.querySelector('.aoe-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 800));
        paint();
    }
```

- [ ] **Step 2: Append CSS**

Append to `style.css`:
```css
.aoe-stage { position: relative; width: 100%; overflow: hidden; }
.aoe-svg { display: block; }
.aoe-table { margin-top: 8px; }
.aoe-tbl { border-collapse: collapse; }
.aoe-tbl th, .aoe-tbl td { border: 1px solid #cbd5e1; padding: 3px 12px; text-align: center; }
.aoe-phase { margin-top: 6px; color: #1e40af; font-style: italic; }
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c app.js && echo "app.js OK"
grep -c "graph-aoe (pending)" app.js
node --test tests/unit/graph_aoe_viz.test.js 2>&1 | grep -E 'pass [0-9]|fail [0-9]'
```
Expected: `app.js OK`; stub count `0`; unit pass 3 / fail 0.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add app.js style.css
git commit -m "feat(viz): implement renderGraphAoe (forward/backward/critical) + styles"
```

---

## Task 7: i18n + desc_db

**Files:** Modify `i18n.js`, `desc_db.js`.

- [ ] **Step 1: i18n method names (both locales)**

In `i18n.js` `en` block (near other method names):
```js
        'method.graph-aoe': 'AOE / Critical Path',
        'method.expr-infix-postfix': 'Infix → Postfix (Stack)',
```
In the `zh` block:
```js
        'method.graph-aoe': 'AOE 網路 / 關鍵路徑',
        'method.expr-infix-postfix': '中序轉後序(堆疊)',
```

- [ ] **Step 2: desc_db entries**

In `desc_db.js`, before the closing `};` add:
```js
    'graph-aoe': `
        <h3>AOE Networks &amp; Critical Path</h3>
        <p>Activity-on-edge networks model project scheduling.</p>
        <hr>
        <ul>
            <li><strong>Forward pass:</strong> earliest event time ee(v)</li>
            <li><strong>Backward pass:</strong> latest event time le(v)</li>
            <li><strong>Critical activity:</strong> e(i) = l(i); critical path = longest path</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(V + E)</span>
            <span class="badge space">Space: O(V + E)</span>
        </div>
    `,
    'expr-infix-postfix': `
        <h3>Infix → Postfix (Shunting-Yard)</h3>
        <p>Convert infix expressions to postfix using an operator stack, then evaluate.</p>
        <hr>
        <ul>
            <li><strong>Convert:</strong> operator stack + output queue (precedence rules)</li>
            <li><strong>Evaluate:</strong> value stack over the postfix tokens</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(N)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c i18n.js && echo "i18n OK"
node -c desc_db.js && echo "desc OK"
grep -c 'method.graph-aoe' i18n.js
grep -c 'method.expr-infix-postfix' i18n.js
```
Expected: both `OK`; both counts `2`.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add i18n.js desc_db.js
git commit -m "feat(viz): i18n names + desc_db for graph-aoe & expr-infix-postfix"
```

---

## Task 8: slides decks + build

**Files:** Modify `slides_db.js`; regenerate `slides_rendered.js` + slides md.

- [ ] **Step 1: Append two decks**

In `slides_db.js`, before `module.exports = SLIDES_DB;`, add:
```js
SLIDES_DB["graph-aoe"] = {
  "category": "Graphs",
  "title": { "zh": "AOE 網路與關鍵路徑", "en": "AOE Networks & Critical Path" },
  "slides": [
    { "heading": { "zh": "AOE 網路", "en": "AOE Networks" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "Activity-on-Edge:頂點是事件,邊是有工時的活動,用於專案排程。", "en": "Activity-on-Edge: vertices are events, edges are activities with durations — used for project scheduling." } },
        { "type": "bullets", "items": [
          { "zh": "ee(v):事件最早發生時間(forward pass)", "en": "ee(v): earliest event time (forward pass)" },
          { "zh": "le(v):事件最晚發生時間(backward pass)", "en": "le(v): latest event time (backward pass)" },
          { "zh": "關鍵活動:e(i)=l(i),構成關鍵路徑", "en": "Critical activity: e(i)=l(i), forming the critical path" }
        ] }
      ] },
    { "heading": { "zh": "兩趟掃描", "en": "Two Passes" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "依拓樸序做 forward pass 求 ee。", "en": "Forward pass in topological order to get ee." },
          { "zh": "依反拓樸序做 backward pass 求 le。", "en": "Backward pass in reverse topological order to get le." },
          { "zh": "活動 (u,v,w) 關鍵 ⟺ ee[u] = le[v] − w。", "en": "Activity (u,v,w) is critical iff ee[u] = le[v] − w." }
        ] },
        { "type": "math", "tex": "ee(v) = \\max_{(u,v)\\in E}\\, ee(u)+w(u,v)", "caption": { "zh": "forward pass 遞迴式", "en": "Forward-pass recurrence" } }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "時間 O(V+E);空間 O(V+E)", "en": "Time O(V+E); Space O(V+E)" },
          { "zh": "關鍵路徑長 = ee(sink) = 專案最短完工時間", "en": "Critical-path length = ee(sink) = minimum project completion time" }
        ] }
      ] }
  ]
};
SLIDES_DB["expr-infix-postfix"] = {
  "category": "Linear Structures",
  "title": { "zh": "中序轉後序與求值", "en": "Infix → Postfix & Evaluation" },
  "slides": [
    { "heading": { "zh": "為什麼用後序式", "en": "Why Postfix" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "後序式(逆波蘭)不需括號與優先權規則,適合用堆疊機械式求值。", "en": "Postfix (reverse Polish) needs no parentheses or precedence rules and is evaluated mechanically with a stack." } }
      ] },
    { "heading": { "zh": "Shunting-Yard 轉換", "en": "Shunting-Yard Conversion" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "運算元直接輸出。", "en": "Operands go straight to output." },
          { "zh": "運算子:先彈出堆疊中優先權 ≥ 自己者,再入堆疊。", "en": "Operator: pop operators with precedence ≥ its own, then push." },
          { "zh": "( 入堆疊;) 彈出到 ( 為止。", "en": "Push ( ; on ) pop until (." },
          { "zh": "掃描完畢,彈出剩餘運算子。", "en": "At end, pop remaining operators." }
        ] },
        { "type": "code", "lang": "cpp", "file": "expr_infix_postfix.cpp", "code": "while (!ops.empty() && ops.top() != '(' &&\n       prec(ops.top()) >= prec(c)) {\n    out += ops.top(); out += ' '; ops.pop();\n}\nops.push(c);" }
      ] },
    { "heading": { "zh": "後序求值", "en": "Postfix Evaluation" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "由左到右掃描:遇運算元入堆疊,遇運算子彈出兩個、運算後推回。", "en": "Scan left to right: push operands; on an operator pop two, compute, push the result." } },
        { "type": "note", "text": { "zh": "例:A*(B+C)*D → A B C + * D *", "en": "e.g. A*(B+C)*D → A B C + * D *" } }
      ] }
  ]
};
```

- [ ] **Step 2: Build and verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c slides_db.js && echo "slides_db OK"
npm run build:slides
ls slides/zh/graph-aoe.md slides/en/graph-aoe.md slides/zh/expr-infix-postfix.md slides/en/expr-infix-postfix.md
```
Expected: `slides_db OK`; build prints `Generated N decks` (N +2); all four md files exist.

- [ ] **Step 3: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add slides_db.js slides_rendered.js slides/zh/graph-aoe.md slides/en/graph-aoe.md slides/zh/expr-infix-postfix.md slides/en/expr-infix-postfix.md
git commit -m "feat(viz): bilingual slides decks for graph-aoe & expr-infix-postfix"
```

---

## Task 9: Playwright E2E

**Files:** Create `tests/graph_aoe.spec.js`, `tests/expr_infix_postfix.spec.js`.

- [ ] **Step 1: Write `tests/expr_infix_postfix.spec.js`**
```js
const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Infix → Postfix', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'expr-infix-postfix');
    });

    test('steps through convert then eval; postfix shown; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="expr-infix-postfix"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('expr_infix_postfix.cpp');
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 20; i++) await step.click();
        await expect(sec.locator('.expr-phasebadge')).toContainText('A B C + * D *');
    });
});
```

- [ ] **Step 2: Write `tests/graph_aoe.spec.js`**
```js
const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('AOE / Critical Path', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'graph-aoe');
    });

    test('renders graph + ee/le table, steps to critical path; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="graph-aoe"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('graph_aoe.cpp');
        await expect(sec.locator('.aoe-svg')).toBeVisible();
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 25; i++) await step.click();
        // After all steps, the ee/le table shows the sink's project length 18.
        await expect(sec.locator('.aoe-tbl')).toContainText('18');
    });
});
```

- [ ] **Step 3: Run the new specs**
```bash
cd /Users/skhuang/course/dsvisual
npx playwright test tests/expr_infix_postfix.spec.js tests/graph_aoe.spec.js --reporter=line
```
Expected: both PASS. If navigation fails, confirm the method ids appear in the nav (they should after Task 4) and that `loadMethod` matches `tests/tree_traversal.spec.js`.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add tests/expr_infix_postfix.spec.js tests/graph_aoe.spec.js
git commit -m "test(viz): E2E for graph-aoe & expr-infix-postfix"
```

---

## Task 10: Full suite + README + finish

**Files:** Modify `README.md`.

- [ ] **Step 1: README rows**

In `README.md`, add to the relevant Supported Algorithms tables:
```
| AOE / Critical Path | Forward/backward pass, critical activities |
| Infix → Postfix | Shunting-yard conversion + stack evaluation |
```

- [ ] **Step 2: Full suite**

Run: `cd /Users/skhuang/course/dsvisual && npm run test:all`
Expected: unit (including 2 new files) + Playwright all PASS. If `tests/i18n.spec.js` (or any test) asserts a hardcoded method/tile count, update it to the new count (+2) and include in the commit; report the change. If anything else FAILS, STOP and report BLOCKED.

- [ ] **Step 3: Clean-build check**
```bash
cd /Users/skhuang/course/dsvisual
node build_db.js && npm run build:slides
git status --porcelain
```
Expected: no diffs to `code_db.js` / `slides_rendered.js` / `slides/`.

- [ ] **Step 4: Commit and finish**
```bash
cd /Users/skhuang/course/dsvisual
git add README.md
git commit -m "docs(viz): list graph-aoe & expr-infix-postfix in README"
```
Then use **superpowers:finishing-a-development-branch** for `feat/tier1-batch-a`.

---

## Self-Review notes

- **Spec coverage (Batch A):** graph-aoe (Tasks 2,6,8) and expr-infix-postfix (Tasks 1,5,8) per spec §3.1–3.2; shared pattern §2 (Tasks 3,4,7,9); acceptance §5 (Task 10).
- **Known verify-at-implementation points (explicit, not placeholders):** Task 10 Step 2 anticipates a hardcoded count test (i18n.spec) needing +2 — same as the previous batch; instruction given.
- **Type/name consistency:** module APIs (`tokenize`, `buildShuntingYardFrames`, `buildPostfixEvalFrames`; `AOE_PRESET`, `topoOrder`, `buildAoeFrames`) match across modules, tests, and renderers. Globals `window.ExprViz` / `window.AoeViz` match index.html load + renderer usage. Method ids `graph-aoe` / `expr-infix-postfix` consistent across METHOD_GROUPS, getCodeForMethod, updateLayout, renderAll, i18n, desc_db, slides, tests.
- **Alignment caveat avoided:** graph-aoe uses inline SVG circles (not `.tree-node`), so the translate(-50%,-50%) edge-offset issue does not apply; expr uses flat cells.
