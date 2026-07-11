---
marp: true
theme: default
paginate: true
math: katex
title: "計算圖（DAG）拓撲前向傳遞"
category: "nano-LLM"
---

## 計算圖 = DAG

把一次計算表示成有向無環圖(DAG):每個節點是一個運算(const / add / mul / …),邊表示「輸入依賴」。

> 節點必須等所有輸入節點都算完,才能被求值。

---

## 拓撲排序 (Kahn's Algorithm)

1. 計算每個節點的入度(in-degree,未求值的依賴數)。
2. 把入度為 0 的節點放入佇列。
3. 取出節點加入拓撲序,並將其後繼節點的入度減一;若減到 0 就加入佇列。

```cpp
void build_forward(int output) {
    order_.clear();
    std::vector<char> seen(nodes_.size(), 0);
    visit(output, seen);          // DFS 後序走訪 => 拓撲序
}
void visit(int node, std::vector<char>& seen) {
    if (seen[node]) return;
    seen[node] = 1;
    if (n.src0 >= 0) visit(n.src0, seen);   // 先走父節點
    if (n.src1 >= 0) visit(n.src1, seen);
    order_.push_back(node);                 // 後序 => 拓撲序
}
```

---

## 前向傳遞 (Forward Pass)

依照拓撲序逐一求值:因為依賴永遠排在被依賴者之前,求值當下所有輸入值必定已就緒。

```cpp
for (int id : order_) {
    switch (n.op) {
        case Op::Add: n.value = elementwise(...); break;
        case Op::Mul: n.value = elementwise(...); break;
        // ...
    }
}
```

---

## 複雜度

- 拓撲排序:$O(V + E)$
- 前向傳遞:$O(V + E)$
- 空間:$O(V + E)$

---

## 小結

- DAG + 拓撲序,是任何計算圖框架(如 ggml、PyTorch autograd)排程求值順序的基礎。
- 只要圖無環,拓撲序保證每個節點求值時輸入已就緒。
- 共用子節點(多個節點依賴同一輸入)只需以 visited 集合去重,避免重複求值。
