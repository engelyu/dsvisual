# Reusable Viz Example (localStorage) Feature — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reusable "Examples…" dropdown (backed by localStorage, auto-saving inputs on Apply/Build) to `matrix-sparse-list` and `list-equivalence`, via a shared helper, and document it as the convention for future visualizations.

**Architecture:** A pure dual-export module `js/examples_store.js` (per-methodId localStorage load/save, unit-tested with a fake storage) + thin app.js wrappers `loadExamples`/`saveExample`/`buildExamplesSelect`. Wire the two named viz to render the dropdown, save the input on Build, and restore on select. Add a convention doc. `matrix-sparse` is left untouched.

**Tech Stack:** Vanilla browser JS, `node --test`, Playwright.

**Spec:** `docs/superpowers/specs/2026-06-30-viz-example-feature-design.md`

## Global Constraints

- localStorage key per method: `dsvisual:examples:<methodId>`. Saved list: dedupe, newest-first, cap 8, skip empty/default. All storage access try/catch (no throw on private-mode).
- Module pure/DOM-free, dual-export IIFE (`module.exports` + `global.ExamplesStore`).
- Auto-save the input on Apply/Build (mirror matrix-sparse); no separate save button.
- Do NOT modify `matrix-sparse` (its own `dsvisual:sparse:examples` impl stays). Do NOT retrofit other viz.
- No new method/group → counts unchanged (tiles 112 / categories 14 / nav 15). Do NOT edit count tests.
- `buildExamplesSelect` must be self-contained (own attribute-escape + truncate + bilingual label via `window.I18N.getCurrentLanguage()`), NOT depending on render-local `esc`/`trunc`/`langOf`.
- Do NOT touch `js/cloud-config.js`.

---

## Task 1: Pure `js/examples_store.js` + unit tests + app.js helpers + CSS + index.html

**Files:** Create `js/examples_store.js`, `tests/unit/examples_store.test.js`; Modify `js/app.js`, `index.html`, `style.css`.

**Interfaces:**
- Produces: `ExamplesStore.key(methodId)` → string; `.load(storage, methodId)` → `Array<{text}>`; `.save(storage, methodId, text, defaultText, cap?)`. app.js: `loadExamples(methodId)`, `saveExample(methodId, text, defaultText)`, `buildExamplesSelect(methodId, defaultText, currentText)` → `<select class="ex-select">` HTML string.

- [ ] **Step 1: Failing unit test** — create `tests/unit/examples_store.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert');
const S = require('../../js/examples_store.js');
function fakeStorage() { const d = {}; return { data: d, getItem: (k) => (k in d ? d[k] : null), setItem: (k, v) => { d[k] = String(v); } }; }

test('key format', () => { assert.strictEqual(S.key('foo-bar'), 'dsvisual:examples:foo-bar'); });

test('save then load round-trips', () => {
  const st = fakeStorage();
  S.save(st, 'm', 'aaa', 'DEF');
  assert.deepStrictEqual(S.load(st, 'm'), [{ text: 'aaa' }]);
});

test('dedupe, newest first', () => {
  const st = fakeStorage();
  S.save(st, 'm', 'a', 'DEF'); S.save(st, 'm', 'b', 'DEF'); S.save(st, 'm', 'a', 'DEF');
  assert.deepStrictEqual(S.load(st, 'm').map((e) => e.text), ['a', 'b']);
});

test('cap at 8, newest first', () => {
  const st = fakeStorage();
  for (let i = 0; i < 12; i++) S.save(st, 'm', 't' + i, 'DEF');
  const arr = S.load(st, 'm');
  assert.strictEqual(arr.length, 8);
  assert.strictEqual(arr[0].text, 't11');
});

test('skip default and empty', () => {
  const st = fakeStorage();
  S.save(st, 'm', 'DEF', 'DEF'); S.save(st, 'm', '', 'DEF');
  assert.deepStrictEqual(S.load(st, 'm'), []);
});

test('load filters dirty data', () => {
  const st = fakeStorage();
  st.data[S.key('m')] = JSON.stringify([{ text: 'ok' }, { nope: 1 }, 42, null, { text: 5 }]);
  assert.deepStrictEqual(S.load(st, 'm'), [{ text: 'ok' }]);
});

test('load returns [] on bad json; storage errors never throw', () => {
  const st = fakeStorage(); st.data[S.key('m')] = '{not json';
  assert.deepStrictEqual(S.load(st, 'm'), []);
  const bad = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); } };
  assert.deepStrictEqual(S.load(bad, 'm'), []);
  assert.doesNotThrow(() => S.save(bad, 'm', 'a', 'DEF'));
});

test('per-method isolation', () => {
  const st = fakeStorage();
  S.save(st, 'm1', 'a', 'DEF'); S.save(st, 'm2', 'b', 'DEF');
  assert.deepStrictEqual(S.load(st, 'm1').map((e) => e.text), ['a']);
  assert.deepStrictEqual(S.load(st, 'm2').map((e) => e.text), ['b']);
});
```
Run `node --test tests/unit/examples_store.test.js` → FAIL (module missing).

- [ ] **Step 2: Implement `js/examples_store.js`:**
```js
(function (global) {
  'use strict';

  function key(methodId) { return 'dsvisual:examples:' + methodId; }

  function load(storage, methodId) {
    try {
      var raw = storage.getItem(key(methodId));
      var arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      return arr.filter(function (e) { return e && typeof e.text === 'string'; });
    } catch (e) { return []; }
  }

  function save(storage, methodId, text, defaultText, cap) {
    try {
      if (text == null) return;
      text = String(text);
      if (text === '' || text === defaultText) return;
      cap = cap || 8;
      var arr = load(storage, methodId).filter(function (e) { return e.text !== text; });
      arr.unshift({ text: text });
      arr = arr.slice(0, cap);
      storage.setItem(key(methodId), JSON.stringify(arr));
    } catch (e) { /* ignore */ }
  }

  var api = { key: key, load: load, save: save };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ExamplesStore = api;
})(typeof window !== 'undefined' ? window : globalThis);
```
Run the unit test → PASS (8 tests).

- [ ] **Step 3: Add app.js helpers.** In the js/app.js main closure (near other small helpers, e.g. beside `getInputDifficulty`), add:
```js
    function loadExamples(methodId) { try { return ExamplesStore.load(localStorage, methodId); } catch (e) { return []; } }
    function saveExample(methodId, text, defaultText) { try { ExamplesStore.save(localStorage, methodId, text, defaultText); } catch (e) { /* ignore */ } }
    function buildExamplesSelect(methodId, defaultText, currentText) {
        var lang = (window.I18N && I18N.getCurrentLanguage) ? I18N.getCurrentLanguage() : 'en';
        var escAttr = function (s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); };
        var escText = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
        var trunc = function (s) { s = String(s); return s.length > 24 ? s.slice(0, 24) + '…' : s; };
        var placeholder = lang === 'zh' ? '範例…' : 'Examples…';
        var defLabel = lang === 'zh' ? '預設' : 'Default';
        var h = '<select class="ex-select" data-method="' + escAttr(methodId) + '">';
        h += '<option value="">' + placeholder + '</option>';
        h += '<option value="' + escAttr(defaultText) + '">' + defLabel + '</option>';
        loadExamples(methodId).forEach(function (e) {
            if (e.text === defaultText) return;
            h += '<option value="' + escAttr(e.text) + '">' + escText(trunc(e.text)) + '</option>';
        });
        h += '</select>';
        return h;
    }
```
(`currentText` is accepted for signature stability/future use; the select does not pre-select it — matches matrix-sparse, which always shows the placeholder.)

- [ ] **Step 4: `.ex-select` CSS** — append to style.css:
```css
.ex-select { max-width: 160px; padding: 2px 4px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; font-size: 0.85rem; color: #1e293b; }
```

- [ ] **Step 5: index.html** — add `<script src="js/examples_store.js" defer></script>` before `<script src="js/app.js">` (near the other `js/*_viz.js` includes; examples_store must load before app.js uses it).

- [ ] **Step 6: Verify + commit**
Run: `node --test tests/unit/examples_store.test.js` → 8 pass; `node --test tests/unit/*.test.js` → no regressions; `node --check js/app.js` → OK.
```bash
git add js/examples_store.js tests/unit/examples_store.test.js js/app.js index.html style.css
git commit -m "feat: reusable examples-store module + buildExamplesSelect helper

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Wire the Example dropdown into matrix-sparse-list + list-equivalence

**Files:** Modify `js/app.js` (renderMatrixSparseList, renderListEquivalence); Create `tests/viz_examples.spec.js`.

**Interfaces:**
- Consumes: `loadExamples`/`saveExample`/`buildExamplesSelect` (Task 1); existing `_mslState`, `MatrixSparseListViz.DEFAULT`, `.msl-input`/`.msl-build`; `_equivState`, `ListEquivalenceViz.DEFAULT`/`.parseInput`, `.eq-n`/`.eq-pairs`/`.eq-build`.

- [ ] **Step 1: matrix-sparse-list — add the dropdown to controls.** In `renderMatrixSparseList()` (js/app.js ~5709), in the `.msl-controls` innerHTML string, insert the examples select after the `msl-build` button (or after the rand-btn):
```js
              buildExamplesSelect('matrix-sparse-list', MatrixSparseListViz.DEFAULT, st.text) +
```
(Concatenate it into the controls string like the other control snippets.)

- [ ] **Step 2: matrix-sparse-list — save on Build + wire select.** In the `.msl-build` onclick (js/app.js ~5834), inside the existing try, after `st.text = host.querySelector('.msl-input').value;` and before/after the re-render, add:
```js
                saveExample('matrix-sparse-list', st.text, MatrixSparseListViz.DEFAULT);
```
Then after the other control handlers in the function, add:
```js
        var mslEx = host.querySelector('.ex-select');
        if (mslEx) mslEx.onchange = function (ev) { var v = ev.target.value; if (!v) return; st.text = v; renderMatrixSparseList(); };
```

- [ ] **Step 3: list-equivalence — serialize helpers + dropdown.** In `renderListEquivalence()` (js/app.js ~6785), add near the top of the function:
```js
        var serEq = function (s) { return s.n + '|' + s.pairs.map(function (p) { return p[0] + '=' + p[1]; }).join(','); };
        var defSerEq = serEq({ n: ListEquivalenceViz.DEFAULT.n, pairs: ListEquivalenceViz.DEFAULT.pairs });
```
In the controls innerHTML string, after the `eq-build` button, insert:
```js
              buildExamplesSelect('list-equivalence', defSerEq, serEq(st)) +
```

- [ ] **Step 4: list-equivalence — save on Build + wire select.** In the `.eq-build` onclick (js/app.js ~6899), inside the existing try, after `_equivState = parsed;` (and before/after re-render), add:
```js
                saveExample('list-equivalence', serEq(_equivState), defSerEq);
```
Then after the other handlers, add:
```js
        var eqEx = host.querySelector('.ex-select');
        if (eqEx) eqEx.onchange = function (ev) {
            var v = ev.target.value; if (!v) return;
            var bar = v.indexOf('|');
            var nStr = v.slice(0, bar), pairsStr = v.slice(bar + 1);
            var nClamped = Math.min(12, Math.max(1, parseInt(nStr, 10) || 1));
            var parsed = ListEquivalenceViz.parseInput(String(nClamped), pairsStr);
            parsed.pairs = parsed.pairs.slice(0, 20);
            _equivState = parsed;
            renderListEquivalence();
        };
```
NOTE: confirm the exact variable used for state in each render (`st` alias vs `_mslState`/`_equivState`) by reading the function, and use whatever it already uses; the save/serialize must read the CURRENT applied state.

- [ ] **Step 5: E2E** — create `tests/viz_examples.spec.js`. Preamble: `const { test, expect } = require('@playwright/test'); const { loadMethod } = require('./helpers'); const path = require('path'); const fileUri = 'file://' + path.resolve(__dirname, '../index.html');`
```js
test('matrix-sparse-list saves input as example and restores it', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'matrix-sparse-list');
  const card = page.locator('[data-method-section="matrix-sparse-list"]');
  const special = '9,0;0,9';
  await card.locator('.msl-input').fill(special);
  await card.locator('.msl-build').click();
  // the example now appears as an option
  await expect(card.locator('.ex-select option', { hasText: '9,0;0,9' })).toHaveCount(1);
  // change the input, then pick the saved example -> input restored
  await card.locator('.msl-input').fill('1,1;1,1');
  await card.locator('.ex-select').selectOption(special);
  await expect(card.locator('.msl-input')).toHaveValue(special);
});

test('list-equivalence saves input as example and restores it', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'list-equivalence');
  const card = page.locator('[data-method-section="list-equivalence"]');
  await card.locator('.eq-n').fill('4');
  await card.locator('.eq-pairs').fill('0=1,2=3');
  await card.locator('.eq-build').click();
  const optCount = await card.locator('.ex-select option').count();
  expect(optCount).toBeGreaterThanOrEqual(3); // placeholder + default + >=1 saved
  await card.locator('.eq-pairs').fill('0=3');
  await card.locator('.ex-select').selectOption('4|0=1,2=3');
  await expect(card.locator('.eq-pairs')).toHaveValue('0=1,2=3');
  await expect(card.locator('.eq-n')).toHaveValue('4');
});
```
IMPORTANT: verify the exact input selectors (`.msl-input`, `.eq-n`, `.eq-pairs`) and that `selectOption` matches the option value (matrix text / `n|pairs`). If `selectOption` by value string doesn't match (e.g. value differs after escaping), select by label or index and assert restoration. Adjust to the real DOM.

- [ ] **Step 6: Verify + commit**
Run: `node --test tests/unit/*.test.js` (unchanged pass); `npx playwright test tests/viz_examples.spec.js` (PASS); and regression `npx playwright test tests/matrix_sparse.spec.js tests/matrix_sparse_list.spec.js tests/list_equivalence.spec.js` (PASS — the two target viz still work and matrix-sparse is unaffected).
```bash
git add js/app.js tests/viz_examples.spec.js
git commit -m "feat: Example dropdown (localStorage) for matrix-sparse-list and list-equivalence

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: Convention doc + full suite

**Files:** Create `docs/conventions/example-feature.md`; Modify `README.md` (if it has a conventions/dev section — otherwise skip the README edit).

- [ ] **Step 1: Write `docs/conventions/example-feature.md`:**
```markdown
# Convention: Example (localStorage) feature for visualizations

Every visualization with an editable full-input control MUST provide an
"Examples…" dropdown that remembers the user's inputs in localStorage.

## How
1. Controls: render the dropdown with
   `buildExamplesSelect(methodId, defaultText, currentText)` (js/app.js) — a
   `<select class="ex-select">` listing "Examples…" (placeholder), "Default",
   and previously-saved inputs.
2. Save on Apply/Build: after a valid input is applied, call
   `saveExample(methodId, text, defaultText)`. Inputs are stored per method at
   `dsvisual:examples:<methodId>` (dedupe, newest-first, cap 8, default skipped).
3. Restore on select: `.ex-select` `onchange` loads the selected value into the
   input(s) and re-renders.

The load/save logic lives in the pure, unit-tested `js/examples_store.js`
(`ExamplesStore.load/save/key`); `js/app.js` wraps it with `localStorage`.

## Multi-field inputs
When a viz has more than one input field, serialize the whole input to a single
string for the example value and deserialize on select. Reference:
`list-equivalence` uses `"<n>|<pairs>"` (see `renderListEquivalence`).

## References
- `matrix-sparse-list` — single matrix-text input.
- `list-equivalence` — multi-field (n + pairs) via serialization.
- (`matrix-sparse` predates this helper and keeps its own equivalent impl.)
```

- [ ] **Step 2: README pointer (optional)** — if `README.md` has a "Development"/"Conventions" section, add one line: `- Visualizations with editable input include an Examples dropdown — see docs/conventions/example-feature.md`. If no such section exists, skip (do not force a new section).

- [ ] **Step 3: Full suite + secret check**
Run: `npm run test:all` → unit + Playwright all green (no count change expected — no new method/group). `git status --porcelain js/cloud-config.js` → empty.

- [ ] **Step 4: Commit**
```bash
git add docs/conventions/example-feature.md README.md
git commit -m "docs: convention for the reusable viz Example feature

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```
(Drop README.md from the add if unchanged.)

---

## Self-Review (completed by plan author)

**Spec coverage:** §3.1 `examples_store` module → Task 1 ✓. §3.2 app.js wrappers + `buildExamplesSelect` + CSS + index.html → Task 1 ✓. §3.3 matrix-sparse-list wiring → Task 2 Steps 1-2 ✓. §3.4 list-equivalence wiring + `n|pairs` serialization → Task 2 Steps 3-4 ✓. §3.5 convention doc → Task 3 ✓. §5 unit + E2E (incl. matrix-sparse-untouched regression) → Tasks 1/2 ✓. matrix-sparse left untouched; counts unchanged (Task 3 asserts, no edit).

**Placeholder scan:** Module + unit tests + app.js helper code are complete verbatim. Wiring steps give exact snippets + insertion points with a "read the function to confirm the state var" instruction (concrete, not a placeholder). Convention doc is complete. E2E is concrete with an "adjust selectors to real DOM" verification note.

**Type/name consistency:** `ExamplesStore.load(storage, methodId)`/`.save(storage, methodId, text, defaultText, cap?)`/`.key(methodId)` consistent across module, tests, app wrappers. `loadExamples`/`saveExample`/`buildExamplesSelect` signatures consistent between Task 1 definition and Task 2 usage. `.ex-select` class consistent (CSS, HTML, E2E). methodIds `matrix-sparse-list`/`list-equivalence` match existing method ids. `serEq`/`defSerEq` defined in Task 2 Step 3 and used in Step 4. `buildExamplesSelect` is self-contained (own esc/trunc/lang) — no dependency on render-local helpers. No new symbols collide (loadExamples/saveExample/buildExamplesSelect/ExamplesStore all new).
