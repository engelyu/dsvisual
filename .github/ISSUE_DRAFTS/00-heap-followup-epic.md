Title: Heap Visualizer Follow-up Roadmap
Labels: enhancement, heap, roadmap
Assignees:

## Summary

Track the next set of heap visualizer improvements after the second-pass delivery.

## Context

The heap family implementation now includes:

- Five heap modes: Binary, Binomial, Fibonacci, Leftist, Skew
- Shared heap model with insert, peek, extract, merge, change-key, and delete
- Improved Binomial/Fibonacci visualization
- Advanced controls such as Find-Min and Heap Stats
- Unit and Playwright coverage for the current heap feature set

The next iteration should focus on three areas:

1. Performance metrics and benchmark display
2. New heap families: d-ary heap and pairing heap
3. Interactive tutorials for learning and guided exploration

## Scope

- Break follow-up work into separate deliverable issues
- Preserve the current static architecture: HTML, CSS, client-side JavaScript
- Keep new features compatible with the existing animation engine and test setup

## Child Issues

- [ ] Performance metrics and benchmark display
- [ ] D-ary heap and pairing heap support
- [ ] Interactive heap tutorials

## Acceptance Criteria

- Each child issue has a clear scope, UX definition, and test plan
- The implementation order is explicit enough to avoid overlapping work
- All follow-up work remains regression-safe for existing heap modes

## Suggested Order

1. Performance metrics and benchmark display
2. D-ary heap and pairing heap support
3. Interactive heap tutorials

## Risks

- The current heap model is intentionally simplified for visualization; new features should not imply algorithmic guarantees the model does not actually provide
- New UI panels can overcrowd the existing controls area if not grouped carefully
- Benchmarking inside a browser can produce noisy timings if sampling strategy is not controlled

## Test Plan

- Maintain existing `npm run test:unit` coverage
- Extend Playwright scenarios only where the new UI changes behavior
- Keep the full suite green with `npm test -- --reporter=line`