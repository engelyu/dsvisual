---
marp: true
theme: default
paginate: true
math: katex
title: "BPE 編碼(Trie 最長匹配)"
category: "nano-LLM"
---

## 詞彙表 Trie

將詞彙表(vocab)中每個 token 逐字元插入 trie,終止節點標記該 token 的 id。

> Trie 的大小與詞彙表所有 token 字元數總和成正比:$O(\Sigma|\text{token}|)$。

---

## 貪婪最長匹配 (Greedy Longest Match)

1. 從輸入目前位置出發,沿 trie 邊盡量往下走。
2. 每經過一個終止節點,就記錄「目前為止」最長的匹配 token。
3. 走到無法再往下走(或輸入結尾)時,採用記錄的最長 token。
4. 若從起點就無法匹配任何 token,退回輸出單一字元(byte fallback),確保未知輸入仍可編碼。

```cpp
int node = 0, bestId = -1; size_t bestLen = 0;
for (size_t j = i; j < word.size(); ++j) {
    auto it = nodes_[node].children.find(word[j]);
    if (it == nodes_[node].children.end()) break;
    node = it->second;
    if (nodes_[node].id != -1) { bestId = nodes_[node].id; bestLen = j - i + 1; }
}
if (bestId == -1) { bestId = vocab_.id(std::string(1, word[i])); bestLen = 1; }
```

---

## 複雜度

- 建立 trie:$O(\Sigma|\text{token}|)$
- 編碼:$O(|\text{input}| \times \text{max token len})$,與詞彙表大小無關
- 空間:$O(\Sigma|\text{token}|)$

---

## 小結

- Trie 讓最長匹配的每一步只與匹配長度成正比,而非整個詞彙表大小。
- 貪婪策略保證每次都取最長可用 token(例如 `a`、`b`、`ab` 皆在表中時,`ab` 優先於 `a`+`b`)。
- Byte fallback 確保任何字元都能被編碼,不會因未登錄詞而中斷。
