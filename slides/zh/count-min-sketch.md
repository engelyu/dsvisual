---
marp: true
theme: default
paginate: true
math: katex
title: "Count-Min Sketch"
category: "Hash & Probabilistic"
---

## Count-Min Sketch

Count-Min Sketch 是一種機率型頻率表,能在極小空間內估計每個項目的出現次數;估計值絕不會低估,但可能因雜湊碰撞而高估。

---

## 核心概念

結構是一個 $d \times w$ 的計數矩陣,每一列對應一個雜湊函式。

- 更新時在每一列各加 1。
- 估計時取 $d$ 個格子的最小值。
- 碰撞只會灌大計數,因此最小值最接近真實值。

---

## 運作流程

1. update($x$):對每一列 $r$ 計算 $h_r(x)$ 並把該格加 1。
2. estimate($x$):讀取那 $d$ 個格子。
3. 回傳這 $d$ 個格子的最小值。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 629.484px; background-color: transparent;" viewBox="0 0 629.484375 174" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M137.297,35L142.531,35C147.766,35,158.234,35,170.348,35C182.461,35,196.219,35,203.098,35L209.977,35" id="my-svg-L_U_H_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_U_H_0" data-points="W3sieCI6MTM3LjI5Njg3NSwieSI6MzV9LHsieCI6MTY4LjcwMzEyNSwieSI6MzV9LHsieCI6MjEzLjk3NjU2MjUsInkiOjM1fV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M366.82,35L374.366,35C381.911,35,397.003,35,408.048,35C419.094,35,426.094,35,429.594,35L433.094,35" id="my-svg-L_H_I_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_H_I_0" data-points="W3sieCI6MzY2LjgyMDMxMjUsInkiOjM1fSx7IngiOjQxMi4wOTM3NSwieSI6MzV9LHsieCI6NDM3LjA5Mzc1LCJ5IjozNX1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M143.703,139L147.87,139C152.036,139,160.37,139,168.036,139C175.703,139,182.703,139,186.203,139L189.703,139" id="my-svg-L_E_M_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_E_M_0" data-points="W3sieCI6MTQzLjcwMzEyNSwieSI6MTM5fSx7IngiOjE2OC43MDMxMjUsInkiOjEzOX0seyJ4IjoxOTMuNzAzMTI1LCJ5IjoxMzl9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_U_H_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_H_I_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_E_M_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-U-0" data-look="classic" transform="translate(75.8515625, 35)"><rect class="basic label-container" style="" x="-61.4453125" y="-27" width="122.890625" height="54"/><g class="label" style="" transform="translate(-31.4453125, -12)"><rect/><foreignObject width="62.890625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>update x</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-H-1" data-look="classic" transform="translate(290.3984375, 35)"><rect class="basic label-container" style="" x="-76.421875" y="-27" width="152.84375" height="54"/><g class="label" style="" transform="translate(-46.421875, -12)"><rect/><foreignObject width="92.84375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>d row hashes</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-I-3" data-look="classic" transform="translate(529.2890625, 35)"><rect class="basic label-container" style="" x="-92.1953125" y="-27" width="184.390625" height="54"/><g class="label" style="" transform="translate(-62.1953125, -12)"><rect/><foreignObject width="124.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>increment d cells</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-E-4" data-look="classic" transform="translate(75.8515625, 139)"><rect class="basic label-container" style="" x="-67.8515625" y="-27" width="135.703125" height="54"/><g class="label" style="" transform="translate(-37.8515625, -12)"><rect/><foreignObject width="75.703125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>estimate x</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-M-5" data-look="classic" transform="translate(290.3984375, 139)"><rect class="basic label-container" style="" x="-96.6953125" y="-27" width="193.390625" height="54"/><g class="label" style="" transform="translate(-66.6953125, -12)"><rect/><foreignObject width="133.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>take min of d cells</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 示意圖

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 110" width="300"><g font-family="monospace" font-size="11"><text x="0" y="24">row 0</text><text x="0" y="54">row 1</text><text x="0" y="84">row 2</text><g stroke="#cbd5e1" fill="none"><rect x="44" y="10" width="28" height="24"/><rect x="72" y="10" width="28" height="24"/><rect x="100" y="10" width="28" height="24"/><rect x="128" y="10" width="28" height="24"/><rect x="156" y="10" width="28" height="24"/><rect x="184" y="10" width="28" height="24"/><rect x="212" y="10" width="28" height="24"/><rect x="240" y="10" width="28" height="24"/><rect x="44" y="40" width="28" height="24"/><rect x="72" y="40" width="28" height="24"/><rect x="100" y="40" width="28" height="24"/><rect x="128" y="40" width="28" height="24"/><rect x="156" y="40" width="28" height="24"/><rect x="184" y="40" width="28" height="24"/><rect x="212" y="40" width="28" height="24"/><rect x="240" y="40" width="28" height="24"/><rect x="44" y="70" width="28" height="24"/><rect x="72" y="70" width="28" height="24"/><rect x="100" y="70" width="28" height="24"/><rect x="128" y="70" width="28" height="24"/><rect x="156" y="70" width="28" height="24"/><rect x="184" y="70" width="28" height="24"/><rect x="212" y="70" width="28" height="24"/><rect x="240" y="70" width="28" height="24"/></g><g fill="#dbeafe" stroke="#3b82f6"><rect x="128" y="10" width="28" height="24"/><rect x="212" y="40" width="28" height="24"/><rect x="72" y="70" width="28" height="24"/></g></g></svg>

> visualizer 以 3×8 的計數矩陣呈現;Add 高亮被加 1 的 3 個格子,Estimate 顯示最小值並對照真實計數。

---

## 複雜度分析

| 項目 | 複雜度 |
| --- | --- |
| 更新 / 估計時間 | $O(d)$ |
| 空間 | $O(d \cdot w)$ |
| 低估 | 不可能 |

$$\hat{f}(x) \ge f(x)$$

估計值是真實值的上界;較大的寬度 $w$ 可降低誤差。

---

## 程式碼

```cpp
void update(const std::string& key) {
    for (int r = 0; r < DEPTH; r++)
        table[r][hash(r, key)]++;
}

int estimate(const std::string& key) const {
    int est = table[0][hash(0, key)];
    for (int r = 1; r < DEPTH; r++)
        est = std::min(est, table[r][hash(r, key)]);
    return est;
}
```

---

## 優缺點與使用時機

- 優點:空間固定,與不同項目的數量無關。
- 缺點:有高估誤差,無法做精確查詢。
- 適用:資料流上的重量級元素統計、近似頻率。

---

## 小結

- 由二維計數矩陣加多個雜湊函式構成。
- 取最小值可抵銷碰撞造成的超量計數。
- 以誤差換取極小且固定的空間。
