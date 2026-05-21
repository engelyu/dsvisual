---
marp: true
theme: default
paginate: true
math: katex
title: "深度優先搜尋"
category: "Graphs"
---

## 深度優先搜尋

DFS（Depth-First Search，深度優先搜尋）以堆疊或遞迴的方式優先沿路徑深入探索，是拓樸排序、強連通分量、環偵測等演算法的核心基礎。

---

## 核心概念

以堆疊（或呼叫堆疊）記錄當前路徑。每次取出頂端節點，若未訪問則標記並將其鄰居（倒序）推入堆疊，使最小鄰居優先被彈出；遞迴版直接對每個鄰居呼叫自身。

- 迭代版：堆疊 + `visited` 陣列；倒序入堆疊使最小鄰居先訪問，得到 0 1 2 3 4。
- 遞迴版：呼叫堆疊即為 DFS 堆疊；對鄰居清單正序遞迴，得到相同順序 0 1 2 3 4。
- DFS 樹邊：0→1→2→3→4；其餘為回邊（back edge）或交叉邊，反映圖的深層結構。

---

## 運作流程

1. 將源點 0 推入堆疊（或遞迴進入 0）；`visited[0] = true`。
2. 迭代：彈出頂端節點 $u$，若未訪問則標記並將 `adj[u]` 倒序推入堆疊；遞迴：對每個未訪問鄰居 $v$ 直接呼叫 `dfsRecursive(adj, v, visited)`。
3. 重複直到堆疊空（迭代）或所有遞迴返回；訪問序列為 0 1 2 3 4。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 557.953px; background-color: transparent;" viewBox="0 0 557.953125 70" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M76.391,35L80.557,35C84.724,35,93.057,35,100.724,35C108.391,35,115.391,35,118.891,35L122.391,35" id="my-svg-L_T0_T1_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_T0_T1_0" data-points="W3sieCI6NzYuMzkwNjI1LCJ5IjozNX0seyJ4IjoxMDEuMzkwNjI1LCJ5IjozNX0seyJ4IjoxMjYuMzkwNjI1LCJ5IjozNX1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M194.781,35L198.948,35C203.115,35,211.448,35,219.115,35C226.781,35,233.781,35,237.281,35L240.781,35" id="my-svg-L_T1_T2_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_T1_T2_0" data-points="W3sieCI6MTk0Ljc4MTI1LCJ5IjozNX0seyJ4IjoyMTkuNzgxMjUsInkiOjM1fSx7IngiOjI0NC43ODEyNSwieSI6MzV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M313.172,35L317.339,35C321.505,35,329.839,35,337.505,35C345.172,35,352.172,35,355.672,35L359.172,35" id="my-svg-L_T2_T3_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_T2_T3_0" data-points="W3sieCI6MzEzLjE3MTg3NSwieSI6MzV9LHsieCI6MzM4LjE3MTg3NSwieSI6MzV9LHsieCI6MzYzLjE3MTg3NSwieSI6MzV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M431.563,35L435.729,35C439.896,35,448.229,35,455.896,35C463.563,35,470.563,35,474.063,35L477.563,35" id="my-svg-L_T3_T4_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_T3_T4_0" data-points="W3sieCI6NDMxLjU2MjUsInkiOjM1fSx7IngiOjQ1Ni41NjI1LCJ5IjozNX0seyJ4Ijo0ODEuNTYyNSwieSI6MzV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_T0_T1_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_T1_T2_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_T2_T3_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_T3_T4_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-T0-0" data-look="classic" transform="translate(42.1953125, 35)"><rect class="basic label-container" style="" x="-34.1953125" y="-27" width="68.390625" height="54"/><g class="label" style="" transform="translate(-4.1953125, -12)"><rect/><foreignObject width="8.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>0</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-T1-1" data-look="classic" transform="translate(160.5859375, 35)"><rect class="basic label-container" style="" x="-34.1953125" y="-27" width="68.390625" height="54"/><g class="label" style="" transform="translate(-4.1953125, -12)"><rect/><foreignObject width="8.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>1</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-T2-2" data-look="classic" transform="translate(278.9765625, 35)"><rect class="basic label-container" style="" x="-34.1953125" y="-27" width="68.390625" height="54"/><g class="label" style="" transform="translate(-4.1953125, -12)"><rect/><foreignObject width="8.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>2</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-T3-3" data-look="classic" transform="translate(397.3671875, 35)"><rect class="basic label-container" style="" x="-34.1953125" y="-27" width="68.390625" height="54"/><g class="label" style="" transform="translate(-4.1953125, -12)"><rect/><foreignObject width="8.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>3</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-T4-4" data-look="classic" transform="translate(515.7578125, 35)"><rect class="basic label-container" style="" x="-34.1953125" y="-27" width="68.390625" height="54"/><g class="label" style="" transform="translate(-4.1953125, -12)"><rect/><foreignObject width="8.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>4</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 示意圖

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" width="360"><g font-family="monospace" font-size="13"><text x="0" y="20">DFS visit order: 0  1  2  3  4</text><text x="0" y="50">Tree edges  : 0-&gt;1, 1-&gt;2, 2-&gt;3, 3-&gt;4</text><text x="0" y="80">Node 0: neighbors 1,4</text><text x="0" y="100">Node 4: tree edge 3-&gt;4; back edges 4-&gt;0, 4-&gt;1</text></g></svg>

> DFS 從 0 出發，沿最小鄰居深入：0→1→2→3→4；5 個節點全部出現。4 最後被訪問是因為 3 的鄰居 4 尚未訪問時才被探索。

---

## 複雜度分析

| 操作 | 時間 | 空間 |
| --- | --- | --- |
| 初始化 | $O(V)$ | $O(V)$ |
| DFS 遍歷 | $O(V+E)$ | $O(h)$ |
| 最壞情況堆疊深度 | $O(V)$ | $O(V)$ |

$$T_{DFS} = O(V + E)$$

每個頂點和每條邊各最多處理一次；堆疊深度（遞迴深度）$h$ 最壞為 $O(V)$（線性圖），一般情況遠小於此。

---

## 程式碼

```cpp
void dfsRecursive(const vector<vector<int>>& adj, int u, vector<bool>& visited) {
    visited[u] = true;
    cout << "Visit " << u << "\n";
    for (int v : adj[u])
        if (!visited[v])
            dfsRecursive(adj, v, visited);
}
void dfsIterative(const vector<vector<int>>& adj, int start) {
    int n = adj.size();
    vector<bool> visited(n, false);
    stack<int> s;
    s.push(start);
    while (!s.empty()) {
        int u = s.top();
        s.pop();
        if (visited[u])
            continue;
        visited[u] = true;
        cout << "Visit " << u << "\n";
        // push in reverse so smallest neighbor is popped first
        for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it)
            if (!visited[*it])
                s.push(*it);
    }
}
```

---

## 優缺點與使用時機

- 優點：對深且窄的圖記憶體用量小（$O(h)$ vs BFS 的 $O(V)$）。
- 優點：是拓樸排序、強連通分量（Tarjan / Kosaraju）、環偵測的核心引擎。
- 缺點：找到的是「一條」路徑，不保證最短路徑。
- 適用：路徑存在性、拓樸排序、連通分量、迷宮求解等；DFS 是拓樸排序的引擎（見 graph-topo）。

---

## 小結

- 堆疊（或遞迴）+ `visited` 集合；沿路徑完全探索後再回溯。
- 時間 $O(V+E)$，空間 $O(h)$；對深窄圖記憶體效率高於 BFS。
- DFS 是拓樸排序的核心引擎（見 graph-topo）。
