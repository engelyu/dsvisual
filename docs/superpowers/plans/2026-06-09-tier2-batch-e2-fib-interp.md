# Tier-2 Batch E2: Fibonacci Search + Interpolation Search — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two dsvisual search visualizations — `search-fibonacci` and `search-interpolation` — in the `searching` group, each with Step/Run/Reset (inherits Pause/Resume + speed), bilingual UI + slides, and tests.

**Architecture:** Pure frame-generators in `js/search_fibonacci_viz.js` / `js/search_interpolation_viz.js` (dual-export, like `js/heap_models.js`), unit-tested under `node --test`. DOM renderers (`renderSearchFibonacci`, `renderSearchInterpolation`) in `js/app.js` using `acquireDynamicVizHost()` + `buildStepControls()` (new frames model — independent of the older sleep-based search-binary/linear). Sorted-array cell display; no `.tree-node`.

**Tech Stack:** Vanilla JS (IIFE modules + browser globals), Node test runner, Playwright, Marp slides.

**Spec:** `docs/superpowers/specs/2026-06-09-tier2-visualizations-design.md` (§3.3 search-fibonacci, §3.4 search-interpolation).

---

## File Structure
- `js/search_fibonacci_viz.js`, `js/search_interpolation_viz.js` (new pure modules)
- `cpp/search_fibonacci.cpp`, `cpp/search_interpolation.cpp` (new C++ refs)
- `tests/unit/search_fibonacci_viz.test.js`, `tests/unit/search_interpolation_viz.test.js` (new)
- `tests/search_fibonacci.spec.js`, `tests/search_interpolation.spec.js` (new E2E)
- modify: `js/app.js`, `build_db.js`, `js/i18n.js`, `js/desc_db.js`, `slides_db.js`, `index.html`, `style.css`
- regenerated: `js/code_db.js`, `js/slides_rendered.js` (+ slides md)

---

## Task 1: Feature branch + fibonacci-search pure module (TDD)

**Files:** Create `js/search_fibonacci_viz.js`, `tests/unit/search_fibonacci_viz.test.js`.

- [ ] **Step 1: Branch**
```bash
cd /Users/skhuang/course/dsvisual
git checkout main && git pull --ff-only
git checkout -b feat/tier2-batch-e2
git branch --show-current
```
Expected: `feat/tier2-batch-e2`.

- [ ] **Step 2: Write the failing unit test**

Create `tests/unit/search_fibonacci_viz.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFibSearchFrames } = require('../../js/search_fibonacci_viz');

const ARR = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

test('finds an existing target (matches indexOf)', () => {
  for (const t of ARR) {
    const { foundIndex } = buildFibSearchFrames(ARR, t);
    assert.equal(foundIndex, ARR.indexOf(t), 'target ' + t);
  }
});

test('returns -1 for an absent target', () => {
  assert.equal(buildFibSearchFrames(ARR, 8).foundIndex, -1);
  assert.equal(buildFibSearchFrames(ARR, 100).foundIndex, -1);
  assert.equal(buildFibSearchFrames(ARR, 0).foundIndex, -1);
});

test('every probe index is within array bounds; frames carry bilingual msg', () => {
  const { frames } = buildFibSearchFrames(ARR, 11);
  for (const f of frames) {
    assert.ok(f.msg.zh && f.msg.en);
    if (f.probe >= 0) assert.ok(f.probe < ARR.length);
  }
});
```

- [ ] **Step 3: Run — expect FAIL**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/search_fibonacci_viz.test.js`
Expected: FAIL — `Cannot find module '../../js/search_fibonacci_viz'`.

- [ ] **Step 4: Implement `js/search_fibonacci_viz.js`**

Create `js/search_fibonacci_viz.js`:
```js
(function (global) {
  function buildFibSearchFrames(arr, target) {
    const n = arr.length;
    const frames = [];
    let fib2 = 0, fib1 = 1, fibM = fib2 + fib1;
    while (fibM < n) { fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1; }
    let offset = -1, foundIndex = -1;
    const snap = (probe, msg) => frames.push({ probe, lo: offset, fibM, fib1, fib2, range: [offset + 1, n - 1], found: foundIndex, msg });
    snap(-1, { zh: '初始化:取 ≥ n 的最小費氏數 ' + fibM, en: 'Init: smallest Fibonacci ≥ n is ' + fibM });
    while (fibM > 1) {
      const i = Math.min(offset + fib2, n - 1);
      if (arr[i] < target) {
        snap(i, { zh: 'arr[' + i + ']=' + arr[i] + ' < 目標,往右縮小範圍', en: 'arr[' + i + ']=' + arr[i] + ' < target; shrink right' });
        fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i;
      } else if (arr[i] > target) {
        snap(i, { zh: 'arr[' + i + ']=' + arr[i] + ' > 目標,往左縮小範圍', en: 'arr[' + i + ']=' + arr[i] + ' > target; shrink left' });
        fibM = fib2; fib1 = fib1 - fib2; fib2 = fibM - fib1;
      } else {
        foundIndex = i;
        snap(i, { zh: '命中!目標在索引 ' + i, en: 'Hit! target at index ' + i });
        return { frames, foundIndex };
      }
    }
    if (fib1 === 1 && offset + 1 < n && arr[offset + 1] === target) {
      foundIndex = offset + 1;
      snap(foundIndex, { zh: '比對最後一個元素,命中索引 ' + foundIndex, en: 'Check last element; hit at index ' + foundIndex });
    } else {
      snap(-1, { zh: '找不到目標', en: 'Target not found' });
    }
    return { frames, foundIndex };
  }

  const api = { buildFibSearchFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.FibSearchViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 5: Run — expect PASS**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/search_fibonacci_viz.test.js`
Expected: PASS — 3 tests (`# pass 3`, `# fail 0`). If a foundIndex mismatch occurs, STOP and report the target + returned index.

- [ ] **Step 6: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/search_fibonacci_viz.js tests/unit/search_fibonacci_viz.test.js
git commit -m "feat(viz): fibonacci-search pure frame generator + unit tests"
```

---

## Task 2: interpolation-search pure module (TDD)

**Files:** Create `js/search_interpolation_viz.js`, `tests/unit/search_interpolation_viz.test.js`.

- [ ] **Step 1: Write the failing unit test**

Create `tests/unit/search_interpolation_viz.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { buildInterpFrames } = require('../../js/search_interpolation_viz');

const ARR = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

test('finds an existing target (matches indexOf)', () => {
  for (const t of ARR) {
    const { foundIndex } = buildInterpFrames(ARR, t);
    assert.equal(foundIndex, ARR.indexOf(t), 'target ' + t);
  }
});

test('returns -1 for an absent target', () => {
  assert.equal(buildInterpFrames(ARR, 35).foundIndex, -1);
  assert.equal(buildInterpFrames(ARR, 5).foundIndex, -1);
  assert.equal(buildInterpFrames(ARR, 999).foundIndex, -1);
});

test('equal-valued range does not divide by zero', () => {
  const flat = [7, 7, 7, 7];
  assert.equal(buildInterpFrames(flat, 7).foundIndex, 0);
  assert.equal(buildInterpFrames(flat, 9).foundIndex, -1);
});

test('probe positions stay within [lo,hi]; frames carry bilingual msg', () => {
  const { frames } = buildInterpFrames(ARR, 70);
  for (const f of frames) {
    assert.ok(f.msg.zh && f.msg.en);
    if (f.pos >= 0) assert.ok(f.pos >= f.lo && f.pos <= f.hi);
  }
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/search_interpolation_viz.test.js`
Expected: FAIL — `Cannot find module '../../js/search_interpolation_viz'`.

- [ ] **Step 3: Implement `js/search_interpolation_viz.js`**

Create `js/search_interpolation_viz.js`:
```js
(function (global) {
  function buildInterpFrames(arr, target) {
    const n = arr.length;
    const frames = [];
    let lo = 0, hi = n - 1, foundIndex = -1;
    const snap = (pos, msg) => frames.push({ lo, hi, pos, found: foundIndex, msg });
    snap(-1, { zh: '初始化範圍 [0, ' + (n - 1) + ']', en: 'Init range [0, ' + (n - 1) + ']' });
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
      if (arr[hi] === arr[lo]) {
        if (arr[lo] === target) { foundIndex = lo; snap(lo, { zh: '範圍內值相同,命中索引 ' + lo, en: 'Equal-valued range; hit at index ' + lo }); }
        else snap(-1, { zh: '範圍內值相同但不符,結束', en: 'Equal-valued range, no match' });
        break;
      }
      const pos = lo + Math.floor((target - arr[lo]) * (hi - lo) / (arr[hi] - arr[lo]));
      if (arr[pos] === target) { foundIndex = pos; snap(pos, { zh: '內插位置 ' + pos + ' 命中', en: 'Interpolated position ' + pos + ' hits' }); break; }
      else if (arr[pos] < target) { snap(pos, { zh: 'arr[' + pos + ']=' + arr[pos] + ' < 目標,lo = ' + (pos + 1), en: 'arr[' + pos + ']=' + arr[pos] + ' < target; lo = ' + (pos + 1) }); lo = pos + 1; }
      else { snap(pos, { zh: 'arr[' + pos + ']=' + arr[pos] + ' > 目標,hi = ' + (pos - 1), en: 'arr[' + pos + ']=' + arr[pos] + ' > target; hi = ' + (pos - 1) }); hi = pos - 1; }
    }
    if (foundIndex === -1) snap(-1, { zh: '找不到目標', en: 'Target not found' });
    return { frames, foundIndex };
  }

  const api = { buildInterpFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.InterpSearchViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run — expect PASS**

Run: `cd /Users/skhuang/course/dsvisual && node --test tests/unit/search_interpolation_viz.test.js`
Expected: PASS — 4 tests (`# pass 4`, `# fail 0`).

- [ ] **Step 5: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/search_interpolation_viz.js tests/unit/search_interpolation_viz.test.js
git commit -m "feat(viz): interpolation-search pure frame generator + unit tests"
```

---

## Task 3: C++ references + code_db regeneration

**Files:** Create `cpp/search_fibonacci.cpp`, `cpp/search_interpolation.cpp`; modify `build_db.js`; regenerate `js/code_db.js`.

- [ ] **Step 1: Create `cpp/search_fibonacci.cpp`**
```cpp
#include <vector>
#include <algorithm>

// Fibonacci search on a sorted array. Returns index of target or -1.
int fibonacciSearch(const std::vector<int>& a, int target) {
    int n = (int)a.size();
    int fib2 = 0, fib1 = 1, fibM = fib2 + fib1;
    while (fibM < n) { fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1; }
    int offset = -1;
    while (fibM > 1) {
        int i = std::min(offset + fib2, n - 1);
        if (a[i] < target) { fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i; }
        else if (a[i] > target) { fibM = fib2; fib1 = fib1 - fib2; fib2 = fibM - fib1; }
        else return i;
    }
    if (fib1 == 1 && offset + 1 < n && a[offset + 1] == target) return offset + 1;
    return -1;
}
```

- [ ] **Step 2: Create `cpp/search_interpolation.cpp`**
```cpp
#include <vector>

// Interpolation search on a sorted (ideally uniform) array. Returns index or -1.
int interpolationSearch(const std::vector<int>& a, int target) {
    int lo = 0, hi = (int)a.size() - 1;
    while (lo <= hi && target >= a[lo] && target <= a[hi]) {
        if (a[hi] == a[lo]) return (a[lo] == target) ? lo : -1;
        int pos = lo + (int)((long long)(target - a[lo]) * (hi - lo) / (a[hi] - a[lo]));
        if (a[pos] == target) return pos;
        else if (a[pos] < target) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}
```

- [ ] **Step 3: Register in `build_db.js`**

In `build_db.js` `mappings`, add:
```js
    'search_fibonacci.cpp': 'codeSearchFibonacci',
    'search_interpolation.cpp': 'codeSearchInterpolation',
```

- [ ] **Step 4: Regenerate + verify**
```bash
cd /Users/skhuang/course/dsvisual
node build_db.js
grep -c 'const codeSearchFibonacci' js/code_db.js
grep -c 'const codeSearchInterpolation' js/code_db.js
```
Expected: build no error; both counts `1`.

- [ ] **Step 5: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add cpp/search_fibonacci.cpp cpp/search_interpolation.cpp build_db.js js/code_db.js
git commit -m "feat(viz): C++ refs for fibonacci & interpolation search; regen code_db"
```

---

## Task 4: app.js registration + index.html

**Files:** Modify `js/app.js`, `index.html`.

- [ ] **Step 1: Register methods in METHOD_GROUPS**

In `js/app.js`, in the `searching` group's `methods` array, after the `search-aho` entry (`{ id: 'search-aho', ... }`) add:
```js
            { id: 'search-fibonacci', title: 'Fibonacci Search', file: 'search_fibonacci.cpp', visualizer: 'fibsearch', controls: 'fibsearch' },
            { id: 'search-interpolation', title: 'Interpolation Search', file: 'search_interpolation.cpp', visualizer: 'interpsearch', controls: 'interpsearch' },
```

- [ ] **Step 2: code lookup in getCodeForMethod()**

In `js/app.js` `codeByMethod`, add:
```js
        'search-fibonacci': codeSearchFibonacci,
        'search-interpolation': codeSearchInterpolation,
```

- [ ] **Step 3: updateLayout() branches**

After the existing `else if (currentMode === 'search-aho') { ... }` block (the last `search-*` updateLayout branch), add:
```js
        else if (currentMode === 'search-fibonacci') {
            codeTitle.textContent = 'search_fibonacci.cpp';
            codeDisplay.textContent = codeSearchFibonacci;
        }
        else if (currentMode === 'search-interpolation') {
            codeTitle.textContent = 'search_interpolation.cpp';
            codeDisplay.textContent = codeSearchInterpolation;
        }
```
(These set only the code panel; the dynamic host renders the rest. Do NOT show `searchContainer`/`searchActions` — those belong to the old sleep-based binary/linear search.)

- [ ] **Step 4: renderAll() dispatch — ORDER MATTERS**

In `js/app.js` `renderAll()`, find `else if (currentMode === 'search-aho') renderAhoCorasick();` and add immediately AFTER it (and BEFORE the generic `else if (currentMode.includes('search')) renderSearchArray(...)`):
```js
        else if (currentMode === 'search-fibonacci') renderSearchFibonacci();
        else if (currentMode === 'search-interpolation') renderSearchInterpolation();
```
CRITICAL: both new ids contain the substring `search`, so they MUST be dispatched before the `includes('search')` catch-all. Verify in Step 7.

- [ ] **Step 5: stubs**

Before `function renderSegmentTree()`, add:
```js
    function renderSearchFibonacci() { const host = acquireDynamicVizHost(); host.textContent = 'search-fibonacci (pending)'; }
    function renderSearchInterpolation() { const host = acquireDynamicVizHost(); host.textContent = 'search-interpolation (pending)'; }
```

- [ ] **Step 6: index.html — load modules**

After `<script src="js/list_doubly_viz.js"></script>`, add:
```html
    <script src="js/search_fibonacci_viz.js"></script>
    <script src="js/search_interpolation_viz.js"></script>
```

- [ ] **Step 7: Verify (including dispatch order)**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/app.js && echo "app.js OK"
node -e "require('./js/search_fibonacci_viz.js'); require('./js/search_interpolation_viz.js'); console.log('modules load OK')"
grep -c "id: 'search-fibonacci'" js/app.js
grep -c "id: 'search-interpolation'" js/app.js
grep -c "function renderSearchFibonacci" js/app.js
grep -c "function renderSearchInterpolation" js/app.js
grep -c 'search_fibonacci_viz.js' index.html
grep -c 'search_interpolation_viz.js' index.html
awk "/currentMode === 'search-fibonacci'\) renderSearchFibonacci/{a=NR} /includes\('search'\)\) renderSearchArray/{b=NR} END{ if(a&&b&&a<b) print \"ORDER OK\"; else print \"ORDER BAD: fib=\"a\" generic=\"b }" js/app.js
```
Expected: `app.js OK`, `modules load OK`, six `1`s, `ORDER OK`. If `ORDER BAD`, move the two new dispatch lines above the generic `includes('search')` line. If `node -c` fails, STOP/BLOCKED.

- [ ] **Step 8: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js index.html
git commit -m "feat(viz): register search-fibonacci & search-interpolation; load modules"
```

---

## Task 5: `renderSearchFibonacci()` + CSS

**Files:** Modify `js/app.js` (replace stub), `style.css`.

- [ ] **Step 1: Replace the `renderSearchFibonacci` stub**

In `js/app.js`, replace the `renderSearchFibonacci` stub line with:
```js
    let _fibState = null;
    function renderSearchFibonacci() {
        const host = acquireDynamicVizHost();
        if (!_fibState) _fibState = { arr: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19], target: 11 };
        const st = _fibState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const res = FibSearchViz.buildFibSearchFrames(st.arr, st.target);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="ss-controls">' +
              '<input type="text" class="ss-arr" value="' + st.arr.join(',') + '">' +
              'target <input type="number" class="ss-target" value="' + st.target + '" style="width:64px">' +
              '<button type="button" class="ss-apply">Apply</button>' +
              '<span class="sm-hint">array must be sorted</span>' +
            '</div>' +
            '<div class="ss-cells"></div>' +
            '<div class="ss-info"></div>' +
            '<div class="ss-result"></div>' +
            '<div class="ss-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.ss-cells')) return;
            const inRange = (i) => fr.range && i >= fr.range[0] && i <= fr.range[1];
            host.querySelector('.ss-cells').innerHTML = st.arr.map((v, i) =>
                '<span class="ss-cell' + (i === fr.probe ? ' probe' : (inRange(i) ? ' inrange' : '')) + '"><span class="ss-idx">' + i + '</span>' + v + '</span>').join('');
            host.querySelector('.ss-info').innerHTML = 'fibM=' + fr.fibM + ', fib1=' + fr.fib1 + ', fib2=' + fr.fib2 + ', offset=' + fr.lo;
            host.querySelector('.ss-result').textContent = fr.found >= 0 ? ('✓ found at index ' + fr.found) : '';
            host.querySelector('.ss-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 600));
        paint();
        host.querySelector('.ss-apply').onclick = () => {
            const arr = host.querySelector('.ss-arr').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite).sort((a, b) => a - b);
            const target = parseInt(host.querySelector('.ss-target').value, 10);
            if (arr.length && Number.isFinite(target)) { st.arr = arr; st.target = target; renderSearchFibonacci(); }
        };
    }
```

- [ ] **Step 2: Append CSS (shared `.ss-*` classes, also used by interpolation)**

Append to `style.css`:
```css
.ss-controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 10px; }
.ss-controls .ss-arr { flex: 1; min-width: 200px; }
.ss-cells { display: flex; flex-wrap: wrap; gap: 4px; margin: 8px 0; }
.ss-cell { position: relative; min-width: 34px; padding: 14px 6px 6px; background: #e2e8f0; border: 1px solid #cbd5e1; border-radius: 5px; text-align: center; font-weight: 700; }
.ss-cell .ss-idx { position: absolute; top: 1px; left: 0; right: 0; font-size: 9px; font-weight: 400; color: #94a3b8; }
.ss-cell.inrange { background: #dbeafe; border-color: #93c5fd; }
.ss-cell.probe { background: #f59e0b; border-color: #b45309; }
.ss-info { font-size: 13px; color: #475569; margin: 4px 0; }
.ss-result { font-weight: 700; color: #059669; min-height: 20px; }
.ss-phase { margin-top: 6px; color: #1e40af; font-style: italic; }
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/app.js && echo "app.js OK"
grep -c "search-fibonacci (pending)" js/app.js
node --test tests/unit/search_fibonacci_viz.test.js 2>&1 | grep -E 'pass [0-9]|fail [0-9]'
```
Expected: `app.js OK`; stub count `0`; unit pass 3 / fail 0.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js style.css
git commit -m "feat(viz): implement renderSearchFibonacci (range + probe + fib panel) + styles"
```

---

## Task 6: `renderSearchInterpolation()` + CSS

**Files:** Modify `js/app.js` (replace stub), `style.css`.

- [ ] **Step 1: Replace the `renderSearchInterpolation` stub**

In `js/app.js`, replace the `renderSearchInterpolation` stub line with:
```js
    let _interpState = null;
    function renderSearchInterpolation() {
        const host = acquireDynamicVizHost();
        if (!_interpState) _interpState = { arr: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], target: 70 };
        const st = _interpState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const res = InterpSearchViz.buildInterpFrames(st.arr, st.target);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="ss-controls">' +
              '<input type="text" class="ss-arr" value="' + st.arr.join(',') + '">' +
              'target <input type="number" class="ss-target" value="' + st.target + '" style="width:64px">' +
              '<button type="button" class="ss-apply">Apply</button>' +
              '<span class="sm-hint">sorted; works best when ~uniform</span>' +
            '</div>' +
            '<div class="ss-cells"></div>' +
            '<div class="ss-info"></div>' +
            '<div class="ss-result"></div>' +
            '<div class="ss-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.ss-cells')) return;
            const inRange = (i) => i >= fr.lo && i <= fr.hi;
            host.querySelector('.ss-cells').innerHTML = st.arr.map((v, i) =>
                '<span class="ss-cell' + (i === fr.pos ? ' probe' : (inRange(i) ? ' inrange' : '')) + '"><span class="ss-idx">' + i + '</span>' + v + '</span>').join('');
            const a = st.arr;
            host.querySelector('.ss-info').innerHTML = (fr.pos >= 0 && fr.lo <= fr.hi)
                ? 'pos = lo + (target − a[lo])·(hi − lo) / (a[hi] − a[lo]) = ' + fr.lo + ' + (' + st.target + '−' + a[fr.lo] + ')·(' + fr.hi + '−' + fr.lo + ')/(' + a[fr.hi] + '−' + a[fr.lo] + ') = ' + fr.pos
                : 'lo=' + fr.lo + ', hi=' + fr.hi;
            host.querySelector('.ss-result').textContent = fr.found >= 0 ? ('✓ found at index ' + fr.found) : '';
            host.querySelector('.ss-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();
        host.querySelector('.ss-apply').onclick = () => {
            const arr = host.querySelector('.ss-arr').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite).sort((a, b) => a - b);
            const target = parseInt(host.querySelector('.ss-target').value, 10);
            if (arr.length && Number.isFinite(target)) { st.arr = arr; st.target = target; renderSearchInterpolation(); }
        };
    }
```
(Reuses the `.ss-*` CSS added in Task 5 — no new CSS needed.)

- [ ] **Step 2: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/app.js && echo "app.js OK"
grep -c "search-interpolation (pending)" js/app.js
node --test tests/unit/search_interpolation_viz.test.js 2>&1 | grep -E 'pass [0-9]|fail [0-9]'
```
Expected: `app.js OK`; stub count `0`; unit pass 4 / fail 0.

- [ ] **Step 3: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js
git commit -m "feat(viz): implement renderSearchInterpolation (range + interp formula)"
```

---

## Task 7: i18n + desc_db

**Files:** Modify `js/i18n.js`, `js/desc_db.js`.

- [ ] **Step 1: i18n method names (both locales)**

In `js/i18n.js` `en` block:
```js
        'method.search-fibonacci': 'Fibonacci Search',
        'method.search-interpolation': 'Interpolation Search',
```
In the `zh` block:
```js
        'method.search-fibonacci': '費氏搜尋',
        'method.search-interpolation': '內插搜尋',
```

- [ ] **Step 2: desc_db entries**

In `js/desc_db.js`, before the closing `};` add:
```js
    'search-fibonacci': `
        <h3>Fibonacci Search</h3>
        <p>Search a sorted array by splitting at Fibonacci-number offsets (no division).</p>
        <hr>
        <ul>
            <li><strong>Probe:</strong> offset + fib2, clamped to the array</li>
            <li><strong>Shrink:</strong> step the Fibonacci numbers down toward the target</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(log N)</span>
            <span class="badge space">Space: O(1)</span>
        </div>
    `,
    'search-interpolation': `
        <h3>Interpolation Search</h3>
        <p>Estimate the target's position by linear interpolation within [lo, hi].</p>
        <hr>
        <ul>
            <li><strong>Probe:</strong> pos = lo + (target−a[lo])·(hi−lo) / (a[hi]−a[lo])</li>
            <li><strong>Best on:</strong> roughly uniformly distributed data</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Avg: O(log log N), Worst: O(N)</span>
            <span class="badge space">Space: O(1)</span>
        </div>
    `,
```

- [ ] **Step 3: Verify**
```bash
cd /Users/skhuang/course/dsvisual
node -c js/i18n.js && echo "i18n OK"
node -c js/desc_db.js && echo "desc OK"
grep -c 'method.search-fibonacci' js/i18n.js
grep -c 'method.search-interpolation' js/i18n.js
```
Expected: both OK; both counts `2`.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add js/i18n.js js/desc_db.js
git commit -m "feat(viz): i18n names + desc_db for fibonacci & interpolation search"
```

---

## Task 8: slides decks + build

**Files:** Modify `slides_db.js`; regenerate.

- [ ] **Step 1: Append two decks**

In `slides_db.js` (repo root), before `module.exports = SLIDES_DB;`, add:
```js
SLIDES_DB["search-fibonacci"] = {
  "category": "Searching & String Matching",
  "title": { "zh": "費氏搜尋", "en": "Fibonacci Search" },
  "slides": [
    { "heading": { "zh": "概念", "en": "Idea" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "在已排序陣列上,用費氏數來切分搜尋範圍,只需加減、不需除法。", "en": "Search a sorted array by splitting the range at Fibonacci offsets — only additions/subtractions, no division." } },
        { "type": "bullets", "items": [
          { "zh": "取 ≥ n 的最小費氏數作為起點。", "en": "Start from the smallest Fibonacci number ≥ n." },
          { "zh": "探測點 = offset + fib2(夾在陣列範圍內)。", "en": "Probe = offset + fib2 (clamped to the array)." },
          { "zh": "依比較結果讓費氏數往下一階移動。", "en": "Step the Fibonacci numbers down based on the comparison." }
        ] }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "時間 O(log N);空間 O(1)", "en": "Time O(log N); Space O(1)" },
          { "zh": "避免除法,對某些硬體較友善。", "en": "Avoids division — friendlier on some hardware." }
        ] }
      ] }
  ]
};
SLIDES_DB["search-interpolation"] = {
  "category": "Searching & String Matching",
  "title": { "zh": "內插搜尋", "en": "Interpolation Search" },
  "slides": [
    { "heading": { "zh": "概念", "en": "Idea" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "假設資料均勻分佈,用線性內插「猜」目標的位置,而非每次取中點。", "en": "Assuming uniform data, guess the target's position by linear interpolation instead of always taking the midpoint." } },
        { "type": "math", "tex": "pos = lo + \\frac{(target - a[lo])\\,(hi - lo)}{a[hi] - a[lo]}", "caption": { "zh": "內插位置公式", "en": "Interpolation position formula" } }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "平均 O(log log N)(均勻分佈時);最壞 O(N)", "en": "Average O(log log N) (uniform data); worst O(N)" },
          { "zh": "需注意 a[hi]=a[lo] 的除以零情形。", "en": "Watch out for division by zero when a[hi] = a[lo]." }
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
ls slides/zh/search-fibonacci.md slides/en/search-fibonacci.md slides/zh/search-interpolation.md slides/en/search-interpolation.md
```
Expected: `slides_db OK`; build prints `Generated N decks` (+2); all four md exist.

- [ ] **Step 3: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add slides_db.js js/slides_rendered.js slides/zh/search-fibonacci.md slides/en/search-fibonacci.md slides/zh/search-interpolation.md slides/en/search-interpolation.md
git commit -m "feat(viz): bilingual slides decks for fibonacci & interpolation search"
```

---

## Task 9: Playwright E2E

**Files:** Create `tests/search_fibonacci.spec.js`, `tests/search_interpolation.spec.js`.

- [ ] **Step 1: Create `tests/search_fibonacci.spec.js`**
```js
const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Fibonacci Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'search-fibonacci');
    });

    test('steps to a found result; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="search-fibonacci"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('search_fibonacci.cpp');
        await expect(sec.locator('.ss-cells')).toBeVisible();
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 12; i++) await step.click();
        await expect(sec.locator('.ss-result')).toContainText('found at index');
    });
});
```

- [ ] **Step 2: Create `tests/search_interpolation.spec.js`**
```js
const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Interpolation Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'search-interpolation');
    });

    test('steps to a found result; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="search-interpolation"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('search_interpolation.cpp');
        await expect(sec.locator('.ss-cells')).toBeVisible();
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 12; i++) await step.click();
        await expect(sec.locator('.ss-result')).toContainText('found at index');
    });
});
```

- [ ] **Step 3: Run**
```bash
cd /Users/skhuang/course/dsvisual
npx playwright test tests/search_fibonacci.spec.js tests/search_interpolation.spec.js --reporter=line
```
Expected: both PASS. If the result doesn't appear, the default target may not be found within the step count — confirm the default target is present in the default array (fib target 11 in [1..19]; interp target 70 in [10..100]) and increase the loop if needed. Do NOT commit failing tests; report BLOCKED if unresolved.

- [ ] **Step 4: Commit**
```bash
cd /Users/skhuang/course/dsvisual
git add tests/search_fibonacci.spec.js tests/search_interpolation.spec.js
git commit -m "test(viz): E2E for fibonacci & interpolation search"
```

---

## Task 10: Full suite + README + finish

**Files:** Modify `README.md`.

- [ ] **Step 1: README rows**

In `README.md`, add to the Search Algorithms section:
```
| Fibonacci Search | Split a sorted array at Fibonacci offsets |
| Interpolation Search | Probe by linear interpolation of the target |
```

- [ ] **Step 2: Full suite**

Run: `cd /Users/skhuang/course/dsvisual && npm run test:all`
Expected: unit (incl. 2 new files) + Playwright all PASS. If a hardcoded method/tile COUNT test fails (e.g. `tests/i18n.spec.js` overview-tile count), update it (+2; same `searching` group so nav/category counts unchanged) and include in the Step 4 commit; report old→new. If a NON-count test fails, STOP and report BLOCKED.

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
git commit -m "docs(viz): list fibonacci & interpolation search in README"
```
Then use **superpowers:finishing-a-development-branch** for `feat/tier2-batch-e2`.

---

## Self-Review notes
- **Spec coverage (E2):** search-fibonacci §3.3 (Tasks 1,5,8), search-interpolation §3.4 (Tasks 2,6,8); shared pattern §2 (Tasks 3,4,7,9); acceptance §5 (Task 10).
- **Dispatch order (critical):** both new ids contain `search`; Task 4 guards that their dispatch precedes the generic `includes('search')` catch-all (ORDER OK check), and their updateLayout branches set only the code panel (no old searchContainer/searchActions).
- **Known verify-at-implementation points:** Task 10 anticipates overview-tile count +2 (nav/category unchanged — same `searching` group). The new methods use the frames model (not the old sleep-based search), so they don't touch `runLinearSearch`/`runBinarySearch`/`btnSearch*`.
- **Type/name consistency:** `buildFibSearchFrames` / `buildInterpFrames`; globals `window.FibSearchViz` / `window.InterpSearchViz`; method ids `search-fibonacci` / `search-interpolation`; shared `.ss-*` CSS (defined in Task 5, reused in Task 6). All consistent across modules, tests, renderers, index.html, build_db.
- **Fixtures verified by hand:** Fibonacci search on [1,3,5,7,9,11,13,15,17,19] target 11 → index 5 (= indexOf); absent 8 → -1. Interpolation on [10..100] target 70 → index 6; equal-valued [7,7,7,7] target 7 → 0 (div-by-zero guarded), 9 → -1.
- **No tree → no alignment caveat;** sorted-array cells only.
```
