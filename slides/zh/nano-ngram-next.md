---
marp: true
theme: default
paginate: true
math: katex
title: "n-gram 取樣:累積分布 + 二分搜尋"
category: "nano-LLM"
---

## n-gram 取樣要學什麼?

給定固定的 (n-1)-token 上下文,n-gram 模型記錄了「下一個 token」的出現次數分布。取樣時要把這份次數分布轉成累積陣列,再用二分搜尋把一個隨機亂數對應到正確的 token。

> 兩種資料結構分工:雜湊表存上下文 → 次數,累積陣列 + 二分搜尋做取樣。

---

## 上下文計數表(雜湊表)

訓練時,每個 (n-1)-token 上下文都對應一份「下一個 token 出現次數」的表,存在雜湊表裡:context key → (next token → count)。

```cpp
std::unordered_map<std::string,
    std::unordered_map<int, int>> table_;
```

---

## 累積陣列(前綴和)

把某個上下文底下的候選 token 依序取出次數,做前綴和,得到累積陣列;累積陣列把每個 token 對應到 `[0, total)` 上的一段區間。

```cpp
std::vector<long> cumulative;
long running = 0;
for (const auto& kv : candidates) {
    running += kv.second;
    cumulative.push_back(running);
}
```

---

## 取樣(二分搜尋)

抽一個 `r ∈ [0,1)`,乘上總次數得到 `target = r · total`,再二分搜尋「第一個累積次數大於 target 的位置」——這就是抽中的 token。

```cpp
int lo = 0, hi = (int)candidates.size() - 1, ans = hi;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (target < cumulative[mid]) { ans = mid; hi = mid - 1; }
    else lo = mid + 1;
}
return candidates[ans].first;   // sampled token
```

---

## 邊界規則

固定規則:選出**第一個滿足 `target < cumulative[i]` 的索引 i**。因此當 `target` 恰好落在邊界上(例如等於前一個 bucket 的累積次數),會落入下一個 bucket——這與 JS 視覺化步驟使用的是同一條規則,結果保證一致。

---

## 複雜度

- 建表:訓練整個語料為 $O(\text{corpus size})$
- 取樣:累積陣列建好後,每次抽樣為 $O(\log k)$(k = 候選 token 數)
- 空間:$O(k)$

---

## 小結

- 雜湊表負責「這個上下文底下,誰出現過幾次」。
- 累積陣列 + 二分搜尋負責「把一個隨機亂數,轉成一個具體的 token」。
- 固定的 `r` 永遠對應固定的 token,取樣具備可重現性,方便測試與除錯。
