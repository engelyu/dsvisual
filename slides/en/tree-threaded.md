---
marp: true
theme: default
paginate: true
math: katex
title: "Threaded Binary Tree"
category: "Trees"
---

## Idea

A binary tree wastes many null pointers; a threaded tree makes each null right pointer point to the inorder successor.

- Null right pointer → a thread to the inorder successor.
- Enables inorder traversal in O(1) extra space (no recursion/stack).

---

## Traversal

1. From the root, go left to the leftmost node.
2. Visit the node; if its right is a thread, follow it to the successor.
3. Otherwise go to the right subtree and then leftmost.
