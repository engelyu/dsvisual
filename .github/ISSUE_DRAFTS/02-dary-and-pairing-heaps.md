Title: Implement D-ary Heap and Pairing Heap Modes
Labels: enhancement, heap, algorithm, visualization
Assignees:

## Summary

Expand heap coverage by adding d-ary heap and pairing heap modes to the visualizer, including source display, descriptions, controls, rendering, and tests.

## Problem

The current heap family covers common binary and merge-oriented heaps, but it still misses two useful teaching contrasts:

- D-ary heap for branching-factor tradeoffs
- Pairing heap as a simpler practical alternative to Fibonacci heap

## Goals

- Add new mode toggles for d-ary heap and pairing heap
- Extend the heap model layer with behavior needed by both modes
- Add clear visual differences so these modes do not feel like simple aliases
- Update source-code and description databases

## Proposed Scope

- Add `heap-dary` mode
- Add `heap-pairing` mode
- Add matching C++ reference source files
- Add descriptions and complexity notes in the description database
- Extend heap rendering so:
  - D-ary heap displays configurable or fixed branching factor clearly
  - Pairing heap displays merge-based structure rather than a plain binary array layout
- Support the current heap action set where reasonable:
  - Insert
  - Peek
  - Extract
  - Merge
  - Change key
  - Delete

## UX Notes

- D-ary heap should visually communicate that one parent may have more than two children
- Pairing heap should look structurally distinct from Fibonacci and Leftist heaps
- If a feature is only approximated in the visual model, the description text should say so explicitly

## Acceptance Criteria

- Both modes appear in the heap selector
- Both modes show source code and description content
- Both modes render correctly and respond to supported heap actions
- Min-Heap and Max-Heap switching still works
- Unit and Playwright tests cover both new modes

## Out of Scope

- Arbitrary user-defined d values for the first version if that complicates UI too much
- Full theoretical amortized analysis instrumentation

## Implementation Notes

- Start with a fixed `d`, such as 4, unless the UI cost of configurability is low
- Pairing heap likely deserves its own snapshot shape instead of reusing the current array-like fallback
- Build the source DB with `node build_db.js` after adding new `.cpp` files

## Test Plan

- Add unit coverage for the new heap model behaviors
- Extend the heap Playwright suite with source visibility and operation-flow tests for both modes
- Re-run:
  - `node build_db.js`
  - `npm run test:unit`
  - `npm test -- --reporter=line`

## Dependencies

- Prefer landing after the metrics panel only if the UI is being reorganized there; otherwise this can proceed in parallel