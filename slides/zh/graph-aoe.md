---
marp: true
theme: default
paginate: true
math: katex
title: "AOE 網路與關鍵路徑"
category: "Graphs"
---

## AOE 網路

Activity-on-Edge:頂點是事件,邊是有工時的活動,用於專案排程。

- ee(v):事件最早發生時間(forward pass)
- le(v):事件最晚發生時間(backward pass)
- 關鍵活動:e(i)=l(i),構成關鍵路徑

---

## 兩趟掃描

1. 依拓樸序做 forward pass 求 ee。
2. 依反拓樸序做 backward pass 求 le。
3. 活動 (u,v,w) 關鍵 ⟺ ee[u] = le[v] − w。

$$ee(v) = \max_{(u,v)\in E}\, ee(u)+w(u,v)$$

forward pass 遞迴式

---

## 複雜度

- 時間 O(V+E);空間 O(V+E)
- 關鍵路徑長 = ee(sink) = 專案最短完工時間
