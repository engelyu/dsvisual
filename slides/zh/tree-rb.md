---
marp: true
theme: default
paginate: true
math: katex
title: "紅黑樹"
---

## 紅黑樹

紅黑樹是一種自平衡 BST,以節點著色(RED / BLACK)和五條不變量確保樹高不超過 $2\log_2(N+1)$,廣泛用於 C++ `std::map`、Java `TreeMap`。

---

## 核心概念

五條 Red-Black 不變量共同約束深度差異:每條根至 null 路徑的 black-height 相同,且紅節點不能有紅子節點。

- 規則 1:每個節點非紅即黑。
- 規則 2:根節點必為黑色。
- 規則 3:紅色節點的兩個子節點必須為黑色(不能有連續兩個紅節點)。
- 規則 4:從任一節點到其所有 null 後代,路徑中的黑色節點數相同(black-height)。
- 插入後透過重新著色(recoloring)與旋轉(rotation)修復違規。

---

## 運作流程

1. 以標準 BST 插入方式插入新節點,初始著色為紅色。
2. 若父節點為黑色則不違規,結束。
3. 若父節點為紅色,判斷叔父(uncle)節點顏色。
4. Case 1(叔父為紅):父、叔父均改黑,祖父改紅,繼續向上修復。
5. Case 2/3(叔父為黑):執行旋轉並交換父祖父顏色完成修復。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 382.141px; background-color: transparent;" viewBox="0 0 382.140625 658.671875" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M137.039,86L137.039,90.167C137.039,94.333,137.039,102.667,137.039,110.333C137.039,118,137.039,125,137.039,128.5L137.039,132" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MTM3LjAzOTA2MjUsInkiOjg2fSx7IngiOjEzNy4wMzkwNjI1LCJ5IjoxMTF9LHsieCI6MTM3LjAzOTA2MjUsInkiOjEzNn1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M104.498,260.881L96.329,272.471C88.16,284.061,71.822,307.241,63.653,330.769C55.484,354.297,55.484,378.172,55.484,390.109L55.484,402.047" id="my-svg-L_B_C_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_C_0" data-points="W3sieCI6MTA0LjQ5NzkzNDcxNTM0NjUzLCJ5IjoyNjAuODgwNzQ3MjE1MzQ2NTZ9LHsieCI6NTUuNDg0Mzc1LCJ5IjozMzAuNDIxODc1fSx7IngiOjU1LjQ4NDM3NSwieSI6NDA2LjA0Njg3NX1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M169.58,260.881L177.749,272.471C185.918,284.061,202.256,307.241,210.425,324.332C218.594,341.422,218.594,352.422,218.594,357.922L218.594,363.422" id="my-svg-L_B_D_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_D_0" data-points="W3sieCI6MTY5LjU4MDE5MDI4NDY1MzQ3LCJ5IjoyNjAuODgwNzQ3MjE1MzQ2NTZ9LHsieCI6MjE4LjU5Mzc1LCJ5IjozMzAuNDIxODc1fSx7IngiOjIxOC41OTM3NSwieSI6MzY3LjQyMTg3NX1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M187.316,467.394L176.954,478.774C166.591,490.153,145.866,512.913,135.503,529.792C125.141,546.672,125.141,557.672,125.141,563.172L125.141,568.672" id="my-svg-L_D_E_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_D_E_0" data-points="W3sieCI6MTg3LjMxNjEwODM1NTI0NzQyLCJ5Ijo0NjcuMzk0MjMzMzU1MjQ3NH0seyJ4IjoxMjUuMTQwNjI1LCJ5Ijo1MzUuNjcxODc1fSx7IngiOjEyNS4xNDA2MjUsInkiOjU3Mi42NzE4NzV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M249.871,467.394L260.234,478.774C270.597,490.153,291.322,512.913,301.684,529.792C312.047,546.672,312.047,557.672,312.047,563.172L312.047,568.672" id="my-svg-L_D_F_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_D_F_0" data-points="W3sieCI6MjQ5Ljg3MTM5MTY0NDc1MjU4LCJ5Ijo0NjcuMzk0MjMzMzU1MjQ3NH0seyJ4IjozMTIuMDQ2ODc1LCJ5Ijo1MzUuNjcxODc1fSx7IngiOjMxMi4wNDY4NzUsInkiOjU3Mi42NzE4NzV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_A_B_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(55.484375, 330.421875)"><g class="label" data-id="L_B_C_0" transform="translate(-11.546875, -12)"><foreignObject width="23.09375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>yes</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(218.59375, 330.421875)"><g class="label" data-id="L_B_D_0" transform="translate(-8.6640625, -12)"><foreignObject width="17.328125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>no</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(125.140625, 535.671875)"><g class="label" data-id="L_D_E_0" transform="translate(-11.546875, -12)"><foreignObject width="23.09375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>yes</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(312.046875, 535.671875)"><g class="label" data-id="L_D_F_0" transform="translate(-8.6640625, -12)"><foreignObject width="17.328125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>no</p></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(137.0390625, 47)"><rect class="basic label-container" style="" x="-70.1484375" y="-39" width="140.296875" height="78"/><g class="label" style="" transform="translate(-40.1484375, -24)"><rect/><foreignObject width="80.296875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>BST insert<br />(color RED)</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(137.0390625, 214.7109375)"><polygon points="78.7109375,0 157.421875,-78.7109375 78.7109375,-157.421875 0,-78.7109375" class="label-container" transform="translate(-78.2109375, 78.7109375)"/><g class="label" style="" transform="translate(-51.7109375, -12)"><rect/><foreignObject width="103.421875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>parent BLACK?</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-C-3" data-look="classic" transform="translate(55.484375, 433.046875)"><rect class="basic label-container" style="" x="-47.484375" y="-27" width="94.96875" height="54"/><g class="label" style="" transform="translate(-17.484375, -12)"><rect/><foreignObject width="34.96875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>done</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-D-5" data-look="classic" transform="translate(218.59375, 433.046875)"><polygon points="65.625,0 131.25,-65.625 65.625,-131.25 0,-65.625" class="label-container" transform="translate(-65.125, 65.625)"/><g class="label" style="" transform="translate(-38.625, -12)"><rect/><foreignObject width="77.25" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>uncle RED?</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-E-7" data-look="classic" transform="translate(125.140625, 611.671875)"><rect class="basic label-container" style="" x="-74.8125" y="-39" width="149.625" height="78"/><g class="label" style="" transform="translate(-44.8125, -24)"><rect/><foreignObject width="89.625" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>recolor<br />+ fix upward</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-F-9" data-look="classic" transform="translate(312.046875, 611.671875)"><rect class="basic label-container" style="" x="-62.09375" y="-39" width="124.1875" height="78"/><g class="label" style="" transform="translate(-32.09375, -24)"><rect/><foreignObject width="64.1875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>rotate<br />+ recolor</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 紅黑樹結構示意

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 130" width="300" height="130"><g font-family="sans-serif" font-size="12" text-anchor="middle"><circle cx="150" cy="20" r="16" fill="#1e293b" stroke="#1e293b"/><text x="150" y="25" fill="white">7</text><circle cx="80" cy="65" r="16" fill="#dc2626" stroke="#991b1b"/><text x="80" y="70" fill="white">3</text><circle cx="220" cy="65" r="16" fill="#dc2626" stroke="#991b1b"/><text x="220" y="70" fill="white">11</text><circle cx="45" cy="110" r="16" fill="#1e293b" stroke="#1e293b"/><text x="45" y="115" fill="white">1</text><circle cx="115" cy="110" r="16" fill="#1e293b" stroke="#1e293b"/><text x="115" y="115" fill="white">5</text><line x1="140" y1="34" x2="92" y2="51" stroke="#64748b"/><line x1="160" y1="34" x2="208" y2="51" stroke="#64748b"/><line x1="70" y1="79" x2="55" y2="96" stroke="#64748b"/><line x1="90" y1="79" x2="105" y2="96" stroke="#64748b"/></g></svg>

> 黑節點為深色,紅節點為紅色;根節點 7 為黑色,每條根至 null 路徑包含 2 個黑色節點(black-height=2)。

---

## 複雜度分析

| 操作 | 時間 | 空間 |
| --- | --- | --- |
| 搜尋 | $O(\log N)$ | $O(1)$ |
| 插入 | $O(\log N)$ | $O(\log N)$ |
| 刪除 | $O(\log N)$ | $O(\log N)$ |
| 空間合計 | — | $O(N)$ |

$$h_{\text{RB}} \leq 2\log_2(N+1)$$

Red-Black Tree 高度上界為 $2\log_2(N+1)$,比 AVL 稍鬆但仍保證 $O(\log N)$。

---

## 程式碼

```cpp
enum Color { RED, BLACK };

struct Node {
    int data; bool color;
    Node *left, *right, *parent;
    Node(int d) : data(d), color(RED),
        left(nullptr), right(nullptr), parent(nullptr) {}
};

void fixViolation(Node*& root, Node*& pt) {
    while ((pt != root) && (pt->color != BLACK)
           && (pt->parent->color == RED)) {
        Node* parent = pt->parent;
        Node* grandparent = parent->parent;
        // Case: parent is left child of grandparent
        if (parent == grandparent->left) {
            Node* uncle = grandparent->right;
            if (uncle && uncle->color == RED) { // Recolor
                grandparent->color = RED;
                parent->color = uncle->color = BLACK;
                pt = grandparent;
            } else { /* rotate + recolor */ }
        } /* mirror for right-child case */
    }
    root->color = BLACK;
}
```

---

## 優缺點與使用時機

- 優點:插入/刪除旋轉次數有常數上界,寫入效率優於 AVL Tree。
- 優點:廣泛支援:C++ `std::map`、`std::set`、Linux 排程器均使用紅黑樹。
- 缺點:五條不變量使實作複雜,除錯困難。
- 缺點:比 AVL Tree 允許稍大的高度差,搜尋略慢。
- 適用:讀寫均衡的有序關聯容器,如 map、set、排程優先佇列。

---

## 小結

- 五條染色不變量約束黑高度,使樹高不超過 $2\log_2 N$。
- 插入最多 2 次旋轉,比 AVL 的潛在多次旋轉更少。
- 工業界最廣泛使用的平衡 BST 實作。
