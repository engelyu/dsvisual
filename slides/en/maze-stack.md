---
marp: true
theme: default
paginate: true
math: katex
title: "Maze Backtracking (Stack)"
category: "Linear Structures"
---

## Solving a Maze with a Stack

Depth-first search keeps the current path on an explicit stack: push when you can advance, pop to backtrack.

1. Push the start cell.
2. Move to the first unvisited open neighbour and push it.
3. If stuck, pop (backtrack).
4. When you reach the end, the stack is the solution path.

---

## Complexity

- Each cell visited at most once: O(R·C)
- Stack/visited space O(R·C)
