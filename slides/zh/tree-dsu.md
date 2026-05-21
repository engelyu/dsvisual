---
marp: true
theme: default
paginate: true
math: katex
title: "不相交集合（並查集）"
category: "Trees"
---

## 不相交集合（並查集）

並查集（Union-Find）以森林表示多個不相交集合，支援近 $O(1)$ 的合併與查詢操作，是 Kruskal 最小生成樹與連通性判斷的核心資料結構。

---

## 核心概念

每個集合以樹表示，`parent[i]` 指向父節點，根節點的 `parent` 指向自身。`find` 沿父指標走到根；`union` 將一棵樹的根掛到另一棵樹的根下。

- 路徑壓縮：`find` 回傳時把沿途節點直接連到根，大幅攤平後續查詢。
- 按秩合併：將秩（rank）較小的根掛到秩較大的根下，保持樹高低。
- 兩者合用可達攤銷 $O(\alpha(N))$ 時間，對所有實際 $N$ 幾乎等同 $O(1)$。

---

## 運作流程

1. 初始化：每個元素自成一個集合，`parent[i] = i`，`rank[i] = 0`。
2. `find(x)`：若 `parent[x] == x` 則返回 `x`，否則遞迴求 `find(parent[x])` 並做路徑壓縮。
3. `union(a, b)`：分別找到兩集合的根，若根不同，將秩小的根掛到秩大的根下（秩相同時任一方掛另一方並令根秩加一）。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 601.312px; background-color: transparent;" viewBox="0 0 601.3125 174" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M62.414,62L62.414,66.167C62.414,70.333,62.414,78.667,62.414,86.333C62.414,94,62.414,101,62.414,104.5L62.414,108" id="my-svg-L_R0_N0A_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_R0_N0A_0" data-points="W3sieCI6NjIuNDE0MDYyNSwieSI6NjJ9LHsieCI6NjIuNDE0MDYyNSwieSI6ODd9LHsieCI6NjIuNDE0MDYyNSwieSI6MTEyfV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M221.242,62L221.242,66.167C221.242,70.333,221.242,78.667,221.242,86.333C221.242,94,221.242,101,221.242,104.5L221.242,108" id="my-svg-L_R2_N2A_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_R2_N2A_0" data-points="W3sieCI6MjIxLjI0MjE4NzUsInkiOjYyfSx7IngiOjIyMS4yNDIxODc1LCJ5Ijo4N30seyJ4IjoyMjEuMjQyMTg3NSwieSI6MTEyfV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M380.07,62L380.07,66.167C380.07,70.333,380.07,78.667,380.07,86.333C380.07,94,380.07,101,380.07,104.5L380.07,108" id="my-svg-L_R4_N4A_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_R4_N4A_0" data-points="W3sieCI6MzgwLjA3MDMxMjUsInkiOjYyfSx7IngiOjM4MC4wNzAzMTI1LCJ5Ijo4N30seyJ4IjozODAuMDcwMzEyNSwieSI6MTEyfV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M538.898,62L538.898,66.167C538.898,70.333,538.898,78.667,538.898,86.333C538.898,94,538.898,101,538.898,104.5L538.898,108" id="my-svg-L_R6_N6A_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_R6_N6A_0" data-points="W3sieCI6NTM4Ljg5ODQzNzUsInkiOjYyfSx7IngiOjUzOC44OTg0Mzc1LCJ5Ijo4N30seyJ4Ijo1MzguODk4NDM3NSwieSI6MTEyfV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_R0_N0A_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_R2_N2A_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_R4_N4A_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_R6_N6A_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-R0-0" data-look="classic" transform="translate(62.4140625, 35)"><rect class="basic label-container" style="" x="-54.4140625" y="-27" width="108.828125" height="54"/><g class="label" style="" transform="translate(-24.4140625, -12)"><rect/><foreignObject width="48.828125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>root: 0</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-N0A-1" data-look="classic" transform="translate(62.4140625, 139)"><rect class="basic label-container" style="" x="-34.1953125" y="-27" width="68.390625" height="54"/><g class="label" style="" transform="translate(-4.1953125, -12)"><rect/><foreignObject width="8.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>1</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-R2-2" data-look="classic" transform="translate(221.2421875, 35)"><rect class="basic label-container" style="" x="-54.4140625" y="-27" width="108.828125" height="54"/><g class="label" style="" transform="translate(-24.4140625, -12)"><rect/><foreignObject width="48.828125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>root: 2</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-N2A-3" data-look="classic" transform="translate(221.2421875, 139)"><rect class="basic label-container" style="" x="-34.1953125" y="-27" width="68.390625" height="54"/><g class="label" style="" transform="translate(-4.1953125, -12)"><rect/><foreignObject width="8.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>3</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-R4-4" data-look="classic" transform="translate(380.0703125, 35)"><rect class="basic label-container" style="" x="-54.4140625" y="-27" width="108.828125" height="54"/><g class="label" style="" transform="translate(-24.4140625, -12)"><rect/><foreignObject width="48.828125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>root: 4</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-N4A-5" data-look="classic" transform="translate(380.0703125, 139)"><rect class="basic label-container" style="" x="-34.1953125" y="-27" width="68.390625" height="54"/><g class="label" style="" transform="translate(-4.1953125, -12)"><rect/><foreignObject width="8.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>5</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-R6-6" data-look="classic" transform="translate(538.8984375, 35)"><rect class="basic label-container" style="" x="-54.4140625" y="-27" width="108.828125" height="54"/><g class="label" style="" transform="translate(-24.4140625, -12)"><rect/><foreignObject width="48.828125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>root: 6</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-N6A-7" data-look="classic" transform="translate(538.8984375, 139)"><rect class="basic label-container" style="" x="-34.1953125" y="-27" width="68.390625" height="54"/><g class="label" style="" transform="translate(-4.1953125, -12)"><rect/><foreignObject width="8.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>7</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 示意圖

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400"><g font-family="monospace" font-size="13"><text x="0" y="20">parent: [0, 0, 2, 2, 4, 4, 6, 6]</text><text x="0" y="40">rank:   [1, 0, 1, 0, 1, 0, 1, 0]</text><text x="0" y="60">Sets: {0,1}  {2,3}  {4,5}  {6,7}</text></g></svg>

> 8 個元素經 4 次 `union(0,1)` `union(2,3)` `union(4,5)` `union(6,7)` 後形成 4 棵高度為 1 的樹；每棵樹的根秩為 1。

---

## 複雜度分析

| 操作 | 時間 | 空間 |
| --- | --- | --- |
| 初始化 | $O(N)$ | $O(N)$ |
| find（含路徑壓縮） | $O(\alpha(N))$ | $O(1)$ |
| unite（含按秩合併） | $O(\alpha(N))$ | $O(1)$ |

$$O(\alpha(N)) \approx O(1) \text{ for all practical } N$$

$\alpha$ 為反阿克曼函數，對所有實際 $N$ 均 $\leq 4$，故視為常數時間。

---

## 程式碼

```cpp
struct DSU {
    vector<int> p, r;
    DSU(int n) : p(n), r(n, 0) {
        for (int i = 0; i < n; i++)
            p[i] = i;
    }
    int find(int x) {
        return p[x] == x ? x : p[x] = find(p[x]); // path compression
    }
    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b)
            return false;
        if (r[a] < r[b])
            swap(a, b);
        p[b] = a; // union by rank
        if (r[a] == r[b])
            r[a]++;
        return true;
    }
};
```

---

## 優缺點與使用時機

- 優點：實作簡單，攤銷近 $O(1)$，執行極快。
- 優點：應用廣泛——Kruskal 最小生成樹、網路連通性、影像分割等。
- 缺點：不支援高效的「拆分」或「取消合併」操作。
- 適用：需要快速判斷兩元素是否同集合或合併兩集合的場景。

---

## 小結

- 以 `parent[]` 陣列 + 路徑壓縮 + 按秩合併，達到攤銷 $O(\alpha(N))$ 操作。
- 對所有實際規模，$\alpha(N) \leq 4$，操作幾乎等同常數時間。
- 是 Kruskal 最小生成樹的核心工具（見 graph-kruskal）。
