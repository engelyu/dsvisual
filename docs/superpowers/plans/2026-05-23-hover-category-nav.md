# Hover Category Nav Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the in-section `<select>` method picker with a hover-expand (and tap-toggle) dropdown anchored to each top-level category pill, so a user can pick any method directly from the top nav.

**Architecture:** `renderCategoryNav` is rewritten to output, per category, a wrapper `<div class="category-nav-item">` containing the existing pill button **and** a new `<div class="category-nav-dropdown">` with one `<button class="category-nav-method">` per method. CSS `.category-nav-item:hover` opens the dropdown on hover-capable devices; a JS-toggled `.open` class opens it on tap/click. The Design Patterns pill's dropdown is grouped (4 `<div class="category-nav-group-header">` sub-headers, methods listed under each). The method-section heading drops its `<label>`+`<select>` combo and shows just a static `<span class="method-heading-title">`. `loadMethod` in the test helper is rewritten to open the dropdown then click the method button.

**Tech Stack:** Vanilla browser JS (no build step, opened via `file://`), Playwright + `node:test`.

---

## File Structure

**Modified:**
- `app.js` — `renderCategoryNav` rewrite (lines around 740-801); `renderMethodSections` heading code (lines 472-510, the `methodPicker` block); `switchMode` (line 1232, end-of-function highlight update); new module-level `methodDropdownButtons` map + `dropdownGlobalListenersRegistered` flag (added near the existing `categoryButtons`/`subTabButtons` at lines 353-354).
- `style.css` — append `.category-nav-item` / `.category-nav-dropdown` / `.category-nav-method` / `.category-nav-group-header` rules at the end of the file.
- `tests/visualizer.spec.js` — rewrite `loadMethod` helper (lines 4-29); add two new dropdown-behaviour tests.

**Not modified:** `index.html`, any `.cpp` file, `slides_db.js`, any other file. The Design Patterns sub-tab row stays exactly as-is (kept as an active-state indicator).

**Reference points to read in advance:**
- `setActiveCategory` — `app.js:356-371` (no change needed; it already keys off `groupId`, not `currentMode`).
- `selectMethod` → `switchMode` — `app.js:561-563` and `app.js:1232-1253` (the `currentMode` mutation happens inside `visualizerRuntime.setMode`, called from `switchMode`).
- `renderMethodSections` — `app.js:454-559` (the function that builds the heading area; `method` is the active method at line 466).

---

## Task 1: Replace category nav + method picker with hover dropdown

**Files:** Modify `app.js`, `style.css`, `tests/visualizer.spec.js`.

This is one coherent refactor — the new DOM, the new CSS, the helper rewrite, and the two new tests all land in a single commit so the test suite stays at 132 passing afterwards (no intermediate broken state).

- [ ] **Step 1: Write the two new failing Playwright tests**

Add these two tests in `tests/visualizer.spec.js` immediately after the existing `Phase 5 regression: every top-level category renders method sections` test (which lives around line 107). They go inside the `test.describe('Data Structure Visualizer Full Suite', ...)` block:

```js
    test('Nav: category pill click toggles its dropdown; clicking a method button navigates', async ({ page }) => {
        const navItem = page.locator('.category-nav-item[data-group="trees"]');
        await navItem.locator('.category-nav-btn').click();
        await expect(navItem).toHaveClass(/\bopen\b/);
        await expect(navItem.locator('.category-nav-dropdown')).toBeVisible();
        await navItem.locator('.category-nav-method[data-method-id="tree-avl"]').click();
        await expect(page.locator('[data-method-section="tree-avl"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(navItem).not.toHaveClass(/\bopen\b/);
    });

    test('Nav: clicking outside the nav or pressing Esc closes any open dropdown', async ({ page }) => {
        const navItem = page.locator('.category-nav-item[data-group="trees"]');
        await navItem.locator('.category-nav-btn').click();
        await expect(navItem).toHaveClass(/\bopen\b/);
        await page.mouse.click(10, 600);
        await expect(navItem).not.toHaveClass(/\bopen\b/);
        await navItem.locator('.category-nav-btn').click();
        await expect(navItem).toHaveClass(/\bopen\b/);
        await page.keyboard.press('Escape');
        await expect(navItem).not.toHaveClass(/\bopen\b/);
    });
```

- [ ] **Step 2: Run the new tests to verify they fail**

Run: `npx playwright test -g "Nav: category pill click toggles|Nav: clicking outside"`
Expected: BOTH FAIL (no `.category-nav-item` element exists yet — the locator returns nothing and the `.click()` throws).

- [ ] **Step 3: Add module-level state for the dropdown**

In `app.js`, find the existing pair (around line 353-354):

```js
    const categoryButtons = new Map();
    const subTabButtons = new Map();
```

Append two declarations directly after them so they read:

```js
    const categoryButtons = new Map();
    const subTabButtons = new Map();
    const methodDropdownButtons = new Map();
    let dropdownGlobalListenersRegistered = false;
```

- [ ] **Step 4: Rewrite `renderCategoryNav`**

In `app.js`, replace the entire `renderCategoryNav` function (currently `app.js:740-801`) with this version:

```js
    function renderCategoryNav() {
        if (!categoryNav) return;
        categoryNav.innerHTML = '';
        categoryButtons.clear();
        subTabButtons.clear();
        methodDropdownButtons.clear();

        function activateGroup(groupId, methodId) {
            const group = getMethodGroupById(groupId);
            if (!group) return;
            const nextMethod = methodId || group.methods[0]?.id;
            setActiveCategory(group.id);
            if (nextMethod) {
                selectMethod(nextMethod);
            }
            scrollToCategory(group.id);
        }

        function closeAllDropdowns() {
            categoryNav.querySelectorAll('.category-nav-item.open')
                .forEach((it) => it.classList.remove('open'));
        }

        function buildPillItem(parentId, parentTitle, subGroups) {
            const item = document.createElement('div');
            item.className = 'category-nav-item';
            item.dataset.group = parentId;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'category-nav-btn';
            btn.dataset.group = parentId;
            btn.textContent = parentTitle;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const wasOpen = item.classList.contains('open');
                closeAllDropdowns();
                if (!wasOpen) item.classList.add('open');
            });

            const dropdown = document.createElement('div');
            dropdown.className = 'category-nav-dropdown' +
                (subGroups.length > 1 ? ' category-nav-dropdown-grouped' : '');

            subGroups.forEach((sg) => {
                if (subGroups.length > 1) {
                    const header = document.createElement('div');
                    header.className = 'category-nav-group-header';
                    header.textContent = sg.title;
                    dropdown.appendChild(header);
                }
                sg.methods.forEach((m) => {
                    const mb = document.createElement('button');
                    mb.type = 'button';
                    mb.className = 'category-nav-method';
                    mb.dataset.methodId = m.id;
                    mb.textContent = m.title;
                    mb.addEventListener('click', () => {
                        activateGroup(sg.id, m.id);
                        closeAllDropdowns();
                    });
                    methodDropdownButtons.set(m.id, mb);
                    dropdown.appendChild(mb);
                });
            });

            item.appendChild(btn);
            item.appendChild(dropdown);
            categoryButtons.set(parentId, btn);
            return item;
        }

        const subTabRow = document.createElement('div');
        subTabRow.className = 'category-subtab-row';
        subTabRow.dataset.testid = 'category-subtab-row';

        const renderedParents = new Set();
        METHOD_GROUPS.forEach((group) => {
            if (group.parent) {
                if (!renderedParents.has(group.parent)) {
                    renderedParents.add(group.parent);
                    const subGroups = METHOD_GROUPS.filter((g) => g.parent === group.parent);
                    const item = buildPillItem(group.parent, group.parentTitle, subGroups);
                    categoryNav.appendChild(item);
                }
                const tabBtn = document.createElement('button');
                tabBtn.type = 'button';
                tabBtn.className = 'category-subtab-btn';
                tabBtn.dataset.subgroup = group.id;
                tabBtn.dataset.parent = group.parent;
                tabBtn.textContent = group.title;
                tabBtn.addEventListener('click', () => activateGroup(group.id));
                subTabButtons.set(group.id, tabBtn);
                subTabRow.appendChild(tabBtn);
            } else {
                const item = buildPillItem(group.id, group.title, [group]);
                categoryNav.appendChild(item);
            }
        });

        categoryNav.appendChild(subTabRow);

        if (!dropdownGlobalListenersRegistered) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.category-nav-item')) closeAllDropdowns();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeAllDropdowns();
            });
            dropdownGlobalListenersRegistered = true;
        }

        const initialGroup = getMethodGroupForMode('stack-array');
        setActiveCategory(initialGroup.id);
    }
```

Key behaviours:
- Each top-level group (or each `parent` value, for sub-grouped categories) becomes one `.category-nav-item` wrapper.
- For Design Patterns (`parent: 'patterns'`), `subGroups` is the 4 sub-tab groups; `buildPillItem` inserts a `.category-nav-group-header` before each sub-group's methods, producing a grouped dropdown.
- The sub-tab row is still appended at the end of `categoryNav` (unchanged from before).
- Document-level `click` (outside-click close) and `keydown` (Esc close) are registered once, guarded by `dropdownGlobalListenersRegistered`.
- Pill `click` stops propagation so the same click doesn't also trigger the outside-click close.

- [ ] **Step 5: Replace the method-section `methodPicker` with a static title span**

In `app.js`, inside `renderMethodSections` (the function at line 454), find this block (currently `app.js:477-507`):

```js
        const methodSelect = document.createElement('select');
        methodSelect.className = 'category-method-select method-heading-select';
        methodSelect.dataset.testid = 'method-select';
        methodSelect.dataset.group = group.id;
        methodSelect.id = `method-select-${group.id}`;
        methodSelect.setAttribute('aria-label', `Select ${group.title} method`);
        group.methods.forEach((candidate) => {
            const option = document.createElement('option');
            option.value = candidate.id;
            option.textContent = candidate.title;
            methodSelect.appendChild(option);
        });
        methodSelect.value = method.id;
        methodSelect.addEventListener('change', (event) => {
            const nextMethodId = event.target.value;
            setActiveCategory(getMethodGroupForMode(nextMethodId).id);
            selectMethod(nextMethodId);
            scrollToCategory(getMethodGroupForMode(nextMethodId).id);
        });
        const methodLabel = document.createElement('label');
        methodLabel.className = 'method-select-label';
        methodLabel.htmlFor = methodSelect.id;
        methodLabel.textContent = 'Method';
        const methodPicker = document.createElement('div');
        methodPicker.className = 'method-heading-picker';
        methodPicker.appendChild(methodLabel);
        methodPicker.appendChild(methodSelect);
```

Replace ALL of that with:

```js
        const methodPicker = document.createElement('span');
        methodPicker.className = 'method-heading-title';
        methodPicker.dataset.testid = 'method-heading-title';
        methodPicker.textContent = method.title;
```

The downstream lines (`titleRow.appendChild(methodPicker);`, `titleGroup.appendChild(titleRow);`, etc.) at `app.js:506-510` continue to work — they append `methodPicker` either way; only its element type and contents change.

- [ ] **Step 6: Update `switchMode` to refresh the dropdown's current-method highlight**

In `app.js`, find the end of `switchMode` (the existing function at line 1232, ending around line 1253). Immediately before the final `if(currentMode === 'tree-splay') ...` line, insert this block:

```js
        methodDropdownButtons.forEach((btn, mid) => {
            btn.classList.toggle('is-current-method', mid === currentMode);
        });
```

`switchMode` calls `visualizerRuntime.setMode(nextMode)` first thing (line 1234), which sets `currentMode = mode`, so by this point `currentMode` is the new method's id.

- [ ] **Step 7: Append the new CSS to `style.css`**

At the end of `style.css`, append:

```css
/* Category nav hover/tap dropdown */
.category-nav-item { position: relative; display: inline-block; }
.category-nav-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 50;
    min-width: 180px;
    max-height: 70vh;
    overflow-y: auto;
    background: #fff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 4px 0;
    margin-top: 4px;
}
.category-nav-item:hover .category-nav-dropdown,
.category-nav-item.open .category-nav-dropdown { display: block; }
.category-nav-method {
    display: block;
    width: 100%;
    text-align: left;
    padding: 6px 12px;
    background: none;
    border: 0;
    cursor: pointer;
    font-size: 14px;
    color: #1e293b;
    white-space: nowrap;
}
.category-nav-method:hover { background: #eff6ff; color: #1d4ed8; }
.category-nav-method.is-current-method { background: #dbeafe; font-weight: 600; }
.category-nav-group-header {
    padding: 8px 12px 4px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.05em;
}
.method-heading-title { font-size: 16px; font-weight: 600; color: #1e293b; }
```

The `.category-nav-item:hover` rule covers BOTH the pill and the dropdown inside the same wrapper — moving the mouse from pill into the dropdown does not close it. The `.method-heading-title` rule gives the replacement title span a sensible visual presence.

- [ ] **Step 8: Rewrite the `loadMethod` test helper**

In `tests/visualizer.spec.js`, replace the entire existing `loadMethod` function (currently lines 4-29) with:

```js
async function loadMethod(page, methodId) {
    const navItem = page.locator(
        `.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    const card = page.locator(`[data-method-section="${methodId}"]`);
    await expect(card).toHaveAttribute('data-runtime-state', 'active');
}
```

The signature `loadMethod(page, methodId)` is unchanged, so every existing test call site keeps working.

- [ ] **Step 9: Run the full Playwright suite**

Run: `npm test`
Expected: **88 passed** (86 existing tests, all still passing through the rewritten `loadMethod`, plus the 2 new dropdown tests). If any test fails, STOP and fix before committing.

- [ ] **Step 10: Run the full test suite (unit + Playwright)**

Run: `npm run test:all`
Expected: **132 passing** (44 unit + 88 Playwright).

- [ ] **Step 11: Commit**

```bash
git add app.js style.css tests/visualizer.spec.js
git commit -m "feat: hover-expand dropdown on category pills; remove in-section <select> picker"
```

---

## Task 2: Final verification + idempotency

**Files:** No expected modifications.

- [ ] **Step 1: Re-run the full test suite**

Run: `npm run test:all`
Expected: 132 passing (44 unit + 88 Playwright).

- [ ] **Step 2: Verify `format:code` idempotency**

This feature touches no `.cpp` files and no slide content, so `format:code` should produce no diff.

Run: `npm run format:code && git status --short`
Expected: only untracked files (e.g. `?? .claude/`). If a tracked file is modified, STOP and report.

- [ ] **Step 3: Verify `build:slides` idempotency**

This feature touches no slide content, so `build:slides` should produce no diff.

Run: `npm run build:slides && git status --short`
Expected: only untracked files. If a tracked file is modified, STOP and report.

- [ ] **Step 4: Final test run**

Run: `npm run test:all`
Expected: 132 passing.

If all four steps pass, the branch is ready. No commit needed in this task (no expected diff).

---

## Notes for the executor

- **Single coherent commit for Task 1.** The DOM rewrite, CSS, JS handlers, and `loadMethod` rewrite must land together — the existing test suite passes through `loadMethod`, and the rewritten helper needs the new DOM. Intermediate states would break all 86 existing tests.
- **The Design Patterns sub-tab row is unchanged.** It still renders under the pill row when Design Patterns is active. It's an active-state indicator + a secondary sub-group navigator, not a method picker — the user's "remove `<select>`" decision doesn't touch it.
- **Pill click no longer auto-loads the first method of its category.** It only toggles the dropdown open/closed. On desktop, the typical flow is hover-then-click-method (one motion, no pill click). On touch, tap-pill-then-tap-method (two taps).
- **Hover behaviour is pure CSS** — no JS hover handlers. The `.category-nav-item:hover` rule covers both the pill and the dropdown inside, so moving the mouse from one to the other never closes the dropdown.
- **The `is-current-method` highlight** is updated at the end of `switchMode` (after `visualizerRuntime.setMode` has updated `currentMode`).
- **Document-level listeners** are registered once via the `dropdownGlobalListenersRegistered` flag, so re-running `renderCategoryNav` (e.g. for future re-renders) doesn't accumulate handlers.
- **No `index.html` change.** All nav and section structure is JS-generated.
