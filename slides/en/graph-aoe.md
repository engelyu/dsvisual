---
marp: true
theme: default
paginate: true
math: katex
title: "AOE Networks & Critical Path"
category: "Graphs"
---

## AOE Networks

Activity-on-Edge: vertices are events, edges are activities with durations — used for project scheduling.

- ee(v): earliest event time (forward pass)
- le(v): latest event time (backward pass)
- Critical activity: e(i)=l(i), forming the critical path

---

## Two Passes

1. Forward pass in topological order to get ee.
2. Backward pass in reverse topological order to get le.
3. Activity (u,v,w) is critical iff ee[u] = le[v] − w.

$$ee(v) = \max_{(u,v)\in E}\, ee(u)+w(u,v)$$

Forward-pass recurrence

---

## Complexity

- Time O(V+E); Space O(V+E)
- Critical-path length = ee(sink) = minimum project completion time
