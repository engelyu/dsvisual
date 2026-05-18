---
marp: true
theme: default
paginate: true
math: katex
title: "Binary Heap"
---

## Binary Heap

A complete binary tree stored in a contiguous array; heap property is maintained by sift-up and sift-down, giving $O(\log N)$ insert/extract and $O(1)$ peek.

---

## Core Concept

Node at index $i$ has parent $(i-1)/2$, left child $2i+1$, right child $2i+2$. A Min-Heap guarantees every parent key $\leq$ its children; Max-Heap is the reverse.

- insert: append to array tail, then sift-up to restore order.
- extractTop: swap root with tail, remove tail, then sift-down to restore.
- decreaseKey / increaseKey: modify in place, then sift-up or sift-down as needed.
- Contiguous array layout yields excellent cache performance.

---

## Operation Flow

1. insert(5): append 5 at the last array position.
2. sift-up: compare 5 with its parent; swap if 5 is smaller (min-heap); repeat until root or no violation.
3. extractTop: swap root (minimum) with the last element, then remove the last.
4. sift-down: from root, swap with the smaller child until a leaf or no violation remains.

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 928.469px; background-color: transparent;" viewBox="0 0 928.46875 252.1875" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M169.219,93L173.385,93C177.552,93,185.885,93,193.552,93C201.219,93,208.219,93,211.719,93L215.219,93" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MTY5LjIxODc1LCJ5Ijo5M30seyJ4IjoxOTQuMjE4NzUsInkiOjkzfSx7IngiOjIxOS4yMTg3NSwieSI6OTN9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M415.974,132L424.408,135.844C432.842,139.688,449.71,147.375,461.644,151.219C473.578,155.063,480.578,155.063,484.078,155.063L487.578,155.063" id="my-svg-L_B_C_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_C_0" data-points="W3sieCI6NDE1Ljk3MzU4ODU1NzQwMTgsInkiOjEzMn0seyJ4Ijo0NjYuNTc4MTI1LCJ5IjoxNTUuMDYyNX0seyJ4Ijo0OTEuNTc4MTI1LCJ5IjoxNTUuMDYyNX1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M641.684,126.919L652.466,121.943C663.248,116.967,684.811,107.015,706.796,96.491C728.78,85.967,751.186,74.871,762.388,69.323L773.591,63.775" id="my-svg-L_C_D_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_C_D_0" data-points="W3sieCI6NjQxLjY4NDE4NjI1MDUzMTYsInkiOjEyNi45MTg1NjEyNTA1MzE3fSx7IngiOjcwNi4zNzUsInkiOjk3LjA2MjV9LHsieCI6Nzc3LjE3NTI5NzM5NDI1OTgsInkiOjYyfV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M742.922,23.666L736.831,22.888C730.74,22.111,718.557,20.555,691.521,19.778C664.484,19,622.594,19,582.628,19C542.661,19,504.62,19,475.45,24.515C446.28,30.03,425.982,41.06,415.833,46.575L405.683,52.09" id="my-svg-L_D_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_D_B_0" data-points="W3sieCI6NzQyLjkyMTg3NSwieSI6MjMuNjY2MDQzMjY0MTM1NjUyfSx7IngiOjcwNi4zNzUsInkiOjE5fSx7IngiOjU4MC43MDMxMjUsInkiOjE5fSx7IngiOjQ2Ni41NzgxMjUsInkiOjE5fSx7IngiOjQwMi4xNjg4MTMzNDQ1OTQ2LCJ5Ijo1NH1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M656.55,168.34L664.854,169.794C673.159,171.248,689.767,174.155,704.839,175.609C719.911,177.063,733.448,177.063,740.216,177.063L746.984,177.063" id="my-svg-L_C_E_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_C_E_0" data-points="W3sieCI6NjU2LjU1MDM3NjYxMzU4NTksInkiOjE2OC4zNDAyNDgzODY0MTQxNX0seyJ4Ijo3MDYuMzc1LCJ5IjoxNzcuMDYyNX0seyJ4Ijo3NTAuOTg0Mzc1LCJ5IjoxNzcuMDYyNX1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_A_B_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_B_C_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(709.85138, 95.34089)"><g class="label" data-id="L_C_D_0" transform="translate(-11.546875, -12)"><foreignObject width="23.09375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>yes</p></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_D_B_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(706.375, 177.0625)"><g class="label" data-id="L_C_E_0" transform="translate(-8.6640625, -12)"><foreignObject width="17.328125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>no</p></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(88.609375, 93)"><rect class="basic label-container" style="" x="-80.609375" y="-39" width="161.21875" height="78"/><g class="label" style="" transform="translate(-50.609375, -24)"><rect/><foreignObject width="101.21875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>insert(5)<br />append to tail</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(330.3984375, 93)"><rect class="basic label-container" style="" x="-111.1796875" y="-39" width="222.359375" height="78"/><g class="label" style="" transform="translate(-81.1796875, -24)"><rect/><foreignObject width="162.359375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>sift-up<br />(compare with parent)</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-C-3" data-look="classic" transform="translate(580.703125, 155.0625)"><polygon points="89.125,0 178.25,-89.125 89.125,-178.25 0,-89.125" class="label-container" transform="translate(-88.625, 89.125)"/><g class="label" style="" transform="translate(-50.125, -24)"><rect/><foreignObject width="100.25" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>parent &gt; child<br />(min-heap)?</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-D-5" data-look="classic" transform="translate(831.6953125, 35)"><rect class="basic label-container" style="" x="-88.7734375" y="-27" width="177.546875" height="54"/><g class="label" style="" transform="translate(-58.7734375, -12)"><rect/><foreignObject width="117.546875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>swap &amp; move up</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-E-9" data-look="classic" transform="translate(831.6953125, 177.0625)"><rect class="basic label-container" style="" x="-80.7109375" y="-39" width="161.421875" height="78"/><g class="label" style="" transform="translate(-50.7109375, -24)"><rect/><foreignObject width="101.421875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>heap property<br />restored</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## Array Layout Diagram

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" width="360" height="120"><g font-family="sans-serif" font-size="12" text-anchor="middle"><rect x="10" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="30" y="30">1</text><text x="30" y="8" font-size="9" fill="#64748b">i=0</text><rect x="60" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="80" y="30">3</text><text x="80" y="8" font-size="9" fill="#64748b">i=1</text><rect x="110" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="130" y="30">2</text><text x="130" y="8" font-size="9" fill="#64748b">i=2</text><rect x="160" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="180" y="30">7</text><text x="180" y="8" font-size="9" fill="#64748b">i=3</text><rect x="210" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="230" y="30">8</text><text x="230" y="8" font-size="9" fill="#64748b">i=4</text><rect x="260" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="280" y="30">5</text><text x="280" y="8" font-size="9" fill="#64748b">i=5</text><rect x="310" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="330" y="30">9</text><text x="330" y="8" font-size="9" fill="#64748b">i=6</text><circle cx="80" cy="75" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="80" y="79">1</text><circle cx="40" cy="105" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="40" y="109">3</text><circle cx="120" cy="105" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="120" y="109">2</text><line x1="80" y1="89" x2="46" y2="92" stroke="#64748b"/><line x1="80" y1="89" x2="114" y2="92" stroke="#64748b"/><text x="180" y="79" font-size="10" fill="#64748b">root=data[0]</text></g></svg>

> Top: flat array representation. Bottom: tree view where data[0] (root) is the minimum. Children of node $i$ are at $2i+1$ and $2i+2$.

---

## Complexity Analysis

| Operation | Time (Worst) | Space |
| --- | --- | --- |
| insert | $O(\log N)$ | $O(1)$ |
| peek | $O(1)$ | $O(1)$ |
| extractTop | $O(\log N)$ | $O(1)$ |
| decreaseKey / increaseKey | $O(\log N)$ | $O(1)$ |
| build-heap ($N$ elements) | $O(N)$ | $O(N)$ |
| Total Space | — | $O(N)$ |

$$T_{\text{build}}(N) = O(N)$$

Building the heap bottom-up with sift-down costs $O(N)$ total — better than $N$ sequential inserts at $O(N \log N)$.

---

## Source Code

```cpp
void siftUp(int i) {
    while (i > 0) {
        int p = (i - 1) / 2;
        if (!cmp(data[i], data[p])) break;
        swap(data[i], data[p]);
        i = p;
    }
}

void siftDown(int i) {
    int n = static_cast<int>(data.size());
    while (true) {
        int left = 2 * i + 1, right = 2 * i + 2, best = i;
        if (left  < n && cmp(data[left],  data[best])) best = left;
        if (right < n && cmp(data[right], data[best])) best = right;
        if (best == i) break;
        swap(data[i], data[best]);
        i = best;
    }
}

void insert(int x) {
    data.push_back(x);
    siftUp(static_cast<int>(data.size()) - 1);
}

int extractTop() {
    int top = data[0];
    data[0] = data.back(); data.pop_back();
    if (!data.empty()) siftDown(0);
    return top;
}
```

---

## Pros, Cons & When to Use

- Pro: contiguous array storage is cache-friendly with small constant factors.
- Pro: $O(N)$ build-heap is ideal for bulk construction from a large dataset.
- Con: efficient merge (concatenate arrays + build-heap) costs $O(N+M)$; naive re-insertion degrades to $O((N+M)\log(N+M))$ — either way, unsuitable when merges are frequent.
- Con: decrease-key requires knowing the array index, adding bookkeeping overhead.
- Use for: priority queues, Dijkstra/Prim, Heap Sort, Top-K streaming.

---

## Summary

- Complete binary tree in an array: parent at $(i-1)/2$, children at $2i+1$/$2i+2$.
- insert $O(\log N)$ worst-case; extractTop $O(\log N)$ worst-case; peek $O(1)$.
- $O(N)$ build-heap; poor merge performance; excellent cache locality.
