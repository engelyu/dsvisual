---
marp: true
theme: default
paginate: true
math: katex
title: "魔方陣(Coxeter 規則)"
category: "Arrays"
---

## 魔方陣

魔方陣是一個 $n \times n$ 方格,填入 $1$ 到 $n^2$,使每列、每欄與兩條主對角線的總和都相同。

$$M = \frac{n(n^2+1)}{2}$$

每列、每欄與對角線都應得到這個 magic sum。

> 這裡採用奇數階魔方陣的 Coxeter 規則,也常稱為 Siamese method。

---

## Coxeter 規則

1. 從第一列中央放入 1。
2. 每次嘗試往右上方移動;超出邊界時以環狀方式包回。
3. 若右上方目標格已被占用,則從目前格往下一格。
4. 重複直到填入 $n^2$。

> 視覺化中黃色表示右上方試探格,紅色表示被占用,藍紫色表示碰撞後改走的下一格。

---

## 核心程式

```cpp
int row = 0, col = n / 2;
for (int value = 1; value <= n * n; ++value) {
    square[row][col] = value;

    int up = (row - 1 + n) % n;
    int right = (col + 1) % n;

    if (square[up][right] != 0) {
        row = (row + 1) % n;
    } else {
        row = up;
        col = right;
    }
}
```

模數運算讓位置在方陣邊界自動包回,因此不需要額外判斷上邊界或右邊界。

---

## 限制與複雜度

- 此 Coxeter 規則適用於奇數階 $n$。
- 每個數字填入一次:時間 $O(n^2)$。
- 方陣本身需要 $O(n^2)$ 空間。
- 最後可用列和、欄和、對角線和驗證結果。
