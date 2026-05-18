---
marp: true
theme: default
paginate: true
math: katex
title: "AVL 高度平衡樹"
---

## AVL 高度平衡樹

AVL 樹是第一種自平衡 BST(Adelson-Velsky & Landis,1962),每個節點維護一個 balance factor = height(left) − height(right),任何時刻絕對值均 ≤ 1,保證 $O(\log N)$ 的所有操作。

---

## 核心概念

每次插入後,從插入節點往根回溯,更新沿途節點的 `height`,若發現 balance factor 超出 [−1, 1] 範圍即觸發旋轉修正。

- LL 情況(左子比右子高 2 且插入在左左):單次右旋(Right Rotate)。
- RR 情況(右子比左子高 2 且插入在右右):單次左旋(Left Rotate)。
- LR 情況:先對左子左旋再對當前節點右旋(雙旋轉)。
- RL 情況:先對右子右旋再對當前節點左旋(雙旋轉)。

---

## 運作流程

1. 按 BST 規則遞迴插入節點。
2. 返回時更新每個祖先節點的 `height`。
3. 計算 `balance = getBalance(node)`,若 |balance| > 1 則判斷旋轉類型。
4. 執行對應旋轉使子樹恢復平衡,並更新旋轉後節點的高度。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 526.969px; background-color: transparent;" viewBox="0 0 526.96875 118" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M194.156,59L206.766,59C219.375,59,244.594,59,269.146,59C293.698,59,317.583,59,329.526,59L341.469,59" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MTk0LjE1NjI1LCJ5Ijo1OX0seyJ4IjoyNjkuODEyNSwieSI6NTl9LHsieCI6MzQ1LjQ2ODc1LCJ5Ijo1OX1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel" transform="translate(269.8125, 59)"><g class="label" data-id="L_A_B_0" transform="translate(-50.65625, -12)"><foreignObject width="101.3125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>leftRotate(10)</p></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(101.078125, 59)"><rect class="basic label-container" style="" x="-93.078125" y="-39" width="186.15625" height="78"/><g class="label" style="" transform="translate(-63.078125, -24)"><rect/><foreignObject width="126.15625" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>insert 10,20,30<br />(triggers RR case)</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(432.21875, 59)"><rect class="basic label-container" style="" x="-86.75" y="-51" width="173.5" height="102"/><g class="label" style="" transform="translate(-56.75, -36)"><rect/><foreignObject width="113.5" height="72"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>balanced:<br />20 is new root<br />10 left, 30 right</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## AVL 旋轉示意

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130" width="340" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><text x="70" y="14" fill="#64748b">Before (RR case)</text><circle cx="40" cy="40" r="14" fill="#fecaca" stroke="#dc2626"/><text x="40" y="45">10</text><circle cx="80" cy="75" r="14" fill="#fecaca" stroke="#dc2626"/><text x="80" y="80">20</text><circle cx="115" cy="110" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="115" y="115">30</text><line x1="50" y1="52" x2="68" y2="63" stroke="#64748b"/><line x1="88" y1="87" x2="104" y2="98" stroke="#64748b"/><text x="200" y="14" fill="#64748b">After (Left Rotate)</text><circle cx="200" cy="40" r="14" fill="#dcfce7" stroke="#16a34a"/><text x="200" y="45">20</text><circle cx="160" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="80">10</text><circle cx="240" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="240" y="80">30</text><line x1="190" y1="52" x2="172" y2="63" stroke="#64748b"/><line x1="210" y1="52" x2="228" y2="63" stroke="#64748b"/><text x="145" y="120" fill="#dc2626">bf=2</text><text x="200" y="120" fill="#16a34a">bf=0</text></g></svg>

> 插入 30 後,節點 10 的 balance factor 變為 −2(RR 情況),觸發左旋後以 20 為根的子樹恢復平衡。

---

## 複雜度分析

| 操作 | 時間 | 空間 |
| --- | --- | --- |
| 搜尋 | $O(\log N)$ | $O(1)$ |
| 插入 | $O(\log N)$ | $O(\log N)$ |
| 刪除 | $O(\log N)$ | $O(\log N)$ |
| 空間合計 | — | $O(N)$ |

$$h_{\text{AVL}} \leq 1.44\,\log_2(N+2)$$

AVL 樹高度嚴格上界為 $1.44 \log_2 N$,保證所有操作最壞情況下仍為 $O(\log N)$。

---

## 程式碼

```cpp
int getBalance(Node* N) {
    return N ? height(N->left) - height(N->right) : 0;
}

Node* insert(Node* node, int key) {
    if (!node) return new Node(key);
    if (key < node->key) node->left = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    else return node; // duplicate

    node->height = 1 + max(height(node->left), height(node->right));
    int balance = getBalance(node);

    if (balance > 1 && key < node->left->key)  return rightRotate(node); // LL
    if (balance < -1 && key > node->right->key) return leftRotate(node);  // RR
    if (balance > 1 && key > node->left->key) {                           // LR
        node->left = leftRotate(node->left); return rightRotate(node);
    }
    if (balance < -1 && key < node->right->key) {                         // RL
        node->right = rightRotate(node->right); return leftRotate(node);
    }
    return node;
}
```

---

## 優缺點與使用時機

- 優點:嚴格平衡,保證 $O(\log N)$ 搜尋,比 Red-Black Tree 更快的查詢。
- 優點:平衡因子僅需儲存高度差,實作相對直覺。
- 缺點:插入/刪除可能觸發多次旋轉,比 Red-Black Tree 略慢。
- 適用:讀取頻繁、寫入較少的場景,如符號表、資料庫索引。

---

## 小結

- balance factor ∈ {−1, 0, 1};超出即觸發 LL/RR/LR/RL 旋轉修正。
- 嚴格高度平衡保證所有操作最壞情況 $O(\log N)$。
- 適合查詢密集型場景;寫入頻繁時 Red-Black Tree 是更好的選擇。
