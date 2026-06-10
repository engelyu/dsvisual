# Tier-2 Batch E1: Maze Backtracking + Doubly/Circular Linked List — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two dsvisual visualizations — `maze-stack` (stack-backtracking maze solver) and `list-doubly` (doubly / circular linked list) — in the `linear` group, each with Step/Run/Reset (inherits Pause/Resume + speed), bilingual UI + slides, and tests.

**Architecture:** Pure frame-generators in `js/maze_stack_viz.js` / `js/list_doubly_viz.js` (dual-export, like `js/heap_models.js`), unit-tested under `node --test`. DOM renderers (`renderMazeStack`, `renderListDoubly`) in `js/app.js` using `acquireDynamicVizHost()` + `buildStepControls()`. Grid/box based (no `.tree-node`). Files live under the reorganized `cpp/` + `js/` layout.

**Tech Stack:** Vanilla JS (IIFE modules + browser globals), Node test runner, Playwright, Marp slides.

**Spec:** `docs/superpowers/specs/2026-06-09-tier2-visualizations-design.md` (§3.1 maze-stack, §3.2 list-doubly).

---

## File Structure
- `js/maze_stack_viz.js`, `js/list_doubly_viz.js` (new pure modules)
- `cpp/maze_stack.cpp`, `cpp/list_doubly.cpp` (new C++ refs)
- `tests/unit/maze_stack_viz.test.js`, `tests/unit/list_doubly_viz.test.js` (new)
- `tests/maze_stack.spec.js`, `tests/list_doubly.spec.js` (new E2E)
- modify: `js/app.js`, `build_db.js`, `js/i18n.js`, `js/desc_db.js`, `slides_db.js`, `index.html`, `style.css`
- regenerated: `js/code_db.js`, `js/slides_rendered.js` (+ slides md)

---

## Task 1: Feature branch + maze-stack pure module (TDD)

**Files:** Create `js/maze_stack_viz.js`, `tests/unit/maze_stack_viz.test.js`.

- [ ] **Step 1: Branch**
```bash
cd /Users/skhuang/course/dsvisual
git checkout main && git pull --ff-only
git checkout -b feat/tier2-batch-e1
git branch --show-current
```
Expected: `feat/tier2-batch-e1`.

- [ ] **Step 2: Write the failing unit test**

Create `tests/unit/maze_stack_viz.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { parseMaze, buildMazeFrames } = require('../../js/maze_stack_viz');

const SOLVABLE = 'S....;.###.;.#...;.#.#.;...#E';
const UNSOLVABLE = 'S..;.##;.#E';

test('parseMaze locates S and E', () => {
  const m = parseMaze(SOLVABLE);
  assert.deepEqual(m.start, [0, 0]);
  assert.deepEqual(m.end, [4, 4]);
  assert.equal(m.rows, 5);
  assert.equal(m.cols, 5);
});

test('solvable maze yields a valid path from S to E', () => {
  const m = parseMaze(SOLVABLE);
  const { path } = buildMazeFrames(m);
  assert.ok(path, 'expected a path');
  assert.deepEqual(path[0], [0, 0]);
  assert.deepEqual(path[path.length - 1], [4, 4]);
  for (let i = 1; i < path.length; i++) {
    const d = Math.abs(path[i][0] - path[i - 1][0]) + Math.abs(path[i][1] - path[i - 1][1]);
    assert.equal(d, 1, 'consecutive cells must be adjacent');
  }
  for (const [r, c] of path) assert.notEqual(m.grid[r][c], '#', 'path must avoid walls');
});

test('unsolvable maze yields no path and empties the stack', () => {
  const m = parseMaze(UNSOLVABLE);
  const { frames, path } = buildMazeFrames(m);
  assert.equal(path, null);
  assert.equal(frames[frames.length - 1].stack.length, 0);
});

test('frames carry bilingual msg and stack/visited snapshots', () => {
  const { frames } = buildMazeFrames(parseMaze(SOLVABLE));
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); assert.ok(Array.isArray(f.stack) && Array.isArray(f.visited)); }
});
```

- [ ] **Step 3: Run — expect FAIL**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/maze_stack_viz.test.js`
Expected: FAIL — `Cannot find module '../../js/maze_stack_viz'`.

- [ ] **Step 4: Implement `js/maze_stack_viz.js`**

Create `js/maze_stack_viz.js`:
```js
(function (global) {
  const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // N, E, S, W

  function parseMaze(text) {
    const grid = String(text).split(';').map((row) => row.split(''));
    let start = null, end = null;
    for (let r = 0; r < grid.length; r++)
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === 'S') start = [r, c];
        else if (grid[r][c] === 'E') end = [r, c];
      }
    return { grid, start, end, rows: grid.length, cols: grid[0] ? grid[0].length : 0 };
  }

  function buildMazeFrames(maze) {
    const { grid, start, end, rows } = maze;
    const key = (r, c) => r + ',' + c;
    const open = (r, c) => r >= 0 && r < rows && c >= 0 && grid[r] && c < grid[r].length && grid[r][c] !== '#';
    const visited = new Set();
    const stack = [];
    const frames = [];
    const snap = (current, action, path, msg) => frames.push({
      current: current ? current.slice() : null,
      visited: Array.from(visited).map((s) => s.split(',').map(Number)),
      stack: stack.map((p) => p.slice()),
      action, path: path ? path.map((p) => p.slice()) : null, msg
    });
    if (!start || !end) { snap(null, 'deadend', null, { zh: '缺少起點或終點', en: 'Missing start or end' }); return { frames, path: null }; }

    stack.push(start); visited.add(key(start[0], start[1]));
    snap(start, 'visit', null, { zh: '從起點 S 開始,推入堆疊', en: 'Start at S; push onto stack' });
    let found = null;
    while (stack.length) {
      const [r, c] = stack[stack.length - 1];
      if (r === end[0] && c === end[1]) { found = stack.map((p) => p.slice()); snap([r, c], 'found', found, { zh: '到達終點 E!堆疊內容即為路徑', en: 'Reached E! The stack is the path' }); break; }
      let moved = false;
      for (const [dr, dc] of DIRS) {
        const nr = r + dr, nc = c + dc;
        if (open(nr, nc) && !visited.has(key(nr, nc))) {
          visited.add(key(nr, nc)); stack.push([nr, nc]);
          snap([nr, nc], 'visit', null, { zh: '前進到 (' + nr + ',' + nc + '),推入堆疊', en: 'Advance to (' + nr + ',' + nc + '); push' });
          moved = true; break;
        }
      }
      if (!moved) { const dead = stack.pop(); snap(dead, 'backtrack', null, { zh: '死路,回溯(彈出)', en: 'Dead end; backtrack (pop)' }); }
    }
    if (!found) snap(null, 'deadend', null, { zh: '堆疊已空,此迷宮無解', en: 'Stack empty; maze has no solution' });
    return { frames, path: found };
  }

  const api = { parseMaze, buildMazeFrames, DIRS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.MazeViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 5: Run — expect PASS**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/maze_stack_viz.test.js`
Expected: PASS — 4 tests (`# pass 4`, `# fail 0`). If the solvable-path test fails, STOP and report the actual `path` returned.

- [ ] **Step 6: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/maze_stack_viz.js tests/unit/maze_stack_viz.test.js
git commit -m "feat(viz): maze stack-backtracking pure frame generator + unit tests"
```

---

## Task 2: list-doubly pure module (TDD)

**Files:** Create `js/list_doubly_viz.js`, `tests/unit/list_doubly_viz.test.js`.

- [ ] **Step 1: Write the failing unit test**

Create `tests/unit/list_doubly_viz.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { buildNodes, buildDoublyFrames } = require('../../js/list_doubly_viz');

test('non-circular: ends are null, neighbours consistent', () => {
  const nodes = buildNodes([10, 20, 30], false);
  assert.equal(nodes[0].prevVal, null);
  assert.equal(nodes[2].nextVal, null);
  for (let i = 0; i < nodes.length - 1; i++) {
    assert.equal(nodes[i].nextVal, nodes[i + 1].val);
    assert.equal(nodes[i + 1].prevVal, nodes[i].val);
  }
});

test('circular: head.prev = tail, tail.next = head', () => {
  const nodes = buildNodes([10, 20, 30], true);
  assert.equal(nodes[0].prevVal, 30);
  assert.equal(nodes[2].nextVal, 10);
});

test('frames cover forward then backward traversal with bilingual msg', () => {
  const { frames } = buildDoublyFrames([10, 20, 30], false);
  const dirs = new Set(frames.map((f) => f.dir));
  assert.ok(dirs.has('forward'));
  assert.ok(dirs.has('backward'));
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); assert.ok(Array.isArray(f.nodes)); }
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/list_doubly_viz.test.js`
Expected: FAIL — `Cannot find module '../../js/list_doubly_viz'`.

- [ ] **Step 3: Implement `js/list_doubly_viz.js`**

Create `js/list_doubly_viz.js`:
```js
(function (global) {
  function buildNodes(vals, circular) {
    const n = vals.length;
    return vals.map((v, i) => ({
      val: v,
      prevVal: i > 0 ? vals[i - 1] : (circular && n > 0 ? vals[n - 1] : null),
      nextVal: i < n - 1 ? vals[i + 1] : (circular && n > 0 ? vals[0] : null),
    }));
  }

  function buildDoublyFrames(vals, circular) {
    const nodes = buildNodes(vals, circular);
    const frames = [];
    const snap = (current, dir, msg) => frames.push({
      nodes: nodes.map((x) => ({ val: x.val, prevVal: x.prevVal, nextVal: x.nextVal })),
      current, dir, circular: !!circular, msg
    });
    snap(-1, 'forward', { zh: '建立雙向' + (circular ? '環狀' : '') + '串列', en: 'Build the ' + (circular ? 'circular ' : '') + 'doubly linked list' });
    for (let i = 0; i < nodes.length; i++) snap(i, 'forward', { zh: '沿 next 前進到 ' + nodes[i].val, en: 'Follow next to ' + nodes[i].val });
    for (let i = nodes.length - 1; i >= 0; i--) snap(i, 'backward', { zh: '沿 prev 回到 ' + nodes[i].val, en: 'Follow prev back to ' + nodes[i].val });
    snap(-1, 'forward', { zh: '完成正向與反向走訪', en: 'Forward & backward traversal complete' });
    return { frames, nodes };
  }

  const api = { buildNodes, buildDoublyFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.DoublyViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run — expect PASS**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/list_doubly_viz.test.js`
Expected: PASS — 3 tests (`# pass 3`, `# fail 0`).

- [ ] **Step 5: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/list_doubly_viz.js tests/unit/list_doubly_viz.test.js
git commit -m "feat(viz): doubly/circular linked-list pure frame generator + unit tests"
```

---

## Task 3: C++ references + code_db regeneration

**Files:** Create `cpp/maze_stack.cpp`, `cpp/list_doubly.cpp`; modify `build_db.js`; regenerate `js/code_db.js`.

- [ ] **Step 1: Create `cpp/maze_stack.cpp`**
```cpp
#include <vector>
#include <stack>
#include <string>

// Maze solving by DFS with an explicit stack (the stack IS the current path).
struct Cell { int r, c; };

bool solveMaze(std::vector<std::string>& grid, Cell start, Cell end, std::vector<Cell>& path) {
    const int R = (int)grid.size();
    const int dr[4] = { -1, 0, 1, 0 }, dc[4] = { 0, 1, 0, -1 };
    auto open = [&](int r, int c) {
        return r >= 0 && r < R && c >= 0 && c < (int)grid[r].size() && grid[r][c] != '#';
    };
    std::vector<std::vector<bool>> seen(R, std::vector<bool>());
    for (int r = 0; r < R; r++) seen[r].assign(grid[r].size(), false);
    std::stack<Cell> st;
    st.push(start); seen[start.r][start.c] = true;
    while (!st.empty()) {
        Cell cur = st.top();
        if (cur.r == end.r && cur.c == end.c) {
            std::stack<Cell> tmp = st;
            while (!tmp.empty()) { path.push_back(tmp.top()); tmp.pop(); }
            return true;
        }
        bool moved = false;
        for (int k = 0; k < 4; k++) {
            int nr = cur.r + dr[k], nc = cur.c + dc[k];
            if (open(nr, nc) && !seen[nr][nc]) { seen[nr][nc] = true; st.push({ nr, nc }); moved = true; break; }
        }
        if (!moved) st.pop();
    }
    return false;
}
```

- [ ] **Step 2: Create `cpp/list_doubly.cpp`**
```cpp
#include <cstddef>

// Doubly linked list (optionally circular).
struct Node { int val; Node* prev; Node* next; };

class DoublyList {
    Node* head = nullptr;
    Node* tail = nullptr;
    bool circular = false;
public:
    explicit DoublyList(bool circ) : circular(circ) {}

    void pushBack(int v) {
        Node* n = new Node{ v, tail, nullptr };
        if (!head) { head = tail = n; }
        else { tail->next = n; tail = n; }
        if (circular) { tail->next = head; head->prev = tail; }
    }

    // Insert v before the node at position idx (0-based).
    void insertAt(int idx, int v) {
        if (idx <= 0 || !head) { /* prepend or empty */ pushFront(v); return; }
        Node* cur = head;
        for (int i = 0; i < idx && cur->next && cur->next != head; i++) cur = cur->next;
        Node* n = new Node{ v, cur, cur->next };
        if (cur->next) cur->next->prev = n;
        cur->next = n;
        if (n->next == head && circular) head->prev = n;
        if (cur == tail) tail = n;
    }

    void pushFront(int v) {
        Node* n = new Node{ v, nullptr, head };
        if (head) head->prev = n;
        head = n;
        if (!tail) tail = n;
        if (circular) { head->prev = tail; tail->next = head; }
    }
};
```

- [ ] **Step 3: Register in `build_db.js`**

In `build_db.js` `mappings`, add:
```js
    'maze_stack.cpp': 'codeMazeStack',
    'list_doubly.cpp': 'codeListDoubly',
```

- [ ] **Step 4: Regenerate + verify**
```bash
cd /Users/skhuang/course/dsvisual
node build_db.js
grep -c 'const codeMazeStack' js/code_db.js
grep -c 'const codeListDoubly' js/code_db.js
```
Expected: build no error; both counts `1`.

- [ ] **Step 5: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add cpp/maze_stack.cpp cpp/list_doubly.cpp build_db.js js/code_db.js
git commit -m "feat(viz): C++ refs for maze & doubly list; regen code_db"
```

---

## Task 4: app.js registration + index.html

**Files:** Modify `js/app.js`, `index.html`.

- [ ] **Step 1: Register methods in METHOD_GROUPS**

In `js/app.js`, in the `linear` group's `methods` array, after the `expr-infix-postfix` entry (`{ id: 'expr-infix-postfix', ... }`) add:
```js
            { id: 'maze-stack', title: 'Maze (Stack Backtracking)', file: 'maze_stack.cpp', visualizer: 'maze', controls: 'maze' },
            { id: 'list-doubly', title: 'Doubly / Circular Linked List', file: 'list_doubly.cpp', visualizer: 'doubly', controls: 'doubly' },
```

- [ ] **Step 2: code lookup in getCodeForMethod()**

In `js/app.js` `codeByMethod`, add:
```js
        'maze-stack': codeMazeStack,
        'list-doubly': codeListDoubly,
```

- [ ] **Step 3: updateLayout() branches**

After the existing `else if (currentMode === 'expr-infix-postfix') { ... }` block, add:
```js
        else if (currentMode === 'maze-stack') {
            codeTitle.textContent = 'maze_stack.cpp';
            codeDisplay.textContent = codeMazeStack;
        }
        else if (currentMode === 'list-doubly') {
            codeTitle.textContent = 'list_doubly.cpp';
            codeDisplay.textContent = codeListDoubly;
        }
```

- [ ] **Step 4: renderAll() dispatch — ORDER MATTERS**

In `js/app.js` `renderAll()`, find `else if (currentMode === 'expr-infix-postfix') renderExprInfixPostfix();` and add immediately AFTER it:
```js
        else if (currentMode === 'maze-stack') renderMazeStack();
        else if (currentMode === 'list-doubly') renderListDoubly();
```
CRITICAL: there is a later generic `else if (currentMode.includes('list-')) renderLists();`. The new `list-doubly` branch MUST appear BEFORE it (inserting right after the `expr-infix-postfix` dispatch satisfies this). Verify in Step 7.

- [ ] **Step 5: stubs**

Before `function renderSegmentTree()`, add:
```js
    function renderMazeStack() { const host = acquireDynamicVizHost(); host.textContent = 'maze-stack (pending)'; }
    function renderListDoubly() { const host = acquireDynamicVizHost(); host.textContent = 'list-doubly (pending)'; }
```

- [ ] **Step 6: index.html — load modules**

After `<script src="js/poly_padd_viz.js"></script>`, add:
```html
    <script src="js/maze_stack_viz.js"></script>
    <script src="js/list_doubly_viz.js"></script>
```

- [ ] **Step 7: Verify (including dispatch order)**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/app.js && echo "app.js OK"
node -e "require('./js/maze_stack_viz.js'); require('./js/list_doubly_viz.js'); console.log('modules load OK')"
grep -c "id: 'maze-stack'" js/app.js
grep -c "id: 'list-doubly'" js/app.js
grep -c "function renderMazeStack" js/app.js
grep -c "function renderListDoubly" js/app.js
grep -c 'maze_stack_viz.js' index.html
grep -c 'list_doubly_viz.js' index.html
awk "/currentMode === 'list-doubly'/{a=NR} /includes\('list-'\)/{b=NR} END{ if(a&&b&&a<b) print \"ORDER OK\"; else print \"ORDER BAD: list-doubly=\"a\" generic=\"b }" js/app.js
```
Expected: `app.js OK`, `modules load OK`, six `1`s, `ORDER OK`. If `ORDER BAD`, move the `list-doubly` dispatch above the generic `includes('list-')` line. If `node -c` fails, STOP/BLOCKED.

- [ ] **Step 8: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js index.html
git commit -m "feat(viz): register maze-stack & list-doubly; load modules"
```

---

## Task 5: `renderMazeStack()` + CSS

**Files:** Modify `js/app.js` (replace stub), `style.css`.

- [ ] **Step 1: Replace the `renderMazeStack` stub**

In `js/app.js`, replace the `renderMazeStack` stub line with:
```js
    let _mazeState = null;
    function renderMazeStack() {
        const host = acquireDynamicVizHost();
        if (!_mazeState) _mazeState = { text: 'S....;.###.;.#...;.#.#.;...#E' };
        const st = _mazeState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const maze = MazeViz.parseMaze(st.text);
        const res = MazeViz.buildMazeFrames(maze);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="mz-controls"><input type="text" class="mz-input" value="' + st.text + '">' +
            '<button type="button" class="mz-apply">Apply</button>' +
            '<span class="sm-hint"># wall, . open, S start, E end; rows split by ;</span></div>' +
            '<div class="mz-cols"><div class="mz-grid"></div><div class="mz-stack"><strong>Path stack:</strong><div class="mz-stack-cells"></div></div></div>' +
            '<div class="mz-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.mz-grid')) return;
            const inStack = new Set((fr.stack || []).map((p) => p[0] + ',' + p[1]));
            const inPath = new Set((fr.path || []).map((p) => p[0] + ',' + p[1]));
            const visited = new Set((fr.visited || []).map((p) => p[0] + ',' + p[1]));
            const cur = fr.current ? fr.current[0] + ',' + fr.current[1] : '';
            let html = '<table class="mz-tbl">';
            for (let r = 0; r < maze.grid.length; r++) {
                html += '<tr>';
                for (let c = 0; c < maze.grid[r].length; c++) {
                    const ch = maze.grid[r][c];
                    const k = r + ',' + c;
                    let cls = ch === '#' ? 'wall' : 'open';
                    if (ch === 'S') cls = 'start';
                    else if (ch === 'E') cls = 'end';
                    if (inPath.has(k)) cls += ' path';
                    else if (k === cur) cls += ' cur';
                    else if (inStack.has(k)) cls += ' instack';
                    else if (visited.has(k)) cls += ' visited';
                    html += '<td class="mz-cell ' + cls + '">' + (ch === '#' ? '' : (ch === 'S' || ch === 'E' ? ch : '')) + '</td>';
                }
                html += '</tr>';
            }
            html += '</table>';
            host.querySelector('.mz-grid').innerHTML = html;
            host.querySelector('.mz-stack-cells').innerHTML = (fr.stack || []).map((p) => '<span class="mz-scell">(' + p[0] + ',' + p[1] + ')</span>').join('');
            host.querySelector('.mz-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 500));
        paint();
        host.querySelector('.mz-apply').onclick = () => { const v = host.querySelector('.mz-input').value.trim(); if (v) { st.text = v; renderMazeStack(); } };
    }
```

- [ ] **Step 2: Append CSS**

Append to `style.css`:
```css
.mz-controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 10px; }
.mz-controls .mz-input { flex: 1; min-width: 220px; }
.mz-cols { display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap; }
.mz-tbl { border-collapse: collapse; }
.mz-cell { width: 30px; height: 30px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700; }
.mz-cell.wall { background: #334155; }
.mz-cell.open { background: #fff; }
.mz-cell.start { background: #22c55e; color: #fff; }
.mz-cell.end { background: #ef4444; color: #fff; }
.mz-cell.visited { background: #e0e7ff; }
.mz-cell.instack { background: #bfdbfe; }
.mz-cell.cur { background: #f59e0b; }
.mz-cell.path { background: #fde047; }
.mz-stack-cells { display: flex; flex-direction: column-reverse; gap: 2px; margin-top: 4px; }
.mz-scell { display: inline-block; padding: 2px 8px; background: #e2e8f0; border: 1px solid #cbd5e1; border-radius: 4px; text-align: center; }
.mz-phase { margin-top: 6px; color: #1e40af; font-style: italic; }
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/app.js && echo "app.js OK"
grep -c "maze-stack (pending)" js/app.js
node --test tests/unit/maze_stack_viz.test.js 2>&1 | grep -E 'pass [0-9]|fail [0-9]'
```
Expected: `app.js OK`; stub count `0`; unit pass 4 / fail 0.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js style.css
git commit -m "feat(viz): implement renderMazeStack (grid + path stack) + styles"
```

---

## Task 6: `renderListDoubly()` + CSS

**Files:** Modify `js/app.js` (replace stub), `style.css`.

- [ ] **Step 1: Replace the `renderListDoubly` stub**

In `js/app.js`, replace the `renderListDoubly` stub line with:
```js
    let _doublyState = null;
    function renderListDoubly() {
        const host = acquireDynamicVizHost();
        if (!_doublyState) _doublyState = { vals: [10, 20, 30, 40], circular: false };
        const st = _doublyState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const res = DoublyViz.buildDoublyFrames(st.vals, st.circular);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="dl-controls">' +
              '<input type="text" class="dl-input" value="' + st.vals.join(',') + '">' +
              '<label><input type="checkbox" class="dl-circular"' + (st.circular ? ' checked' : '') + '> circular</label>' +
              '<button type="button" class="dl-apply">Apply</button>' +
            '</div>' +
            '<div class="dl-row' + (st.circular ? ' dl-circular-on' : '') + '"></div>' +
            '<div class="dl-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.dl-row')) return;
            host.querySelector('.dl-row').innerHTML = fr.nodes.map((n, i) =>
                '<span class="dl-node' + (i === fr.current ? ' cur' : '') + '">' +
                  '<span class="dl-ptr">' + (n.prevVal == null ? '∅' : n.prevVal) + '</span>' +
                  '<span class="dl-val">' + n.val + '</span>' +
                  '<span class="dl-ptr">' + (n.nextVal == null ? '∅' : n.nextVal) + '</span>' +
                '</span>' + (i < fr.nodes.length - 1 ? '<span class="dl-link">⇄</span>' : '')
            ).join('') + (fr.circular ? '<span class="dl-wrap">↩ circular</span>' : '');
            host.querySelector('.dl-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 600));
        paint();
        host.querySelector('.dl-apply').onclick = () => {
            const vals = host.querySelector('.dl-input').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite);
            const circular = host.querySelector('.dl-circular').checked;
            if (vals.length) { st.vals = vals; st.circular = circular; renderListDoubly(); }
        };
    }
```

- [ ] **Step 2: Append CSS**

Append to `style.css`:
```css
.dl-controls { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; }
.dl-controls .dl-input { flex: 1; min-width: 160px; }
.dl-row { display: flex; align-items: center; flex-wrap: wrap; gap: 2px; }
.dl-node { display: inline-flex; align-items: stretch; border: 2px solid #1e40af; border-radius: 6px; overflow: hidden; }
.dl-node.cur { border-color: #f59e0b; box-shadow: 0 0 0 2px #fde68a; }
.dl-ptr { background: #e2e8f0; color: #475569; padding: 6px 6px; font-size: 12px; min-width: 22px; text-align: center; }
.dl-val { background: #fff; padding: 6px 12px; font-weight: 700; }
.dl-link { color: #64748b; font-size: 18px; padding: 0 2px; }
.dl-wrap { margin-left: 10px; color: #7c3aed; font-weight: 600; }
.dl-phase { margin-top: 8px; color: #1e40af; font-style: italic; }
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/app.js && echo "app.js OK"
grep -c "list-doubly (pending)" js/app.js
node --test tests/unit/list_doubly_viz.test.js 2>&1 | grep -E 'pass [0-9]|fail [0-9]'
```
Expected: `app.js OK`; stub count `0`; unit pass 3 / fail 0.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js style.css
git commit -m "feat(viz): implement renderListDoubly (prev/next + circular) + styles"
```

---

## Task 7: i18n + desc_db

**Files:** Modify `js/i18n.js`, `js/desc_db.js`.

- [ ] **Step 1: i18n method names (both locales)**

In `js/i18n.js` `en` block:
```js
        'method.maze-stack': 'Maze (Stack Backtracking)',
        'method.list-doubly': 'Doubly / Circular Linked List',
```
In the `zh` block:
```js
        'method.maze-stack': '迷宮(堆疊回溯)',
        'method.list-doubly': '雙向 / 環狀串列',
```

- [ ] **Step 2: desc_db entries**

In `js/desc_db.js`, before the closing `};` add:
```js
    'maze-stack': `
        <h3>Maze Solving — Stack Backtracking</h3>
        <p>Depth-first search with an explicit stack; the stack holds the current path.</p>
        <hr>
        <ul>
            <li><strong>Advance:</strong> push the first unvisited open neighbour</li>
            <li><strong>Dead end:</strong> pop (backtrack)</li>
            <li><strong>Found:</strong> the stack from S to E is the path</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(R·C)</span>
            <span class="badge space">Space: O(R·C)</span>
        </div>
    `,
    'list-doubly': `
        <h3>Doubly / Circular Linked List</h3>
        <p>Each node has prev and next pointers, enabling forward and backward traversal.</p>
        <hr>
        <ul>
            <li><strong>Doubly:</strong> ends point to null</li>
            <li><strong>Circular:</strong> head.prev = tail, tail.next = head</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Insert/Delete at node: O(1)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/i18n.js && echo "i18n OK"
node -c js/desc_db.js && echo "desc OK"
grep -c 'method.maze-stack' js/i18n.js
grep -c 'method.list-doubly' js/i18n.js
```
Expected: both OK; both counts `2`.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/i18n.js js/desc_db.js
git commit -m "feat(viz): i18n names + desc_db for maze-stack & list-doubly"
```

---

## Task 8: slides decks + build

**Files:** Modify `slides_db.js`; regenerate.

- [ ] **Step 1: Append two decks**

In `slides_db.js` (repo root), before `module.exports = SLIDES_DB;`, add:
```js
SLIDES_DB["maze-stack"] = {
  "category": "Linear Structures",
  "title": { "zh": "迷宮回溯(堆疊)", "en": "Maze Backtracking (Stack)" },
  "slides": [
    { "heading": { "zh": "用堆疊解迷宮", "en": "Solving a Maze with a Stack" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "深度優先搜尋用顯式堆疊記錄目前路徑;走得通就推入,走不通就彈出回溯。", "en": "Depth-first search keeps the current path on an explicit stack: push when you can advance, pop to backtrack." } },
        { "type": "steps", "items": [
          { "zh": "推入起點。", "en": "Push the start cell." },
          { "zh": "嘗試走到第一個未訪的通道鄰格並推入。", "en": "Move to the first unvisited open neighbour and push it." },
          { "zh": "無路可走則彈出(回溯)。", "en": "If stuck, pop (backtrack)." },
          { "zh": "到達終點時,堆疊即為解路徑。", "en": "When you reach the end, the stack is the solution path." }
        ] }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "每格最多訪一次:O(R·C)", "en": "Each cell visited at most once: O(R·C)" },
          { "zh": "堆疊/visited 空間 O(R·C)", "en": "Stack/visited space O(R·C)" }
        ] }
      ] }
  ]
};
SLIDES_DB["list-doubly"] = {
  "category": "Linear Structures",
  "title": { "zh": "雙向 / 環狀串列", "en": "Doubly / Circular Linked List" },
  "slides": [
    { "heading": { "zh": "雙向串列", "en": "Doubly Linked List" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "每個節點同時保有 prev 與 next 指標,可正向與反向走訪。", "en": "Each node holds both prev and next pointers, allowing forward and backward traversal." } },
        { "type": "note", "text": { "zh": "已知節點時,插入/刪除為 O(1)。", "en": "Given a node, insertion/deletion is O(1)." } }
      ] },
    { "heading": { "zh": "環狀串列", "en": "Circular Variant" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "尾節點的 next 指回頭節點。", "en": "The tail's next points back to the head." },
          { "zh": "頭節點的 prev 指向尾節點。", "en": "The head's prev points to the tail." },
          { "zh": "適合輪詢 / 環形緩衝等場景。", "en": "Useful for round-robin / ring buffers." }
        ] }
      ] }
  ]
};
```

- [ ] **Step 2: Build + verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c slides_db.js && echo "slides_db OK"
npm run build:slides
ls slides/zh/maze-stack.md slides/en/maze-stack.md slides/zh/list-doubly.md slides/en/list-doubly.md
```
Expected: `slides_db OK`; build prints `Generated N decks` (+2); all four md exist.

- [ ] **Step 3: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add slides_db.js js/slides_rendered.js slides/zh/maze-stack.md slides/en/maze-stack.md slides/zh/list-doubly.md slides/en/list-doubly.md
git commit -m "feat(viz): bilingual slides decks for maze-stack & list-doubly"
```

---

## Task 9: Playwright E2E

**Files:** Create `tests/maze_stack.spec.js`, `tests/list_doubly.spec.js`.

- [ ] **Step 1: Create `tests/maze_stack.spec.js`**
```js
const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Maze stack backtracking', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'maze-stack');
    });

    test('renders grid, steps to a found path; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="maze-stack"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('maze_stack.cpp');
        await expect(sec.locator('.mz-tbl')).toBeVisible();
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 40; i++) await step.click();
        await expect(sec.locator('.mz-cell.path').first()).toBeVisible();
    });
});
```

- [ ] **Step 2: Create `tests/list_doubly.spec.js`**
```js
const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Doubly / Circular Linked List', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'list-doubly');
    });

    test('renders nodes; circular toggle adds wrap indicator; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="list-doubly"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('list_doubly.cpp');
        await expect(sec.locator('.dl-node')).toHaveCount(4);
        await sec.locator('.dl-circular').check();
        await sec.locator('.dl-apply').click();
        await expect(sec.locator('.dl-wrap')).toBeVisible();
    });
});
```

- [ ] **Step 3: Run**
```bash
cd /Users/skhuang/course/dsvisual
npx playwright test tests/maze_stack.spec.js tests/list_doubly.spec.js --reporter=line
```
Expected: both PASS. If the maze path doesn't appear within 40 steps, increase the loop; if the doubly count differs, confirm `.dl-node` count matches the 4 default values. Do NOT commit failing tests; report BLOCKED if unresolved.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add tests/maze_stack.spec.js tests/list_doubly.spec.js
git commit -m "test(viz): E2E for maze-stack & list-doubly"
```

---

## Task 10: Full suite + README + finish

**Files:** Modify `README.md`.

- [ ] **Step 1: README rows**

In `README.md`, add to a fitting Supported Algorithms section:
```
| Maze (Stack Backtracking) | DFS with an explicit path stack |
| Doubly / Circular Linked List | prev/next pointers, forward & backward |
```

- [ ] **Step 2: Full suite**

Run: `cd /Users/skhuang/course/dsvisual && npm run test:all`
Expected: unit (incl. 2 new files) + Playwright all PASS. If a hardcoded method/tile COUNT test fails (e.g. `tests/i18n.spec.js` tile/category count, `tests/visualizer.spec.js` nav-button count), update it to the new count (+2 methods, same `linear` group so nav-button count is unchanged; tile/overview counts +2) and include it in the Step 4 commit; report old→new. If a NON-count test fails (e.g. an existing hover test overlapped by the now-taller `linear` dropdown), STOP and report BLOCKED.

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
git commit -m "docs(viz): list maze-stack & list-doubly in README"
```
Then use **superpowers:finishing-a-development-branch** for `feat/tier2-batch-e1`.

---

## Self-Review notes
- **Spec coverage (E1):** maze-stack §3.1 (Tasks 1,5,8), list-doubly §3.2 (Tasks 2,6,8); shared pattern §2 (Tasks 3,4,7,9); acceptance §5 (Task 10).
- **Dispatch order:** Task 4 guards that `list-doubly` precedes the generic `includes('list-')` catch-all (ORDER OK check). `maze-stack` has no catch-all collision.
- **Known verify-at-implementation points:** Task 10 Step 2 anticipates count-test updates (tile/overview +2; nav-button unchanged since same group) and a possible hover-overlap regression (the `linear` dropdown grows by 2 — but the zoom test already uses `stack-array` which is in `linear`; if that test now fails due to a taller dropdown overlapping, that's a real regression to STOP on).
- **Type/name consistency:** module APIs (`parseMaze`/`buildMazeFrames`; `buildNodes`/`buildDoublyFrames`) match across modules, tests, renderers. Globals `window.MazeViz` / `window.DoublyViz`. Method ids `maze-stack`/`list-doubly` consistent everywhere. Paths use `js/` and `cpp/`.
- **Fixtures verified by hand:** SOLVABLE maze `S....;.###.;.#...;.#.#.;...#E` has a valid S→E path (e.g. down col 0, across bottom, up col 2/3/4 to E); UNSOLVABLE `S..;.##;.#E` walls off E (its only neighbours (1,2) and (2,1) are `#`). buildNodes circular wiring asserted.
- **No tree → no alignment caveat;** both renderers are grid/box based.
- **Potential hover-overlap on `list-doubly` zoom:** N/A — `list-doubly` uses the standard dynamic host; zoom controls live in the card header, exercised only by the existing `stack-array` zoom test.
```
