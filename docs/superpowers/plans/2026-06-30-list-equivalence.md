# Linked-List Equivalence Class Visualization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `list-equivalence` visualization (in the `linear` group) that builds a linked-list adjacency from equivalence pairs and finds equivalence classes (connected components) via stack traversal — the classic Horowitz linked-list equivalence-class algorithm, complementing the tree-based `tree-dsu` (union-find).

**Architecture:** Pure dual-export module `js/list_equivalence_viz.js` (`buildAdjacency` + `equivalenceFrames` → `{frames, classes, seq}`, unit-tested) + `renderListEquivalence()` in the js/app.js closure (left: per-element linked-list chains; right: stack + marks + colored classes) using `acquireDynamicVizHost()` + `buildStepControls()`. Plus 4 wiring edits, cpp, bilingual slides, i18n, a `random_input` generator + 🎲, and E2E.

**Tech Stack:** Vanilla browser JS, `node --test`, Playwright, `node build_db.js`, `npm run build:slides`.

**Spec:** `docs/superpowers/specs/2026-06-30-list-equivalence-design.md`

## Global Constraints

- Input caps (Build handler clamps): n ≤ 12; pairs ≤ 20.
- Module is pure / DOM-free, dual-export IIFE like `js/heap_models.js` (`module.exports` + `global.ListEquivalenceViz`).
- Input pair format: `i=j` separated by comma or semicolon.
- No new group (goes in existing `linear`), so only the overview-tile count changes: 110 → 111. Categories stay 14, nav pills stay 15.
- CRITICAL renderAll ordering: `list-equivalence` contains substring `list-`; its exact-id branch MUST be placed BEFORE any generic `currentMode.includes('list-')` catch-all, or it gets swallowed.
- Reuse the recursion overflow fix: `host.style.width = '100%'` after `acquireDynamicVizHost()` (the shared helper already resets width per-acquire).
- Do NOT touch `js/cloud-config.js`.

---

## Task 1: Pure module `js/list_equivalence_viz.js` + unit tests

**Files:** Create `js/list_equivalence_viz.js`, `tests/unit/list_equivalence.test.js`

**Interfaces:**
- Produces: `parseInput(nText, pairsText)` → `{n, pairs:[[i,j],...]}`; `buildAdjacency(n, pairs)` → `seq` (array of neighbor arrays, head-insert order); `equivalenceFrames(n, pairs)` → `{frames, classes, seq}`; `DEFAULT` = `{n, pairs}`. Frame shapes: build `{phase:'build', pair:[i,j], seq}`; find `{phase:'find', active, event:'push'|'pop'|'scan'|'class-done', stack, out, classes, current, scanning?}`; final `{phase:'done', classes}`. `classes` = array of sorted-ascending arrays, ordered by smallest start element.

- [ ] **Step 1: Write the failing unit test** — create `tests/unit/list_equivalence.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert');
const V = require('../../js/list_equivalence_viz.js');

function componentsRef(n, pairs) {
  const parent = Array.from({ length: n }, (_, i) => i);
  function find(x) { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
  pairs.forEach(([a, b]) => { parent[find(a)] = find(b); });
  const map = {};
  for (let i = 0; i < n; i++) { const r = find(i); (map[r] = map[r] || []).push(i); }
  return Object.values(map).map((c) => c.slice().sort((a, b) => a - b)).sort((a, b) => a[0] - b[0]);
}

test('parseInput filters out-of-range, self-loops, and non-numeric', () => {
  const { n, pairs } = V.parseInput('5', '0=4, 3=1 ; 2=2, 9=1, x=3, 1=3');
  assert.strictEqual(n, 5);
  // 0=4 ok; 3=1 ok; 2=2 self-loop dropped; 9=1 out-of-range dropped; x=3 non-numeric dropped; 1=3 ok
  assert.deepStrictEqual(pairs, [[0, 4], [3, 1], [1, 3]]);
});

test('buildAdjacency is symmetric (j in seq[i] iff i in seq[j])', () => {
  const seq = V.buildAdjacency(5, [[0, 4], [3, 1]]);
  assert.ok(seq[0].includes(4) && seq[4].includes(0));
  assert.ok(seq[3].includes(1) && seq[1].includes(3));
  assert.deepStrictEqual(seq[2], []);
});

test('classes equal connected components (vs union-find reference)', () => {
  const cases = [
    V.DEFAULT,
    { n: 6, pairs: [[0, 1], [1, 2], [3, 4]] },
    { n: 4, pairs: [] },
    { n: 1, pairs: [] },
    { n: 5, pairs: [[0, 1], [1, 2], [2, 0], [3, 4]] }
  ];
  for (const { n, pairs } of cases) {
    const { classes } = V.equivalenceFrames(n, pairs);
    assert.deepStrictEqual(classes, componentsRef(n, pairs), JSON.stringify({ n, pairs }));
  }
});

test('classes partition 0..n-1', () => {
  const { n, pairs } = V.DEFAULT;
  const { classes } = V.equivalenceFrames(n, pairs);
  const flat = classes.flat().sort((a, b) => a - b);
  assert.deepStrictEqual(flat, Array.from({ length: n }, (_, i) => i));
});

test('edge: n=1 gives one singleton class; no pairs gives all singletons', () => {
  assert.deepStrictEqual(V.equivalenceFrames(1, []).classes, [[0]]);
  assert.deepStrictEqual(V.equivalenceFrames(3, []).classes, [[0], [1], [2]]);
});

test('frames non-empty; last frame is done with matching classes', () => {
  const { frames, classes } = V.equivalenceFrames(V.DEFAULT.n, V.DEFAULT.pairs);
  assert.ok(frames.length > 0);
  const last = frames[frames.length - 1];
  assert.strictEqual(last.phase, 'done');
  assert.deepStrictEqual(last.classes, classes);
  assert.ok(frames.some((f) => f.phase === 'build'));
  assert.ok(frames.some((f) => f.phase === 'find'));
});
```
Run `node --test tests/unit/list_equivalence.test.js` → FAIL (module missing).

- [ ] **Step 2: Implement `js/list_equivalence_viz.js`:**
```js
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
```
Run `node --test tests/unit/list_equivalence.test.js` → PASS (6 tests). Also `node --test tests/unit/*.test.js` (no regressions).

- [ ] **Step 3: Commit:**
```bash
git add js/list_equivalence_viz.js tests/unit/list_equivalence.test.js
git commit -m "feat: pure linked-list equivalence-class module

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: render + wiring + cpp + slides + i18n + random generator + E2E

**Files:** Create `cpp/list_equivalence.cpp`, `slides/{zh,en}/list-equivalence.md` (generated), `tests/list_equivalence.spec.js`; Modify `js/app.js`, `index.html`, `js/i18n.js`, `slides_db.js`, `build_db.js`, `js/code_db.js` (generated), `js/slides_rendered.js` (generated), `js/random_input.js`.

**Interfaces:**
- Consumes: `ListEquivalenceViz.equivalenceFrames/buildAdjacency/DEFAULT` (Task 1); `acquireDynamicVizHost()`, `buildStepControls(onStep, onReset, runIntervalMs)`, `getInputDifficulty()`, `window.RandomInput.randomInputFor`.

- [ ] **Step 1: Create `cpp/list_equivalence.cpp`:**
```cpp
// Equivalence classes via linked-list adjacency (Horowitz) + stack traversal
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    int n = 12;
    vector<pair<int,int>> rel = {{0,4},{3,1},{6,10},{8,9},{7,4},{6,8},{3,5},{2,11},{11,0}};
    vector<vector<int>> seq(n);
    for (auto& p : rel) { seq[p.first].push_back(p.second); seq[p.second].push_back(p.first); }

    vector<bool> out(n, false);
    for (int i = 0; i < n; ++i) {
        if (out[i]) continue;
        cout << "Class:";
        stack<int> st; st.push(i); out[i] = true;
        while (!st.empty()) {
            int j = st.top(); st.pop();
            cout << " " << j;
            for (int k : seq[j]) if (!out[k]) { out[k] = true; st.push(k); }
        }
        cout << "\n";
    }
    return 0;
}
```

- [ ] **Step 2: build_db** — add `list_equivalence.cpp` → `codeListEquivalence` to build_db.js (read it for the mapping format); run `node build_db.js`; verify `grep -c codeListEquivalence js/code_db.js` ≥1.

- [ ] **Step 3: index.html** — add `<script src="js/list_equivalence_viz.js"></script>` immediately before `<script src="js/app.js">`.

- [ ] **Step 4: METHOD_GROUPS** — in the `linear` group's methods array, add after the `list-doubly` entry:
```js
            { id: 'list-equivalence', title: 'Equivalence Classes (Linked List)', file: 'list_equivalence.cpp', visualizer: 'equiv', controls: 'equiv' },
```

- [ ] **Step 5: Implement `renderListEquivalence()` in js/app.js.** READ `renderRecursion()` first (host width:100% + buildStepControls + custom paint pattern). Structure:
  - `let _equivState = null;`
  - `if (!_equivState) _equivState = { n: ListEquivalenceViz.DEFAULT.n, pairs: ListEquivalenceViz.DEFAULT.pairs.map((p) => p.slice()) };`
  - `const host = acquireDynamicVizHost(); host.style.width = '100%';`
  - `const { frames } = ListEquivalenceViz.equivalenceFrames(_equivState.n, _equivState.pairs);`
  - `host.innerHTML`: controls row = `<input type="number" class="eq-n" min="1" max="12" value="${_equivState.n}">` + `<input type="text" class="eq-pairs" value="${_equivState.pairs.map((p)=>p[0]+'='+p[1]).join(',')}">` + `<button type="button" class="eq-build">Build</button>` + `<button type="button" class="rand-btn" title="Random">🎲</button>` + a two-region stage: `<div class="eq-adj"></div>` (adjacency chains) and `<div class="eq-find"></div>` (stack + classes) + a phase/status line.
  - `let idx = 0;`
  - `paint()`:
    - Adjacency region `.eq-adj`: render n rows, each `i → [chain]` from `frames[idx].seq` if present (build phase) else from the final `seq` (find phase); draw each `seq[i]` as linked-list node chips with arrows and a trailing `∅`/NULL. In build phase highlight `frames[idx].pair`'s two rows/newly-inserted heads.
    - Find region `.eq-find`: render the current `stack` (vertical, top = last), the `out[]` marks (e.g., dim processed elements), the completed `classes` as colored group boxes, and the `current` class being assembled; highlight `active` and `scanning` (from→to) when present.
    - Status: phase + (on `done`) the final class count.
  - `step()`: `if (idx < frames.length - 1) { idx++; paint(); return true; } return false;`
  - `reset()`: `idx = 0; paint();`
  - `paint(); host.appendChild(buildStepControls(step, reset, 700));`
  - `.eq-build` onclick (try/catch): `const parsed = ListEquivalenceViz.parseInput(host.querySelector('.eq-n').value, host.querySelector('.eq-pairs').value); parsed.n = Math.min(12, parsed.n); parsed.pairs = parsed.pairs.slice(0, 20); _equivState = parsed; renderListEquivalence();`
  - `.rand-btn` onclick: `const inp = window.RandomInput && RandomInput.randomInputFor('list-equivalence', getInputDifficulty()); if (inp) { _equivState = { n: inp.n, pairs: inp.pairs }; renderListEquivalence(); }`
  - Add minimal `.eq-*` CSS to style.css (chips, chains, class boxes, stack) — allowed; commit it.

- [ ] **Step 6: 3 remaining wiring edits in js/app.js:**
  - codeByMethod (getCodeForMethod): `'list-equivalence': codeListEquivalence,`
  - updateLayout: `else if (currentMode === 'list-equivalence') { codeTitle.textContent = 'list_equivalence.cpp'; codeDisplay.textContent = codeListEquivalence; }`
  - renderAll: `else if (currentMode === 'list-equivalence') renderListEquivalence();` — MUST be placed BEFORE the generic `currentMode.includes('list-')` catch-all branch (grep renderAll for `includes('list-')` and put the exact-id branch above it).

- [ ] **Step 7: i18n** — en: `'method.list-equivalence': 'Equivalence Classes (Linked List)',`; zh: `'method.list-equivalence': '等價類(鏈結串列)',`. (No group key — existing `linear` group.)

- [ ] **Step 8: random_input generator** — in `js/random_input.js`, add a `list-equivalence` case to `randomInputFor` returning `{ n, pairs }`. Use these helpers-in-place (the file already has a `randInt(rng, lo, hi)` helper — reuse it):
```js
      case 'list-equivalence': {
        if (difficulty === 'edge') return rng() < 0.5 ? { n: 1, pairs: [] } : { n: randInt(rng, 4, 6), pairs: [] };
        if (difficulty === 'special') { // one big chain class 0-1-2-...
          const n = randInt(rng, 8, 10); const pairs = [];
          for (let i = 0; i < n - 1; i++) pairs.push([i, i + 1]);
          return { n: n, pairs: pairs };
        }
        const n = difficulty === 'large' ? 12 : randInt(rng, 8, 10);
        const m = difficulty === 'large' ? randInt(rng, 10, 14) : randInt(rng, 6, 8);
        const pairs = [];
        for (let k = 0; k < m; k++) { const a = randInt(rng, 0, n - 1), b = randInt(rng, 0, n - 1); if (a !== b) pairs.push([a, b]); }
        return { n: n, pairs: pairs };
      }
```
Place it among the other `case` branches in `randomInputFor` (verify the exact switch and `randInt` signature by reading the file first).

- [ ] **Step 9: slides** — add a `list-equivalence` deck to `slides_db.js` (mirror an existing entry; zh+en). Cover: equivalence relations (reflexive/symmetric/transitive); linked-list adjacency representation (head-insert per pair); the two-phase find (build lists → stack traversal per unprocessed element → connected component); contrast with union-find (`tree-dsu`): same problem, different representation. Run `npm run build:slides` (if a homebrew `libsimdjson` dylib error appears, prior tasks symlinked `/opt/homebrew/opt/simdjson/lib/libsimdjson.28.dylib` — reuse if needed). Confirm `slides/{zh,en}/list-equivalence.md` created.

- [ ] **Step 10: E2E** — create `tests/list_equivalence.spec.js`. Copy the `fileUri` + `loadMethod(page, id)` helper verbatim from `tests/recursion.spec.js`. Then:
```js
test('list-equivalence loads, builds, steps, randomizes', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'list-equivalence');
  const card = page.locator('[data-method-section="list-equivalence"]');
  await expect(card).toHaveAttribute('data-runtime-state', 'active');
  await expect(card.locator('.eq-adj').first()).toBeVisible();
  await expect(card.locator('.eq-find').first()).toBeVisible();
  await card.locator('[data-action="step"]').click();
  await card.locator('.rand-btn').click();
});
```
Confirm `[data-action="step"]` matches what `buildStepControls` produces (same as recursion/tier3 specs).

- [ ] **Step 11: Verify + commit**
Run: `node --test tests/unit/*.test.js` (still all pass) and `npx playwright test tests/list_equivalence.spec.js` (PASS).
NOTE: the overview-tile COUNT test in tests/i18n.spec.js will FAIL now (new method) — EXPECTED, fixed in Task 3. Do NOT edit it here.
```bash
git add cpp/list_equivalence.cpp js/code_db.js build_db.js index.html js/app.js js/i18n.js slides_db.js js/slides_rendered.js slides/zh/list-equivalence.md slides/en/list-equivalence.md js/random_input.js tests/list_equivalence.spec.js style.css
git commit -m "feat: linked-list equivalence-class visualization (linear group)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```
(omit style.css if unchanged.)

---

## Task 3: Full suite green + count reconciliation

**Files:** Modify `tests/i18n.spec.js` (and `tests/visualizer.spec.js` only if it legitimately changed).

- [ ] **Step 1: Run** `npm run test:all`. Expect a failure only on the overview-tile count.

- [ ] **Step 2: Update count** — this feature adds 1 method to the EXISTING `linear` group (no new group):
  - `tests/i18n.spec.js`: overview-tile `110` → **111** (and the nearby comment "… and 110 tiles" → "… and 111 tiles").
  - overview-category stays **14**; `tests/visualizer.spec.js` `.category-nav-btn` stays **15** — do NOT change these (no new group/pill). If either fails, investigate (should not happen).
  Verify 111 matches reality.

- [ ] **Step 3: Secret check** — `git status --porcelain js/cloud-config.js` empty (else `git checkout js/cloud-config.js`).

- [ ] **Step 4: Re-run + commit**
Run: `npm run test:all` → fully green.
```bash
git add tests/i18n.spec.js
git commit -m "test: update overview-tile count to 111 for list-equivalence

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review (completed by plan author)

**Spec coverage:** §2 algorithm (build adjacency head-insert + stack traversal) → Task 1 module ✓. §3.1 module API (`parseInput`/`buildAdjacency`/`equivalenceFrames`/`DEFAULT`, frame shapes) → Task 1 ✓. §3.2 render (host width:100%, eq-adj/eq-find, Build+🎲, step controls) → Task 2 Step 5 ✓. §3.3 4 wiring edits (with the `list-` catch-all ordering guard) → Task 2 Steps 4/6 ✓. §3.4 cpp/slides/i18n/index/random_input → Task 2 Steps 1/2/3/7/8/9 ✓. §5 counts (110→111) → Task 3 ✓. §6 unit + E2E → Tasks 1 + 2 Step 10 ✓.

**Placeholder scan:** Module + unit test are complete verbatim code. Render is structured against the named template `renderRecursion` with explicit state var, selectors, frame contracts, clamps, and step/reset semantics. cpp + random_input generator complete. No TODO/TBD.

**Type/name consistency:** `equivalenceFrames(n, pairs)` → `{frames, classes, seq}` consistent across module, tests, render. Frame fields (`phase`/`pair`/`seq`/`active`/`event`/`stack`/`out`/`classes`/`current`/`scanning`) consistent. `_equivState`, `.eq-n`/`.eq-pairs`/`.eq-build`/`.eq-adj`/`.eq-find`, `codeListEquivalence`, `renderListEquivalence`, method id `list-equivalence` all consistent. `random_input` returns `{n, pairs}` matching the render's `.rand-btn` handler. `_equivState` is a new var (no collision). Count 110→111 (1 method, no group) internally consistent; `list-` catch-all ordering explicitly guarded.
