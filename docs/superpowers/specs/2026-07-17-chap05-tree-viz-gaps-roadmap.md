# Roadmap — chap05 Trees: closing the dsvisual visualization gaps

- Date: 2026-07-17
- Repo: `/Users/skhuang/course/dsvisual`
- Motivation: an audit of ds2026 `chap05_trees_core` against dsvisual's existing
  visualizations found six tree topics taught in the chapter with **no** (or only
  partial) interactive visualization. This roadmap decomposes closing those gaps
  into six independent sub-projects and sequences them.

This is an **umbrella / program** document. Each sub-project below gets its OWN
full cycle — brainstorm → design spec (`docs/superpowers/specs/…`) → implementation
plan (`docs/superpowers/plans/…`) → subagent-driven implementation → tests → PR —
exactly like the past viz work (tree-traversal/huffman, list-equivalence, RB
bilingual, magic-*). This file is not itself an implementation spec; it is the
map the six specs hang off.

## Already covered (context — NOT in scope)

`tree-traversal` (§5.4), `tree-expression` arithmetic (§5.4), `tree-bst` (§5.5),
`tree-threaded` (§5.6), `tree-general-binary` (§5.7), `tree-dsu` union-find with
weighting + path compression (§5.8.1), `game-tree` minimax/α-β (§5.8.3).

## The six sub-projects (in build order)

| # | Sub-project | chap05 § | Kind | One-line scope |
|---|---|---|---|---|
| 1 | **`tree-expression` boolean mode** | §5.5 | Enhance existing | Add a propositional mode (∧/∨/¬, variable leaves) to the existing expression-tree viz: postorder-evaluate under an assignment + a satisfiability sweep over assignments. |
| 2 | **`tree-reconstruct`** | §5.9 | New viz | Rebuild a binary tree from preorder+inorder: step through "preorder head = root, inorder position splits L/R, recurse", highlighting the shrinking index ranges. |
| 3 | **`tree-array-rep`** | §5.3 | New viz | Sequential (array) representation of a binary tree: map nodes to `1..n`, show `2i`/`2i+1`/`⌊i/2⌋` index arithmetic, and the wasted slots for a skewed tree vs a complete tree. |
| 4 | **`tree-catalan`** | §5.9 | New viz | Counting binary trees: the Catalan recurrence `Cₙ=ΣCᵢ·Cₙ₋₁₋ᵢ` vs the closed form, and enumeration of all distinct binary trees for small n. |
| 5 | **`decision-tree-coins`** | §5.8.2 | New viz | The 8-coins ternary decision tree: pick a (hidden) counterfeit + heavy/light, then walk the weighing decision tree (`<`/`=`/`>`) to identify it in 3 weighings. |
| 6 | **`tree-copy-equal`** | §5.5 | New viz | Parallel structural COPY and EQUAL: animate a deep copy of a tree, then a synchronized structural/content comparison of two trees (equal vs first-mismatch). |

**Sequence rationale:** #1 reuses the most existing machinery (smallest, proves
the pattern); #2 is highly visual and high teaching value; #3 is foundational and
simple; #4–#5 are more specialized; #6 is the lowest teaching value (kept because
the program is "all six", but built last). Sub-projects are independent — order
can be revised between cycles.

## Per-viz deliverable anatomy (the "complete past process")

Every NEW viz (#2–#6) ships this artifact set; the enhancement (#1) touches the
subset that applies. **Post-refactor layout (Stage 4, on `main` @ 62b835e+):**
per-visualizer renderers now live in `js/viz/viz_*.js` modules coordinated by a
`VizRegistry`/`VizCore`/`VizKit` seam (see `js/domains/README.md`), NOT inside
app.js. Modeled on `js/viz/viz_expr_tree.js` (built in #1).

1. **Pure frame-generator module** `js/<name>_viz.js` — dual-export IIFE
   (`window.<Name>Viz` + `module.exports`); pure `buildFrames(...) -> Frame[]`
   where each Frame is a redrawable snapshot with bilingual `msg:{zh,en}`. No DOM.
2. **Render module** `js/viz/viz_<name>.js` — a dual-export IIFE that defines
   `render<Name>()` using `K() = global.VizKit` helpers (`acquireDynamicVizHost`,
   `buildStepControls`, `langOf`, `getInputDifficulty`, …), draws the tree via a
   local `computeTreeLayout` copy, calls the pure module for frames, and ends with
   `global.VizRegistry.attach('<id>', { render, code: () => code<Name>, layout })`.
   Add a `<script src="js/viz/viz_<name>.js" defer>` tag in `index.html` (after
   `js/code_db.js`, before `js/app.js`).
3. **Registry entry** in `METHOD_GROUPS` (app.js `trees` group): `{id, title,
   file, visualizer, controls}`.
4. **Paired C++ demo** `cpp/<name>.cpp` + a `'<name>.cpp': 'code<Name>'` mapping
   in `build_db.js`; run `node build_db.js` to regenerate `js/code_db.js`.
5. **`desc_db.js`** long-form HTML description for the info panel (the file is
   English-only file-wide — match that convention; bilingual lives in the UI).
6. **Editable input + "Examples…" localStorage control** per
   `docs/conventions/example-feature.md` (`buildExamplesSelect`/`saveExample`),
   when the viz has a full-input control.
7. **Bilingual (zh/en)** step text + presets, re-rendering on language switch
   (RB-bilingual precedent).
8. **Tests:** `node --test` unit tests for the pure module's invariants +
   a Playwright e2e that loads the method, steps, and asserts key UI/state.
9. **(Optional, per viz) deck wiring:** add a `<!-- viz: <id> "Title" -->`
   directive to ds2026 `lectures/chap05/chap05_trees_core.md` so the course deck
   surfaces the viz (chap05 currently has none). This is a ds2026-repo edit and is
   tracked separately from the dsvisual viz work.

## Global constraints (all sub-projects)

- Minimal, additive integration — do NOT refactor app.js structure; add one
  module file + a `render*` function + one registry row per viz.
- Do NOT change behavior of existing methods (exception: #1 deliberately extends
  `tree-expression` with a mode toggle, keeping arithmetic mode unchanged as the
  default).
- Bilingual zh/en throughout; Step/Run/Reset animation via `buildStepControls`.
- Deterministic demos; unit-testable pure logic; Playwright e2e per viz.
- Each sub-project is its own branch + PR (matching past rhythm).

## Out of scope

- The already-covered topics listed above.
- Re-architecting app.js or the pipeline.
- chap09/10 tree topics (OBST, RB, m-way, Huffman, heaps) — already present.
- Non-chap05 chapters.

## Status

- [x] #1 `tree-expression` boolean mode — merged (PR #132)
- [x] #2 `tree-reconstruct` — merged (PR #133)
- [x] #3 `tree-array-rep` — merged (PR #134)
- [ ] #4 `tree-catalan` — spec/plan in progress
- [ ] #5 `decision-tree-coins`
- [ ] #6 `tree-copy-equal`
