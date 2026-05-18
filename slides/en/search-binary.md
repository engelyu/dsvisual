---
marp: true
theme: default
paginate: true
math: katex
title: "Binary Search"
---

## Binary Search

Binary Search applies a divide-and-conquer strategy on a **sorted** array, halving the search range at each step to achieve $O(\log n)$ time — the required precondition is that the array must be sorted.

---

## Core Concept

Two pointers `left` and `right` define the current search range. Each iteration computes `mid = left + (right - left) / 2` and narrows the range to either the left or right half depending on the comparison result.

- Precondition: the array MUST be sorted (ascending order); results are unreliable on unsorted data.
- If `arr[mid] == target`, return `mid` immediately.
- If `arr[mid] < target`, the target is in the right half — set `left = mid + 1`.
- If `arr[mid] > target`, the target is in the left half — set `right = mid - 1`.

---

## Operation Flow

1. Confirm array is sorted; initialise `left=0`, `right=size-1`.
2. Loop condition: `left <= right`.
3. Compute `mid = left + (right - left) / 2` and compare to `target`.
4. Update `left` or `right` based on the comparison; return `mid` on equality.
5. If the loop ends without a match, return `-1`.

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 631.516px; background-color: transparent;" viewBox="0 0 631.515625 118" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M165.984,59L170.151,59C174.318,59,182.651,59,190.318,59C197.984,59,204.984,59,208.484,59L211.984,59" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MTY1Ljk4NDM3NSwieSI6NTl9LHsieCI6MTkwLjk4NDM3NSwieSI6NTl9LHsieCI6MjE1Ljk4NDM3NSwieSI6NTl9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M390.5,59L394.667,59C398.833,59,407.167,59,414.833,59C422.5,59,429.5,59,433,59L436.5,59" id="my-svg-L_B_C_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_C_0" data-points="W3sieCI6MzkwLjUsInkiOjU5fSx7IngiOjQxNS41LCJ5Ijo1OX0seyJ4Ijo0NDAuNSwieSI6NTl9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_A_B_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_B_C_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(86.9921875, 59)"><rect class="basic label-container" style="" x="-78.9921875" y="-51" width="157.984375" height="102"/><g class="label" style="" transform="translate(-48.9921875, -36)"><rect/><foreignObject width="97.984375" height="72"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>arr sorted<br />left=0 right=9<br />target=56</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(303.2421875, 59)"><rect class="basic label-container" style="" x="-87.2578125" y="-39" width="174.515625" height="78"/><g class="label" style="" transform="translate(-57.2578125, -24)"><rect/><foreignObject width="114.515625" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>mid=4 arr[4]=16<br />16 &lt; 56 left=5</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-C-3" data-look="classic" transform="translate(532.0078125, 59)"><rect class="basic label-container" style="" x="-91.5078125" y="-39" width="183.015625" height="78"/><g class="label" style="" transform="translate(-61.5078125, -24)"><rect/><foreignObject width="123.015625" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>mid=7 arr[7]=56<br />56 == 56 return 7</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## Pointer Narrowing Diagram

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 110" width="420" height="110"><g font-family="sans-serif" font-size="12"><rect x="10" y="40" width="38" height="28" fill="#f1f5f9" stroke="#94a3b8"/><rect x="48" y="40" width="38" height="28" fill="#f1f5f9" stroke="#94a3b8"/><rect x="86" y="40" width="38" height="28" fill="#f1f5f9" stroke="#94a3b8"/><rect x="124" y="40" width="38" height="28" fill="#f1f5f9" stroke="#94a3b8"/><rect x="162" y="40" width="38" height="28" fill="#fee2e2" stroke="#dc2626"/><rect x="200" y="40" width="38" height="28" fill="#dbeafe" stroke="#2563eb"/><rect x="238" y="40" width="38" height="28" fill="#dbeafe" stroke="#2563eb"/><rect x="276" y="40" width="38" height="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><rect x="314" y="40" width="38" height="28" fill="#dbeafe" stroke="#2563eb"/><rect x="352" y="40" width="38" height="28" fill="#dbeafe" stroke="#2563eb"/><text x="29" y="58" text-anchor="middle" font-size="11">2</text><text x="67" y="58" text-anchor="middle" font-size="11">5</text><text x="105" y="58" text-anchor="middle" font-size="11">8</text><text x="143" y="58" text-anchor="middle" font-size="11">12</text><text x="181" y="58" text-anchor="middle" font-size="11" fill="#dc2626">16</text><text x="219" y="58" text-anchor="middle" font-size="11">23</text><text x="257" y="58" text-anchor="middle" font-size="11">38</text><text x="295" y="58" text-anchor="middle" font-size="11" fill="#15803d">56</text><text x="333" y="58" text-anchor="middle" font-size="11">72</text><text x="371" y="58" text-anchor="middle" font-size="11">91</text><text x="29" y="34" text-anchor="middle" fill="#2563eb" font-size="11">L</text><text x="371" y="34" text-anchor="middle" fill="#2563eb" font-size="11">R</text><text x="181" y="34" text-anchor="middle" fill="#dc2626" font-size="11">mid1</text><text x="295" y="34" text-anchor="middle" fill="#16a34a" font-size="11">mid2</text><text x="215" y="100" text-anchor="middle" fill="#64748b" font-size="11">Round 1: mid=4(16) &lt; 56, L=5 → Round 2: mid=7(56) found</text></g></svg>

> Round 1: mid=4 (value 16); since 16 < 56 set `left=5`. Round 2: mid=7 (value 56) — target found. Grey cells are eliminated, blue cells form the current search range, green cell is the match.

---

## Complexity Analysis

| Case | Time | Space |
| --- | --- | --- |
| Best (target at mid) | $O(1)$ | $O(1)$ |
| Average | $O(\log n)$ | $O(1)$ |
| Worst | $O(\log n)$ | $O(1)$ |
| Total Space | — | $O(1)$ |

$$T_{\text{search}}(n) = O(\log n)$$

Each iteration halves the search range; for $n=10^6$ at most 20 comparisons are needed.

---

## Source Code

```cpp
int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target)
            return mid;

        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }

    return -1; // Not found
}

int main() {
    // Array must be sorted for Binary Search
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 56;

    int result = binarySearch(arr, 0, size - 1, target);

    if (result != -1)
        cout << "Element " << target << " found at index " << result << endl;
    return 0;
}
```

---

## Pros, Cons & When to Use

- Pro: $O(\log n)$ time — vastly faster than linear search on large arrays.
- Pro: in-place iterative implementation uses only $O(1)$ auxiliary space.
- Con (critical precondition): array MUST be sorted first — sorting costs $O(n \log n)$ if not already done.
- Con: does not apply to linked lists (no $O(1)$ random access to the middle element).
- Use for static or infrequently modified sorted arrays, e.g. dictionary lookups, database index range queries.

---

## Summary

- Critical precondition: the array MUST be sorted. Violating this produces incorrect results.
- Each iteration eliminates half the range; worst case is only $O(\log n)$ comparisons.
- Versus linear search: for $n=10^6$, Binary Search needs ~20 comparisons vs up to $10^6$ for Linear Search.
