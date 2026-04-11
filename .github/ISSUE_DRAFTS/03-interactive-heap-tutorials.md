Title: Create Interactive Tutorials for Heap Modes
Labels: enhancement, heap, education, ux
Assignees:

## Summary

Add guided tutorials for heap modes so users can learn operations and structural rules through progressive, interactive steps inside the visualizer.

## Problem

The visualizer currently demonstrates operations well, but it does not actively teach what to look for. New users still need to infer the significance of swaps, links, consolidations, root lists, marked nodes, and null-path-length updates on their own.

## Goals

- Provide guided walkthroughs for each heap family
- Explain what is happening during key operations
- Turn the current visualizer into a more teachable experience without requiring a backend

## Proposed Scope

- Add a tutorial launcher for heap modes
- Provide at least one guided flow per heap type
- Include tutorial coverage for:
  - Insert
  - Peek or Find-Min
  - Extract
  - Merge behavior
  - Heap-specific structural concept
- Example heap-specific concepts:
  - Binary heap: sift-up and sift-down
  - Binomial heap: degree-based forest organization
  - Fibonacci heap: lazy consolidation and marked nodes
  - Leftist heap: null-path-length bias
  - Skew heap: self-adjusting merge behavior

## UX Notes

- Tutorial mode should be opt-in and easy to exit
- Highlighting, callouts, and status text should work together instead of competing
- The tutorial should advance on explicit user action for the first version; avoid complex autoplay logic

## Acceptance Criteria

- Heap modes expose an entry point for tutorials
- At least one guided tutorial is available for each current heap mode
- Tutorial steps visibly coordinate with the existing visualization and control system
- Users can cancel or restart a tutorial cleanly
- Existing non-tutorial workflows still behave normally

## Out of Scope

- User accounts or saved progress
- Voice narration or media assets
- Full curriculum management

## Implementation Notes

- Represent tutorial steps as structured data rather than hardcoded DOM mutations
- Reuse existing heap events and status display wherever possible
- Keep tutorial copy concise and mode-specific

## Test Plan

- Add focused UI tests for tutorial entry, step progression, and exit behavior
- Verify normal heap interactions still work after leaving tutorial mode
- Re-run:
  - `npm run test:unit`
  - `npm test -- --grep "Heap Visualizer Suite" --reporter=line`

## Dependencies

- Can land after the metrics panel if UI space is shared
- Should consider any layout changes introduced by additional heap types