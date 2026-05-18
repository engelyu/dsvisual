---
marp: true
theme: default
paginate: true
math: katex
title: "線性搜尋"
---

## 線性搜尋

線性搜尋從陣列的第一個元素開始,逐一比對每個元素,直到找到目標值或掃描完整個陣列為止;適用於任何未排序或已排序的資料集。

---

## 核心概念

演算法以單一迴圈由左至右逐格比對,無需陣列預先排序。找到目標則立即回傳其索引;若掃描完成後仍未找到則回傳 `-1`。

- 可應用於未排序資料:不要求陣列有任何順序。
- 最佳情況:目標在索引 0,$O(1)$。
- 最壞情況:目標在最後或不存在,$O(n)$。
- in-place:僅使用迴圈計數器,空間需求為 $O(1)$。

---

## 運作流程

1. 設定索引 `i = 0`。
2. 若 `i >= size`,表示未找到,回傳 `-1`。
3. 比對 `arr[i] == target`:若相等則回傳 `i`。
4. 令 `i++`,返回步驟 2 繼續掃描。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 1294.34px; background-color: transparent;" viewBox="0 0 1294.34375 118" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M208,59L212.167,59C216.333,59,224.667,59,232.333,59C240,59,247,59,250.5,59L254,59" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MjA4LCJ5Ijo1OX0seyJ4IjoyMzMsInkiOjU5fSx7IngiOjI1OCwieSI6NTl9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M424.844,59L429.01,59C433.177,59,441.51,59,449.177,59C456.844,59,463.844,59,467.344,59L470.844,59" id="my-svg-L_B_C_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_C_0" data-points="W3sieCI6NDI0Ljg0Mzc1LCJ5Ijo1OX0seyJ4Ijo0NDkuODQzNzUsInkiOjU5fSx7IngiOjQ3NC44NDM3NSwieSI6NTl9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M641.688,59L645.854,59C650.021,59,658.354,59,666.021,59C673.688,59,680.688,59,684.188,59L687.688,59" id="my-svg-L_C_D_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_C_D_0" data-points="W3sieCI6NjQxLjY4NzUsInkiOjU5fSx7IngiOjY2Ni42ODc1LCJ5Ijo1OX0seyJ4Ijo2OTEuNjg3NSwieSI6NTl9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M858.531,59L862.698,59C866.865,59,875.198,59,882.865,59C890.531,59,897.531,59,901.031,59L904.531,59" id="my-svg-L_D_E_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_D_E_0" data-points="W3sieCI6ODU4LjUzMTI1LCJ5Ijo1OX0seyJ4Ijo4ODMuNTMxMjUsInkiOjU5fSx7IngiOjkwOC41MzEyNSwieSI6NTl9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M1066.984,59L1071.151,59C1075.318,59,1083.651,59,1091.318,59C1098.984,59,1105.984,59,1109.484,59L1112.984,59" id="my-svg-L_E_F_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_E_F_0" data-points="W3sieCI6MTA2Ni45ODQzNzUsInkiOjU5fSx7IngiOjEwOTEuOTg0Mzc1LCJ5Ijo1OX0seyJ4IjoxMTE2Ljk4NDM3NSwieSI6NTl9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_A_B_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_B_C_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_C_D_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_D_E_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_E_F_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(108, 59)"><rect class="basic label-container" style="" x="-100" y="-51" width="200" height="102"/><g class="label" style="" transform="translate(-70, -36)"><rect/><foreignObject width="140" height="72"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>i=0<br />arr=[23,12,56,8,38]<br />target=38</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(341.421875, 59)"><rect class="basic label-container" style="" x="-83.421875" y="-39" width="166.84375" height="78"/><g class="label" style="" transform="translate(-53.421875, -24)"><rect/><foreignObject width="106.84375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>arr[0]=23 != 38<br />i++</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-C-3" data-look="classic" transform="translate(558.265625, 59)"><rect class="basic label-container" style="" x="-83.421875" y="-39" width="166.84375" height="78"/><g class="label" style="" transform="translate(-53.421875, -24)"><rect/><foreignObject width="106.84375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>arr[1]=12 != 38<br />i++</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-D-5" data-look="classic" transform="translate(775.109375, 59)"><rect class="basic label-container" style="" x="-83.421875" y="-39" width="166.84375" height="78"/><g class="label" style="" transform="translate(-53.421875, -24)"><rect/><foreignObject width="106.84375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>arr[2]=56 != 38<br />i++</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-E-7" data-look="classic" transform="translate(987.7578125, 59)"><rect class="basic label-container" style="" x="-79.2265625" y="-39" width="158.453125" height="78"/><g class="label" style="" transform="translate(-49.2265625, -24)"><rect/><foreignObject width="98.453125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>arr[3]=8 != 38<br />i++</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-F-9" data-look="classic" transform="translate(1201.6640625, 59)"><rect class="basic label-container" style="" x="-84.6796875" y="-39" width="169.359375" height="78"/><g class="label" style="" transform="translate(-54.6796875, -24)"><rect/><foreignObject width="109.359375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>arr[4]=38 == 38<br />return 4</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 掃描示意

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 90" width="370" height="90"><g font-family="sans-serif" font-size="13"><rect x="10" y="28" width="50" height="30" fill="#fee2e2" stroke="#dc2626"/><rect x="60" y="28" width="50" height="30" fill="#fee2e2" stroke="#dc2626"/><rect x="110" y="28" width="50" height="30" fill="#fee2e2" stroke="#dc2626"/><rect x="160" y="28" width="50" height="30" fill="#fee2e2" stroke="#dc2626"/><rect x="210" y="28" width="50" height="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><rect x="260" y="28" width="50" height="30" fill="#f1f5f9" stroke="#94a3b8"/><rect x="310" y="28" width="50" height="30" fill="#f1f5f9" stroke="#94a3b8"/><text x="35" y="48" text-anchor="middle">23</text><text x="85" y="48" text-anchor="middle">12</text><text x="135" y="48" text-anchor="middle">56</text><text x="185" y="48" text-anchor="middle">8</text><text x="235" y="48" text-anchor="middle" fill="#15803d">38</text><text x="285" y="48" text-anchor="middle" fill="#94a3b8">72</text><text x="335" y="48" text-anchor="middle" fill="#94a3b8">91</text><text x="35" y="22" text-anchor="middle" fill="#64748b">[0]</text><text x="85" y="22" text-anchor="middle" fill="#64748b">[1]</text><text x="135" y="22" text-anchor="middle" fill="#64748b">[2]</text><text x="185" y="22" text-anchor="middle" fill="#64748b">[3]</text><text x="235" y="22" text-anchor="middle" fill="#16a34a">[4]</text><text x="285" y="22" text-anchor="middle" fill="#94a3b8">[5]</text><text x="335" y="22" text-anchor="middle" fill="#94a3b8">[6]</text><text x="235" y="76" text-anchor="middle" fill="#16a34a">found target=38</text></g></svg>

> 紅色格為已掃描但不符的元素,綠色格為找到目標的位置;灰色格為尚未掃描的元素。

---

## 複雜度分析

| 情況 | 時間 | 空間 |
| --- | --- | --- |
| 最佳(目標在首位) | $O(1)$ | $O(1)$ |
| 平均 | $O(n)$ | $O(1)$ |
| 最壞(目標在末位或不存在) | $O(n)$ | $O(1)$ |
| 空間合計 | — | $O(1)$ |

$$T_{\text{search}}(n) = O(n)$$

平均需比對 $n/2$ 個元素;最壞情況需比對全部 $n$ 個元素。

---

## 程式碼

```cpp
int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}

int main() {
    int arr[] = {23, 12, 56, 8, 38, 2, 72, 91, 16, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 38;

    int result = linearSearch(arr, size, target);

    if (result != -1)
        cout << "Element " << target << " found at index " << result << endl;
    else
        cout << "Element " << target << " not found." << endl;
    return 0;
}
```

---

## 優缺點與使用時機

- 優點:不要求資料排序,可直接應用於任意陣列或串列。
- 優點:實作極為簡單,幾乎無額外空間開銷。
- 缺點:時間複雜度 $O(n)$,對大型資料集效率低落。
- 適用:資料量小(n ≤ 數百)、資料未排序、或只需搜尋一次的場景。
- 不適用:需對大型已排序陣列反覆搜尋時,應改用 Binary Search。

---

## 小結

- 從索引 0 逐一比對,無需預先排序。
- 最佳 $O(1)$、平均與最壞 $O(n)$;額外空間 $O(1)$。
- 簡單可靠,適合小規模或單次搜尋;大規模已排序資料請改用 Binary Search。
