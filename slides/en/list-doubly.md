---
marp: true
theme: default
paginate: true
math: katex
title: "Doubly / Circular Linked List"
category: "Linear Structures"
---

## Doubly Linked List

Each node holds both prev and next pointers, allowing forward and backward traversal.

> Given a node, insertion/deletion is O(1).

---

## Circular Variant

- The tail's next points back to the head.
- The head's prev points to the tail.
- Useful for round-robin / ring buffers.
