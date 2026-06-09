---
marp: true
theme: default
paginate: true
math: katex
title: "中序轉後序與求值"
category: "Linear Structures"
---

## 為什麼用後序式

後序式(逆波蘭)不需括號與優先權規則,適合用堆疊機械式求值。

---

## Shunting-Yard 轉換

1. 運算元直接輸出。
2. 運算子:先彈出堆疊中優先權 ≥ 自己者,再入堆疊。
3. ( 入堆疊;) 彈出到 ( 為止。
4. 掃描完畢,彈出剩餘運算子。

```cpp
while (!ops.empty() && ops.top() != '(' &&
       prec(ops.top()) >= prec(c)) {
    out += ops.top(); out += ' '; ops.pop();
}
ops.push(c);
```

---

## 後序求值

由左到右掃描:遇運算元入堆疊,遇運算子彈出兩個、運算後推回。

> 例:A*(B+C)*D → A B C + * D *
