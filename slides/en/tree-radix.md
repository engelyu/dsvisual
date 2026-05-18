---
marp: true
theme: default
paginate: true
math: katex
title: "Radix Tree (Compressed Trie)"
---

## Radix Tree (Compressed Trie)

A Radix Tree (also called Patricia Trie) is a space-optimized Trie: chains of single-child nodes are compressed into one edge with a string label, drastically reducing node count.

---

## Core Concept

On insertion, the longest common prefix (LCP) with existing edge labels is found. If the new string shares part but not all of an existing label, the edge is split at the LCP, creating two child nodes.

- Edge labels: may be multi-character strings (e.g. "WATER"), not limited to one character.
- Splitting: inserting "WATCH" splits the "WATER" edge at "WAT", producing two sub-edges "ER" and "CH".
- Search: compare edge labels level by level in $O(L)$ time, with a smaller constant than standard Trie.
- Node count bound: at most twice the number of inserted strings.

---

## Operation Flow

1. Start at root; find the longest common prefix between the insertion string and each child edge label.
2. Full match: follow the edge and process the remaining characters.
3. Partial match: split the edge at the LCP; create a new intermediate node connecting the old suffix and new suffix.
4. No match: add a new child edge with the remaining characters at the current node.

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 206.422px; background-color: transparent;" viewBox="0 0 206.421875 270" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M103.211,86L103.211,92.167C103.211,98.333,103.211,110.667,103.211,122.333C103.211,134,103.211,145,103.211,150.5L103.211,156" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MTAzLjIxMDkzNzUsInkiOjg2fSx7IngiOjEwMy4yMTA5Mzc1LCJ5IjoxMjN9LHsieCI6MTAzLjIxMDkzNzUsInkiOjE2MH1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel" transform="translate(103.2109375, 123)"><g class="label" data-id="L_A_B_0" transform="translate(-47.6640625, -12)"><foreignObject width="95.328125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>insert WATCH</p></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(103.2109375, 47)"><rect class="basic label-container" style="" x="-83.3984375" y="-39" width="166.796875" height="78"/><g class="label" style="" transform="translate(-53.3984375, -24)"><rect/><foreignObject width="106.796875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>insert WATER<br />root -&gt; WATER*</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(103.2109375, 211)"><rect class="basic label-container" style="" x="-95.2109375" y="-51" width="190.421875" height="102"/><g class="label" style="" transform="translate(-65.2109375, -36)"><rect/><foreignObject width="130.421875" height="72"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>split at WAT<br />root -&gt; WAT -&gt; ER*<br />              -&gt; CH*</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## Radix Tree Compression Diagram

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 130" width="320" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><rect x="130" y="5" width="60" height="22" rx="4" fill="#f1f5f9" stroke="#94a3b8"/><text x="160" y="21">root</text><rect x="120" y="50" width="80" height="22" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="65">"WAT" node</text><rect x="60" y="100" width="60" height="22" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="90" y="115">ER* (WATER)</text><rect x="185" y="100" width="60" height="22" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="215" y="115">CH* (WATCH)</text><line x1="160" y1="27" x2="160" y2="50" stroke="#2563eb" stroke-width="2"/><text x="175" y="44" fill="#64748b" font-size="10">WAT</text><line x1="140" y1="72" x2="95" y2="100" stroke="#64748b"/><text x="107" y="93" fill="#64748b" font-size="10">ER</text><line x1="180" y1="72" x2="210" y2="100" stroke="#64748b"/><text x="205" y="93" fill="#64748b" font-size="10">CH</text></g></svg>

> "WATER" and "WATCH" share prefix "WAT" in one node, branching only at the point of difference — far fewer nodes than a standard Trie.

---

## Complexity Analysis

| Operation | Time | Space |
| --- | --- | --- |
| insert string | $O(L)$ | $O(L)$ |
| search string | $O(L)$ | $O(1)$ |
| Total Space | — | $O(N \cdot L)$ |

$$T_{\text{search}}(L) = O(L),\quad \text{nodes} \leq 2N$$

Search is $O(L)$; total node count is at most $2N$ — far lower than a standard Trie.

---

## Source Code

```cpp
class RadixNode {
public:
    map<string, RadixNode*> edges; // edge label -> child
    bool isEndOfWord;
    RadixNode() : isEndOfWord(false) {}
};

// Simplified insert: each word stored as a single edge from root.
// In a full radix tree, edges are split on longest-common-prefix.
void insert(string word) {
    RadixNode* curr = root;
    // Real implementation: scan edges for LCP, split if partial match
    if (curr->edges.find(word) == curr->edges.end())
        curr->edges[word] = new RadixNode();
    curr->edges[word]->isEndOfWord = true;
    // e.g., insert "WATCH" after "WATER":
    // find LCP="WAT", split "WATER" edge into "WAT"->"ER" and add "CH"
}
```

---

## Pros, Cons & When to Use

- Pro: far fewer nodes than a Trie — significantly better memory efficiency.
- Pro: search time remains $O(L)$ while retaining full prefix-search capability.
- Con: split/merge logic is more complex than standard Trie — harder to implement correctly.
- Use for IP routing tables (longest prefix match), URL routing, and genomic sequence indexing.

---

## Summary

- Compresses linear chains into multi-char edge labels; node count bounded by 2× the number of strings.
- Search $O(L)$ with memory far superior to standard Trie.
- LCP splitting is the core operation; widely used in IP routing and URL dispatchers.
