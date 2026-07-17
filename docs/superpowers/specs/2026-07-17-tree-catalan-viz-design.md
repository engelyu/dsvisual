# dsvisual — Counting binary trees / Catalan numbers viz (chap05 §5.9) — design

- Date: 2026-07-17
- Repo: `/Users/skhuang/course/dsvisual` (branch `feat/tree-catalan`)
- Umbrella: [chap05 tree-viz gaps roadmap](2026-07-17-chap05-tree-viz-gaps-roadmap.md) — **sub-project #4 of 6**.
- Motivation: ds2026 `chap05_trees_core` §5.9 teaches that there are exactly `Cₙ`
  distinct binary-tree shapes with `n` nodes, via the recurrence
  `Cₙ = Σᵢ Cᵢ·Cₙ₋₁₋ᵢ` and the closed form `C(2n,n)/(n+1)`. dsvisual has no viz for it.

## Post-refactor architecture (verified on `main` @ d9a46fd)

New viz following the Stage-4 layout (precedents `js/viz/viz_expr_tree.js` #1,
`js/viz/viz_tree_reconstruct.js` #2, `js/viz/viz_tree_array_rep.js` #3):

- **Pure logic:** `js/tree_catalan_viz.js` — dual-export IIFE `TreeCatalanViz`; no DOM.
- **Render:** `js/viz/viz_tree_catalan.js` — dual-export IIFE `renderTreeCatalan()`
  via `K() = global.VizKit`, ending in
  `global.VizRegistry.attach('tree-catalan', { render, code: () => (typeof codeTreeCatalan !== 'undefined' ? codeTreeCatalan : ''), layout: { host: 'dynamic' } })`.
- **Registry row** in app.js `METHOD_GROUPS` trees group:
  `{ id: 'tree-catalan', title: 'Counting Trees (Catalan)', file: 'tree_catalan.cpp', visualizer: 'catalan', controls: 'catalan' }`.
- **Load:** TWO `<script defer>` tags in `index.html` (pure then render), after
  `js/code_db.js`, before `js/app.js`.
- **Code drawer:** `cpp/tree_catalan.cpp` + `'tree_catalan.cpp': 'codeTreeCatalan'`
  mapping in `build_db.js`; regenerate `js/code_db.js` via `node build_db.js`.
- **Description:** `js/desc_db.js` entry `'tree-catalan'` (English-only; styled
  `class="complexities"`).

## Decisions (brainstorming, approved)

- **Primary visualization = enumerate shapes grouped by the recurrence** + a
  numeric sequence panel (approved: "枚舉形狀(依遞迴分組)+數列").
- Pick `n` (0–4). Enumerate ALL `Cₙ` distinct binary-tree **shapes** (unlabeled)
  by the recurrence: for each split — left-subtree size `i`, right size `n−1−i`
  (`i = 0…n−1`) — pair each of the `Cᵢ` left-shapes with each of the `Cₙ₋₁₋ᵢ`
  right-shapes → `Cᵢ·Cₙ₋₁₋ᵢ` trees in that group. Drawing them grouped by `i`
  makes the picture equal the recurrence.
- **Animation:** step through `i = 0…n−1`; each step reveals that group's little
  tree drawings and adds `Cᵢ·Cₙ₋₁₋ᵢ` to a running total; the final total equals
  `Cₙ` and is verified against the closed form.
- **Numeric sequence panel:** `C₀…C₁₀` by recurrence AND closed form, shown
  matching (`1,1,2,5,14,42,132,429,1430,4862,16796`).
- **Cap `n ≤ 4`** for enumeration/drawing (14 shapes; `n=5`→42 too many). The
  numeric panel goes to 10.
- **Additive, minimal:** one pure module + one render + one registry row + two
  index.html tags + one cpp + one desc entry.

## Component 1 — pure logic (`js/tree_catalan_viz.js`)

```
catalanNumber(n) -> number       // recurrence: C0=1, Cm = Σ_{i=0}^{m-1} Ci·C(m-1-i)
catalanClosed(n) -> number       // binom(2n,n)/(n+1) via exact running product

enumerateShapes(n) -> Shape[]     // Shape = null (empty) | { left:Shape, right:Shape }
  // n===0 -> [null]; else for i in 0..n-1: L=enumerateShapes(i),
  //   R=enumerateShapes(n-1-i); push { left:l, right:r } for each l∈L, r∈R.
  // returns exactly Cn shapes.

catalanSequence(maxN) -> [{ n, recurrence, closed }]   // n=0..maxN

buildCatalanFrames(n) -> { frames, total }
  Frame = {
    n, splitI,                         // current split (left size i)
    leftSize, rightSize,               // i and n-1-i
    ci, crest,                         // Ci and C(n-1-i)
    product,                           // Ci·C(n-1-i)
    groupShapes: Shape[],              // the Ci·C(n-1-i) shapes for this split
    runningTotal,                      // sum of products up to and incl. this split
    terms: [{ i, ci, crest, product }],// accumulated recurrence terms
    action: 'group'|'done',
    msg: { zh, en },
  }
  // For n===0: one 'group' frame with the single empty shape (total 1), then 'done'.
  // 'done' frame carries the full recurrence string, total, and the closed-form check.
```

Invariants (unit tests): `enumerateShapes(n).length === catalanNumber(n)` for
n=0..4 (1,1,2,5,14); `catalanNumber` and `catalanClosed` agree for n=0..10 and
equal the pinned sequence; each 'group' frame's `product === ci*crest` and
`groupShapes.length === product`; the final `total === catalanNumber(n)`; frames
carry bilingual `msg`.

## Component 2 — render (`js/viz/viz_tree_catalan.js`)

- `_state = { n: 3 }`.
- Controls: an `n` selector (buttons 0,1,2,3,4); Step/Run/Reset via
  `K().buildStepControls`.
- Stage: for the revealed splits, a row per split `i` — a header
  `left C_i (…) × right C_{n-1-i} (…) = product` and the group's `product` small
  tree drawings (each shape rendered compactly with a local `computeShapeLayout`;
  unlabeled nodes as small circles, empty children omitted).
- Recurrence line (accumulates): `Cₙ = C₀·Cₙ₋₁ + … = … running total`.
- **Numeric panel:** a table `n | recurrence | closed` for n=0..10 (via
  `catalanSequence(10)`), with a check mark that all rows match.
- On 'done': verdict — `total = Cₙ = <closed form> ✓`. Bilingual via `K().langOf`.

## Component 3 — supporting deliverables

- `cpp/tree_catalan.cpp`: `catalanRecurrence(n)` (DP array), `catalanClosed(n)`
  (running product), and a small driver-style `main`-free demo comment showing
  they agree; plus a `countShapes(n)` equal to the recurrence (the shape count).
  Regenerate code_db.
- `js/desc_db.js` `'tree-catalan'` entry (English; the recurrence, the closed
  form, and the "Cₙ distinct shapes" fact).
- Registry row + two index.html script tags.

## Testing / acceptance

1. **Unit (`node --test tests/unit/tree_catalan_viz.test.js`):** the invariants
   above (shape count = Catalan for n=0..4; recurrence == closed 0..10 == pinned
   sequence; per-group product/shape-count; final total; bilingual frames).
2. **e2e (Playwright, `tests/tree_catalan.spec.js`):** load `tree-catalan`, pick
   n=3, Run, assert the verdict/running total reaches `5`; assert the numeric
   panel shows `14` for C₄ and `42` for C₅; pick n=2 → total `2`.
3. Bilingual: labels/steps render zh and en; language switch re-renders.
4. Additive: no other viz/method affected; `npm run test:unit` + `npm test` green.

## Scope

- **In:** the `tree-catalan` viz (shape enumeration grouped by the recurrence,
  running-count animation, closed-form check, numeric C₀..C₁₀ panel), pure module,
  render, registry, cpp/code_db, description, tests.
- **Out:** enumeration/drawing for n>4; generating-function derivation; labeled
  trees; deck wiring (a later ds2026-repo step per the roadmap).

## Success criteria

A new `tree-catalan` viz enumerates and draws all `Cₙ` binary-tree shapes for a
chosen `n ≤ 4`, grouped by the root split so the picture equals the recurrence
`Cₙ = Σ Cᵢ·Cₙ₋₁₋ᵢ`, accumulates the count to `Cₙ`, and verifies it against the
closed form; a numeric panel shows `C₀…C₁₀` by both methods agreeing. Logic is
unit-tested, an e2e covers the enumeration total + the numeric panel, and the UI
is bilingual — consistent with the existing tree viz.
