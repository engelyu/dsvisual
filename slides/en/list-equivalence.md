---
marp: true
theme: default
paginate: true
math: katex
title: "Equivalence Classes (Linked List)"
category: "Linear Structures"
---

## Equivalence Relations

A relation ~ that is reflexive, symmetric, and transitive is an equivalence relation; it partitions a set into disjoint equivalence classes.

- Reflexive: i ~ i
- Symmetric: i ~ j ⟹ j ~ i
- Transitive: i ~ j and j ~ k ⟹ i ~ k

---

## Linked-List Adjacency Representation

For each input pair (i, j), head-insert j into i's list and i into j's list (head insertion, O(1)).

> Each of the n nodes keeps its own adjacency list (seq[i]) instead of an n×n relation matrix — much less space.

```cpp
for (auto& p : rel) {
    seq[p.first].push_back(p.second);
    seq[p.second].push_back(p.first);
}
```

---

## Two-Phase Find

1. Build phase: scan all input pairs and build the adjacency lists.
2. Find phase: for each unmarked node i, traverse with a stack (push/pop/scan), collecting every reachable node.
3. When the stack empties, that set is one connected component (equivalence class); move to the next unprocessed node and repeat until all are marked.

```cpp
stack<int> st; st.push(i); out[i] = true;
while (!st.empty()) {
    int j = st.top(); st.pop();
    for (int k : seq[j])
        if (!out[k]) { out[k] = true; st.push(k); }
}
```

---

## Contrast: Union-Find (Disjoint Set)

| Aspect | Linked List + Stack Traversal | Union-Find (Tree/DSU) |
| --- | --- | --- |
| Data structure | One adjacency list per node | Forest, one representative per tree |
| Merging a pair | O(1) head-insert, no real merge | union() merges trees by rank/size |
| Querying classes | Requires a full stack traversal O(n+e) | find() with path compression is near O(1) |

> Both solve the same partitioning problem, but Union-Find amortizes repeated queries via path compression, while the linked-list version shows the raw relation more directly.
