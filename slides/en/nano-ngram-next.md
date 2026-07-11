---
marp: true
theme: default
paginate: true
math: katex
title: "n-gram Sampling: cumulative distribution + binary search"
category: "nano-LLM"
---

## What does n-gram sampling learn?

Given a fixed (n-1)-token context, an n-gram model records the count distribution of the "next token". To sample, turn that count distribution into a cumulative array, then use binary search to map a random number to the right token.

> Two data structures divide the work: a hash table stores context → counts; a cumulative array + binary search does the sampling.

---

## Context Count Table (hash table)

During training, each (n-1)-token context maps to a table of "next-token counts", stored in a hash table: context key → (next token → count).

```cpp
std::unordered_map<std::string,
    std::unordered_map<int, int>> table_;
```

---

## Cumulative Array (prefix sum)

Take the candidate tokens' counts under a context in order and prefix-sum them into a cumulative array; the cumulative array maps each token to a slice of $[0, total)$.

```cpp
std::vector<long> cumulative;
long running = 0;
for (const auto& kv : candidates) {
    running += kv.second;
    cumulative.push_back(running);
}
```

---

## Sampling (binary search)

Draw `r ∈ [0,1)`, multiply by the total to get `target = r · total`, then binary-search for "the first position whose cumulative count exceeds target" — that is the sampled token.

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

## Boundary Rule

Fixed rule: pick **the first index i with `target < cumulative[i]`**. So when `target` lands exactly on a boundary (equal to the previous bucket's cumulative count), it falls into the next bucket — the same rule the JS visualization steps use, so the results match.

---

## Complexity

- Build table: training over the whole corpus is $O(\text{corpus size})$
- Sample: once the cumulative array is built, each draw is $O(\log k)$ (k = number of candidate tokens)
- Space: $O(k)$

---

## Summary

- The hash table answers "under this context, who has occurred how many times".
- The cumulative array + binary search answers "turn a random number into a concrete token".
- A fixed `r` always maps to a fixed token, so sampling is reproducible — handy for testing and debugging.
