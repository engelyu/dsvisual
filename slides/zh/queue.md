---
marp: true
theme: default
paginate: true
math: katex
title: "佇列(循環陣列)"
---

## 佇列(循環陣列)

佇列是一種 FIFO(先進先出)的線性結構,如同排隊等候:最早加入的最先被服務。循環陣列實作以取模運算避免空間浪費。

---

## 核心概念

使用固定大小的陣列搭配 `front`、`rear` 兩個指標及 `count` 計數器。`rear` 向後推進時以 `% MAX_SIZE` 折返頭部。

- `front` 指向最舊元素;`rear` 指向最新元素的位置。
- enqueue:先移動 `rear = (rear+1) % MAX_SIZE`,再寫入值並遞增 `count`。
- dequeue:讀取 `arr[front]`,再移動 `front = (front+1) % MAX_SIZE`,遞減 `count`。

---

## 運作流程

1. enqueue:若 `count >= MAX_SIZE` 則拒絕(Queue Overflow)。
2. 以 `(rear+1) % MAX_SIZE` 計算新後端位置並寫入值。
3. dequeue:若 `count == 0` 則拒絕(Queue Underflow)。
4. 讀取 `arr[front]`,以 `(front+1) % MAX_SIZE` 移動前端指標。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 930.609px; background-color: transparent;" viewBox="0 0 930.609375 94" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M125.125,47L136.202,47C147.279,47,169.432,47,190.919,47C212.406,47,233.227,47,243.637,47L254.047,47" id="my-svg-L_E_A_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_E_A_0" data-points="W3sieCI6MTI1LjEyNSwieSI6NDd9LHsieCI6MTkxLjU4NTkzNzUsInkiOjQ3fSx7IngiOjI1OC4wNDY4NzUsInkiOjQ3fV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M398.094,47L409.171,47C420.247,47,442.401,47,463.888,47C485.375,47,506.195,47,516.605,47L527.016,47" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6Mzk4LjA5Mzc1LCJ5Ijo0N30seyJ4Ijo0NjQuNTU0Njg3NSwieSI6NDd9LHsieCI6NTMxLjAxNTYyNSwieSI6NDd9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M671.063,47L680.354,47C689.646,47,708.229,47,726.146,47C744.063,47,761.313,47,769.938,47L778.563,47" id="my-svg-L_B_C_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_C_0" data-points="W3sieCI6NjcxLjA2MjUsInkiOjQ3fSx7IngiOjcyNi44MTI1LCJ5Ijo0N30seyJ4Ijo3ODIuNTYyNSwieSI6NDd9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel" transform="translate(191.5859375, 47)"><g class="label" data-id="L_E_A_0" transform="translate(-41.4609375, -12)"><foreignObject width="82.921875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>enqueue 10</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(464.5546875, 47)"><g class="label" data-id="L_A_B_0" transform="translate(-41.4609375, -12)"><foreignObject width="82.921875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>enqueue 20</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(726.8125, 47)"><g class="label" data-id="L_B_C_0" transform="translate(-30.75, -12)"><foreignObject width="61.5" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>dequeue</p></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-E-0" data-look="classic" transform="translate(66.5625, 47)"><rect class="basic label-container" style="" x="-58.5625" y="-39" width="117.125" height="78"/><g class="label" style="" transform="translate(-28.5625, -24)"><rect/><foreignObject width="57.125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>empty<br />count=0</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-A-1" data-look="classic" transform="translate(328.0703125, 47)"><rect class="basic label-container" style="" x="-70.0234375" y="-39" width="140.046875" height="78"/><g class="label" style="" transform="translate(-40.0234375, -24)"><rect/><foreignObject width="80.046875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>[10]<br />f=0 r=0 c=1</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-3" data-look="classic" transform="translate(601.0390625, 47)"><rect class="basic label-container" style="" x="-70.0234375" y="-39" width="140.046875" height="78"/><g class="label" style="" transform="translate(-40.0234375, -24)"><rect/><foreignObject width="80.046875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>[10,20]<br />f=0 r=1 c=2</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-C-5" data-look="classic" transform="translate(852.5859375, 47)"><rect class="basic label-container" style="" x="-70.0234375" y="-39" width="140.046875" height="78"/><g class="label" style="" transform="translate(-40.0234375, -24)"><rect/><foreignObject width="80.046875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>[20]<br />f=1 r=1 c=1</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 循環陣列示意

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90" width="360" height="90"><g font-family="sans-serif" font-size="12"><rect x="10" y="30" width="60" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="70" y="30" width="60" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="130" y="30" width="60" height="30" fill="#fff" stroke="#94a3b8"/><rect x="190" y="30" width="60" height="30" fill="#fff" stroke="#94a3b8"/><rect x="250" y="30" width="60" height="30" fill="#fff" stroke="#94a3b8"/><text x="40" y="50" text-anchor="middle">10</text><text x="100" y="50" text-anchor="middle">20</text><text x="160" y="50" text-anchor="middle"> </text><text x="220" y="50" text-anchor="middle"> </text><text x="280" y="50" text-anchor="middle"> </text><text x="40" y="22" text-anchor="middle" fill="#16a34a">front</text><text x="100" y="22" text-anchor="middle" fill="#dc2626">rear</text><text x="185" y="80" text-anchor="middle" fill="#64748b">↩ wraps around via %</text></g></svg>

> 當 `rear` 到達陣列末端後,下一次 enqueue 會以取模回到索引 0,避免「假滿」問題。

---

## 複雜度分析

| 操作 | 時間 | 空間 |
| --- | --- | --- |
| enqueue | $O(1)$ | $O(N)$ |
| dequeue | $O(1)$ | $O(1)$ |
| peek (front) | $O(1)$ | $O(1)$ |

$$T_{\text{enqueue}}(n) = O(1)$$

enqueue 僅做一次取模和一次陣列寫入,與佇列長度無關。

---

## 程式碼

```cpp
bool enqueue(int val) {
    if (count >= MAX_SIZE) {
        cout << "Queue Overflow!" << endl;
        return false;
    }
    rear = (rear + 1) % MAX_SIZE;
    arr[rear] = val;
    count++;
    return true;
}

int dequeue() {
    if (count == 0) {
        cout << "Queue Underflow!" << endl;
        return -1;
    }
    int val = arr[front];
    front = (front + 1) % MAX_SIZE;
    count--;
    return val;
}
```

---

## 優缺點與使用時機

- 優點:記憶體連續、快取友善,enqueue/dequeue 皆為 $O(1)$。
- 優點:取模折返解決了一般陣列佇列的「假滿」問題。
- 缺點:容量固定,需事先決定上限。
- 適用:BFS 廣度優先搜尋、排程緩衝、印表機佇列等。

---

## 小結

- FIFO:以 `front`/`rear` 雙指標管理兩端。
- enqueue / dequeue 皆為 $O(1)$。
- 取模折返是循環陣列的關鍵技巧,有效利用所有槽位。
