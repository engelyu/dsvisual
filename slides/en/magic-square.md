---
marp: true
theme: default
paginate: true
math: katex
title: "Magic Square (Coxeter's Rule)"
category: "Arrays"
---

## Magic Square

A magic square is an $n \times n$ grid filled with $1$ through $n^2$ so every row, column, and main diagonal has the same sum.

$$M = \frac{n(n^2+1)}{2}$$

Every row, column, and diagonal should equal this magic sum.

> Here we use Coxeter's rule for odd-order magic squares, also commonly called the Siamese method.

---

## Coxeter's Rule

1. Place 1 in the center of the top row.
2. Try to move one cell up-right each time; wrap around at the edges.
3. If the up-right target is already occupied, move one cell down from the current cell instead.
4. Repeat until $n^2$ has been placed.

> In the visualizer, yellow marks the up-right trial cell, red marks an occupied cell, and indigo marks the fallback cell after a collision.

---

## Core Code

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

Modulo arithmetic wraps positions around the square, so no separate top-edge or right-edge case is needed.

---

## Limits and Complexity

- This Coxeter rule applies to odd order $n$.
- Each number is placed once: time $O(n^2)$.
- The square itself uses $O(n^2)$ space.
- The result can be checked by row sums, column sums, and diagonal sums.
