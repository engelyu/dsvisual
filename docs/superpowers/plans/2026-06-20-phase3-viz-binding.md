# Phase 3 — viz binding (deep-link + link generator) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `<!-- viz: <id> -->` lecture directives become clickable links that open the matching dsvisual interactive visualization, by adding `#m=<id>` deep-linking to the site and a shared link-expansion transform feeding both the Marp lecture build and the ipynb generator.

**Architecture:** Part A adds hash routing to `js/app.js` (read `#m=<id>` on load + on hashchange → existing `activateGroup`; `selectMethod` syncs the hash via `history.replaceState`). Part B adds one pure transform `pipeline/viz-link.js` (`expandVizLinks`) used by a new Marp build step (`pipeline/bind-viz.js` → `<chapter>.viz.md`) and by `pipeline/gen-ipynb.js` (pre-process before `parseLecture`). Proven on chap03.

**Tech Stack:** Vanilla JS (`js/app.js`); Node (CommonJS, `node --test`); Playwright (`@playwright/test`, file:// load); existing `pipeline/{parse-lecture,build-notebook,gen-ipynb}.js`.

## Global Constraints

- Pipeline modules: **CommonJS**, unit tests `node --test tests/unit/*.test.js`, **no new npm deps** (Node built-ins only). Verbatim from Phase 0/1.
- Link format (spec P3): a standalone blockquote line `> ▶ [互動視覺化:<label>](<baseUrl>#m=<id>)`, where `<label>` = the directive's optional quoted title, else the `<id>`.
- `baseUrl` default `https://skhuang.github.io/dsvisual/` (trailing slash), overridable via env `DSVISUAL_BASE_URL` or `opts.baseUrl`. URL = `baseUrl + '#m=' + id`.
- Directive form (spec §5 / Phase 0): `<!-- viz: ID -->` or `<!-- viz: ID "Label" -->`, on its own line. Only whole-line directives expand; an inline mid-line comment is left untouched.
- Deep-link id (spec P5): `<id>` is a `METHOD_GROUPS` method id in `js/app.js` (e.g. `stack-array`, `queue`, `deque`, `maze-stack`, `stack-list`) — identical to the chap03 `viz:` ids and `slides/en/*.md` basenames.
- The authoritative ds2026 md keeps `viz:` as comments; expansion happens only in the **derived** Marp `.viz.md` and in the generated notebook — never mutate the source md.
- Site change must NOT break the existing default (no hash → `stack-array` active, per `tests/visualizer.spec.js`). `history.replaceState` (not `location.hash=`) is used for the bonus sync so it fires no `hashchange` and adds no history entry.
- ds2026 md path: `${DS2026_DIR:-../ds2026}`. chap03 files: `chap03_stacks_queues_core.md` (viz ids: stack-list, stack-array, queue, maze-stack, deque) and `chap03_stacks_queues_modern_cpp.md` (viz ids: stack-array, queue, deque).
- Commit cadence: one commit per task. Spec: `docs/specs/2026-06-20-phase3-viz-binding-design.md`. Cross-repo notebook commits land in ds2026 (branch `feat/chap03-pipeline`).

---

## File Structure

| File | Responsibility |
|---|---|
| `js/app.js` (modify) | `applyHashRoute()` reads `#m=<id>` → `activateGroup`; called on boot + `hashchange`; `selectMethod` syncs hash via `replaceState`. |
| `tests/viz_deeplink.spec.js` (new) | Playwright: `#m=deque` opens deque; no hash keeps the default; selecting a method updates the URL hash. |
| `pipeline/viz-link.js` (new) | `expandVizLinks(md, opts)` — pure transform, `viz:` comment → blockquote link line. |
| `tests/unit/viz-link.test.js` (new) | Unit tests for `expandVizLinks`. |
| `pipeline/bind-viz.js` (new) | CLI: chapter md → derived `<chapter>.viz.md` (Marp source with links expanded). |
| `pipeline/gen-ipynb.js` (modify) | Run `expandVizLinks` on the md before `parseLecture` so viz links become notebook cells. |

---

### Task 1: Site deep-linking (`#m=<id>`) in `js/app.js`

**Files:**
- Modify: `js/app.js` (inside the `DOMContentLoaded` handler that starts at line 410; `selectMethod` is at line 683; `activateGroup(groupId, methodId)` at ~line 1139; `getMethodById` at ~line 698; `METHOD_GROUPS` and `visualizerRuntime` are in scope)
- Test: `tests/viz_deeplink.spec.js`

**Interfaces:**
- Consumes (existing, in the same closure): `getMethodById(id) -> method|null`, `activateGroup(groupId, methodId)`, `selectMethod(methodId)`, `METHOD_GROUPS` (array of `{id, methods:[{id,...}]}`), `visualizerRuntime.activeMode` (the active method id string).
- Produces: `applyHashRoute()` (closure-scoped); `selectMethod` now also calls `history.replaceState`.

- [ ] **Step 1: Write the failing Playwright test**

```javascript
// tests/viz_deeplink.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUri = 'file://' + path.resolve(__dirname, '../index.html');

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
});

test('deep-link #m=deque opens the deque visualizer', async ({ page }) => {
  await page.goto(fileUri + '#m=deque');
  await expect(page.locator('[data-method-section="deque"]')).toHaveAttribute('data-runtime-state', 'active');
});

test('no hash keeps the default (stack-array) active', async ({ page }) => {
  await page.goto(fileUri);
  await expect(page.locator('[data-method-section="stack-array"]')).toHaveAttribute('data-runtime-state', 'active');
});

test('unknown #m=nope falls back to the default, no error', async ({ page }) => {
  await page.goto(fileUri + '#m=nope');
  await expect(page.locator('[data-method-section="stack-array"]')).toHaveAttribute('data-runtime-state', 'active');
});

test('selecting a method updates the URL hash (bonus)', async ({ page }) => {
  await page.goto(fileUri);
  const navItem = page.locator('.category-nav-item:has(.category-nav-method[data-method-id="deque"])');
  await navItem.locator('.category-nav-btn').click();
  await navItem.locator('.category-nav-method[data-method-id="deque"]').click();
  await expect(page).toHaveURL(/#m=deque$/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/viz_deeplink.spec.js`
Expected: the deep-link and bonus tests FAIL (no routing yet); the no-hash test passes (default already works).

- [ ] **Step 3: Implement `applyHashRoute` + boot hook + hashchange + hash sync**

First, read `js/app.js` around lines 410 (boot), 683 (`selectMethod`), 698 (`getMethodById`), 1139 (`activateGroup`) to confirm scope. Then:

(a) Add `applyHashRoute` inside the `DOMContentLoaded` closure, AFTER `activateGroup` is defined:

```javascript
    function applyHashRoute() {
        const m = /^#m=([A-Za-z0-9-]+)$/.exec(window.location.hash || '');
        if (!m) return;                                   // no/!matching hash -> leave default
        const id = m[1];
        if (!getMethodById(id)) return;                   // unknown id -> leave default (no error)
        if (visualizerRuntime && visualizerRuntime.activeMode === id) return;  // already active
        const group = METHOD_GROUPS.find((g) => g.methods.some((x) => x.id === id));
        if (group) activateGroup(group.id, id);
    }
    window.addEventListener('hashchange', applyHashRoute);
```

(b) Call `applyHashRoute();` once at the very END of the boot sequence (after the default method/overview render is done inside the DOMContentLoaded handler — i.e. as the last statement before the handler closes).

(c) Bonus — sync the hash in `selectMethod` (line 683) using `replaceState` (fires no `hashchange`, adds no history entry, so no routing loop):

```javascript
    function selectMethod(methodId) {
        switchMode(methodId);
        const want = '#m=' + methodId;
        if (window.location.hash !== want) {
            history.replaceState(null, '', want);
        }
    }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/viz_deeplink.spec.js`
Expected: PASS (4 tests). Then run the existing suite to confirm no regression: `npx playwright test tests/visualizer.spec.js` → PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/skhuang/course/dsvisual
git add js/app.js tests/viz_deeplink.spec.js
git commit -m "feat(app): #m=<id> deep-linking to a visualization + hash sync"
```

---

### Task 2: `expandVizLinks` transform (`pipeline/viz-link.js`)

**Files:**
- Create: `pipeline/viz-link.js`
- Test: `tests/unit/viz-link.test.js`

**Interfaces:**
- Produces: `expandVizLinks(md: string, opts?: { baseUrl?: string }) => string`
  - Replaces each line matching `^<!--\s*viz:\s*<id>\s*("label")?\s*-->\s*$` with `> ▶ [互動視覺化:<label|id>](<baseUrl>#m=<id>)`.
  - `baseUrl` = `opts.baseUrl` || `process.env.DSVISUAL_BASE_URL` || `'https://skhuang.github.io/dsvisual/'`.
  - Lines that are not standalone viz directives (prose, code, inline comments, other directives like `code:`/`oj:`) are returned unchanged.

- [ ] **Step 1: Write the failing test**

```javascript
// tests/unit/viz-link.test.js
const { test } = require('node:test');
const assert = require('node:assert');
const { expandVizLinks } = require('../../pipeline/viz-link.js');

test('viz directive becomes a blockquote link with default base URL', () => {
  const out = expandVizLinks('<!-- viz: deque -->');
  assert.equal(out, '> ▶ [互動視覺化:deque](https://skhuang.github.io/dsvisual/#m=deque)');
});

test('optional quoted label is used as the link text', () => {
  const out = expandVizLinks('<!-- viz: stack-array "Stack (Array)" -->');
  assert.equal(out, '> ▶ [互動視覺化:Stack (Array)](https://skhuang.github.io/dsvisual/#m=stack-array)');
});

test('baseUrl option overrides the default', () => {
  const out = expandVizLinks('<!-- viz: queue -->', { baseUrl: 'http://localhost:8080/' });
  assert.equal(out, '> ▶ [互動視覺化:queue](http://localhost:8080/#m=queue)');
});

test('non-viz lines are untouched, viz lines among them are expanded', () => {
  const md = ['# Heading', '<!-- code: queue.cpp -->', '<!-- viz: queue -->', 'prose'].join('\n');
  const out = expandVizLinks(md).split('\n');
  assert.equal(out[0], '# Heading');
  assert.equal(out[1], '<!-- code: queue.cpp -->');   // code directive untouched
  assert.equal(out[2], '> ▶ [互動視覺化:queue](https://skhuang.github.io/dsvisual/#m=queue)');
  assert.equal(out[3], 'prose');
});

test('an inline (non-standalone) viz comment is left untouched', () => {
  const line = 'see this <!-- viz: deque --> inline';
  assert.equal(expandVizLinks(line), line);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/unit/viz-link.test.js`
Expected: FAIL — `Cannot find module '../../pipeline/viz-link.js'`

- [ ] **Step 3: Write minimal implementation**

```javascript
// pipeline/viz-link.js
'use strict';

const DEFAULT_BASE = 'https://skhuang.github.io/dsvisual/';
// Whole-line viz directive: <!-- viz: <id> ["label"] -->
const VIZ_LINE_RE = /^<!--\s*viz:\s*([A-Za-z0-9-]+)\s*(?:"([^"]*)")?\s*-->\s*$/;

function expandVizLinks(md, opts = {}) {
  const baseUrl = opts.baseUrl || process.env.DSVISUAL_BASE_URL || DEFAULT_BASE;
  return String(md).split('\n').map((line) => {
    const m = line.match(VIZ_LINE_RE);
    if (!m) return line;
    const id = m[1];
    const label = (m[2] && m[2].trim()) || id;
    return `> ▶ [互動視覺化:${label}](${baseUrl}#m=${id})`;
  }).join('\n');
}

module.exports = { expandVizLinks };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/unit/viz-link.test.js`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add pipeline/viz-link.js tests/unit/viz-link.test.js
git commit -m "feat(pipeline): expandVizLinks transform (viz directive -> link)"
```

---

### Task 3: Marp binding CLI (`pipeline/bind-viz.js`)

**Files:**
- Create: `pipeline/bind-viz.js`
- (No new unit test — `expandVizLinks` is covered by Task 2; this is the integration CLI, verified on chap03.)

**Interfaces:**
- Consumes: `expandVizLinks` (Task 2).
- CLI: `node pipeline/bind-viz.js <chapter.md> [--out <path>]` → writes the derived Marp source. Default out: sibling `<dir>/<basename>.viz.md`. Prints `wrote <path> (<n> viz links)`.

- [ ] **Step 1: Write the CLI**

```javascript
// pipeline/bind-viz.js
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { expandVizLinks } = require('./viz-link.js');

function main() {
  const args = process.argv.slice(2);
  const mdPath = args[0];
  if (!mdPath) { console.error('usage: node pipeline/bind-viz.js <chapter.md> [--out p]'); process.exit(2); }
  const outIdx = args.indexOf('--out');
  const dir = path.dirname(mdPath);
  const base = path.basename(mdPath).replace(/\.md$/, '');
  const outPath = outIdx !== -1 ? args[outIdx + 1] : path.join(dir, base + '.viz.md');

  const md = fs.readFileSync(mdPath, 'utf8');
  const expanded = expandVizLinks(md);
  fs.writeFileSync(outPath, expanded);
  const n = (expanded.match(/^> ▶ \[互動視覺化:/gm) || []).length;
  console.log(`wrote ${outPath} (${n} viz links)`);
}

if (require.main === module) main();
```

- [ ] **Step 2: Run on chap03 core and verify the links**

Run:
```bash
cd /Users/skhuang/course/dsvisual
node pipeline/bind-viz.js ../ds2026/chap03_stacks_queues_core.md --out /tmp/chap03.viz.md
grep -c '^> ▶ \[互動視覺化:' /tmp/chap03.viz.md      # expect 5
grep -oE '#m=[a-z-]+' /tmp/chap03.viz.md | sort -u   # expect: #m=deque #m=maze-stack #m=queue #m=stack-array #m=stack-list
```
Expected: 5 links; the five `#m=<id>` targets match the chap03 viz ids. (The original `../ds2026/chap03_stacks_queues_core.md` is unchanged — confirm `git -C ../ds2026 status` shows no modification to it.)

- [ ] **Step 3: Commit**

```bash
cd /Users/skhuang/course/dsvisual
git add pipeline/bind-viz.js
git commit -m "feat(pipeline): bind-viz CLI (chapter md -> derived .viz.md for Marp)"
```

---

### Task 4: Wire `expandVizLinks` into the ipynb generator

**Files:**
- Modify: `pipeline/gen-ipynb.js` (run `expandVizLinks` on the md before `parseLecture`)
- Output (regenerated, committed in ds2026): `notebooks/chap03_stacks_queues_core.ipynb`, `notebooks/chap03_stacks_queues_modern_cpp.ipynb`

**Interfaces:**
- Consumes: `expandVizLinks` (Task 2); existing `parseLecture` (Phase 0), `buildNotebook` (Phase 1).

- [ ] **Step 1: Modify gen-ipynb.js**

In `pipeline/gen-ipynb.js`, add the require and apply the transform to the md before parsing. Locate the line that reads the md and calls `parseLecture` (currently `const { cells } = parseLecture(fs.readFileSync(mdPath, 'utf8'));`) and change it to:

```javascript
const { expandVizLinks } = require('./viz-link.js');   // with the other requires at the top
// ...
const rawMd = fs.readFileSync(mdPath, 'utf8');
const { cells } = parseLecture(expandVizLinks(rawMd));
```

- [ ] **Step 2: Regenerate the chap03 notebooks and verify a viz link cell exists**

Run:
```bash
cd /Users/skhuang/course/dsvisual
node pipeline/gen-ipynb.js ../ds2026/chap03_stacks_queues_core.md
node pipeline/gen-ipynb.js ../ds2026/chap03_stacks_queues_modern_cpp.md
node -e "const fs=require('fs');const nb=JSON.parse(fs.readFileSync('../ds2026/notebooks/chap03_stacks_queues_core.ipynb','utf8'));const hit=nb.cells.some(c=>c.cell_type==='markdown'&&c.source.join('').includes('#m=deque'));console.log('core has viz link:',hit)"
```
Expected: each generate prints its `wrote … (N cells, M code)` line; the node check prints `core has viz link: true`.

- [ ] **Step 3: Re-run the pipeline unit suite (no regression)**

Run: `node --test tests/unit/*.test.js`
Expected: all pass (existing Phase 0/1 tests + Task 2's viz-link tests).

- [ ] **Step 4: Commit (two repos)**

```bash
cd /Users/skhuang/course/dsvisual
git add pipeline/gen-ipynb.js
git commit -m "feat(pipeline): expand viz links into generated notebooks"

cd /Users/skhuang/course/ds2026
git add notebooks/chap03_stacks_queues_core.ipynb notebooks/chap03_stacks_queues_modern_cpp.ipynb
git commit -m "chore(notebooks): regenerate chap03 with viz links"
```

(If the modern_cpp notebook had executed outputs from Phase 1, regenerating drops them — that is acceptable here; the executable-cell validation already happened in Phase 1, and re-execution under xcpp17 is a runner step. Note this in the report.)

---

## Self-Review

**Spec coverage:**
- Part A deep-linking `#m=<id>` + bonus hash sync (§3 Part A, P4) → Task 1 (`applyHashRoute`, boot hook, hashchange, `replaceState` sync) + Playwright tests incl. default-preserved and unknown-id fallback.
- `expandVizLinks` shared transform, baseUrl/env, label format (§3 Part B, P3, constraints) → Task 2.
- Marp output `<chapter>.viz.md`, source untouched (§3 B1, §4) → Task 3.
- ipynb output via pre-process before parseLecture (§3 B2, §4) → Task 4.
- Link id == method id == viz id (P5) → Task 3 Step 2 asserts the 5 `#m=<id>` match chap03 ids; Task 1 uses `getMethodById` to validate.
- Tests: unit (Task 2), Playwright (Task 1), integration (Task 3 grep, Task 4 node check) → matches §6.
- Consistency: linter unchanged (validates ids on the source md, which still has the comments) — Task 4 expands only the in-memory copy fed to parseLecture; source md untouched (asserted in Task 3 Step 2). Matches §7.
- Out of scope (correctly omitted): iframe, in-app deck-viewer embed, marp-cli-in-CI, viz thumbnails (§8).

**Placeholder scan:** No TBD/placeholder steps. Task 1 instructs reading app.js to confirm scope before editing (the symbols — `getMethodById`, `activateGroup`, `METHOD_GROUPS`, `visualizerRuntime.activeMode`, `selectMethod` — are all named with line numbers and confirmed to exist); the code to add is complete.

**Type consistency:** `expandVizLinks(md, opts)` signature identical across Tasks 2, 3, 4. The link format string is identical in Task 2's impl, its tests, and Task 3's count regex (`^> ▶ [互動視覺化:`). `#m=<id>` URL shape is identical in Task 1 (route parse `^#m=([A-Za-z0-9-]+)$`), Task 2 (emit), and the Playwright assertions. Method-id charset `[A-Za-z0-9-]` matches between the route regex and the viz-directive regex.
