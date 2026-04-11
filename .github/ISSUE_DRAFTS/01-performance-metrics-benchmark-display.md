Title: Add Heap Performance Metrics and Benchmark Display
Labels: enhancement, heap, ui, analytics
Assignees:

## Summary

Add a metrics panel for heap modes that surfaces structural statistics and lightweight runtime benchmarks without disrupting the current visualizer workflow.

## Problem

Current heap modes expose only transient status messages. That is useful for single operations, but it does not give users a stable view of heap state or a way to compare heap families under repeated operations.

## Goals

- Add a persistent metrics area for heap modes
- Show current structural metrics in the UI
- Add an optional benchmark flow for repeated insert and extract workloads
- Keep benchmarking lightweight and understandable for educational use

## Proposed Scope

- Add a heap metrics panel near the existing heap controls or visualization area
- Show at least these live metrics:
  - Heap type
  - Current order: Min-Heap or Max-Heap
  - Node count
  - Root count for forest-based heaps
  - Estimated depth or height
  - Heap-specific notes such as Binomial degrees or Fibonacci marked-node count
- Add a benchmark action that can run a predefined dataset through the active heap mode
- Display timing results in a compact comparison-friendly format

## UX Notes

- Metrics should update after every heap operation
- Benchmark execution should clearly distinguish demo timing from strict algorithmic complexity
- If benchmark mode is running, relevant heap controls should be disabled until completion

## Acceptance Criteria

- Heap modes render a persistent metrics panel
- Metrics update correctly after insert, extract, merge, change-key, delete, and order switch
- Benchmark action works for all current heap modes
- Status messaging remains readable and is not overloaded with metrics text
- Existing heap tests still pass

## Out of Scope

- Server-side or persisted benchmark history
- Highly precise performance claims across browsers or machines
- Cross-tab or long-running profiling infrastructure

## Implementation Notes

- Prefer a small benchmark preset rather than user-defined arbitrary loops for the first version
- Use `performance.now()` for simple client-side timing
- Reuse the current heap model interface instead of building a parallel benchmark-only path

## Test Plan

- Add targeted unit coverage for any new metrics helper functions
- Add Playwright coverage for metrics visibility and benchmark completion state
- Re-run:
  - `npm run test:unit`
  - `npm test -- --grep "Heap Visualizer Suite" --reporter=line`

## Dependencies

- None; this can land independently