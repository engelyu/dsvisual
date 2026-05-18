---
marp: true
theme: default
paginate: true
math: katex
title: "B-Tree(多路平衡樹)"
---

## B-Tree(多路平衡樹)

B-Tree 是一種自平衡的多路搜尋樹,每個節點可儲存多個鍵值並有多個子指標,設計目標是最小化磁碟 I/O 次數:一個磁碟頁(block)對應一個節點,廣泛用於資料庫索引。

---

## 核心概念

最小度數 $t$:每個非根節點至少有 $t-1$ 個鍵值、至多有 $2t-1$ 個鍵值;相應地有 $t$ 至 $2t$ 個子指標。所有葉節點在同一層。

- 分裂(Split):節點已滿時($2t-1$ 個鍵),中間鍵推送至父節點,左右各自形成新節點。
- B-Tree 向上生長:分裂傳播到根時,樹高增加 1。
- 所有鍵值(含資料)儲存於內部節點與葉節點。
- 樹高 $O(\log_t N)$,每層對應一次磁碟讀取。

---

## 運作流程

1. 插入:尋找對應葉節點,若節點未滿直接插入有序位置。
2. 若葉節點已滿($2t-1$ 鍵):分裂節點,中間鍵上推父節點。
3. 若父節點因此也滿:繼續向上分裂,直到找到有空間的節點或根節點。
4. 若根節點分裂:建立新根,樹高加 1。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 205.875px; background-color: transparent;" viewBox="0 0 205.875 422" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M102.938,86L102.938,94.167C102.938,102.333,102.938,118.667,102.938,134.333C102.938,150,102.938,165,102.938,172.5L102.938,180" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MTAyLjkzNzUsInkiOjg2fSx7IngiOjEwMi45Mzc1LCJ5IjoxMzV9LHsieCI6MTAyLjkzNzUsInkiOjE4NH1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M102.938,262L102.938,266.167C102.938,270.333,102.938,278.667,102.938,286.333C102.938,294,102.938,301,102.938,304.5L102.938,308" id="my-svg-L_B_C_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_C_0" data-points="W3sieCI6MTAyLjkzNzUsInkiOjI2Mn0seyJ4IjoxMDIuOTM3NSwieSI6Mjg3fSx7IngiOjEwMi45Mzc1LCJ5IjozMTJ9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel" transform="translate(102.9375, 135)"><g class="label" data-id="L_A_B_0" transform="translate(-75.0390625, -24)"><foreignObject width="150.078125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>insert 12<br />leaf=[5,6,12] full t=2</p></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_B_C_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(102.9375, 47)"><rect class="basic label-container" style="" x="-76.0234375" y="-39" width="152.046875" height="78"/><g class="label" style="" transform="translate(-46.0234375, -24)"><rect/><foreignObject width="92.046875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>insert 5,6<br />leaf=[5,6] ok</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(102.9375, 223)"><rect class="basic label-container" style="" x="-94.9375" y="-39" width="189.875" height="78"/><g class="label" style="" transform="translate(-64.9375, -24)"><rect/><foreignObject width="129.875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>split: push 6 up<br />left=[5] right=[12]</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-C-3" data-look="classic" transform="translate(102.9375, 363)"><rect class="basic label-container" style="" x="-85.25" y="-51" width="170.5" height="102"/><g class="label" style="" transform="translate(-55.25, -36)"><rect/><foreignObject width="110.5" height="72"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>root=[6]<br />left child=[5]<br />right child=[12]</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## B-Tree 節點結構示意

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130" width="340" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><rect x="100" y="10" width="140" height="28" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="140" y="29">10</text><line x1="160" y1="10" x2="160" y2="38" stroke="#94a3b8"/><text x="200" y="29">25</text><rect x="20" y="65" width="80" height="28" rx="4" fill="#f1f5f9" stroke="#94a3b8"/><text x="60" y="84">5 | 8</text><rect x="130" y="65" width="80" height="28" rx="4" fill="#f1f5f9" stroke="#94a3b8"/><text x="170" y="84">12 | 18</text><rect x="240" y="65" width="80" height="28" rx="4" fill="#f1f5f9" stroke="#94a3b8"/><text x="280" y="84">30 | 40</text><line x1="120" y1="38" x2="60" y2="65" stroke="#64748b"/><line x1="160" y1="38" x2="170" y2="65" stroke="#64748b"/><line x1="200" y1="38" x2="280" y2="65" stroke="#64748b"/><text x="170" y="118" fill="#64748b">root node holds keys [10,25] and 3 child pointers</text></g></svg>

> 根節點含有 2 個鍵(10, 25)及 3 個子指標;所有葉節點在相同深度,確保 $O(\log_t N)$ 的最壞情況保證。

---

## 複雜度分析

| 操作 | 時間 | 空間 |
| --- | --- | --- |
| 搜尋 | $O(\log_t N)$ | $O(1)$ |
| 插入 | $O(\log_t N)$ | $O(\log_t N)$ |
| 刪除 | $O(\log_t N)$ | $O(\log_t N)$ |
| 空間合計 | — | $O(N)$ |

$$h \leq \log_t \frac{N+1}{2}$$

B-Tree 高度嚴格上界為 $\log_t \frac{N+1}{2}$;$t$ 越大(節點越寬)高度越低,磁碟 I/O 越少。

---

## 程式碼

```cpp
void splitChild(int i, BTreeNode* y) {
    // Split y (full child at index i) and push median to this node
    BTreeNode* z = new BTreeNode(y->t, y->leaf);
    // z gets the upper half of y's keys
    for (int j = 0; j < t - 1; j++)
        z->keys.push_back(y->keys[j + t]);
    if (!y->leaf) // z gets upper half of y's children
        for (int j = 0; j < t; j++)
            z->children.push_back(y->children[j + t]);
    // Push median key up to this (parent) node
    keys.insert(keys.begin() + i, y->keys[t - 1]);
    y->keys.resize(t - 1);  // trim y to lower half
    children.insert(children.begin() + i + 1, z);
}

void insert(int k) {
    if (root->keys.size() == 2 * t - 1) { // root is full: split it
        BTreeNode* s = new BTreeNode(t, false);
        s->children.push_back(root);
        s->splitChild(0, root);
        root = s;
    }
    root->insertNonFull(k);
}
```

---

## 優缺點與使用時機

- 優點:極低樹高($O(\log_t N)$),最小化磁碟 I/O 次數。
- 優點:所有葉節點等深,保證最壞情況一致性。
- 缺點:範圍查詢需在非葉節點間來回,不如 B+ Tree 高效。
- 缺點:刪除操作複雜(需借鍵或合併節點)。
- 適用:資料庫系統、檔案系統(如 ext4、NTFS)索引結構。

---

## 小結

- 每節點多鍵多子指標,樹高 $O(\log_t N)$,有效減少磁碟 I/O。
- 節點滿時分裂並向上推送中間鍵;B-Tree 向上生長。
- 資料庫索引基礎結構;B+ Tree 是其葉節點鏈接的擴展版本。
