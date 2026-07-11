---
marp: true
theme: default
paginate: true
math: katex
title: "Compute Graph (DAG) Topological Forward Pass"
category: "nano-LLM"
---

## Compute Graph = DAG

A single computation is a directed acyclic graph (DAG): each node is an operation (const / add / mul / …), and edges represent input dependencies.

> A node can only be evaluated once all of its input nodes have been computed.

---

## Topological Order (DFS post-order)

1. Start a depth-first traversal from the output node.
2. On entering a node, recurse into all of its input (parent) nodes first.
3. Only after every input has been visited, append the node itself to the order (post-order) — so a dependency always precedes what depends on it; a visited set avoids re-visiting shared inputs.

```cpp
void build_forward(int output) {
    order_.clear();
    std::vector<char> seen(nodes_.size(), 0);
    visit(output, seen);          // DFS post-order => topological order
}
void visit(int node, std::vector<char>& seen) {
    if (seen[node]) return;
    seen[node] = 1;
    if (n.src0 >= 0) visit(n.src0, seen);   // parents first
    if (n.src1 >= 0) visit(n.src1, seen);
    order_.push_back(node);                 // post-order => topo order
}
```

---

## Forward Pass

Evaluate node by node in topological order: because a dependency is always ordered before the node that uses it, all input values are guaranteed ready at evaluation time.

```cpp
for (int id : order_) {
    switch (n.op) {
        case Op::Add: n.value = elementwise(...); break;
        case Op::Mul: n.value = elementwise(...); break;
        // ...
    }
}
```

---

## Complexity

- Topological order: $O(V + E)$
- Forward pass: $O(V + E)$
- Space: $O(V + E)$

---

## Summary

- A DAG + topological order is the foundation for how any compute-graph framework (ggml, PyTorch autograd) schedules evaluation.
- As long as the graph is acyclic, the topological order guarantees a node's inputs are ready when it is evaluated.
- Shared sub-nodes (several nodes depending on the same input) are handled by a visited set, avoiding redundant evaluation.
