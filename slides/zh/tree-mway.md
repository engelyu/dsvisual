---
marp: true
theme: default
paginate: true
math: katex
title: "m 路搜尋樹"
category: "Trees"
---

## 定義

二元搜尋樹的推廣:每個節點最多有 m−1 個排序鍵與 m 個子節點。

> 鍵把鍵值區間切成數段,各段對應一個子指標。

---

## 插入

1. 在節點內找到鍵應落的區間。
2. 若該子指標為空:節點未滿則直接插入,已滿則新建子節點。
3. 否則往該子節點下降,重複。

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
