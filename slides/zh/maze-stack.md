---
marp: true
theme: default
paginate: true
math: katex
title: "迷宮回溯(堆疊)"
category: "Linear Structures"
---

## 用堆疊解迷宮

深度優先搜尋用顯式堆疊記錄目前路徑;走得通就推入,走不通就彈出回溯。

1. 推入起點。
2. 嘗試走到第一個未訪的通道鄰格並推入。
3. 無路可走則彈出(回溯)。
4. 到達終點時,堆疊即為解路徑。

---

## 複雜度

- 每格最多訪一次:O(R·C)
- 堆疊/visited 空間 O(R·C)
