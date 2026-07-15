---
marp: true
theme: default
paginate: true
math: katex
title: "等價類(鏈結串列)"
category: "Linear Structures"
---

## 等價關係

關係 ~ 若同時滿足自反性、對稱性、遞移性,則稱為等價關係;它會把集合切成互不相交的「等價類」。

- 自反性: i ~ i
- 對稱性: i ~ j ⟹ j ~ i
- 遞移性: i ~ j 且 j ~ k ⟹ i ~ k

---

## 鏈結串列表示相鄰關係

每輸入一對 (i, j),把 j 插入 i 的鏈結串列頭端,並把 i 插入 j 的鏈結串列頭端(頭插法,O(1))。

> n 個節點各自維護一條鄰接串列(seq[i]),取代 n×n 的關係矩陣,節省空間。

```cpp
for (auto& p : rel) {
    seq[p.first].push_back(p.second);
    seq[p.second].push_back(p.first);
}
```

---

## 兩階段找出等價類

1. 建立階段:掃描所有輸入對,建出鄰接串列。
2. 找尋階段:對每個尚未標記的節點 i,用堆疊做走訪(push/pop/scan),收集所有可達節點。
3. 堆疊清空即得到一個連通分量(等價類);換下一個未處理節點,重複直到所有節點都標記完成。

```cpp
stack<int> st; st.push(i); out[i] = true;
while (!st.empty()) {
    int j = st.top(); st.pop();
    for (int k : seq[j])
        if (!out[k]) { out[k] = true; st.push(k); }
}
```

---

## 對照:互斥集合(Union-Find)

| 面向 | 鏈結串列 + 堆疊走訪 | Union-Find (樹狀) |
| --- | --- | --- |
| 資料結構 | 每節點一條鄰接串列 | 森林,每棵樹一個代表元 |
| 合併關係對 | O(1) 頭插,不做真正合併 | union() 依 rank/size 合併樹 |
| 查詢等價類 | 需整趟堆疊走訪 O(n+e) | find() 搭配路徑壓縮近乎 O(1) |

> 兩者解相同問題(切割成等價類),但 Union-Find 為「查詢多於合併」的場景做了攤銷優化,鏈結串列版本較直觀地展示了原始關係。
