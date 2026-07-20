# Pattern menu scoped to current category — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** While viewing a design pattern, `#pattern-mode-select` lists only the current category's patterns (e.g. Singleton → Singleton, Factory Method) instead of all 11.

**Architecture:** Snapshot the static option labels once at init; on pattern activation, repopulate the select from the active `METHOD_GROUPS` category group's methods (preserving labels), then set `.value` as today. `js/app.js` only.

**Tech Stack:** Vanilla JS; Playwright e2e.

## Global Constraints

- Concurrent refactor session — `git add` only the touched files by path; never `-A`/`.`/`-u`; `git status` first.
- Run the FULL Playwright suite (`npm test`) before merge. No METHOD_GROUPS/category change ⇒ i18n count assertions untouched.
- Do NOT add select→navigation behavior; do NOT i18n the labels; no `index.html` markup change.
- Option value = method id minus `pattern-` prefix (`pattern-singleton` → `singleton`).

---

### Task 1: Scope the pattern select to the active category

**Files:**
- Modify: `js/app.js` (init snapshot near line 1389; repopulate in the `currentMode.includes('pattern-')` branch ~line 1851)
- Test: `tests/patterns_menu.spec.js` (new)

**Interfaces:**
- Consumes: `METHOD_GROUPS` (pattern groups with `methods:[{id,title}]`), `patternModeSelect`, `currentMode`.
- Produces: after activating `pattern-<x>`, `#pattern-mode-select` contains exactly the active group's option values, `.value` === `<x>`.

- [ ] **Step 1: Write the failing e2e** — create `tests/patterns_menu.spec.js`:

```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const FILE_URI = 'file://' + path.resolve(__dirname, '../index.html');

async function optionValues(page) {
  return page.$$eval('#pattern-mode-select option', (os) => os.map((o) => o.value));
}

test.describe('pattern menu is scoped to the current category', () => {
  test('creational → only singleton, factory', async ({ page }) => {
    await page.goto(FILE_URI + '#m=pattern-singleton');
    await expect(page.locator('#pattern-mode-select')).toBeVisible();
    expect(await optionValues(page)).toEqual(['singleton', 'factory']);
    await expect(page.locator('#pattern-mode-select')).toHaveValue('singleton');
  });

  test('behavioral → only observer, strategy', async ({ page }) => {
    await page.goto(FILE_URI + '#m=pattern-observer');
    expect(await optionValues(page)).toEqual(['observer', 'strategy']);
    await expect(page.locator('#pattern-mode-select')).toHaveValue('observer');
  });

  test('architectural → its five patterns', async ({ page }) => {
    await page.goto(FILE_URI + '#m=pattern-mvc');
    expect(await optionValues(page)).toEqual(['mvc', 'layered', 'pubsub', 'pipefilter', 'di']);
    await expect(page.locator('#pattern-mode-select')).toHaveValue('mvc');
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx playwright test tests/patterns_menu.spec.js`
Expected: FAIL — all three list the full 11 options (menu not yet scoped).

- [ ] **Step 3: Snapshot labels at init** — in `js/app.js`, right after `const patternModeSelect = document.getElementById('pattern-mode-select');` (~line 1389), add:

```js
    const PATTERN_OPTION_LABELS = {};
    Array.from(patternModeSelect.options).forEach((o) => { PATTERN_OPTION_LABELS[o.value] = o.textContent; });
```

- [ ] **Step 4: Repopulate on activation** — in the `else if (currentMode.includes('pattern-'))` branch, immediately after `views.forEach(v => v.classList.add('hidden'));` (~line 1854) and before the per-pattern `if (currentMode === 'pattern-singleton')` chain, add:

```js
            const patGroup = METHOD_GROUPS.find((g) => g.methods.some((m) => m.id === currentMode));
            if (patGroup) {
                patternModeSelect.innerHTML = patGroup.methods.map((m) => {
                    const v = m.id.replace(/^pattern-/, '');
                    const label = PATTERN_OPTION_LABELS[v] || m.title;
                    return '<option value="' + v + '">' + label + '</option>';
                }).join('');
            }
```

(The existing per-pattern `patternModeSelect.value = '<name>'` lines then select the active option within the scoped list — the option is guaranteed present because it belongs to `patGroup`.)

- [ ] **Step 5: Run the e2e to confirm it passes**

Run: `npx playwright test tests/patterns_menu.spec.js`
Expected: PASS (all three).

- [ ] **Step 6: Full verification**

Run: `npm test`
Expected: PASS (full Playwright — the new spec plus no regression, especially any existing patterns/nav test and the demo button flow).

- [ ] **Step 7: Commit**

```bash
git add js/app.js tests/patterns_menu.spec.js
git commit -m "fix(dsvisual): scope the pattern menu to the active category"
```

---

## Self-Review

- **Spec coverage:** the init snapshot (Step 3) + activation-time repopulation (Step 4) implement the spec's two-part approach; the e2e (Step 1) covers all three category shapes and the `.value` check, matching the spec's Tests section.
- **Placeholder scan:** none — complete code and exact commands throughout.
- **Type consistency:** `patGroup.methods[].id` → strips `pattern-` to the option value used by the demo button (`patternModeSelect.value` at ~2844) and the e2e; label lookup keyed by that same value; `.value` set by the pre-existing per-pattern lines. No `index.html` change (labels sourced from the snapshot).
