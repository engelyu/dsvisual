---
marp: true
theme: default
paginate: true
math: katex
title: "BPE 訓練:計數 → 選最大 → 合併"
category: "nano-LLM"
---

## BPE 訓練要學什麼?

從語料中學出一份「合併規則」(merge rules),之後編碼時依序套用這些規則,把常見的相鄰符號合併成新的一個符號(sub-word piece)。

> 三種資料結構分工:串列存符號、雜湊表計數、heap 選出最大配對。

---

## 符號池(雙向串列)

每個字先拆成單一字元的符號鏈,`prev`/`next` 是陣列索引;合併時只需重新接線(relink),不必搬移陣列。

```cpp
struct Symbol { std::string piece; int prev; int next; bool dead; };
```

---

## 統計相鄰配對(雜湊表)

掃過所有還活著的符號,累計每個相鄰配對出現的次數。

```cpp
std::unordered_map<std::string, int> counts;
for (size_t i = 0; i < pool.size(); ++i) {
    if (pool[i].dead) continue;
    int n = pool[i].next;
    if (n == -1) continue;
    counts[packKey(pool[i].piece, pool[n].piece)]++;
}
```

---

## 選出最大配對(Heap)

把每個 (次數, 配對) 候選都丟進 max-heap,heap 頂就是這一輪要合併的配對;次數相同時取字典序最小的配對打破平手,確保結果可重現。

```cpp
// Cmp:次數大者優先;次數相同時 key 字典序小者優先。
std::priority_queue<Cand, std::vector<Cand>, Cmp> heap;
for (const auto& kv : counts) heap.push({kv.second, kv.first});
const std::string bestKey = heap.top().second;  // (最大次數, 最小 key)
```

---

## 合併(Merge)

把配對中每一次相鄰出現都合併成一個新符號:左符號的文字擴充、右符號從串列中摘除(`dead = true`)。

```cpp
pool[i].piece += pool[n].piece;
pool[i].next = pool[n].next;
pool[n].dead = true;
```

重複「計數 → 選最大 → 合併」直到沒有配對再重複出現,或用完合併預算。

---

## 複雜度

- 每一輪:掃描 + 計數 + 合併皆為 $O(N)$
- 總計:$O(N \times \text{merges})$
- 空間:$O(N)$

---

## 小結

- 串列讓合併變成 O(1) 的接線動作,不必像陣列一樣整體搬移。
- 雜湊表負責「這一輪誰最常見」,heap 負責「選出最常見的那一個」。
- 這正是 SentencePiece / BPE 分詞器訓練階段的核心迴圈。
