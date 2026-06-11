---
marp: true
theme: default
paginate: true
math: katex
title: "m-way Search Tree"
category: "Trees"
---

## Definition

A generalization of the BST: each node has up to m−1 sorted keys and up to m children.

> Keys partition the value range into segments, each with a child pointer.

---

## Insertion

1. Within a node, find the segment the key belongs to.
2. If that child is null: insert into the node if it has room, else create a new child.
3. Otherwise descend into that child and repeat.

```cpp
if (p->children[i] == nullptr) {
    if ((int)p->keys.size() < m - 1)
        p->keys.insert(p->keys.begin() + i, key);
    else
        p->children[i] = makeLeaf(key);
    return root;
}
p = p->children[i];
```
