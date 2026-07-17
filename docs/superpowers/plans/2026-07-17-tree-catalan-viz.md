# tree-catalan viz — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new dsvisual `tree-catalan` visualization that enumerates all `Cₙ` distinct binary-tree shapes for a chosen `n ≤ 4`, grouped by the root split so the drawing equals the recurrence `Cₙ = Σᵢ Cᵢ·Cₙ₋₁₋ᵢ`, accumulates the count to `Cₙ`, verifies it against the closed form, and shows a numeric `C₀…C₁₀` panel.

**Architecture:** Pure frame-generator `js/tree_catalan_viz.js` (`TreeCatalanViz`); render module `js/viz/viz_tree_catalan.js` via the `VizRegistry`/`VizKit` seam; one `METHOD_GROUPS` row; `cpp/tree_catalan.cpp` → `js/code_db.js`; `js/desc_db.js` entry. Unit + e2e tests.

**Tech Stack:** Vanilla JS dual-export IIFE modules, `node --test` unit tests, Playwright e2e, C++ code drawer via `build_db.js`.

## Global Constraints

- Post-refactor layout (verified on `main` @ d9a46fd): per-viz renderers live in `js/viz/viz_*.js` using `K() = global.VizKit`; a viz self-registers via `global.VizRegistry.attach(id, {render, code, layout})`. A NEW viz needs: a `METHOD_GROUPS` trees-group row (app.js), the render module, **TWO** `index.html` `<script defer>` tags (pure module then render module, after `js/code_db.js`, before `js/app.js`), a `build_db.js` cpp→code mapping, and a `desc_db.js` entry.
- Catalan: recurrence `C0=1, Cn = Σ_{i=0}^{n-1} Ci·C(n-1-i)`; closed form `binom(2n,n)/(n+1)`; pinned sequence `1,1,2,5,14,42,132,429,1430,4862,16796` (n=0..10). Shapes unlabeled; `enumerateShapes(n).length === Cn`. Enumeration/drawing capped `n ≤ 4`; numeric panel to 10.
- Bilingual zh/en for all UI text via `K().langOf`. `desc_db.js` English-only file-wide; use the styled `class="complexities"` (plural). Step/Run/Reset via `K().buildStepControls`.
- Additive only — no change to other viz/methods. Commit discipline: targeted `git add` of only each task's named files; a concurrent refactor session may touch this repo — run `git status` before committing, NEVER `git add -A`/`.`/`-u`; add exactly the one registry row.
- Tests: unit `npm run test:unit`; e2e `npm test`.

**Worked example (used across tasks):** `C₃ = C₀·C₂ + C₁·C₁ + C₂·C₀ = 1·2 + 1·1 + 2·1 = 5`; `C₄ = 14`.

---

### Task 1: Pure Catalan logic (`TreeCatalanViz`) + unit tests

**Files:**
- Create: `js/tree_catalan_viz.js`
- Test: `tests/unit/tree_catalan_viz.test.js`

**Interfaces:**
- Produces (used by Task 2):
  - `catalanNumber(n) -> number`, `catalanClosed(n) -> number`
  - `enumerateShapes(n) -> Shape[]` where `Shape = null | {left:Shape, right:Shape}`
  - `catalanSequence(maxN) -> [{n, recurrence, closed}]`
  - `buildCatalanFrames(n) -> { frames, total }`; Frame = `{ n, splitI, leftSize, rightSize, ci, crest, product, groupShapes:Shape[], runningTotal, terms:[{i,ci,crest,product}], action:'group'|'done', msg:{zh,en} }`.

- [ ] **Step 1: Write the failing unit test** — create `tests/unit/tree_catalan_viz.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { catalanNumber, catalanClosed, enumerateShapes, catalanSequence, buildCatalanFrames } = require('../../js/tree_catalan_viz');

const PINNED = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796];

test('catalanNumber and catalanClosed match the pinned sequence 0..10', () => {
  for (let n = 0; n <= 10; n++) {
    assert.equal(catalanNumber(n), PINNED[n], 'recurrence C' + n);
    assert.equal(catalanClosed(n), PINNED[n], 'closed C' + n);
  }
});

test('enumerateShapes count equals the Catalan number for n=0..4', () => {
  for (let n = 0; n <= 4; n++) assert.equal(enumerateShapes(n).length, PINNED[n]);
  // shape well-formedness: n=2 yields two shapes (left-leaning and right-leaning)
  const s2 = enumerateShapes(2);
  assert.equal(s2.length, 2);
  for (const s of s2) assert.ok(s && (s.left || s.right));
});

test('buildCatalanFrames(3): group products and running total', () => {
  const { frames, total } = buildCatalanFrames(3);
  assert.equal(total, 5);
  const groups = frames.filter((f) => f.action === 'group');
  assert.equal(groups.length, 3);                       // splits i=0,1,2
  assert.deepEqual(groups.map((g) => g.product), [2, 1, 2]);
  for (const g of groups) assert.equal(g.groupShapes.length, g.product);
  assert.equal(groups[groups.length - 1].runningTotal, 5);
  assert.equal(frames[frames.length - 1].action, 'done');
});

test('n=0 total is 1 and frames are bilingual', () => {
  const { frames, total } = buildCatalanFrames(0);
  assert.equal(total, 1);
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); }
});

test('catalanSequence(10) rows match by both methods', () => {
  const seq = catalanSequence(10);
  assert.equal(seq.length, 11);
  for (const row of seq) assert.equal(row.recurrence, row.closed);
  assert.equal(seq[4].recurrence, 14);
});
```

- [ ] **Step 2: Run, verify fail**

Run: `npm run test:unit`
Expected: FAIL — cannot find module `../../js/tree_catalan_viz`.

- [ ] **Step 3: Create `js/tree_catalan_viz.js`:**

```js
(function (global) {
  function catalanNumber(n) {
    const C = new Array(n + 1).fill(0);
    C[0] = 1;
    for (let m = 1; m <= n; m++) for (let i = 0; i < m; i++) C[m] += C[i] * C[m - 1 - i];
    return C[n];
  }

  function catalanClosed(n) {
    let r = 1;
    for (let i = 0; i < n; i++) r = r * (2 * n - i) / (i + 1);   // r becomes binom(2n,n)
    return Math.round(r / (n + 1));
  }

  function enumerateShapes(n) {
    if (n === 0) return [null];
    const out = [];
    for (let i = 0; i < n; i++) {
      const L = enumerateShapes(i), R = enumerateShapes(n - 1 - i);
      for (const l of L) for (const r of R) out.push({ left: l, right: r });
    }
    return out;
  }

  function catalanSequence(maxN) {
    const seq = [];
    for (let n = 0; n <= maxN; n++) seq.push({ n, recurrence: catalanNumber(n), closed: catalanClosed(n) });
    return seq;
  }

  function buildCatalanFrames(n) {
    const frames = [];
    const terms = [];
    let running = 0;

    if (n === 0) {
      running = 1;
      frames.push({ n: 0, splitI: 0, leftSize: 0, rightSize: 0, ci: 1, crest: 1, product: 1, groupShapes: [null], runningTotal: 1, terms: [], action: 'group', msg: { zh: 'n=0:僅「空樹」一種形狀', en: 'n=0: exactly one shape — the empty tree' } });
    } else {
      for (let i = 0; i < n; i++) {
        const rightSize = n - 1 - i;
        const ci = catalanNumber(i), crest = catalanNumber(rightSize);
        const product = ci * crest;
        const L = enumerateShapes(i), R = enumerateShapes(rightSize);
        const groupShapes = [];
        for (const l of L) for (const r of R) groupShapes.push({ left: l, right: r });
        running += product;
        terms.push({ i, ci, crest, product });
        frames.push({
          n, splitI: i, leftSize: i, rightSize, ci, crest, product, groupShapes, runningTotal: running, terms: terms.slice(), action: 'group',
          msg: {
            zh: '左子樹 ' + i + ' 節點(C' + i + '=' + ci + ') × 右子樹 ' + rightSize + ' 節點(C' + rightSize + '=' + crest + ') = ' + product + ' 種',
            en: 'left subtree ' + i + ' nodes (C' + i + '=' + ci + ') × right subtree ' + rightSize + ' nodes (C' + rightSize + '=' + crest + ') = ' + product,
          },
        });
      }
    }

    const total = running;
    const closed = catalanClosed(n);
    const rec = terms.length
      ? ('C' + n + ' = ' + terms.map((t) => t.ci + '·' + t.crest).join(' + ') + ' = ' + total)
      : ('C' + n + ' = ' + total);
    frames.push({
      n, splitI: null, leftSize: null, rightSize: null, ci: null, crest: null, product: null, groupShapes: [], runningTotal: total, terms: terms.slice(), action: 'done',
      msg: {
        zh: '完成:' + rec + ';封閉形 C(' + (2 * n) + ',' + n + ')/' + (n + 1) + ' = ' + closed + (total === closed ? ' ✓' : ' ✗'),
        en: 'done: ' + rec + '; closed form C(' + (2 * n) + ',' + n + ')/' + (n + 1) + ' = ' + closed + (total === closed ? ' ✓' : ' ✗'),
      },
    });
    return { frames, total };
  }

  const api = { catalanNumber, catalanClosed, enumerateShapes, catalanSequence, buildCatalanFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.TreeCatalanViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run, verify pass**

Run: `npm run test:unit`
Expected: PASS (existing unit tests + the 5 new `tree_catalan` tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/skhuang/course/dsvisual
git add js/tree_catalan_viz.js tests/unit/tree_catalan_viz.test.js
git commit -m "feat(dsvisual): tree-catalan pure logic (enumerate shapes, recurrence, closed form)"
```

---

### Task 2: Render module + registry + index.html + CSS + e2e

**Files:**
- Create: `js/viz/viz_tree_catalan.js`
- Modify: `js/app.js` (one `METHOD_GROUPS` trees-group row)
- Modify: `index.html` (two `<script defer>` tags)
- Modify: `style.css` (append catalan CSS)
- Test: `tests/tree_catalan.spec.js`

**Interfaces:**
- Consumes (Task 1): `TreeCatalanViz.buildCatalanFrames`, `.catalanSequence`, `.catalanClosed`.

- [ ] **Step 1: Add the registry row** in `js/app.js`, in the `METHOD_GROUPS` trees group, immediately after the `tree-general-binary` row:

```js
            { id: 'tree-catalan', title: 'Counting Trees (Catalan)', file: 'tree_catalan.cpp', visualizer: 'catalan', controls: 'catalan' },
```

- [ ] **Step 2: Add BOTH script tags** in `index.html`, immediately after the existing `<script src="js/viz/viz_expr_tree.js" defer></script>` line (pure module first, then render):

```html
    <script src="js/tree_catalan_viz.js" defer></script>
    <script src="js/viz/viz_tree_catalan.js" defer></script>
```

- [ ] **Step 3: Create `js/viz/viz_tree_catalan.js`:**

```js
(function (global) {
    const K = () => global.VizKit;

    // Compact SVG for one unlabeled binary-tree shape (null = empty tree).
    function shapeSVG(shape) {
        if (!shape) return '<span class="cat-empty">∅</span>';
        const W = 64, H = 66;
        const nodes = [], edges = [];
        (function place(s, x, y, dx) {
            const id = nodes.length; nodes.push({ x, y });
            if (s.left) { const c = place(s.left, x - dx, y + 18, Math.max(7, dx * 0.6)); edges.push([id, c]); }
            if (s.right) { const c = place(s.right, x + dx, y + 18, Math.max(7, dx * 0.6)); edges.push([id, c]); }
            return id;
        })(shape, W / 2, 9, 15);
        let s = '<svg width="' + W + '" height="' + H + '" class="cat-shape">';
        edges.forEach(([a, b]) => { s += '<line x1="' + nodes[a].x + '" y1="' + nodes[a].y + '" x2="' + nodes[b].x + '" y2="' + nodes[b].y + '" stroke="#94a3b8" stroke-width="1.5"/>'; });
        nodes.forEach((nd) => { s += '<circle cx="' + nd.x + '" cy="' + nd.y + '" r="5" fill="#1a4d8f"/>'; });
        return s + '</svg>';
    }

    let _state = null;
    function renderTreeCatalan() {
        const host = K().acquireDynamicVizHost();
        if (!_state) _state = { n: 3 };
        const st = _state;
        const langOf = K().langOf;
        const res = TreeCatalanViz.buildCatalanFrames(st.n);
        const frames = res.frames;
        const seq = TreeCatalanViz.catalanSequence(10);
        let idx = 0;

        const nBtns = [0, 1, 2, 3, 4].map((k) => '<button type="button" class="cat-nbtn' + (k === st.n ? ' active' : '') + '" data-n="' + k + '">n=' + k + '</button>').join('');
        const seqRows = seq.map((r) => '<tr class="cat-seq-row" data-n="' + r.n + '"><td>C' + r.n + '</td><td>' + r.recurrence + '</td><td>' + r.closed + '</td><td>' + (r.recurrence === r.closed ? '✓' : '✗') + '</td></tr>').join('');

        host.innerHTML =
            '<div class="cat-controls"><span class="sm-hint">' + langOf({ zh: '選 n,枚舉全部 Cₙ 種二元樹形狀(依左子樹大小分組)', en: 'pick n; enumerate all Cₙ binary-tree shapes (grouped by left-subtree size)' }) + '</span></div>' +
            '<div class="cat-ns">' + nBtns + '</div>' +
            '<div class="cat-groups"></div>' +
            '<div class="cat-total"></div>' +
            '<div class="cat-verdict"></div>' +
            '<div class="cat-seqwrap"><div class="cat-seqtitle">' + langOf({ zh: 'Catalan 數 C₀…C₁₀(遞迴 vs 封閉形)', en: 'Catalan numbers C₀…C₁₀ (recurrence vs closed form)' }) + '</div>' +
              '<table class="cat-seq"><thead><tr><th>n</th><th>' + langOf({ zh: '遞迴', en: 'recur.' }) + '</th><th>' + langOf({ zh: '封閉形', en: 'closed' }) + '</th><th>=</th></tr></thead><tbody>' + seqRows + '</tbody></table></div>' +
            '<div class="et-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.cat-groups')) return;
            const shown = frames.slice(0, idx + 1).filter((f) => f.action === 'group');
            host.querySelector('.cat-groups').innerHTML = shown.map((g) =>
                '<div class="cat-group"><div class="cat-ghead">' +
                    (g.n === 0 ? langOf({ zh: '空樹', en: 'empty tree' })
                        : ('C' + g.leftSize + '·C' + g.rightSize + ' = ' + g.ci + '·' + g.crest + ' = ' + g.product)) +
                '</div><div class="cat-shapes">' + g.groupShapes.map(shapeSVG).join('') + '</div></div>').join('');
            host.querySelector('.cat-total').textContent = langOf({ zh: '累計形狀數 = ', en: 'shapes so far = ' }) + fr.runningTotal;
            const v = host.querySelector('.cat-verdict');
            if (fr.action === 'done') { v.className = 'cat-verdict cat-ok'; v.textContent = langOf(fr.msg); }
            else { v.className = 'cat-verdict'; v.textContent = ''; }
            host.querySelector('.et-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(K().buildStepControls(step, reset, 800));
        paint();

        host.querySelectorAll('.cat-nbtn').forEach((b) => { b.onclick = () => { const k = parseInt(b.getAttribute('data-n'), 10); if (k !== st.n) { st.n = k; renderTreeCatalan(); } }; });
    }

    global.VizRegistry.attach('tree-catalan', {
        render: renderTreeCatalan,
        code: () => (typeof codeTreeCatalan !== 'undefined' ? codeTreeCatalan : ''),
        layout: { host: 'dynamic' },
    });
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Append CSS** to `style.css`:

```css
/* tree-catalan */
.cat-ns { display: flex; gap: 6px; margin-bottom: 8px; }
.cat-nbtn { padding: 4px 12px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 999px; cursor: pointer; font-size: 13px; }
.cat-nbtn.active { background: #1a4d8f; color: #fff; border-color: #1a4d8f; }
.cat-groups { display: flex; flex-direction: column; gap: 10px; margin: 8px 0; }
.cat-group { border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 8px; }
.cat-ghead { font-weight: 700; font-size: 13px; margin-bottom: 4px; color: #1a4d8f; }
.cat-shapes { display: flex; flex-wrap: wrap; gap: 6px; align-items: flex-start; }
.cat-shape { border: 1px solid #eef2f7; border-radius: 4px; background: #fff; }
.cat-empty { display: inline-block; width: 64px; height: 66px; line-height: 66px; text-align: center; color: #94a3b8; border: 1px dashed #cbd5e1; border-radius: 4px; }
.cat-total { font-weight: 700; margin-top: 6px; }
.cat-verdict { margin-top: 4px; font-weight: bold; }
.cat-verdict.cat-ok { color: #16a34a; }
.cat-seqwrap { margin-top: 12px; overflow-x: auto; }
.cat-seqtitle { font-weight: 700; font-size: 13px; margin-bottom: 4px; }
table.cat-seq { border-collapse: collapse; font-family: 'Fira Code', monospace; font-size: 12px; }
table.cat-seq th, table.cat-seq td { border: 1px solid #cbd5e1; padding: 2px 8px; text-align: center; }
```

- [ ] **Step 5: Create the e2e test** `tests/tree_catalan.spec.js`:

```js
const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('Counting Trees (Catalan)', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-catalan');
    });

    test('n=3 enumerates to 5 and verifies the closed form', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-catalan"]');
        await sec.locator('.cat-nbtn[data-n="3"]').click();
        await sec.locator('.stepctl [data-action="run"]').click();
        await expect(sec.locator('.cat-verdict.cat-ok')).toContainText('= 5', { timeout: 15000 });
        await expect(sec.locator('.cat-total')).toContainText('5');
    });

    test('n=2 enumerates to 2', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-catalan"]');
        await sec.locator('.cat-nbtn[data-n="2"]').click();
        await sec.locator('.stepctl [data-action="run"]').click();
        await expect(sec.locator('.cat-verdict.cat-ok')).toContainText('= 2', { timeout: 15000 });
    });

    test('numeric panel shows C4=14 and C5=42', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-catalan"]');
        await expect(sec.locator('.cat-seq-row[data-n="4"]')).toContainText('14');
        await expect(sec.locator('.cat-seq-row[data-n="5"]')).toContainText('42');
    });
});
```

- [ ] **Step 6: Run e2e; verify pass**

Run: `npm test -- tree_catalan`
Expected: 3 tests pass. If the `[data-action="run"]` step-control selector differs, mirror `tests/tree_expression.spec.js` and re-run.

- [ ] **Step 7: Commit**

```bash
cd /Users/skhuang/course/dsvisual
git add js/viz/viz_tree_catalan.js js/app.js index.html style.css tests/tree_catalan.spec.js
git commit -m "feat(dsvisual): tree-catalan render UI + registry + e2e (shape enumeration, sequence panel)"
```

---

### Task 3: C++ code drawer + description

**Files:**
- Create: `cpp/tree_catalan.cpp`
- Modify: `build_db.js` (add cpp→code mapping)
- Modify: `js/code_db.js` (regenerated)
- Modify: `js/desc_db.js` (add `tree-catalan` entry)

- [ ] **Step 1: Create `cpp/tree_catalan.cpp`:**

```cpp
#include <iostream>
#include <vector>
#include <cstdint>

// Number of distinct binary trees with n nodes = the nth Catalan number.
// Recurrence: C0 = 1, Cn = sum_{i=0}^{n-1} Ci * C(n-1-i).
uint64_t catalanRecurrence(int n) {
    std::vector<uint64_t> C(n + 1, 0);
    C[0] = 1;
    for (int m = 1; m <= n; ++m)
        for (int i = 0; i < m; ++i)
            C[m] += C[i] * C[m - 1 - i];
    return C[n];
}

// Closed form Cn = binom(2n, n) / (n + 1), via an exact running product.
uint64_t catalanClosed(int n) {
    uint64_t r = 1;
    for (int i = 0; i < n; ++i) { r = r * (uint64_t)(2 * n - i); r /= (uint64_t)(i + 1); }
    return r / (uint64_t)(n + 1);
}

// The count of distinct binary-tree shapes is exactly the recurrence.
uint64_t countShapes(int n) { return catalanRecurrence(n); }
```

- [ ] **Step 2: Add the cpp→code mapping** in `build_db.js` — add to the `mappings` object near the other `tree_*.cpp` entries:

```js
    'tree_catalan.cpp': 'codeTreeCatalan',
```

- [ ] **Step 3: Regenerate the code drawer string**

Run: `node build_db.js`
Expected: `js/code_db.js` gains `const codeTreeCatalan = \`...\`;`. `git diff --stat js/code_db.js` shows only that addition. If `build_db.js` rewrites unrelated `codeXxx` entries with spurious diffs, STOP and report.

- [ ] **Step 4: Add the description entry** in `js/desc_db.js` — add a `'tree-catalan'` key (English, matching the flat `key: \`<html>\`` shape; place near other tree entries):

```js
    'tree-catalan': `
        <h3>Counting Binary Trees — Catalan Numbers</h3>
        <p>The number of distinct binary-tree shapes with <code>n</code> nodes is the <em>n</em>th Catalan number <code>Cₙ</code>. Splitting on the root — <code>i</code> nodes on the left, <code>n−1−i</code> on the right — gives the recurrence <code>Cₙ = Σᵢ Cᵢ·Cₙ₋₁₋ᵢ</code>, since any left shape pairs with any right shape.</p>
        <p>It has the closed form <code>Cₙ = C(2n, n)/(n+1)</code>, giving the sequence 1, 1, 2, 5, 14, 42, 132, 429, … The viz enumerates and draws every shape for small <code>n</code>, grouped by the split so the picture equals the recurrence.</p>
        <div class="complexities">
            <span class="badge time">Enumerate: O(Cₙ · n)</span>
            <span class="badge space">Cₙ grows ~4ⁿ / n^1.5</span>
        </div>
    `,
```

- [ ] **Step 5: Sanity-check**

Run: `npm test -- tree_catalan` and `npm run test:unit`
Expected: still green. Optionally open `index.html`, select "Counting Trees (Catalan)", confirm the code drawer shows `tree_catalan.cpp` and the info panel shows the description.

- [ ] **Step 6: Commit**

```bash
cd /Users/skhuang/course/dsvisual
git add cpp/tree_catalan.cpp build_db.js js/code_db.js js/desc_db.js
git commit -m "feat(dsvisual): C++ code drawer + description for tree-catalan"
```

---

## Notes for the executor

- **Concurrent refactor session:** before each commit run `git status` and stage ONLY the task's named files. Never `git add -A`/`.`/`-u`.
- Task ordering: Task 1 (pure) → Task 2 (render, consumes Task 1; needs BOTH index.html tags — pure before render) → Task 3 (code drawer; the render's `code:` callback tolerates `codeTreeCatalan` undefined until Task 3).
- `.et-phase` is reused from existing tree viz (shared CSS exists); all `.cat-*` classes are new (Task 2 Step 4). This viz does NOT use the shared `.et-stage`/`.et-edges` tree canvas — it renders its own small per-shape SVGs.
- `desc_db` uses `class="complexities"` (plural, styled) — do not copy the unstyled singular `complexity` used by some other entries.
- e2e step-control selectors: if `[data-action="run"]` is wrong, mirror `tests/tree_expression.spec.js`.
