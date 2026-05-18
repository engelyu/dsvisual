---
marp: true
theme: default
paginate: true
math: katex
title: "Fibonacci Heap"
---

## Fibonacci Heap

A lazy-melding heap using a circular doubly-linked root list; cut and cascading-cut maintain amortized bounds: $O(1)$ amortized insert/merge/decrease-key and $O(\log N)$ amortized extractTop — the theoretically optimal priority queue.

---

## Core Concept

All tree roots form a circular doubly-linked list (root list); `best` points to the minimum root. Consolidation is deferred until extractTop. decrease-key uses cut to move a node to the root list, and cascading-cut ensures no parent loses more than one child.

- insert: create node, splice into root list, update `best` if smaller — pure $O(1)$.
- merge: splice the two root lists, update `best` — $O(1)$ amortized.
- consolidate: link trees of equal degree in the root list until each degree is unique (called inside extractTop).
- cascading-cut: if a parent has already lost one child (mark=true), continue cutting upward.

---

## Operation Flow

1. decrease-key(x, k): set x.key = k; if k < parent.key, call cut(x).
2. cut(x): remove x from its parent's child list, add to root list, clear mark.
3. cascading-cut(parent): if parent.mark is false set it true and stop; if true, cut(parent) and recurse.
4. extractTop: move all children of best to the root list, call consolidate, update best.

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 667.242px; background-color: transparent;" viewBox="0 0 667.2421875 350" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M92.188,86L92.188,90.167C92.188,94.333,92.188,102.667,92.188,110.333C92.188,118,92.188,125,92.188,128.5L92.188,132" id="my-svg-L_INSERT_ROOTLIST_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_INSERT_ROOTLIST_0" data-points="W3sieCI6OTIuMTg3NSwieSI6ODZ9LHsieCI6OTIuMTg3NSwieSI6MTExfSx7IngiOjkyLjE4NzUsInkiOjEzNn1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M324.555,86L324.555,90.167C324.555,94.333,324.555,102.667,324.555,110.333C324.555,118,324.555,125,324.555,128.5L324.555,132" id="my-svg-L_EXTRACT_PROMOTE_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_EXTRACT_PROMOTE_0" data-points="W3sieCI6MzI0LjU1NDY4NzUsInkiOjg2fSx7IngiOjMyNC41NTQ2ODc1LCJ5IjoxMTF9LHsieCI6MzI0LjU1NDY4NzUsInkiOjEzNn1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M324.555,214L324.555,218.167C324.555,222.333,324.555,230.667,324.555,238.333C324.555,246,324.555,253,324.555,256.5L324.555,260" id="my-svg-L_PROMOTE_CONSOLIDATE_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_PROMOTE_CONSOLIDATE_0" data-points="W3sieCI6MzI0LjU1NDY4NzUsInkiOjIxNH0seyJ4IjozMjQuNTU0Njg3NSwieSI6MjM5fSx7IngiOjMyNC41NTQ2ODc1LCJ5IjoyNjR9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M575.055,86L575.055,90.167C575.055,94.333,575.055,102.667,575.055,110.333C575.055,118,575.055,125,575.055,128.5L575.055,132" id="my-svg-L_DKEY_CUT_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_DKEY_CUT_0" data-points="W3sieCI6NTc1LjA1NDY4NzUsInkiOjg2fSx7IngiOjU3NS4wNTQ2ODc1LCJ5IjoxMTF9LHsieCI6NTc1LjA1NDY4NzUsInkiOjEzNn1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M575.055,214L575.055,218.167C575.055,222.333,575.055,230.667,575.055,238.333C575.055,246,575.055,253,575.055,256.5L575.055,260" id="my-svg-L_CUT_CCUT_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_CUT_CCUT_0" data-points="W3sieCI6NTc1LjA1NDY4NzUsInkiOjIxNH0seyJ4Ijo1NzUuMDU0Njg3NSwieSI6MjM5fSx7IngiOjU3NS4wNTQ2ODc1LCJ5IjoyNjR9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_INSERT_ROOTLIST_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_EXTRACT_PROMOTE_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_PROMOTE_CONSOLIDATE_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_DKEY_CUT_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_CUT_CCUT_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-INSERT-0" data-look="classic" transform="translate(92.1875, 47)"><rect class="basic label-container" style="" x="-84.1875" y="-39" width="168.375" height="78"/><g class="label" style="" transform="translate(-54.1875, -24)"><rect/><foreignObject width="108.375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>insert(x)<br />O(1) amortized</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-ROOTLIST-1" data-look="classic" transform="translate(92.1875, 175)"><rect class="basic label-container" style="" x="-83.734375" y="-39" width="167.46875" height="78"/><g class="label" style="" transform="translate(-53.734375, -24)"><rect/><foreignObject width="107.46875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>add to root list<br />update best</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-EXTRACT-2" data-look="classic" transform="translate(324.5546875, 47)"><rect class="basic label-container" style="" x="-98.1796875" y="-39" width="196.359375" height="78"/><g class="label" style="" transform="translate(-68.1796875, -24)"><rect/><foreignObject width="136.359375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>extractTop<br />O(log N) amortized</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-PROMOTE-3" data-look="classic" transform="translate(324.5546875, 175)"><rect class="basic label-container" style="" x="-92.015625" y="-39" width="184.03125" height="78"/><g class="label" style="" transform="translate(-62.015625, -24)"><rect/><foreignObject width="124.03125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>promote children<br />to root list</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-CONSOLIDATE-5" data-look="classic" transform="translate(324.5546875, 303)"><rect class="basic label-container" style="" x="-119.3515625" y="-39" width="238.703125" height="78"/><g class="label" style="" transform="translate(-89.3515625, -24)"><rect/><foreignObject width="178.703125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>consolidate<br />(link equal-degree trees)</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-DKEY-6" data-look="classic" transform="translate(575.0546875, 47)"><rect class="basic label-container" style="" x="-84.1875" y="-39" width="168.375" height="78"/><g class="label" style="" transform="translate(-54.1875, -24)"><rect/><foreignObject width="108.375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>decreaseKey<br />O(1) amortized</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-CUT-7" data-look="classic" transform="translate(575.0546875, 175)"><rect class="basic label-container" style="" x="-68.203125" y="-39" width="136.40625" height="78"/><g class="label" style="" transform="translate(-38.203125, -24)"><rect/><foreignObject width="76.40625" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>cut node<br />to root list</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-CCUT-9" data-look="classic" transform="translate(575.0546875, 303)"><rect class="basic label-container" style="" x="-81.1484375" y="-39" width="162.296875" height="78"/><g class="label" style="" transform="translate(-51.1484375, -24)"><rect/><foreignObject width="102.296875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>cascading-cut<br />(parent chain)</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## Fibonacci Heap Root List Diagram

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" width="360" height="120"><g font-family="sans-serif" font-size="11" text-anchor="middle"><text x="180" y="14" font-size="10" fill="#64748b">root list (circular doubly-linked)</text><circle cx="60" cy="50" r="16" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/><text x="60" y="54">1</text><text x="60" y="38" font-size="9" fill="#ca8a04">best</text><circle cx="140" cy="50" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="140" y="54">5</text><circle cx="220" cy="50" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="220" y="54">3</text><circle cx="300" cy="50" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="300" y="54">8</text><line x1="76" y1="50" x2="124" y2="50" stroke="#64748b" marker-end="url(#arr)"/><line x1="156" y1="50" x2="204" y2="50" stroke="#64748b"/><line x1="236" y1="50" x2="284" y2="50" stroke="#64748b"/><path d="M 300 66 Q 180 110 60 66" stroke="#64748b" fill="none"/><circle cx="140" cy="90" r="12" fill="#dcfce7" stroke="#16a34a"/><text x="140" y="94">7</text><line x1="140" y1="66" x2="140" y2="78" stroke="#64748b"/><text x="180" y="115" font-size="9" fill="#64748b">circular link back to best</text></g></svg>

> The root list is circular and doubly-linked; `best` points to the minimum root (key=1). Subtrees hang under any root node and are not tidied until consolidate is called.

---

## Complexity Analysis

| Operation | Time | Space |
| --- | --- | --- |
| insert | $O(1)$ worst-case | $O(1)$ |
| peek | $O(1)$ worst-case | $O(1)$ |
| merge | $O(1)$ worst-case | $O(1)$ |
| decrease-key | $O(1)$ amortized | $O(1)$ |
| extractTop | $O(\log N)$ amortized | $O(1)$ |
| delete | $O(\log N)$ amortized | $O(1)$ |
| Total Space | — | $O(N)$ |

$$T_{\text{decrease-key}} = O(1)\text{ amortized}$$

Amortized analysis uses potential $\Phi = t + 2m$ (t = root-list size, m = marked nodes), proving decrease-key costs $O(1)$ amortized.

---

## Source Code

```cpp
FNode* insert(int key) {
    FNode* x = new FNode(key);
    addToRootList(x);
    n++;
    return x;
}

void cut(FNode* x, FNode* y) {      // x: child, y: parent
    if (y->child == x)
        y->child = (x->right != x) ? x->right : nullptr;
    y->degree--;
    removeNode(x);
    addToRootList(x);
}

void cascadingCut(FNode* y) {
    FNode* z = y->parent;
    if (!z) return;
    if (!y->mark) { y->mark = true; }
    else { cut(y, z); cascadingCut(z); }
}

void decreaseOrIncreaseKey(FNode* x, int newKey) {
    x->key = newKey;
    FNode* y = x->parent;
    if (y && cmp(x->key, y->key)) {
        cut(x, y);
        cascadingCut(y);
    }
    if (!best || cmp(x->key, best->key)) best = x;
}
```

---

## Pros, Cons & When to Use

- Pro: $O(1)$ amortized decrease-key is theoretically optimal, making Dijkstra run in $O(E + V\log V)$.
- Pro: $O(1)$ worst-case insert and merge; ideal for insert-heavy then extract-heavy workloads.
- Con: complex implementation, large constant factors, pointer-intensive — often slower in practice than Binary Heap.
- Con: consolidate is $O(N)$ worst-case single call, but $O(\log N)$ amortized.
- Use for decrease-key-heavy algorithms (Dijkstra, Prim, network flow) in theory research and competitive programming.

---

## Summary

- Lazy root-list merging: insert, merge, and decrease-key are all $O(1)$ amortized.
- extractTop triggers consolidate: $O(\log N)$ amortized.
- Theoretically optimal but complex; best suited to graph algorithms that rely heavily on decrease-key.
