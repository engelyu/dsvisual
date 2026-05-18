---
marp: true
theme: default
paginate: true
math: katex
title: "B+ 樹(資料庫索引標準)"
---

## B+ 樹(資料庫索引標準)

B+ 樹是 B-Tree 的強化版:所有實際資料僅儲存於葉節點,內部節點只儲存路由用的鍵副本;所有葉節點以 `nextLeaf` 指標串成鏈結串列,使範圍查詢極為高效。廣泛用於 MySQL InnoDB、PostgreSQL。

---

## 核心概念

B+ 樹與 B-Tree 最關鍵的兩點區別:①所有資料在葉節點;②葉節點橫向連結。這使得範圍查詢只需下降至第一個葉節點,然後橫向掃描即可。

- 內部節點:僅存放路由鍵(鍵的副本),不含實際資料記錄。
- 葉節點:儲存完整的鍵值對,並以 `nextLeaf` 指向下一葉節點。
- 範圍查詢:下降至起始葉節點後橫向遍訪所有相關葉節點。
- 葉分裂時:中間鍵「複製」至父節點(不是移走),葉仍保留完整資料。

---

## 運作流程

1. 插入:沿內部節點路由鍵向下找到對應葉節點。
2. 若葉節點未滿:在葉中有序插入鍵值對。
3. 若葉節點已滿:分裂葉,將中間鍵的副本推送至父節點,更新 `nextLeaf` 鏈。
4. 範圍查詢 `[lo, hi]`:定位 `lo` 的葉節點,沿 `nextLeaf` 掃描直到超過 `hi`。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 292.203px; background-color: transparent;" viewBox="0 0 292.203125 502" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M156.561,62L165.362,66.167C174.163,70.333,191.765,78.667,200.566,86.333C209.367,94,209.367,101,209.367,104.5L209.367,108" id="my-svg-L_INNER_L1_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_INNER_L1_0" data-points="W3sieCI6MTU2LjU2MTQ0ODMxNzMwNzY4LCJ5Ijo2Mn0seyJ4IjoyMDkuMzY3MTg3NSwieSI6ODd9LHsieCI6MjA5LjM2NzE4NzUsInkiOjExMn1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M99.531,62L99.531,66.167C99.531,70.333,99.531,78.667,99.531,93.5C99.531,108.333,99.531,129.667,99.531,153C99.531,176.333,99.531,201.667,103.597,219.96C107.662,238.253,115.794,249.505,119.859,255.132L123.925,260.758" id="my-svg-L_INNER_L2_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_INNER_L2_0" data-points="W3sieCI6OTkuNTMxMjUsInkiOjYyfSx7IngiOjk5LjUzMTI1LCJ5Ijo4N30seyJ4Ijo5OS41MzEyNSwieSI6MTUxfSx7IngiOjk5LjUzMTI1LCJ5IjoyMjd9LHsieCI6MTI2LjI2NzYyOTUyMzAyNjMyLCJ5IjoyNjR9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M65.824,62L60.622,66.167C55.42,70.333,45.017,78.667,39.815,93.5C34.613,108.333,34.613,129.667,34.613,153C34.613,176.333,34.613,201.667,34.613,227C34.613,252.333,34.613,277.667,34.613,303C34.613,328.333,34.613,353.667,39.448,371.993C44.282,390.32,53.951,401.639,58.786,407.299L63.62,412.959" id="my-svg-L_INNER_L3_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_INNER_L3_0" data-points="W3sieCI6NjUuODIzODQzMTQ5MDM4NDUsInkiOjYyfSx7IngiOjM0LjYxMzI4MTI1LCJ5Ijo4N30seyJ4IjozNC42MTMyODEyNSwieSI6MTUxfSx7IngiOjM0LjYxMzI4MTI1LCJ5IjoyMjd9LHsieCI6MzQuNjEzMjgxMjUsInkiOjMwM30seyJ4IjozNC42MTMyODEyNSwieSI6Mzc5fSx7IngiOjY2LjIxODA4MTgyNTY1Nzg5LCJ5Ijo0MTZ9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M209.367,190L209.367,196.167C209.367,202.333,209.367,214.667,205.302,226.46C201.236,238.253,193.105,249.505,189.039,255.132L184.974,260.758" id="my-svg-L_L1_L2_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_L1_L2_0" data-points="W3sieCI6MjA5LjM2NzE4NzUsInkiOjE5MH0seyJ4IjoyMDkuMzY3MTg3NSwieSI6MjI3fSx7IngiOjE4Mi42MzA4MDc5NzY5NzM3LCJ5IjoyNjR9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M154.449,342L154.449,348.167C154.449,354.333,154.449,366.667,150.384,378.46C146.318,390.253,138.187,401.505,134.121,407.132L130.056,412.758" id="my-svg-L_L2_L3_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_L2_L3_0" data-points="W3sieCI6MTU0LjQ0OTIxODc1LCJ5IjozNDJ9LHsieCI6MTU0LjQ0OTIxODc1LCJ5IjozNzl9LHsieCI6MTI3LjcxMjgzOTIyNjk3MzY4LCJ5Ijo0MTZ9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_INNER_L1_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_INNER_L2_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_INNER_L3_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(209.3671875, 227)"><g class="label" data-id="L_L1_L2_0" transform="translate(-31.4921875, -12)"><foreignObject width="62.984375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>nextLeaf</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(154.44921875, 379)"><g class="label" data-id="L_L2_L3_0" transform="translate(-31.4921875, -12)"><foreignObject width="62.984375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>nextLeaf</p></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-INNER-0" data-look="classic" transform="translate(99.53125, 35)"><rect class="basic label-container" style="" x="-91.53125" y="-27" width="183.0625" height="54"/><g class="label" style="" transform="translate(-61.53125, -12)"><rect/><foreignObject width="123.0625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>Internal: [20, 40]</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-L1-1" data-look="classic" transform="translate(209.3671875, 151)"><rect class="basic label-container" style="" x="-74.8359375" y="-39" width="149.671875" height="78"/><g class="label" style="" transform="translate(-44.8359375, -24)"><rect/><foreignObject width="89.671875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>Leaf1: 10,15<br />nextLeaf=L2</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-L2-3" data-look="classic" transform="translate(154.44921875, 303)"><rect class="basic label-container" style="" x="-74.8359375" y="-39" width="149.671875" height="78"/><g class="label" style="" transform="translate(-44.8359375, -24)"><rect/><foreignObject width="89.671875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>Leaf2: 20,30<br />nextLeaf=L3</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-L3-5" data-look="classic" transform="translate(99.53125, 455)"><rect class="basic label-container" style="" x="-79.1484375" y="-39" width="158.296875" height="78"/><g class="label" style="" transform="translate(-49.1484375, -24)"><rect/><foreignObject width="98.296875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>Leaf3: 40,50<br />nextLeaf=null</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## B+ 樹葉節點鏈結示意

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 130" width="360" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><rect x="130" y="5" width="100" height="24" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="180" y="22">Internal: 20 | 40</text><rect x="10" y="55" width="90" height="24" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="55" y="72">10 | 15</text><rect x="135" y="55" width="90" height="24" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="180" y="72">20 | 30</text><rect x="260" y="55" width="90" height="24" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="305" y="72">40 | 50</text><line x1="155" y1="29" x2="55" y2="55" stroke="#64748b"/><line x1="180" y1="29" x2="180" y2="55" stroke="#64748b"/><line x1="205" y1="29" x2="305" y2="55" stroke="#64748b"/><line x1="100" y1="67" x2="135" y2="67" stroke="#dc2626" stroke-width="2" marker-end="url(#arr)"/><line x1="225" y1="67" x2="260" y2="67" stroke="#dc2626" stroke-width="2"/><text x="117" y="60" fill="#dc2626" font-size="9">next</text><text x="242" y="60" fill="#dc2626" font-size="9">next</text><text x="180" y="110" fill="#64748b">all data in leaves; horizontal scan for range queries</text></g></svg>

> 內部節點僅為路由;所有資料儲存在葉節點;紅色箭頭展示 `nextLeaf` 鏈,實現 $O(K)$ 範圍掃描。

---

## 複雜度分析

| 操作 | 時間 | 空間 |
| --- | --- | --- |
| 點查詢 | $O(\log_t N)$ | $O(1)$ |
| 插入 | $O(\log_t N)$ | $O(\log_t N)$ |
| 範圍查詢 K 結果 | $O(\log_t N + K)$ | $O(K)$ |
| 空間合計 | — | $O(N)$ |

$$T_{\text{range}}(K) = O(\log_t N + K)$$

範圍查詢代價 = 樹高下降 $O(\log_t N)$ + 橫向掃描 $K$ 個結果;是 B+ 樹相對於 B-Tree 最大的優勢。

---

## 程式碼

```cpp
class BPlusNode {
public:
    vector<int> keys;
    vector<BPlusNode*> children;
    BPlusNode* nextLeaf; // leaf-level linked list
    bool isLeaf;
    int MAX;
    BPlusNode(int maxKeys, bool leaf)
        : MAX(maxKeys), isLeaf(leaf), nextLeaf(nullptr) {}
};

// B+ Tree theory:
// 1. All data resides ONLY in leaf nodes.
// 2. Internal nodes hold routing key COPIES only.
// 3. Leaves are chained: nextLeaf enables O(K) range scan.
// Leaf split: copy median key UP (leaf keeps its data).
// Internal split: push median key UP (key is removed from internal node).
void insert(int k) {
    if (!root) {
        root = new BPlusNode(MAX, true);
        root->keys.push_back(k); return;
    }
    // descend to leaf, insert in sorted order,
    // split and propagate upward if full
}
```

---

## 優缺點與使用時機

- 優點:葉節點鏈結使範圍查詢極高效($O(\log_t N + K)$),無需回溯。
- 優點:內部節點不存資料,分支因子更大,樹高更低,磁碟 I/O 更少。
- 缺點:資料只在葉節點,點查詢必須到達葉層,不如 B-Tree 的部分路徑命中。
- 缺點:葉分裂需維護 `nextLeaf` 鏈,刪除需修復指標,略複雜。
- 適用:所有需要範圍查詢的資料庫索引,如 MySQL InnoDB、PostgreSQL、SQLite。

---

## 小結

- 內部節點僅為路由;所有資料集中在葉節點;葉以 `nextLeaf` 橫向串接。
- 範圍查詢 $O(\log_t N + K)$:下降一次,橫向掃描;是 B+ 樹的決定性優勢。
- 現代關聯式資料庫(MySQL、PostgreSQL)的標準索引結構。
