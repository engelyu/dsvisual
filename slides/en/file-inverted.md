---
marp: true
theme: default
paginate: true
math: katex
title: "Inverted Index"
category: "File Structures"
---

## Inverted Index & Full-Text Search

An inverted index is the core data structure behind full-text search. Instead of recording which terms each document contains, it inverts the relationship: each term maps to the list of documents that contain it (its posting list).

- Term: a keyword obtained after tokenizing a document and lower-casing it.
- Posting list: the sorted, de-duplicated list of document ids in which a term appears.

---

## Building the Index: Scan Docs, Append docIds

Build process: process each document in turn; for every term in it, append the document id to that term's posting list if not already present. A term repeated within the same document is recorded only once.

```cpp
map<string, set<int>> index;
for (size_t d = 0; d < docs.size(); ++d) {
    istringstream iss(docs[d]); string w;
    while (iss >> w) index[w].insert((int)d);
}
```

> The visualization steps through each term-to-docId insertion: documents on the left, the inverted index table growing step by step on the right.

---

## Query: Retrieve a Term's Posting List

1. Lower-case the query (case-insensitive) and look the term up in the index.
2. If found, return its posting list; those documents are the hits.
3. If the term is absent, return an empty posting list (no hits).

> The visualization highlights the index row for the query term and marks the matching documents in the left-hand document list.

---

## Multi-Term Query: Intersecting Posting Lists (AND)

For multi-term queries, a boolean AND query corresponds to intersecting the posting lists of the terms: only document ids present in every list are hits. Because posting lists are sorted, the intersection can be computed with a linear merge scan.

- AND: intersection; OR: union; NOT: complement (difference).
- Sorted posting lists let intersection and union run as efficient linear merges — a key reason search engines scale.
