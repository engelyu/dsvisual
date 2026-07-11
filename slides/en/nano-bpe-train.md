---
marp: true
theme: default
paginate: true
math: katex
title: "BPE Training: count → select max → merge"
category: "nano-LLM"
---

## What does BPE training learn?

From a corpus, learn a set of **merge rules**; at encode time these rules are applied in order to fuse frequent adjacent symbols into a new symbol (a sub-word piece).

> Three data structures divide the work: a list holds the symbols, a hash table counts, and a heap selects the top pair.

---

## Symbol Pool (doubly linked list)

Each word is first split into a chain of single-character symbols; `prev`/`next` are array indices, so a merge only needs to relink — no array shifting.

```cpp
struct Symbol { std::string piece; int prev; int next; bool dead; };
```

---

## Count Adjacent Pairs (hash table)

Sweep over all live symbols and tally how often each adjacent pair occurs.

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

## Select the Top Pair (heap)

Push every (count, pair) candidate into a max-heap; the heap top is the pair to merge this round. Ties are broken by the lexicographically **smallest** pair so the result is reproducible.

```cpp
// Cmp: higher count wins; on ties, the lexicographically smaller key wins.
std::priority_queue<Cand, std::vector<Cand>, Cmp> heap;
for (const auto& kv : counts) heap.push({kv.second, kv.first});
if (heap.top().first < 2) break;                // stop when no pair repeats
const std::string bestKey = heap.top().second;  // (max count, min key)
```

---

## Merge

Fuse every adjacent occurrence of the pair into one new symbol: extend the left symbol's text and remove the right symbol from the list (`dead = true`).

```cpp
pool[i].piece += pool[n].piece;
pool[i].next = pool[n].next;
pool[n].dead = true;
```

Repeat "count → select max → merge" until no pair repeats anymore, or the merge budget is used up.

---

## Complexity

- Per round: scan + count + merge are each $O(N)$
- Total: $O(N \times \text{merges})$
- Space: $O(N)$

---

## Summary

- The linked list turns a merge into an $O(1)$ relink, avoiding the whole-array shift an array would need.
- The hash table answers "who is most frequent this round"; the heap answers "select the single most frequent one".
- This is exactly the core loop of the SentencePiece / BPE tokenizer training phase.
