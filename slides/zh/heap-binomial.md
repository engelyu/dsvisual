---
marp: true
theme: default
paginate: true
math: katex
title: "二項堆積(Binomial Heap)"
---

## 二項堆積(Binomial Heap)

以二項樹(Binomial Tree)森林組成的堆積結構,合併操作類比二進位加法,提供 $O(\log N)$ 合併與 $O(1)$ 攤銷插入。

---

## 核心概念

度數為 $k$ 的二項樹 $B_k$ 由兩棵 $B_{k-1}$ 連結而成,共有 $2^k$ 個節點。$N$ 個元素的二項堆積最多含 $\lfloor\log_2 N\rfloor + 1$ 棵樹,每個度數至多出現一次,如同 $N$ 的二進位表示。

- insert:建立單節點 $B_0$ 堆積,再與主堆積合併($O(1)$ 攤銷)。
- merge:按度數升序合併根串列,相同度數的樹執行 link 操作(類似二進位加法進位)。
- extractTop:找出根串列中最小根,移除後將其子節點反轉為新堆積再合併。

---

## 運作流程

1. 合併兩個二項堆積:將兩個根串列按度數升序排列後合併。
2. 掃描合併後根串列:若連續兩棵樹度數相同,執行 linkTrees (較小根成為父)。
3. 重複直到每個度數至多一棵樹為止。
4. extractTop:線性掃描根串列找最小根;子樹反轉後執行上述合併。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 764.094px; background-color: transparent;" viewBox="0 0 764.09375 174" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M187.617,35L192.483,35C197.349,35,207.081,35,216.627,36.914C226.173,38.829,235.534,42.657,240.215,44.571L244.895,46.486" id="my-svg-L_H1_MERGE_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_H1_MERGE_0" data-points="W3sieCI6MTg3LjYxNzE4NzUsInkiOjM1fSx7IngiOjIxNi44MTI1LCJ5IjozNX0seyJ4IjoyNDguNTk3NjU2MjUsInkiOjQ4fV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M191.813,139L195.979,139C200.146,139,208.479,139,217.326,137.086C226.173,135.171,235.534,131.343,240.215,129.429L244.895,127.514" id="my-svg-L_H2_MERGE_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_H2_MERGE_0" data-points="W3sieCI6MTkxLjgxMjUsInkiOjEzOX0seyJ4IjoyMTYuODEyNSwieSI6MTM5fSx7IngiOjI0OC41OTc2NTYyNSwieSI6MTI2fV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M446.094,87L450.26,87C454.427,87,462.76,87,470.427,87C478.094,87,485.094,87,488.594,87L492.094,87" id="my-svg-L_MERGE_OUT_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_MERGE_OUT_0" data-points="W3sieCI6NDQ2LjA5Mzc1LCJ5Ijo4N30seyJ4Ijo0NzEuMDkzNzUsInkiOjg3fSx7IngiOjQ5Ni4wOTM3NSwieSI6ODd9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_H1_MERGE_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_H2_MERGE_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_MERGE_OUT_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-H1-0" data-look="classic" transform="translate(99.90625, 35)"><rect class="basic label-container" style="" x="-87.7109375" y="-27" width="175.421875" height="54"/><g class="label" style="" transform="translate(-57.7109375, -12)"><rect/><foreignObject width="115.421875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>H1: B0(3), B1(7)</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-MERGE-1" data-look="classic" transform="translate(343.953125, 87)"><rect class="basic label-container" style="" x="-102.140625" y="-39" width="204.28125" height="78"/><g class="label" style="" transform="translate(-72.140625, -24)"><rect/><foreignObject width="144.28125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>mergeRootLists<br />+ link equal degrees</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-H2-2" data-look="classic" transform="translate(99.90625, 139)"><rect class="basic label-container" style="" x="-91.90625" y="-27" width="183.8125" height="54"/><g class="label" style="" transform="translate(-61.90625, -12)"><rect/><foreignObject width="123.8125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>H2: B0(1), B1(10)</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-OUT-5" data-look="classic" transform="translate(626.09375, 87)"><rect class="basic label-container" style="" x="-130" y="-51" width="260" height="102"/><g class="label" style="" transform="translate(-100, -36)"><rect/><foreignObject width="200" height="72"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table; white-space: break-spaces; line-height: 1.5; max-width: 200px; text-align: center; width: 200px;"><span class="nodeLabel"><p>Result: B1(root=1), B2(root=7)<br />(carry-like linking, no B0)</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 二項樹結構示意

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130" width="340" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><text x="30" y="12" font-size="10" fill="#64748b">B0</text><circle cx="30" cy="25" r="12" fill="#fef9c3" stroke="#ca8a04"/><text x="30" y="29">1</text><text x="110" y="12" font-size="10" fill="#64748b">B1</text><circle cx="110" cy="25" r="12" fill="#fef9c3" stroke="#ca8a04"/><text x="110" y="29">1</text><circle cx="80" cy="65" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="80" y="69">3</text><line x1="110" y1="37" x2="88" y2="53" stroke="#64748b"/><text x="230" y="12" font-size="10" fill="#64748b">B2</text><circle cx="230" cy="25" r="12" fill="#fef9c3" stroke="#ca8a04"/><text x="230" y="29">1</text><circle cx="195" cy="65" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="195" y="69">3</text><circle cx="255" cy="65" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="255" y="69">2</text><circle cx="230" cy="105" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="230" y="109">5</text><line x1="230" y1="37" x2="203" y2="53" stroke="#64748b"/><line x1="230" y1="37" x2="248" y2="53" stroke="#64748b"/><line x1="255" y1="77" x2="242" y2="93" stroke="#64748b"/></g></svg>

> $B_0$ 為單節點;$B_1$ 由兩棵 $B_0$ 連結;$B_2$ 由兩棵 $B_1$ 連結。每棵 $B_k$ 恰有 $2^k$ 節點,根的度數為 $k$。

---

## 複雜度分析

| 操作 | 時間 | 空間 |
| --- | --- | --- |
| insert (攤銷) | $O(1)$ | $O(1)$ |
| peek | $O(\log N)$ | $O(1)$ |
| extractTop (最壞) | $O(\log N)$ | $O(1)$ |
| merge (最壞) | $O(\log N)$ | $O(1)$ |
| decreaseKey (最壞) | $O(\log N)$ | $O(1)$ |
| 空間合計 | — | $O(N)$ |

$$T_{\text{merge}}(N) = O(\log N)$$

合併兩個大小為 $N$ 的二項堆積最多處理 $2\lfloor\log_2 N\rfloor+2$ 棵樹,故為 $O(\log N)$。

---

## 程式碼

```cpp
void linkTrees(BNode* rootY, BNode* rootZ) {
    rootY->parent = rootZ;
    rootY->sibling = rootZ->child;
    rootZ->child = rootY;
    rootZ->degree++;
}

BNode* unionHeaps(BNode* h1, BNode* h2) {
    BNode* newHead = mergeRootLists(h1, h2);
    if (!newHead) return nullptr;

    BNode* prev = nullptr, *curr = newHead, *next = curr->sibling;
    while (next) {
        bool degreeDiff  = curr->degree != next->degree;
        bool tripleSame  = next->sibling && next->sibling->degree == curr->degree;
        if (degreeDiff || tripleSame) {
            prev = curr; curr = next;
        } else if (cmp(curr->key, next->key)) {
            curr->sibling = next->sibling;
            linkTrees(next, curr);
        } else {
            if (!prev) newHead = next; else prev->sibling = next;
            linkTrees(curr, next);
            curr = next;
        }
        next = curr->sibling;
    }
    return newHead;
}
```

---

## 優缺點與使用時機

- 優點:$O(\log N)$ 合併,明顯優於 Binary Heap 的 $O(N+M)$(串接+build-heap)且支援更多使用場景。
- 優點:插入攤銷 $O(1)$,連續插入效率高。
- 缺點:指標結構,快取效能不如陣列式 Binary Heap。
- 缺點:peek 需要線性掃描根串列 $O(\log N)$;不提供 $O(1)$ peek。
- 適用:需要高效合併的優先佇列場景,如事件驅動模擬器、Prim 演算法的外部合併。

---

## 小結

- $N$ 個元素 → 至多 $\lfloor\log_2 N\rfloor+1$ 棵樹,每個度數至多一棵。
- 合併 $O(\log N)$,插入攤銷 $O(1)$,extractTop $O(\log N)$ 最壞。
- 結構類比二進位加法:相同度數的樹做 link 如同進位操作。
