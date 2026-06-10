---
marp: true
theme: default
paginate: true
math: katex
title: "雙向 / 環狀串列"
category: "Linear Structures"
---

## 雙向串列

每個節點同時保有 prev 與 next 指標,可正向與反向走訪。

> 已知節點時,插入/刪除為 O(1)。

---

## 環狀串列

- 尾節點的 next 指回頭節點。
- 頭節點的 prev 指向尾節點。
- 適合輪詢 / 環形緩衝等場景。
