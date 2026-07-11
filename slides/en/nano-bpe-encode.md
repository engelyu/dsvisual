---
marp: true
theme: default
paginate: true
math: katex
title: "BPE Encode (Trie Longest-Match)"
category: "nano-LLM"
---

## Vocabulary Trie

Insert every token of the vocabulary into a trie character by character; the terminal node stores that token's id.

> The trie size is proportional to the total number of characters across all vocab tokens: $O(\Sigma|\text{token}|)$.

---

## Greedy Longest Match

1. Starting at the current input position, walk down the trie edges as far as possible.
2. Each time you pass a terminal node, record the longest matching token *so far*.
3. When you can no longer descend (or hit the end of input), emit the recorded longest token.
4. If nothing matches from the start, fall back to emitting a single character (byte fallback), so unknown input can still be encoded.

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

## Complexity

- Build trie: $O(\Sigma|\text{token}|)$
- Encode: $O(|\text{input}| \times \text{max token len})$, independent of vocabulary size
- Space: $O(\Sigma|\text{token}|)$

---

## Summary

- The trie makes each step of the longest match cost only as much as the match length, not the whole vocabulary size.
- The greedy strategy always takes the longest available token (e.g. with `a`, `b`, `ab` all in the vocab, `ab` beats `a`+`b`).
- Byte fallback guarantees any character can be encoded, so an out-of-vocabulary piece never breaks encoding.
