---
marp: true
theme: default
paginate: true
math: katex
title: "堆積排序法"
---

## 堆積排序法

堆積排序法利用 max-heap 資料結構進行排序:先以 $O(n)$ 建立 max-heap,再反覆將堆頂(最大值)交換至陣列末端並對縮減後的堆執行 sift-down(heapify),逐步將元素置入最終位置。所有情況均保證 $O(n \log n)$,且為 in-place。

---

## 核心概念

`heapify(arr, n, i)` 以 sift-down 方式維護以節點 `i` 為根的子堆積:找出 `i`、左子 `2i+1`、右子 `2i+2` 中的最大值索引 `largest`;若 `largest != i` 則交換並遞迴 heapify 受影響的子樹。`heapSort` 分兩階段:①從 `n/2-1` 到 `0` 逐節點呼叫 heapify 建立 max-heap;②每次將 `arr[0]`(堆頂)與 `arr[i]` 交換後縮小堆並重新 heapify。

- Build-heap 階段:從最後一個非葉節點(索引 `n/2-1`)往上對每個節點呼叫 heapify,總時間 $O(n)$。
- 每次 sift-down 沿樹高下降,時間 $O(\log n)$;共 $n-1$ 次提取,總計 $O(n \log n)$。
- NOT stable:將堆頂交換至末端時可能改變相等元素的相對順序。
- in-place:遞迴 heapify 棧深度為 $O(\log n)$(迭代實作可達真正的 $O(1)$)。

---

## 運作流程

1. 以 `for i = n/2-1 downto 0` 呼叫 `heapify(arr, n, i)`,將陣列整理成 max-heap。
2. 交換 `arr[0]`(最大值)與 `arr[i]`(當前末端),堆大小縮減為 `i`。
3. 對根節點呼叫 `heapify(arr, i, 0)`,恢復 max-heap 性質。
4. 重複步驟 2–3 直至堆大小為 1,陣列即為升序排列。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 201.031px; background-color: transparent;" viewBox="0 0 201.03125 734" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M100.516,86L100.516,90.167C100.516,94.333,100.516,102.667,100.516,110.333C100.516,118,100.516,125,100.516,128.5L100.516,132" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MTAwLjUxNTYyNSwieSI6ODZ9LHsieCI6MTAwLjUxNTYyNSwieSI6MTExfSx7IngiOjEwMC41MTU2MjUsInkiOjEzNn1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M100.516,214L100.516,218.167C100.516,222.333,100.516,230.667,100.516,238.333C100.516,246,100.516,253,100.516,256.5L100.516,260" id="my-svg-L_B_C_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_C_0" data-points="W3sieCI6MTAwLjUxNTYyNSwieSI6MjE0fSx7IngiOjEwMC41MTU2MjUsInkiOjIzOX0seyJ4IjoxMDAuNTE1NjI1LCJ5IjoyNjR9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M100.516,342L100.516,346.167C100.516,350.333,100.516,358.667,100.516,366.333C100.516,374,100.516,381,100.516,384.5L100.516,388" id="my-svg-L_C_D_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_C_D_0" data-points="W3sieCI6MTAwLjUxNTYyNSwieSI6MzQyfSx7IngiOjEwMC41MTU2MjUsInkiOjM2N30seyJ4IjoxMDAuNTE1NjI1LCJ5IjozOTJ9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M100.516,470L100.516,474.167C100.516,478.333,100.516,486.667,100.516,494.333C100.516,502,100.516,509,100.516,512.5L100.516,516" id="my-svg-L_D_E_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_D_E_0" data-points="W3sieCI6MTAwLjUxNTYyNSwieSI6NDcwfSx7IngiOjEwMC41MTU2MjUsInkiOjQ5NX0seyJ4IjoxMDAuNTE1NjI1LCJ5Ijo1MjB9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M100.516,598L100.516,602.167C100.516,606.333,100.516,614.667,100.516,622.333C100.516,630,100.516,637,100.516,640.5L100.516,644" id="my-svg-L_E_F_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_E_F_0" data-points="W3sieCI6MTAwLjUxNTYyNSwieSI6NTk4fSx7IngiOjEwMC41MTU2MjUsInkiOjYyM30seyJ4IjoxMDAuNTE1NjI1LCJ5Ijo2NDh9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_A_B_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_B_C_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_C_D_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_D_E_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_E_F_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(100.515625, 47)"><rect class="basic label-container" style="" x="-88.3203125" y="-39" width="176.640625" height="78"/><g class="label" style="" transform="translate(-58.3203125, -24)"><rect/><foreignObject width="116.640625" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>build max-heap<br />[13,11,12,5,6,7]</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(100.515625, 175)"><rect class="basic label-container" style="" x="-92.515625" y="-39" width="185.03125" height="78"/><g class="label" style="" transform="translate(-62.515625, -24)"><rect/><foreignObject width="125.03125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>swap root to end<br />[7,11,12,5,6,|13]</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-C-3" data-look="classic" transform="translate(100.515625, 303)"><rect class="basic label-container" style="" x="-92.515625" y="-39" width="185.03125" height="78"/><g class="label" style="" transform="translate(-62.515625, -24)"><rect/><foreignObject width="125.03125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>heapify root<br />[12,11,7,5,6,|13]</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-D-5" data-look="classic" transform="translate(100.515625, 431)"><rect class="basic label-container" style="" x="-92.515625" y="-39" width="185.03125" height="78"/><g class="label" style="" transform="translate(-62.515625, -24)"><rect/><foreignObject width="125.03125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>swap root to end<br />[6,11,7,5,|12,13]</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-E-7" data-look="classic" transform="translate(100.515625, 559)"><rect class="basic label-container" style="" x="-92.515625" y="-39" width="185.03125" height="78"/><g class="label" style="" transform="translate(-62.515625, -24)"><rect/><foreignObject width="125.03125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>heapify root<br />[11,6,7,5,|12,13]</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-F-9" data-look="classic" transform="translate(100.515625, 687)"><rect class="basic label-container" style="" x="-72.6328125" y="-39" width="145.265625" height="78"/><g class="label" style="" transform="translate(-42.6328125, -24)"><rect/><foreignObject width="85.265625" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>repeat until<br />heap size=1</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## Heap 結構示意

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" width="360" height="140"><g font-family="sans-serif" font-size="12"><text x="10" y="16" fill="#64748b" font-size="11">max-heap after build-heap: [13, 11, 12, 5, 6, 7]</text><circle cx="180" cy="42" r="18" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/><text x="180" y="47" text-anchor="middle" font-weight="bold">13</text><circle cx="100" cy="88" r="18" fill="#dbeafe" stroke="#2563eb"/><text x="100" y="93" text-anchor="middle">11</text><circle cx="260" cy="88" r="18" fill="#dbeafe" stroke="#2563eb"/><text x="260" y="93" text-anchor="middle">12</text><circle cx="55" cy="128" r="15" fill="#f1f5f9" stroke="#94a3b8"/><text x="55" y="133" text-anchor="middle">5</text><circle cx="140" cy="128" r="15" fill="#f1f5f9" stroke="#94a3b8"/><text x="140" y="133" text-anchor="middle">6</text><circle cx="220" cy="128" r="15" fill="#f1f5f9" stroke="#94a3b8"/><text x="220" y="133" text-anchor="middle">7</text><line x1="165" y1="56" x2="115" y2="74" stroke="#64748b"/><line x1="195" y1="56" x2="245" y2="74" stroke="#64748b"/><line x1="87" y1="102" x2="65" y2="115" stroke="#94a3b8"/><line x1="113" y1="102" x2="130" y2="115" stroke="#94a3b8"/><line x1="252" y1="102" x2="230" y2="115" stroke="#94a3b8"/><text x="10" y="118" fill="#64748b" font-size="10">arr: [13,  11,  12,   5,   6,   7]</text><text x="10" y="130" fill="#94a3b8" font-size="10">idx:  [0]   [1]   [2]  [3]  [4]  [5]</text></g></svg>

> 黃色節點為堆頂(最大值 13),藍色為第二層。父節點 `i` 的左子為 `arr[2i+1]`,右子為 `arr[2i+2]`。節點 12(idx 2)只有左子 7(idx 5),無右子。每個父節點均大於等於其子節點,滿足 max-heap 性質。

---

## 複雜度分析

| 情況 | 時間複雜度 | 空間複雜度 |
| --- | --- | --- |
| 最佳 | $O(n \log n)$ | $O(\log n)$ |
| 平均 | $O(n \log n)$ | $O(\log n)$ |
| 最壞 | $O(n \log n)$ | $O(\log n)$ |
| NOT stable / in-place | — | 輔助 $O(\log n)$ |

$$T(n) = \underbrace{O(n)}_{\text{build-heap}} + \underbrace{(n-1) \cdot O(\log n)}_{\text{sift-down extractions}} = O(n \log n)$$

Build-heap 利用下界累加可證明為 $O(n)$(非直覺的 $O(n \log n)$)。之後 $n-1$ 次提取各需 $O(\log n)$ sift-down,三種情況複雜度完全相同。

---

## 程式碼

```cpp
// Sift-down: restore max-heap rooted at index i, heap size n
void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left  = 2 * i + 1;
    int right = 2 * i + 2;
    if (left  < n && arr[left]  > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest); // recurse on affected subtree
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    // Phase 1: build max-heap in O(n)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    // Phase 2: extract max one by one
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);   // move current max to sorted end
        heapify(arr, i, 0);    // restore heap on reduced range
    }
}
```

---

## 優缺點與使用時機

- 優點:所有情況 $O(n \log n)$,無最壞情況退化(優於 Quick Sort)。
- 優點:in-place,$O(\log n)$ 遞迴棧空間(優於 Merge Sort 的 $O(n)$)。
- 優點:build-heap 僅需 $O(n)$,適合只需取 top-k 元素的場景。
- 缺點:NOT stable,相等元素的相對順序無法保證。
- 缺點:快取效能差:sift-down 的記憶體存取模式不連續,常數因子大於 Quick Sort。
- 適用:需要嚴格最壞 $O(n \log n)$ 且記憶體受限的場景;C++ `std::sort` 的 Introsort 在遞迴深度超限時切換至 Heap Sort。

---

## 小結

- Build max-heap $O(n)$ + 反覆提取堆頂 $O(n \log n)$ = 總計 $O(n \log n)$。
- NOT stable;in-place $O(\log n)$ 遞迴棧空間;三種情況複雜度完全相同。
- Introsort(C++ `std::sort`)在 Quick Sort 退化時切換至 Heap Sort,結合兩者優點。
