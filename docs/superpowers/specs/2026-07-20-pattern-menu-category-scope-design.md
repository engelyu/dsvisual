# Design-pattern menu scoped to the current category — design

- Date: 2026-07-20
- Repo: `/Users/skhuang/course/dsvisual`

## Problem

Design Patterns has 4 categories (submenus): Creational, Structural, Behavioral,
Architectural (`METHOD_GROUPS` groups `patterns-creational|structural|behavioral|
architectural`, each `parent: 'patterns'`). While viewing a specific pattern, the in-view
menu `<select id="pattern-mode-select">` (index.html) lists **all 11 patterns across all 4
categories**, flat. The request: that menu should list **only the currently-selected
category's** patterns (e.g. on Singleton → only Creational: Singleton, Factory Method).

## Current mechanics (verified)

- `index.html:146` — `<select id="pattern-mode-select">` with 11 hardcoded `<option>`s
  (descriptive labels, e.g. `Singleton - Unique Instance`); option `value` = the method id
  minus the `pattern-` prefix (`pattern-singleton` → `singleton`).
- `js/app.js` activation branch (`currentMode.includes('pattern-')`, ~1850–1920): un-hides
  the active pattern's `.pattern-view` and sets `patternModeSelect.value` to the active
  pattern.
- The select has **no change listener**; it only feeds the "Visualize Pattern" demo button
  (`btnPatternDemo` → `visualizePattern(patternModeSelect.value)`, ~2843). It does NOT drive
  navigation.

## Decision (approved)

When a pattern is activated, **dynamically repopulate `pattern-mode-select` with only the
active category group's patterns**, preserving the existing descriptive labels. Keep the
select's role (feeds the demo button); do NOT add select→navigation behavior (not
requested — category switching stays in the nav dropdown/subtabs).

## Implementation — `js/app.js` only

1. **Label snapshot (once, at init near `const patternModeSelect = …`):** capture the
   original options into an ordered map so labels survive dynamic rebuilds:
   ```js
   const PATTERN_OPTION_LABELS = {};
   Array.from(patternModeSelect.options).forEach((o) => { PATTERN_OPTION_LABELS[o.value] = o.textContent; });
   ```
2. **Repopulate on activation:** in the `currentMode.includes('pattern-')` branch, before
   the per-pattern `if/else` that sets `.value`, rebuild the options from the active group:
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
   The existing per-pattern `patternModeSelect.value = '<name>'` lines then select the active
   option within the now-scoped list (the option is guaranteed present — it's in the group).

No `index.html` markup change is required (the static options become the seed for the label
snapshot, then are replaced on first pattern activation). The demo button (`mode =
patternModeSelect.value`) and `visualizePattern` are unaffected — value semantics unchanged.

## Tests

Add/extend a Playwright test (e.g. `tests/patterns.spec.js` or the nearest existing
patterns/nav spec): activate a **Creational** pattern (`pattern-singleton`) and assert
`#pattern-mode-select` options are exactly `['singleton','factory']`; activate a
**Behavioral** pattern (`pattern-observer`) and assert options are exactly
`['observer','strategy']`; activate an **Architectural** pattern (`pattern-mvc`) and assert
5 options (`mvc,layered,pubsub,pipefilter,di`). Confirm the select's `value` equals the
active pattern in each case.

## Global constraints

- Concurrent refactor session — targeted `git add` of only touched files; never `-A`/`.`/`-u`.
- Run the FULL Playwright suite (`npm test`) before merge. No METHOD_GROUPS/category change
  ⇒ i18n count assertions untouched.
- English-only labels stay as-is (the select is not i18n-wired today; out of scope).

## Out of scope

- Making the select drive navigation; i18n of the option labels; restyling the select;
  changing the nav dropdown/subtabs; any other category's behavior.

## Success criteria

While viewing any pattern, `#pattern-mode-select` lists only that pattern's category
members with their original labels and the active one selected; the demo button still works;
full Playwright green; change confined to `js/app.js` (+ the test), no unrelated churn.
